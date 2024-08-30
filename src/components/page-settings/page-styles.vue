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
                            <upload v-model="form.header_background_img_url" :limit="1"></upload>
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
                <el-form-item v-if="['1', '2'].includes(search_content.theme)" label="标题名称">
                    <color-text-size-group v-model:color="form.background_title_color" v-model:typeface="form.background_title_typeface" v-model:size="form.background_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
            </card-container>
        </el-form>
        <div class="bg-f5 divider-line" />
        <template v-if="['3', '5'].includes(content.theme)">
            <model-search-styles :value="form" :content="props.content" :is-show-common="false"></model-search-styles>
        </template>
        <div class="bg-f5 divider-line" />
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
    content: {
        type: Object,
        default: () => { },
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
    form.value.background_color_list = arry;
    form.value.background_direction = type.toString();
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
}
</style>
