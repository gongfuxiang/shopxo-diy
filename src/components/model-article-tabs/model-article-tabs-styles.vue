<template>
    <div class="styles">
        <el-form :model="form" label-width="74">
            <card-container>
                <div class="mb-12">选项卡样式</div>
                <el-form-item label="选中装饰">
                    <el-radio-group v-if="tabsStyle == '0'" v-model="form.tabs_one_theme">
                        <el-radio value="0">样式一</el-radio>
                        <el-radio value="1">样式二</el-radio>
                    </el-radio-group>
                    <mult-color-picker :value="form.tabs_checked" :type="form.tabs_direction" @update:value="tabs_checked_event"></mult-color-picker>
                </el-form-item>
                <el-form-item label="选中文字">
                    <color-text-size-group v-model:color="form.tabs_color_checked" v-model:typeface="form.tabs_weight_checked" v-model:size="form.tabs_size_checked" default-color="rgba(51,51,51,1)"></color-text-size-group>
                </el-form-item>
                <el-form-item label="未选文字">
                    <color-text-size-group v-model:color="form.tabs_color" v-model:typeface="form.tabs_weight" v-model:size="form.tabs_size" default-color="rgba(51,51,51,1)"></color-text-size-group>
                </el-form-item>
                <el-form-item label="上下间距">
                    <slider v-model="form.tabs_sign_spacing" :max="50"></slider>
                </el-form-item>
                <el-form-item label="左右间距">
                    <slider v-model="form.tabs_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="内边距">
                    <padding :value="form.tabs_padding"></padding>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">内容样式</div>
                <el-form-item v-if="theme != '3'" label="文章背景">
                    <div class="flex-col gap-10 w">
                        <div class="size-12">背景色</div>
                        <mult-color-picker :value="form.article_color_list" :type="form.article_direction" @update:value="mult_color_picker_event"></mult-color-picker>
                        <div class="flex-row jc-sb align-c">
                            <div class="size-12">背景图</div>
                            <bg-btn-style v-model="form.article_background_img_style"></bg-btn-style>
                        </div>
                        <upload v-model="form.article_background_img" :limit="1" @update:model-value="background_img_change"></upload>
                    </div>
                </el-form-item>
                <el-form-item label="文章名称">
                    <color-text-size-group v-model:color="form.name_color" v-model:typeface="form.name_weight" v-model:size="form.name_size"></color-text-size-group>
                </el-form-item>
                <el-form-item label="文章描述">
                    <color-text-size-group v-model:color="form.desc_color" v-model:size="form.desc_size" :type-list="['color', 'size']">
                        <el-form-item label="间距" label-width="40" class="mb-0 w form-item-child-label">
                            <slider v-model="form.name_desc_space"></slider>
                        </el-form-item>
                    </color-text-size-group>
                </el-form-item>
                <el-form-item label="日期时间">
                    <color-text-size-group v-model:color="form.time_color" v-model:typeface="form.time_weight" v-model:size="form.time_size"></color-text-size-group>
                </el-form-item>
                <el-form-item label="浏览量">
                    <color-text-size-group v-model:color="form.page_view_color" v-model:typeface="form.page_view_weight" v-model:size="form.page_view_size"></color-text-size-group>
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
                    <el-form-item label="文章间距">
                        <slider v-model="form.article_spacing"></slider>
                    </el-form-item>
                </template>
                <el-form-item label="内容圆角">
                    <radius :value="form.content_radius"></radius>
                </el-form-item>
                <template v-if="theme == '4'">
                    <el-form-item label="内容高度">
                        <slider v-model="form.article_height" :max="1000"></slider>
                    </el-form-item>
                </template>
                <template v-if="theme != '3'">
                    <el-form-item label="图片圆角">
                        <radius :value="form.img_radius"></radius>
                    </el-form-item>
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
/**
 * @description: 文章选项卡列表 （样式）
 * @param value{Object} 样式数据
 * @param content{Object} 内容数据
 * @param defaultConfig{Object} 默认配置
 * @param tabsStyle{String} 选项卡风格
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
    defaultConfig: {
        type: Object,
        default: () => ({
            // 图片不同风格下的圆角
            img_radius_0: 4,
            img_radius_1: 0,
        }),
    },
    tabsStyle: {
        type: String,
        default: '',
    },
});
// 默认值
const state = reactive({
    form: props.value,
    data: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
// 主题
const theme = computed(() => data.value.article_theme);
// 兼容旧数据
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
//  选项卡选中事件
const tabs_checked_event = (arry: string[], type: number) => {
    form.value.tabs_checked = arry;
    form.value.tabs_direction = type.toString();
};
// 文章背景渐变设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.article_color_list = arry;
    form.value.article_direction = type.toString();
};
// 文章背景图片设置
const background_img_change = (arry: uploadList[]) => {
    form.value.article_background_img = arry;
};

// 通用样式回调
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
}
</style>
