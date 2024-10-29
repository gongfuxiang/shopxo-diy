<template>
    <template v-if="props.outerflex == 'row'">
        <div class="flex-row gap-10 align-c w h">
            <template v-if="props.flex === 'row'">
                <div v-for="(item, index) in split_list" :key="index" class="flex-row gap-10 half-width h">
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
            </template>
            <template v-else-if="actived != 7 || props.num != 1">
                <div v-for="(item, index) in split_list" :key="index" :class="['flex-col gap-10 h', { 'half-width': props.num != 1, 'w': props.num == 1 }]">
                    <div class="w h re">
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
                    <div v-if="isShow.includes('title')" class="text-line-1 size-14 tl w" style="overflow: inherit;" :style="goodStyle.goods_title_style">{{ item.title }}</div>
                </div>
            </template>
            <template v-else>
                <div v-for="(item, index) in split_list" :key="index" class="flex-col w h">
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
            </template>
        </div>
    </template>
    <template v-else>
        <div class="flex-col gap-10 align-c w h">
            <template v-if="props.flex === 'row'">
                <div v-for="(item, index) in split_list" :key="index" class="flex-row gap-10 align-c w h shop-max-height">
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
            </template>
        </div>
    </template>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
import { padding_computer } from '@/utils';

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