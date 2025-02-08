<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-nav-group-content :value="value.content" @set_offset_top="set_offset_top"></model-nav-group-content>
        </template>
        <template v-if="type == '2'">
            <model-nav-group-styles :value="value.style" :content="value.content"></model-nav-group-styles>
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
