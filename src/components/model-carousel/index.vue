<template>
    <div :style="style_container">
        <div class="re" :style="style_img_container">
            <div ref="swiperSize" class="swiper-container w h oh">
                <swiper
                    :key="carouselKey"
                    :class="[`swiper-right-${swiper_style.slidesPerView}`, {'swiper-card': interval_types}]"
                    direction="horizontal"
                    :loop="true"
                    :effect="interval_types ? 'coverflow': 'slide'"
                    :autoplay="autoplay"
                    :allow-touch-move="false"
                    :speed="500"
                    :slides-per-view="swiper_style.slidesPerView"
                    :space-between="swiper_style.spaceBetween"
                    :centered-slides="swiper_style.centeredSlides"
                    :pause-on-mouse-enter="true"
                    :modules="modules"
                    :coverflow-effect="interval_types ? {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true
                    } : undefined"
                    @slide-change="slideChange"
                >
                    <swiper-slide v-for="(item, index) in form.carousel_list" :key="index">
                        <div class="item-image flex align-c w h re" :style="img_style">
                            <image-empty v-model="item.carousel_img[0]" :style="img_style" :fit="img_fit"></image-empty>
                            <div v-if="new_style.video_is_show == '1' && item.carousel_video.length > 0" :class="{'x-middle': new_style.video_location == 'center', 'right-0': new_style.video_location == 'flex-end' }" class="z-deep abs oh video-class" :style="`bottom: ${new_style.video_bottom}px;`">
                                <div class="flex-row gap-5 align-c" :style="video_style">
                                    <template v-if="new_style.video_type == 'img'">
                                        <image-empty v-model="new_style.video_img[0]" class="video_img" error-img-style="width: 1.4rem;height: 1.4rem;" />
                                    </template>
                                    <template v-else>
                                        <el-icon :class="`iconfont ${ !isEmpty(new_style.video_icon_class) ? 'icon-' + new_style.video_icon_class : 'icon-bofang' } size-14`" :style="`color:${new_style.video_icon_color};`" />
                                    </template>
                                    <span v-if="!isEmpty(item.video_title)" :style="`color:${new_style.video_title_color};font-size: ${new_style.video_title_size}px;text-wrap: nowrap;`">{{ item.video_title }}</span>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide v-for="(item, index1) in seat_list" :key="index1">
                        <div class="item-image flex align-c w h re" :style="img_style">
                            <image-empty v-model="item.carousel_img[0]" :style="img_style" :fit="img_fit"></image-empty>
                            <div v-if="new_style.video_is_show == '1' && item.carousel_video.length > 0" :class="{'x-middle': new_style.video_location == 'center', 'right-0': new_style.video_location == 'flex-end' }" class="z-deep abs oh video-class" :style="`bottom: ${new_style.video_bottom}px;`">
                                <div class="flex-row gap-5 align-c" :style="video_style">
                                    <template v-if="new_style.video_type == 'img'">
                                        <image-empty v-model="new_style.video_img[0]" class="video_img" error-img-style="width: 1.4rem;height: 1.4rem;" />
                                    </template>
                                    <template v-else>
                                        <el-icon :class="`iconfont ${ !isEmpty(new_style.video_icon_class) ? 'icon-' + new_style.video_icon_class : 'icon-bofang' } size-14`" :style="`color:${new_style.video_icon_color};`" />
                                    </template>
                                    <span v-if="!isEmpty(item.video_title)" :style="`color:${new_style.video_title_color};font-size: ${new_style.video_title_size}px;text-wrap: nowrap;`">{{ item.video_title }}</span>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                <div v-if="new_style.is_show == '1'" :class="['left', 'right'].includes(new_style.indicator_new_location) ? 'indicator_up_down_location' : 'indicator_about_location'" :style="indicator_location_style">
                    <template v-if="new_style.indicator_style == 'num'">
                        <div :style="indicator_style" class="dot-item">
                            <span class="num-active">{{ actived_index + 1 }}</span><span>/{{ form.carousel_list.length }}</span>
                        </div>
                    </template>
                    <template v-else>
                        <div v-for="(item, index2) in form.carousel_list" :key="index2" :style="indicator_style" :class="{'dot-item': true, 'active': actived_index == index2 }" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, radius_computer, get_math, gradient_computer, padding_computer, common_img_computer } from '@/utils';
