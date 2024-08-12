<template>
    <div :style="style_container">
        <swiper
            :key="carouselKey"
            :class="{'swiper-card': interval_types }"
            direction="horizontal"
            :loop="true"
            :effect="interval_types ? 'coverflow': 'slide'"
            :autoplay="autoplay"
            :allow-touch-move="false"
            slides-per-view="auto"
            :space-between="0"
            :initial-slide="4"
            :centered-slides="true"
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
                <div class="item-image flex jc-c align-c w h" :style="img_style">
                    <image-empty v-model="item.carousel_img[0]"></image-empty>
                </div>
            </swiper-slide>
            <swiper-slide v-for="(item, index1) in seat_list" :key="index1">
                <div class="item-image flex jc-c align-c w h" :style="img_style">
                    <image-empty v-model="item.carousel_img[0]"></image-empty>
                </div>
            </swiper-slide>
            <div v-if="new_style.is_show" :class="{'dot-center': new_style.indicator_location == 'center', 'dot-right': new_style.indicator_location == 'flex-end' }" class="dot flex abs">
                <template v-if="new_style.indicator_style == 'num'">
                    <div :style="indicator_style" class="dot-item">
                        <span class="num-active">{{ actived_index + 1 }}</span><span>/{{ form.carousel_list.length }}</span>
                    </div>
                </template>
                <template v-else>
                    <div v-for="(item, index2) in form.carousel_list" :key="index2" :style="indicator_style" :class="{'dot-item': true, 'active': actived_index == index2 }" />
                </template>
            </div>
        </swiper>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, radius_computer, get_math } from '@/utils';
import { isEmpty, cloneDeep } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
const modules = [Autoplay, EffectCoverflow];

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
// 用于样式显示
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const autoplay = ref<boolean | object>(false)
// 图片的设置
const img_style = computed(() => radius_computer(new_style.value) );
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
        indicator_styles += `width: ${size * 3}px; height: ${size}px;`;
    } else {
        indicator_styles += `background: ${new_style.value?.color || '#DDDDDD'};`;
        indicator_styles += `width: ${size}px; height: ${size}px;`;
    }
    return indicator_styles;
});
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
// 轮播图显示样式
const actived_color = computed(() => new_style.value?.actived_color || '#2A94FF' );
const img_fit = computed(() => form.value.img_fit );
// 记录当前显示的轮播图的数据
const interval_list = ref({
    time: 2000,
    is_roll: false,
    interval_type: '',
    length: 0
})

const interval_types = computed(() => interval_type.value == 'card' );

// 监听参数的使用
watchEffect(() => {
    //#region 轮播图设置
    const time = (new_style.value?.interval_time || 2) * 1000;
    const display_is_roll = new_style.value.is_roll;
    const type = form.value.carousel_type;
    const carousel_length = form.value.carousel_list.length;
    // 判断跟历史的是否相等，不相等更新组件时间
    if (interval_list.value.time != time || interval_list.value.is_roll != display_is_roll || interval_list.value.interval_type != type || interval_list.value.length != carousel_length) {
        // 是否滚动
        if (display_is_roll) {
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

const slideChange = (swiper: { realIndex: number }) => {
    if (swiper.realIndex > form.value.carousel_list.length - 1) {
        const seat_length = seat_list.value.length;
        if (seat_length == 2 && swiper.realIndex == 3) {
            actived_index.value = 1;
        } else {
            actived_index.value = swiper.realIndex - seat_list.value.length;
        }
    } else {
        actived_index.value = swiper.realIndex;
    }
}
</script>
<style lang="scss" scoped>
.top-img {
    height: 5rem;
    width: 5rem;
    background: #F5FBFF;
    border-radius: 4px;
    :deep(.image-slot img) {
        width: 3.5rem;
        height: 3.5rem
    }
}
.dot-center {
    left: 50%;
    transform: translateX(-50%);
}
.dot-right {
    right: 0;
}
.dot {
    z-index: 3;
    bottom: 6px;
    .dot-item {
        margin: 0 0.3rem;
        &.active {
            background: v-bind(actived_color) !important;
        }
        .num-active {
            color: v-bind(actived_color) !important;
        }
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

:deep(.swiper-slide) {
    .item-image {
        background: #F8FDFF;
        height: v-bind(newHeight);
        :deep(.el-image__inner) {
            object-fit: v-bind(img_fit);
        }
    }
}
</style>
