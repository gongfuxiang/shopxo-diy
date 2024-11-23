<template>
    <div :class="['align-c w h', ( props.outerflex == 'row' ? 'flex-row' : 'flex-col')]" :style="'gap:' + props.goodStyle.data_goods_gap + 'px;'">
        <template v-if="props.flex === 'row'">
            <div v-for="(item, index) in split_list" :key="index" :style="block_size">
                <div class="w h oh" :style="style_container(props.goodStyle)">
                    <div class="w h flex-row gap-10" :style="style_img_container(props.goodStyle)">
                        <div :style="`width: ${ image_scale }%;`">
                            <template v-if="!isEmpty(item.new_cover)">
                                <image-empty v-model="item.new_cover[0]" :style="contentImgRadius"></image-empty>
                            </template>
                            <template v-else>
                                <image-empty v-model="item.images" class="img" :style="contentImgRadius"></image-empty>
                            </template>
                        </div>
                        <div v-if="!isEmpty(isShow)" class="flex-col w h tl jc-sb" :style="`width: ${ 100 - image_scale }%;`">
                            <div v-if="isShow.includes('title')" class="text-line-2 size-14" :style="props.goodStyle.goods_title_style + `height: ${ (props.goodStyle.goods_title_size + 3) * 2 }px;`">{{ item.title }}</div>
                            <div v-if="isShow.includes('price')" :style="props.goodStyle.goods_price_style">
                                <span :style="props.goodStyle.goods_price_symbol_style">{{ item.show_price_symbol }}</span>{{ item.min_price }}
                                <template v-if="isShow.includes('price_unit')">
                                    <span :style="props.goodStyle.goods_price_unit_style">{{ item.show_price_unit }}</span>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="props.flex == 'col_price_float'">
            <div v-for="(item, index) in split_list" :key="index" :style="block_size">
                <div class="w h oh" :style="style_container(props.goodStyle)">
                    <div class="w h flex-col gap-10" :style="style_img_container(props.goodStyle)">
                        <div class="w h re flex-1 oh">
                            <template v-if="!isEmpty(item.new_cover)">
                                <image-empty v-model="item.new_cover[0]" :style="contentImgRadius"></image-empty>
                            </template>
                            <template v-else>
                                <image-empty v-model="item.images" class="img" :style="contentImgRadius"></image-empty>
                            </template>
                            <div v-if="isShow.includes('price')" class="abs bottom-0 text-line-1" :style="props.goodStyle.goods_price_style + float_pirce_style(props.goodStyle)">
                                <span :style="props.goodStyle.goods_price_symbol_style">{{ item.show_price_symbol }}</span>{{ item.min_price }}
                                <template v-if="isShow.includes('price_unit')">
                                    <span :style="props.goodStyle.goods_price_unit_style">{{ item.show_price_unit }}</span>
                                </template>
                            </div>
                        </div>
                        <div v-if="isShow.includes('title')" class="text-line-1 size-14 tl w" :style="props.goodStyle.goods_title_style + `height: ${ props.goodStyle.goods_title_size + 3 }px;`">{{ item.title }}</div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div v-for="(item, index) in split_list" :key="index" :style="block_size">
                <div class="w h oh" :style="style_container(props.goodStyle)">
                    <div class="w h flex-col" :style="style_img_container(props.goodStyle, 'col')">
                        <template v-if="!isEmpty(item.new_cover)">
                            <image-empty v-model="item.new_cover[0]" :style="contentImgRadius"></image-empty>
                        </template>
                        <template v-else>
                            <image-empty v-model="item.images" class="img" :style="contentImgRadius"></image-empty>
                        </template>
                        <div v-if="!isEmpty(isShow)" class="flex-col w tl jc-sb" :style="`${ padding_computer(props.goodStyle.goods_chunk_padding) }`">
                            <div v-if="isShow.includes('title')" class="text-line-2 size-14" :style="props.goodStyle.goods_title_style + `height: ${ (props.goodStyle.goods_title_size + 3) * 2 }px;`">{{ item.title }}</div>
                            <div v-if="isShow.includes('price')" :style="props.goodStyle.goods_price_style">
                                <span :style="props.goodStyle.goods_price_symbol_style">{{ item.show_price_symbol }}</span>{{ item.min_price }}
                                <template v-if="isShow.includes('price_unit')">
                                    <span :style="props.goodStyle.goods_price_unit_style">{{ item.show_price_unit }}</span>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
