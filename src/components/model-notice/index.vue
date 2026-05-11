<template>
    <div :style="style_container">
        <div :style="style_img_container">
            <template v-if="form.notice_style == 'inherit'">
                <div class="news-box" :style="container_background_style">
                    <div class="flex-row align-c gap-y-8" :style="container_background_img_style">
                        <template v-if="form.title_type == 'img-icon'">
                            <div v-if="!isEmpty(form.img_src)">
                                <image-empty v-model="form.img_src[0]" :style="img_style"></image-empty>
                            </div>
                            <div v-else>
                                <icon :name="form.icon_class" :size="new_style.icon_size + ''" :color="new_style.icon_color"></icon>
                            </div>
                        </template>
                        <template v-else>
                            <div :style="topic_style" class="pl-6 pr-6 radius-sm">{{ form.title }}</div>
                        </template>
                        <el-carousel :key="carouselKey" class="flex-1" indicator-position="none" :interval="interval_time" arrow="never" :direction="direction_type" :autoplay="true">
                            <el-carousel-item v-for="(item, index) in notice_list" :key="index" class="flex-row align-c">
                                <div class="text-line-1" :style="`${news_style} color: ${new_style.news_color}`">{{ item.notice_title }}</div>
                            </el-carousel-item>
                        </el-carousel>
                        <div v-if="form.is_right_button == '1'" :style="`color: ${new_style.right_button_color}; font-size: ${ new_style.right_button_size }px`">{{ form.right_title }}<icon name="arrow-right" :color="new_style.right_button_color || '#999'"></icon></div>
                    </div>
                </div>
            </template>
            <template v-else-if="form.notice_style == 'card'">
                <div class="news-card" :style="container_background_style">
                    <div class="flex-col gap-10" :style="container_background_img_style">
                        <div class="flex-row w jc-sb">
                            <template v-if="form.title_type == 'img-icon'">
                                <template v-if="!isEmpty(form.icon_class)">
                                    <icon :name="form.icon_class" :size="new_style.icon_size + ''" :color="new_style.icon_color"></icon>
                                </template>
                                <template v-else>
                                    <image-empty v-model="form.img_src[0]" :style="img_style" error-img-style="width:1.6rem;height:1.6rem;"></image-empty>
                                </template>
                            </template>
                            <template v-else>
                                <div :style="topic_style" class="pl-6 pr-6 radius-sm">{{ form.title }}</div>
                            </template>
                            <div v-if="form.is_right_button == '1'" :style="`color: ${ new_style.right_button_color }; font-size: ${ new_style.right_button_size }px`">{{ form.right_title }}<icon name="arrow-right" :color="new_style.right_button_color || '#999'"></icon></div>
                        </div>
                        <div v-for="(item, index) in notice_list" :key="index" class="flex align-c" :style="news_style">
                            <span :class="`num one${index + 1}`">{{ index + 1 }}</span>
                            <div class="text-word-break" :style="`color: ${new_style.news_color}`">{{ item.notice_title }}</div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="form.notice_style == 'marquee'">
                <div class="news-box news-box-marquee" :style="container_background_style">
                    <div class="news-marquee-row flex-row align-c gap-y-8" :style="container_background_img_style">
                        <div class="flex-shrink-0 flex-row align-c">
                            <template v-if="form.title_type == 'img-icon'">
                                <div v-if="!isEmpty(form.img_src)">
                                    <image-empty v-model="form.img_src[0]" :style="img_style"></image-empty>
                                </div>
                                <div v-else>
                                    <icon :name="form.icon_class" :size="new_style.icon_size + ''" :color="new_style.icon_color"></icon>
                                </div>
                            </template>
                            <template v-else>
                                <div :style="topic_style" class="pl-6 pr-6 radius-sm">{{ form.title }}</div>
                            </template>
                        </div>
                        <template v-if="marquee_scroll_enabled">
                            <!-- 与销售记录横向「平移」一致：free-mode + linear + delay:0 + speed 用间隔时间 -->
                            <div class="news-marquee-viewport flex-1 flex-width swiper-free-mode swiper-horizontal-free-mode">
                                <swiper
                                    :key="marquee_swiper_key"
                                    class="news-marquee-swiper w flex"
                                    direction="horizontal"
                                    :modules="swiper_modules"
                                    :loop="true"
                                    slides-per-view="auto"
                                    :space-between="marquee_scroll_gap"
                                    :allow-touch-move="false"
                                    :autoplay="marquee_swiper_autoplay"
                                    :speed="marquee_swiper_speed"
                                >
                                    <swiper-slide v-for="i in marquee_swiper_slides" :key="i" class="news-marquee-slide">
                                        <div class="news-marquee-slide-inner flex-row align-c">
                                            <div class="news-marquee-slide-text news-marquee-slide-text--scroll" :style="`${news_style} color: ${new_style.news_color}`">{{ marquee_display_text }}</div>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                            </div>
                        </template>
                        <div v-else class="news-marquee-static flex-1 flex-width">
                            <div class="news-marquee-static-text" :style="`${news_style} color: ${new_style.news_color}`">{{ marquee_display_text }}</div>
                        </div>
                        <div
                            v-if="form.is_right_button == '1'"
                            class="flex-shrink-0 flex-row align-c"
                            :style="`color: ${new_style.right_button_color}; font-size: ${new_style.right_button_size}px`"
                        >
                            {{ form.right_title }}<icon name="arrow-right" :color="new_style.right_button_color || '#999'"></icon>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, common_img_computer, common_styles_computer, get_math, gradient_computer, gradient_handle, padding_computer, radius_computer } from '@/utils';
