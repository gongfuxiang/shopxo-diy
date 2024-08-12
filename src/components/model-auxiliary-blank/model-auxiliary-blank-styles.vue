<template>
    <div class="common-style-height">
        <el-form :model="form" label-width="70">
            <card-container class="mb-8">
                <div class="mb-12">空白样式</div>
                <el-form-item label="线条颜色">
                    <color-picker v-model="form.line_color" default-color="rgba(204, 204, 204, 1)" @update:value="line_color_event" />
                </el-form-item>
            </card-container>
        </el-form>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {
                line_color: 'rgba(204, 204, 204, 1)',
            };
        },
    },
});

const state = reactive({
    form: props.value,
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

const line_color_event = (val: string | null) => {
    form.value.line_color = val;
};
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped>
.auxiliary-line {
    width: 100%;
}
</style>
