<template>
    <!-- 公共样式 -->
    <div class="divider-line"></div>
    <card-container class="card-container">
        <div class="mb-12">内容样式</div>
        <el-form-item label="内容背景">
            <background-common v-model:color_list="form.magic_content.color_list" v-model:direction="form.magic_content.direction" v-model:img_style="form.magic_content.background_img_style" v-model:img="form.magic_content.background_img" @mult_color_picker_event="magic_content_mult_color_picker_event" />
        </el-form-item>
        <el-form-item label="圆角">
            <radius :value="form.magic_content"></radius>
        </el-form-item>
        <el-form-item label="外间距">
            <margin :value="form.magic_content"></margin>
        </el-form-item>
        <el-form-item label="内间距">
            <padding :value="form.magic_content"></padding>
        </el-form-item>
        <!-- 边框处理 -->
        <border-config v-model:show="form.magic_content.border_is_show" v-model:color="form.magic_content.border_color" v-model:style="form.magic_content.border_style" v-model:size="form.magic_content.border_size"></border-config>
        <!-- 阴影配置 -->
        <shadow-config v-model="form.magic_content"></shadow-config>
    </card-container>
</template>

<script lang="ts" setup>
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    }
});

// 魔方内容背景渐变设置
const magic_content_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.magic_content.color_list = arry;
    form.value.magic_content.direction = type.toString();
};
const form = ref(props.value);
watch(() => props.value, (newVal) => {
    form.value = newVal;
}, {immediate: true, deep: true});
</script>

