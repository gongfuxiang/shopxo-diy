<template>
    <div class="styles">
        <el-form :model="form" label-width="70">
            <card-container class="card-container">
                <div class="mb-12">列表样式</div>
                <el-form-item v-if="theme != '3'" label="博客背景">
                    <background-common v-model:color_list="form.blog_color_list" v-model:direction="form.blog_direction" v-model:img_style="form.blog_background_img_style" v-model:img="form.blog_background_img" @mult_color_picker_event="mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="博客名称">
                    <color-text-size-group v-model:color="form.name_color" v-model:typeface="form.name_weight" v-model:size="form.name_size" :label-width="data.theme == '4' && data.name_float == '1' ? 60 : 40">
                        <template v-if="data.theme == '4' && data.name_float == '1'">
                            <el-form-item label="背景" label-width="60" class="mb-0 w form-item-child-label">
                                <mult-color-picker :value="form.name_bg_color_list" :type="form.name_bg_direction" :is-show-alpha="true" @update:value="name_bg_mult_color_picker_event"></mult-color-picker>
                            </el-form-item>
                            <el-form-item label="外边距" label-width="60" class="mb-0 w form-item-child-label">
                                <margin :value="form.name_bg_margin"></margin>
                            </el-form-item>
                            <el-form-item label="内间距" label-width="60" class="mb-0 w form-item-child-label">
                                <padding :value="form.name_bg_padding"></padding>
                            </el-form-item>
                            <el-form-item label="圆角" label-width="60" class="mb-0 w form-item-child-label">
                                <radius :value="form.name_bg_radius"></radius>
                            </el-form-item>
                        </template>
                    </color-text-size-group>
                </el-form-item>
                <el-form-item label="博客描述">
                    <color-text-size-group v-model:color="form.desc_color" v-model:size="form.desc_size" :type-list="['color', 'size']">
                        <el-form-item label="间距" label-width="40" class="mb-0 w form-item-child-label">
                            <slider v-model="form.name_desc_space" :max="100"></slider>
                        </el-form-item>
                    </color-text-size-group>
                </el-form-item>
                <el-form-item label="日期时间">
                    <color-text-size-group v-model:color="form.time_color" v-model:typeface="form.time_weight" v-model:size="form.time_size"></color-text-size-group>
                </el-form-item>
                <el-form-item label="浏览量">
                    <color-text-size-group v-model:color="form.page_view_color" v-model:typeface="form.page_view_weight" v-model:size="form.page_view_size"></color-text-size-group>
                </el-form-item>
                <el-form-item v-if="theme != '3'" label="外间距">
                    <margin :value="form.margin"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.padding"></padding>
                </el-form-item>
                <template v-if="theme == '0'">
                    <el-form-item label="内容间距">
                        <slider v-model="form.content_spacing"></slider>
                    </el-form-item>
                </template>
                <template v-if="theme != '3'">
                    <el-form-item label="博客间距">
                        <slider v-model="form.blog_spacing"></slider>
                    </el-form-item>
                </template>
                <el-form-item label="内容圆角">
                    <radius :value="form.content_radius"></radius>
                </el-form-item>
                <template v-if="theme == '4'">
                    <el-form-item label="内容高度">
                        <slider v-model="form.blog_height" :max="1000"></slider>
                    </el-form-item>
                </template>
                <template v-if="theme != '3'">
                    <el-form-item label="图片圆角">
                        <radius :value="form.img_radius"></radius>
                    </el-form-item>
                    <!-- 边框处理 -->
                    <border-config v-model:show="form.border_is_show" v-model:color="form.border_color" v-model:style="form.border_style" v-model:size="form.border_size"></border-config>
                    <!-- 阴影配置 -->
                    <shadow-config v-model="form"></shadow-config>
                </template>
                <template v-if="!['3', '4'].includes(theme)">
                    <el-form-item v-if="['0'].includes(theme)" label="图片宽度">
                        <slider v-model="form.content_img_width" :max="1000"></slider>
                    </el-form-item>
                    <el-form-item label="图片高度">
                        <slider v-model="form.content_img_height" :max="1000"></slider>
                    </el-form-item>
                </template>
            </card-container>
            <template v-if="theme == '4'">
                <div class="divider-line data-tabs-line"></div>
                <card-container class="card-container">
                    <div class="mb-12">轮播设置</div>
                    <el-form-item label="自动轮播">
                        <el-switch v-model="form.is_roll" :active-value="1" :inactive-value="0" />
                    </el-form-item>
                    <template v-if="form.is_roll === 1">
                        <el-form-item label="间隔时间">
                            <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                        </el-form-item>
                    </template>
                    <el-form-item label="滚动方式">
                        <el-radio-group v-model="form.rolling_fashion">
                            <el-radio value="translation">平移</el-radio>
                            <el-radio value="cut-screen">切屏</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </card-container>
            </template>
            <!-- 角标 -->
            <template v-if="data.seckill_subscript_show == '1'">
                <div class="divider-line data-tabs-line"></div>
                <subscript-styles :value="form.subscript_style" :data="data"></subscript-styles>
            </template>
        </el-form>
        <template v-if="isCommonStyle">
            <div class="divider-line data-tabs-line"></div>
            <common-styles :value="form.common_style" @update:value="common_style_update" />
        </template>
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 博客列表（样式）
 * @param value{Object} 样式数据
 * @param content{Object} 内容数据
 * @param defaultConfig{Object} 默认配置
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: Object,
        default: () => ({}),
    },
    isCommonStyle: {
        type: Boolean,
        default: true,
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
// 博客背景渐变设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.blog_color_list = arry;
    form.value.blog_direction = type.toString();
};
// 博客标题浮起显示设置
const name_bg_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.name_bg_color_list = arry;
    form.value.name_bg_direction = type.toString();
};
const emit = defineEmits(['update:value']);
const common_style_update = (value: any) => {
    form.value.common_style = value;
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
}
</style>