import { isEmpty, cloneDeep } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';

const swiper_modules = [Autoplay];

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
    form: props.value?.content || {},
    new_style: props.value?.style || {},
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);

// 用于样式显示
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
// 容器高度
const container_height = computed(() => new_style.value.container_height + 'px');
// 容器背景
const container_background_style = computed(() => {
    const { container_color_list, container_direction, container_background_img_style, container_background_img} = new_style.value;
    const styles = {
        color_list: container_color_list,
        direction: container_direction,
        background_img: container_background_img,
        background_img_style: container_background_img_style,
    };
    
    return gradient_computer(styles) + radius_computer(new_style.value.container_radius) + `overflow:hidden;`;
});
const container_background_img_style = computed(() => {
    const { container_background_img_style, container_background_img, container_padding = '' } = new_style.value;
    const styles = {
        background_img: container_background_img,
        background_img_style: container_background_img_style,
    };
    let padding = '';
    // 不等于空的时候使用新数据
    if (!isEmpty(container_padding)) {
        padding = padding_computer(container_padding);
    } else {
        // 为空的时候使用默认数据，兼容老数据没有这个值时的处理
        let old_padding = { padding: 15, padding_top: 15, padding_right: 15, padding_bottom: 15, padding_left: 15 };
        if (form.value.notice_style === 'inherit' || form.value.notice_style === 'marquee') {
            old_padding = { padding: 0, padding_top: 0, padding_right: 10, padding_bottom: 0, padding_left: 10, }
        }
        padding = padding_computer(old_padding);
    }
    return background_computer(styles) + padding + `overflow:hidden;`;
});
// 图片设置
const img_style = computed(() => `height: ${new_style.value.title_height}px; width: ${new_style.value.title_width}px`);
// 标题的设置
const topic_style = computed(() => {
    // 标题渐变色处理
    const gradient = gradient_handle(new_style.value.title_color_list, '90deg');
    // 标题设置
    return `color:${new_style.value.title_color}; font-size: ${new_style.value.title_size}px; font-weight: ${new_style.value.title_typeface}; ${gradient}`;
});
// 内容标题设置
const news_style = computed(() => `font-size: ${new_style.value.news_size}px; font-weight: ${new_style.value.news_typeface};`);
// 指示器的样式
// 轮播图定时显示
const interval_time = ref(2000);
// 轮播图是否滚动
const direction_type = ref<'vertical' | 'horizontal'>('vertical');
// 轮播图key值
const carouselKey = ref('0');
// 记录当前显示的轮播图的数据
const interval_list = ref({
    time: 2000,
    direction: 'vertical',
    notice_length: 1,
});

const notice_list = computed(() => {
    // 深拷贝一下，确保不会出现问题
    const arry_list = cloneDeep(form.value.notice_list);
    return arry_list.filter((item: { is_show: string }) => item.is_show == '1');
});

const marquee_scroll_enabled = computed(() => form.value.marquee_scroll != '0');

const marquee_display_text = computed(() => {
    const raw = String(form.value.marquee_content ?? '').trim();
    if (raw) return raw;
    const first = notice_list.value[0]?.notice_title;
    if (first && String(first).trim()) return String(first).trim();
    return '暂无公告';
});

