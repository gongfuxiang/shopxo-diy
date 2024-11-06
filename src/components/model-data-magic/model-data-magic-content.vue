<template>
    <div class="w h">
        <el-form :model="form" label-width="80">
            <card-container>
                <div class="mb-12">展示风格</div>
                <el-form-item label="选择风格" label-width="60">
                    <div class="flex align-c flex-wrap gap-10">
                        <div v-for="(item, index) in style_list" :key="index" :class="['flex-item', {'flex-item-actived': form.style_actived === index }]" @click="style_click(index)">
                            <icon :name="item" :color="`${ form.style_actived === index ? '#E1EEF9' : '#EDEDED'}`" size="30"></icon>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="容器高度" label-width="60">
                    <slider v-model="form.container_height" :min="30" :max="1000" @update:model-value="handleResize"></slider>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12 flex-row jc-sb align-c">
                    展示设置
                    <template v-if="form.style_actived === 9">
                        <el-radio-group v-model="form.magic_cube_density" @change="density_change">
                            <el-radio-button label="4X4" :value="4" />
                            <el-radio-button label="6X6" :value="6" />
                            <el-radio-button label="8X8" :value="8" />
                        </el-radio-group>
                    </template>
                </div>
                <el-form-item label-width="0" class="show-config">
                    <!-- 风格9 -->
                    <template v-if="form.style_actived == 7">
                        <div class="flex-row align-c jc-c gap-2 style-size flex-wrap">
                            <div v-for="(item, index) in form.data_magic_list" :key="index" :class="['bg-f5 oh', {'cube-selected-active': selected_active == index, 'style9-top': [0, 1].includes(index), 'style9-bottom': ![0, 1].includes(index)}]" @click="selected_click(index)">
                                <div class="cube-selected-text">
                                    <template v-if="[0, 1].includes(index)">建议195 x {{ Math.round(form.container_height / 2) }}px</template> 
                                    <template v-else>建议130 x {{ Math.round(form.container_height / 2) }}px</template>
                                    <div>{{ data_title(item) }}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <magic-cube :key="form.style_actived" :list="form.data_magic_list" :flag="form.style_actived == 9" :magic-cube-density="form.magic_cube_density" :cube-width="cubeWidth" type="data" :cube-height="cubeHeight" :default-content="data_content" :default-style="data_style" @selected_click="selected_click"></magic-cube>
                    </template>
                </el-form-item>
            </card-container>
            <!-- 内容和样式组件 -->
            <template v-if="!isEmpty(form.data_magic_list[selected_active])">
                <div class="bg-f5 divider-line" />
                <el-tabs v-model="tabs_name" class="content-tabs">
                    <el-tab-pane label="内容设置" name="content">
                        <tabs-content :value="form.data_magic_list[selected_active].data_content"></tabs-content>
                    </el-tab-pane>
                    <el-tab-pane label="样式设置" name="styles">
                        <tabs-styles :value="form.data_magic_list[selected_active].data_style" :content="form.data_magic_list[selected_active].data_content"></tabs-styles>
                    </el-tab-pane>
                </el-tabs>
            </template>
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
const style_list = ['heng2', 'shu2', 'shang2xia1', 'shang1xia2', 'zuo1you2', 'zuo2you1', 'tianzige', 'shang2xia3', 'zuo1youshang1youxia2', 'a-4x4'];
// 每个小模块独立的样式
const data_style = {
    color_list: [{ color: '#FFD9C3', color_percentage: 0 }, { color: '#FFECE2', color_percentage: 12 }, { color: '#FFFFFF', color_percentage: 30 }],
    direction: '180deg',
    background_img_style: '2',
    background_img: [],
    carouselKey: get_math(),
    is_roll: '0',
    rotation_direction: 'horizontal',
    interval_time: 3,
    title_gap: 5,
    title_data_gap: 10,
    heading_color: '#000',
    heading_typeface: '400',
    heading_size: 20,
    heading_img_height: 28,
    subtitle_color: '#FF852A',
    subtitle_typeface: '400',
    subtitle_size: 14,
    goods_title_typeface: '500',
    goods_title_size: 14,    
    goods_title_color: "#333333",
    goods_price_typeface: '500',
    goods_price_size: 18,
    goods_price_color: "#EA3323;",
    goods_color_list: [{ color: '', color_percentage: undefined }],
    goods_direction: '180deg',
    goods_background_img_style: '2',
    goods_background_img: [],
    goods_chunk_padding: {
        padding: 0,
        padding_top: 0, 
        padding_bottom: 0, 
        padding_left: 0,
        padding_right: 0,
    },
    goods_radius: {
        radius: 4,
        radius_top_left: 4,
        radius_top_right: 4,
        radius_bottom_left: 4,
        radius_bottom_right: 4,
    },
    chunk_padding: {
        padding: 0,
        padding_top: 20, 
        padding_bottom: 20, 
        padding_left: 15,
        padding_right: 15,
    },
    // 图片圆角
    img_radius: {
        radius: 4,
        radius_top_left: 4,
        radius_top_right: 4,
        radius_bottom_left: 4,
        radius_bottom_right: 4,
    },
    is_show: '1',
    data_goods_gap: 10,
    data_color_list: [{ color: '', color_percentage: undefined }],
    data_direction: '180deg',
    data_background_img_style: '2',
    data_background_img: [],
    data_chunk_padding: {
        padding: 0,
        padding_top: 0, 
        padding_bottom: 0, 
        padding_left: 0,
        padding_right: 0,
    },
    data_radius: {
        radius: 4,
        radius_top_left: 4,
        radius_top_right: 4,
        radius_bottom_left: 4,
        radius_bottom_right: 4,
    },
    indicator_style: 'dot',
    indicator_location: 'center',
    indicator_size: 5,
    indicator_bottom: 6,
    indicator_radius: {
        radius: 4,
        radius_top_left: 4,
        radius_top_right: 4,
        radius_bottom_left: 4,
        radius_bottom_right: 4,
    },
    actived_color: '#2A94FF',
    color: '#DDDDDD',
}
// 每个小模块独立的内容
const data_content = {
    // 列表数据类型
    data_type: 'goods',
    // 主标题副标题处理
    heading_title_type: 'text',
    heading_title: '主标题',
    heading_title_img: [],
    subtitle: '副标题',
    // 商品数据处理
    goods_list:[],
    goods_ids: '',
    goods_outerflex: 'row',
    goods_flex: 'row',
    goods_num: 1,
    is_show: ['title', 'price'],
    // 图片数据处理
    img_fit: 'cover',
    images_list:[
        {
            carousel_img: [],
            carousel_link: {},
        }
    ],
    // 自定义数据处理
    // 容器的基础高度
    height: 150,
    // 容器基础的宽度
    width: 0,
    // 图片key  
    img_key: '',
    // 存放数据内容的id
    data_source_content_value: '',
    // 数据源内容
    data_source_content: {},
    // 数据源
    data_source:'',
    // 自定义内容列表
    custom_list: [],
    //视频信息
    video: [],
    video_img: [],
}

