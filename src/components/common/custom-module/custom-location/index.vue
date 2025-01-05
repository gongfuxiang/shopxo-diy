<template>
    <card-container>
        <div class="mb-12">定位设置</div>
        <el-form-item label="X轴">
            <slider v-model="data_location.x" :max="390" @operation_end="operation_end"></slider>
        </el-form-item>
        <el-form-item label="Y轴">
            <slider v-model="data_location.y" :max="1000" @operation_end="operation_end"></slider>
        </el-form-item>
    </card-container>
</template>

<script lang="ts" setup>
const data_location = defineModel({ type: Object, default: () => ({ x: 0, y: 0 }) });
const emit = defineEmits(['operation_end']);
// 失去焦点时触发事件
const operation_end = () => {
    emit('operation_end');
};
</script>