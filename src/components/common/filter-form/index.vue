<template>
    <div :class="props.direction == 'vertical' ? 'flex-col gap-x-18' : 'flex-row gap-y-20 jc-e'">
        <div v-for="(item, index) in props.filterData" :key="index" class="filter-style flex-row gap-12">
            <div v-if="!isEmpty(item.title) && Number(props.titleWidth) > 0" class="title text-line-1" :style="`width: ${ props.titleWidth }px;`">{{ item.title }}</div>
            <div class="w h filter-right">
                <template v-if="item.type == 'select'">
                    <template v-if="item.config.data_level > 1">
                        <div class="flex-row gap-10">
                            <el-cascader v-model="new_data_Interface[item.form_name]" :placeholder="placeholder_config(item, 'select')" clearable class="w h" collapse-tags popper-class="filter-form-cascader" placement="left" :props="{ 'expandTrigger': 'hover', 'multiple': item.config.is_multiple == '1', 'checkStrictly': true, 'emitPath': false, 'value': item.data_key, 'label': item.data_name, 'children': item.config.children }" :options="selectData(item.data, item.const_key)" /> 
                            <template v-if="item.config.is_multiple == '1'">
                                <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="父级选中包含所有子级" raw-content placement="top">
                                    <icon name="miaosha-hdgz" size="12" color="#999"></icon>
                                </el-tooltip>
                            </template>
                        </div>
                    </template>
                    <template v-else>
                        <el-select v-model="new_data_Interface[item.form_name]" :multiple="item.config.is_multiple == '1'" collapse-tags :placeholder="placeholder_config(item, 'select')" clearable>
                            <el-option v-for="item1 in selectData(item.data, item.const_key)" :key="item1[item.data_key]" :label="item1[item.data_name]" :value="item1[item.data_key]" />
                        </el-select>
                    </template>
                </template>
                <template v-else-if="item.type == 'input'">
                    <template v-if="item.config.type == 'number'">
                        <el-input-number v-model="new_data_Interface[item.form_name]" :min="item.config?.min || 0" :max="item.config?.max || undefined" type="number" :placeholder="placeholder_config(item, 'input')" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
                    </template>
                    <template v-else>
                        <el-input v-model="new_data_Interface[item.form_name]" :placeholder="placeholder_config(item, 'input')" clearable />
                    </template>
                </template>
                <template v-else-if="item.type == 'switch'">
                    <el-switch v-model="new_data_Interface[item.form_name]" active-value="1" inactive-value="0" />
                </template>
                <template v-else-if="item.type =='radio'">
                    <el-radio-group v-model="new_data_Interface[item.form_name]">
                        <el-radio v-for="item1 in selectData(item.data, item.const_key)" :key="item1[item.data_key]" :value="item1[item.data_key]">{{ item1[item.data_name] }}</el-radio>
                    </el-radio-group>
                </template>
                <template v-else-if="item.type =='checkbox'">
                    <el-checkbox-group v-model="new_data_Interface[item.form_name]">
                        <el-checkbox v-for="item1 in selectData(item.data, item.const_key)" :key="item1[item.data_key]" :value="item1[item.data_key]">{{ item1[item.data_name] }}</el-checkbox>
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

const new_data_Interface = ref<any>({})
//  监听初始数据变化，并赋值给新数据
watch(() => props.dataInterface, (new_val, old_val) => {
    if (JSON.stringify(new_val)!= JSON.stringify(old_val)) {
        new_data_Interface.value = { ...new_val }
    }
}, { deep: true, immediate: true });
// 监听新数据的变化，将对应的数据传递给父组件，用于父组件调用接口
const emit = defineEmits(['form-change']);
watch(() => new_data_Interface.value, (val) => {
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

// 通过类型判断从哪里取下拉框的值
const selectData = computed(() => {
    return (data: any, type: string) => {
        if (!isEmpty(data)) {
            return data;
        } else {
            return !isEmpty((common_store.common as any)[type]) ? (common_store.common as any)[type] : [];
        }
    }
});
</script>

<style lang="scss" scoped>
.filter-style {
    min-height: 3.2rem;
}
.filter-right {
    min-width: 20rem;
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