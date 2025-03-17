<template>
    <div class="h">
        <el-form :model="form" label-width="75">
            <el-tabs v-model="tabs_name" class="content-tabs">
                <el-tab-pane label="数据样式" name="data">
                    <card-container>
                        <div class="mb-12">内容样式</div>
                        <el-form-item label="内容背景">
                            <background-common v-model:color_list="form.data_color_list" v-model:direction="form.data_direction" v-model:img_style="form.data_background_img_style" v-model:img="form.data_background_img" @mult_color_picker_event="mult_color_picker_event" />
                        </el-form-item>
                        <el-form-item label="内容标题">
                            <color-text-size-group v-model:color="form.data_title_color" v-model:typeface="form.data_title_typeface" v-model:size="form.data_title_size" default-color="#000000"></color-text-size-group>
                        </el-form-item>
                        <el-form-item label="原价符号">
                            <color-text-size-group v-model:color="form.data_price_symbol_color" v-model:size="form.data_price_symbol_size" default-color="#000000" :type-list="['color', 'size']"></color-text-size-group>
                        </el-form-item>
                        <el-form-item label="原价">
                            <color-text-size-group v-model:color="form.data_price_color" v-model:typeface="form.data_price_typeface" v-model:size="form.data_price_size" default-color="#000000"></color-text-size-group>
                        </el-form-item>
                        <el-form-item label="节省价符号">
                            <color-text-size-group v-model:color="form.data_save_price_symbol_color" v-model:size="form.data_save_price_symbol_size" default-color="#000000" :type-list="['color', 'size']"></color-text-size-group>
                        </el-form-item>
                        <el-form-item label="节省价">
                            <color-text-size-group v-model:color="form.data_save_price_color" v-model:typeface="form.data_save_price_typeface" v-model:size="form.data_save_price_size" default-color="#000000"></color-text-size-group>
                        </el-form-item>
                        <el-form-item label="外间距">
                            <margin :value="form.data_margin"></margin>
                        </el-form-item>
                        <el-form-item label="内间距">
                            <padding :value="form.data_padding"></padding>
                        </el-form-item>
                        <el-form-item label="内容圆角">
                            <radius :value="form.data_radius"></radius>
                        </el-form-item>
                        <el-form-item label="内容间距">
                            <div class="flex-col gap-10 w h">
                                <el-form-item v-if="data.host_graph_theme == '0'" label="图片标题" label-width="60" class="form-item-child-label">
                                    <slider v-model="form.data_content_spacing" :max="100"></slider>
                                </el-form-item>
                                <el-form-item label="内容商品" label-width="60" class="form-item-child-label">
                                    <slider v-model="form.data_content_bottom_spacing" :max="100"></slider>
                                </el-form-item>
                            </div>
                        </el-form-item>
                        <el-form-item label="组合间距">
                            <slider v-model="form.data_content_outer_spacing" :max="100"></slider>
                        </el-form-item>
                        <el-form-item v-if="data.host_graph_theme == '0'" label="图片宽度">
                            <slider v-model="form.data_content_img_width" :max="1000"></slider>
                        </el-form-item>
                        <el-form-item label="图片高度">
                            <slider v-model="form.data_content_img_height" :max="1000"></slider>
                        </el-form-item>
                        <el-form-item label="图片圆角">
                            <radius :value="form.data_img_radius"></radius>
                        </el-form-item>
                        <!-- 边框处理 -->
                        <border-config v-model:show="form.data_border_box.border_is_show" v-model:color="form.data_border_box.border_color" v-model:style="form.data_border_box.border_style" v-model:size="form.data_border_box.border_size"></border-config>
                        <!-- 阴影配置 -->
                        <shadow-config v-model="form.data_border_box"></shadow-config>
                    </card-container>
                    <template v-if="new_tabs.length > 0">
                        <div class="divider-line"></div>
                        <card-container>
                            <div class="mb-12">图标设置</div>
                            <el-tabs v-model="tabs_icon_name" class="content-tabs">
                                <el-tab-pane v-for="(tab, index) in new_tabs" :key="index" :label="tab.label" :name="tab.name">
                                    <img-or-icon-or-text-style :key="index" v-model:value="form[`${ tab.name }_style`]" :type="data[`${ tab.name }_type`]" :is-icon="data[`${ tab.name }_type`] == 'img-icon' && !isEmpty(data[`${ tab.name }_icon`])" />
                                </el-tab-pane>
                            </el-tabs>
                        </card-container>
                    </template>
                    <div class="divider-line"></div>
                    <card-container class="card-container">
                        <div class="mb-12">底部按钮样式</div>
                        <el-form-item label="文字">
                            <color-text-size-group v-model:color="form.bottom_button_color" v-model:typeface="form.bottom_button_typeface" v-model:size="form.bottom_button_size" default-color="#999"></color-text-size-group>
                        </el-form-item>
                        <el-form-item label="图标">
                            <color-text-size-group v-model:color="form.bottom_button_icon_color" v-model:size="form.bottom_button_icon_size" default-color="#999" :type-list="['color', 'size']"></color-text-size-group>
                        </el-form-item>
                        <el-form-item label="背景">
                            <background-common v-model:color_list="form.bottom_button_style.color_list" v-model:direction="form.bottom_button_style.direction" v-model:img_style="form.bottom_button_style.background_img_style" v-model:img="form.bottom_button_style.background_img" @mult_color_picker_event="bottom_button_mult_color_picker_event" />
                        </el-form-item>
                        <el-form-item label="外间距">
                            <margin :value="form.bottom_button_style"></margin>
                        </el-form-item>
                        <el-form-item label="内间距">
                            <padding :value="form.bottom_button_style"></padding>
                        </el-form-item>
                        <el-form-item label="圆角">
                            <radius :value="form.bottom_button_style"></radius>
                        </el-form-item>
                        <!-- 边框处理 -->
                        <border-config v-model:show="form.bottom_button_style.border_is_show" v-model:color="form.bottom_button_style.border_color" v-model:style="form.bottom_button_style.border_style" v-model:size="form.bottom_button_style.border_size"></border-config>
                        <!-- 阴影配置 -->
                        <shadow-config v-model="form.bottom_button_style"></shadow-config>
                    </card-container>
                    <div class="divider-line"></div>
                    <common-styles :value="form.common_style" @update:value="common_style_update" />
                </el-tab-pane>
                <el-tab-pane label="商品样式" name="goods">
                    <goods-index :value="props.value" :content="props.content" :default-config="props.defaultConfig"></goods-index>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from "lodash";
/**
 * @description: 组合搭配列表（样式）
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
const tabs_name = ref('data');
// 动态生成 tab 配置
const tabs = [
    { label: "详情按钮", name: "details" },
    { label: "数据优惠", name: "data_discounts" },
    { label: "商品优惠", name: "goods_discounts" },
];
// 图标数组处理一下，确保打开的都能看到
type tabs_type = { name: string; label: string;};
const new_tabs = ref<tabs_type[]>([]);
const tabs_icon_name = ref<string>('details');
onMounted(() => {
    // 判断有哪些打开的图标
    new_tabs.value = tabs.filter(item => data.value[`is_${ item.name }_show`] === '1');
    tabs_icon_name.value = new_tabs.value[0].name || '';
});
// 多商户背景渐变设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.data_color_list = arry;
    form.value.data_direction = type.toString();
};
// 底部按钮的显示逻辑
const bottom_button_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.bottom_button_style.color_list = arry;
    form.value.bottom_button_style.direction = type.toString();
};
const common_style_update = (value: any) => {
    form.value.common_style = value;
};
</script>
<style lang="scss" scoped>
</style>
