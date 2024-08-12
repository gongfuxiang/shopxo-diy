<template>
    <div class="styles">
        <el-form :model="form" label-width="70">
            <card-container class="mb-8">
                <div class="mb-12">选项卡样式</div>
                <el-form-item label="选中装饰">
                    <mult-color-picker :value="form.tabs_checked" :type="form.tabs_direction" @update:value="tabs_checked_event"></mult-color-picker>
                </el-form-item>
                <el-form-item label="选中文字">
                    <el-radio-group v-model="form.tabs_weight_checked">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.tabs_size_checked"></slider>
                </el-form-item>
                <el-form-item label="文字色值">
                    <color-picker v-model="form.tabs_color_checked"></color-picker>
                </el-form-item>
                <el-form-item label="未选文字">
                    <el-radio-group v-model="form.tabs_weight">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.tabs_size"></slider>
                </el-form-item>
                <el-form-item label="文字色值">
                    <color-picker v-model="form.tabs_color"></color-picker>
                </el-form-item>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">内容样式</div>
                <el-form-item label="文章名称">
                    <el-radio-group v-model="form.name_weight">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.name_size"></slider>
                </el-form-item>
                <el-form-item label="名称色值">
                    <color-picker v-model="form.name_color"></color-picker>
                </el-form-item>
                <el-form-item label="日期时间">
                    <el-radio-group v-model="form.time_weight">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.time_size"></slider>
                </el-form-item>
                <el-form-item label="日期颜色">
                    <color-picker v-model="form.time_color"></color-picker>
                </el-form-item>
                <el-form-item label="浏览量">
                    <el-radio-group v-model="form.page_view_weight">
                        <el-radio v-for="item in font_weight" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="字号">
                    <slider v-model="form.page_view_size"></slider>
                </el-form-item>
                <el-form-item label="浏览色值">
                    <color-picker v-model="form.page_view_color"></color-picker>
                </el-form-item>
                <el-form-item label="内容圆角">
                    <radius :value="form"></radius>
                </el-form-item>
            </card-container>
        </el-form>
        <common-styles :value="form" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { omit } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
// 默认值
let form = ref(props.value);
const font_weight = reactive([
    { name: '加粗', value: '500' },
    { name: '正常', value: '400' },
]);
const tabs_checked_event = (arry: string[], type: number) => {
    form.value.tabs_checked = arry;
    form.value.tabs_direction = type.toString();
};
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
}
</style>
