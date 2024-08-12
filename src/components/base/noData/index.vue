<template>
    <div class="flex-col align-c jc-c w h bg-f">
        <img :style="{'width': props.imgWidth + 'rem'}" :src="noData_image" />
        <p class="size-14 cr-c mt-12">暂无数据</p>
    </div>
</template>

<script setup lang="ts">
interface Props {
    imgWidth?: number;
}
const props = withDefaults(defineProps<Props>(), {
    imgWidth: 10,
});
const noData_image = ref(new URL(`../../../assets/images/noData.png`, import.meta.url).href);
</script>