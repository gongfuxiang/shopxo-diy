<template>
    <el-carousel :key="form.data_style.carouselKey" indicator-position="none" :interval="form.data_style.interval_time * 1000" arrow="never" :direction="form.data_style.rotation_direction" :autoplay="form.data_style.is_roll" @change="carousel_change">
        <el-carousel-item v-for="(item1, index1) in form.data_content.list" :key="index1">
            <template v-if="props.type === 'img'">
                <image-empty v-model="item1.carousel_img[0]" :style="contentImgRadius"></image-empty>
            </template>
            <template v-else>
                <product-list-show :outerflex="form.outerflex" :flex="form.flex" :num="form.num" :actived="props.actived" :value="item1.split_list" :content-img-radius="contentImgRadius"></product-list-show>
            </template>
        </el-carousel-item>
    </el-carousel>
</template>

<script setup lang="ts">
interface Props {
    value: any;
    contentImgRadius: string;
    type: string;
    actived: number;
}

const props = defineProps<Props>();

const form = ref(props.value);
const emits = defineEmits(['carousel_change']);
const carousel_change = (index: number) => {
    emits('carousel_change', index);
};
watchEffect(() => {
    form.value = props.value;
});
</script>

<style lang="scss" scoped>

</style>