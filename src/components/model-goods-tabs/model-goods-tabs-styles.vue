<template>
    <div class="w">
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
                <el-form-item label="选项卡间距">
                    <slider v-model="form.tabs_spacing" :max="100"></slider>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">内容样式</div>
                <el-form-item label="商品名称">
                    <color-text-size-group v-model:color="form.shop_title_color" v-model:typeface="form.shop_title_typeface" v-model:size="form.shop_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item label="商品价格">
                    <color-text-size-group v-model:color="form.shop_price_color" v-model:typeface="form.shop_price_typeface" v-model:size="form.shop_price_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <template v-if="theme != '6'">
                    <el-form-item label="已售数量">
                        <color-text-size-group v-model:color="form.shop_sold_number_color" v-model:typeface="form.shop_sold_number_typeface" v-model:size="form.shop_sold_number_size" slider-name="大小" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                </template>
                <el-form-item label="内容圆角">
                    <radius :value="form.shop_radius"></radius>
                </el-form-item>
                <template v-if="theme != '6'">
                    <el-form-item v-if="['0', '4'].includes(theme)" label="内容间距">
                        <slider v-model="form.content_spacing" :max="100"></slider>
                    </el-form-item>
                    <template v-if="theme == '5'">
                        <el-form-item label="内容高度">
                            <slider v-model="form.content_outer_height" :max="1000"></slider>
                        </el-form-item>
                    </template>
                    <el-form-item label="内间距">
                        <padding :value="form.shop_padding"></padding>
                    </el-form-item>
                    <el-form-item label="商品间距">
                        <slider v-model="form.content_outer_spacing" :max="100"></slider>
                    </el-form-item>
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
                <!-- <el-form-item label="评分">
                    <text-size-group v-model:typeface="form.shop_score_typeface" v-model:size="form.shop_score_size"></text-size-group>
                </el-form-item>
                <el-form-item label="评分颜色">
                    <color-picker v-model="form.shop_score_color" default-color="#000000"></color-picker>
                </el-form-item> -->
            </card-container>
            <div class="divider-line"></div>
            <template v-if="theme == '5'">
                <card-container>
                    <div class="mb-12">轮播设置</div>
                    <el-form-item label="自动轮播">
                        <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
                    </el-form-item>
                    <el-form-item v-if="form.is_roll == '1'" label="间隔时间">
                        <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                    </el-form-item>
                </card-container>
                <div class="divider-line"></div>
            </template>
            <card-container>
                <div class="mb-12">购物车按钮</div>
                <el-form-item label="按钮颜色" class="topic">
                    <flex-gradients-create :color-list="form.shop_button_color" default-color="#2a94ff"></flex-gradients-create>
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
        </el-form>
        <div class="divider-line"></div>
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
    // 选项卡的风格
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

const tabs_checked_event = (arry: string[], type: number) => {
    form.value.tabs_checked = arry;
    form.value.tabs_direction = type.toString();
};
</script>
<style lang="scss" scoped>
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>
