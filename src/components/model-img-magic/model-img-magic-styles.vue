<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">图片魔方</div>
                <el-form-item v-if="new_content.style_actived !== 10" label="图片间距">
                    <slider v-model="form.image_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="背景设置">
                    <background-common v-model:color_list="form.color_list" v-model:direction="form.direction" v-model:img_style="form.background_img_style" v-model:img="form.background_img" @mult_color_picker_event="mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="外边距">
                    <margin :value="form.margin"></margin>
                </el-form-item>
                <el-form-item label="内边距">
                    <padding :value="form.padding"></padding>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form"></radius>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.border_is_show" v-model:color="form.border_color" v-model:style="form.border_style" v-model:size="form.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form"></shadow-config>
            </card-container>
        </el-form>
        <div class="bg-f5 divider-line" />
        <common-styles :value="form.common_style" @update:value="common_style_update" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: Object,
        default: () => ({}),
    }
});

// 默认值
const state = reactive({
    form: props.value,
    new_content: props.content
});
// 如果需要解构，确保使用toRefs
const { form, new_content } = toRefs(state);

const common_style_update = (value: any) => {
    form.value.common_style = value;
};
// 内容圆角
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type.toString();
};
</script>
<style lang="scss" scoped>
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
