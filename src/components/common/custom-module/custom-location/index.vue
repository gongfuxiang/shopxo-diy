<template>
    <card-container>
        <div class="mb-12">定位设置</div>
        <el-form-item v-if="isFollow" label="跟随组件">
            <el-select v-model="data_follow.id" clearable filterable placeholder="请选择跟随的组件" size="default" class="flex-1" @change="data_follow_id_change">
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
import { get_container_location } from '@/utils';
import { isEmpty } from 'lodash';
const props = defineProps({
    componentOptions: {
        type: Array<any>,
        default: () => [],
    },
    isFollow: {
        type: Boolean,
        default: true
    }
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
    data_location.value.record_y = val;
    data_location.value.staging_y = val
};
// 数据源id变化时，更新记录的数据，避免出现清空之后为undefined的情况
const data_follow_id_change = (val: string) => {
    if (!isEmpty(val)) {
        data_follow.value.id = val;
    } else {
        data_follow.value.id = '';
    }
};

// 跟随id发生变化时的处理
watch(() => data_follow.value, (val) => {
    const { spacing = 0, type = 'left', id = '' } = val;
    // 获取新的位置
    const { x: new_x, y: new_y } = get_container_location(props.componentOptions, id, type, spacing, data_location.value.x, data_location.value.y);
    // 更新位置
    data_location.value = { x: new_x, y: new_y, record_x: new_x, record_y: new_y, staging_y: new_y };
}, {immediate: true, deep: true });
</script>