<!-- 通用样式 -->
<template>
    <card-container>
        <div class="common-styles">
            <el-form :model="form" label-width="70">
                <div class="mb-12">通用</div>
                <el-form-item label="底部背景">
                    <background-common v-if="isMultBackground" v-model:color_list="form.color_list" v-model:direction="form.direction" v-model:img_style="form.background_img_style" v-model:img="form.background_img" @mult_color_picker_event="mult_color_picker_event" />
                    <div v-else>
                        <color-picker v-model="form.color_list[0].color"></color-picker>
                    </div>
                </el-form-item>
                <el-form-item v-if="isFloatingUp" label="组件上浮">
                    <slider v-model="form.floating_up" :min="0" :max="500"></slider>
                </el-form-item>
                <el-form-item v-if="isFloatingUp" label="组件层级">
                    <slider v-model="form.module_z_index" :min="0" :max="10"></slider>
                </el-form-item>
                <el-form-item label="内边距">
                    <padding :value="form" :is-up-down="isUpDown" @update:value="padding_change"></padding>
                </el-form-item>
                <el-form-item v-if="isMargin" label="外边距">
                    <margin :value="form" @update:value="margin_change"></margin>
                </el-form-item>
                <el-form-item v-if="isRadius" label="圆角">
                    <radius :value="form" @update:value="radius_change"></radius>
                </el-form-item>
                <el-form-item v-if="isShadow" label="阴影设置">
                    <div class="flex-col gap-10 w">
                        <el-form-item label="颜色" label-width="45">
                            <color-picker v-model="form.box_shadow_color"></color-picker>
                        </el-form-item>
                        <el-form-item label="X轴" label-width="45">
                            <slider v-model="form.box_shadow_x" :min="-20" :max="20"></slider>
                        </el-form-item>
                        <el-form-item label="Y轴" label-width="45">
                            <slider v-model="form.box_shadow_y" :min="-20" :max="20"></slider>
                        </el-form-item>
                        <el-form-item label="模糊" label-width="45">
                            <slider v-model="form.box_shadow_blur"></slider>
                        </el-form-item>
                        <el-form-item label="扩展" label-width="45">
                            <slider v-model="form.box_shadow_spread"></slider>
                        </el-form-item>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </card-container>
</template>
<script setup lang="ts">
import { pick } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({
            direction: '180deg',
            background_img: [] as uploadList[],
            color_list: [{ color: '', color_percentage: undefined }] as color_list[],
            background_img_style: '0',
            floating_up: 0,
            is_bottom_up: '0',
            padding: 0,
            padding_top: 0,
            padding_bottom: 0,
            padding_left: 0,
            padding_right: 0,
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
            box_shadow_color: '',
            box_shadow_x: 0,
            box_shadow_y: 0,
            box_shadow_blur: 0,
            box_shadow_spread: 0,
        }),
    },
    isMargin: {
        type: Boolean,
        default: true,
    },
    isRadius: {
        type: Boolean,
        default: true,
    },
    isShadow: {
        type: Boolean,
        default: true,
    },
    isMultBackground: {
        type: Boolean,
        default: true,
    },
    isFloatingUp: {
        type: Boolean,
        default: true,
    },
    isUpDown: {
        type: Boolean,
        default: true,
    }
});
// value 和初始化数据合并数据
let form = ref(props.value);
const emit = defineEmits(['update:value']);

const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type.toString();
};
const background_img_style_change = (style: any) => {
    form.value.background_img_style = style;
};
const background_img_change = (arry: uploadList[]) => {
    form.value.background_img = arry;
};
const radius_change = (radius: any) => {
    form.value = Object.assign(form.value, pick(radius, ['radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right']));
};

const margin_change = (margin: any) => {
    form.value = Object.assign(form.value, pick(margin, ['margin', 'margin_top', 'margin_bottom', 'margin_left', 'margin_right']));
};

const padding_change = (padding: any) => {
    form.value = Object.assign(form.value, pick(padding, ['padding', 'padding_top', 'padding_bottom', 'padding_left', 'padding_right']));
};
</script>
<style lang="scss" scoped>
.common-styles {
    width: 100%;
}
</style>
