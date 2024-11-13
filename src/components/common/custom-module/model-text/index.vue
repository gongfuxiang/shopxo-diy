<template>
    <div class="img-outer w h re oh" :style="com_style">
        <div :style="text_style" class="text-word-break">
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
    },
    scale: {
        type: Number,
        default: 1
    },
    sourceType: {
        type: String,
        default: ''
    }
});
const keyMap: { [key: string]: string } = {
    goods: 'title',
    article: 'title',
    brand: 'name'
};

// 用于页面判断显示
const form = reactive(props.value);
const text_title = computed(() => {
    let text = '';
    let text_title = props.sourceList[form.data_source_id];
    // 如果是商品的标题或者是品牌的名称，需要判断是否有新的标题，没有的话就取原来的标题
    if (['goods', 'article', 'brand'].includes(props.sourceType)) {
        // 其他的切换为从data中取数据
        if (form.data_source_id == keyMap[props.sourceType]) {
            text_title = !isEmpty(props.sourceList.new_title) ? props.sourceList.new_title : props.sourceList.data[keyMap[props.sourceType]];
        } else {
            text_title = props.sourceList.data[form.data_source_id];
        }
    }
    if (!isEmpty(form.text_title)) {
        text = form.text_title;
    } else if(text_title != undefined) {
        text = text_title;
    } else if(!props.isPercentage){
        text = '请在此输入文字';
    }
    return text;
});

const text_style = computed(() => {
    let style = `font-size: ${ form.text_size * props.scale }px;line-height: ${ (typeof form.line_text_size === "number" ? form.line_text_size : form.text_size) * props.scale}px;color: ${ form.text_color }; text-align: ${ form.text_location }; transform: rotate(${form.text_rotate}deg);text-decoration: ${ form.text_option };${ padding_computer(form.text_padding, props.scale) };`;
    if (form.text_weight == 'italic') {
        style += `font-style: italic`;
    } else if (form.text_weight == '500') {
        style += `font-weight: 500`;
    }
    return style;
});

const com_style = computed(() => {
    let style = `${ set_count() } ${ gradient_handle(form.color_list, form.direction) } ${ radius_computer(form.bg_radius, props.scale) }`;
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
.rich-text-content {
    white-space: normal;
    word-break:break-all;
    * {
        max-width: 100%;
    }
}
</style>
