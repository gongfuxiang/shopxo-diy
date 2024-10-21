<!-- 通用样式 -->
<template>
    <div class="flex-col gap-10 w">
        <slider v-model="form.radius" @update:model-value="radius_event"></slider>
        <div class="flex-row flex-wrap gap-x-20 mt-10">
            <div class="flex-width-half pr-10">
                <input-number v-model="form.radius_top_left" icon-name="radius-l-t" @update:model-value="rtl_event"></input-number>
            </div>
            <div class="flex-width-half pl-10">
                <input-number v-model="form.radius_top_right" icon-name="radius-r-t" @update:model-value="rtr_event"></input-number>
            </div>
            <div class="flex-width-half pr-10">
                <input-number v-model="form.radius_bottom_left" icon-name="radius-l-b" @update:model-value="rbl_event"></input-number>
            </div>
            <div class="flex-width-half pl-10">
                <input-number v-model="form.radius_bottom_right" icon-name="radius-r-b" @update:model-value="rbr_event"></input-number>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// interface common_radius {
//     radius: number;
//     radius_top_left: number;
//     radius_top_right: number;
//     radius_bottom_left: number;
//     radius_bottom_right: number;
// }
// interface Props {
//     value: common_radius;
// }
// const props = defineProps<Props>();
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});
// 用于页面判断显示
const state = reactive({
    form: props.value || {
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
    },
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

const emit = defineEmits(['update:value']);
const radius_event = (val: number | undefined) => {
    form.value.radius = Number(val);
    form.value.radius_top_left = Number(val);
    form.value.radius_top_right = Number(val);
    form.value.radius_bottom_left = Number(val);
    form.value.radius_bottom_right = Number(val);
    emit('update:value', form.value);
};
const rtl_event = (val: number | undefined) => {
    form.value.radius_top_left = Number(val);
    form.value.radius = 0;
    emit('update:value', form.value);
};
const rtr_event = (val: number | undefined) => {
    form.value.radius_top_right = Number(val);
    form.value.radius = 0;
    emit('update:value', form.value);
};
const rbl_event = (val: number | undefined) => {
    form.value.radius_bottom_left = Number(val);
    form.value.radius = 0;
    emit('update:value', form.value);
};
const rbr_event = (val: number | undefined) => {
    form.value.radius_bottom_right = Number(val);
    form.value.radius = 0;
    emit('update:value', form.value);
};
</script>
<style lang="scss" scoped>
.common-styles {
    width: 100%;
}
</style>
