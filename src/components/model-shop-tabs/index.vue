<template>
    <div :style="style_container">
        <tabs-view ref="tabs" :value="props.value"></tabs-view>
        <div class="pt-10">
            <model-shop-list :value="tabs_list" :is-common-style="false"></model-shop-list>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});
// 用于页面判断显示
const state = reactive({
    form: props.value.content,
    new_style: props.value.style,
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);

const tabs_list = ref({
    content: {
        ...toRefs(form.value),
        ...toRefs(form.value.tabs_list[0]),
    },
    style: {
        ...toRefs(new_style.value),
    }
})
console.log(tabs_list.value);

// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
</script>
<style lang="scss" scoped>
</style>
