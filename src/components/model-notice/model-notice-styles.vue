<template>
    <div class="common-style-height">
        <el-form :model="form" label-width="80">
            <card-container class="mb-8">
                <div class="mb-12">标题样式</div>
                <template v-if="!is_img">
                    <el-form-item label="标题文字">
                        <color-text-size-group v-model:color="form.topic_color" v-model:typeface="form.topic_typeface" v-model:size="form.topic_size" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                    <el-form-item label="标题背景" class="topic">
                        <flex-gradients-create :color-list="form.topic_color_list"></flex-gradients-create>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="图片宽度">
                        <slider v-model="form.topic_width" :max="1000"></slider>
                    </el-form-item>
                    <el-form-item label="图片高度">
                        <slider v-model="form.topic_height" :max="1000"></slider>
                    </el-form-item>
                </template>
                <el-form-item label="按钮颜色">
                    <color-picker v-model="form.button_color" default-color="#999"></color-picker>
                </el-form-item>
                <el-form-item label="内容标题">
                    <color-text-size-group v-model:color="form.news_color" v-model:typeface="form.news_typeface" v-model:size="form.news_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
            </card-container>
        </el-form>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    content: {
        type: Object,
        default: () => {},
    }
});

const state = reactive({
    form: props.value,
    substance: props.content
});
// 如果需要解构，确保使用toRefs
const { form, substance } = toRefs(state);

const is_img = computed(() => substance.value.title_type == 'img');
// 通用样式处理
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
