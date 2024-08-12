<template>
    <div class="w">
        <el-form :model="form" label-width="80">
            <card-container class="common-content-height">
                <div class="mb-12">位置设置</div>
                <el-form-item label="展示位置">
                    <el-radio-group v-model="form.display_location" class="ml-4">
                        <el-radio value="left">左</el-radio>
                        <el-radio value="right">右</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="距离底部">
                    <slider v-model="form.offset_number" :max="1000"></slider>
                </el-form-item>
                <el-form-item label="风格">
                    <el-radio-group v-model="form.float_style" class="ml-4">
                        <el-radio value="diffuse">扩散</el-radio>
                        <el-radio value="shadow">阴影</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="阴影颜色">
                    <color-picker v-model="form.float_style_color" default-color="#32373a1a"></color-picker>
                </el-form-item>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    }
});

const state = reactive({
    form: props.value
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
.connect-line {
    width: 0.1rem;
    height: 1.6rem;
    background: #d8d8d8;
    position: relative;
    left: 1rem;
    // 合并before和after重复代码
    &::before,
    &::after {
        position: absolute;
        left: -0.2rem;
        content: '';
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: #ddd;
    }
    &::before {
        top: -0.25rem;
    }
    &::after {
        bottom: -0.25rem;
    }
}
</style>
