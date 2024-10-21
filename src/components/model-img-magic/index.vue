<template>
    <div ref="container" :style="style_container">
        <div class="img-magic" :style="style_img_container">
            <div class="w h re outer-style">
                <!-- 风格3 -->
                <template v-if="form.style_actived == 2">
                    <div class="flex-row align-c jc-c style-size">
                        <div v-for="(item, index) in form.img_magic_list" :key="index" class="three img-spacing-border">
                            <image-empty v-model="item.img[0]" :style="content_img_radius" :fit="form.img_fit"></image-empty>
                        </div>
                    </div>
                </template>
                <!-- 风格9 -->
                <template v-else-if="form.style_actived == 8">
                    <div class="flex-row align-c jc-c style-size flex-wrap">
                        <div v-for="(item, index) in form.img_magic_list" :key="index" :class="['img-spacing-border', { 'style9-top': [0, 1].includes(index), 'style9-bottom': ![0, 1].includes(index) }]">
                            <image-empty v-model="item.img[0]" :style="content_img_radius" :fit="form.img_fit"></image-empty>
                        </div>
                    </div>
                </template>
                <template v-else-if="form.style_actived == 10">
                    <template v-if="form.limit_size == '0'">
                        <div v-for="(item, index) in form.img_magic_list" :key="index" :class="['img-spacing-border', { 'h': item.img.length > 0, 'style_actived_10': item.img.length == 0 }]" :style="selected_style(item)">
                            <image-empty v-model="item.img[0]" :style="content_img_radius" fit="contain"></image-empty>
                        </div>
                    </template>
                    <template v-else>
                        <div v-for="(item, index) in form.img_magic_list" :key="index" class="img-spacing-border" :style="`${ selected_style(item) };height: ${ form.image_height }px;`">
                            <image-empty v-model="item.img[0]" :style="content_img_radius" :fit="form.img_fit"></image-empty>
                        </div>
                    </template>
                </template>
                <template v-else>
                    <div v-for="(item, index) in form.img_magic_list" :key="index" class="cube-selected img-spacing-border" :style="selected_style(item)">
                        <image-empty v-model="item.img[0]" :style="content_img_radius" :fit="form.img_fit"></image-empty>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_img_computer, common_styles_computer, radius_computer } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});
// 用于页面判断显示
const state = reactive({
    form: props.value.content,
    new_style: props.value.style,
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);

const new_style_spacing = computed(() => form.value.style_actived === 10 ? 0 : (new_style.value?.image_spacing || 0));
const outer_spacing = computed(() => new_style_spacing.value + 'px');
const outer_sx = computed(() => -(new_style_spacing.value / 2) + 'px');
// 图片间距设置
const spacing = computed(() => new_style_spacing.value / 2 + 'px');
// 图片圆角设置
const content_img_radius = computed(() => radius_computer(new_style.value));
//#region 容器大小计算
const div_width = ref(0);
const container_size = computed(() => form.value.style_actived === 10 ? '100%' : div_width.value + 'px');
const container_size_10 = computed(() => div_width.value + 'px');
const container = ref<HTMLElement | null>(null);
onMounted(() => {
    if (container.value) {
        div_width.value = container.value.clientWidth;
    }
});
//#endregion
//#region 图片位置计算
//计算选中层的宽度。
interface CubeItem {
    start: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
    img: string;
}
const density = ref('4');
//单元魔方宽度。
const cubeCellWidth = computed(() => div_width.value / parseInt(density.value));
//单元魔方高度。
const cubeCellHeight = computed(() => div_width.value / parseInt(density.value));
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
// 根据当前页面大小计算成百分比
const selected_style = (item: CubeItem) => {
    return `width: ${percentage(getSelectedWidth(item))}; height: ${percentage(getSelectedHeight(item))}; top: ${percentage(getSelectedTop(item))}; left: ${percentage(getSelectedLeft(item))};`;
};
// 计算成百分比
const percentage = (num: number) => {
    const marks = (num / div_width.value) * 100;
    return marks.toFixed(4) + '%';
};
//#endregion
// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
</script>
<style lang="scss" scoped>
// 图片魔方是一个正方形，根据宽度计算高度
.img-magic {
    height: v-bind(container_size);
    width: 100%;
    overflow: hidden;
}
.cube-selected {
    position: absolute;
    text-align: center;
    color: $cr-main;
    box-sizing: border-box;
}
.outer-style {
    width: calc(100% + v-bind(outer_spacing));
    height: calc(100% + v-bind(outer_spacing));
    margin: v-bind(outer_sx);
}
.img-spacing-border {
    padding: v-bind(spacing);
}
.style_actived_10 {
    height: v-bind(container_size_10) !important;
}
.style-size {
    height: 100%;
    width: 100%;
    .three {
        width: 33%;
        height: 100%;
        position: relative;
    }
    .style9-top {
        width: 50%;
        height: 50%;
        position: relative;
    }
    .style9-bottom {
        width: calc(100% / 3);
        height: 50%;
        position: relative;
    }
}
:deep(.el-image) {
    height: 100%;
    width: 100%;
    .el-image__inner {
        object-fit: cover;
    }
    .image-slot img {
        width: 6rem;
    }
}
</style>
