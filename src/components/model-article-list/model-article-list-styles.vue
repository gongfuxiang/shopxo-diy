<template>
    <div class="styles">
        <el-form :model="form" label-width="70">
            <card-container class="mb-8">
                <div class="mb-12">列表样式</div>
                <el-form-item label="文章名称">
                    <el-radio-group v-model="form.name_weight">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.name_size"></slider>
                </el-form-item>
                <el-form-item label="名称色值">
                    <color-picker v-model="form.name_color"></color-picker>
                </el-form-item>
                <el-form-item label="日期时间">
                    <el-radio-group v-model="form.time_weight">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.time_size"></slider>
                </el-form-item>
                <el-form-item label="日期颜色">
                    <color-picker v-model="form.time_color"></color-picker>
                </el-form-item>
                <el-form-item label="浏览量">
                    <el-radio-group v-model="form.page_view_weight">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.page_view_size"></slider>
                </el-form-item>
                <el-form-item label="浏览色值">
                    <color-picker v-model="form.page_view_color"></color-picker>
                </el-form-item>
                <el-form-item label="内容圆角">
                    <radius :value="form.content_radius"></radius>
                </el-form-item>
                <el-form-item label="图片圆角">
                    <radius :value="form.img_radius"></radius>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.padding"></padding>
                </el-form-item>
                <el-form-item label="内容间距">
                    <slider v-model="form.content_spacing"></slider>
                </el-form-item>
                <el-form-item label="文章间距">
                    <slider v-model="form.article_spacing"></slider>
                </el-form-item>
                <el-form-item v-if="article_style == '3'" label="内容宽度">
                    <slider v-model="form.article_width" :max="1000"></slider>
                </el-form-item>
            </card-container>
        </el-form>
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
    },
});
// 默认值
const state = reactive({
    form: props.value,
    data: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
const article_style = computed(() => data.value.article_style);
const emit = defineEmits(['update:value']);
const font_weight = reactive([
    { name: '加粗', value: '500' },
    { name: '正常', value: '400' },
]);
const common_style_update = (value: any) => {
    form.value.common_style = value;
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
}
</style>
