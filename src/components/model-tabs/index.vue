<template>
    <div :style="style">
        <div :style="style_img_container">
            <tabs-view ref="tabs" :value="tabs_list" :is-tabs="true"></tabs-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, common_img_computer } from '@/utils';
import { cloneDeep } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

const tabs_list = ref(props.value);
watch(props.value, (val) => {
    let new_data = cloneDeep(val);
    const { home_data } = new_data.content;
    new_data.content.tabs_list = [home_data, ...new_data.content.tabs_list];
    tabs_list.value = new_data;
}, { immediate: true, deep: true });

const style = computed(() => common_styles_computer(props.value.style.common_style));
const style_img_container = computed(() => common_img_computer(props.value.style.common_style));
</script>
<style lang="scss" scoped></style>
