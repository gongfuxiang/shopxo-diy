<template>
    <model-goods-list-styles :value="form" :content="data" :is-common-style="false"></model-goods-list-styles>
    <div class="divider-line data-tabs-line" />
    <card-container class="card-container">
        <div class="mb-12">内容样式</div>
        <el-form-item label="背景">
            <background-common v-model:color_list="form.data_content_style.color_list" v-model:direction="form.data_content_style.direction" v-model:img_style="form.data_content_style.background_img_style" v-model:img="form.data_content_style.background_img" @mult_color_picker_event="mult_content_color_picker_event" />
        </el-form-item>
        <el-form-item label="外间距">
            <margin :value="form.data_content_style"></margin>
        </el-form-item>
        <el-form-item label="内间距">
            <padding :value="form.data_content_style"></padding>
        </el-form-item>
        <el-form-item label="圆角">
            <radius :value="form.data_content_style"></radius>
        </el-form-item>
        <!-- 边框处理 -->
        <border-config v-model:show="form.data_content_style.border_is_show" v-model:color="form.data_content_style.border_color" v-model:style="form.data_content_style.border_style" v-model:size="form.data_content_style.border_size"></border-config>
        <!-- 阴影配置 -->
        <shadow-config v-model="form.data_content_style"></shadow-config>
    </card-container>
</template>

<script lang="ts" setup>
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: Object,
        default: () => ({}),
    },
});

const state = reactive({
    form: props.value,
    data: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);

watch(() => props.value, (value) => {
    form.value = value;
},{deep: true, immediate: true });

watch(() => props.content, (value) => {
    data.value = value;
},{deep: true, immediate: true });

// 内容样式
const mult_content_color_picker_event = (arry: color_list[], type: number) => {
    form.value.data_content_style.color_list = arry;
    form.value.data_content_style.direction = type.toString();
}
</script>