<template>
    <div class="styles">
        <el-form :model="form" label-width="75">
            <card-container class="mb-8">
                <div class="mb-12">优惠券样式</div>
                <el-form-item label="金额">
                    <color-picker v-model="form.price_color" :default-color="clone_form.price_color"></color-picker>
                </el-form-item>
                <el-form-item label="名称">
                    <color-picker v-model="form.name_color" :default-color="clone_form.name_color"></color-picker>
                </el-form-item>
                <template v-if="!['1', '5', '6', '7'].includes(theme)">
                    <el-form-item label="描述">
                        <color-picker v-model="form.desc_color" :default-color="clone_form.desc_color"></color-picker>
                    </el-form-item>
                </template>
                <template v-if="!['1', '2', '3', '5', '6', '7'].includes(theme)">
                    <el-form-item label="券类型颜色">
                        <color-picker v-model="form.type_color" :default-color="clone_form.type_color"></color-picker>
                    </el-form-item>
                    <el-form-item label="券类型背景">
                        <color-picker v-model="form.type_background" :default-color="clone_form.type_background"></color-picker>
                    </el-form-item>
                </template>
                <template v-if="!['1', '2', '4', '5', '6', '7'].includes(theme)">
                    <el-form-item label="数量限制">
                        <color-picker v-model="form.limit_send_count" :default-color="clone_form.limit_send_count"></color-picker>
                    </el-form-item>
                </template>
                <template v-if="!['2'].includes(theme)">
                    <el-form-item :label="(['3', '4', '6'].includes(theme) ? '外' : '') + '背景'">
                        <template v-if="!['3', '4', '6'].includes(theme)">
                            <mult-color-picker :value="form.background" :type="form.direction" @update:value="background_event"></mult-color-picker>
                        </template>
                        <template v-else>
                            <color-picker v-model="form.background[0].color" :default-color="clone_form.background[0].color"></color-picker>
                        </template>
                    </el-form-item>
                </template>
                <template v-if="!['1', '2', '5', '7'].includes(theme)">
                    <el-form-item label="内背景">
                        <mult-color-picker :value="form.background_inside" :type="form.direction_inside" @update:value="background_inside_event"></mult-color-picker>
                    </el-form-item>
                </template>
                <el-form-item label="间距">
                    <slider v-model="form.spacing"></slider>
                </el-form-item>
                <template v-if="!['3', '5', '6', '7'].includes(theme)">
                    <el-form-item label="按钮背景">
                        <mult-color-picker :value="form.btn_background" :type="form.btn_direction" @update:value="btn_background_event"></mult-color-picker>
                    </el-form-item>
                </template>
                <el-form-item label="按钮文字">
                    <color-picker v-model="form.btn_color" :default-color="clone_form.btn_color"></color-picker>
                </el-form-item>
            </card-container>
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" :is-mult-background="theme !== '7'" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    theme: {
        type: String,
        default: '1',
    },
});
const emit = defineEmits(['update:value']);
// 默认值
let form = reactive(props.value);
let clone_form = cloneDeep(props.value);

const background_event = (arry: color_list[], type: number) => {
    form.background = arry;
    form.direction = type.toString();
    emit('update:value', form);
};
const background_inside_event = (arry: color_list[], type: number) => {
    form.background_inside = arry;
    form.direction_inside = type.toString();
    emit('update:value', form);
};

const btn_background_event = (arry: color_list[], type: number) => {
    form.btn_background = arry;
    form.btn_direction = type.toString();
    emit('update:value', form);
};
const common_styles_update = (val: Object) => {
    form.common_style = val;
};
</script>
<style lang="scss" scoped></style>
