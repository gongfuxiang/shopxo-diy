<template>
    <div :style="style_container">
        <div :style="style_img_container">
            <div class="flex-col gap-10">
                <div class="re flex-row" :class="title_center">
                    <div class="z-i flex-row align-c gap-10">
                        <template v-if="!isEmpty(form.img_src)">
                            <image-empty v-model="form.img_src[0]" class="title-img"></image-empty>
                        </template>
                        <template v-else-if="!isEmpty(form.icon_class)">
                            <icon :name="form.icon_class" :size="new_style.icon_size + ''" :color="new_style.icon_color"></icon>
                        </template>
                        <div class="pr-15 nowrap" :style="title_style">{{ form.title }}</div>
                    </div>
                    <div class="flex-row gap-10 align-c right-0 abs">
                        <template v-if="form.keyword_show == '1'">
                            <div v-for="item in keyword_list" :key="item.id" :style="keyword_style">
                                {{ item.title }}
                            </div>
                        </template>
                        <div v-if="form.right_show == '1'" class="nowrap" :style="right_style">{{ form.right_title }}<el-icon class="iconfont icon-arrow-right" :color="new_style.right_color || '#999'"></el-icon></div>
                    </div>
                </div>
                <div v-if="!isEmpty(form.subtitle)" class="break" :style="subtitle_style">{{ form.subtitle }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, common_img_computer } from '@/utils';
import { cloneDeep, isEmpty } from 'lodash';

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

const keyword_list = computed(() => {
    // 深拷贝一下，确保不会出现问题
    const arry_list = cloneDeep(form.value.keyword_list);
    return arry_list.filter((item: { is_show: string }) => item.is_show == '1');
});
// 标题的设置
const title_style = computed(() => {
    let common_styles = '';
    if (new_style.value.title_weight == 'italic') {
        common_styles += `font-style: italic`;
    } else if (new_style.value.title_weight == '500') {
        common_styles += `font-weight: 500`;
    }
    return `color:${new_style.value.title_color}; font-size: ${new_style.value.title_size}px; ${common_styles}`;
});
// 标题的设置
const subtitle_style = computed(() => {
    let common_styles = '';
    if (new_style.value.subtitle_weight == 'italic') {
        common_styles += `font-style: italic`;
    } else if (new_style.value.subtitle_weight == '500') {
        common_styles += `font-weight: 500`;
    }
    return `color:${new_style.value.subtitle_color}; font-size: ${new_style.value.subtitle_size}px; ${common_styles}`;
});
// 标题是否居中
const title_center = computed(() => {
    return form.value.is_title_center == '1' ? 'jc-c' : '';
});
// 关键字设置
const keyword_style = computed(() => {
    return `color:${new_style.value.keyword_color}; font-size: ${new_style.value.keyword_size}px;`;
});
// 右边按钮设置
const right_style = computed(() => {
    return `color:${new_style.value.right_color}; font-size: ${new_style.value.right_size}px;`;
});
const title_img_height = computed(() => new_style.value.img_height + 'px');
// 通用样式区
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
</script>
<style lang="scss" scoped>
.right-0.abs {
    top: 50%;
    transform: translateY(-50%);
}
.break {
    word-break: break-word;
    overflow-wrap: break-word;
    word-wrap: break-word;
}
.title-img {
    // max-width: 6rem;
    // max-height: 3rem;
    height: v-bind(title_img_height);
}
</style>
