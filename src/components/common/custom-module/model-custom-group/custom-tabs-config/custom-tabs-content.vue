<template>
    <card-container>
        <div class="mb-20">显示设置</div>
        <el-form-item label="铺满方式">
            <el-radio-group v-model="form.data_source_direction">
                <el-radio v-for="(item, index) in default_type_data?.show_type" :key="index" :value="item">{{ item == 'vertical' ? '纵向展示' : item == 'vertical-scroll' ? '纵向滑动' : '横向滑动' }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="每屏显示">
            <el-radio-group v-model="form.data_source_carousel_col">
                <el-radio v-for="(item, index) in default_type_data?.show_number" :key="index" :value="item">{{ item }}{{ form.data_source_direction == 'vertical-scroll' ? '行' : '列' }}展示</el-radio>
            </el-radio-group>
        </el-form-item>
    </card-container>
    <div class="bg-f5 divider-line" />
    <card-container>
        <div class="mb-20">自定义设置</div>
        <el-button class="w" size="large" @click="custom_edit"><icon name="edit" size="12"></icon>自定义编辑</el-button>
    </card-container>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    }
});
const form = ref(props.value);
const default_type_data = {
    show_type: ['vertical', 'vertical-scroll', 'horizontal-scroll'],
    show_number: [1, 2, 3, 4],
};
const emit = defineEmits(['custom_edit']);
const custom_edit = () => {
    emit('custom_edit');
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
