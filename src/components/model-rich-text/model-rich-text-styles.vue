<template>
    <div class="styles">
        <common-styles class="styles-height" :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});
const emit = defineEmits(['update:value']);
// 默认值
let form = reactive(props.value);
const common_styles_update = (val: Object) => {
    form.common_style = val;
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
    .styles-height {
        min-height: calc(100vh - 16.8rem);
    }
}
</style>
