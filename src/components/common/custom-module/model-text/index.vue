<template>
    <div v-if="is_show" ref="modelText" class="img-outer w h re oh" :style="com_style">
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
import { radius_computer, padding_computer, gradient_handle, get_nested_property, custom_condition_data, get_is_eligible } from '@/utils';
import { cloneDeep, isEmpty } from 'lodash';
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
    isCustomGroup: {
        type: Boolean,
        default: false
    },
    customGroupFieldId: {
        type: String,
        default: ''
    },
    titleParams: {
        type: String,
        default: ''
    },
    configLoop: {
        type: String,
        default: '1'
    }
});

// 用于页面判断显示
const form = computed(() => props.value);
// 从组件的顶层获取数据，避免多层组件传值导致数据遗漏和多余代码
const field_list: any = toRef(inject('field_list', []));
const is_show = computed(() => {
    if (props.configLoop == '1') {
        // 取出条件判断的内容
        const condition = form.value?.condition || { field: '', type: '', value: '' };
        return get_is_eligible(field_list.value, condition, props);
    } else {
        return true;
    }
});

const text_title = computed(() => {
    return (form.value?.text_captions || '') + getTextTitle(form.value, props);
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
    // 文本信息
    let text_title = '';
    if (!isEmpty(formValue.text_title)) {
        // 存储待处理的文本标题
        let new_title = cloneDeep(formValue.text_title);
        let new_field_list = field_list.value;
        // 判断是否是自定义组
        if (props.isCustomGroup && !isEmpty(props.customGroupFieldId)) {
            // 取出对应自定义组的内容
            const group_option_list = new_field_list.find((item: any) => item.field === props.customGroupFieldId);
            // 取出自定义组内部数据源参数的详细数据
            new_field_list = group_option_list?.data || [];
        }
        // 遍历字段列表，替换文本标题中的占位符
        if (props.configLoop == '1' && !isEmpty(new_field_list)) {
            new_field_list.forEach((item: any) => {
                const new_field = '${' +  item.field + '}';
                if (formValue.text_title.includes(new_field)) {
                    // 获取到字段的真实数据
                    const field_value = custom_condition_data(item.field, item, props.sourceList, props.isCustom);
                    // 使用正则表达式替换文本标题
                    const regular = new RegExp(`\\$\\{\\s*${item.field}\\s*\\}`, 'g');
                    // 替换后的内容赋值给原内容, 确保后续可以继续替换
                    new_title = new_title.replace(regular, field_value);
                }
            });
        }
        // 将内容替换为处理后的标题
        text_title = new_title;
    } else {
        // 获取数据源ID
        const data_source_id = !isEmpty(formValue?.data_source_field?.id || []) && props.configLoop == '1' ? formValue?.data_source_field?.id : [];
        // 数据源内容
        const option = formValue?.data_source_field?.option || [];
        try {
            // 多选判断
            if (data_source_id.length > 0) {
                text_title += form.value?.data_split?.left || '';
                // 遍历取出所有的值
                data_source_id.forEach((source_id: string, index: number) => {
                    const sourceList = option.find((item: any) => item.field == source_id);
                    // 根据数据源ID是否包含点号来区分处理方式
                    if (source_id.includes(';')) {
                        const ids = source_id.split(';');
                        let text = '';
                        ids.forEach((item: string, index: number) => {
                            text += data_handling(item) + (index != ids.length - 1 ? (sourceList?.join || '') : '');
                        });
                        text_title += (sourceList?.first || '') + (text == '' && !props.isDisplayPanel ? sourceList?.name || '请在此输入文字' : text ) + (sourceList?.last || '');
                    } else {
                        text_title += (sourceList?.first || '') + (data_handling(source_id) === '' && !props.isDisplayPanel ? sourceList?.name || '请在此输入文字' : data_handling(source_id) ) + (sourceList?.last || '');
                    }
                    if (index < data_source_id.length - 1) {
                        text_title += form.value?.data_split?.middle || '';
                    }
                });
                text_title += form.value?.data_split?.right || '';
            }
        } catch (error) {
            if (!props.isDisplayPanel) {
                return '请在此输入文字';
            } else {
                return '';
            }
        }
    }
    // 确定最终返回的文本，优先使用表单值中的文本标题，如果为空则使用之前获取的标题或默认文本
    if (text_title === '' && !props.isDisplayPanel) {
        text_title = '请在此输入文字';
    }
    return text_title;
}

// 数据处理
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
// 文本样式
const text_style = computed(() => {
    let style = `font-size: ${ form.value.text_size * props.scale }px;line-height: ${ (typeof form.value.line_text_size === "number" ? form.value.line_text_size : form.value.text_size) * props.scale}px;color: ${ form.value.text_color }; text-align: ${ form.value.text_location }; transform: rotate(${form.value.text_rotate}deg);text-decoration: ${ form.value.text_option };${ padding_computer(form.value.text_padding, props.scale) };`;
    if (form.value.text_weight == 'italic') {
        style += `font-style: italic`;
    } else if (['bold', '500'].includes(form.value.text_weight)) {
        style += `font-weight: bold;`;
    }
    return style;
});
// 外层样式
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
// 不同地方下的宽度显示
const set_count = () => {
    if (props.isDisplayPanel) {
        return '';
    } else {
        const { com_width = 0, com_height = 0, is_width_auto = '0', is_height_auto = '0', max_width = 0, max_height = 0 } = form.value;
        const new_max_width = max_width > 0 ? `max-width: ${ max_width }px;` : 'white-space: nowrap;';
        const new_max_height = max_height > 0 ? `max-height: ${ max_height }px;` : '';
        return `${ is_width_auto == '1' ? `width:100%;${ new_max_width }` : `width:${ com_width }px;`}${ is_height_auto == '1' ? `height:100%;${ new_max_height }` : `height: ${ com_height }px;` }`;
    }
};
const emits = defineEmits(['container_change']);
// 开启自定义的时候重新计算高度和宽度
const modelText = ref<HTMLElement | null>(null);
watch(() => props.value, (value) => {
    if (!props.isDisplayPanel) {
        const { is_width_auto = '0', is_height_auto = '0', max_width = 0, max_height = 0, com_width = 0, com_height = 0 } = value;
        nextTick(() => {
            let new_width = com_width;
            let new_height = com_height;
            // 宽度自适应时 获取当前容器的宽度
            if (is_width_auto == '1') {
                new_width = modelText.value?.clientWidth || 0;
            }
            // 高度自适应时时 获取当前容器的高度
            if (is_height_auto == '1') {
                new_height = modelText.value?.clientHeight || 0;
            }
            // 如果跟历史的宽度或者高度不同，则更新
            // if (new_width !== com_width || new_height !== com_height) {
            emits('container_change', new_width, new_height);
            // }
        });
    }
}, { deep: true });

</script>
<style lang="scss" scoped>
.rich-text-content {
    // white-space: normal;
    word-break:break-all;
    * {
        max-width: 100%;
    }
}
</style>
