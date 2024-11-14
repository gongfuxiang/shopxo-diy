<template>
    <div class="w h oh" :style="props.type === 'img' ? '' : style_container">
        <div class="w h" :style="props.type === 'img' ? '' : style_img_container">
            <el-carousel :key="form.data_style.carouselKey" indicator-position="none" :interval="form.data_style.interval_time * 1000" arrow="never" :direction="form.data_style.rotation_direction" :autoplay="form.data_style.is_roll == '1' ? true : false" @change="carousel_change">
                <el-carousel-item v-for="(item1, index1) in form.data_content.list" :key="index1">
                    <template v-if="props.type === 'img'">
                        <image-empty v-model="item1.carousel_img[0]" :style="form.data_style.get_img_radius" :fit="form.data_content.img_fit"></image-empty>
                    </template>
                    <template v-else>
                        <product-list-show :outerflex="form.data_content.goods_outerflex" :flex="form.data_content.goods_flex" :num="form.data_content.goods_num" :actived="props.actived" :is-show="form.data_content.is_show" :chunk-padding="form.data_style.chunk_padding" :value="item1.split_list" :good-style="props.goodStyle" :content-img-radius="form.data_style.get_img_radius"></product-list-show>
                    </template>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { gradient_computer, radius_computer, padding_computer, background_computer } from "@/utils";
import { isEmpty } from "lodash";
interface Props {
    value: any;
    type: string;
    actived: number;
    goodStyle?: any;
}

const props = withDefaults(defineProps<Props>(), {
    goodStyle: {},
});

const form = computed(() => props.value);
interface new_style {
    data_color_list: color_list[];
    data_direction: string; 
    data_radius: radiusStyle;
    data_chunk_padding: paddingStyle;
    data_background_img: uploadList[];
    data_background_img_style: string;
}

// 用于样式显示
const style_container = computed(() => {
    if (!isEmpty(form.value.data_style)) {
        const { data_color_list = [], data_direction = '180deg', data_radius = { radius: 0, radius_top_left: 0, radius_top_right: 0, radius_bottom_left: 0, radius_bottom_right: 0 }} = form.value.data_style;
        const data = {
            color_list: data_color_list,
            direction: data_direction,
        }
        return gradient_computer(data) + radius_computer(data_radius);
    } else {
        return '';
    }
});
const style_img_container = computed(() => {
    if (!isEmpty(form.value.data_style)) {
        const { data_background_img = [], data_background_img_style = '2', data_chunk_padding = { padding: 0, padding_top: 0, padding_bottom: 0, padding_left: 0, padding_right: 0 }} = form.value.data_style;
        const data = {
            background_img: data_background_img,
            background_img_style: data_background_img_style,
        }
        return padding_computer(data_chunk_padding) + background_computer(data);
    } else {
        return '';
    }
});

const emits = defineEmits(['carousel_change']);
const carousel_change = (index: number) => {
    emits('carousel_change', index);
};
</script>

<style lang="scss" scoped>

</style>