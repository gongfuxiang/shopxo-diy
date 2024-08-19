<template>
    <div ref="containerRef" class="oh" :style="style_container">
        <div ref="hotRef" class="hot re" :style="style">
            <image-empty v-model="img" class="w" error-img-style="width:10rem;height:10rem;" error-style="padding:15rem 0;" @load="on_load_img"></image-empty>
            <div v-for="(item, index) in hot_data" :key="index" class="hot_box" :style="rect_style(item.drag_start, item.drag_end)"></div>
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
const hot_data = ref<hotListData[]>([]);
// 热区组件图片的宽高
const img_width = ref(1);
const img_height = ref(1);

const container_ref_h = ref(0);
const container_ref_w = ref(0);
const hot_ref_w = ref(0);
const hot_ref_h = ref(0);
watch(
    props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content || {};
        const new_style = newVal?.style || {};
        img.value = new_content?.img[0];
        img_width.value = new_content?.hot.img_width || 1;
        img_height.value = new_content?.hot.img_height || 1;
        style_container.value = common_styles_computer(new_style.common_style);
        hot_data.value = new_content?.hot?.data || [];
        console.log(1);
    },
    { immediate: true, deep: true }
);

const on_load_img = () => {
    container_ref_h.value = containerRef.value?.clientHeight || 0;
    container_ref_w.value = containerRef.value?.clientWidth || 0;
    hot_ref_w.value = hotRef.value?.clientWidth || 0;
    hot_ref_h.value = hotRef.value?.clientHeight || 0;
};
// containerRef的宽高
const w_scale1 = computed(() => {
    return container_ref_h.value / img_width.value;
});
const h_scale1 = computed(() => {
    return container_ref_h.value / img_height.value;
});
//  hotRef的宽高
const w_scale2 = computed(() => {
    return hot_ref_w.value / container_ref_h.value;
});
const h_scale2 = computed(() => {
    return hot_ref_h.value / container_ref_h.value;
});

const rect_style = computed(() => {
    return (start: rectCoords, end: rectCoords) => {
        return `left: ${start.x * w_scale1.value * w_scale2.value}px;top: ${start.y * h_scale1.value * h_scale2.value}px;width: ${Math.max(end.width * w_scale1.value * w_scale2.value, 1)}px;height: ${Math.max(end.height * h_scale1.value * h_scale2.value, 1)}px;display: flex;`;
    };
});
</script>
<style lang="scss" scoped>
.hot {
    min-height: 1rem;
    .hot_box {
        background: rgba(42, 148, 255, 0.25);
        border: 1px dashed #8ec6ff;
        position: absolute;
        opacity: 0.6;
    }
}
</style>
