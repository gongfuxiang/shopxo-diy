<template>
    <div :style="style_content_container">
        <div :style="style_content_img_container">
            <template v-if="data_source_content_list.length > 0 && form.data_source_direction == 'vertical'">
                <div class="flex-row flex-wrap" :style="`row-gap: ${ new_style.row_gap }px;column-gap: ${ new_style.column_gap }px;`">
                    <div v-for="(item1, index1) in data_source_content_list" :key="index1" :style="`width: ${ gap_width }`">
                        <div :style="style_container">
                            <div class="w h oh" :style="style_img_container">
                                <data-rendering :custom-list="form.custom_list" :source-list="item1" :is-custom="form.is_custom_data == '1'" :show-data="form?.show_data || { data_key: 'id', data_name: 'name' }" :data-height="form.height" :scale="scale"></data-rendering>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div v-else-if="data_source_content_list.length > 0 && ['vertical-scroll', 'horizontal'].includes(form.data_source_direction)" class="oh" :style="form.data_source_direction == 'horizontal' ? `height:100%;` : `height: ${ swiper_height }px;`">
                <swiper :key="carouselKey" class="w flex" :direction="form.data_source_direction == 'horizontal' ? 'horizontal': 'vertical'" :height="swiper_height" :loop="true" :autoplay="autoplay" :slides-per-view="slides_per_view" :slides-per-group="slides_per_group" :space-between="space_between" :allow-touch-move="false" :pause-on-mouse-enter="true" :modules="modules" @slide-change="slideChange">
                    <swiper-slide v-for="(item1, index1) in data_source_content_list" :key="index1">
                        <div :style="style_container">
                            <div class="w h oh" :style="style_img_container">
                                <data-rendering :custom-list="form.custom_list" :source-list="item1" :is-custom="form.is_custom_data == '1'" :show-data="form?.show_data || { data_key: 'id', data_name: 'name' }" :data-height="form.height" :scale="scale"></data-rendering>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <template v-else>
                <div class="oh" :style="style_container">
                    <div class="w h oh" :style="style_img_container">
                        <data-rendering :custom-list="form.custom_list" :data-height="form.height" :scale="scale"></data-rendering>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, border_computer, border_width, box_shadow_computer, common_img_computer, common_styles_computer, get_math, gradient_computer, margin_computer, old_border_and_box_shadow, old_margin, old_padding, old_radius, padding_computer, radius_computer } from '@/utils';
