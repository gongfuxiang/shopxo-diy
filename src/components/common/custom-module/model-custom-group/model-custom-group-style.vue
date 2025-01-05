<template>
    <div class="w h bg-f">
        <el-form :model="form" label-width="70">
            <custom-location v-model="diy_data.location" @operation_end="operation_end"></custom-location>
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
            <el-tabs v-model="tabs_name" class="content-tabs">
                <el-tab-pane label="内容设置" name="content">
                    <custom-tabs-content :value="form" :options="options" @custom_edit="custom_edit" @operation_end="operation_end"></custom-tabs-content>
                </el-tab-pane>
                <el-tab-pane label="样式设置" name="styles">
                    <model-custom-styles :value="form.data_style" :content="form" :is-floating-up="false" @operation_end="operation_end"></model-custom-styles>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { location_compute } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    options: {
        type: Array<any>,
        default: () => [],
    },
});
// 默认值
const tabs_name = 'content';
const center_height = defineModel('height', { type: Number, default: 0 });
const state = reactive({
    diy_data: props.value,
});
// 如果需要解构，确保使用toRefs
const { diy_data } = toRefs(state);
const form = ref(diy_data.value.com_data);
//#region 自定义组的编辑功能  
const emit = defineEmits(['custom_edit', 'operation_end']);
const custom_edit = (data_source_field: any[]) => {
    const { custom_list, com_width, custom_height } = form.value;
    // 计算宽度
    const width = form.value.data_source_direction != 'vertical-scroll' ? com_width / form.value.data_source_carousel_col : com_width; // 可拖拽区域的宽度

    emit('custom_edit', diy_data.value.id, custom_list, width, custom_height, data_source_field);
};
//# endregion
// 操作结束触发事件
const operation_end = () => {
    emit('operation_end');
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
}
</style>