// 不同风格的数据
const style_show_list = [
    [{ start: {x: 1, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'row', outerflex: 'row', title_text_gap: 20, width: 390 }, { start: {x: 1, y: 3}, end: {x: 4, y: 4}, num: 2, flex: 'row', outerflex: 'row', title_text_gap: 20, width: 390 }], // 风格1
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, num: 3, flex: 'row', outerflex: 'col', title_text_gap: 20, width: 195 }, { start: {x: 3, y: 1}, end: {x: 4, y: 4}, num: 3, flex: 'row', outerflex: 'col', title_text_gap: 20, width: 195 }], // 风格2
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 3, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 1, y: 3}, end: {x: 4, y: 4}, num: 2, flex: 'row', outerflex: 'row', title_text_gap: 20, width: 390 }],// 风格3
    [{ start: {x: 1, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'row', outerflex: 'row', title_text_gap: 20, width: 390 }, { start: {x: 1, y: 3}, end: {x: 2, y: 4}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 3, y: 3}, end: {x: 4, y: 4}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }],// 风格4
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, num: 3, flex: 'row', outerflex: 'col', title_text_gap: 20, width: 390 }, { start: {x: 3, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 3, y: 3}, end: {x: 4, y: 4}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }],// 风格5
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 1, y: 3}, end: {x: 2, y: 4}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 3, y: 1}, end: {x: 4, y: 4}, num: 3, flex: 'row', outerflex: 'col', title_text_gap: 20, width: 390 }],// 风格6
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 3, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 1, y: 3}, end: {x: 2, y: 4}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 3, y: 3}, end: {x: 4, y: 4}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }],// 风格7
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 3, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 3, y: 3}, end: {x: 3, y: 4}, num: 1, flex: 'col', outerflex: 'col', title_text_gap: 20, width: 130 }, { start: {x: 4, y: 3}, end: {x: 4, y: 4}, num: 1, flex: 'col', outerflex: 'col', title_text_gap: 20, width: 130 }, { start: {x: 4, y: 3}, end: {x: 4, y: 4}, num: 1, flex: 'col', outerflex: 'col', title_text_gap: 20, width: 130 }],// 风格8
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, num: 3, flex: 'row', outerflex: 'col', title_text_gap: 20, width: 195 }, { start: {x: 3, y: 1}, end: {x: 4, y: 2}, num: 2, flex: 'col_price_float', outerflex: 'row', title_text_gap: 10, width: 195 }, { start: {x: 3, y: 3}, end: {x: 3, y: 4}, num: 1, flex: 'col_price_float', outerflex: 'col', title_text_gap: 10, width: 98 }, { start: {x: 4, y: 3}, end: {x: 4, y: 4}, num: 1, flex: 'col_price_float', outerflex: 'col', title_text_gap: 10, width: 98 }],// 风格9
    [], //风格10
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
    } else {
        // 历史数据处理一下，避免有新增字段导致报错
        form.value.data_magic_list.forEach((item: any) => {
            item.data_style = Object.assign({}, cloneDeep(data_style), item.data_style);
            item.data_content = Object.assign({}, cloneDeep(data_content), item.data_content);
        });
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
    if (window.innerWidth <= 1560) {
        const sales = 330 / 390;
        cubeWidth.value = 330;
        cubeHeight.value = form.value.container_height * sales;
    } else {
        cubeWidth.value = 390;
        cubeHeight.value = form.value.container_height;
    }
}
//#endregion
//#region 选中切换数据
const selected_active = ref(0);
// 切换风格
const style_click = (index: number) => {
    if (index !== 9) {
        form.value.magic_cube_density = 4;
        form.value.data_magic_list = magic_list(index);
    } else {
        form.value.data_magic_list = [];
    }
    form.value.style_actived = index;
    selected_active.value = 0;
    tabs_name.value = 'content';
    handleResize();
}
// 规整复制的数据
const magic_list = (index: number) => {
    return cloneDeep(style_show_list[index]).map((item, map_index) => ({
        ...item,
        actived_index: 0,
        data_content: {
            ...cloneDeep(data_content),
            width: item.width,
            heading_title: module_7_handle(index, map_index) ? '' : data_content.heading_title,
            subtitle: module_7_handle(index, map_index) ? '' : data_content.subtitle,
            goods_outerflex: item.outerflex,
            goods_flex: item.flex,
            goods_num: item.num,
        },
        data_style: {
            ...cloneDeep(data_style),
            title_data_gap: item.title_text_gap,
            goods_price_size: different_styles(index, map_index) ? 12 : 18,
            chunk_padding: {
                padding: module_7_handle(index, map_index) ? 0 : 0,
                padding_top: module_7_handle(index, map_index) ? 0 : 20,
                padding_bottom: module_7_handle(index, map_index) ? 0 : 20,
                padding_left: module_7_handle(index, map_index) ? 0 : 15,
                padding_right: module_7_handle(index, map_index) ? 0 : 15,
            },
            goods_chunk_padding: {
                padding: module_7_handle(index, map_index) ? 10 : 0,
                padding_top: module_7_handle(index, map_index) ? 10 : 0,
                padding_bottom: module_7_handle(index, map_index) ? 10 : 0,
                padding_left: module_7_handle(index, map_index) ? 10 : 0,
                padding_right: module_7_handle(index, map_index) ? 10 : 0,
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
const padding_handle = [
    { index: 2, index_index: [0 , 1] },
    { index: 3, index_index: [1 , 2] },
    { index: 4, index_index: [1 , 2] },
    { index: 5, index_index: [0, 1] }, 
    { index: 6, index_index: [0, 1, 2, 3] },
    { index: 7, index_index: [0, 1] },
    { index: 8, index_index: [1, 2, 3] },
]
const different_styles = (index:number, map_index:number) => {
    const list = padding_handle.filter(item => item.index == index && item.index_index.includes(map_index))
    if (list.length > 0) {
        return true;
    }
    return false;
}

const module_7_handle = (index:number, map_index:number) => {
    return index == 7 && ![0, 1].includes(map_index);
}
// 密度切换时情况数据
const density_change = () => {
    form.value.data_magic_list = [];
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
</script>
<style lang="scss" scoped>
.flex-item {
    width: 4.7rem;
    height: 4.7rem;
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
