<template>
    <div class="flex-col align-c jc-c w h bg-f" :style="container_style">
        <img :style="style" :src="noData_image" />
        <p class="cr-c mt-12" :style="text_style">{{ text }}</p>
    </div>
</template>

<script setup lang="ts">
interface Props {
    imgWidth?: string;
    height?: string;
    size?: string;
    text?: string;
}
const props = withDefaults(defineProps<Props>(), {
    imgWidth: '100px',
    height: '200px',
    size: '14px',
    text: '暂无数据',
});
const noData_image = ref(new URL(`../../../assets/images/noData.png`, import.meta.url).href);
const style = computed(() => {
    return {
        width: props.imgWidth,
    };
});
const container_style = computed(() => {
    return {
        height: props.height,
    };
});
const text_style = computed(() => {
    return {
        fontSize: props.size,
    };
});
</script>
