<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-data-tabs-content :value="form.content" :tab-style="form.style" @set_offset_top="set_offset_top"></model-data-tabs-content>
        </template>
        <template v-if="type == '2'">
            <model-data-tabs-styles :value="form.style" :tabs-style="form.content.tabs_theme" :content="form.content"></model-data-tabs-styles>
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

const form = ref(props.value);
const emits = defineEmits(['set_offset_top']);
const set_offset_top = (offsetTop: number) => {
    emits('set_offset_top', offsetTop);
};
</script>
<style lang="scss" scoped>
.auxiliary-line-setting {
    width: 100%;
}
</style>
