<template>
    <card-container class="card-container">
        <div class="mb-12">通用</div>
        <el-form-item label="显示时间">
            <el-date-picker
                v-model="form.time_value"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="YYYY-MM-DD HH:mm:ss"
            />
        </el-form-item>
    </card-container>
</template>

<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({})
    },
    isMargin: {
        type: Boolean,
        default: true,
    }
});
// 初始化数据
let form = ref(props.value);
</script>

<style scoped lang="scss">
:deep(.el-date-editor .el-range-input) {
    font-size: 1.2rem;
}
</style>