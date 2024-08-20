<!-- 链接组件 -->
<template>
    <div class="flex-row align-c gap-10 br-d radius-sm plr-11 url-value-input" @click="dialogVisible = true">
        <div class="flex-1 flex-width size-12 text-line-1">
            <text v-if="!is_obj_empty(modelValue)">{{ modelValue.name || modelValue.title }}</text>
            <text v-else class="cr-9">{{ placeholder }}</text>
        </div>
        <div class="value-input-icon">
            <template v-if="is_obj_empty(modelValue)">
                <icon name="arrow-right" size="12" color="9"></icon>
            </template>
            <template v-else>
                <div @click.stop="clear_model_value">
                    <icon name="close-o" size="12" color="c"></icon>
                </div>
            </template>
        </div>
    </div>
    <url-value-dialog v-model:modelValue="modelValue" v-model:dialogVisible="dialogVisible" :type="type"></url-value-dialog>
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
});
const modelValue = defineModel({ type: Object, default: {} });
const dialogVisible = defineModel('dialogVisible', { type: Boolean, default: false });
//#endregion 链接清空-------------------------------------------------start
const clear_model_value = () => {
    modelValue.value = {};
};
//#endregion 链接清空-------------------------------------------------end
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
