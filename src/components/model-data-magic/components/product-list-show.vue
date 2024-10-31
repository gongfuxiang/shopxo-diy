<template>
    <template v-if="props.outerflex == 'row'">
        <div class="flex-row gap-10 align-c w h">
            <template v-if="props.flex === 'row'">
                <div v-for="(item, index) in split_list" :key="index" class="half-width h">
                    <div class="w h oh" :style="style_container(goodStyle)">
                        <div class="w h flex-row gap-10" :style="style_img_container(goodStyle)">
                            <template v-if="!isEmpty(item.new_cover)">
                                <image-empty v-model="item.new_cover[0]" :style="contentImgRadius"></image-empty>
                            </template>
                            <template v-else>
                                <image-empty v-model="item.images" class="img" :style="contentImgRadius"></image-empty>
                            </template>
                            <div v-if="!isEmpty(isShow)" class="flex-col w h tl jc-sb">
                                <div v-if="isShow.includes('title')" class="text-line-2 size-14" :style="goodStyle.goods_title_style">{{ item.title }}</div>
                                <div v-if="isShow.includes('price')" class="identifying" :style="goodStyle.goods_price_style">
                                    <span class="num">{{ item.show_price_symbol }}</span>{{ item.min_price }}
                                    <template v-if="isShow.includes('price_unit')">
                                        <span class="num">{{ item.show_price_unit }}</span>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="actived != 7 || props.num != 1">
                <div v-for="(item, index) in split_list" :key="index" :class="['h', { 'half-width': props.num != 1, 'w': props.num == 1 }]">
                    <div class="w h oh" :style="style_container(goodStyle)">
                        <div class="w h flex-col gap-10" :style="style_img_container(goodStyle)">
                            <div class="w h re flex-1">
                                <template v-if="!isEmpty(item.new_cover)">
                                    <image-empty v-model="item.new_cover[0]" :style="contentImgRadius"></image-empty>
                                </template>
                                <template v-else>
                                    <image-empty v-model="item.images" class="img" :style="contentImgRadius"></image-empty>
                                </template>
                                <div v-if="isShow.includes('price')" class="price-suspension text-line-1" :style="goodStyle.goods_price_style">
                                    {{ item.show_price_symbol }}{{ item.min_price }}
                                    <template v-if="isShow.includes('price_unit')">
                                        {{ item.show_price_unit }}
                                    </template>
                                </div>
                            </div>
                            <div v-if="isShow.includes('title')" class="text-line-1 size-14 tl w" :style="goodStyle.goods_title_style">{{ item.title }}</div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-for="(item, index) in split_list" :key="index" class="w h">
                    <div class="w h oh" :style="style_container(goodStyle)">
                        <div class="w h flex-col" :style="style_img_container(goodStyle)">
                            <template v-if="!isEmpty(item.new_cover)">
                                <image-empty v-model="item.new_cover[0]" :style="contentImgRadius"></image-empty>
                            </template>
                            <template v-else>
                                <image-empty v-model="item.images" class="img" :style="contentImgRadius"></image-empty>
                            </template>
                            <div v-if="!isEmpty(isShow)" class="flex-col w tl jc-sb" :style="`${ padding_computer(props.chunkPadding) }`">
                                <div v-if="isShow.includes('title')" class="text-line-2 size-14" :style="goodStyle.goods_title_style">{{ item.title }}</div>
                                <div v-if="isShow.includes('price')" class="identifying" :style="goodStyle.goods_price_style">
                                    <span class="num">{{ item.show_price_symbol }}</span>{{ item.min_price }}
                                    <template v-if="isShow.includes('price_unit')">
                                        <span class="num">{{ item.show_price_unit }}</span>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </template>
    <template v-else>
        <div class="flex-col gap-10 align-c w h">
            <template v-if="props.flex === 'row'">
                <div v-for="(item, index) in split_list" :key="index" class="w h shop-max-height">
                    <div class="w h oh" :style="style_container(goodStyle)">
                        <div class="w h flex-row gap-10 align-c" :style="style_img_container(goodStyle)">
                            <template v-if="!isEmpty(item.new_cover)">
                                <image-empty v-model="item.new_cover[0]" :style="contentImgRadius"></image-empty>
                            </template>
                            <template v-else>
                                <image-empty v-model="item.images" class="img" :style="contentImgRadius"></image-empty>
                            </template>
                            <div v-if="!isEmpty(isShow)" class="flex-col w h tl jc-sb">
                                <div v-if="isShow.includes('title')" class="text-line-2 size-14" :style="goodStyle.goods_title_style">{{ item.title }}</div>
                                <div v-if="isShow.includes('price')" class="identifying" :style="goodStyle.goods_price_style">
                                    <span class="num">{{ item.show_price_symbol }}</span>{{ item.min_price }}
                                    <template v-if="isShow.includes('price_unit')">
                                        <span class="num">{{ item.show_price_unit }}</span>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </template>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
import { gradient_computer, radius_computer, padding_computer, background_computer } from "@/utils";

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
}

// 用于样式显示
const style_container = computed(() => {
    return (val: new_style) => {
        if (!isEmpty(val)) {
            const { goods_color_list = [], goods_direction = '180deg', goods_radius = { radius: 0, radius_top_left: 0, radius_top_right: 0, radius_bottom_left: 0, radius_bottom_right: 0 } } = val;
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
    return (val: new_style) => {
        if (!isEmpty(val)) {
            const { goods_background_img = [], goods_background_img_style = '2', goods_chunk_padding = { padding: 0, padding_top: 0, padding_bottom: 0, padding_left: 0, padding_right: 0 }} = val;
            const data = {
                background_img: goods_background_img,
                background_img_style: goods_background_img_style,
            }
            return padding_computer(goods_chunk_padding) + background_computer(data);
        } else {
            return '';
        }
    }
});
const split_list = computed(() => props.value || {});
const gap_height = computed(() => 20 / 3 + 'px');
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

.price-suspension {
    width: calc(100% - 0.8rem);
    margin: 0 0.4rem;
    background: #fff;
    font-size: 1.2rem;
    line-height: 1.7rem;
    color: #EA3323;
    text-align: center;
    position: absolute;
    bottom: 0.4rem;
    border-radius: 0.8rem;
}
.shop-max-height{
    max-height: calc((100% / 3) - v-bind(gap_height));
}
.half-width {
    width: 50%;
}
</style>