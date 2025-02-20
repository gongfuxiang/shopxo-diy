<template>
    <card-container>
        <div class="mb-12">定位设置</div>
        <el-form-item label="跟随组件">
            <el-select v-model="data_follow.follow_id" value-key="id" clearable filterable placeholder="请选择跟随的组件" size="default" class="flex-1" @change="follow_id_change()">
                <el-option v-for="item in options.filter(item => item.type == 'images')" :key="item.field" :label="item.name" :value="item.field" />
            </el-select>
        </el-form-item>
        <template v-if="data_follow.follow_id != ''">
            <el-form-item label="跟随方式">
                <el-radio-group v-model="data_follow.follow_type" @change="operation_end">
                    <el-radio value="none">无</el-radio>
                    <el-radio value="left">跟随左侧</el-radio>
                    <el-radio value="top">跟随上边</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="跟随间距">
                <slider v-model="data_follow.follow_spacing" :max="390" @operation_end="operation_end"></slider>
            </el-form-item>
        </template>
        <el-form-item v-if="data_follow.follow_type != 'left'" label="X轴">
            <slider v-model="data_location.x" :max="390" @operation_end="operation_end"></slider>
        </el-form-item>
        <el-form-item v-if="data_follow.follow_type != 'top'" label="Y轴">
            <slider v-model="data_location.y" :max="1000" @operation_end="operation_end"></slider>
        </el-form-item>
    </card-container>
</template>

<script lang="ts" setup>
const props = defineProps({
    options: {
        type: Array<any>,
        default: () => [],
    },
});
// 跟随内容
const data_follow = defineModel('follow', { type: Object, default: { follow_type: 'none', follow_id: '', follow_spacing: 0 }});
// x轴 Y轴设计
const data_location = defineModel({ type: Object, default: () => ({ x: 0, y: 0, staging_y: 0 }) });
const emit = defineEmits(['operation_end']);
// 失去焦点时触发事件
const operation_end = () => {
    emit('operation_end');
};
// 跟随id发生变化时的处理
const follow_id_change = () => {

}
// 监听y轴
watch(() => data_location.value.y, (val) => {
    if (val !== data_location.value.staging_y) {
        data_location.value.staging_y = val;
    }
});
</script>