<template>
    <div :class="props.direction == 'vertical' ? 'flex-col gap-x-18' : 'flex-row gap-y-20 jc-e'">
        <div v-for="(item, index) in props.filterData" :key="index" class="filter-style flex-row gap-12">
            <div v-if="!isEmpty(item.title)" :class="['title text-line-1', props.direction == 'vertical' ? '' : 'horizontal-title']" :style="`width: ${ Number(props.titleWidth) > 0 ? props.titleWidth + 'px;' : '100%' }`">{{ item.title }}</div>
            <div class="w h flex-1 vertical-style">
                <template v-if="item.type == 'select'">
                    <template v-if="item.config.is_level.toString() == '1'">
                        <div class="flex-row gap-10">
                            <el-cascader v-model="new_dataInterface[item.form_name]" :placeholder="placeholder_config(item, 'select')" clearable class="w h" collapse-tags popper-class="filter-form-cascader" placement="left" :props="{ 'expandTrigger': 'hover', 'multiple': item.config.is_multiple.toString() == '1', 'checkStrictly': true, 'emitPath': false, 'value': item.data_key, 'label': item.data_name, 'children': item.config.children }" :options="selectData(item)" /> 
                            <template v-if="item.config.is_multiple.toString() == '1'">
                                <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="父级选中包含所有子级" raw-content placement="top">
                                    <icon name="miaosha-hdgz" size="12" color="#999"></icon>
                                </el-tooltip>
                            </template>
                        </div>
                    </template>
                    <template v-else>
                        <el-select v-model="new_dataInterface[item.form_name]" :multiple="item.config.is_multiple.toString() == '1'" collapse-tags :placeholder="placeholder_config(item, 'select')" clearable>
                            <el-option v-for="item1 in selectData(item)" :key="item1[item.data_key]" :label="item1[item.data_name]" :value="item1[item.data_key]" />
                        </el-select>
                    </template>
                </template>
                <template v-else-if="item.type == 'input'">
                    <template v-if="item.config.type == 'number'">
                        <el-input-number v-model="new_dataInterface[item.form_name]" :min="item.config?.min || 0" :max="item.config?.max || undefined" type="number" :placeholder="placeholder_config(item, 'input')" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
                    </template>
                    <template v-else>
                        <el-input v-model="new_dataInterface[item.form_name]" :placeholder="placeholder_config(item, 'input')" clearable />
                    </template>
                </template>
                <template v-else-if="item.type == 'switch'">
                    <el-switch v-model="new_dataInterface[item.form_name]" active-value="1" inactive-value="0" />
                </template>
                <template v-else-if="item.type =='radio'">
                    <el-radio-group v-model="new_dataInterface[item.form_name]">
                        <el-radio v-for="item1 in selectData(item)" :key="item1[item.data_key]" :value="item1[item.data_key]">{{ item1[item.data_name] }}</el-radio>
                    </el-radio-group>
                </template>
                <template v-else-if="item.type =='checkbox'">
                    <el-checkbox-group v-model="new_dataInterface[item.form_name]">
                        <el-checkbox v-for="item1 in selectData(item)" :key="item1[item.data_key]" :value="item1[item.data_key]">{{ item1[item.data_name] }}</el-checkbox>
                    </el-checkbox-group>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { isEmpty } from 'lodash';
import { commonStore } from '@/store';
const common_store = commonStore();

