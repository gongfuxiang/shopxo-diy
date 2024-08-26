<template>
    <div class="auxiliary-line common-content-height">
        <el-form :model="form" label-width="60">
            <card-container class="mb-8">
                <div class="mb-12">展示风格</div>
                <el-form-item label="选择风格">
                    <div class="flex align-c flex-wrap gap-10">
                        <div v-for="(item, index) in style_list" :key="index" :class="['flex-item', {'flex-item-actived': form.style_actived === index }]" @click="style_click(index)">
                            <icon :name="item" :color="`${ form.style_actived === index ? '#E1EEF9' : '#EDEDED'}`" size="48"></icon>
                        </div>
                    </div>
                </el-form-item>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">展示设置</div>
                <el-form-item label-width="0" class="show-config">
                    <!-- 风格9 -->
                    <template v-if="form.style_actived == 7">
                        <div class="flex-row align-c jc-c gap-2 style-size flex-wrap">
                            <div v-for="(item, index) in form.data_magic_list" :key="index" :class="['bg-f5', {'cube-selected-active': selected_active == index, 'style9-top': [0, 1].includes(index), 'style9-bottom': ![0, 1].includes(index)}]" @click="selected_click(index)">
                                <div class="cube-selected-text">
                                    <template v-if="[0, 1].includes(index)">375 x 375 像素</template> 
                                    <template v-else>250 x 375 像素</template>
                                    <div>{{ data_title(item) }}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <magic-cube :key="form.style_actived" :list="form.data_magic_list" :flag="false" :cube-width="cubeWidth" type="data" :cube-height="cubeHeight" @selected_click="selected_click"></magic-cube>
                    </template>
                </el-form-item>
            </card-container>
            <el-tabs v-model="tabs_name" class="content-tabs">
                <el-tab-pane label="内容设置" name="content">
                    <tabs-content :value="form.data_magic_list[selected_active].data_content" :is-show-title="is_show_title"></tabs-content>
                </el-tab-pane>
                <el-tab-pane label="样式设置" name="styles">
                    <tabs-styles :value="form.data_magic_list[selected_active].data_style" :content="form.data_magic_list[selected_active].data_content" :is-show-title="is_show_title"></tabs-styles>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import { isEmpty, cloneDeep } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});
// 风格数组
const style_list = ['heng2', 'shu2', 'shang2xia1', 'shang1xia2', 'zuo1you2', 'zuo2you1', 'tianzige', 'shang2xia3', 'zuo1youshang1youxia2'];
// 每个小模块独立的样式
const data_style = {
    color_list: [{ color: '#FFD9C3', color_percentage: '0' }, { color: '#FFECE2', color_percentage: '12' }, { color: '#FFFFFF', color_percentage: '30' }],
    direction: '180deg',
    background_img_style: 2,
    background_img_url: [],
    is_roll: false,
    rotation_direction: 'horizontal',
    interval_time: 2,
    heading_color: '#000',
    heading_typeface: 'normal',
    heading_size: 20,
    subtitle_color: '#FF852A',
    subtitle_typeface: 'normal',
    subtitle_size: 14,
    chunk_padding: {
        padding: 0,
        padding_top: 20, 
        padding_bottom: 20, 
        padding_left: 15,
        padding_right: 15,
    },
    is_show: true,
    indicator_style: 'dot',
    indicator_location: 'center',
    indicator_size: 5,
    indicator_radius: {
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
    },
    actived_color: '#2A94FF',
    color: '#DDDDDD',
}
// 每个小模块独立的内容
const data_content = {
    data_type: 'goods',
    heading_title: '主标题',
    subtitle: '副标题',
    goods_list:[],
    is_show: ['title', 'price'],
    images_list:[
        {
            carousel_img: [],
            carousel_link: {},
        }
    ]
}

