<template>
    <div v-for="(item, index) in list" :key="index" class="flex-row align-s gap-12">
        <div class="flex-col">
            <el-color-picker v-model="item.color" :predefine="predefine_colors" />
            <div v-if="index == 0" class="connect-line"></div>
        </div>
        <icon name="reset" color="primary" size="16" class="c-pointer" @click="reset_event(index)"></icon>
    </div>
</template>

<script setup lang="ts">
import { predefine_colors } from '@/utils';
interface list_page {
    color: string;
    color_percentage: number | undefined;
}
interface Props {
    colorList: list_page[];
    defaultColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
    defaultColor: '',
});

const list = ref(props.colorList);
// 默认值
const reset_event = (index: number) => {
    list.value[index].color = props.defaultColor;
    list.value[index].color_percentage = undefined;
};
</script>

<style lang="scss" scoped>
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