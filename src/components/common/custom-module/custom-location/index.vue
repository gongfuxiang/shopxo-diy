<template>
    <card-container>
        <div class="mb-12">定位设置</div>
        <el-form-item label="跟随组件">
            <el-select v-model="data_follow.id" clearable filterable placeholder="请选择跟随的组件" size="default" class="flex-1" @change="operation_end">
                <el-option v-for="item in componentOptions" :key="item.id" :label="!isEmpty(item.new_name) ? item.new_name : item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <template v-if="data_follow.id != ''">
            <el-form-item label="跟随方式">
                <el-radio-group v-model="data_follow.type" @change="operation_end">
                    <el-radio value="left">跟随左侧</el-radio>
                    <el-radio value="top">跟随上边</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="跟随间距">
                <slider v-model="data_follow.spacing" :max="390" @operation_end="operation_end"></slider>
            </el-form-item>
        </template>
        <el-form-item v-if="(data_follow.id != '' && data_follow.type != 'left') || data_follow.id == ''" label="X轴">
            <slider v-model="data_location.x" :max="390" @operation_end="operation_end" @update:model-value="location_x_change"></slider>
        </el-form-item>
        <el-form-item v-if="(data_follow.id != '' && data_follow.type != 'top') || data_follow.id == ''" label="Y轴">
            <slider v-model="data_location.y" :max="1000" @operation_end="operation_end" @update:model-value="location_y_change"></slider>
        </el-form-item>
    </card-container>
</template>

<script lang="ts" setup>
import { isEmpty } from 'lodash';
const props = defineProps({
    componentOptions: {
        type: Array<any>,
        default: () => [],
    },
});
// 跟随内容
const data_follow = defineModel('follow', { type: Object, default: { follow_type: 'none', follow_id: '', follow_spacing: 0, is_disable_x: false, is_disable_y: false }});
// x轴 Y轴设计
const data_location = defineModel({ type: Object, default: () => ({ x: 0, y: 0, record_x: 0, record_y: 0, staging_y: 0 }) });
const emit = defineEmits(['operation_end']);
// 失去焦点时触发事件
const operation_end = () => {
    emit('operation_end');
};
// x轴变化时，更新记录的位置
const location_x_change = (val: number) => {
    data_location.value.record_x = val;
}
// y轴变化时，更新记录的位置
const location_y_change = (val: number) => { 
    console.log(val);
    data_location.value.record_y = val;
    data_location.value.staging_y = val
};

// 跟随id发生变化时的处理
watch(() => data_follow.value, (val) => {
    const { spacing = 0, type = 'left', id = '' } = data_follow.value;
    props.componentOptions.forEach((item: any) => {
        if (item.id == id) {
            const { location, com_data } = item;
            const new_x = location.x + com_data.com_width + spacing;
            const new_y = location.y + com_data.com_height + spacing;
            // // 先解除不可移动的处理 is_disable_x true 为不可移动，false为可以拖动
            // data_follow.value.is_disable_x = false;
            // data_follow.value.is_disable_y = false;
            if (type =='left') {
                data_location.value.x = new_x;
                data_location.value.record_x = new_x;
                // setTimeout(() => {
                // //     // 等赋值完成之后再放开定位处理
                //     data_follow.value.is_disable_x = true;
                //     data_follow.value.is_disable_y = false;
                // }, 0);
            } else if (type =='top') {
                data_location.value.y = new_y;
                data_location.value.record_y = new_y;
                data_location.value.staging_y = new_y
                // setTimeout(() => {
                // //     // 等赋值完成之后再添加禁止移动处理
                //     data_follow.value.is_disable_x = false;
                //     data_follow.value.is_disable_y = true;
                // }, 0);
            }
        }
    });
}, {immediate: true, deep: true });
</script>