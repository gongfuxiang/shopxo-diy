<!-- 通用样式 -->
<template>
    <card-container>
        <div class="common-styles">
            <el-form :model="form" label-width="70">
                <div class="mb-12">通用</div>
                <el-form-item label="底部背景">
                    <background-common v-if="isMultBackground" v-model:color_list="form.color_list" v-model:direction="form.direction" v-model:img_style="form.background_img_style" v-model:img="form.background_img" @mult_color_picker_event="mult_color_picker_event" @operation_end="operation_end" />
                    <div v-else>
                        <color-picker v-model="form.color_list[0].color" @operation_end="operation_end"></color-picker>
                    </div>
                </el-form-item>
                <el-form-item v-if="isFloatingUp" label="组件上浮">
                    <slider v-model="form.floating_up" :min="0" :max="500" @operation_end="operation_end"></slider>
                </el-form-item>
                <el-form-item v-if="isFloatingUp" label="组件层级">
                    <slider v-model="form.module_z_index" :min="0" :max="10" @operation_end="operation_end"></slider>
                </el-form-item>
                <el-form-item label="内边距">
                    <padding :value="form" :is-up-down="isUpDown" @operation_end="operation_end"></padding>
                </el-form-item>
                <el-form-item v-if="isMargin" label="外边距">
                    <margin :value="form" @operation_end="operation_end"></margin>
                </el-form-item>
                <el-form-item v-if="isRadius" label="圆角">
                    <radius :value="form" @operation_end="operation_end"></radius>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-if="isShowBorder" v-model:show="form.border_is_show" v-model:color="form.border_color" v-model:style="form.border_style" v-model:size="form.border_size" @operation_end="operation_end"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-if="isShadow" v-model="form" @operation_end="operation_end"></shadow-config>
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
            border: {
                is_show: '0',
                color: '#FF3F3F',
                style: 'solid',
                size: {
                    padding: 1,
                    padding_top: 1,
                    padding_right: 1,
                    padding_bottom: 1,
                    padding_left: 1,
                },
            },
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
    },
    isShowBorder: {
        type: Boolean,
        default: true,
    },
});
// value 和初始化数据合并数据
let form = ref(props.value);
const emit = defineEmits(['update:value', 'operation_end']);

const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type.toString();
};
// 操作结束
const operation_end = () => {
    emit('operation_end');
};
</script>
<style lang="scss" scoped>
.common-styles {
    width: 100%;
}
</style>
