<!-- 链接组件 -->
<template>
    <div :class="['flex-row align-c gap-10 br-d radius-sm plr-11 url-value-input', props.isDisabled ? 'c-pointer' : '']" @click="dialogVisible = props.isDisabled">
        <div class="flex-1 flex-width size-12 text-line-1">
            <text v-if="!is_obj_empty(modelValue)">{{ modelValue.name || modelValue.title }}</text>
            <text v-else class="cr-9">{{ placeholder }}</text>
        </div>
        <div class="value-input-icon">
            <template v-if="is_obj_empty(modelValue)">
                <icon name="arrow-right" size="12" color="9"></icon>
            </template>
            <template v-else>
                <div v-if="props.isDisabled" @click.stop="clear_model_value">
                    <icon name="close-fillup" size="12" color="c"></icon>
                </div>
            </template>
        </div>
    </div>
    <url-value-dialog v-model:model-value="new_model_value" v-model:dialog-visible="dialogVisible" :select-is-url="true" :type="type" :dialog-position-top="dialogPositionTop" @update:model-value="model_value_call_back"></url-value-dialog>
</template>
<script lang="ts" setup>
import { is_obj_empty } from '@/utils';
const app = getCurrentInstance();
/**
 * @description: 页面链接
 * @param modelValue{Object} 默认值
 * @param dialogVisible {Boolean} 弹窗显示
 * @param type{String} 链接类型为空数组则表示无限制，全部可用，传过来则表示传的值可用
 * @param placeholder{String} 提示文字
 * @return {*} update:modelValue
 */
const props = defineProps({
    type: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    placeholder: {
        type: String,
        default: '请选择链接',
    },
    dialogPositionTop: {
        type: Number,
        default: 0,
    },
    isDisabled: {
        type: Boolean,
        default: true,
    },
});
const modelValue = defineModel({ type: Object, default: {} });
const new_model_value = ref<any[]>([]);
const dialogVisible = defineModel('dialogVisible', { type: Boolean, default: false });
//#endregion 链接清空-------------------------------------------------start
const clear_model_value = () => {
    modelValue.value = {};
};
//#endregion 链接清空-------------------------------------------------end
const model_value_call_back = (value: any[]) => {
    if (value.length > 0) {
        modelValue.value = JSON.parse(JSON.stringify(value[0]));
    }
};
</script>
<style lang="scss" scoped>
.url-value-input {
    width: 100%;
    height: 3.2rem;
    line-height: 3.2rem;
    position: relative;
    .value-input-icon {
        position: absolute;
        right: 0;
        width: 3.4rem;
        z-index: 1;
        text-align: center;
    }
}
</style>
