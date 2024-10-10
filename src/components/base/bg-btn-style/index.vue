<template>
    <el-radio-group v-model="modelValue" is-button>
        <el-tooltip v-for="item in radio_list" :key="item.value" :content="item.name" placement="top" effect="light">
            <el-radio-button :value="item.value"><icon name="spread-over"></icon></el-radio-button>
        </el-tooltip>
    </el-radio-group>
</template>

<script setup lang="ts">
const modelValue = defineModel({ type: String, default: '' });
const radio_list = [
    { name: '居上', value: '0' },
    { name: '居下', value: '1' },
    { name: '居中', value: '2' },
    { name: '平铺', value: '3' },
    { name: '铺满', value: '4' },
];
</script>
