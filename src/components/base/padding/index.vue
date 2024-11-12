<template>
    <div class="flex-col w">
        <div class="flex-row gap-10 align-c">
            <slider v-model="form.padding" :max="200" type="retract" @update:model-value="padding_event"></slider>
            <el-tooltip effect="light" :show-after="200" :hide-after="200" :content="icon_data.title" raw-content placement="top">
                <div class="flex-1 type-icon flex" @click="icon_event(icon_data.name)">
                    <icon :name="icon_data.name" size="24"></icon>
                </div>
            </el-tooltip>
        </div>
        <div class="type-icon-animation flex-row flex-wrap gap-x-20 oh" :style="`${ icon_data.name == 'alone' ? 'margin-top:20px;height: 100%;transform: scale(1);' : 'height:0px;transform: scale(0);margin-top:0px;'}`">
            <div class="flex-width-half pr-10">
                <input-number v-model="form.padding_top" :max="200" icon-name="enter-t" @update:model-value="pt_event"></input-number>
            </div>
            <div class="flex-width-half pl-10">
                <input-number v-model="form.padding_bottom" :max="200" icon-name="enter-b" @update:model-value="pb_event"></input-number>
            </div>
            <div class="flex-width-half pr-10">
                <input-number v-model="form.padding_left" :max="200" icon-name="enter-l" @update:model-value="pl_event"></input-number>
            </div>
            <div class="flex-width-half pl-10">
                <input-number v-model="form.padding_right" :max="200" icon-name="enter-r" @update:model-value="pr_event"></input-number>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { areAllEqual } from '@/utils';
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

const padding_event = (val: number | undefined) => {
    form.value.padding = Number(val);
    form.value.padding_top = Number(val);
    form.value.padding_bottom = Number(val);
    form.value.padding_left = Number(val);
    form.value.padding_right = Number(val);
    emit('update:value', form);
};
const pt_event = (val: number | undefined) => {
    form.value.padding_top = Number(val);
    form.value.padding = 0;
    emit('update:value', form);
};
const pb_event = (val: number | undefined) => {
    form.value.padding_bottom = Number(val);
    form.value.padding = 0;
    emit('update:value', form);
};
const pl_event = (val: number | undefined) => {
    form.value.padding_left = Number(val);
    form.value.padding = 0;
    emit('update:value', form);
};
const pr_event = (val: number | undefined) => {
    form.value.padding_right = Number(val);
    form.value.padding = 0;
    emit('update:value', form);
};
//#region 展开收起
onBeforeMount(() => {
    // 判断是否相等，如果不相等，就展开
    const flag = areAllEqual(form.value.padding_top, form.value.padding_bottom, form.value.padding_left, form.value.padding_right);
    if (!flag) {
        icon_event('margin');
    }
});
const icon_data = reactive({
    name: 'margin',
    title: '独个'
});
const icon_event = (name: string) => {
    if (name == 'margin') {
        icon_data.name = 'alone';
        icon_data.title = '统一';
    } else {
        icon_data.name = 'margin';
        icon_data.title = '独个';
    }
}
//#endregion
</script>
<style lang="scss" scoped>
    .type-icon{
        cursor: pointer;
    }
    .type-icon-animation {
        transition: height 0.3s, transform 0.8s, margin-top 0.6s;
    }
</style>
