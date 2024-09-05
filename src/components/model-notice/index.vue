<template>
    <div :style="style_container">
        <template v-if="form.notice_style == 'inherit'">
            <div class="flex-row align-c news-box gap-y-8" :style="container_background_style">
                <template v-if="form.title_type == 'img-icon'">
                    <div v-if="!isEmpty(form.img_src)">
                        <image-empty v-model="form.img_src[0]" :style="img_style"></image-empty>
                    </div>
                    <div v-else>
                        <icon :name="form.icon_class" :size="new_style.icon_size + ''" :color="new_style.icon_color"></icon>
                    </div>
                </template>
                <template v-else>
                    <div :style="topic_style" class="pl-6 pr-6 radius-sm">{{ form.title || '公告' }}</div>
                </template>
                <el-carousel :key="carouselKey" class="flex-1" indicator-position="none" :interval="interval_time" arrow="never" :direction="direction_type"  :autoplay="true">
                    <el-carousel-item v-for="(item, index) in notice_list" :key="index" :style="`${ news_style } color: ${ new_style.news_color }`">{{ item.notice_title }}</el-carousel-item>
                </el-carousel>
                <div v-if="form.is_right_button == 'show'" class="size-12"><el-icon class="iconfont icon-arrow-right" :color="new_style.button_color || '#999'"></el-icon></div>
            </div>
        </template>
        <template v-else>
            <div class="news-card flex-col gap-10" :style="container_background_style">
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
                        <div :style="topic_style" class="pl-6 pr-6 radius-sm">{{ form.title || '公告' }}</div>
                    </template>
                    <div v-if="form.is_right_button == 'show'" class="size-12" :style="`color: ${ new_style.button_color || '#999'}`">更多<el-icon class="iconfont icon-arrow-right" :color="new_style.button_color || '#999'"></el-icon></div>
                </div>
                <div v-for="(item, index) in notice_list" :key="index" class="flex" :style="news_style"><span :class="`num one${ index + 1 }`">{{ index + 1 }}</span><div class="break" :style="`color: ${ new_style.news_color }`">{{ item.notice_title }}</div></div>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { background_computer, common_styles_computer, get_math, gradient_computer, gradient_handle, radius_computer } from '@/utils';
import { isEmpty, cloneDeep } from 'lodash';

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
// 容器高度
const container_height = computed(() => new_style.value.container_height + 'px');
// 容器背景
const container_background_style = computed(() => {
    const { container_color_list, container_direction, container_background_img_style, container_background_img } = new_style.value;
    const styles = {
        color_list: container_color_list,
        direction: container_direction,
        background_img: container_background_img,
        background_img_style: container_background_img_style,
    };
    return gradient_computer(styles) + radius_computer(new_style.value.container_radius) + background_computer(styles) + `overflow:hidden;`;
});
// 图片设置
const img_style = ref('');
// 标题的设置
const topic_style = computed(() => {
    // 标题渐变色处理
    const gradient = gradient_handle(new_style.value.topic_color_list, '90deg');
    // 标题设置
    return `color:${ new_style.value.topic_color }; font-size: ${ new_style.value.topic_size }px; font-weight: ${ new_style.value.topic_typeface }; ${ gradient }`;
});
// 内容标题设置
const news_style = computed(() => `font-size: ${ new_style.value.news_size }px; font-weight: ${ new_style.value.news_typeface };`);
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
    notice_length: 1
})

const notice_list = computed(() => {
    // 深拷贝一下，确保不会出现问题
    const arry_list = cloneDeep(form.value.notice_list);
    return arry_list.filter((item: { is_show: boolean; }) => item.is_show);
})

// 内容参数的集合
watchEffect(() => {
    //#region 标题设置
    if (form.value.notice_style == 'card') {
        img_style.value = `height: ${ new_style.value.topic_height }px; width: ${ new_style.value.topic_width }px`;
    } else if (!isEmpty(form.value.img_src)) {
        img_style.value = `height: ${ new_style.value.topic_height }px; width: ${ new_style.value.topic_width }px`;
    }
    //#endregion

    //#region 轮播图设置
    const time = (new_style.value?.interval_time || 2) * 1000;
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
            notice_length: notice_length
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
    padding: 0 1rem;
    background: #fff;
}
.news-card {
    padding: 1.5rem;
    background: #fff;
}
.num {
    padding-right: 0.7rem;
    color: #999;
}
.one1 {
    color: #EA3323;
}
.one2 {
    color: #FF7303;
}
.one3 {
    color: #FFC300;
}
.two-style {
    width: 2.4rem;
    height: 2.4rem;
}
.break {
    word-break: break-word;
    overflow-wrap: break-word;
    word-wrap: break-word;
}
:deep(.el-carousel) {
    .el-carousel__container {
        height: v-bind(container_height);
        .el-carousel__item {
            line-height: 4.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
