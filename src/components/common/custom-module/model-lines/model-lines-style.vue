<template>
    <div class="w h bg-f">
        <el-form :model="form" label-width="70">
            <custom-location v-model="diy_data.location" @operation_end="operation_end"></custom-location>
            <div class="bg-f5 divider-line" />
            <card-container class="">
                <div class="mb-12">线条设置</div>
                <el-form-item label="竖线横线">
                    <el-radio-group v-model="form.line_settings" @change="operation_end">
                        <el-radio value="horizontal">横线</el-radio>
                        <el-radio value="vertical">竖线</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="线条样式">
                    <el-radio-group v-model="form.line_style" @change="operation_end">
                        <el-radio value="dashed">
                            <icon name="line-point" class="re top-2" size="32"></icon>
                        </el-radio>
                        <el-radio value="solid">
                            <icon name="line" class="re top-2" size="32"></icon>
                        </el-radio>
                        <el-radio value="dotted">
                            <icon name="line-point" class="re top-2" size="32"></icon>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="form.line_settings === 'horizontal' ? '线条宽度' : '线条高度'">
                    <slider v-model="form.line_width" :max="1000" @operation_end="operation_end"></slider>
                </el-form-item>
                <el-form-item label="线条粗细">
                    <slider v-model="form.line_size" :min="1" :max="100" @operation_end="operation_end"></slider>
                </el-form-item>
                <el-form-item label="线条颜色">
                    <color-picker v-model="form.line_color" @operation_end="operation_end"></color-picker>
                </el-form-item>
                <!-- <el-form-item label="是否置底">
                    <el-switch v-model="form.bottom_up" active-value="1" inactive-value="0" />
                </el-form-item> -->
            </card-container>
            <div class="bg-f5 divider-line" />
            <condition-config :value="form" :options="options" @operation_end="operation_end"></condition-config>
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
});
// 默认值
const state = reactive({
    diy_data: props.value
});
// 如果需要解构，确保使用toRefs
const { diy_data } = toRefs(state);
const form = ref(diy_data.value.com_data);
const center_height = defineModel("height", { type: Number, default: 0 })

// 操作结束触发的事件
const emit = defineEmits(['operation_end']);
const operation_end = () => {
    emit('operation_end', get_history_name(diy_data.value));
};

//#region 位置计算
// 监听数据变化
watch(diy_data, (val) => {
    let width = 0;
    let height = 0;
    if (form.value.line_settings === 'horizontal') {
        width = form.value.line_width;
        height = form.value.line_size + 10;
    } else {
        width = form.value.line_size + 10;
        height = form.value.line_width;
    }

    diy_data.value.location.x = location_compute(width, val.location.x, 390);
    diy_data.value.location.y = location_compute(height, val.location.y, center_height.value);

    diy_data.value.location.record_x = location_compute(width, val.location.record_x, 390);
    diy_data.value.location.record_y = location_compute(height, val.location.record_y, center_height.value);
    diy_data.value.location.staging_y = location_compute(height, val.location.staging_y, center_height.value);

    form.value.com_width = width;
    form.value.com_height = height;
    form.value.staging_height = height;

}, {immediate: true, deep: true});
// #endregion
</script>
<style lang="scss" scoped>
.border-style-item {
    width: 3rem;
    height: 2rem;
}
</style>