// 不同风格的数据
const style_show_list = [
    [{ start: {x: 1, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'row', outerflex: 'row' }, { start: {x: 1, y: 3}, end: {x: 4, y: 4}, num: 2, flex: 'row', outerflex: 'row'}], // 风格1
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, num: 3, flex: 'row', outerflex: 'col' }, { start: {x: 3, y: 1}, end: {x: 4, y: 4}, num: 3, flex: 'row', outerflex: 'col' }], // 风格2
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 3, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 1, y: 3}, end: {x: 4, y: 4}, num: 2, flex: 'row', outerflex: 'row' }],// 风格3
    [{ start: {x: 1, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'row', outerflex: 'row' }, { start: {x: 1, y: 3}, end: {x: 2, y: 4}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 3, y: 3}, end: {x: 4, y: 4}, num: 2, flex: 'col', outerflex: 'row' }],// 风格4
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, num: 3, flex: 'row', outerflex: 'col' }, { start: {x: 3, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 3, y: 3}, end: {x: 4, y: 4}, num: 2, flex: 'col', outerflex: 'row' }],// 风格5
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 1, y: 3}, end: {x: 2, y: 4}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 3, y: 1}, end: {x: 4, y: 4}, num: 3, flex: 'row', outerflex: 'col' }],// 风格6
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 3, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 1, y: 3}, end: {x: 2, y: 4}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 3, y: 3}, end: {x: 4, y: 4}, num: 2, flex: 'col', outerflex: 'row' }],// 风格7
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 3, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 3, y: 3}, end: {x: 3, y: 4}, num: 1, flex: 'col', outerflex: 'row' }, { start: {x: 4, y: 3}, end: {x: 4, y: 4}, num: 1, flex: 'col', outerflex: 'row' }, { start: {x: 4, y: 3}, end: {x: 4, y: 4}, num: 1, flex: 'col', outerflex: 'row' }],// 风格8
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, num: 3, flex: 'row', outerflex: 'col' }, { start: {x: 3, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'col', outerflex: 'row' }, { start: {x: 3, y: 3}, end: {x: 3, y: 4}, num: 1, flex: 'col', outerflex: 'row' }, { start: {x: 4, y: 3}, end: {x: 4, y: 4}, num: 1, flex: 'col', outerflex: 'row' }],// 风格9
]
const tabs_name = ref('content');
const state = reactive({
    form: props.value
});
const { form } = toRefs(state);
//#region 容器大小变更
const cubeWidth = ref(400);
const cubeHeight = ref(400);
const style_width = computed(() => cubeWidth.value + 'px');
const style_height = computed(() => cubeHeight.value + 'px');

onBeforeMount(() => {
    if (isEmpty(form.value.data_magic_list)) {
        form.value.data_magic_list = magic_list(0);
    }
})
onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
    if (window.innerWidth <= 1540) {
        cubeWidth.value = 330;
        cubeHeight.value = 330;
    } else {
        cubeWidth.value = 390;
        cubeHeight.value = 390;
    }
}
//#endregion
//#region 选中切换数据
const selected_active = ref(0);
// 切换风格
const style_click = (index: number) => {
    form.value.data_magic_list = magic_list(index);

    form.value.style_actived = index;
    selected_active.value = 0;
    tabs_name.value = 'content';
}
// 规整复制的数据
const magic_list = (index: number) => {
    return cloneDeep(style_show_list[index]).map((item, map_index) => ({
        ...item,
        actived_index: 0,
        data_content: cloneDeep(data_content),
        data_style: {
            ...cloneDeep(data_style),
            chunk_padding: {
                padding: show_padding(index, map_index) ? 10 : 0,
                padding_top: show_padding(index, map_index) ? 10 : 20,
                padding_bottom: show_padding(index, map_index) ? 10 : 20,
                padding_left: show_padding(index, map_index) ? 10 : 15,
                padding_right: show_padding(index, map_index) ? 10 : 15,
            },
            carouselKey: get_math(),
        }
    }));
}

// 选中风格内不同的块
const selected_click = (index: number) => {
    selected_active.value = index;
    tabs_name.value = 'content';
}
const show_padding = (index:number, map_index:number) => {
    return index == 7 && ![0, 1].includes(map_index)
}
//#endregion
const data_title = (item: any) => {
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
// 除了第8个风格下的后3个不显示标题，其他的都显示
const is_show_title = computed(() => !(form.value.style_actived == 7 && ![0, 1].includes(selected_active.value)));
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.flex-item {
    width: 7.6rem;
    height: 7.6rem;
    background: #F7F7F7;
    border-radius: 0.4rem;
    border: 1px solid #E4E4E4;
    padding: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.flex-item-actived {
    background: #F5F9FF;
    border-radius: 4px;
    border: 1px solid #2A94FF;
}
.show-config {
    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
.style-size {
    width: v-bind(style_width);
    height: v-bind(style_height);
    .style9-top {
        width: calc(50% - 0.2rem);
        height: 50%;
        position: relative;
    }
    .style9-bottom {
        width: calc(33% - 0.1rem);
        height: 50%;
        position: relative;
    }
}
.cube-selected-active {
    border: 1px solid $cr-primary;
}
.cube-selected-text {
    font-size: 12px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    color: $cr-primary;
}
:deep(.el-tabs.content-tabs) {
    .el-tabs__header.is-top {
        background: #fff;
        margin: 0;
        padding-top: 2rem;
    }
    .el-tabs__item.is-top {
        padding: 0;
        align-items: center;
        width: 10rem;
        font-size: 1.4rem;
    }
    .el-tabs__active-bar{
        width: 100%;
    }
}
</style>
