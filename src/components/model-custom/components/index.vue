<template>
    <!-- 左侧模块 -->
    <div class="siderbar flex-col">
        <card-container class="mb-8">
            <el-collapse v-model="activeNames">
                <el-collapse-item v-for="(com, i) in components" :key="i" :title="com.title" :name="com.key">
                    <div class="component flex-row flex-wrap">
                        <div v-for="item in com.item" :key="item.key" class="item">
                            <div class="siderbar-item flex-col jc-c align-c gap-4 draggable" draggable="true" @dragstart="dragStart(item, $event)" @dragend="dragEnd">
                                <img class="img radius-xs" :src="url_computer(item.key)" />
                                <div>{{ item.name }}</div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </card-container>
        <card-container class="mb-8">
            <div class="mb-12">内容设置</div>
            <slider v-model="center_height" :max="10000">组件高度</slider>
        </card-container>
        <card-container class="h selected">
            <div class="mb-12">已选组件</div>
            <div class="assembly">
                <div v-if="!isEmpty(diy_data)" class="flex-row flex-wrap gap-10">
                    <div v-for="(item, index) in diy_data" :key="index" class="item flex jc-sb align-c size-14 cr-3" :class="{ 'item-active': item.show_tabs }" @click="on_choose(index, item.show_tabs)">{{ item.name }}<icon name="close" color="3" size="10" class="c-pointer" @click="del(index)"></icon></div>
                </div>
                <NoData v-else :imgWidth="10"></NoData>
            </div>
        </card-container>
    </div>
    <!-- 视图渲染 -->
    <div class="main">
        <div class="model-content">
            <!-- 拖拽区 -->
            <div class="model-drag">
                <div class="model-wall">
                    <div class="drag-area re dropzone" @dragover.prevent @dragenter.prevent @drop="drop">
                        <DraggableContainer v-if="draggable_container" :reference-line-visible="true" :disabled="false" reference-line-color="#ddd">
                            <!-- @mouseover="on_choose(index)" -->
                            <Vue3DraggableResizable v-for="(item, index) in diy_data" :key="item.id" v-model:w="item.com_data.com_width" v-model:h="item.com_data.com_height" :min-w="0" :min-h="0" :class="{ 'plug-in-show-tabs': item.show_tabs }" :init-w="item.com_data.com_width" :init-h="item.com_data.com_height" :handles="['tl', 'tr', 'bl', 'br']" :x="item.location.x" :y="item.location.y" :parent="true" @mousedown="on_choose(index, item.show_tabs)" @click="on_choose(index, item.show_tabs)" @drag-end="dragEndHandle($event, index)" @resizing="resizingHandle($event, item.key, index)" @resize-end="resizingHandle($event, item.key, index)">
                                <div v-if="item.show_tabs" class="plug-in-right" chosenClass="close">
                                    <el-icon class="iconfont icon-del" @click.stop="del(index)" />
                                    <el-icon class="iconfont icon-copy" @click.stop="copy(index)" />
                                </div>
                                <div :class="['main-content', { 'plug-in-border': item.show_tabs }]" :style="{ 'z-index': item.com_data.bottom_up ? 0 : 1 }">
                                    <template v-if="item.key == 'text'">
                                        <model-text :key="item.id" :value="item.com_data"></model-text>
                                    </template>
                                    <template v-else-if="item.key == 'img'">
                                        <model-image :key="item.id" :value="item.com_data"></model-image>
                                    </template>
                                    <template v-else-if="item.key == 'auxiliary-line'">
                                        <model-lines :key="item.id" :value="item.com_data"></model-lines>
                                    </template>
                                </div>
                            </Vue3DraggableResizable>
                        </DraggableContainer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { cloneDeep, isEmpty } from 'lodash';
