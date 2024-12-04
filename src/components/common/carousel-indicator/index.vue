<template>
    <div class="mb-12">指示器设置</div>
    <el-form-item label="是否显示">
        <el-switch v-model="form.is_show" active-value="1" inactive-value="0"/>
    </el-form-item>
    <template v-if="form.is_show == '1'">
        <el-form-item label="位置">
            <el-radio-group v-model="form.indicator_new_location">
                <el-radio value="top">上</el-radio>
                <el-radio value="bottom">下</el-radio>
                <el-radio value="left">左</el-radio>
                <el-radio value="right">右</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="对齐方式">
            <el-radio-group v-model="form.indicator_location">
                <el-radio value="flex-start">{{ ['left', 'right'].includes(form.indicator_new_location) ? '上' : '左' }}对齐</el-radio>
                <el-radio value="center">居中</el-radio>
                <el-radio value="flex-end">{{ ['left', 'right'].includes(form.indicator_new_location) ? '下' : '右' }}对齐</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="样式">
            <el-radio-group v-model="form.indicator_style" is-button>
                <el-tooltip content="点" placement="top" effect="dark">
                    <el-radio-button value="dot"><icon name="iconfont icon-ellipsis"></icon></el-radio-button>
                </el-tooltip>
                <el-tooltip content="线" placement="top" effect="dark">
                    <el-radio-button value="elliptic"><icon name="iconfont icon-elliptic"></icon></el-radio-button>
                </el-tooltip>
                <el-tooltip content="数字" placement="top" effect="dark">
                    <el-radio-button value="num">1/5</el-radio-button>
                </el-tooltip>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="色值">
            <div class="flex-col gap-20">
                <div class="flex-row gap-20"><span class="size-12 cr-9">选中样式</span><color-picker v-model="form.actived_color" default-color="#2A94FF" @update:value="color_picker_change($event, 'actived_color')"></color-picker></div>
                <div class="flex-row gap-20"><span class="size-12 cr-9">常规样式</span><color-picker v-model="form.color" default-color="#DDDDDD" @update:value="color_picker_change($event, 'color')"></color-picker></div>
            </div>
        </el-form-item>
        <el-form-item label="大小">
            <slider v-model="form.indicator_size" :max="100"></slider>
        </el-form-item>
        <el-form-item v-if="isIndicatorBottom" label="边距">
            <slider v-model="form.indicator_bottom" :min="0" :max="100"></slider>
        </el-form-item>
        <el-form-item v-if="form.indicator_style != 'num'" label="圆角">
            <radius :value="form.indicator_radius" @update:value="indicator_radius_change"></radius>
        </el-form-item>
    </template>
</template>
<script setup lang="ts">
import { pick } from 'lodash';
// interface indicator {
//     is_show: boolean;
//     indicator_style: string;
//     indicator_location: string;
//     indicator_size: number;
//     indicator_radius: radiusStyle;
//     actived_color: string;
//     color: string;
// }
// interface Props {
//     value: indicator;
// }
// const props = defineProps<Props>();
const props = defineProps({
    value: {
        type: Object,
        default: () => {}
    },
    isIndicatorBottom: {
        type: Boolean,
        default: true
    }
})

const state = reactive({
    form: props.value
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);
const color_picker_change = (color: string, type: string) => {
    if (type === 'actived_color') {
        form.value.actived_color = color;
    } else {
        form.value.color = color;
    }
};
// 指示器圆角
const indicator_radius_change = (radius: radiusStyle) => {
    form.value.indicator_radius = Object.assign(form.value.indicator_radius, pick(radius, [
        'radius',
        'radius_top_left',
        'radius_top_right',
        'radius_bottom_left',
        'radius_bottom_right',
    ]));
}
</script>