<template>
    <div class="styles">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">头像设置</div>
                <el-form-item label="头像大小">
                    <el-radio-group v-model="form.user_avatar_size">
                        <el-radio value="70">大</el-radio>
                        <el-radio value="60">中</el-radio>
                        <el-radio value="50">小</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>

            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">人物名称</div>
                <el-form-item label="色值">
                    <color-picker v-model="form.user_name_color"></color-picker>
                </el-form-item>
                <el-form-item label="名称样式">
                    <el-radio-group v-model="form.user_name_weight">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.user_name_size"></slider>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">ID设置</div>
                <el-form-item label="底部背景">
                    <div class="flex-col gap-10 w">
                        <div class="size-12">背景色</div>
                        <mult-color-picker :value="form.number_code_color_list" :type="form.number_code_direction" @update:value="mult_color_picker_event"></mult-color-picker>
                    </div>
                </el-form-item>
                <el-form-item label="id颜色">
                    <color-picker v-model="form.number_code_color"></color-picker>
                </el-form-item>
                <el-form-item label="名称样式">
                    <el-radio-group v-model="form.number_code_weight">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.number_code_size"></slider>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">图标设置</div>
                <el-form-item label="图标大小">
                    <el-radio-group v-model="form.img_size">
                        <el-radio value="28">大</el-radio>
                        <el-radio value="23">中</el-radio>
                        <el-radio value="18">小</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="图标间距">
                    <el-radio-group v-model="form.img_space">
                        <el-radio value="35">大</el-radio>
                        <el-radio value="25">中</el-radio>
                        <el-radio value="15">小</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">统计设置</div>
                <el-form-item label="文字颜色">
                    <color-picker v-model="form.stats_name_color"></color-picker>
                </el-form-item>
                <el-form-item label="文字样式">
                    <el-radio-group v-model="form.stats_name_weight">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.stats_name_size"></slider>
                </el-form-item>
                <el-form-item label="数字颜色">
                    <color-picker v-model="form.stats_number_color"></color-picker>
                </el-form-item>
                <el-form-item label="数字样式">
                    <el-radio-group v-model="form.stats_number_weight">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.stats_number_size"></slider>
                </el-form-item>
            </card-container>
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { font_weight } from '@/utils/common';
/**
 * @description: 用户信息 （样式）
 * @param value{Object} 样式数据
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});
// 默认值
let form = ref(props.value);
// 多颜色选择器事件
const mult_color_picker_event = (arry: string[], type: number) => {
    form.value.number_code_color_list = arry;
    form.value.number_code_direction = type.toString();
};
// 公共样式回调
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
}
</style>
