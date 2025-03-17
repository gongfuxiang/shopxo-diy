<template>
    <el-form-item label="背景">
        <background-common v-model:color_list="form.color_list" v-model:direction="form.direction" v-model:img_style="form.background_img_style" v-model:img="form.background_img" @mult_color_picker_event="mult_color_picker_event" />
    </el-form-item>
    <el-form-item label="文字">
        <color-text-size-group v-model:color="form.font_color" v-model:typeface="form.font_typeface" v-model:size="form.font_size" default-color="#000000"></color-text-size-group>
    </el-form-item>
    <!-- 边框处理 -->
    <border-config v-model:show="form.border_is_show" v-model:color="form.border_color" v-model:style="form.border_style" v-model:size="form.border_size"></border-config>
</template>

<script lang="ts" setup>
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const form = ref(props.value);

const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type;
};

watch(props.value, (val) => {
    form.value = val;
}, {deep: true});
</script>