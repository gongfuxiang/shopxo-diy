<template>
    <div :style="style">
        {{ props.value }}
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
