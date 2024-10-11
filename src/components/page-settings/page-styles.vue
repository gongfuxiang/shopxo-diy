<template>
    <div class="w h">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">头部样式</div>
                <el-form-item label="顶部背景">
                    <div class="w h flex-col gap-10">
                        <el-radio-group v-model="form.header_background_type" @change="header_background_type_change_event">
                            <el-radio value="transparent">透明</el-radio>
                            <el-radio value="color_image">颜色/图片</el-radio>
                        </el-radio-group>
                        <template v-if="form.header_background_type === 'color_image'">
                            <mult-color-picker :value="form.header_background_color_list" :type="form.header_background_direction" @update:value="mult_color_picker_event"></mult-color-picker>
                            <div class="flex-row jc-sb align-c">
                                <div class="size-12">背景图</div>
                                <bg-btn-style v-model="form.header_background_img_style"></bg-btn-style>
                            </div>
                            <upload v-model="form.header_background_img" :limit="1"></upload>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="状态栏">
                    <el-radio-group v-model="form.function_buttons_type">
                        <el-radio value="black">黑色</el-radio>
                        <el-radio value="white">白色</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="['1', '2'].includes(search_content.theme)" label="标题名称">
                    <color-text-size-group v-model:color="form.header_background_title_color" v-model:typeface="form.header_background_title_typeface" v-model:size="form.header_background_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item v-if="form.header_background_type == 'transparent'" label="沉浸样式">
                    <div class="flex-row align-c gap-10">
                        <el-switch v-model="form.immersive_style" active-value="1" inactive-value="0" :disabled="is_have_tabs" @change="change_immersive_style"></el-switch>
                        <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="<span>开启沉浸样式时，不可添加选项卡和选项卡轮播。<br/>并且商品选项卡和文章选项卡的选项卡置顶功能禁用</span>" raw-content placement="top">
                            <icon name="miaosha-hdgz" size="16"></icon>
                        </el-tooltip>
                    </div>
                </el-form-item>
                <el-form-item label="上滑展示">
                    <el-switch v-model="form.up_slide_display" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="上滑背景">
                    <div class="w h flex-col gap-10">
                        <mult-color-picker :value="form?.up_slide_background_color_list || []" :type="form?.up_slide_background_direction || '180deg'" @update:value="up_slide_mult_color_picker_event"></mult-color-picker>
                        <div class="flex-row jc-sb align-c">
                            <div class="size-12">背景图</div>
                            <bg-btn-style v-model="form.up_slide_background_img_style"></bg-btn-style>
                        </div>
                        <upload v-model="form.up_slide_background_img" :limit="1"></upload>
                    </div>
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
import { commonStore } from '@/store';
const common_store = commonStore();
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
const is_have_tabs = computed(() => {
    return common_store.is_have_tabs;
});

const emit = defineEmits(['update:value']);
const state = reactive({
    form: props.value,
    search_content: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, search_content } = toRefs(state);
console.log(form);

const header_background_type_change_event = (val: any) => {
    if (val === 'color_image') {
        form.value.immersive_style = '0';
        common_store.set_is_immersion_model(false);
    } else {
        // 没有tabs的情况下，默认开启沉浸模式
        if (!common_store.is_have_tabs) {
            form.value.immersive_style = '1';
            common_store.set_is_immersion_model(true);
        }
    }
};

const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.header_background_color_list = arry;
    form.value.header_background_direction = type.toString();
};
const up_slide_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.up_slide_background_color_list = arry;
    form.value.up_slide_background_direction = type.toString();
};
const change_immersive_style = (val: string | number | boolean) => {
    if (val === '0') {
        common_store.set_is_immersion_model(false);
        return;
    }
    common_store.set_is_immersion_model(true);
};
</script>
<style lang="scss" scoped>
.styles {
    width: 100%;
}
</style>
