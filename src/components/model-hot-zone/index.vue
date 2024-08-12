<template>
    <div ref="containerRef" class="oh" :style="style_container">
        <div ref="hotRef" class="hot re" :style="style">
            <image-empty v-model="img" class="w" error-img-style="width:10rem;height:10rem;" error-style="padding:15rem 0;"></image-empty>
            <div v-for="(item, index) in hot" :key="index" class="hot_box" :style="rect_style(item.drag_start, item.drag_end)"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const containerRef = ref<HTMLElement | null>(null);
const hotRef = ref<HTMLElement | null>(null);
const style = ref('');
const style_container = ref('');
const img = ref('');
const hot = ref<hotListData[]>([]);
const img_width = ref(1);
const img_height = ref(1);
watch(
    props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content || {};
        const new_style = newVal?.style || {};
        img.value = new_content?.img[0];
        hot.value = new_content?.hot.hot;
        img_width.value = new_content?.hot.img_width || 1;
        img_height.value = new_content?.hot.img_height || 1;
        style_container.value = common_styles_computer(new_style.common_style);
    },
    { immediate: true, deep: true }
);

const rect_style = computed(() => {
    return (start: rectCoords, end: rectCoords) => {
        let w_scale1 = 1;
        let h_scale1 = 1;
        let w_scale2 = 1;
        let h_scale2 = 1;
        if (containerRef.value && hotRef.value) {
            // 原图片的宽和高和实际展示的图片宽和高的比例
            w_scale1 = containerRef.value?.clientWidth / img_width.value;
            h_scale1 = containerRef.value?.clientHeight / img_height.value;

            // 坐标缩小比例  containerRef的宽高除以hotRef的宽高
            w_scale2 = hotRef.value?.clientWidth / containerRef.value?.clientWidth;
            h_scale2 = hotRef.value?.clientHeight / containerRef.value?.clientHeight;
        }
        console.log('containerRef', containerRef.value?.clientWidth, containerRef.value?.clientHeight, 'hotRef', hotRef.value?.clientWidth, hotRef.value?.clientHeight);
        console.log('w_scale1', w_scale1, 'h_scale1', h_scale1, 'w_scale2', w_scale2, 'h_scale2', h_scale2);
        return `left: ${start.x * w_scale1 * w_scale2}px;top: ${start.y * h_scale1 * h_scale2}px;width: ${Math.max(end.width * w_scale1 * w_scale2, 1)}px;height: ${Math.max(end.height * h_scale1 * h_scale2, 1)}px;display: flex;`;
    };
});
</script>
<style lang="scss" scoped>
.hot {
    min-height: 1rem;
    .hot_box {
        background-color: red;
        position: absolute;
    }
}
</style>
