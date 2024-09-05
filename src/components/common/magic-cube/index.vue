<template>
    <div>
        <div class="decorate-cube">
            <ul v-for="(n, index) in densityNum" :key="index" class="cube-col">
                <li v-for="(i, index1) in densityNum" :key="index1" class="cube-item" :style="{ width: cubeCellWidth + 'px', height: cubeCellHeight + 'px' }" :data-x="n" :data-y="i" @click="onClickCubeItem($event)" @mouseenter="onEnterCubeItem($event)">
                    <div :class="['w h item do-not-trigger', { 'item-selecting': isSelecting(n, i), 'item-selected': isSelected(n, i) }]">
                        <icon name="add" color="9" class="do-not-trigger" :style="{ 'line-height': cubeCellHeight + 'px' }"></icon>
                    </div>
                </li>
            </ul>
            <div v-for="(item, index) in selectedList" :key="index" :class="['cube-selected', {'cube-selected_active': selected_active == index }]" :style="selected_style(item)" @click="selected_click(index)">
                <div v-if="selected_active == index && props.flag" class="cube-del" @click.stop="on_selected_del(index)">
                    <icon name="close" color="f" size="8"></icon>
                </div>
                <template v-if="item.img && !isEmpty(item.img[0] || '') && props.type == 'img'">
                    <image-empty v-model="item.img[0]"></image-empty>
                </template>
                <template v-else>
                    <div class="cube-selected-text">
                        {{ Math.round((750 / densityNum) * (item.end.y - item.start.y + 1)) }}
                        x
                        {{ Math.round((750 / densityNum) * (item.end.x - item.start.x + 1)) }}
                        像素
                        <template v-if="props.type == 'data'">
                            <div>{{ data_title(item) }}</div>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
interface content {
    data_type: string;
    goods_list: Array<string>;
    images_list: Array<string>;
}
interface CubeItem {
    start: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
    img?: uploadList[];
    data_content?: content
}

interface Props {
    flag: boolean;
    list: CubeItem[];
    type?: string;
    cubeWidth: number;
    cubeHeight: number;
}
const props = withDefaults(defineProps<Props>(), {
    list: () => [],
    flag: false,
    type: 'img',
    cubeWidth: 390,
    cubeHeight: 390,
});

const selected_active = ref(0);
//#region 容器大小变更
const density = ref('4');
//#endregion

const selectingItem = reactive<any>({
    tempStart: null,
    tempEnd: null,
    start: null,
    end: null,
});

onMounted(() => {
    // 监听点击事件
    document.addEventListener('click', outerClick);
});
onUnmounted(() => {
    // 移除监听事件
    document.removeEventListener('click', outerClick);
});
// 判断点击的是否是可以点击的区域，其他区域隐藏掉编辑属性
const outerClick = (e: any) => {
    if (!isEmpty(e.target.className) && !e.target.className.includes('do-not-trigger')) {
        clearSelecting();
    }
};

const selectedList = ref(props.list);

//单元魔方宽度。
const cubeCellWidth = computed(() => props.cubeWidth / parseInt(density.value));
//密度值。
const densityNum = computed(() => parseInt(density.value));
//单元魔方高度。
const cubeCellHeight = computed(() => props.cubeHeight / parseInt(density.value));
const emits = defineEmits(['selected_click']);

// 判断选择的内容的长度是否发生变化
watch(() => selectedList.value.length, (val) => {
    if (val > 1) {
        selected_active.value = val - 1;
    } else {
        selected_active.value = 0;
    }
    emits('selected_click', selected_active.value);
}, {deep: true});

const updateSelecting = () => {
    //获取开始和结束之间的所有魔方单元。
    const tempStart = selectingItem.tempStart;
    const tempEnd = selectingItem.tempEnd;
    
    selectingItem.start = {
        x: Math.min(tempStart.x, tempEnd.x),
        y: Math.min(tempStart.y, tempEnd.y),
    };
    selectingItem.end = {
        x: Math.max(tempStart.x, tempEnd.x),
        y: Math.max(tempStart.y, tempEnd.y),
    };
};
//清除正在选择的。
const clearSelecting = () => {
    selectingItem.tempStart = null;
    selectingItem.tempEnd = null;
    selectingItem.start = null;
    selectingItem.end = null;
};

const coordFromCubeEvent = (event: any) => {
    var el = event.currentTarget;
    var x = el.getAttribute('data-x');
    var y = el.getAttribute('data-y');
    return { x: x, y: y };
};

