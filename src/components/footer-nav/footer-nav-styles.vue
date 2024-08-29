<template>
    <div class="container">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">颜色设置</div>
                <el-form-item label="默认文本">
                    <color-picker v-model="form.default_text_color" default-color="rgba(0, 0, 0, 1)" @update:value="default_text_color_event" />
                </el-form-item>
                <el-form-item label="选中文本">
                    <color-picker v-model="form.text_color_checked" default-color="rgba(204, 204, 204, 1)" @update:value="text_color_checked_event" />
                </el-form-item>
            </card-container>
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { omit } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {
                text_color_checked: 'rgba(204, 204, 204, 1)',
                default_text_color: 'rgba(0, 0, 0, 1)',
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
const text_color_checked_event = (val: string | null) => {
    form.value.text_color_checked = val;
    call_back_update(form);
};
const default_text_color_event = (val: string | null) => {
    form.value.default_text_color = val;
    call_back_update(form);
};
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
    call_back_update(form.value);
};
const call_back_update = (val: Object) => {
    emit('update:value', val);
};
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    .container-height {
        min-height: calc(100vh - 36.8rem);
    }
}
</style>
