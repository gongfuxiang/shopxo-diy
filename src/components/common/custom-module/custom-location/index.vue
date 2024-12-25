<template>
    <card-container>
        <div class="mb-12">定位设置</div>
        <el-form-item label="X轴">
            <slider v-model="data_location.x" :max="390"></slider>
        </el-form-item>
        <el-form-item label="Y轴">
            <slider v-model="data_location.y" :max="1000"></slider>
        </el-form-item>
    </card-container>
</template>

<script lang="ts" setup>
const data_location = defineModel({ type: Object, default: () => ({ x: 0, y: 0 }) });
</script>