<template>
    <div :style="style_container">
        <div class="re" :style="style">
            <div class="flex-warp gap-10" :class="article_type == '1' ? 'style1 flex-row' : article_type == '0' ? 'style2 flex-col' : 'style3 flex-col'">
                <card-container class="item gap-10" padding="10px" :class="article_type == '0' ? 'flex-row' : 'flex-col'" :style="content_radius">
                    <img v-if="is_img_show" src="@/assets/images/components/model-video/video.png" />
                    <div class="flex-col jc-sb gap-8">
                        <div class="title text-line-2" :style="article_name">华为荣耀畅想平板换屏服务，屏幕换外屏幕主板维修华为荣耀畅想平板换屏服务，屏幕换外屏幕主板维修华为荣耀畅想平板换屏服务，屏幕换外屏幕主板维修华为荣耀畅想平板换屏服务，屏幕换外屏幕主板维修华为荣耀畅想平板换屏服务，屏幕换外屏幕主板维修</div>
                        <div class="flex-row jc-sb gap-8">
                            <div :style="article_date">{{ is_show.includes('0') ? '2020-06-05 15:20' : '' }}</div>
                            <icon v-show="is_show.includes('1')" name="eye" :style="article_page_view">16</icon>
                        </div>
                    </div>
                </card-container>
                <card-container class="item gap-10" padding="10px" :class="article_type == '0' ? 'flex-row' : 'flex-col'" :style="content_radius">
                    <img v-if="is_img_show" src="@/assets/images/components/model-video/video.png" />
                    <div class="flex-col jc-sb gap-8">
                        <div class="title text-line-2" :style="article_name">华为荣耀畅想平板换屏服务，屏幕换外屏幕主板维修华为荣耀畅想平板换屏服务，屏幕换外屏幕主板维修华为荣耀畅想平板换屏服务，屏幕换外屏幕主板维修华为荣耀畅想平板换屏服务，屏幕换外屏幕主板维修华为荣耀畅想平板换屏服务，屏幕换外屏幕主板维修华为荣耀畅想平板换屏服务，屏幕换外屏幕主板维修</div>
                        <div class="flex-row jc-sb gap-8">
                            <div :style="article_date">{{ is_show.includes('0') ? '2020-06-05 15:20' : '' }}</div>
                            <icon v-show="is_show.includes('1')" name="eye" :style="article_page_view">16</icon>
                        </div>
                    </div>
                </card-container>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, radius_computer } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    isCommonStyle: {
        type: Boolean,
        default: true,
    },
});
const style = ref('');
const style_container = ref('');
// 风格
const article_type = ref('0');
// 是否显示
const is_show = ref(['0', '1']);
// 是否显示封面图片
const is_img_show = ref(true);
// 文章
const article_name = ref('');
// 日期
const article_date = ref('');
// 浏览量
const article_page_view = ref('');
// 内容圆角
const content_radius = ref('');
watch(
    props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content;
        const new_style = newVal?.style;
        // 内容
        article_type.value = new_content.article_style;
        is_show.value = new_content.is_show;
        is_img_show.value = new_content.is_img_show;
        // 样式
        article_name.value = 'font-size:' + new_style.name_size + 'px;' + 'font-weight:' + new_style.name_weight + ';' + 'color:' + new_style.name_color + ';';
        article_date.value = 'font-size:' + new_style.time_size + 'px;' + 'font-weight:' + new_style.time_weight + ';' + 'color:' + new_style.time_color + ';';
        article_page_view.value = 'font-size:' + new_style.page_view_size + 'px;' + 'font-weight:' + new_style.page_view_weight + ';' + 'color:' + new_style.page_view_color + ';';
        content_radius.value = radius_computer(new_style);
        if (new_style.common_style && props.isCommonStyle) {
            style_container.value = common_styles_computer(new_style.common_style);
        }
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped>
.style1 {
    .item {
        width: calc(50% - 0.5rem);
    }
}
.style2 {
    .item {
        width: 100%;
        img {
            width: 11rem;
            height: 8.3rem;
        }
    }
}
.style3 {
    .item {
        width: 100%;
    }
}
</style>
