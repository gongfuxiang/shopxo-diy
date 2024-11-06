<template>
    <card-container class="mb-8">
        <el-form-item label="底部背景">
            <div class="flex-col gap-10 w">
                <div class="size-12">背景色</div>
                <mult-color-picker :key="form.carouselKey" :value="form.color_list" :type="form.direction" @update:value="mult_color_picker_event"></mult-color-picker>
                <div class="flex-row jc-sb align-c">
                    <div class="size-12">背景图</div>
                    <bg-btn-style v-model="form.background_img_style"></bg-btn-style>
                </div>
                <upload v-model="form.background_img" :limit="1"></upload>
            </div>
        </el-form-item>
        <template v-if="['goods', 'images'].includes(tabs_content.data_type)">
            <el-form-item label="自动轮播">
                <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
            </el-form-item>
            <template v-if="form.is_roll == '1'">
                <el-form-item label="轮播方向">
                    <el-radio-group v-model="form.rotation_direction">
                        <el-radio value="horizontal">横向</el-radio>
                        <el-radio value="vertical">纵向</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="间隔时间">
                    <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                </el-form-item>
            </template>
        </template>
        <el-form-item label="内间距">
            <padding :key="form.carouselKey" :value="form.chunk_padding" @update:value="chunk_padding_change"></padding>
        </el-form-item>
        <template v-if="tabs_content.data_type === 'goods'">
            <el-form-item label="标题间距">
                <slider v-model="form.title_gap" :min="1" :max="100"></slider>
            </el-form-item>
            <el-form-item label="标题内容间距">
                <slider v-model="form.title_data_gap" :min="1" :max="100"></slider>
            </el-form-item>
        </template>
        <el-form-item label="图片圆角">
            <radius :key="form.carouselKey" :value="form.img_radius" @update:value="img_radius_change"></radius>
        </el-form-item>
    </card-container>
    <template v-if="tabs_content.data_type === 'goods'">
        <div class="bg-f5 divider-line" />
        <card-container>
            <div class="mb-12">标题样式</div>
            <el-form-item label="主标题">
                <template v-if="tabs_content.heading_title_type == 'text'">
                    <color-text-size-group v-model:color="form.heading_color" v-model:typeface="form.heading_typeface" v-model:size="form.heading_size" default-color="#000000"></color-text-size-group>
                </template>
                <template v-else>
                    <el-form-item label="图片高度" label-width="60" class="w form-item-child-label">
                        <slider v-model="form.heading_img_height" :min="1" :max="200"></slider>
                    </el-form-item>
                </template>
            </el-form-item>
            <el-form-item label="副标题">
                <color-text-size-group v-model:color="form.subtitle_color" v-model:typeface="form.subtitle_typeface" v-model:size="form.subtitle_size" default-color="#000000"></color-text-size-group>
            </el-form-item>
            <el-form-item label="标题同行">
                <el-switch v-model="form.title_line" active-value="1" inactive-value="0" />
            </el-form-item>
        </card-container>
    </template>
    <template v-if="tabs_content.data_type === 'goods'">
        <div class="bg-f5 divider-line" />
        <card-container>
            <div class="mb-12">数据样式</div>
            <el-form-item label="背景">
                <div class="flex-col gap-10 w">
                    <div class="size-12">背景色</div>
                    <mult-color-picker :key="form.carouselKey" :value="form.data_color_list" :type="form.data_direction" @update:value="data_mult_color_picker_event"></mult-color-picker>
                    <div class="flex-row jc-sb align-c">
                        <div class="size-12">背景图</div>
                        <bg-btn-style v-model="form.data_background_img_style"></bg-btn-style>
                    </div>
                    <upload v-model="form.data_background_img" :limit="1"></upload>
                </div>
            </el-form-item>
            <el-form-item label="内间距">
                <padding :key="form.carouselKey" :value="form.data_chunk_padding" @update:value="data_chunk_padding_change"></padding>
            </el-form-item>
            <el-form-item label="圆角">
                <radius :key="form.carouselKey" :value="form.data_radius" @update:value="data_radius_change"></radius>
            </el-form-item>
            <el-form-item label="数据间距">
                <slider v-model="form.data_goods_gap" :min="0" :max="50"></slider>
            </el-form-item>
        </card-container>
    </template>
    <template v-if="tabs_content.data_type === 'goods'">
        <div class="bg-f5 divider-line" />
        <card-container>
            <div class="mb-12">商品样式</div>
            <el-form-item label="名称">
                <color-text-size-group v-model:color="form.goods_title_color" v-model:typeface="form.goods_title_typeface" v-model:size="form.goods_title_size" default-color="#000000"></color-text-size-group>
            </el-form-item>
            <el-form-item label="价格">
                <color-text-size-group v-model:color="form.goods_price_color" v-model:typeface="form.goods_price_typeface" v-model:size="form.goods_price_size" default-color="#000000"></color-text-size-group>
            </el-form-item>
            <el-form-item label="背景">
                <div class="flex-col gap-10 w">
                    <div class="size-12">背景色</div>
                    <mult-color-picker :key="form.carouselKey" :value="form.goods_color_list" :type="form.goods_direction" @update:value="goods_mult_color_picker_event"></mult-color-picker>
                    <div class="flex-row jc-sb align-c">
                        <div class="size-12">背景图</div>
                        <bg-btn-style v-model="form.goods_background_img_style"></bg-btn-style>
                    </div>
                    <upload v-model="form.goods_background_img" :limit="1"></upload>
                </div>
            </el-form-item>
            <el-form-item label="内间距">
                <padding :key="form.carouselKey" :value="form.goods_chunk_padding" @update:value="goods_chunk_padding_change"></padding>
            </el-form-item>
            <el-form-item label="圆角">
                <radius :key="form.carouselKey" :value="form.goods_radius" @update:value="goods_radius_change"></radius>
            </el-form-item>
        </card-container>
    </template>
    <template v-if="['goods', 'images'].includes(tabs_content.data_type)">
        <div class="bg-f5 divider-line" />
        <card-container>
            <carousel-indicator :key="form.carouselKey" :value="form"></carousel-indicator>
        </card-container>
    </template>
    
