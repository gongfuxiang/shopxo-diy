<template>
    <el-form-item label="阴影设置">
        <div class="flex-col gap-10 w">
            <el-form-item label="颜色" label-width="45">
                <color-picker v-model="form.box_shadow_color" @operation_end="operation_end"></color-picker>
            </el-form-item>
            <el-form-item label="X轴" label-width="45">
                <slider v-model="form.box_shadow_x" :min="-20" :max="20" @operation_end="operation_end"></slider>
            </el-form-item>
            <el-form-item label="Y轴" label-width="45">
                <slider v-model="form.box_shadow_y" :min="-20" :max="20" @operation_end="operation_end"></slider>
            </el-form-item>
            <el-form-item label="模糊" label-width="45">
                <slider v-model="form.box_shadow_blur" @operation_end="operation_end"></slider>
            </el-form-item>
            <el-form-item label="扩展" label-width="45">
                <slider v-model="form.box_shadow_spread" @operation_end="operation_end"></slider>
            </el-form-item>
        </div>
    </el-form-item>
</template>

<script setup lang="ts">
const form = defineModel({ type: Object, default: {}, required: true})

// 操作结束触发事件
const emit = defineEmits(['operation_end']);
const operation_end = () => {
    emit('operation_end');
};
</script>