<template>
    <div v-for="(item, index) in list" :key="index" class="flex-row align-s gap-12">
        <div class="flex-col">
            <el-color-picker v-model="item.color" show-alpha :predefine="predefine_colors" />
            <div v-if="index == 0" class="connect-line"></div>
        </div>
        <icon name="reset" color="primary" size="16" class="c-pointer" @click="reset_event(index)"></icon>
    </div>
</template>

<script setup lang="ts">
const predefine_colors = ref(['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgba(255, 69, 0, 0.68)', 'rgb(255, 120, 0)', 'hsv(51, 100, 98)', 'hsva(120, 40, 94, 0.5)', 'hsl(181, 100%, 37%)', 'hsla(209, 100%, 56%, 0.73)', '#c7158577']);
interface list_page {
    color: string;
    color_percentage: string;
}
interface Props {
    colorList: list_page[];
    defaultColor: string;
}
const props = withDefaults(defineProps<Props>(), {
    defaultColor: '',
});

const list = ref(props.colorList);
// 默认值
const reset_event = (index: number) => {
    list.value[index].color = props.defaultColor;
    list.value[index].color_percentage = '';
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