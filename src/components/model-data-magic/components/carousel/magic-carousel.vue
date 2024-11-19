<template>
    <div ref="card_container" class="w h oh" :style="props.type === 'img' ? '' : style_container">
        <div class="w re oh" :style="props.type === 'img' ? `height: ${ outer_height }px;` : `height: ${ outer_height }px;${ style_img_container }`">
            <swiper :key="form.data_style.carouselKey" class="w flex" :direction="form.data_style.rotation_direction" :loop="true" :autoplay="autoplay" :slides-per-view="slides_per_view" :slides-per-group="1" :space-between="props.type === 'img' ? 0 : form.data_style.data_goods_gap" :allow-touch-move="false" :pause-on-mouse-enter="true" :modules="modules" @slide-change="slideChange">
                <swiper-slide v-for="(item1, index1) in form.data_content.list" :key="index1">
                    <template v-if="props.type === 'img'">
                        <image-empty v-model="item1.carousel_img[0]" :style="form.data_style.get_img_radius" :fit="form.data_content.img_fit"></image-empty>
                    </template>
                    <template v-else>
                        <product-list-show :outerflex="form.data_content.goods_outerflex" :flex="form.data_content.goods_flex" :num="show_num" :actived="props.actived" :is-show="form.data_content.is_show" :chunk-padding="form.data_style.chunk_padding" :value="item1.split_list" :good-style="props.goodStyle" :content-img-radius="form.data_style.get_img_radius"></product-list-show>
                    </template>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup lang="ts">
import { gradient_computer, radius_computer, padding_computer, background_computer } from "@/utils";
import { isEmpty } from "lodash";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
const modules = [Autoplay];

interface Props {
    value: any;
    type: string;
    actived: number;
    goodStyle?: any;
}

const props = withDefaults(defineProps<Props>(), {
    goodStyle: {},
});

const form = computed(() => props.value);
// 用于样式显示
const style_container = computed(() => {
    if (!isEmpty(form.value.data_style)) {
        const { data_color_list = [], data_direction = '180deg', data_radius = { radius: 0, radius_top_left: 0, radius_top_right: 0, radius_bottom_left: 0, radius_bottom_right: 0 }} = form.value.data_style;
        const data = {
            color_list: data_color_list,
            direction: data_direction,
        }
        return gradient_computer(data) + radius_computer(data_radius);
    } else {
        return '';
    }
});
const style_img_container = computed(() => {
    if (!isEmpty(form.value.data_style)) {
        const { data_background_img = [], data_background_img_style = '2', data_chunk_padding = { padding: 0, padding_top: 0, padding_bottom: 0, padding_left: 0, padding_right: 0 }} = form.value.data_style;
        const data = {
            background_img: data_background_img,
            background_img_style: data_background_img_style,
        }
        return padding_computer(data_chunk_padding) + background_computer(data);
    } else {
        return '';
    }
});

const emits = defineEmits(['carousel_change']);
const slideChange = (swiper: { realIndex: number }) => {
    emits('carousel_change', swiper.realIndex);
};

const autoplay = ref<boolean | object>(false);
// 能够同时显示的slides数量
const slides_per_view = ref(1);
// 容器，用于获取容器高度
const card_container = ref<HTMLElement | null>(null);
// 容器高度，swiper纵向的时候需要使用
const outer_height = ref(0);
// 不拆分数据的时候为1，让商品内容在内部铺满/拆分数据的时候，为一屏显示数量，用于商品内部处理显示
const show_num = ref(0);
// 内容参数的集合
watchEffect(() => {
    // 是否滚动
    if (form.value.data_style.is_roll == '1') {
        autoplay.value = {
            delay: (form.value.data_style.interval_time || 2) * 1000,
            pauseOnMouseEnter: true,
        };
    } else {
        autoplay.value = false;
    }
    // 图片时的处理
    if (props.type === 'img') {
        slides_per_view.value = 1; // 能够同时显示的slides数量
    } else {
        // 商品时的处理逻辑
        const { goods_outerflex, goods_num } = form.value.data_content;
        const { rotation_direction, rolling_fashion } = form.value.data_style;
        // 判断是平移还是整屏滚动, 平移的时候是一个为1组，如果是整屏滚动，就为一屏为一组
        if (rolling_fashion == 'translation') {
            // 如果是商品是横排的，轮播也是横排的，就不对商品进行拆分/如果商品是竖排的，轮播也是竖排的，不对商品进行拆分
            if ((goods_outerflex == 'row' && rotation_direction == 'horizontal') || (goods_outerflex == 'col' && rotation_direction == 'vertical')) {
                slides_per_view.value = goods_num; // 能够同时显示的slides数量
                show_num.value = 1; // 一屏显示的数量 用于商品内部处理显示
            } else {
                slides_per_view.value = 1; // 能够同时显示的slides数量
                show_num.value = goods_num; // 一屏显示的数量 用于商品内部处理显示
            }
        } else {
            // 切屏的时候为多个为一组 
            show_num.value = goods_num; // 一屏显示的数量 用于商品内部处理显示
            slides_per_view.value = 1; // 能够同时显示的slides数量
        }
    }
    nextTick(() => {
        // 外层高度
        if (card_container.value) {
            outer_height.value = card_container.value?.clientHeight;
        }
    });
});
</script>

<style lang="scss" scoped>
:deep(.swiper) {
    height: 100%;
    .swiper-slide {
       height: 100%;
    }
}
</style>