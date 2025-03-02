<template>
    <card-container>
        <div class="mb-12">动画设置</div>
        <el-form-item label="动画效果">
            <el-select v-model="animation_type" value-key="id" filterable placeholder="请选择动画效果" size="default" class="flex-1" @change="operation_end">
                <el-option v-for="item in animation_option" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="animation_type != 'none'" label="动画次数">
            <el-select v-model="animation_number" value-key="id" filterable placeholder="请选择动画次数" size="default" class="flex-1" @change="operation_end">
                <el-option v-for="item in animation_number_option" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
        </el-form-item>
    </card-container>
</template>

<script lang="ts" setup>
// 动画类型
const animation_type = defineModel('type', { type: String, default: 'none' });
// 动画次数
const animation_number = defineModel('number', { type: String, default: 'infinite' });
// 动画类型选项
const animation_option = [
    { name: '无', value: 'none' },
    { name: '中心放大', value: 'scale-up-center' },
    { name: '中心缩小', value: 'scale-out-center' },
    { name: '垂直放大', value: 'scale-up-ver-bottom' },
    { name: '垂直循环', value: 'scale-up-ver-bottom-alternate' },
    { name: '中心区域放大', value: 'scale-up-ver-center' },
    { name: '淡出', value: 'fade-out-fwd' },
    { name: '淡入', value: 'fade-in-bck' },
    { name: '淡入淡出', value: 'fade-in-bck-alternate' },
    { name: '文字铺开', value: 'tracking-in-expand' },
    { name: '左侧弹跳', value: 'bounce-in-left' },
    { name: '左侧滑动', value: 'slide-in-left' },
    { name: '向上弹跳', value: 'bounce-top' },
    { name: '向下弹跳', value: 'bounce-bottom' },
    { name: '向左弹跳', value: 'bounce-left' },
    { name: '向右弹跳', value: 'bounce-right' },
    { name: '中心滑动', value: 'slide-in-fwd-center' },
    { name: '左旋转', value: 'swirl-in-left-fwd' },
    { name: '模糊显示', value: 'text-focus-in' },
    { name: '心跳', value: 'heartbeat' },
    { name: '脉动', value: 'pulsate-bck' },
    { name: '翻转', value: 'flip-in-diag-2-tl' },
    { name: '摇动', value: 'shake-bottom' },
    { name: '震动', value: 'vibrate' },
    { name: '果冻', value: 'jello-horizontal' }
];
// 动画类型次数
const animation_number_option = [
    { name: '单次显示', value: 'default' },
    { name: '无限循环', value: 'infinite' }
]

// 操作结束
const emit = defineEmits(['operation_end']);
const operation_end = () => {
    emit('operation_end');
};
</script>