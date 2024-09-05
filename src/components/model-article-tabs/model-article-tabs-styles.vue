<template>
    <div class="styles">
        <el-form :model="form" label-width="74">
            <card-container>
                <div class="mb-12">选项卡样式</div>
                <el-form-item label="选中装饰">
                    <mult-color-picker :value="form.tabs_checked" :type="form.tabs_direction" @update:value="tabs_checked_event"></mult-color-picker>
                </el-form-item>
                <el-form-item label="选中文字">
                    <color-text-size-group v-model:color="form.tabs_color_checked" v-model:typeface="form.tabs_weight_checked" v-model:size="form.tabs_size_checked" default-color="rgba(51,51,51,1)"></color-text-size-group>
                </el-form-item>
                <el-form-item label="未选文字">
                    <color-text-size-group v-model:color="form.tabs_color" v-model:typeface="form.tabs_weight" v-model:size="form.tabs_size" default-color="rgba(51,51,51,1)"></color-text-size-group>
                </el-form-item>
                <el-form-item label="选项卡间距">
                    <slider v-model="form.tabs_spacing" :max="100"></slider>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">内容样式</div>
                <el-form-item label="文章名称">
                    <color-text-size-group v-model:color="form.name_color" v-model:typeface="form.name_weight" v-model:size="form.name_size"></color-text-size-group>
                </el-form-item>
                <el-form-item label="日期时间">
                    <color-text-size-group v-model:color="form.time_color" v-model:typeface="form.time_weight" v-model:size="form.time_size"></color-text-size-group>
                </el-form-item>
                <el-form-item label="浏览量">
                    <color-text-size-group v-model:color="form.page_view_color" v-model:typeface="form.page_view_weight" v-model:size="form.page_view_size"></color-text-size-group>
                </el-form-item>
                <el-form-item label="内容圆角">
                    <radius :value="form.content_radius"></radius>
                </el-form-item>
                <template v-if="theme !== '3'">
                    <el-form-item label="图片圆角">
                        <radius :value="form.img_radius"></radius>
                    </el-form-item>
                </template>
                <el-form-item label="内间距">
                    <padding :value="form.padding"></padding>
                </el-form-item>
                <template v-if="theme == '0'">
                    <el-form-item label="内容间距">
                        <slider v-model="form.content_spacing"></slider>
                    </el-form-item>
                </template>
                <template v-if="theme !== '3'">
                    <el-form-item label="文章间距">
                        <slider v-model="form.article_spacing"></slider>
                    </el-form-item>
                </template>
                <template v-if="theme == '4'">
                    <el-form-item label="内容高度">
                        <slider v-model="form.article_height" :max="1000"></slider>
                    </el-form-item>
                </template>
            </card-container>
            <template v-if="theme == '4'">
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">轮播设置</div>
                    <el-form-item label="自动轮播">
                        <el-switch v-model="form.is_roll" :active-value="1" :inactive-value="0" />
                    </el-form-item>
                    <el-form-item v-if="form.is_roll == 1" label="间隔时间">
                        <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                    </el-form-item>
                </card-container>
            </template>
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { omit } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: Object,
        default: () => ({}),
    },
    defaultConfig: {
        type: Object,
        default: () => ({
            // 图片不同风格下的圆角
            img_radius_0: 4,
            img_radius_1: 0,
        }),
    },
});
// 默认值
const state = reactive({
    form: props.value,
    data: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
const theme = computed(() => data.value.theme);
if (theme.value == '0') {
    if (form.value.img_radius.radius == props.defaultConfig.img_radius_0 || (form.value.img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && form.value.img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && form.value.img_radius.radius_top_left == props.defaultConfig.img_radius_1 && form.value.img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
        form.value.img_radius.radius = props.defaultConfig.img_radius_0;
        form.value.img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
        form.value.img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
        form.value.img_radius.radius_top_left = props.defaultConfig.img_radius_0;
        form.value.img_radius.radius_top_right = props.defaultConfig.img_radius_0;
    }
} else {
    if (form.value.img_radius.radius == props.defaultConfig.img_radius_0 || (form.value.img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && form.value.img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && form.value.img_radius.radius_top_left == props.defaultConfig.img_radius_1 && form.value.img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
        form.value.img_radius.radius = props.defaultConfig.img_radius_1;
        form.value.img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
        form.value.img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
        form.value.img_radius.radius_top_left = props.defaultConfig.img_radius_1;
        form.value.img_radius.radius_top_right = props.defaultConfig.img_radius_1;
    }
}
const font_weight = reactive([
    { name: '加粗', value: '500' },
    { name: '正常', value: '400' },
]);
const tabs_checked_event = (arry: string[], type: number) => {
    form.value.tabs_checked = arry;
    form.value.tabs_direction = type.toString();
};
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
}
</style>
