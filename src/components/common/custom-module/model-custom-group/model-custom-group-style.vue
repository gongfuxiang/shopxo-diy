<template>
    <div class="w h bg-f">
        <el-form :model="form" label-width="70">
            <custom-location v-model="diy_data.location" v-model:follow="form.data_follow" :is-follow="!followName.includes(diy_data.id)" :component-options="componentOptions" @operation_end="operation_end"></custom-location>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">容器设置</div>
                <el-form-item label="容器宽度">
                    <slider v-model="form.com_width" :max="390" @operation_end="operation_end"></slider>
                </el-form-item>
                <el-form-item label="容器高度">
                    <slider v-model="form.com_height" :max="1000" @operation_end="operation_end"></slider>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <condition-config :value="form" :options="options" @operation_end="operation_end"></condition-config>
            <div class="bg-f5 divider-line" />
            <animation-config v-model:type="form.animation_style.type" v-model:number="form.animation_style.number" @operation_end="operation_end"></animation-config>
            <div class="bg-f5 divider-line" />
            <el-tabs v-model="tabs_name" class="content-tabs">
                <el-tab-pane label="内容设置" name="content">
                    <custom-tabs-content :value="form" :options="options" :config-loop="configLoop" @operation_end="operation_end"></custom-tabs-content>
                </el-tab-pane>
                <el-tab-pane label="样式设置" name="styles">
                    <model-custom-styles :value="form.data_style" :content="form" :is-floating-up="false" @operation_end="operation_end"></model-custom-styles>
                </el-tab-pane>
            </el-tabs>
            <div class="bg-f5 divider-line" />
            <el-button class="w custom-button size-14" size="large" @click="custom_edit"><icon name="edit" size="14"></icon>编组编辑</el-button>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_history_name, location_compute } from '@/utils';
import { isEmpty } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    options: {
        type: Array<any>,
        default: () => [],
    },
    configLoop: {
        type: String,
        default: '1'
    },
    componentOptions: {
        type: Array<any>,
        default: () => [],
    },
    followName: {
        type: Array<string>,
        default: [],
    },
});
// 默认值
const tabs_name = ref('content');
const center_height = defineModel('height', { type: Number, default: 0 });
const state = reactive({
    diy_data: props.value,
});
// 如果需要解构，确保使用toRefs
const { diy_data } = toRefs(state);
const form = ref(diy_data.value.com_data);
//#region 自定义组的编辑功能  
const emit = defineEmits(['custom_edit', 'operation_end']);
const custom_edit = () => {
    const data_source_field = form.value.data_source_field;
    const { custom_list, com_width, custom_height } = form.value;
    const list = props.options.filter((item: any) => item.type == 'custom-data-list' && form.value.data_source_field.id === item.field);
    let flag = false;
    if (list.length > 0) {
        flag = true;
    }
    let width = com_width;
    if ((props.configLoop !== '1' && form.value.is_use_parent_data == '1') || (!isEmpty(form.value.data_source_field.id) && flag)) {
        // 计算宽度
        width = form.value.data_source_direction != 'vertical-scroll' ? com_width / form.value.data_source_carousel_col : com_width; // 可拖拽区域的宽度
    }
    emit('custom_edit', diy_data.value.id, custom_list, width, custom_height, data_source_field, props.configLoop !== '1' ? form.value.is_use_parent_data : '1');
};
//# endregion
// 操作结束触发事件
const operation_end = () => {
    emit('operation_end', get_history_name(diy_data.value));
};
//#region 位置计算
// 监听数据变化
watch(
    diy_data,
    (val) => {
        // 容器位置计算
        diy_data.value.location.x = location_compute(form.value.com_width, val.location.x, 390);
        diy_data.value.location.y = location_compute(form.value.com_height, val.location.y, center_height.value);
        diy_data.value.location.record_x = location_compute(form.value.com_width, val.location.record_x, 390);
        diy_data.value.location.record_y = location_compute(form.value.com_height, val.location.record_y, center_height.value);
        diy_data.value.location.staging_y = location_compute(form.value.com_height, val.location.staging_y, center_height.value);
        form.value.staging_height = form.value.com_height;
    },
    { immediate: true, deep: true }
);
//#endregion
</script>
<style lang="scss" scoped>
.border-style-item {
    width: 3rem;
    height: 2rem;
}
:deep(.el-tabs.content-tabs) {
    .el-tabs__header.is-top {
        background: #fff;
        margin: 0;
        padding-top: 2rem;
    }
    .el-tabs__item.is-top {
        padding: 0;
        align-items: center;
        width: 10rem;
        font-size: 1.4rem;
    }
    .el-tabs__active-bar{
        width: 100%;
    }
    .card-container {
        padding: 3rem !important;
    }
    .data-tabs-line {
        height: 0.8rem !important;
        margin-top: 0;
        margin-bottom: 0;
    }
}
.custom-button {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0; /* 固定在底部 */
  background-color: white; /* 设置背景色以避免按钮看不见 */
  z-index: 1000; /* 确保按钮在其他内容之上 */
  width: 100%; /* 确保按钮宽度占满父容器 */
  padding: 1rem; /* 添加一些内边距 */
}
</style>
