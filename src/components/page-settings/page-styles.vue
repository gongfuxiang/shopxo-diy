<template>
    <div class="w h">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">头部样式</div>
                <el-form-item label="顶部背景">
                    <div class="flex-col gap-10">
                        <el-radio-group v-model="form.header_background_type">
                            <el-radio value="transparent">透明</el-radio>
                            <el-radio value="color_image">颜色/图片</el-radio>
                        </el-radio-group>
                        <template v-if="form.header_background_type === 'color_image'">
                            <mult-color-picker :value="form.header_background_color_list" :type="form.header_background_direction" @update:value="mult_color_picker_event"></mult-color-picker>
                            <div class="flex-row jc-sb align-c">
                                <div class="size-12">背景图</div>
                                <el-radio-group v-model="form.header_background_img_style" is-button>
                                    <el-tooltip content="单张" placement="top" effect="light">
                                        <el-radio-button value="0">
                                            <icon name="single-sheet"></icon>
                                        </el-radio-button>
                                    </el-tooltip>
                                    <el-tooltip content="平铺" placement="top" effect="light">
                                        <el-radio-button value="1">
                                            <icon name="tile"></icon>
                                        </el-radio-button>
                                    </el-tooltip>
                                    <el-tooltip content="铺满" placement="top" effect="light">
                                        <el-radio-button value="2">
                                            <icon name="spread-over"></icon>
                                        </el-radio-button>
                                    </el-tooltip>
                                </el-radio-group>
                            </div>
                            <upload v-model="form.header_background_img" :limit="1"></upload>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="功能按钮">
                    <el-radio-group v-model="form.function_buttons_type">
                        <el-radio value="black">黑色</el-radio>
                        <el-radio value="white">白色</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.header_background_type == 'transparent'" label="沉浸样式">
                    <el-switch v-model="form.immersive_style" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="上滑展示">
                    <el-switch v-model="form.up_slide_display" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item v-if="['1', '2'].includes(search_content.theme)" label="标题名称">
                    <color-text-size-group v-model:color="form.header_background_title_color" v-model:typeface="form.header_background_title_typeface" v-model:size="form.header_background_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">右侧图标设置</div>
                <el-form-item label="图标大小">
                    <el-radio-group v-model="form.img_size">
                        <el-radio value="28">大</el-radio>
                        <el-radio value="23">中</el-radio>
                        <el-radio value="18">小</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="图标间距">
                    <el-radio-group v-model="form.img_space">
                        <el-radio value="25">大</el-radio>
                        <el-radio value="15">中</el-radio>
                        <el-radio value="10">小</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
        </el-form>
        <template v-if="['3', '5'].includes(content.theme)">
            <div class="bg-f5 divider-line" />
            <model-search-styles :value="form" :content="props.content" :is-show-common="false"></model-search-styles>
        </template>
        <div class="bg-f5 divider-line" />
        <common-styles :value="form.common_style" :is-margin="false" :is-shadow="false" :is-radius="false" :is-floating-up="false" @update:value="common_styles_update" />
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
    content: {
        type: Object,
        default: () => {},
    },
});
const emit = defineEmits(['update:value']);
const state = reactive({
    form: props.value,
    search_content: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, search_content } = toRefs(state);

const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.header_background_color_list = arry;
    form.value.header_background_direction = type.toString();
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
}
</style>