import { gradient_computer, radius_computer, padding_computer, background_computer, margin_computer } from "@/utils";

interface Props {
    value: Array<any>;
    outerflex: string;
    flex: string;
    contentImgRadius: string;
    num: number;
    actived: number;
    isShow: Array<string>;
    chunkPadding: paddingStyle;
    goodStyle: any;
    dataContent: any;
}

const props = withDefaults(defineProps<Props>(), {
    value: () => [],
    outerflex: 'row',
    flex: 'row',
});
interface new_style {
    goods_color_list: color_list[];
    goods_direction: string; 
    goods_radius: radiusStyle;
    goods_chunk_padding: paddingStyle;
    goods_background_img: uploadList[];
    goods_background_img_style: string;
    goods_price_color_list: color_list[];
    goods_price_direction: string;
    goods_price_radius: radiusStyle;
    goods_price_padding: paddingStyle;
    goods_price_margin: marginStyle;
    goods_price_location: string;
}
// 数据的默认值，避免没有值的时候报错
const old_radius = { radius: 0, radius_top_left: 0, radius_top_right: 0, radius_bottom_left: 0, radius_bottom_right: 0 };
const old_padding = { padding: 0, padding_top: 0, padding_bottom: 0, padding_left: 0, padding_right: 0 };
const old_margin = { margin: 0, margin_top: 0, margin_bottom: 0, margin_left: 0, margin_right: 0 };

const block_size = computed(() => {
    const total_gap: number = props.goodStyle.data_goods_gap * (split_list.value.length - 1);
    return props.outerflex == 'row' ? 'height:100%;width:calc((100% - ' + total_gap + 'px) / ' + props.num  + ');' : 'width: 100%;height:calc((100% - ' + total_gap + 'px) / ' + props.num  + ');';
});
// 图片显示比例
const image_scale = computed(() => {
    const data = ['title', 'price', 'price_unit'];
    const list = props.isShow.filter((item: string) => data.includes(item));
    if (list.length > 0) {
        return props.dataContent.image_scale;
    } else {
        return 100;
    }
});
const float_pirce_style = computed(() => {
    return (val: new_style) => {
        const { goods_price_color_list = [], goods_price_direction = '180deg', goods_price_radius = old_radius, goods_price_padding = old_padding, goods_price_margin = old_margin, goods_price_location = 'center' } = val;
        const data = {
            color_list: goods_price_color_list,
            direction: goods_price_direction,
        }
        let location = 'left:50%;transform:translateX(-50%);'
        if (goods_price_location == 'left') {
            location = 'left:0;';
        } else if (goods_price_location == 'right') {
            location = 'right:0;';
        }
        return gradient_computer(data) + radius_computer(goods_price_radius) + padding_computer(goods_price_padding) + margin_computer(goods_price_margin) + location;
    }
});

// 用于样式显示
const style_container = computed(() => {
    return (val: new_style) => {
        if (!isEmpty(val)) {
            const { goods_color_list = [], goods_direction = '180deg', goods_radius = old_radius } = val;
            const data = {
                color_list: goods_color_list,
                direction: goods_direction,
            }
            return gradient_computer(data) + radius_computer(goods_radius);
        } else {
            return '';
        }
    }
});
const style_img_container = computed(() => {
    return (val: new_style, type?: string) => {
        if (!isEmpty(val)) {
            const { goods_background_img = [], goods_background_img_style = '2', goods_chunk_padding = old_padding} = val;
            const data = {
                background_img: goods_background_img,
                background_img_style: goods_background_img_style,
            }
            return type == 'col' ? background_computer(data) : padding_computer(goods_chunk_padding) + background_computer(data);
        } else {
            return '';
        }
    }
});
const split_list = computed(() => props.value || {});
</script>

<style lang="scss" scoped>
:deep(.el-image) {
    height: 100%;
    width: 100%;
    .el-image__inner {
        object-fit: cover;
    }
    .image-slot img {
        width: 4rem !important;
    }
}
.identifying .num {
    font-size: 0.9rem;
    line-height: 0.9rem;
}
.half-width {
    width: 50%;
}
</style>