const isContain = (x: number, y: number, item: CubeItem) => {
    return item.start.x <= x && x <= item.end.x && item.start.y <= y && y <= item.end.y;
};
//魔方点击事件。
const onClickCubeItem = (event: any) => {
    let domclass = event.currentTarget.getAttribute('class');
    if (-1 !== domclass.indexOf('item-selected')) {
        return;
    }

    let coord = coordFromCubeEvent(event);

    if (null == selectingItem.tempStart) {
        selectingItem.tempStart = coord;
        selectingItem.tempEnd = coord;
        selectingItem.start = coord;
        selectingItem.end = coord;
        return;
    }

    selectingItem.tempEnd = coord;
    updateSelecting();

    //加入选中的。
    let selectedItem = {
        start: selectingItem.start,
        end: selectingItem.end,
        img: [],
    };
    selectedList.value.push(selectedItem);
    clearSelecting();
};

const onEnterCubeItem = (event: any) => {
    if (selectingItem.tempStart) {
        var coord = coordFromCubeEvent(event);
        selectingItem.tempEnd = coord;
        updateSelecting();
    }
};
// 删除当前选中的内容
const on_selected_del = (index: number) => {
    clearSelecting();
    // splice() 会先从原数组中添加/删除项目 然后返回被删除的项目。
    selectedList.value.splice(index, 1);
};
//判断是否正在选择
const isSelecting = (x: number, y: number) => {
    const item = selectingItem;
    if (item.tempStart) {
        return isContain(x, y, item);
    }
    return false;
};
//判断是否已经选择。
const isSelected = (x: number, y: number) => {
    for (var i = 0; i < selectedList.value.length; i++) {
        if (isContain(x, y, selectedList.value[i])) {
            return true;
        }
    }
    return false;
};
//计算选中层的宽度。
const getSelectedWidth = (item: CubeItem) => {
    return (item.end.x - item.start.x + 1) * cubeCellWidth.value;
};
//计算选中层的高度。
const getSelectedHeight = (item: CubeItem) => {
    return (item.end.y - item.start.y + 1) * cubeCellHeight.value;
};
//计算选中层的右边距离。
const getSelectedTop = (item: CubeItem) => {
    return (item.start.y - 1) * cubeCellHeight.value;
};
//计算选中层的左边距离。
const getSelectedLeft = (item: CubeItem) => {
    return (item.start.x - 1) * cubeCellWidth.value;
};
// 生成的样式
const selected_style = (item: CubeItem) => {
    return `width: ${ getSelectedWidth(item) }px; height: ${ getSelectedHeight(item) }px; top: ${ getSelectedTop(item) }px; left: ${ getSelectedLeft(item) }px;`
}
// 选中的点击事件
const selected_click = (index: number) => {
    selected_active.value = index;
    emits('selected_click', index);
};
const data_title = (item: CubeItem) => {
    let title = `共有`;
    if (item.data_content) {
        if (item.data_content.data_type == 'goods') {
            title += `${ item.data_content.goods_list.length }个商品`;
        } else {
            title += `${ item.data_content.images_list.length }个图片`;
        }
    }
    return title;
};
</script>
<style lang="scss" scoped>
.decorate-cube {
    position: relative;
    .cube-col {
        float: left;
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .cube-item {
        background: #f5f5f5;
        cursor: pointer;
        text-align: center;
        box-sizing: border-box;
        position: relative;
        .item {
            border: 1px solid #fff;
            border-top: 0;
        }
        .item-selecting {
            background: #e0edff;
            position: absolute;
            z-index: 99999;
        }
        .item-selected {
            background: #e0edff;
        }
    }
    .cube-item:first-child {
        .item {
            border-top: 0;
        }
    }
    .cube-item:last-child {
        .item {
            border-bottom: 0;
        }
    }
    .cube-col:first-child {
        .cube-item .item {
            border-left: 0;
        }
    }
    .cube-col:last-of-type {
        .cube-item .item {
            border-right: 0;
        }
    }
    .cube-selected-text {
        font-size: 12px;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .cube-selected {
        position: absolute;
        background-color: #eee;
        border: 1px solid #fff;
        text-align: center;
        color: $cr-primary;
        cursor: pointer;
        box-sizing: border-box;
        z-index: 2;
    }
    .cube-selected_active {
        border: 1px solid $cr-primary;
    }
    .cube-del {
        background: $cr-primary;
        position: absolute;
        top: 0;
        right: 0;
        height: 1.6rem;
        width: 1.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }
    :deep(.el-image) {
        height: 100%;
        width: 100%;
        background-color: #fff;
        .el-image__inner {
            object-fit: cover;
        }
        .image-slot img {
            width: 6rem;
        }
    }
}
</style>
