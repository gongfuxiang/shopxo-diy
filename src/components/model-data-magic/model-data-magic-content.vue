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
                                <template v-if="!isEmpty(item.img[0])">
                                    <image-empty v-model="item.img[0]"></image-empty>
                                </template>
                                <template v-else>
                                    <div class="cube-selected-text">
                                        <template v-if="[0, 1].includes(index)">375 x 375 像素</template> 
                                        <template v-else>250 x 375 像素</template> 
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <magic-cube :key="form.style_actived" :list="form.data_magic_list" :flag="false" :cube-width="cubeWidth" type="data" :cube-height="cubeHeight" @selected_click="selected_click"></magic-cube>
                    </template>
                </el-form-item>
            </card-container>
            <el-tabs v-model="tabs_name" class="content-tabs">
                {{ form.data_magic_list[selected_active] }}
                <el-tab-pane label="内容设置" name="content">
                    <tabs-content :value="form.data_magic_list[selected_active].data_content"></tabs-content>
                </el-tab-pane>
                <el-tab-pane label="样式设置" name="styles">
                    <tabs-styles :value="form.data_magic_list[selected_active].data_style"></tabs-styles>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { isEmpty, cloneDeep } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});
const style_list = ['heng2', 'shu2', 'shang2xia1', 'shang1xia2', 'zuo1you2', 'zuo2you1', 'tianzige', 'shang2xia3', 'zuo1youshang1youxia2'];

const data_style = {
    color_list: ['#FFD9C3', '#FFECE2', '#FFFFFF'],
    direction: '90deg',
    background_img_style: 2,
    background_img_url: [],
    is_roll: true,
    rotation_direction: 'horizontal',
    interval_time: 2,
    heading_color: '#000',
    heading_typeface: 'normal',
    heading_size: 12,
    subtitle_color: '#000',
    subtitle_typeface: 'normal',
    subtitle_size: 12,
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

const data_content = {
    data_type: 'commodity',
    product_list:[],
    img_list:[]
}

// 风格
const style_show_list = [
    [{ start: {x: 1, y: 1}, end: {x: 4, y: 2} }, { start: {x: 1, y: 3},end: {x: 4, y: 4} }], // 风格1
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4} }, { start: {x: 3, y: 1},end: {x: 4, y: 4} }], // 风格2
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2} }, { start: {x: 3, y: 1},end: {x: 4, y: 2} }, { start: {x: 1, y: 3},end: {x: 4, y: 4} }],// 风格3
    [{ start: {x: 1, y: 1}, end: {x: 4, y: 2} }, { start: {x: 1, y: 3},end: {x: 2, y: 4} }, { start: {x: 3, y: 3},end: {x: 4, y: 4} }],// 风格4
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4} }, { start: {x: 3, y: 1},end: {x: 4, y: 2} }, { start: {x: 3, y: 3},end: {x: 4, y: 4} }],// 风格5
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2} }, { start: {x: 1, y: 3},end: {x: 2, y: 4} }, { start: {x: 3, y: 1},end: {x: 4, y: 4} }],// 风格6
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2} }, { start: {x: 3, y: 1},end: {x: 4, y: 2} }, { start: {x: 1, y: 3},end: {x: 2, y: 4} }, { start: {x: 3, y: 3},end: {x: 4, y: 4} }],// 风格7
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4} }, { start: {x: 3, y: 1},end: {x: 4, y: 2} }, { start: {x: 3, y: 3},end: {x: 3, y: 4} }, { start: {x: 4, y: 3},end: {x: 4, y: 4} }, { start: {x: 4, y: 3},end: {x: 4, y: 4} }],// 风格8
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4} }, { start: {x: 3, y: 1},end: {x: 4, y: 2} }, { start: {x: 3, y: 3},end: {x: 3, y: 4} }, { start: {x: 4, y: 3},end: {x: 4, y: 4} }],// 风格9
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

function handleResize() {
    if (window.innerWidth <= 1540) {
        cubeWidth.value = 330;
        cubeHeight.value = 330;
    } else {
        cubeWidth.value = 390;
        cubeHeight.value = 390;
    }
}
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
//#endregion
const selected_active = ref(0);

const style_click = (index: number) => {
    form.value.data_magic_list = cloneDeep(style_show_list[index]);

    form.value.style_actived = index;
    selected_active.value = 0;
}
const magic_list = (index: number) => {
    return cloneDeep(style_show_list[index]).map((item) => ({
        ...item,
        data_content: cloneDeep(data_content),
        data_style: cloneDeep(data_style)
    }));
}

// 选中的点击事件
const selected_click = (index: number) => {
    selected_active.value = index;
}
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
