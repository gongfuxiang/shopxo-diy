<template>
    <div class="auxiliary-line-styles">
        <el-form :model="form" label-width="70" @submit.prevent>
            <card-container>
                <div class="mb-12">线条样式</div>
                <el-form-item label="线条颜色">
                    <color-picker v-model="form.line_color" default-color="rgba(204, 204, 204, 1)" />
                </el-form-item>
                <el-form-item label="线条粗细">
                    <slider v-model="form.line_width"></slider>
                </el-form-item>
            </card-container>
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 辅助线（样式）
 * @param value{Object} 样式数据
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {
                line_color: 'rgba(204, 204, 204, 1)',
                line_width: 1,
            };
        },
    },
});
const emit = defineEmits(['update:value']);
const state = reactive({
    form: props.value,
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);
// 公共样式的变化回调
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped>
.auxiliary-line-styles {
    width: 100%;
    .auxiliary-line-styles-height {
        min-height: calc(100vh - 36.8rem);
    }
}
</style>
