<template>
    <div class="flex-col gap-10 w">
        <slider v-model="form.margin" :max="200" @update:model-value="margin_event"></slider>
        <div class="flex-row flex-wrap gap-x-20 mt-10">
            <div class="flex-width-half pr-10">
                <input-number v-model="form.margin_top" :max="200" icon-name="enter-t" @update:model-value="pt_event"></input-number>
            </div>
            <div class="flex-width-half pl-10">
                <input-number v-model="form.margin_bottom" :max="200" icon-name="enter-b" @update:model-value="pb_event"></input-number>
            </div>
            <div class="flex-width-half pr-10">
                <input-number v-model="form.margin_left" :max="200" icon-name="enter-l" @update:model-value="pl_event"></input-number>
            </div>
            <div class="flex-width-half pl-10">
                <input-number v-model="form.margin_right" :max="200" icon-name="enter-r" @update:model-value="pr_event"></input-number>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});
// 用于页面判断显示
const state = reactive({
    form: props.value || {},
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

const emit = defineEmits(['update:value']);

const margin_event = (val: number | undefined) => {
    form.value.margin = Number(val);
    form.value.margin_top = Number(val);
    form.value.margin_bottom = Number(val);
    form.value.margin_left = Number(val);
    form.value.margin_right = Number(val);
    emit('update:value', form);
};
const pt_event = (val: number | undefined) => {
    form.value.margin_top = Number(val);
    form.value.margin = 0;
    emit('update:value', form);
};
const pb_event = (val: number | undefined) => {
    form.value.margin_bottom = Number(val);
    form.value.margin = 0;
    emit('update:value', form);
};
const pl_event = (val: number | undefined) => {
    form.value.margin_left = Number(val);
    form.value.margin = 0;
    emit('update:value', form);
};
const pr_event = (val: number | undefined) => {
    form.value.margin_right = Number(val);
    form.value.margin = 0;
    emit('update:value', form);
};
</script>
