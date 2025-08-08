<template>
    <card-container class="card-container">
        <el-form-item label="是否启用">
            <div class="flex-row gap-10">
                <el-switch v-model="form.magic_common.is_show" active-value="1" inactive-value="0"></el-switch>
                <tooltip content="启用则覆盖选项卡魔方->样式->通用样式"></tooltip>
            </div>
        </el-form-item>
        <template v-if="form.magic_common.is_show == '1'">
            <el-form-item label="内容背景">
                <background-common v-model:color_list="form.magic_common.color_list" v-model:direction="form.magic_common.direction" v-model:img_style="form.magic_common.background_img_style" v-model:img="form.magic_common.background_img" @mult_color_picker_event="magic_common_mult_color_picker_event" />
            </el-form-item>
        </template>
    </card-container>
</template>

<script lang="ts" setup>
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    }
});

// 魔方独立的内容背景设置
const magic_common_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.magic_common.color_list = arry;
    form.value.magic_common.direction = type.toString();
};

const form = ref(props.value);
watch(() => props.value, (newVal) => {
    form.value = newVal;
}, {immediate: true, deep: true});
</script>

<style scoped lang="scss">
.card-container {
    padding: 1rem !important;
}
</style>