import { get_math } from '@/utils';
// 删除
const app = getCurrentInstance();
//#region 传递参数和传出数据的处理
const emits = defineEmits(['rightUpdate']);
interface Props {
    list: diy_content[];
}
const props = defineProps<Props>();
//#endregion
//#region 初始值
const activeNames = reactive(['1', '2']);
const components = reactive([
    {
        title: '组件',
        key: '1',
        item: [
            {
                key: 'text',
                name: '文本',
                com_data: {
                    text_title: '文本',
                    data_source_id: '',
                    data_source_list: {},
                    text_link: {},
                    text_color: '#000',
                    text_weight: 'normal',
                    text_size: 12,
                    text_option: 'none',
                    text_location: 'left',
                    text_padding: {
                        padding: 0,
                        padding_top: 0,
                        padding_bottom: 0,
                        padding_left: 0,
                        padding_right: 0,
                    },
                    text_rotate: 0,
                    border_show: false,
                    border_color: '#FF5D5D',
                    border_style: 'solid',
                    border_radius: {
                        radius: 0,
                        radius_top_left: 0,
                        radius_top_right: 0,
                        radius_bottom_left: 0,
                        radius_bottom_right: 0,
                    },
                    border_size: 1,
                    com_width: 150,
                    com_height: 17,
                    com_bg: '',
                    bottom_up: true,
                },
            },
            {
                key: 'img',
                name: '图片',
                com_data: {
                    com_width: 52,
                    com_height: 52,
                    img_src: [],
                    data_source_id: '',
                    data_source_list: {},
                    link: {},
                    img_radius: {
                        radius: 0,
                        radius_top_left: 0,
                        radius_top_right: 0,
                        radius_bottom_left: 0,
                        radius_bottom_right: 0,
                    },
                    img_width: 50,
                    img_height: 50,
                    img_rotate: 0,
                    border_show: true,
                    border_color: '#FF3F3F',
                    border_style: 'dashed',
                    border_radius: {
                        radius: 0,
                        radius_top_left: 0,
                        radius_top_right: 0,
                        radius_bottom_left: 0,
                        radius_bottom_right: 0,
                    },
                    border_size: 1,
                    bottom_up: true,
                },
            },
            {
                key: 'auxiliary-line',
                name: '线条',
                com_data: {
                    com_width: 306,
                    com_height: 11,
                    line_settings: 'horizontal',
                    line_style: 'solid',
                    line_width: 306,
                    line_size: 1,
                    line_color: '#000',
                    bottom_up: true,
                },
            },
        ],
    },
]);
const url_computer = (name: string) => {
    const new_url = ref(new URL(`../../../assets/images/custom/${name}.png`, import.meta.url).href).value;
    return new_url;
};
//#endregion
//#region 中间区域的处理逻辑
const diy_data = toRef(props.list);
onMounted(() => {
    // 如果默认不等于空的话，则默认选中第一个
    if (!isEmpty(diy_data)) {
        on_choose(0, false);
    }
});
// 复制
const copy = (index: number) => {
    // 获取当前数据, 复制的时候id更换一下
    const new_data = {
        ...cloneDeep(get_diy_index_data(index)),
        id: get_math(),
    };
    // 在当前位置下插入数据
    diy_data.value.splice(index, 0, new_data);
    set_show_tabs(index + 1);
};

// 删除
const del = (index: number) => {
    app?.appContext.config.globalProperties.$common.message_box('删除后不可恢复，确定继续吗?', 'warning').then(() => {
        ElMessage({
            type: 'success',
            message: '删除成功!',
        });
        // 调用删除接口，然后，更新数据
        diy_data.value.splice(index, 1);
        if (diy_data.value.length > 0) {
            let new_index: number = index;
            // 删除的时候如果大于0，则显示上边的数据
            if (index > 0) {
                new_index = new_index - 1;
            }
            set_show_tabs(new_index);
        } else {
            emits('rightUpdate', {});
        }
    });
};
// 获取当前传递过来的index对应的diy_data中的数据
const get_diy_index_data = (index: number) => {
    return (<arrayIndex>diy_data.value)[index.toString()];
};
// 设置当前选中的是那个
const set_show_tabs = (index: number) => {
    diy_data.value.forEach((item, for_index) => {
        // 先将全部的设置为false,再将当前选中的设置为true
        item.show_tabs = false;
        if (for_index == index) {
            item.show_tabs = true;
            emits('rightUpdate', item);
        }
    });
};
// 选中和鼠标按下时候的效果
const on_choose = (index: number, show_tabs: Boolean) => {
    // 如果已经选中了, 设置为不可再次触发事件
    if (!show_tabs) {
        // 设置对应的位置为显示
        set_show_tabs(index);
    }
};
//#endregion
//#region 容器高度发生变化时的处理
const center_height = defineModel('height', { type: Number, default: 0 });
const drag_area_height = computed(() => center_height.value + 'px');
const draggable_container = ref(true);
let data = reactive<diy_content[]>([]);

