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
        <template v-if="tabs_content.data_type === 'goods'">
            <template v-if="isShowTitle">
                <el-form-item label="主标题">
                    <color-text-size-group v-model:color="form.heading_color" v-model:typeface="form.heading_typeface" v-model:size="form.heading_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item label="副标题">
                    <color-text-size-group v-model:color="form.subtitle_color" v-model:typeface="form.subtitle_typeface" v-model:size="form.subtitle_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
            </template>
            <el-form-item label="内间距">
                <padding :key="form.carouselKey" :value="form.chunk_padding" @update:value="chunk_padding_change"></padding>
            </el-form-item>
        </template>
    </card-container>
    <div class="bg-f5 divider-line" />
    <card-container>
        <div class="mb-12">商品样式</div>
        <el-form-item label="商品名称">
            <color-text-size-group v-model:color="form.shop_title_color" v-model:typeface="form.shop_title_typeface" v-model:size="form.shop_title_size" default-color="#000000"></color-text-size-group>
        </el-form-item>
        <el-form-item label="商品价格">
            <color-text-size-group v-model:color="form.shop_price_color" v-model:typeface="form.shop_price_typeface" v-model:size="form.shop_price_size" default-color="#000000"></color-text-size-group>
        </el-form-item>
    </card-container>
    <div class="bg-f5 divider-line" />
    <card-container>
        <carousel-indicator :key="form.carouselKey" :value="form"></carousel-indicator>
    </card-container>
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
    },
    isShowTitle: {
        type: Boolean,
        default: true,
    },
});

const form = ref(props.value);
const tabs_content = ref(props.content);

const mult_color_picker_event = (arry: string[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type.toString();
};
const chunk_padding_change = (padding: any) => {
    form.value.chunk_padding = Object.assign(form.value.chunk_padding, pick(padding, ['padding', 'padding_top', 'padding_bottom', 'padding_left', 'padding_right']));
};

watchEffect(() => {
    form.value = props.value;
    tabs_content.value = props.content;
});
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>
