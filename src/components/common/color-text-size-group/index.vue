<template>
    <div class="flex-col w h gap-10">
        <color-picker v-if="typeList.includes('color')" v-model="color" :default-color="props.defaultColor"></color-picker>
        <el-radio-group v-if="typeList.includes('typeface')" v-model="typeface">
            <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
        </el-radio-group>
        <el-form-item v-if="typeList.includes('size')" :label="sliderName" :label-width="labelWidth" class="mb-0 w form-item-child-label">
            <slider v-model="size" :max="100"></slider>
        </el-form-item>
        <!-- 额外的使用内容 -->
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { font_weight } from '@/utils/common';
interface Props {
    defaultColor?: string;
    typeList?: string[]; // 默认显示3个，传递了之后按照传递的显示
    sliderName?: string;
    labelWidth?: number;
}
const props = withDefaults(defineProps<Props>(), {
    defaultColor: '',
    typeList: () => ['color', 'typeface', 'size'],
    sliderName: '字号',
    labelWidth: 40,
});
const color = defineModel('color', {
    type: String,
    default: '',
});
const typeface = defineModel('typeface', {
    type: String,
    default: '400',
});
const size = defineModel('size', {
    type: Number,
    default: 15,
});
</script>

<style lang="scss" scoped></style>
