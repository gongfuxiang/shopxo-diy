<template>
    <div class="flex-col w h gap-10">
        <color-picker v-model="color" :default-color="props.defaultColor"></color-picker>
        <text-size-group v-model:typeface="typeface" v-model:size="size"></text-size-group>
    </div>
</template>

<script setup lang="ts">
interface Props {
    defaultColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
    defaultColor: ''
});
const color = defineModel('color', {
    type: String,
    default: ''
});
const typeface = defineModel('typeface', {
    type: String,
    default: '400'
});
const size = defineModel('size', {
    type: Number,
    default: 15
});
</script>

<style lang="scss" scoped>
</style>