<template>
    <div :style="style_container">
        <div class="re" :style="style_content">
            <template v-if="theme == '1'">
                <div class="coupon-theme-1">
                    <div class="item">
                        <div class="coupon-theme-1-content tc">
                            <div class="name">满200元使用</div>
                            <div class="price">
                                <span class="symbol">¥</span>
                                <span class="number">30</span>
                            </div>
                        </div>
                        <div class="coupon-btn">立即领取</div>
                    </div>
                </div>
            </template>
            <template v-else-if="theme == '2'">
                <div class="oh coupon-theme-2">
                    <div class="item">
                        <div class="tc">
                            <div class="price">
                                <span class="symbol">¥</span>
                                <span class="number">30</span>
                            </div>
                            <div class="name">满200元使用</div>
                            <div class="desc">指定商品可用</div>
                        </div>
                        <div class="coupon-btn"></div>
                    </div>
                </div>
            </template>
            <template v-else-if="theme == '3'">
                <div class="coupon-theme-3">
                    <div class="item">
                        <div class="left">
                            <div class="price">
                                <span class="symbol">¥</span>
                                <span class="number">30</span>
                            </div>
                            <div class="text">
                                <div class="name">满200元使用</div>
                                <div class="desc">指定商品可用</div>
                                <div class="limit">(限领一张)</div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="coupon-btn">
                                <text>立即领取</text>
                                <icon name="arrow-right-o" class="icon"></icon>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="theme == '4'">
                <div class="coupon-theme-3">
                    <div>
                        <div class="item">
                            <div class="left">
                                <div class="price">
                                    <span class="symbol">¥</span>
                                    <span class="number">30</span>
                                </div>
                                <div class="text">
                                    <div class="name">满200元使用</div>
                                    <div class="desc">指定商品可用</div>
                                    <div class="limit">(限领一张)</div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="coupon-btn">
                                    <text>立即领取</text>
                                    <icon name="arrow-right-o" class="icon"></icon>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""></div>
                </div>
            </template>
            <template v-else-if="theme == '5'">
                <div class="coupon-theme-5">
                    <div class="item">
                        <div class="left">
                            <div class="price">
                                <span class="symbol">¥</span>
                                <span class="number">30</span>
                            </div>
                            <div class="name">满200元使用</div>
                        </div>
                        <div class="right">
                            <div class="coupon-btn">领取</div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="theme == '6'">
                <div class="coupon-theme-6">
                    <div class="item">
                        <div class="top">
                            <div class="price">
                                <span class="symbol">¥</span>
                                <span class="number">30</span>
                            </div>
                            <div class="name">满200元使用</div>
                        </div>
                        <div class="bottom">
                            <div class="coupon-btn">立即领取</div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="theme == '7'"></template>
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

const style_content = ref('');
const style_container = ref('');
watch(
    props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content || {};
        const new_style = newVal?.style || {};
        console.log(new_style.common_style);
        style_container.value = common_styles_computer(new_style.common_style);
    },
    { immediate: true, deep: true }
);
const theme = computed(() => props.value?.content?.theme);
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
