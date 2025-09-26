<template>
    <div class="flex-col w h gap-10">
        <div v-if="typeList.includes('color')" class="flex-col w gap-10">
            <div class="flex-row gap-10"><span v-if="isUpSlideDisplay" class="desc-title">默认</span><color-picker v-model="color" :default-color="props.defaultColor"></color-picker></div>
            <div v-if="isUpSlideDisplay" class="flex-row gap-10"><span class="desc-title">上滑</span><color-picker v-model="upColor"></color-picker></div>
        </div>
        <div class="flex-row gap-10">
            <span v-if="isUpSlideDisplay" class="desc-title">字体</span>
            <el-radio-group v-if="typeList.includes('typeface')" v-model="typeface">
                <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
        </div>
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
    isUpSlideDisplay?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    defaultColor: '',
    typeList: () => ['color', 'typeface', 'size'],
    sliderName: '字号',
    labelWidth: 36,
    isUpSlideDisplay: false,
});
const color = defineModel('color', {
    type: String,
    default: '',
});
const upColor = defineModel('upColor', {
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

<style lang="scss" scoped>
.desc-title {
    font-size: 1.2rem;
    color: #999;
}
</style>
