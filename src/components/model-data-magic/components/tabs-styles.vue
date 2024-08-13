<template>
    <card-container class="mb-8">
        <el-form-item label="底部背景">
            <div class="flex-col gap-10 w">
                <div class="size-12">背景色</div>
                <mult-color-picker :value="form.user_id_color_list" :type="form.user_id_direction" @update:value="mult_color_picker_event"></mult-color-picker>
            </div>
        </el-form-item>
        <el-form-item label="主标题">
            <el-input placeholder="请输入主标题"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
            <el-input placeholder="请输入副标题"></el-input>
        </el-form-item>
    </card-container>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    }
});

// 默认值
const state = reactive({
    form: props.value
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

const mult_color_picker_event = (arry: string[], type: number) => {
    form.value.user_id_color_list = arry;
    form.value.user_id_direction = type.toString();
};
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>
