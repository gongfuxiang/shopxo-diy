<template>
    <el-radio-group v-model="typeface" class="ml-4">
        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
    </el-radio-group>
    <el-form-item label="字号" label-width="40" class="mb-0 w">
        <slider v-model="size" :max="100"></slider>
    </el-form-item>
</template>

<script setup lang="ts">
const typeface = defineModel('typeface', {
    type: String,
    default: 'normal'
});
const size = defineModel('size', {
    type: Number,
    default: 15
});

const font_weight = [
    { name: '加粗', value: '500' },
    { name: '正常', value: 'normal' },
];
</script>

<style lang="scss" scoped>
</style>