interface filter {
    const_key: string; // 存放数据对应的key
    type: string; // 类型
    config: any;
    title: string;
    form_name: string;
    data: any[];
    data_key: string;
    data_name: string;  
}
const props = defineProps({
    filterData: {
        type: Array as PropType<filter[]>,
        default: () => ([]),
    },
    direction: {
        type: String,
        default: 'vertical',
    },
    dataInterface: {
        type: Object as PropType<any>,
        default: () => {},
    },
    titleWidth: {
        type: Number,
        default: 0,
    }
});
const new_dataInterface = computed(() => props.dataInterface);
// 通过类型判断从哪里取下拉框的值
const selectData = (item: any) => {
    // 获取到筛选框的默认数据
    let options_list = [];
    if (!isEmpty(item.data)) {
        options_list = item.data;
    } else {
        options_list = !isEmpty((common_store.common as any)[item.const_key]) ? (common_store.common as any)[item.const_key] : [];
    }
    return options_list;
}
onBeforeMount(() => {
    props.filterData.forEach((item: any) => {
        const options_list = selectData(item);
        // 获取到默认值
        const old_defalut = new_dataInterface.value[item.form_name];
        // 默认值不为空的时候，进行处理查看当前数据是否存在默认值数据
        if (old_defalut && ['select', 'radio', 'checkout'].includes(item.type)) {
            if (item.type == 'select' && item.config.is_level &&  item.config.is_level.toString() == '1') { // 如果是级联的效果
                const result = contains_value(options_list, item, [], item.config.children);
                new_dataInterface.value[item.form_name] = result;
            } else if (item.config.is_multiple && item.config.is_multiple.toString() == '1') { // 多选的处理逻辑
                // 从中取出跟默认数据的key相同的数据
                const list = options_list.filter((item1: any) => { old_defalut.length > 0 ? old_defalut.includes(item1[item.data_key]) : item1[item.data_key] == old_defalut });
                if (list.length > 0) {
                    new_dataInterface.value[item.form_name] = list.map((item1: any) => { return item1[item.data_key] });
                } else {
                    new_dataInterface.value[item.form_name] = [];
                }
            } else {
                // 单选的处理逻辑
                const list = options_list.filter((item1: any) => { item1[item.data_key] == old_defalut });
                if (list.length > 0) {
                    new_dataInterface.value[item.form_name] = list[0][item.data_key];
                } else {
                    new_dataInterface.value[item.form_name] = '';
                }
            }
        }
    })
})
// 监听新数据的变化，将对应的数据传递给父组件，用于父组件调用接口
const emit = defineEmits(['form-change']);
watch(() => new_dataInterface.value, (val) => {
    emit('form-change', val);
}, { deep: true });

const placeholder_config = computed(() => {
    return (data: any, type: string) => {
        if (!data.config.placeholder) {
            return type == 'select'? `请选择${ data?.title || '' }` : `请输入${ data?.title || '' }`;
        } else {
            return data.config.placeholder;
        }
    }
});
// 递归判断数据的处理
const contains_value = (list: any[], config: any, result: any[], children?: string) => {
    if (list.length > 0) {
        const old_defalut = new_dataInterface.value[config.form_name];
        list.forEach((item: any) => {
            if (config.config.is_multiple && config.config.is_multiple.toString() == '1') {
                if ((old_defalut.length > 0 && old_defalut.includes(item[config.data_key])) || item[config.data_key] == old_defalut) {
                    result.push(item[config.data_key]);
                }
            } else {
                if (item[config.data_key] == old_defalut) {
                    result.push(item[config.data_key]);
                }
            }
            if (children && item[children]) {
                contains_value(item[children], config, result, children);
            }
        });
    }
    return result;
}
</script>

<style lang="scss" scoped>
.filter-style {
    min-height: 3.2rem;
    min-width: 20rem;
}
.vertical-style {
    min-width: 20rem;
}
// 输入框超出隐藏，不换行
:deep(.el-cascader) {
    height: 3.2rem;
    .el-input {
        height: 3.2rem;
    }
    .el-cascader__tags {
        flex-wrap: nowrap !important;
    }
    .el-tag {
        max-width: 10rem;
    }
}
.horizontal-title {
    flex-basis: max-content;
}
.title {
    font-size: 1.2rem;
    line-height: 3.2rem;
    text-align: right;
    width: 100%;
    color: #606266;
}
.number-show {
    :deep(.el-input__wrapper .el-input__inner) {
        text-align: left;
    }
}
.custom-content {
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
  text-align: center;
}
</style>