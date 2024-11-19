<template>
    <template v-if="data_source_content_list.length > 0 && form.data_source_direction == '0'">
        <div v-for="(item1, index1) in data_source_content_list" :key="index1" class="oh" :style="style_container">
            <div class="w h oh" :style="style_img_container">
                <data-rendering :custom-list="form.custom_list" :source-list="item1" :source-type="form?.data_source || ''" :data-height="form.height" :scale="scale"></data-rendering>
            </div>
        </div>
    </template>
    <div v-else-if="data_source_content_list.length > 0 && ['1', '2'].includes(form.data_source_direction)" class="oh" :style="form.data_source_direction == '2' ? `height:100%;` : `height: ${ swiper_height }px;`">
        <swiper :key="carouselKey" class="w flex" :direction="form.data_source_direction == '2' ? 'horizontal': 'vertical'" :height="swiper_height" :loop="true" :autoplay="autoplay" :slides-per-view="form.data_source_carousel_col" :slides-per-group="slides_per_group" :allow-touch-move="false" :pause-on-mouse-enter="true" :modules="modules" @slide-change="slideChange">
            <swiper-slide v-for="(item1, index1) in data_source_content_list" :key="index1">
                <div :style="style_container">
                    <div class="w h" :style="style_img_container">
                        <data-rendering :custom-list="form.custom_list" :source-list="item1" :source-type="form?.data_source || ''" :data-height="form.height" :scale="scale"></data-rendering>
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
</template>
<script setup lang="ts">
import { background_computer, get_math, gradient_computer, margin_computer, padding_computer, radius_computer } from '@/utils';
import { isEmpty } from "lodash";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
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
// 数据来源的内容
let data_source_content_list = computed(() => {
    if (['goods', 'article', 'brand'].includes(form.value.data_source)) {
        if (form.value.data_source_content.data_type == '0') {
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
// 用于样式显示
const style_container = computed(() => {
    if (!isEmpty(new_style.value)) {
        const { data_color_list = [], data_direction = '180deg', data_radius = { radius: 0, radius_top_left: 0, radius_top_right: 0, radius_bottom_left: 0, radius_bottom_right: 0 }, data_chunk_margin = { margin: 0, margin_top: 0, margin_bottom: 0, margin_left: 0, margin_right: 0 }} = new_style.value;
        const data = {
            color_list: data_color_list,
            direction: data_direction,
        }
        return gradient_computer(data) + radius_computer(data_radius) + margin_computer(data_chunk_margin);
    } else {
        return '';
    }
});
const style_img_container = computed(() => {
    if (!isEmpty(new_style.value)) {
        const { data_background_img = [], data_background_img_style = '2', data_chunk_padding = { padding: 0, padding_top: 0, padding_bottom: 0, padding_left: 0, padding_right: 0 }} = new_style.value;
        const data = {
            background_img: data_background_img,
            background_img_style: data_background_img_style,
        }
        return padding_computer(data_chunk_padding) + background_computer(data);
    } else {
        return '';
    }
});
watchEffect(() => {
    // 重新赋值
    form.value = props.value.data_content;
    new_style.value = props.value.data_style;

    const { padding_left, padding_right } = new_style.value.data_chunk_padding;
    const { margin_left, margin_right } = new_style.value.data_chunk_margin;
    // 当前容器的宽度 减去 左右两边的padding值 再减去 数据间距的一半 再除以 容器的宽度 得到比例 再乘以数据魔方的比例
    const width = form.value.width - padding_left - padding_right - margin_left - margin_right - (props.dataSpacing / 2);
    scale.value = (width / form.value.width) * props.magicScale;
})
//#region 轮播图操作
// 轮播图key值
const carouselKey = ref('0');
const autoplay = ref<boolean | object>(false);
const slides_per_group = ref(1);
const dot_list = ref<unknown[]>([]);
const swiper_height = ref(150);
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
    const carousel_col = form.value?.data_source_carousel_col || 1;
    // 判断是平移还是整屏滚动
    slides_per_group.value = new_style.value.rolling_fashion == 'translation' ? 1 : carousel_col;
    const { margin_bottom, margin_top } = new_style.value.data_chunk_margin;
    const { padding_top, padding_bottom } = new_style.value.data_chunk_padding;
    // 轮播图高度控制
    if (form.value.data_source_direction == '2') {
        swiper_height.value = form.value.height * scale.value + padding_top + padding_bottom + margin_bottom + margin_top;
    } else {
        swiper_height.value = (form.value.height * scale.value + padding_top + padding_bottom + margin_bottom + margin_top) * carousel_col;
    }
    // 更新轮播图的key，确保更换时能重新更新轮播图
    carouselKey.value = get_math();
});

const slideChange = (swiper: { realIndex: number }) => {
    const carousel_col = form.value?.data_source_carousel_col || 1;
    // 轮播图滚动时，更新当前激活的下标， 如果不是平移的时候，需要除以列数，否则就是当前的下标
    const index = new_style.value.rolling_fashion == 'translation' ? swiper.realIndex : (swiper.realIndex / carousel_col) > 0 ? (swiper.realIndex / carousel_col) : 0;
    emit('carousel_change', index);
};
//#endregion
</script>
<style lang="scss" scoped>
</style>
