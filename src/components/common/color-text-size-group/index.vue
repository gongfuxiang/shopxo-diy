<template>
    <div class="flex-col w h gap-10">
        <color-picker v-if="typeList.includes('color')" v-model="color" :default-color="props.defaultColor"></color-picker>
        <el-radio-group v-if="typeList.includes('typeface')" v-model="typeface">
            <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
        </el-radio-group>
        <el-form-item v-if="typeList.includes('size')" label="字号" label-width="40" class="mb-0 w word-size">
            <slider v-model="size" :max="100"></slider>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
interface Props {
    defaultColor?: string;
    typeList?: string[]; // 默认显示3个，传递了之后按照传递的显示
}
const props = withDefaults(defineProps<Props>(), {
    defaultColor: '',
    typeList: () => ['color', 'typeface', 'size'],
});
const color = defineModel('color', {
    type: String,
    default: ''
});
const typeface = defineModel('typeface', {
    type: String,
    default: '400'
});
const size = defineModel('size', {
    type: Number,
    default: 15
});

const font_weight = [
    { name: '加粗', value: '500' },
    { name: '正常', value: '400' },
];
</script>

<style lang="scss" scoped>
.word-size {
    :deep(.el-form-item__label) {
        color: #999;
        font-size: 1.2rem;
    }
}
</style>