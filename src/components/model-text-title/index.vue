<template>
    <div :style="style_container">
        <div class="re flex" :class="title_center">
            <div class="z-i pr-15" :style="title_style">{{ form.title || '标题' }}</div>
            <div class="flex-row gap-10 align-c right-0 abs">
                <template v-if="form.keyword_show">
                    <div v-for="item in keyword_list" :key="item.id" :style="keyword_style">
                        {{ item.title }}
                    </div>
                </template>
                <div v-if="form.right_show" class="nowrap" :style="right_style">{{ form.right_title }}<el-icon class="iconfont icon-arrow-right" :color="new_style.right_color || '#999'"></el-icon></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer } from '@/utils';
import { cloneDeep } from 'lodash';

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
    return arry_list.filter((item: { is_show: boolean }) => item.is_show);
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
// 标题是否居中
const title_center = computed(() => {
    return form.value.is_title_center ? 'jc-c' : '';
});
// 关键字设置
const keyword_style = computed(() => {
    return `color:${new_style.value.keyword_color}; font-size: ${new_style.value.keyword_size}px;`;
});
// 右边按钮设置
const right_style = computed(() => {
    return `color:${new_style.value.right_color}; font-size: ${new_style.value.right_size}px;`;
});
// 通用样式区
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
</script>
<style lang="scss" scoped>
.right-0.abs {
    top: 50%;
    transform: translateY(-50%);
}
</style>
