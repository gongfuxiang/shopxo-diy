<template>
    <div class="styles">
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 热区（样式）
 * @param value{Object} 样式数据
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});
// 默认值
let form = ref(props.value);
// 公共样式回调
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped></style>
