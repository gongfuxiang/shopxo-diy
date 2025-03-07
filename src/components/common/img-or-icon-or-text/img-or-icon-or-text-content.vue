<template>
    <el-row class="w">
        <el-col :span="24"><el-switch v-model="form[`is_${ type }_show`]" active-value="1" inactive-value="0"></el-switch></el-col>
    </el-row>
    <el-row v-if="form[`is_${ type }_show`] == '1'" class="mt-10 w">
        <el-col :span="24">
            <el-radio-group v-model="form[`${ type }_type`]" class="mb-10">
                <el-radio value="img-icon">图片/图标</el-radio>
                <el-radio value="text">文字</el-radio>
            </el-radio-group>
            <template v-if="form[`${ type }_type`] === 'img-icon'">
                <upload v-model="form[`${ type }_img`]" v-model:icon-value="form[`${ type }_icon`]" is-icon :limit="1" size="50"></upload>
            </template>
            <template v-else>
                <el-input v-model="form[`${ type }_text`]" placeholder="请输入文字内容" clearable></el-input>
            </template>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    type: {
        type: String,
        default: '',
    }
});
const form = ref(props.value);
// 监听数据变化
watch(() => props.value, (new_value) => {
    form.value = new_value;
}, { deep: true, immediate: true });
</script>

<style scoped lang="scss"></style>