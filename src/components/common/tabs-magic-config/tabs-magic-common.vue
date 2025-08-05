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
    <div class="divider-line"></div>
    <card-container class="card-container">
        <div class="mb-12">通用样式</div>
        <el-form-item label="是否启用">
            <el-switch v-model="form.magic_common.is_show" active-value="1" inactive-value="0"></el-switch>
            <el-tooltip content="启用则覆盖选项卡魔方->样式->通用样式"></el-tooltip>
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

// 魔方内容背景渐变设置
const magic_content_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.magic_content.color_list = arry;
    form.value.magic_content.direction = type.toString();
};
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

