<template>
    <card-container>
        <div class="mb-12">内容样式</div>
        <el-form-item label="内容背景">
            <background-common v-model:color_list="form.goods_color_list" v-model:direction="form.goods_direction" v-model:img_style="form.goods_background_img_style" v-model:img="form.goods_background_img" @mult_color_picker_event="mult_color_picker_event" />
        </el-form-item>
        <el-form-item label="内容标题">
            <color-text-size-group v-model:color="form.goods_title_color" v-model:typeface="form.goods_title_typeface" v-model:size="form.goods_title_size" default-color="#000000"></color-text-size-group>
        </el-form-item>
        <el-form-item label="原价符号">
            <color-text-size-group v-model:color="form.goods_price_symbol_color" v-model:size="form.goods_price_symbol_size" default-color="#000000" :type-list="['color', 'size']"></color-text-size-group>
        </el-form-item>
        <el-form-item label="原价">
            <color-text-size-group v-model:color="form.goods_price_color" v-model:typeface="form.goods_price_typeface" v-model:size="form.goods_price_size" default-color="#000000"></color-text-size-group>
        </el-form-item>
        <el-form-item label="节省价符号">
            <color-text-size-group v-model:color="form.goods_save_price_symbol_color" v-model:size="form.goods_save_price_symbol_size" default-color="#000000" :type-list="['color', 'size']"></color-text-size-group>
        </el-form-item>
        <el-form-item label="节省价">
            <color-text-size-group v-model:color="form.goods_save_price_color" v-model:typeface="form.goods_save_price_typeface" v-model:size="form.goods_save_price_size" default-color="#000000"></color-text-size-group>
        </el-form-item>
        <el-form-item label="外间距">
            <margin :value="form.goods_margin"></margin>
        </el-form-item>
        <el-form-item label="内间距">
            <padding :value="form.goods_padding"></padding>
        </el-form-item>
        <el-form-item label="内容圆角">
            <radius :value="form.goods_radius"></radius>
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
            <radius :value="form.goods_img_radius"></radius>
        </el-form-item>
        <!-- 边框处理 -->
        <border-config v-model:show="form.goods_border_is_show" v-model:color="form.goods_border_color" v-model:style="form.goods_border_style" v-model:size="form.goods_border_size"></border-config>
        <!-- 阴影配置 -->
        <shadow-config v-model="form"></shadow-config>
    </card-container>
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
</template>

<script lang="ts" setup>
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
const theme = computed(() => data.value.theme);
if (['0', '4'].includes(theme.value)) {
    if (form.value.goods_img_radius.radius == props.defaultConfig.img_radius_0 || (form.value.goods_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && form.value.goods_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && form.value.goods_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && form.value.goods_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
        form.value.goods_img_radius.radius = props.defaultConfig.img_radius_0;
        form.value.goods_img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
        form.value.goods_img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
        form.value.goods_img_radius.radius_top_left = props.defaultConfig.img_radius_0;
        form.value.goods_img_radius.radius_top_right = props.defaultConfig.img_radius_0;
    }
} else {
    if (form.value.goods_img_radius.radius == props.defaultConfig.img_radius_0 || (form.value.goods_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && form.value.goods_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && form.value.goods_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && form.value.goods_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
        form.value.goods_img_radius.radius = props.defaultConfig.img_radius_1;
        form.value.goods_img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
        form.value.goods_img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
        form.value.goods_img_radius.radius_top_left = props.defaultConfig.img_radius_1;
        form.value.goods_img_radius.radius_top_right = props.defaultConfig.img_radius_1;
    }
}
// 多商户背景渐变设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.goods_color_list = arry;
    form.value.goods_direction = type.toString();
};
</script>