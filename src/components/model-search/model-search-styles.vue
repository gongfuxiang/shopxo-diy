<template>
    <div>
        <el-form :model="form" label-width="70">
            <template v-if="search_content.is_icon_show == '1'">
                <card-container>
                    <div class="mb-12">左侧图标</div>
                    <el-form-item label="图标">
                        <color-picker v-model="form.icon_color" default-color="#CCCCCC"></color-picker>
                    </el-form-item>
                </card-container>
                <div class="bg-f5 divider-line" />
            </template>
            <template v-if="search_content.is_search_show == '1'">
                <card-container>
                    <div class="mb-12">搜索按钮</div>
                    <el-form-item label="按钮文字">
                        <color-picker v-model="form.button_inner_color" default-color="#fff"></color-picker>
                    </el-form-item>
                    <el-form-item v-if="content.search_type != 'img'" label="背景设置">
                        <background-common v-model:color_list="form.search_botton_color_list" v-model:direction="form.search_botton_direction" v-model:img_style="form.search_botton_background_img_style" v-model:img="form.search_botton_background_img" @mult_color_picker_event="mult_color_picker_event" />
                    </el-form-item>
                    <el-form-item label="按钮圆角">
                        <radius :value="form.search_button_radius" @update:value="button_radius_change"></radius>
                    </el-form-item>
                </card-container>
                <div class="bg-f5 divider-line" />
            </template>
            <card-container>
                <div class="mb-12">框体样式</div>
                <el-form-item v-if="search_content.is_tips_show" label="提示文字">
                    <color-picker v-model="form.tips_color" default-color="#CCCCCC"></color-picker>
                </el-form-item>
                <template v-if="search_content.is_center != '1'">
                    <el-form-item label="左内边距">
                        <slider v-model="form.search_padding_left" :min="0" :max="200"></slider>
                    </el-form-item>
                </template>
                <el-form-item label="搜索框线">
                    <color-picker v-model="form.search_border" default-color="#fff"></color-picker>
                </el-form-item>
                <el-form-item label="搜索背景">
                    <color-picker v-model="form.search_bg_color" default-color="#fff"></color-picker>
                </el-form-item>
                <el-form-item label="框体圆角">
                    <radius :value="form.search_border_radius" @update:value="border_radius_change"></radius>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">热词设置</div>
                <el-form-item label="热词文字">
                    <color-picker v-model="form.hot_words_color"></color-picker>
                </el-form-item>
                <el-form-item label="自动轮播">
                    <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
                </el-form-item>
                <el-form-item label="间隔时间">
                    <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                </el-form-item>
            </card-container>
        </el-form>
        <template v-if="isShowCommon">
            <div class="bg-f5 divider-line" />
            <common-styles :value="form.common_style" @update:value="common_styles_update" />
        </template>
    </div>
</template>
<script setup lang="ts">
import { isEmpty, pick } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: Object,
        default: () => ({}),
    },
    isShowCommon: {
        type: Boolean,
        default: true,
    },
});

const state = reactive({
    form: props.value,
    search_content: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, search_content } = toRefs(state);

// 监听整个form对象,发生变化的时候触发emit
const emit = defineEmits(['update:value']);

const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};

// 按钮圆角
const button_radius_change = (radius: any) => {
    form.value.search_button_radius = Object.assign(form.value.search_button_radius, pick(radius, ['radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right']));
};
// 搜索框圆角
const border_radius_change = (radius: any) => {
    form.value.search_border_radius = Object.assign(form.value.search_border_radius, pick(radius, ['radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right']));
};

const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.search_botton_color_list = arry;
    form.value.search_botton_direction = type.toString();
};
</script>
<style lang="scss" scoped>
.auxiliary-line {
    width: 100%;
}
</style>
