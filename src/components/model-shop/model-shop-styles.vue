<template>
    <div class="h">
        <el-form :model="form" label-width="75">
            <card-container>
                <div class="mb-12">内容样式</div>
                <el-form-item label="内容背景">
                    <background-common v-model:color_list="form.shop_color_list" v-model:direction="form.shop_direction" v-model:img_style="form.shop_background_img_style" v-model:img="form.shop_background_img" @mult_color_picker_event="mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="标题图标">
                    <div class="flex-col gap-10 w h">
                        <el-form-item label="宽度" label-width="60" class="form-item-child-label">
                            <slider v-model="form.shop_title_img_width" :max="1000"></slider>
                        </el-form-item>
                        <el-form-item label="高度" label-width="60" class="form-item-child-label">
                            <slider v-model="form.shop_title_img_height" :max="1000"></slider>
                        </el-form-item>
                        <el-form-item label="圆角" label-width="60" class="form-item-child-label">
                            <radius :value="form.shop_title_img_radius"></radius>
                        </el-form-item>
                        <el-form-item label="图标间距" label-width="60" class="form-item-child-label">
                            <slider v-model="form.shop_title_img_inner_spacing" :max="50"></slider>
                        </el-form-item>
                        <el-form-item label="标题间距" label-width="60" class="form-item-child-label">
                            <slider v-model="form.shop_title_img_outer_spacing" :max="50"></slider>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="内容标题">
                    <color-text-size-group v-model:color="form.shop_title_color" v-model:typeface="form.shop_title_typeface" v-model:size="form.shop_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item label="店铺介绍">
                    <color-text-size-group v-model:color="form.shop_desc_color" v-model:typeface="form.shop_desc_typeface" v-model:size="form.shop_desc_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item label="外间距">
                    <margin :value="form.shop_margin"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.shop_padding"></padding>
                </el-form-item>
                <el-form-item label="内容圆角">
                    <radius :value="form.shop_radius"></radius>
                </el-form-item>
                <el-form-item v-if="data.theme == '0'" label="内容间距">
                    <slider v-model="form.content_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="商户间距">
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
                    <radius :value="form.shop_img_radius"></radius>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.border_is_show" v-model:color="form.border_color" v-model:style="form.border_style" v-model:size="form.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form"></shadow-config>
            </card-container>
            <template v-if="data.is_right_show == '1' && theme == '0'">
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">图标设置</div>
                    <img-or-icon-or-text-style v-model:value="form.right_style" :type="data.right_type" :is-icon="data.right_type == 'img-icon' && !isEmpty(data.right_icon)" />
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
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" @update:value="common_style_update" />
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from "lodash";
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
    if (form.value.shop_img_radius.radius == props.defaultConfig.img_radius_0 || (form.value.shop_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
        form.value.shop_img_radius.radius = props.defaultConfig.img_radius_0;
        form.value.shop_img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
        form.value.shop_img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
        form.value.shop_img_radius.radius_top_left = props.defaultConfig.img_radius_0;
        form.value.shop_img_radius.radius_top_right = props.defaultConfig.img_radius_0;
    }
} else {
    if (form.value.shop_img_radius.radius == props.defaultConfig.img_radius_0 || (form.value.shop_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
        form.value.shop_img_radius.radius = props.defaultConfig.img_radius_1;
        form.value.shop_img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
        form.value.shop_img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
        form.value.shop_img_radius.radius_top_left = props.defaultConfig.img_radius_1;
        form.value.shop_img_radius.radius_top_right = props.defaultConfig.img_radius_1;
    }
}

// 多商户背景渐变设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.shop_color_list = arry;
    form.value.shop_direction = type.toString();
};
const common_style_update = (value: any) => {
    form.value.common_style = value;
};
</script>
<style lang="scss" scoped>
</style>
