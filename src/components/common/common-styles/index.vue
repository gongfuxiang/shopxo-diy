<!-- 通用样式 -->
<template>
    <card-container>
        <div class="common-styles">
            <el-form :model="form" label-width="70">
                <div class="mb-12">通用</div>
                <el-form-item label="底部背景">
                    <div class="flex-col gap-10 w">
                        <div class="size-12">背景色</div>
                        <mult-color-picker :value="form.color_list" :type="form.direction" @update:value="mult_color_picker_event"></mult-color-picker>
                        <div class="flex-row jc-sb align-c">
                            <div class="size-12">背景图</div>
                            <el-radio-group v-model="form.background_img_style" is-button @change="background_img_style_change">
                                <el-tooltip content="单张" placement="top" effect="light">
                                    <el-radio-button value="0"><icon name="single-sheet"></icon></el-radio-button>
                                </el-tooltip>
                                <el-tooltip content="平铺" placement="top" effect="light">
                                    <el-radio-button value="1"><icon name="tile"></icon></el-radio-button>
                                </el-tooltip>
                                <el-tooltip content="铺满" placement="top" effect="light">
                                    <el-radio-button value="2"><icon name="spread-over"></icon></el-radio-button>
                                </el-tooltip>
                            </el-radio-group>
                        </div>
                        <upload v-model="form.background_img_url" :limit="1" @update:model-value="background_img_url_change"></upload>
                    </div>
                </el-form-item>
                <el-form-item label="内边距">
                    <padding :value="form" @update:value="padding_change"></padding>
                </el-form-item>
                <el-form-item label="外边距">
                    <div class="flex-col gap-10 w">
                        <slider v-model="form.margin" @update:model-value="margin_event"></slider>
                        <div class="flex-row flex-wrap gap-x-20 mt-10">
                            <div class="flex-width-half pr-10">
                                <input-number v-model="form.margin_top" icon-name="out-t" @update:model-value="mt_event"></input-number>
                            </div>
                            <div class="flex-width-half pl-10">
                                <input-number v-model="form.margin_bottom" icon-name="out-b" @update:model-value="mb_event"></input-number>
                            </div>
                            <div class="flex-width-half pr-10">
                                <input-number v-model="form.margin_left" icon-name="out-l" @update:model-value="ml_event"></input-number>
                            </div>
                            <div class="flex-width-half pl-10">
                                <input-number v-model="form.margin_right" icon-name="out-r" @update:model-value="mr_event"></input-number>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form" @update:value="radius_change"></radius>
                </el-form-item>
                <el-form-item label="阴影设置">
                    <div class="flex-col gap-10 w">
                        <el-form-item label="颜色" label-width="45">
                            <color-picker v-model="form.box_shadow_color" @update:value="box_shadow_color_event"></color-picker>
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
        default: () => ({}),
    },
});
// 初始化表单数据
const init_form = reactive({
    direction: '180deg',
    background_img_url: [] as uploadList[],
    color_list: [{ color: '', color_percentage: '' }],
    background_img_style: 2,
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
});
// value 和初始化数据合并数据
let form = reactive(Object.assign({}, init_form, props.value));
const emit = defineEmits(['update:value']);
interface color_form {
    color: string;
    color_percentage: string;
}
const mult_color_picker_event = (arry: color_form[], type: number) => {
    form.color_list = arry;
    form.direction = type.toString();
    emit('update:value', form);
};
const background_img_style_change = (style: any) => {
    form.background_img_style = style;
    emit('update:value', form);
};
const background_img_url_change = (arry: uploadList[]) => {
    form.background_img_url = arry;
    emit('update:value', form);
};

const margin_event = (val: number | undefined) => {
    form.margin_top = Number(val);
    form.margin_bottom = Number(val);
    form.margin_left = Number(val);
    form.margin_right = Number(val);
    emit('update:value', form);
};
const mt_event = (val: number | undefined) => {
    form.margin_top = Number(val);
    form.margin = 0;
    emit('update:value', form);
};
const mb_event = (val: number | undefined) => {
    form.margin_bottom = Number(val);
    form.margin = 0;
    emit('update:value', form);
};
const ml_event = (val: number | undefined) => {
    form.margin_left = Number(val);
    form.margin = 0;
    emit('update:value', form);
};
const mr_event = (val: number | undefined) => {
    form.margin_right = Number(val);
    form.margin = 0;
    emit('update:value', form);
};
const radius_change = (radius: any) => {
    form = Object.assign(form, pick(radius, ['radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right']));
    emit('update:value', form);
};

const padding_change = (padding: any) => {
    form = Object.assign(form, pick(padding, ['padding', 'padding_top', 'padding_bottom', 'padding_left', 'padding_right']));
    emit('update:value', form);
};
const box_shadow_color_event = (val: string) => {
    form.box_shadow_color = val;
    emit('update:value', form);
};
</script>
<style lang="scss" scoped>
.common-styles {
    width: 100%;
}
</style>
