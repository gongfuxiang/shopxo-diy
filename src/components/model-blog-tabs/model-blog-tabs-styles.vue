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
                <!-- 装饰图标设置 -->
                <template v-if="data.tabs_theme == '3'">
                    <el-form-item v-if="!isEmpty(data.tabs_adorn_icon)" label="装饰图标">
                        <slider v-model="form.tabs_adorn_icon_size"></slider>
                    </el-form-item>
                    <el-form-item v-else label="装饰图片">
                        <div class="flex-col gap-10 w">
                            <el-form-item label="背景" label-width="40">
                                <el-switch v-model="form.is_tabs_adorn_img_background" active-value="1" inactive-value="0" />
                            </el-form-item>
                            <el-form-item label="圆角" label-width="40">
                                <radius :value="form.tabs_adorn_img_radius"></radius>
                            </el-form-item>
                            <el-form-item label="高度" label-width="40">
                                <slider v-model="form.tabs_adorn_img_height" :max="200"></slider>
                            </el-form-item>
                        </div>
                    </el-form-item>
                </template>
                <el-form-item label="选中文字">
                    <color-text-size-group v-model:color="form.tabs_color_checked" v-model:typeface="form.tabs_weight_checked" v-model:size="form.tabs_size_checked" default-color="rgba(51,51,51,1)"></color-text-size-group>
                </el-form-item>
                <el-form-item label="未选文字">
                    <color-text-size-group v-model:color="form.tabs_color" v-model:typeface="form.tabs_weight" v-model:size="form.tabs_size" default-color="rgba(51,51,51,1)"></color-text-size-group>
                </el-form-item>
                <el-form-item label="选中图标">
                    <color-text-size-group v-model:color="form.tabs_icon_color_checked" v-model:size="form.tabs_icon_size_checked" default-color="rgba(51,51,51,1)" slider-name="大小" :type-list="['color', 'size']"  />
                </el-form-item>
                <el-form-item label="未选图标">
                    <color-text-size-group v-model:color="form.tabs_icon_color" v-model:size="form.tabs_icon_size" default-color="rgba(51,51,51,1)" slider-name="大小" :type-list="['color', 'size']" />
                </el-form-item>
                <el-form-item label="图片设置">
                    <div class="flex-col gap-10 w">
                        <template v-if="['2', '4'].includes(data.tabs_theme)">
                            <el-form-item label="背景" label-width="40">
                                <el-switch v-model="form.is_tabs_img_background" active-value="1" inactive-value="0" />
                            </el-form-item>
                        </template>
                        <el-form-item label="圆角" label-width="40">
                            <radius :value="form.tabs_img_radius"></radius>
                        </el-form-item>
                        <el-form-item label="高度" label-width="40">
                            <slider v-model="form.tabs_img_height" :max="200"></slider>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="上下间距">
                    <slider v-model="form.tabs_sign_spacing" :min="-50" :max="50"></slider>
                </el-form-item>
                <el-form-item label="左右间距">
                    <slider v-model="form.tabs_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="选项卡背景">
                    <background-common v-model:color_list="form.tabs_bg_color_list" v-model:direction="form.tabs_bg_direction" v-model:img_style="form.tabs_bg_background_img_style" v-model:img="form.tabs_bg_background_img" @mult_color_picker_event="tabs_bg_mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.tabs_radius"></radius>
                </el-form-item>
                <el-form-item label="外边距">
                    <margin :value="form.tabs_margin"></margin>
                </el-form-item>
                <el-form-item label="内边距">
                    <padding :value="form.tabs_padding"></padding>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.tabs_content.border_is_show" v-model:color="form.tabs_content.border_color" v-model:style="form.tabs_content.border_style" v-model:size="form.tabs_content.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.tabs_content"></shadow-config>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">内容样式</div>
                <el-form-item label="内容背景">
                    <background-common v-model:color_list="form.blog_content_color_list" v-model:direction="form.blog_content_direction" v-model:img_style="form.blog_content_background_img_style" v-model:img="form.blog_content_background_img" @mult_color_picker_event="blog_content_mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.blog_content_radius"></radius>
                </el-form-item>
                <el-form-item label="外间距">
                    <margin :value="form.blog_content_margin"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.blog_content_padding"></padding>
                </el-form-item>
                <el-form-item label="数据间距">
                    <slider v-model="form.blog_content_spacing" :max="100"></slider>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.blog_content.border_is_show" v-model:color="form.blog_content.border_color" v-model:style="form.blog_content.border_style" v-model:size="form.blog_content.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.blog_content"></shadow-config>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">博客样式</div>
                <el-form-item v-if="theme != '3'" label="博客背景">
                    <background-common v-model:color_list="form.blog_color_list" v-model:direction="form.blog_direction" v-model:img_style="form.blog_background_img_style" v-model:img="form.blog_background_img" @mult_color_picker_event="mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="博客名称">
                    <color-text-size-group v-model:color="form.name_color" v-model:typeface="form.name_weight" v-model:size="form.name_size" :label-width="data.blog_theme == '4' && data.name_float == '1' ? 60 : 40">
                        <template v-if="data.blog_theme == '4' && data.name_float == '1'">
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
                <template v-if="theme != '3'">
                    <el-form-item label="外间距">
                        <margin :value="form.margin"></margin>
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
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">轮播设置</div>
                    <el-form-item label="自动轮播">
                        <el-switch v-model="form.is_roll" :active-value="1" :inactive-value="0" />
                    </el-form-item>
                    <template v-if="form.is_roll == 1">
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
            <!-- 秒杀角标 -->
            <template v-if="data.seckill_subscript_show == '1'">
                <div class="divider-line"></div>
                <subscript-styles :value="form.subscript_style" :data="data"></subscript-styles>
            </template>
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from 'lodash'
/**
 * @description: 博客选项卡列表 （样式）
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
const theme = computed(() => data.value.blog_theme);
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
// 选项卡背景渐变设置
const tabs_bg_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.tabs_bg_color_list = arry;
    form.value.tabs_bg_direction = type.toString();
};

// 内容区域背景渐变设置
const blog_content_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.blog_content_color_list = arry;
    form.value.blog_content_direction = type.toString();
};
// 博客背景渐变设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.blog_color_list = arry;
    form.value.blog_direction = type.toString();
};
// 通用样式回调
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
// 博客标题浮起显示设置
const name_bg_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.name_bg_color_list = arry;
    form.value.name_bg_direction = type.toString();
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
}
</style>
