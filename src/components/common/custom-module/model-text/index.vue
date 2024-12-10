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
import { radius_computer, padding_computer, gradient_handle, get_nested_property } from '@/utils';
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
    isDisplayPanel: {
        type: Boolean,
        default: false
    },
    scale: {
        type: Number,
        default: 1
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    titleParams: {
        type: String,
        default: ''
    },
    options: {
        type: Array<any>,
        default: () => [],
    }
});

// 用于页面判断显示
const form = computed(() => props.value);
const text_title = computed(() => {
    return getTextTitle(form.value, props);
});
/**
 * 根据表单值和属性获取文本标题
 * 此函数用于根据提供的表单值和组件属性，在不同的条件下返回相应的文本标题
 * 主要处理逻辑包括：检查表单值和数据源列表的存在性、处理数据源ID以获取标题、处理自定义标题情况、错误处理以及最终文本的确定
 * 
 * @param formValue 表单的当前值，包含数据源ID和可能的文本标题
 * @param props 组件的属性，包括数据源列表、是否显示面板、是否自定义标题等
 * @returns {string} 根据不同条件返回的文本标题
 */
 const getTextTitle = (formValue: any, props: any): string => {
    // 检查表单值和数据源列表是否存在，以及是否显示面板，以确定返回的默认文本
    if (!formValue || !props.sourceList) {
        if (!props.isDisplayPanel) {
            return '请在此输入文字';
        } else {
            return '';
        }
    }
    // 获取数据源ID
    const data_source_id = !isEmpty(formValue?.data_source_field?.id || []) ? formValue?.data_source_field?.id : [];
    // 数据源内容
    const option = formValue?.data_source_field?.option || [];
    // 文本信息
    let text_title = '';
    try {
        // 多选判断
        if (data_source_id.length > 0) {
            // 遍历取出所有的值
            data_source_id.forEach((source_id: string) => {
                const sourceList = option.filter((item: any) => item.field == source_id);
                // 根据数据源ID是否包含点号来区分处理方式
                if (source_id.includes(';')) {
                    const ids = source_id.split(';');
                    let text = '';
                    ids.forEach((item: string, index: number) => {
                        text += data_handling(item) + (index != ids.length - 1 ? (sourceList?.join || '') : '');
                    });
                    text_title += (sourceList?.first || '') + text + (sourceList?.last || '');
                } else {
                    text_title += (sourceList?.first || '') + data_handling(source_id) + (sourceList?.last || '');
                }
            });
        }
    } catch (error) {
        if (!props.isDisplayPanel) {
            return '请在此输入文字';
        } else {
            return '';
        }
    }
    // 确定最终返回的文本，优先使用表单值中的文本标题，如果为空则使用之前获取的标题或默认文本
    let text = formValue.text_title || text_title || '';
    if (text == '' && !props.isDisplayPanel) {
        text = props.options.find((item: any) => item.field === data_source_id)?.name || '请在此输入文字';
    }
    return text;
}

const data_handling = (data_source_id: string) => {
    let text_title = get_nested_property(props.sourceList, data_source_id);
    // 如果是自定义标题，进一步处理嵌套对象中的数据
    if (props.sourceList.data && props.isCustom) {
        if (data_source_id === props.titleParams) {
            text_title = props.sourceList.new_title || get_nested_property(props.sourceList.data, data_source_id);
        } else {
            text_title = get_nested_property(props.sourceList.data, data_source_id);
        }
    }
    return text_title;
}

const text_style = computed(() => {
    let style = `font-size: ${ form.value.text_size * props.scale }px;line-height: ${ (typeof form.value.line_text_size === "number" ? form.value.line_text_size : form.value.text_size) * props.scale}px;color: ${ form.value.text_color }; text-align: ${ form.value.text_location }; transform: rotate(${form.value.text_rotate}deg);text-decoration: ${ form.value.text_option };${ padding_computer(form.value.text_padding, props.scale) };`;
    if (form.value.text_weight == 'italic') {
        style += `font-style: italic`;
    } else if (form.value.text_weight == '500') {
        style += `font-weight: 500`;
    }
    return style;
});

const com_style = computed(() => {
    let style = `${ set_count() } ${ gradient_handle(form.value.color_list, form.value.direction) } ${ radius_computer(form.value.bg_radius, props.scale) }`;
    if (form.value.border_show == '1') {
        style += `border: ${form.value.border_size}px ${form.value.border_style} ${form.value.border_color};`;
    }
    // 是富文本并且开启了上下滚动的开关
    if (form.value.is_rich_text == '1' && form.value.is_up_down == '1') {
        style += `overflow-y: auto;`
    }
    return style;
});
const set_count = () => {
    if (props.isDisplayPanel) {
        return '';
    } else {
        return `width: ${ form.value.com_width }px; height: ${ form.value.com_height }px;`;
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
