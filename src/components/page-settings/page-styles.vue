<template>
    <div class="styles">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container class="mb-8">
                <div class="mb-12">头部样式</div>
                <el-form-item label="顶部背景">
                    <div class="flex-col gap-10">
                        <el-radio-group v-model="form.background_type">
                            <el-radio value="transparent">透明</el-radio>
                            <el-radio value="color_image">颜色/图片</el-radio>
                        </el-radio-group>
                        <template v-if="form.background_type === 'color_image'">
                            <mult-color-picker :value="form.background_color_list" :type="form.background_direction" @update:value="mult_color_picker_event"></mult-color-picker>
                            <div class="flex-row jc-sb align-c">
                                <div class="size-12">背景图</div>
                                <el-radio-group v-model="form.background_img_style" is-button>
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
                            <upload v-model="form.background_img_url" :limit="1"></upload>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="功能按钮">
                    <el-radio-group v-model="form.function_buttons_type" class="ml-4">
                        <el-radio value="black">黑色</el-radio>
                        <el-radio value="white">白色</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="沉浸样式">
                    <el-radio-group v-model="form.immersive_style" class="ml-4">
                        <el-radio :value="true">开启</el-radio>
                        <el-radio :value="false">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上滑展示">
                    <el-radio-group v-model="form.up_slide_display" class="ml-4">
                        <el-radio :value="true">保留</el-radio>
                        <el-radio :value="false">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="标题名称">
                    <color-text-size-group v-model:color="form.background_title_color" v-model:typeface="form.background_title_typeface" v-model:size="form.background_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
            </card-container>
        </el-form>
        <common-styles :value="form.common_style" :is-margin="false" :is-shadow="false" :is-radius="false" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});
const emit = defineEmits(['update:value']);
// 默认值
let form = reactive(props.value);

const common_styles_update = (val: Object) => {
    form.common_style = val;
};
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.background_color_list = arry;
    form.background_direction = type.toString();
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
}
</style>