</template>
<script setup lang="ts">
import { pick, isEmpty, cloneDeep } from 'lodash';
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

const form = ref(props.value);
const tabs_content = ref(props.content);

const mult_color_picker_event = (arry: string[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type.toString();
};
const chunk_padding_change = (padding: paddingStyle) => {
    form.value.chunk_padding = Object.assign(form.value.chunk_padding, pick(padding, ['padding', 'padding_top', 'padding_bottom', 'padding_left', 'padding_right']));
};
// 内容圆角
const img_radius_change = (radius: radiusStyle) => {
    const data = !isEmpty(form.value.img_radius) ? form.value.img_radius : { radius: 4, radius_top_left: 4, radius_top_right: 4, radius_bottom_left: 4, radius_bottom_right: 4 };
    form.value.img_radius = Object.assign(data, pick(radius, [
        'radius',
        'radius_top_left',
        'radius_top_right',
        'radius_bottom_left',
        'radius_bottom_right',
    ]));
}
// 数据底板颜色
const data_mult_color_picker_event = (arry: string[], type: number) => {
    form.value.data_color_list = arry;
    form.value.data_direction = type.toString();
}
const data_chunk_padding_change = (padding: paddingStyle) => {
    form.value.data_chunk_padding = Object.assign(form.value.data_chunk_padding, pick(padding, ['padding', 'padding_top', 'padding_bottom', 'padding_left', 'padding_right']));
};
// 内容圆角
const data_radius_change = (radius: radiusStyle) => {
    const data = !isEmpty(form.value.data_radius) ? form.value.data_radius : { radius: 4, radius_top_left: 4, radius_top_right: 4, radius_bottom_left: 4, radius_bottom_right: 4 };
    form.value.data_radius = Object.assign(data, pick(radius, [
        'radius',
        'radius_top_left',
        'radius_top_right',
        'radius_bottom_left',
        'radius_bottom_right',
    ]));
}

// 商品底板颜色
const goods_mult_color_picker_event = (arry: string[], type: number) => {
    form.value.goods_color_list = arry;
    form.value.goods_direction = type.toString();
}
const goods_chunk_padding_change = (padding: paddingStyle) => {
    form.value.goods_chunk_padding = Object.assign(form.value.goods_chunk_padding, pick(padding, ['padding', 'padding_top', 'padding_bottom', 'padding_left', 'padding_right']));
};
// 内容圆角
const goods_radius_change = (radius: radiusStyle) => {
    const data = !isEmpty(form.value.goods_radius) ? form.value.goods_radius : { radius: 4, radius_top_left: 4, radius_top_right: 4, radius_bottom_left: 4, radius_bottom_right: 4 };
    form.value.goods_radius = Object.assign(data, pick(radius, [
        'radius',
        'radius_top_left',
        'radius_top_right',
        'radius_bottom_left',
        'radius_bottom_right',
    ]));
}

watchEffect(() => {
    form.value = props.value;
    tabs_content.value = props.content;
});
</script>
<style lang="scss" scoped></style>
