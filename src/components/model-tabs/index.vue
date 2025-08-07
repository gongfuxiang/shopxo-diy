<template>
    <div :style="style">
        <div :style="style_img_container">
            <tabs-view ref="tabs" :value="tabs_list" :is-tabs="true" :active-index="tabs_active_index" :tabs-sliding-fixed-bg="tabs_sliding_fixed_bg"></tabs-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, common_img_computer, gradient_computer } from '@/utils';
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
// 打开滑动固定开关之后，显示的样式
const tabs_sliding_fixed_bg = ref('');
const tabs_active_index = ref(0);
watch(props.value, (val) => {
    let new_data = cloneDeep(val);
    const { home_data } = new_data.content;
    new_data.content.tabs_list = [home_data, ...new_data.content.tabs_list];
    tabs_list.value = new_data;
    tabs_sliding_fixed_bg.value = gradient_computer(props.value.style.common_style);
    // 当前选中的内容
    tabs_active_index.value = new_data.content.tabs_active_index;
}, { immediate: true, deep: true });

const style = computed(() => common_styles_computer(props.value.style.common_style));
const style_img_container = computed(() => common_img_computer(props.value.style.common_style));
</script>
<style lang="scss" scoped></style>