watch(() => center_height.value, () => {
    data = diy_data.value;
    // 从 DOM 中删除组件
    draggable_container.value = false;
    nextTick(() => {
        // 在 DOM 中添加组件
        draggable_container.value = true;
        diy_data.value = data.map((item) => ({
            ...item,
            location: {
                x: item.location.x,
                y: item.location.staging_y,
                staging_y: item.location.staging_y,
            },
        }));
    });
},{ immediate: true, deep: true });
//#endregion
//#region 左侧拖拽过来的处理
let draggedItem = ref<any>({});
const dragStart = (item: any, event: any) => {
    draggedItem.value = {
        name: item.name,
        show_tabs: true,
        is_enable: true,
        location: {
            x: 0,
            y: 0,
            staging_y: 0,
        },
        src: item.src,
        id: get_math(),
        key: item.key,
        com_data: cloneDeep(item.com_data),
    };
    // event.dataTransfer.effectAllowed = 'none';
};
const dragEnd = () => {
    draggedItem.value = {};
};
const drop = (event: any) => {
    if (draggedItem.value) {
        const com_width = draggedItem.value.com_data.com_width;
        const com_height = draggedItem.value.com_data.com_height;
        let location_x = event.offsetX;
        let location_y = event.offsetY;
        const mouse_width = com_width / 2;
        const mouse_height = com_height / 2;
        // 左边间距大于屏幕宽度
        if (location_x - mouse_width < 0) {
            location_x = 0;
        } else {
            location_x = location_x - mouse_width;
        }
        // 左右间距大于屏幕宽度
        if (location_x + com_width > 390) {
            location_x = 390 - com_width;
        }
        // 顶部间距大于屏幕高度
        if (location_y - mouse_height < 0) {
            location_y = 0;
        } else {
            location_y = location_y - mouse_height;
        }
        // 高度大于屏幕高度
        if (location_y + com_height > center_height.value) {
            location_y = center_height.value - com_height;
        }
        const newItem = {
            ...draggedItem.value,
            location: {
                x: location_x,
                y: location_y,
                staging_y: location_y,
            },
        };

        diy_data.value.push(newItem);
        set_show_tabs(diy_data.value.length - 1);
    }
};
//#endregion
//#region 区域内拖拽显示
const dragEndHandle = (item: any, index: number) => {
    diy_data.value[index].location = {
        x: item.x,
        y: item.y,
        staging_y: item.y,
    };
};
// {x: number, y: number, w: number, h: number}
const resizingHandle = (new_location: any, key: string, index: number) => {
    diy_data.value[index].location = {
        x: new_location.x,
        y: new_location.y,
        staging_y: new_location.y,
    };
    const com_data = diy_data.value[index].com_data;
    com_data.com_width = new_location.w;
    com_data.com_height = new_location.h;
    com_data.staging_height = new_location.h;
    if (key == 'img') {
        if (com_data.border_show) {
            com_data.img_width = new_location.w - com_data.border_size * 2;
            com_data.img_height = new_location.h - com_data.border_size * 2;
        } else {
            com_data.img_width = new_location.w;
            com_data.img_height = new_location.h;
        }
    } else if (key == 'auxiliary-line') {
        if (com_data.line_settings === 'horizontal') {
            com_data.line_width = com_data.com_width;
            com_data.line_size = com_data.com_height - 10;
        } else {
            com_data.line_width = com_data.com_height;
            com_data.line_size = com_data.com_width - 10;
        }
    }
};
//#endregion
defineExpose({
    diy_data,
});
</script>

<style lang="scss" scoped>
.siderbar {
    width: 34rem;
    overflow: hidden;
    :deep(.el-collapse) {
        border: 0;
        .el-collapse-item__wrap {
            border: 0;
        }
        .el-collapse-item__header {
            border: 0;
        }
        .el-collapse-item__content {
            padding-bottom: 0;
        }
    }
    .component {
        .item {
            width: calc(100% / 3);
            padding: 0.5rem;
            .img {
                width: 3rem;
                height: 3rem;
            }
        }
        .siderbar-item {
            padding: 0.5rem;
        }
    }
    .siderbar-item:hover {
        cursor: pointer;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.5rem 0 rgba(24, 144, 255, 0.3);
        transform: scale(1.1);
        transition: all 0.2s;
    }
}
.main {
    flex: 1;
    position: relative;
    height: 100%;
    width: 100%;
    .model-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        height: 100%;
        .model-drag {
            overflow-y: auto;
            .model-wall {
                width: 39rem;
                background: #fff;
                margin: 0 auto;
                .drag-area {
                    height: v-bind(drag_area_height);
                }
                .main-content {
                    max-width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
            }
        }
        :deep(.vdr-container.active) {
            border: 0;
        }
        :deep(.plug-in-show-tabs.vdr-container) {
            .vdr-handle.vdr-handle-tl,
            .vdr-handle.vdr-handle-tr,
            .vdr-handle.vdr-handle-bl,
            .vdr-handle.vdr-handle-br {
                display: block !important;
            }
        }
        .plug-in-border {
            position: relative;
            box-shadow: 0px 0 0px 0.2rem $cr-main;
            border: 0;
        }
        .plug-in-right {
            background: $cr-main;
            position: absolute;
            right: -5rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 2rem 1.2rem;
            color: #fff;
            border-radius: 0.4rem;
            z-index: 2;
            & > i {
                cursor: pointer;
            }
            & > i.disabled {
                color: #5db2ff;
                cursor: not-allowed;
            }
            & .icon-arrow-top,
            & .icon-arrow-bottom {
                height: 0.9rem;
            }
        }
    }
}
.selected {
    overflow: hidden;
}
.assembly {
    height: calc(100% - 3rem);
    width: calc(100% - 0.6rem);
    overflow: hidden;
    overflow-y: auto;
    .item {
        width: calc(33% - 1rem);
        padding: 1rem 1.5rem;
        background: #f6f6f6;
        border-radius: 0.4rem;
    }
    .item-active {
        border: 0.1rem solid $cr-main;
        padding: 0.8rem 1.3rem;
    }
}
</style>
