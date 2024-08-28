<template>
    <div class="styles">
        <el-form :model="form" label-width="70">
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
                <template v-if="!['1', '2', '4', '5', '6', '7'].includes(theme)">
                    <el-form-item label="数量限制">
                        <color-picker v-model="form.limit_send_count" :default-color="clone_form.limit_send_count"></color-picker>
                    </el-form-item>
                </template>
                <template v-if="!['2'].includes(theme)">
                    <el-form-item label="背景">
                        <mult-color-picker :value="form.background" :type="form.direction"></mult-color-picker>
                    </el-form-item>
                </template>
                <template v-if="!['3', '4'].includes(theme)">
                    <el-form-item label="间距">
                        <slider v-model="form.spacing"></slider>
                    </el-form-item>
                </template>
                <template v-if="!['5', '6', '7'].includes(theme)">
                    <el-form-item label="按钮背景">
                        <mult-color-picker :value="form.btn_background" :type="form.btn_direction"></mult-color-picker>
                    </el-form-item>
                </template>
                <el-form-item label="按钮文字">
                    <color-picker v-model="form.btn_color" :default-color="clone_form.btn_color"></color-picker>
                </el-form-item>
            </card-container>
        </el-form>
        <common-styles class="styles-height" :value="form.common_style" @update:value="common_styles_update" />
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
const common_styles_update = (val: Object) => {
    form.common_style = val;
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
    .styles-height {
        min-height: calc(100vh - 16.8rem);
    }
}
</style>