import { isEmpty, cloneDeep, throttle } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
const modules = [Autoplay, EffectCoverflow];

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },  
    },
    isCommon: {
        type: Boolean,
        default: true,
    },
});
const form = computed(() => props.value.content);
const new_style = computed(() => props.value.style);
// 用于样式显示
const style_container = computed(() => props.isCommon ? common_styles_computer(new_style.value.common_style) : '');
const style_img_container = computed(() => props.isCommon ? common_img_computer(new_style.value.common_style) : '');

const autoplay = ref<boolean | object>(false)
// 图片的设置
const img_style = computed(() => radius_computer(new_style.value) );
//#region 指示器处理
// 指示器选中样式
const actived_color = computed(() => new_style.value?.actived_color || '#2A94FF' );
// 指示器的样式
const indicator_style = computed(() => {
    let indicator_styles = '';
    if (!isEmpty(new_style.value.indicator_radius)) {
        indicator_styles += radius_computer(new_style.value.indicator_radius)
    }
    const size = new_style.value?.indicator_size || 5;
    if (new_style.value.indicator_style == 'num') {
        indicator_styles += `color: ${new_style.value?.color || '#DDDDDD'};`;
        indicator_styles += `font-size: ${size}px;`;
    } else if (new_style.value.indicator_style == 'elliptic') {
        indicator_styles += `background: ${new_style.value?.color || '#DDDDDD'};`;
        if (['left', 'right'].includes(new_style.value.indicator_new_location)) {
            indicator_styles += `width: ${ size }px; height: ${size * 3}px;`;
        } else {
            indicator_styles += `width: ${size * 3}px; height: ${size}px;`;
        }
    } else {
        indicator_styles += `background: ${new_style.value?.color || '#DDDDDD'};`;
        indicator_styles += `width: ${size}px; height: ${size}px;`;
    }
    return indicator_styles;
});
// 根据指示器的位置来处理 对齐方式的处理
const indicator_location_style = computed(() => {
    const { indicator_new_location,  indicator_location, indicator_bottom } = new_style.value;
    let styles = '';
    if (['left', 'right'].includes(indicator_new_location)) {
        if (indicator_location == 'flex-start') {
            styles += `top: 0px;`;
        } else if (indicator_location == 'center') {
            styles += `top: 50%; transform: translateY(-50%);`;
        } else {
            styles += `bottom: 0px;`;
        }
    } else {
        if (indicator_location == 'flex-start') {
            styles += `left: 0px;`;
        } else if (indicator_location == 'center') {
            styles += `left: 50%; transform: translateX(-50%);`;
        } else {
            styles += `right: 0px;`;
        }
    }
    // 如果有位置的处理，就使用指示器的位置处理，否则的话就用下边距处理
    styles += `${ !isEmpty(indicator_new_location) ? `${indicator_new_location}: ${ indicator_bottom }px;` : `bottom: ${ indicator_bottom }px;` }`;
    return styles;
});
//#endregion
const seat_list = computed(() => {
    if (form.value.carousel_list.length > 3) {
        return [];
    } else {
        let seat_list = [];
        const list = cloneDeep(form.value.carousel_list);
        switch (list.length) {
            case 1:
                seat_list = [ ...list, ...list, ...list];
                break;
            case 2:
                seat_list.push(...list)
                break;
            case 3:
                seat_list.push(...list.slice(0, 1))
                break;
            default:
                break;
        }
        return seat_list;
    }
})
// 轮播图自适应高度 
const newHeight = computed(() => form.value.height + 'px');
// 轮播图样式
const interval_type = ref('');
// 轮播图key值
const carouselKey = ref('0');
// 轮播图滚动位置
const actived_index = ref(0);
const img_fit = computed(() => form.value.img_fit );
// 记录当前显示的轮播图的数据
const interval_list = ref({
    time: 2000,
    is_roll: '0',
    interval_type: '',
    length: 0
})

const interval_types = computed(() => interval_type.value == 'card');
const swiper_Width = ref(390);

// const swiper_right_2 = computed(() => (swiper_Width.value - new_style.value.image_spacing) / 2  + 'px');
// const swiper_right_3 = computed(() => (swiper_Width.value / 2) - 55 - (new_style.value.image_spacing * 2) + 'px');

const swiper_right_2 = computed(() => (swiper_Width.value - new_style.value.image_spacing) / 2 + (55 * 1.5 + new_style.value.image_spacing) + 'px');
const swiper_right_3 = computed(() => (swiper_Width.value - new_style.value.image_spacing) / 3 + 'px');

