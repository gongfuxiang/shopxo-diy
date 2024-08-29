<template>
    <div :style="style_container">
        <div class="content re" :style="style_content">
            <template v-if="theme == '1'">
                <div class="oh flex-row">
                    <div class="coupon-theme-1">
                        <div class="coupon-theme-1-content tc">
                            <div class="name">满200元使用</div>
                            <div class="price">
                                <span class="size-8">¥</span>
                                <span class="size-30 fw-b pl-4">30</span>
                            </div>
                        </div>
                        <div class="coupon-btn">立即领取</div>
                    </div>
                </div>
            </template>
            <template v-else-if="theme == '2'">
                <div class="oh flex-row">
                    <div class="coupon-theme-2">
                        <div class="coupon-theme-2-content tc">
                            <div class="price">
                                <span class="size-8">¥</span>
                                <span class="size-26 fw-b pl-4">30</span>
                            </div>
                            <div class="name">满200元使用</div>
                            <div class="desc">指定商品可用</div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="theme == '3'"></template>
            <template v-else-if="theme == '4'"></template>
            <template v-else-if="theme == '5'"></template>
            <template v-else-if="theme == '6'"></template>
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
const content = ref('');
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
.coupon-theme-1 {
    background-color: #ff3830;
    width: 9rem;
    height: 9rem;
    border-radius: 1rem;
    margin-top: 1rem;
    gap: 2rem;
    .name {
        padding: 0.5rem;
        font-size: 1rem;
        color: #ff3830;
    }
    .price {
        color: #ff3830;
        padding: 0.5rem 0;
    }
    .coupon-theme-1-content {
        width: calc(100% - 1rem);
        margin: 0 0.5rem;
        background-image: url('../../assets/images/components/model-coupon/theme-1-bg.png');
        background-size: 100% 100%;
        position: relative;
        top: -1rem;
    }

    .coupon-btn {
        margin: 0 auto;
        width: 7.1rem;
        height: 1.756rem;
        line-height: 1.756rem;
        text-align: center;
        font-size: 0.9rem;
        color: #ff3830;
        background: #fff1e1;
        border-radius: 2.3rem;
        position: relative;
        top: -0.5rem;
    }
}
.coupon-theme-2 {
    background-image: url('../../assets/images/components/model-coupon/theme-2-content-bg.png');
    background-size: 100% 100%;
    width: 8.5rem;
    height: 10rem;
    gap: 2rem;
    .name {
        font-size: 0.8rem;
        color: #ff3830;
        font-weight: 500;
        margin-bottom: 0.5rem;
    }
    .desc {
        font-size: 0.8rem;
        color: #999;
    }
    .price {
        color: #ff3830;
        padding: 1rem 0 0.5rem 0;
    }
    .coupon-theme-2-content {
        width: calc(100% - 1rem);
        margin: 0 0.5rem;
        background-image: url('../../assets/images/components/model-coupon/theme-1-bg.png');
        background-size: 100% 100%;
        position: relative;
        top: -1rem;
    }
}
</style>