import { isEmpty } from "lodash";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
const modules = [Autoplay];

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
    magicScale: {
        type: Number,
        default: 1,
    },
    dataSpacing: {
        type: Number,
        default: 0,
    }
});
// 用于页面判断显示
const state = reactive({
    form: props.value.data_content,
    new_style: props.value.data_style,
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);
const scale = ref(1);
provide('field_list', computed(() => form.value.field_list));
// 数据来源的内容
let data_source_content_list = computed(() => {
    if (form.value.is_custom_data == '1') {
        if (Number(form.value.data_source_content.data_type) == 0) {
            return form.value.data_source_content.data_list;
        } else {
            return form.value.data_source_content.data_auto_list.map((item: any) => ({
                id: Math.random(),
                new_cover: [],
                new_title: '',
                data: item,
            }));
        }
    } else {
        return form.value.data_source_content.data_list;
    }
})
interface new_style {
    data_color_list: color_list[];
    data_direction: string;
    data_radius: radiusStyle;
    data_chunk_margin: marginStyle;
    data_chunk_padding: paddingStyle;
    data_background_img: uploadList[];
    data_background_img_style: string;
}
// 默认数据
const defalt_style: any = {
    color_list: [{ color: '', color_percentage: undefined }],
    direction: '180deg',
    background_img_style: '2',
    background_img: [],
    radius: 0,
    radius_top_left: 0,
    radius_top_right: 0,
    radius_bottom_left: 0,
    radius_bottom_right: 0,
    padding: 0,
    padding_top: 0,
    padding_bottom: 0,
    padding_left: 0,
    padding_right: 0,
    margin: 0,
    margin_top: 0,
    margin_bottom: 0,
    margin_left: 0,
    margin_right: 0,
};
// 内容样式
const style_content_container = computed(() => {
    if (!isEmpty(new_style.value.data_content_style)) {
        return common_styles_computer(new_style.value.data_content_style);
    } else {
        // 没有样式的时候，使用默认样式
        return common_styles_computer(defalt_style);
    }
});
const style_content_img_container = computed(() => {
    if (!isEmpty(new_style.value.data_content_style)) {
        return common_img_computer(new_style.value.data_content_style);
    } else {
        return common_img_computer(defalt_style);
    }
});
// 用于样式显示
const style_container = computed(() => {
    if (!isEmpty(new_style.value)) {
        const { data_color_list = [], data_direction = '180deg', data_radius = old_radius, data_chunk_margin = old_margin, data_pattern = old_border_and_box_shadow } = new_style.value;
        const data = {
            color_list: data_color_list,
            direction: data_direction,
        }
        return gradient_computer(data) + radius_computer(data_radius) + margin_computer(data_chunk_margin) + box_shadow_computer(data_pattern) + border_computer(data_pattern);
    } else {
        return '';
    }
});
const style_img_container = computed(() => {
    if (!isEmpty(new_style.value)) {
        const { data_background_img = [], data_background_img_style = '2', data_chunk_padding = old_padding } = new_style.value;
        const data = {
            background_img: data_background_img,
            background_img_style: data_background_img_style,
        }
        return padding_computer(data_chunk_padding) + background_computer(data);
    } else {
        return '';
    }
});
// 数据来源的内容 和缩放比例的处理
watchEffect(() => {
    // 重新赋值
    form.value = props.value.data_content;
    new_style.value = props.value.data_style;
    const old_width = form.value.width * props.magicScale;
    // 数据样式
    const { padding_left, padding_right } = new_style.value.data_chunk_padding;
    const { margin_left, margin_right } = new_style.value.data_chunk_margin;
    const data_style = padding_left + padding_right + margin_left + margin_right + border_width(new_style.value.data_pattern);
    // 通用样式
    const common_border = new_style.value?.data_common_style || {};
    const chunk_padding = new_style.value?.chunk_padding || old_padding;
    const chunk_margin = new_style.value?.chunk_margin || old_margin;
    const common_styles = (chunk_margin?.margin_left || 0) + (chunk_margin?.margin_right || 0) + (chunk_padding?.padding_left || 0) + (chunk_padding?.padding_right || 0) + border_width(common_border);
    // 内容左右间距
    const data_content_style = new_style.value?.data_content_style || {};
    const content_spacing = (data_content_style?.margin_left || 0) + (data_content_style?.margin_right || 0) + (data_content_style?.padding_left || 0) + (data_content_style?.padding_right || 0) + border_width(data_content_style);
    // 数据间距
    const data_spacing = ['vertical', 'horizontal'].includes(form.value.data_source_direction) ? new_style.value.column_gap * (form.value.data_source_carousel_col - 1) : 0;
    // 当前容器的宽度 减去 左右两边的padding值 再减去 数据间距的一半 再除以 容器的宽度 得到比例 再乘以数据魔方的比例
    const width = old_width - data_style - content_spacing - common_styles - data_spacing - (props.dataSpacing / 2);
    scale.value = width / form.value.width;
})

// 计算纵向显示的宽度
const gap_width = computed(() => {
    const model_number = Number(form.value.data_source_carousel_col);
    // 计算间隔的空间。(gap * gap数量) / 模块数量
    let gap = (new_style.value.column_gap * (model_number - 1)) / model_number;
    return `calc(${100 / model_number}% - ${gap}px)`;
});
//#region 轮播图操作
// 轮播图key值
const carouselKey = ref('0');
const autoplay = ref<boolean | object>(false);
const slides_per_group = ref(1);
const slides_per_view = ref(1);
const swiper_height = ref(150);
const space_between = ref(0);
const emit = defineEmits(['carousel_change']);
// 内容参数的集合
watchEffect(() => {
    // 是否滚动
    if (new_style.value.is_roll == '1') {
        autoplay.value = {
            delay: (new_style.value.interval_time || 2) * 1000,
            pauseOnMouseEnter: true,
        };
    } else {
        autoplay.value = false;
    }
    // 间距
    space_between.value = form.value.data_source_direction == 'horizontal' ? new_style.value.column_gap : new_style.value.row_gap;
    // 显示数量
    const carousel_col = Number(form.value?.data_source_carousel_col) || 1;
    // 判断是平移还是整屏滚动
    slides_per_group.value = new_style.value.rolling_fashion == 'translation' ? 1 : carousel_col;
    // 商品数量大于列数的时候，高度是列数，否则是当前的数量
    const col = data_source_content_list.value.length > carousel_col ? carousel_col : data_source_content_list.value.length;
    // 一屏显示的数量
    slides_per_view.value = col;
    const { margin_bottom, margin_top } = new_style.value.data_chunk_margin;
    const { padding_top, padding_bottom } = new_style.value.data_chunk_padding;
    // 轮播图高度控制
    if (form.value.data_source_direction == '2') {
        swiper_height.value = form.value.height * scale.value + padding_top + padding_bottom + margin_bottom + margin_top;
    } else {
        swiper_height.value = (form.value.height * scale.value + padding_top + padding_bottom + margin_bottom + margin_top) * col + ((carousel_col - 1) * space_between.value);
    }
    // 更新轮播图的key，确保更换时能重新更新轮播图
    carouselKey.value = get_math();
});

const slideChange = (swiper: { realIndex: number }) => {
    const carousel_col = form.value?.data_source_carousel_col || 1;
    // 计算当前的下标
    const realIndex = Math.ceil(swiper.realIndex / carousel_col);
    // 轮播图滚动时，更新当前激活的下标， 如果不是平移的时候，需要除以列数，否则就是当前的下标
    const index = new_style.value.rolling_fashion == 'translation' ? swiper.realIndex : realIndex > 0 ? realIndex : 0;
    emit('carousel_change', index);
};
//#endregion
</script>
<style lang="scss" scoped>
</style>
