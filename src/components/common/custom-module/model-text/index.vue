<template>
    <div class="img-outer re oh" :style="com_style">
        <div :style="text_style" class="break">
            <template v-if="form.is_rich_text == '1'">
                <div class="rich-text-content" :innerHTML="text_title"></div>
            </template>
            <template v-else>
                {{ text_title }}
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { radius_computer, padding_computer, gradient_handle } from '@/utils';
import { isEmpty } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
        required: true
    },
    sourceList: {
        type: Object,
        default: () => {
            return {};
        }
    },
    isPercentage: {
        type: Boolean,
        default: false
    }
});
// 用于页面判断显示
const form = reactive(props.value);
const text_title = computed(() => {
    let text = '';
    if (!isEmpty(form.text_title)) {
        text = form.text_title;
    } else if(props.sourceList[form.data_source_id] != undefined) {
        text = props.sourceList[form.data_source_id];
    } else if(!props.isPercentage){
        text = '请在此输入文字';
    }
    return text;
});

const text_style = computed(() => {
    let style = `font-size: ${ form.text_size }px;color: ${ form.text_color }; text-align: ${ form.text_location }; transform: rotate(${form.text_rotate}deg);text-decoration: ${ form.text_option };${ padding_computer(form.text_padding) };`;
    if (form.text_weight == 'italic') {
        style += `font-style: italic`;
    } else if (form.text_weight == '500') {
        style += `font-weight: 500`;
    }
    return style;
});

const com_style = computed(() => {
    let style = `${ set_count() } ${ gradient_handle(form.color_list, form.direction) } ${ radius_computer(form.bg_radius) }`;
    if (form.border_show == '1') {
        style += `border: ${form.border_size}px ${form.border_style} ${form.border_color};`;
    }
    // 是富文本并且开启了上下滚动的开关
    if (form.is_rich_text == '1' && form.is_up_down == '1') {
        style += `overflow-y: auto;`
    }
    return style;
});
const set_count = () => {
    if (props.isPercentage) {
        return '';
    } else {
        return `width: ${ form.com_width }px; height: ${ form.com_height }px;`;
    }
};
</script>
<style lang="scss" scoped>
.break{
    word-wrap: break-word;
    word-break:break-all;
}
.rich-text-content {
    white-space: normal;
    word-break:break-all;
    * {
        max-width: 100%;
    }
}
</style>
