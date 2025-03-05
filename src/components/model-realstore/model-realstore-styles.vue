<template>
    <div class="h">
        <el-form :model="form" label-width="75">
            <card-container>
                <div class="mb-12">内容样式</div>
                <el-form-item label="内容背景">
                    <background-common v-model:color_list="form.realstore_color_list" v-model:direction="form.realstore_direction" v-model:img_style="form.realstore_background_img_style" v-model:img="form.realstore_background_img" @mult_color_picker_event="mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="内容标题">
                    <color-text-size-group v-model:color="form.realstore_title_color" v-model:typeface="form.realstore_title_typeface" v-model:size="form.realstore_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item label="地址">
                    <color-text-size-group v-model:color="form.realstore_location_color" v-model:typeface="form.realstore_location_typeface" v-model:size="form.realstore_location_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item label="营业状态">
                    <div class="flex-col gap-10">
                        <el-form-item label="默认颜色">
                            <color-picker v-model="form.realstore_state_color" default-color="#000000"></color-picker>
                        </el-form-item>
                        <el-form-item label="营业中颜色">
                            <color-picker v-model="form.realstore_state_color" default-color="#000000"></color-picker>
                        </el-form-item>
                        <el-form-item label="休息中颜色">
                            <el-radio-group v-model="form.realstore_state_typeface">
                                <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!-- <color-picker v-model="color" :default-color="props.defaultColor"></color-picker> -->
                        <color-text-size-group v-model:color="form.realstore_state_color" v-model:typeface="form.realstore_state_typeface" v-model:size="form.realstore_state_size" default-color="#000000"></color-text-size-group>
                    </div>
                </el-form-item>
                <template v-if="data.theme != '3'">
                    <el-form-item label="营业间距">
                        <margin :value="form.business_distance"></margin>
                    </el-form-item>
                    <el-form-item label="营业时间">
                        <color-text-size-group v-model:color="form.realstore_business_hours_color" v-model:typeface="form.realstore_business_hours_typeface" v-model:size="form.realstore_business_hours_size" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                </template>
                <el-form-item label="外间距">
                    <margin :value="form.realstore_margin"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.realstore_padding"></padding>
                </el-form-item>
                <el-form-item label="内容圆角">
                    <radius :value="form.realstore_radius"></radius>
                </el-form-item>
                <el-form-item v-if="data.theme == '0'" label="内容间距">
                    <slider v-model="form.content_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="多门店间距">
                    <slider v-model="form.content_outer_spacing" :max="100"></slider>
                </el-form-item>
                <template v-if="theme == '3'">
                    <el-form-item label="内容高度">
                        <slider v-model="form.content_outer_height" :max="1000"></slider>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item v-if="data.theme == '0'" label="图片宽度">
                        <slider v-model="form.content_img_width" :max="1000"></slider>
                    </el-form-item>
                    <el-form-item label="图片高度">
                        <slider v-model="form.content_img_height" :max="1000"></slider>
                    </el-form-item>
                </template>
                <el-form-item label="图片圆角">
                    <radius :value="form.realstore_img_radius"></radius>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.border_is_show" v-model:color="form.border_color" v-model:style="form.border_style" v-model:size="form.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form"></shadow-config>
            </card-container>
            <template v-if="new_tabs.length > 0">
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">图标设置</div>
                    <el-form-item v-if="is_phone_navigation" label="图标间距">
                        <slider v-model="form.phone_navigation_spacing" :max="100"></slider>
                    </el-form-item>
                    <el-tabs v-model="tabs_name" class="content-tabs">
                        <el-tab-pane v-for="(tab, index) in new_tabs" :key="index" :label="tab.label" :name="tab.name">
                            <icon-style :key="index" v-model:value="form[`${ tab.name }_style`]" :type="data[`${ tab.name }_type`]" :is-icon="data[`${ tab.name }_type`] == 'img-icon' && !isEmpty(data[`${ tab.name }_icon`])" />
                        </el-tab-pane>
                    </el-tabs>
                </card-container>
            </template>
            <template v-if="theme == '3'">
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
            <template v-else>
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">内边线设置</div>
                    <!-- 边框处理 -->
                    <border-config v-model:show="form.content_border_is_show" v-model:color="form.content_border_color" v-model:style="form.content_border_style" v-model:size="form.content_border_size">
                        <el-form-item label="外间距">
                            <margin :value="form.content_border_margin"></margin>
                        </el-form-item>
                    </border-config>
                </card-container>
            </template>
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" @update:value="common_style_update" />
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from "lodash";
import { font_weight } from '@/utils/common';
// 动态生成 tab 配置
const tabs = [
  { label: "导航", name: "navigation", show: ['0', '1', '2', '3']},
  { label: "时间", name: "time", show: ['0', '1', '2', '3']},
  { label: "电话", name: "phone", show: ['0', '2' ]  },
  { label: "地址", name: "location", show: ['0', '1', '2' ]}
];
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
if (['0', '4'].includes(theme.value)) {
    if (form.value.realstore_img_radius.radius == props.defaultConfig.img_radius_0 || (form.value.realstore_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && form.value.realstore_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && form.value.realstore_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && form.value.realstore_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
        form.value.realstore_img_radius.radius = props.defaultConfig.img_radius_0;
        form.value.realstore_img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
        form.value.realstore_img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
        form.value.realstore_img_radius.radius_top_left = props.defaultConfig.img_radius_0;
        form.value.realstore_img_radius.radius_top_right = props.defaultConfig.img_radius_0;
    }
} else {
    if (form.value.realstore_img_radius.radius == props.defaultConfig.img_radius_0 || (form.value.realstore_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && form.value.realstore_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && form.value.realstore_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && form.value.realstore_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
        form.value.realstore_img_radius.radius = props.defaultConfig.img_radius_1;
        form.value.realstore_img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
        form.value.realstore_img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
        form.value.realstore_img_radius.radius_top_left = props.defaultConfig.img_radius_1;
        form.value.realstore_img_radius.radius_top_right = props.defaultConfig.img_radius_1;
    }
}
const is_show = (val: { name: string, show: string[] }) => {
    return data.value[`is_${ val.name }_show`] === '1' && val.show.includes(data.value.theme);
};
// 图标数组处理一下，确保打开的都能看到
type tabs_type = { name: string; label: string;};
const new_tabs = ref<tabs_type[]>([]);
const is_phone_navigation = ref(false);
onMounted(() => {
    // 判断有哪些打开的图标
    new_tabs.value = tabs.filter(item => is_show(item));
    // 判断打开的图标中是否包含手机和导航
    is_phone_navigation.value = new_tabs.value.filter(item => item.name == 'phone' || item.name == 'navigation').length == 2;
});
const tabs_name = ref('navigation');
// 博客背景渐变设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.realstore_color_list = arry;
    form.value.realstore_direction = type.toString();
};
const emit = defineEmits(['update:value']);
const common_style_update = (value: any) => {
    form.value.common_style = value;
};
</script>
<style lang="scss" scoped>
:deep(.el-tabs.content-tabs) {
    .el-tabs__header.is-top {
        background: #fff;
        margin: 0;
        padding-top: 0rem;
    }
    .el-tabs__item.is-top {
        padding: 0;
        align-items: center;
        width: 9rem;
        font-size: 1.4rem;
    }
    .el-tabs__active-bar{
        width: 100%;
    }
}
</style>
