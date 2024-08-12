<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <card-container class="mb-8">
                <div class="mb-12">选项卡样式</div>
                <el-form-item label="选中装饰">
                    <mult-color-picker :value="form.tabs_checked" :type="form.tabs_direction" @update:value="tabs_checked_event"></mult-color-picker>
                </el-form-item>
                <el-form-item label="选中文字">
                    <text-size-type v-model:typeface="form.tabs_weight_checked" v-model:size="form.tabs_size_checked"></text-size-type>
                </el-form-item>
                <el-form-item label="文字色值">
                    <color-picker v-model="form.tabs_color_checked" default-color="#000000"></color-picker>
                </el-form-item>
                <el-form-item label="未选文字">
                    <text-size-type v-model:typeface="form.tabs_weight" v-model:size="form.tabs_size"></text-size-type>
                </el-form-item>
                <el-form-item label="文字色值">
                    <color-picker v-model="form.tabs_color" default-color="#000000"></color-picker>
                </el-form-item>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">内容样式</div>
                <el-form-item label="内容圆角">
                    <radius :value="form.shop_radius" @update:value="shop_radius_change"></radius>
                </el-form-item>
                <template v-if="product_style != '6'">
                    <el-form-item label="图片圆角">
                        <radius :value="form.shop_img_radius" @update:value="img_radius_change"></radius>
                    </el-form-item>
                    <el-form-item label="内间距">
                        <padding :value="form.shop_padding" @update:value="shop_padding_change"></padding>
                    </el-form-item>
                    <el-form-item v-if="['0', '4'].includes(product_style)" label="内容间距">
                        <slider v-model="form.content_spacing" :max="100"></slider>
                    </el-form-item>
                    <el-form-item v-if="product_style != '5'" label="外间距">
                        <slider v-model="form.content_outer_down_spacing" :max="100"></slider>
                    </el-form-item>
                    <el-form-item v-if="!['0', '2'].includes(product_style)" label="左右间距">
                        <slider v-model="form.content_outer_about_spacing" :max="100"></slider>
                    </el-form-item>
                    <el-form-item v-if="product_style == '5'" label="内容宽度">
                        <slider v-model="form.content_outer_width" :max="1000"></slider>
                    </el-form-item>
                </template>
                <el-form-item label="商品名称">
                    <text-size-type v-model:typeface="form.shop_title_typeface" v-model:size="form.shop_title_size"></text-size-type>
                </el-form-item>
                <el-form-item label="名称色值">
                    <color-picker v-model="form.shop_title_color" default-color="#000000"></color-picker>
                </el-form-item>
                <el-form-item label="商品价格">
                    <text-size-type v-model:typeface="form.shop_price_typeface" v-model:size="form.shop_price_size"></text-size-type>
                </el-form-item>
                <el-form-item label="价格色值">
                    <color-picker v-model="form.shop_price_color" default-color="#000000"></color-picker>
                </el-form-item>
                <el-form-item label="已售数量">
                    <text-size-type v-model:typeface="form.shop_sold_number_typeface" v-model:size="form.shop_sold_number_size"></text-size-type>
                </el-form-item>
                <el-form-item label="数量设置">
                    <color-picker v-model="form.shop_sold_number_color" default-color="#000000"></color-picker>
                </el-form-item>
                <el-form-item label="评分">
                    <text-size-type v-model:typeface="form.shop_score_typeface" v-model:size="form.shop_score_size"></text-size-type>
                </el-form-item>
                <el-form-item label="评分颜色">
                    <color-picker v-model="form.shop_score_color" default-color="#000000"></color-picker>
                </el-form-item>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">购物车按钮</div>
                <el-form-item label="按钮颜色" class="topic">
                    <flex-gradients-create :color-list="form.shop_button_color" default-color="#2a94ff"></flex-gradients-create>
                </el-form-item>
                <el-form-item label="立即购买">
                    <text-size-type v-model:typeface="form.shop_button_typeface" v-model:size="form.shop_button_size"></text-size-type>
                </el-form-item>
            </card-container>
        </el-form>
        <common-styles :value="form.common_style" @update:value="common_style_update" />
    </div>
</template>
<script setup lang="ts">
import { pick } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: Object,
        default: () => ({}),
    }
});

// 默认值
const state = reactive({
    form: props.value,
    data: props.content
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);

const product_style = computed(() => data.value.product_style);

const common_style_update = (value: any) => {
    form.value.common_style = value;
};
// 内容圆角
const shop_radius_change = (radius: any) => {
    form.value.shop_radius = Object.assign(form.value.shop_radius, pick(radius, [
        'radius',
        'radius_top_left',
        'radius_top_right',
        'radius_bottom_left',
        'radius_bottom_right',
    ]));
}

const img_radius_change = (radius: any) => {
    form.value.shop_img_radius = Object.assign(form.value.shop_img_radius, pick(radius, [
        'radius',
        'radius_top_left',
        'radius_top_right',
        'radius_bottom_left',
        'radius_bottom_right',
    ]));
}

const shop_padding_change = (padding: any) => {
    form.value.shop_padding = Object.assign(form.value.shop_padding, pick(padding, [
        'padding', 
        'padding_top', 
        'padding_bottom', 
        'padding_left', 
        'padding_right'
    ]));
}

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
