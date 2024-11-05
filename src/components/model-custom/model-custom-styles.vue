<template>
    <div class="w">
        <common-styles :value="value.common_style" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    }
});

</script>
<style lang="scss" scoped>
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
