<template>
    <div :style="style_container">
        <div class="re" :style="style_img_container">
            <swiper :key="carouselKey" class="w flex" direction="horizontal" :loop="true" :autoplay="autoplay" :slides-per-view="slides_per_view" :slides-per-group="1" :allow-touch-move="false" :pause-on-mouse-enter="true" :modules="modules" @slide-change="slideChange">
                <swiper-slide v-for="(item, index) in nav_content_list" :key="index">
                    <div ref="bannerImg" class="flex flex-wrap" :style="nav_space">
                        <div v-for="(item1, index1) in item.split_list" :key="index1" class="item flex-col align-c" :style="nav_title_space">
                            <div v-if="['image_with_text', 'image'].includes(nav_style)" class="top-img flex align-c jc-c re">
                                <image-empty v-model="item1.img[0]" :style="img_style"></image-empty>
                                <!-- 角标 -->
                                <subscript-index :value="props.value"></subscript-index>
                            </div>
                            <p v-if="['image_with_text', 'text'].includes(nav_style)" class="w size-12 ma-0 nowrap oh tc" :style="text_style">{{ item1.title }}</p>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <div v-if="form.display_style == 'slide' && new_style.is_show == '1'" :class="['left', 'right'].includes(new_style.indicator_new_location) ? 'indicator_up_down_location' : 'indicator_about_location'" :style="indicator_location_style">
                <template v-if="new_style.indicator_style == 'num'">
                    <div :style="indicator_style" class="dot-item">
                        <span class="num-active">{{ actived_index + 1 }}</span><span>/{{ nav_content_list.length }}</span>
                    </div>
                </template>
                <template v-else>
                    <div v-for="(item, index) in nav_content_list" :key="index" :style="indicator_style" :class="{ 'dot-item': true, active: actived_index == index }" />
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, radius_computer, get_math, common_img_computer } from '@/utils';
import { isEmpty, cloneDeep, throttle } from 'lodash';
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
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
// 图片的设置
const img_style = computed(() => radius_computer(new_style.value));
// 标题的样式
const text_style = computed(() => `font-size: ${new_style.value.title_size || 12}px; color: ${new_style.value.title_color || '#000'};`);
//#region 指示器处理
// 轮播图滚动位置
const actived_index = ref(0);
// 轮播图显示样式
const actived_color = computed(() => new_style.value?.actived_color || '#2A94FF');
// 指示器的样式
const indicator_style = computed(() => {
    let indicator_styles = '';
    if (!isEmpty(new_style.value.indicator_radius)) {
        indicator_styles += radius_computer(new_style.value.indicator_radius);
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
// 导航间距
const nav_space = computed(() => 'row-gap:' + (new_style.value?.space || '0') + 'px');
// 导航标题间距
const nav_title_space = computed(() => 'row-gap:' + (new_style.value?.title_space || '0') + 'px');
// 获取轮播图片的节点
const bannerImg = ref();
// 轮播图自适应高度
const newHeight = ref('100px');
// 轮播图key值
const carouselKey = ref('0');

//监听屏幕缩放事件
onMounted(() => {
    nextTick(() => {
        if (!isEmpty(bannerImg.value)) {
            newHeight.value = (bannerImg.value[0]?.clientHeight || 100) + 'px';
        }
    });
    window.onresize = () => {
        newHeight.value = bannerImg.value[0]?.clientHeight || 100 + 'px';
    };
});
// 导航图片大小
const img_size = computed(() => (new_style.value?.img_size || '0') + 'px');
// 是否显示标题和图片
const nav_style = computed(() => form.value?.nav_style || 'image_with_text');

const nav_content_list = computed(() => {
    // 深拷贝一下，确保不会出现问题
    const list = cloneDeep(form.value?.nav_content_list || Array(4));
    // 如果是分页滑动情况下，根据选择的行数和每行显示的个数来区分具体是显示多少个
    if (list.length > 0 && form.value?.display_style == 'slide') {
        // 存储数据显示
        let nav_list: any[] = [];
        // 平移的时候，就根据选择的行数和每行显示的个数来区分具体是显示多少个
        if (form.value.row == 1 && new_style.value.rolling_fashion == 'translation') {
            // 拆分的数量
            list.forEach((item: any) => {
                nav_list.push({
                    split_list: [item],
                });
            });
            return nav_list;
        } else {
            // 每页显示的数量
            const num = (form.value?.single_line || 4) * (form.value?.row || 1);
            // 拆分的数量
            const split_num = Math.ceil(list.length / num);
            for (let i = 0; i < split_num; i++) {
                nav_list.push({ split_list: list.slice(i * num, (i + 1) * num) });
            }
            return nav_list;
        }
    } else {
        // 否则的话，就返回全部的信息
        return [{ split_list: list }];
    }
});

const autoplay = ref<boolean | object>(false);
const slides_per_view = ref(1);
// 每个导航所占位置
const group_width = ref('100%');
// 内容参数的集合
watch(() => props.value, (val) => {
    const display_is_roll = form.value.display_style == 'slide' ? new_style.value.is_roll : '0';
    // 是否滚动
    if (display_is_roll == '1') {
        autoplay.value = {
            delay: (new_style.value.interval_time || 2) * 1000,
            pauseOnMouseEnter: true,
        };
    } else {
        autoplay.value = false;
    }
    // 判断是否是轮播图
    if (form.value?.display_style == 'slide') {
        if (form.value.row == 1 && new_style.value.rolling_fashion == 'translation') {
            slides_per_view.value = form.value.single_line || 4;
            group_width.value = '100%';
        } else {
            slides_per_view.value = 1;
            group_width.value = `${100 / (form.value.single_line || 4)}%`;
        }
    } else {
        group_width.value = `${100 / (form.value.single_line || 4)}%`;
    }
    // 更新轮播图的key，确保更换时能重新更新轮播图
    carouselKey.value = get_math();
    nextTick(() => {
        if (!isEmpty(bannerImg.value)) {
            newHeight.value = (bannerImg.value[0]?.clientHeight || 100) + 'px';
        }
    });
}, {immediate: true, deep: true});
const slideChange = (swiper: { realIndex: number }) => {
    actived_index.value = swiper.realIndex;
};
</script>
<style lang="scss" scoped>
.top-img {
    height: v-bind(img_size);
    width: v-bind(img_size);
    border-radius: 4px;
    :deep(.image-slot) {
        height: v-bind(img_size);
        width: v-bind(img_size);
        img {
            width: 3.5rem;
            height: 3.5rem;
        }
    }
}
.flex-wrap .item {
    width: v-bind(group_width);
}
.dot-item {
    &.active {
        background: v-bind(actived_color) !important;
    }
    .num-active {
        color: v-bind(actived_color) !important;
    }
}

:deep(.swiper) {
    height: v-bind(newHeight);
}
</style>