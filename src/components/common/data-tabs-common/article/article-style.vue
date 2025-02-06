<template>
    <div class="data-tabs-style">
        <model-article-list-styles :value="form" :content="data" :default-config="defaultConfig" :is-common-style="false" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: Object,
        default: () => ({}),
    },
    defaultConfig: {
        type: Object,
        default: () => ({
            // 图片不同风格下的圆角
            img_radius_0: 4,
            img_radius_1: 0,
        }),
    },
});

// 默认值
const state = reactive({
    form: props.value,
    data: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
watch(() => props.value, (value) => {
    form.value = value;
},{deep: true, immediate: true });

watch(() => props.content, (value) => {
    data.value = value;
},{deep: true, immediate: true });
</script>

<style lang="scss" scoped>
</style>