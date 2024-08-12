<template>
    <div class="slider w">
        <el-slider v-model="internal_value" :min="min" :max="max" :step="step" />
        <input-number v-model="internal_value" class="slider-input" :min="min" :max="max"></input-number>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 100,
    },
    step: {
        type: Number,
        default: 1,
    },
});
const internal_value = defineModel({ type: Number, default: 0 });
</script>
<style lang="scss" scoped>
.slider {
    padding-left: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    .slider-input {
        :deep(.el-input-number) {
            width: 9rem;
        }
    }
}
</style>
