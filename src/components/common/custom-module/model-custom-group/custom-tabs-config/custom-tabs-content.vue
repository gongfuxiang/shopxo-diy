<template>
    <card-container>
        <el-form-item label="数据来源">
            <el-select v-model="form.data_source_field.id" value-key="id" clearable filterable placeholder="请选择数据字段" size="default" class="flex-1" @change="group_change">
                <el-option v-for="item in options.filter(item => item.type == 'custom-data-list')" :key="item.field" :label="item.name" :value="item.field" />
            </el-select>
        </el-form-item>
        <el-form-item label="铺满方式">
            <el-radio-group v-model="form.data_source_direction" @change="operation_end">
                <el-radio v-for="(item, index) in default_type_data?.show_type" :key="index" :value="item">{{ item == 'vertical' ? '纵向展示' : item == 'vertical-scroll' ? '纵向滑动' : '横向滑动' }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="每屏显示">
            <el-radio-group v-model="form.data_source_carousel_col" @change="operation_end">
                <el-radio v-for="(item, index) in default_type_data?.show_number" :key="index" :value="item">{{ item }}{{ form.data_source_direction == 'vertical-scroll' ? '行' : '列' }}展示</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="滚动条">
            <el-switch v-model="form.is_scroll_bar" active-value="1" inactive-value="0" @change="operation_end" />
        </el-form-item>
    </card-container>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    options: {
        type: Array<any>,
        default: () => [],
    }
});
const form = ref(props.value);
const default_type_data = {
    show_type: ['vertical', 'vertical-scroll', 'horizontal'],
    show_number: [1, 2, 3, 4],
};
const group_change = () => {
    const option = props.options.filter((item) => item.type == 'custom-data-list' && form.value.data_source_field.id === item.field);
    if (option.length > 0) {
        form.value.data_source_field.option = option[0].data;
    } else {
        form.value.data_source_field.option = [];
    }
};

const emit = defineEmits(['operation_end']);
// 操作结束触发事件
const operation_end = () => {
    emit('operation_end');
};
</script>
<style lang="scss" scoped>
.card-background {
    background: #fff;
    padding-left: 1.6rem;
    padding-right: 2rem;
    padding-top: 4.6rem;
    padding-bottom: 1.6rem;
}
.upload_style {
    width: 100%;
    height: 12.4rem;
}
.col-price-style {
    color: red;
}
:deep(.el-checkbox-group .el-checkbox) {
    margin-right: 2rem;
}

:deep(.el-radio-group .el-radio) {
    margin-right: 2rem;
}
</style>
