<template>
    <div class="h">
        <el-form :model="form" label-width="75">
            <card-container>
                <div class="mb-12">选项卡样式</div>
                <el-form-item label="选中装饰">
                    <el-radio-group v-if="data.tabs_theme == '0'" v-model="form.tabs_one_theme">
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
                <el-form-item v-if="['4'].includes(data.tabs_theme)" label="标题上图">
                    <div class="flex-col gap-10 w">
                        <el-form-item label="圆角" label-width="40">
                            <radius :value="form.tabs_top_img_radius"></radius>
                        </el-form-item>
                        <el-form-item label="高度" label-width="40">
                            <slider v-model="form.tabs_top_img_height" :max="200"></slider>
                        </el-form-item>
                    </div>
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
                <el-form-item label="外间距">
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
                    <background-common v-model:color_list="form.ask_color_list" v-model:direction="form.ask_direction" v-model:img_style="form.ask_background_img_style" v-model:img="form.ask_background_img" @mult_color_picker_event="mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="内容标题">
                    <color-text-size-group v-model:color="form.ask_title_color" v-model:typeface="form.ask_title_typeface" v-model:size="form.ask_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item label="外间距">
                    <margin :value="form.ask_margin"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.ask_padding"></padding>
                </el-form-item>
                <el-form-item label="内容圆角">
                    <radius :value="form.ask_radius"></radius>
                </el-form-item>
                <el-form-item v-if="data.theme == '0'" label="内容间距">
                    <slider v-model="form.content_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="问答间距">
                    <slider v-model="form.content_outer_spacing" :max="100"></slider>
                </el-form-item>
                <template v-if="theme == '2'">
                    <el-form-item label="内容高度">
                        <slider v-model="form.content_outer_height" :max="1000"></slider>
                    </el-form-item>
                </template>
                <!-- 边框处理 -->
                <border-config v-model:show="form.border_is_show" v-model:color="form.border_color" v-model:style="form.border_style" v-model:size="form.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form"></shadow-config>
            </card-container>
            <div class="divider-line"></div>
            <el-tabs v-model="tabs_icon_name" class="content-tabs">
                <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.label" :name="tab.value">
                    <label-style :value="form[`${ tab.value }_style`]"></label-style>
                </el-tab-pane>
            </el-tabs>
            <template v-if="theme == '2'">
                <div class="divider-line"></div>
                <card-container class="card-container">
                    <div class="mb-12">轮播设置</div>
                    <el-form-item label="自动轮播">
                        <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
                    </el-form-item>
                    <template v-if="form.is_roll == '1'">
                        <el-form-item label="间隔时间">
                            <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                        </el-form-item>
                        <el-form-item label="滚动方式">
                            <el-radio-group v-model="form.rolling_fashion">
                                <el-radio value="translation">平移</el-radio>
                                <el-radio value="cut-screen">切屏</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </template>
                </card-container>
            </template>
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" @update:value="common_style_update" />
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from 'lodash'
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
});
const tabs_icon_name = ref('returned');
// 动态生成 tab 配置
const tabs = [
    { label: "已回样式", value: "returned" },
    { label: "未回样式", value: "not_replied_yet" },
];
// 默认值
const state = reactive({
    form: props.value,
    data: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
const theme = computed(() => data.value.theme);
// 选项卡背景渐变设置
const tabs_bg_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.tabs_bg_color_list = arry;
    form.value.tabs_bg_direction = type.toString();
};
const tabs_checked_event = (arry: string[], type: number) => {
    form.value.tabs_checked = arry;
    form.value.tabs_direction = type.toString();
};
// 多商户背景渐变设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.ask_color_list = arry;
    form.value.ask_direction = type.toString();
};
const common_style_update = (value: any) => {
    form.value.common_style = value;
};
</script>
<style lang="scss" scoped>
</style>
