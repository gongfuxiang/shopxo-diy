<template>
    <div :style="style_container">
        <div :style="style" class="flex-row align-c">
            <template v-if="is_title()">
                <div class="mr-15" :style="{ 'color': new_style.text_color }"><span class="set-text-size">{{ form.search_title }}</span></div>
            </template>
            <template v-if="(form.style_radio == 'search' && form.style_type == 'location') || form.style_radio == 'location'">
                <div class="mr-15 flex-row align-c" :style="{ 'color': new_style.text_color }" >
                    <template v-if="form.location == 'store'">
                        <span class="set-text-size nowrap">官方...</span><el-icon class="iconfont icon-arrow-right" />
                    </template>
                    <template v-else>
                        <el-icon class="iconfont icon-index-zxmd-dress mr-3" /><span class="set-text-size nowrap">莲湖...</span><el-icon class="iconfont icon-arrow-right" />
                    </template>
                </div>
            </template>
            <template v-else-if="form.style_radio == 'search' && form.style_type == 'logo' && form.logo.length > 0">
                <image-empty v-model="form.logo[0]" class="search-image mr-10"></image-empty>
            </template>
            <el-input :placeholder="get_placeholder()" :style="{ borderColor: 'red' }" :readonly="true">
                <template v-if="text_location == 'right'" #suffix>
                    <el-icon class="iconfont icon-search" />
                </template>
                <template v-else #prefix>
                    <el-icon class="iconfont icon-search" />
                </template>
            </el-input>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer } from '@/utils';
import { isEmpty } from 'lodash';

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
const style = computed(() => {
    let common_styles = '';
    if (new_style.value.text_style == 'italic') {
        common_styles += `font-style: italic`;
    } else if (new_style.value.text_style == '500') {
        common_styles += `font-weight: 500`;
    }
    return common_styles;
});
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
// 输入框颜色
const search_border = computed(() => new_style.value.search_border);
// 提示语颜色
const placeholder_color = computed(() => new_style.value.tips_color || '#CCCCCC');
// 定位位置
const text_location = computed(() => new_style.value.text_location || 'left');
// 字体大小
const text_size = computed(() => new_style.value.text_size + 'px' || '15px');

// 是否显示标题
const is_title = () => {
    return ((form.value.style_radio == 'search' && form.value.style_type == 'title') || form.value.style_radio == 'title') && !isEmpty(form.value.search_title);
}
// 提示信息修改
const get_placeholder = () => {
    return form.value.tips || '请输入搜索内容';
}
</script>
<style lang="scss" scoped>
:deep(.el-input) {
    & .el-input__wrapper {
        border-radius: 16px !important;
        border: 0;
        box-shadow: none;
        background: v-bind(search_border);
    }
    & .el-input__inner::placeholder, 
    & .el-input__prefix-inner {
        text-align: v-bind(text_location);
        color: v-bind(placeholder_color);
    }
}
.set-text-size {
    font-size: v-bind(text_size);
}
.search-image {
    width: 5rem;
    height: 3rem;
}
.nowrap {
    text-wrap: nowrap;
}
</style>
