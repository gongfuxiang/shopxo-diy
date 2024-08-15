<template>
    <div class="flex-col align-c jc-c w h bg-f" :style="container_style">
        <img :style="style" :src="noData_image" />
        <p class="size-14 cr-c mt-12">暂无数据</p>
    </div>
</template>

<script setup lang="ts">
interface Props {
    imgWidth?: string;
    height?: string;
}
const props = withDefaults(defineProps<Props>(), {
    imgWidth: '100',
    height: '200',
});
const noData_image = ref(new URL(`../../../assets/images/noData.png`, import.meta.url).href);
const style = computed(() => {
    return {
        width: props.imgWidth.search('px') > -1 ? props.imgWidth : props.imgWidth + 'px',
    };
});
const container_style = computed(() => {
    return {
        height: props.height.search('px') > -1 ? props.height : props.height + 'px',
    };
});
</script>
