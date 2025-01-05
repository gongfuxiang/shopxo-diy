<template>
    <card-container>
        <div class="mb-12">条件设置</div>
        <el-form-item label="条件字段">
            <el-select v-model="form.condition.field" clearable filterable placeholder="请选择数据字段" size="default" class="flex-1" @change="operation_end">
                <el-option v-for="item in options" :key="item.field" :label="item.name" :value="item.field" />
            </el-select>
        </el-form-item>
        <el-form-item label="条件判断">
            <el-select v-model="form.condition.type" clearable filterable placeholder="请选择判断条件" size="default" class="flex-1" @change="judge_change">
                <el-option v-for="item in judge_list" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
        </el-form-item>
        <template v-if="['greater-than', 'less-than', 'equal'].includes(form.condition.type)">
            <el-form-item label="条件内容">
                <input-number v-model="form.condition.value" class="w h" @operation_end="operation_end"></input-number>
            </el-form-item>
        </template>
        <template v-else-if="['contains', 'does-not-contain'].includes(form.condition.type)">
            <el-form-item label="条件内容">
                <el-input v-model="form.condition.value" placeholder="请输入内容" @blur="operation_end" />
            </el-form-item>
        </template>
    </card-container>
</template>

<script lang="ts" setup>
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
const form = ref(props.value);

const judge_change = (val: string) => {
    if (['greater-than', 'less-than', 'equal'].includes(val)) {
        form.value.condition.value = 0;
    } else {
        form.value.condition.value = '';
    }
    operation_end();
};
// 操作结束
const emit = defineEmits(['operation_end']);
const operation_end = () => {
    emit('operation_end');
};

const judge_list = [
    { name: '为空', value: 'is-empty'},
    { name: '不为空', value: 'is-not-empty', },
    { name: '大于', value: 'greater-than' },
    { name: '小于', value: 'less-than' },
    { name: '等于', value: 'equal' },
    { name: '包含', value: 'contains' },
    { name: '不包含', value: 'does-not-contain' },
];

</script>