const negative_swiper_right_2 = computed(() => '-' + swiper_right_2.value);
const negative_swiper_right_3 = computed(() => '-' + swiper_right_3.value);
const swiperSize = ref<any>(null);
onMounted(() => {
    if (swiperSize.value) {
        swiper_Width.value = swiperSize.value.clientWidth;
    }
});
const swiper_style = computed(() => {
    let slidesPerView: number | "auto" | undefined = 'auto';
    let centeredSlides = true;
    let spaceBetween = 0;
    // 轮播图类型 一拖一，二拖一不同状态下的不同风格
    if (form.value.carousel_type == 'oneDragOne') {
        slidesPerView = 2;
        centeredSlides = false;
        spaceBetween = new_style.value.image_spacing;
    } else if (form.value.carousel_type == 'twoDragOne') {
        slidesPerView = 3;
        centeredSlides = false
        spaceBetween = new_style.value.image_spacing;
    }
    return {
        slidesPerView: slidesPerView,
        centeredSlides: centeredSlides,
        spaceBetween: spaceBetween
    }
});
// 视频播放按钮显示逻辑
const video_style = computed(() => {
    let style = ``;
    if (!isEmpty(new_style.value.video_radius)) {
        style += radius_computer(new_style.value.video_radius)
    }
    const data = {
        color_list: new_style.value.video_color_list,
        direction: new_style.value.video_direction,
    }
    style += gradient_computer(data) + padding_computer(new_style.value.video_padding) + `color: ${new_style.value.video_title_color};`;
    return style;
});
// 监听参数的使用
watchEffect(() => {
    //#region 轮播图设置
    const time = (form.value?.interval_time || 2) * 1000;
    const display_is_roll = form.value.is_roll;
    const type = form.value.carousel_type;
    const carousel_length = form.value.carousel_list.length;
    // 判断跟历史的是否相等，不相等更新组件时间
    if (interval_list.value.time != time || interval_list.value.is_roll != display_is_roll || interval_list.value.interval_type != type || interval_list.value.length != carousel_length) {
        // 是否滚动
        if (display_is_roll == '1') {
            autoplay.value = {
                delay: time,
                pauseOnMouseEnter: true,
            };
        } else {
            autoplay.value = false;
        }
        // 轮播图类型
        interval_type.value = type == 'inherit' ? '' : type;
        // 记录历史保存的时间
        interval_list.value = {
            time: time,
            is_roll: display_is_roll,
            interval_type: type,
            length: carousel_length
        };
        // 更新轮播图的key，确保更换时能重新更新轮播图
        carouselKey.value = get_math();
    }
    //#endregion
});

watch(() => new_style.value.common_style, () => {
    nextTick(() => {
        if (swiperSize.value) {
            swiper_Width.value = swiperSize.value.clientWidth;
        }
    })
}, {deep: true});

const slideChange = (swiper: { realIndex: number }) => {
    if (swiper.realIndex > form.value.carousel_list.length - 1) {
        const seat_length = seat_list.value.length;
        if (seat_length == 2 && swiper.realIndex == 3) {
            actived_index.value = 1;
        } else if (seat_length == 3) {
            actived_index.value = 0;
        } else {
            actived_index.value = swiper.realIndex - seat_list.value.length;
        }
    } else {
        actived_index.value = swiper.realIndex;
    }
}
</script>
<style lang="scss" scoped>
.dot-item {
    &.active {
        background: v-bind(actived_color) !important;
    }
    .num-active {
        color: v-bind(actived_color) !important;
    }
}

.swiper-card {
    .swiper-slide {
        width: 70%;
        transition: all 0.3s ease-in-out;
    }
    .swiper-slide-prev {
        transform: scale(0.9);
    }
    .swiper-slide-next {
        transform: scale(0.9);
    }
}

/* 这里的样式是为了模拟next-margin的效果 */
.swiper-container .swiper-right-2 {
    margin-right: v-bind(negative_swiper_right_2);
    .dot {
        padding-right: v-bind(swiper_right_2);
    }
}
.swiper-container .swiper-right-3 {
    margin-right: v-bind(negative_swiper_right_3);
    .dot {
        padding-right: v-bind(swiper_right_3);
    }
}

:deep(.swiper-slide) {
    .item-image {
        height: v-bind(newHeight);
    }
}
:deep(.el-image) {
    height: 100%;
    width: 100%;
    .image-slot img {
        width: 5rem;
    }
}
.video_img {
    max-width: 6rem;
    height: 1.4rem;
}
.video-class {
    max-width: 100%;
    padding-right: 10px;
    padding-left: 10px;
}
</style>