/** 样式三：每条 slide 一整段文案（宽度随内容），多份 slide + space-between 满足 loop 与间距 */
const marquee_repeat = 8;
const marquee_swiper_slides = computed(() => Array.from({ length: marquee_repeat }, (_, i) => i));

const marquee_swiper_key = computed(
    () =>
        `notice-marquee-${marquee_display_text.value}-${form.value.interval_time}-${form.value.marquee_scroll}-${form.value.notice_style}`
);

/** 与销售记录横向 translation 一致：delay 0 + waitForTransition，靠 speed 控制平移快慢 */
const marquee_swiper_autoplay = computed(() => {
    if (!marquee_scroll_enabled.value) return false;
    return {
        delay: 0,
        waitForTransition: true,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
    };
});

/** 销售记录横向：swiper_speed = interval_time * 1000（ms） */
const marquee_swiper_speed = computed(() => {
    const sec = Number(form.value.interval_time) > 0 ? Number(form.value.interval_time) : 3;
    return sec * 1000;
});

/** 开启滚动时，每条 slide 之间的间距（与销售记录 data_spacing 思路一致） */
const marquee_scroll_gap = computed(() => {
    const n = Number(new_style.value?.data_spacing);
    if (Number.isFinite(n) && n > 0) return n;
    return 32;
});

// 内容参数的集合
watchEffect(() => {
    //#region 轮播图设置
    const time = (Number(form.value.interval_time) > 0 ? Number(form.value.interval_time) : 3) * 1000;
    const direction = form.value.direction;
    // 判断长度是否相等
    const notice_length = notice_list.value.length;
    // 判断跟历史的是否相等，不相等更新组件时间
    if (interval_list.value.time != time || interval_list.value.direction != direction || notice_length != interval_list.value.notice_length) {
        // 滚动时间
        interval_time.value = time;
        // 滚动方向
        direction_type.value = direction;
        // 记录历史保存的时间
        interval_list.value = {
            time: time,
            direction: direction,
            notice_length: notice_length,
        };
        // 更新轮播图的key，确保更换时能重新更新轮播图
        carouselKey.value = get_math();
    }
    //#endregion
});
</script>
<style lang="scss" scoped>
.news-box {
    height: v-bind(container_height);
    overflow: hidden;
}
.news-box-marquee {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.num {
    padding-right: 0.7rem;
    color: #999;
}
.one1 {
    color: #ea3323;
}
.one2 {
    color: #ff7303;
}
.one3 {
    color: #ffc300;
}
.two-style {
    width: 2.4rem;
    height: 2.4rem;
}
:deep(.el-carousel) {
    .el-carousel__container {
        height: v-bind(container_height);
        .el-carousel__item {
            line-height: 4.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            // white-space: nowrap;
        }
    }
}

.news-marquee-row {
    width: 100%;
    align-items: center;
}
.news-marquee-viewport {
    flex: 1 1 0;
    min-width: 0;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    align-self: stretch;
    position: relative;
    /* 供 slide 使用 cqi：每条至少占满中间区域宽度，短文案不再并排「切片」 */
    container-type: inline-size;
    container-name: news-marquee-vp;
}
.news-marquee-viewport.swiper-free-mode :deep(.swiper-wrapper) {
    transition-timing-function: linear !important;
}
.news-marquee-swiper {
    min-width: 0;
    height: 100%;
}
.news-marquee-swiper :deep(.swiper),
.news-marquee-swiper :deep(.swiper-wrapper) {
    height: 100%;
}
.news-marquee-swiper :deep(.swiper-wrapper) {
    align-items: center;
}
.news-marquee-swiper :deep(.swiper-slide) {
    width: auto;
    height: 100%;
    box-sizing: border-box;
    /* 短文案：slide 至少一屏宽，视口内只看到一整条；长文案：随 max-content 变宽 */
    min-width: 100%;
    min-width: 100cqi;
}
.news-marquee-slide-inner {
    display: flex;
    align-items: center;
    height: 100%;
    width: max-content;
    box-sizing: border-box;
}
/* 开启滚动：整段文案单行完整展示，不用省略号 */
.news-marquee-slide-text--scroll {
    width: max-content;
    max-width: none;
    white-space: nowrap;
    overflow: visible;
}
.news-marquee-static {
    flex: 1 1 0;
    min-width: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    align-self: stretch;
}
.news-marquee-static-text {
    width: 100%;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
