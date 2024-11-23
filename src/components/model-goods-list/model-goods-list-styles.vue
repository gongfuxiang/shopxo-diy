<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">商品样式</div>
                <el-form-item v-if="theme != '6'" label="商品背景">
                    <div class="flex-col gap-10 w">
                        <div class="size-12">背景色</div>
                        <mult-color-picker :value="form.shop_color_list" :type="form.shop_direction" @update:value="mult_color_picker_event"></mult-color-picker>
                        <div class="flex-row jc-sb align-c">
                            <div class="size-12">背景图</div>
                            <bg-btn-style v-model="form.shop_background_img_style"></bg-btn-style>
                        </div>
                        <upload v-model="form.shop_background_img" :limit="1" @update:model-value="background_img_change"></upload>
                    </div>
                </el-form-item>
                <template v-if="data.is_show.includes('title')">
                    <el-form-item label="商品名称">
                        <color-text-size-group v-model:color="form.shop_title_color" v-model:typeface="form.shop_title_typeface" v-model:size="form.shop_title_size" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                </template>
                <template v-if="data.is_show.includes('simple_desc') && ['0', '1', '2', '3', '5'].includes(theme)">
                    <el-form-item label="商品简述">
                        <color-text-size-group v-model:color="form.shop_simple_desc_color" v-model:size="form.shop_simple_desc_size" default-color="#999" :type-list="['color', 'size']">
                            <el-form-item label="间距" label-width="40" class="mb-0 w form-item-child-label">
                                <slider v-model="form.title_simple_desc_spacing" :max="100"></slider>
                            </el-form-item>
                        </color-text-size-group>
                    </el-form-item>
                </template>
                <template v-if="data.is_show.includes('price')">
                    <el-form-item label="商品价格">
                        <color-text-size-group v-model:color="form.shop_price_color" v-model:typeface="form.shop_price_typeface" v-model:size="form.shop_price_size" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                    <el-form-item label="售价符号">
                        <color-text-size-group v-model:color="form.shop_price_symbol_color" v-model:size="form.shop_price_symbol_size" default-color="#EA3323" :type-list="['color', 'size']"></color-text-size-group>
                    </el-form-item>
                    <template v-if="data.is_show.includes('price_unit')">
                        <el-form-item label="售价单位">
                            <color-text-size-group v-model:color="form.shop_price_unit_color" v-model:size="form.shop_price_unit_size" default-color="#EA3323" :type-list="['color', 'size']"></color-text-size-group>
                        </el-form-item>
                    </template>
                </template>
                <template v-if="data.is_show.includes('original_price') && ['0', '1', '2'].includes(theme)">
                    <el-form-item label="商品原价">
                        <color-text-size-group v-model:color="form.shop_original_price_color" v-model:size="form.shop_original_price_size" default-color="#999" :type-list="['color', 'size']"></color-text-size-group>
                    </el-form-item>
                </template>
                <template v-if="data.is_show.includes('sales_count') && ['0', '1', '2'].includes(theme) ">
                    <el-form-item label="已售数量">
                        <color-text-size-group v-model:color="form.shop_sold_number_color" v-model:typeface="form.shop_sold_number_typeface" v-model:size="form.shop_sold_number_size" slider-name="大小" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                </template>
                <!-- <el-form-item label="评分">
                    <text-size-group v-model:typeface="form.shop_score_typeface" v-model:size="form.shop_score_size"></text-size-group>
                </el-form-item>
                <el-form-item label="评分颜色">
                    <color-picker v-model="form.shop_score_color" default-color="#000000"></color-picker>
                </el-form-item> -->
                <template v-if="theme != '6'">
                    <el-form-item label="内间距">
                        <padding :value="form.shop_padding"></padding>
                    </el-form-item>
                    <el-form-item v-if="['0', '4'].includes(theme)" label="内容间距">
                        <slider v-model="form.content_spacing" :max="100"></slider>
                    </el-form-item>
                    <el-form-item label="商品间距">
                        <slider v-model="form.content_outer_spacing" :max="100"></slider>
                    </el-form-item>
                </template>
                <el-form-item label="内容圆角">
                    <radius :value="form.shop_radius"></radius>
                </el-form-item>
                <template v-if="theme != '6'">
                    <template v-if="theme == '5'">
                        <el-form-item label="内容高度">
                            <slider v-model="form.content_outer_height" :max="1000"></slider>
                        </el-form-item>
                    </template>
                    <el-form-item label="图片圆角">
                        <radius :value="form.shop_img_radius"></radius>
                    </el-form-item>
                    <template v-if="!['5', '6'].includes(theme)">
                        <el-form-item v-if="['0', '4'].includes(theme)" label="图片宽度">
                            <slider v-model="form.content_img_width" :max="1000"></slider>
                        </el-form-item>
                        <el-form-item label="图片高度">
                            <slider v-model="form.content_img_height" :max="1000"></slider>
                        </el-form-item>
                    </template>
                </template>
            </card-container>
            <div class="divider-line"></div>
            <template v-if="theme == '5'">
                <card-container>
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
                <div class="divider-line"></div>
            </template>
            <!-- 秒杀角标 -->
            <template v-if="data.seckill_subscript_show == '1'">
                <subscript-styles :value="form.subscript_style" :data="data"></subscript-styles>
                <div class="divider-line"></div>
            </template>
            <template v-if="data.is_shop_show == '1'">
                <card-container>
                    <div class="mb-12">购物车按钮</div>
                    <el-form-item label="按钮颜色" class="topic">
                        <flex-gradients-create :color-list="form.shop_button_color" default-color="#FF3D53"></flex-gradients-create>
                    </el-form-item>
                    <template v-if="data.shop_type == 'text'">
                        <el-form-item label="文字设置">
                            <color-text-size-group v-model:color="form.shop_button_text_color" v-model:typeface="form.shop_button_typeface" v-model:size="form.shop_button_size" default-color="#fff"></color-text-size-group>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="图标设置">
                            <color-text-size-group v-model:color="form.shop_icon_color" v-model:size="form.shop_icon_size" slider-name="大小" default-color="#fff" :type-list="['color', 'size']"></color-text-size-group>
                        </el-form-item>
                    </template>
                </card-container>
                <div class="divider-line"></div>
            </template>
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
const common_style_update = (value: any) => {
    form.value.common_style = value;
};

// 商品背景渐变设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.shop_color_list = arry;
    form.value.shop_direction = type.toString();
};
// 商品背景图片设置
const background_img_change = (arry: uploadList[]) => {
    form.value.shop_background_img = arry;
};
</script>
<style lang="scss" scoped>
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
