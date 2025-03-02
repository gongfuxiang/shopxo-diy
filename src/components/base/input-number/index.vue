<!-- 数字输入框 -->
<template>
    <div class="input-number" :class="iconName ? 'has-icon' : ''">
        <icon v-if="iconName" :name="iconName" size="14" color="3" class="input-icon"></icon>
        <el-input-number v-model="internal_value" :min="min" :max="max" type="number" placeholder="0" controls-position="right" @keyup.enter="preventDefault" @blur="blur"></el-input-number>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    iconName: {
        type: String,
        default: () => '',
    },
    min: {
        type: Number,
        default: () => 0,
    },
    max: {
        type: Number,
        default: () => 100,
    },
});
const internal_value = defineModel({ type: Number, default: 0 });
// 阻止默认点击事件
const preventDefault = (e: DragEvent) => {
    e.preventDefault();
}
const emit = defineEmits(['operation_end']);
const blur = () => {
    emit('operation_end');
};
</script>
<style lang="scss" scoped>
.input-number {
    position: relative;
    :deep(.el-input-number.is-controls-right .el-input__wrapper) {
        .el-input__inner {
            text-align: left;
        }
    }
    &.has-icon {
        :deep(.el-input-number.is-controls-right .el-input__wrapper) {
            padding-left: 3rem;
        }
        .input-icon {
            position: absolute;
            z-index: 1;
            top: 0.1rem;
            left: 0.8rem;
        }
    }
}
</style>
