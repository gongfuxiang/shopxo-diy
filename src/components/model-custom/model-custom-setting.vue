<template>
    <div class="w">
        <template v-if="type == '1'">
            <model-custom-content :value="value.content" @update:value="content_update"></model-custom-content>
        </template>
        <template v-if="type == '2'">
            <model-custom-styles :value="value.style" @update:value="style_update"></model-custom-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    type: {
        type: String,
        default: '1',
    },
    value: {
        type: Object,
        default: () => ({}),
    },
});
const form = reactive(props.value);
const content_update = (value: any) => {
    form.content = value;
};
const style_update = (value: any) => {
    form.style = value;
};
</script>
<style lang="scss" scoped></style>
