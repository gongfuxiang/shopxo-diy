<!-- 通用样式 -->
<template>
    <div class="flex-col w">
        <div class="flex-row gap-10 align-c">
            <slider v-model="form.radius" type="retract" @update:model-value="radius_event" @operation_end="operation_end"></slider>
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" :content="icon_data.title" raw-content placement="top">
                <div class="flex-1 type-icon flex" @click="icon_event(icon_data.name)">
                    <icon :name="icon_data.name" size="24"></icon>
                </div>
            </el-tooltip>
        </div>
        <div class="type-icon-animation flex-row flex-wrap gap-x-20 oh" :style="`${ icon_data.name == 'alone' ? 'margin-top:20px;height: 100%;transform: scale(1);' : 'height:0px;transform: scale(0);margin-top:0px;'}`">
            <div class="flex-width-half pr-10">
                <input-number v-model="form.radius_top_left" icon-name="radius-l-t" @update:model-value="rtl_event" @operation_end="operation_end"></input-number>
            </div>
            <div class="flex-width-half pl-10">
                <input-number v-model="form.radius_top_right" icon-name="radius-r-t" @update:model-value="rtr_event" @operation_end="operation_end"></input-number>
            </div>
            <div class="flex-width-half pr-10">
                <input-number v-model="form.radius_bottom_left" icon-name="radius-l-b" @update:model-value="rbl_event" @operation_end="operation_end"></input-number>
            </div>
            <div class="flex-width-half pl-10">
                <input-number v-model="form.radius_bottom_right" icon-name="radius-r-b" @update:model-value="rbr_event" @operation_end="operation_end"></input-number>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { areAllEqual } from '@/utils';
// 通用样式
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

const emit = defineEmits(['update:value', 'operation_end']);
// 失去焦点时触发事件
const operation_end = () => {
    emit('operation_end');
};
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
//#region 展开收起
onBeforeMount(() => {
    // 判断是否相等，如果不相等，就展开
    const flag = areAllEqual(form.value.radius_top_left, form.value.radius_top_right, form.value.radius_bottom_left, form.value.radius_bottom_right);
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
.common-styles {
    width: 100%;
}
.type-icon{
    cursor: pointer;
}
.type-icon-animation {
    transition: height 0.3s, transform 0.8s, margin-top 0.6s;
}
</style>
