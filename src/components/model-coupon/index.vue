<template>
    <div :style="style_container">
        <div class="content re" :style="style_content">
            <template v-if="theme == '1'">
                <div class="oh flex-row">
                    <div class="coupon-theme-1">
                        <div class="coupon-theme-1-content tc">
                            <div class="name">满200元使用</div>
                            <div class="price">
                                <span class="size-9">¥</span>
                                <span class="size-24 fw-b pl-4">30</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="theme == '2'"></template>
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
    gap: 3rem;
    .name {
        padding: 0.5rem;
        font-size: 1rem;
        color: #ff3830;
    }
    .price {
        color: #ff3830;
        padding: 1rem 0;
    }
    .coupon-theme-1-content {
        width: calc(100% - 1rem);
        margin: 0 0.5rem;
        background-image: url('../../assets/images/components/model-coupon/theme-1-bg.png');
        background-size: 100% 100%;
        position: relative;
        top: -1rem;
    }
}
</style>
