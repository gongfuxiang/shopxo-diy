<template>
    <div class="w">
        <el-form :model="form" label-width="74">
            <card-container>
                <div class="mb-12">选项卡样式</div>
                <el-form-item label="选中装饰">
                    <el-radio-group v-if="tabsStyle == '0'" v-model="form.tabs_one_theme" @change="tabs_one_theme_event">
                        <el-radio value="0">样式一</el-radio>
                        <el-radio value="1">样式二</el-radio>
                    </el-radio-group>
                    <mult-color-picker :value="form.tabs_checked" :type="form.tabs_direction" @update:value="tabs_checked_event"></mult-color-picker>
                </el-form-item>
                <el-form-item label="选中标题">
                    <color-text-size-group v-model:color="form.tabs_color_checked" v-model:typeface="form.tabs_weight_checked" v-model:size="form.tabs_size_checked" default-color="rgba(51,51,51,1)" />
                </el-form-item>
                <el-form-item label="未选标题">
                    <color-text-size-group v-model:color="form.tabs_color" v-model:typeface="form.tabs_weight" v-model:size="form.tabs_size" default-color="rgba(51,51,51,1)" />
                </el-form-item>
                <el-form-item label="选中图标">
                    <color-text-size-group v-model:color="form.tabs_icon_color_checked" v-model:size="form.tabs_icon_size_checked" default-color="rgba(51,51,51,1)" slider-name="大小" :type-list="['color', 'size']"  />
                </el-form-item>
                <el-form-item label="未选图标">
                    <color-text-size-group v-model:color="form.tabs_icon_color" v-model:size="form.tabs_icon_size" default-color="rgba(51,51,51,1)" slider-name="大小" :type-list="['color', 'size']" />
                </el-form-item>
                <el-form-item label="图片设置">
                    <div class="flex-col gap-10 w">
                        <template v-if="['2', '4'].includes(tabsStyle)">
                            <el-form-item label="背景" label-width="40">
                                <el-switch v-model="form.is_tabs_img_background" active-value="1" inactive-value="0" />
                            </el-form-item>
                        </template>
                        <el-form-item label="圆角" label-width="40">
                            <radius :value="form.tabs_img_radius"></radius>
                        </el-form-item>
                        <el-form-item label="高度" label-width="40">
                            <slider v-model="form.tabs_img_height" :max="200"></slider>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="上下间距">
                    <slider v-model="form.tabs_sign_spacing" :max="50"></slider>
                </el-form-item>
                <el-form-item label="左右间距">
                    <slider v-model="form.tabs_spacing" :max="100"></slider>
                </el-form-item>
                <template v-if="!isCommon">
                    <el-form-item label="选项卡背景">
                        <background-common v-model:color_list="form.tabs_bg_color_list" v-model:direction="form.tabs_bg_direction" v-model:img_style="form.tabs_bg_background_img_style" v-model:img="form.tabs_bg_background_img" @mult_color_picker_event="tabs_bg_mult_color_picker_event" />
                    </el-form-item>
                    <el-form-item label="圆角">
                        <radius :value="form.tabs_radius"></radius>
                    </el-form-item>
                    <el-form-item label="内边距">
                        <padding :value="form.tabs_padding"></padding>
                    </el-form-item>
                </template>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">更多样式</div>
                <el-form-item label="图标">
                    <upload v-model:icon-value="form.more_icon_class" type="icon" :is-delete="false" is-icon :limit="1" size="50"></upload>
                </el-form-item>
                <el-form-item label="图标颜色">
                    <color-picker v-model="form.more_icon_color" default-color="#CCCCCC"></color-picker>
                </el-form-item>
                <el-form-item label="图标大小">
                    <slider v-model="form.more_icon_size" :max="100"></slider>
                </el-form-item>
            </card-container>
        </el-form>
        <template v-if="isCommon">
            <div class="divider-line"></div>
            <common-styles :value="form.common_style" :is-floating-up="false" @update:value="common_styles_update" />
        </template>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    isCommon: {
        type: Boolean,
        default: true,
    },
    tabsStyle: {
        type: String,
        default: '',
    },
});

const state = reactive({
    form: props.value,
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
// 选项卡选中主题1时的主题选择事件
const tabs_one_theme_event = (val: any) => {
    
};
// 选项卡选中
const tabs_checked_event = (arry: string[], type: number) => {
    form.value.tabs_checked = arry;
    form.value.tabs_direction = type.toString();
};
// 选项卡背景渐变设置
const tabs_bg_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.tabs_bg_color_list = arry;
    form.value.tabs_bg_direction = type.toString();
};
// 选项卡背景图片设置
const tabs_bg_background_img_change = (arry: uploadList[]) => {
    form.value.tabs_bg_background_img = arry;
};
</script>
<style lang="scss" scoped></style>
