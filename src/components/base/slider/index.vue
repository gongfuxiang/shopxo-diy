<template>
    <div class="slider w">
        <el-slider v-model="modelValue" :min="min" :max="max" :step="step" :show-stops="max <= 10" />
        <input-number v-model="modelValue" :class="type == 'notRetract'? 'slider-input' : 'slider-retract-input'" :min="min" :max="max"></input-number>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    type: {
        type: String,
        default: 'notRetract',
    },
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
const modelValue = defineModel({ type: Number, default: 0 });
</script>
<style lang="scss" scoped>
.slider {
    padding-left: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    :deep(.el-slider__stop) {
        background: #f2f2f2;
    }
    .slider-input {
        :deep(.el-input-number) {
            width: 10.7rem;
        }
    }
    .slider-retract-input {
        :deep(.el-input-number) {
            width: 7.3rem;
        }
    }
}
</style>
