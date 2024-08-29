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
                                <icon name=""></icon>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
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
    overflow: hidden;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    .item {
        background-color: #ff3830;
        width: 9rem;
        height: 9rem;
        border-radius: 1rem;
        margin-top: 1rem;
        .name {
            padding: 0.5rem;
            font-size: 1rem;
            color: #ff3830;
        }
        .price {
            color: #ff3830;
            padding: 0.5rem 0;
            .symbol {
                size: 0.8rem;
            }
            .number {
                font-size: 3rem;
                font-weight: 500;
                padding-left: 0.4rem;
            }
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
}
.coupon-theme-2 {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    .item {
        background-image: url('../../assets/images/components/model-coupon/theme-2-content-bg.png');
        background-size: 100% 100%;
        width: 8.5rem;
        height: 10rem;
        padding: 0.5rem;
        .name {
            font-size: 0.8rem;
            color: #ff3830;
            font-weight: 500;
            margin-bottom: 0.4rem;
        }
        .desc {
            font-size: 0.8rem;
            color: #999;
        }
        .price {
            color: #ff3830;
            padding: 0.3rem 0;
            .symbol {
                size: 0.8rem;
            }
            .number {
                font-size: 2.6rem;
                font-weight: 500;
                padding-left: 0.4rem;
            }
        }

        .coupon-btn {
            margin: 0 auto;
            width: 5.5rem;
            height: 1.6rem;
            line-height: 1.6rem;
            text-align: center;
            font-size: 0.9rem;
            color: #fff;
            background: #ff3830;
            border-radius: 2.3rem;
            margin-top: 0.5rem;
        }
    }
}
.coupon-theme-3 {
    border-radius: 1.6rem;
    overflow: hidden;
    .item {
        background: rgba(255, 56, 48, 1);
        width: 100%;
        padding: 1rem;
        display: flex;
        .left {
            flex: 1;
            width: 0;
            background-color: #fff1e1;
            border-radius: 0.8rem;
            padding: 1rem;
            display: flex;
            align-items: center;
            .price {
                text-align: center;
                width: 10rem;
                position: relative;
                display: flex;
                align-items: flex-start;
                color: #ff3830;
                &::before {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: -1.6rem;
                    bottom: -1.6rem;
                    width: 0.1rem;
                    height: calc(100% + 3.2rem);
                    border-left: 0.2rem dashed #ff3830;
                }
                .symbol {
                    size: 2.4rem;
                    font-weight: 600;
                }
                .number {
                    font-size: 4.6rem;
                    font-weight: 600;
                    padding-left: 0.4rem;
                    line-height: 4rem;
                }
            }
            .text {
                flex: 1;
                width: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                .name {
                    font-size: 1.8rem;
                    color: #ff3830;
                    font-weight: 500;
                }
                .desc {
                    font-size: 1.4rem;
                    font-weight: 500;
                    color: #ff3830;
                }
                .limit {
                    color: #999;
                    font-size: 1.2rem;
                }
            }
        }
        .right {
            width: 8.6rem;
            position: relative;
            padding: 1.7rem;
            text-align: center;
            &::before {
                content: '';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 200%;
                height: 200%;
                background-color: #ff3830;
                left: -1.6rem;
                border-radius: 100%;
            }
            .coupon-btn {
                color: #fff;
                position: relative;
                font-size: 1.8rem;
                font-weight: 500;
            }
        }
    }
}
</style>
