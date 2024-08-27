<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <card-container class="mb-8">
                <div class="mb-12">选项卡样式</div>
                <el-form-item label="选中装饰">
                    <mult-color-picker :value="form.tabs_checked" :type="form.tabs_direction" @update:value="tabs_checked_event"></mult-color-picker>
                </el-form-item>
                <el-form-item label="选中文字">
                    <color-text-size-group v-model:color="form.tabs_color_checked" v-model:typeface="form.tabs_weight_checked" v-model:size="form.tabs_size_checked" default-color="rgba(51,51,51,1)"></color-text-size-group>
                </el-form-item>
                <el-form-item label="未选文字">
                    <color-text-size-group v-model:color="form.tabs_color" v-model:typeface="form.tabs_weight" v-model:size="form.tabs_size" default-color="rgba(51,51,51,1)"></color-text-size-group>
                </el-form-item>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">内容样式</div>
                <el-form-item label="商品名称">
                    <color-text-size-group v-model:color="form.shop_title_color" v-model:typeface="form.shop_title_typeface" v-model:size="form.shop_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item label="商品价格">
                    <color-text-size-group v-model:color="form.shop_price_color" v-model:typeface="form.shop_price_typeface" v-model:size="form.shop_price_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <template v-if="theme != '6'">
                    <el-form-item label="已售数量">
                        <color-text-size-group v-model:color="form.shop_sold_number_color" v-model:typeface="form.shop_sold_number_typeface" v-model:size="form.shop_sold_number_size" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                </template>
                <el-form-item label="内容圆角">
                    <radius :value="form.shop_radius" @update:value="shop_radius_change"></radius>
                </el-form-item>
                <template v-if="theme != '6'">
                    <el-form-item label="图片圆角">
                        <radius :value="form.shop_img_radius" @update:value="img_radius_change"></radius>
                    </el-form-item>
                    <el-form-item label="内间距">
                        <padding :value="form.shop_padding" @update:value="shop_padding_change"></padding>
                    </el-form-item>
                    <el-form-item v-if="['0', '4'].includes(theme)" label="内容间距">
                        <slider v-model="form.content_spacing" :max="100"></slider>
                    </el-form-item>
                    <el-form-item label="商品间距">
                        <slider v-model="form.content_outer_spacing" :max="100"></slider>
                    </el-form-item>
                    <template v-if="theme == '5'">
                        <el-form-item label="内容宽度">
                            <slider v-model="form.content_outer_width" :max="1000"></slider>
                        </el-form-item>
                        <el-form-item label="内容高度">
                            <slider v-model="form.content_outer_height" :max="1000"></slider>
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
            <card-container class="mb-8">
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
                        <color-text-size-group v-model:color="form.shop_icon_color" v-model:size="form.shop_icon_size" default-color="#fff" :type-list="['color', 'size']"></color-text-size-group>
                    </el-form-item>
                </template>
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

const theme = computed(() => data.value.theme);

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
