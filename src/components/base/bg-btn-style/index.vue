<template>
    <el-radio-group v-model="modelValue" is-button @change="operation_end">
        <el-tooltip v-for="item in radio_list" :key="item.value" :content="item.name" placement="top" effect="dark">
            <el-radio-button :value="item.value"><icon :name="item.icon"></icon></el-radio-button>
        </el-tooltip>
    </el-radio-group>
</template>

<script setup lang="ts">
const modelValue = defineModel({ type: String, default: '' });
const radio_list = [
    { name: '居上', value: '0', icon: 'up' },
    { name: '居下', value: '1', icon: 'down' },
    { name: '居中', value: '2', icon: 'middle' },
    { name: '平铺', value: '3', icon: 'tile' },
    { name: '铺满', value: '4', icon: 'spread-over' },
];
// 操作结束触发事件
const emit = defineEmits(['operation_end']);
const operation_end = () => {
    emit('operation_end');
};
</script>
