<template>
    <div :style="style">
        <tabs-view ref="tabs" :value="props.value"></tabs-view>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

const style = computed(() => common_styles_computer(props.value.style.common_style));
</script>
<style lang="scss" scoped>
</style>
