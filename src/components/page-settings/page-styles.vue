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
                        <el-radio value="0">黑色</el-radio>
                        <el-radio value="1">白色</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="['1', '2', '3'].includes(page_content.theme)" label="标题名称">
                    <color-text-size-group v-model:color="form.header_background_title_color" v-model:typeface="form.header_background_title_typeface" v-model:size="form.header_background_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item v-if="form.header_background_type == 'transparent'" label="沉浸样式">
                    <div class="flex-row align-c gap-10">
                        <el-switch v-model="form.immersive_style" active-value="1" inactive-value="0" :disabled="is_have_tabs" @change="change_immersive_style"></el-switch>
                        <el-tooltip effect="light" :show-after="200" :hide-after="200" content="<span>开启沉浸样式时，不可添加选项卡和选项卡轮播。<br/>并且商品选项卡和文章选项卡的选项卡置顶功能禁用</span>" raw-content placement="top">
                            <icon name="miaosha-hdgz" size="12" color="#999"></icon>
                        </el-tooltip>
                    </div>
                </el-form-item>
                <el-form-item v-if="form.header_background_type == 'transparent' && form.immersive_style === '1'" label="安全距离">
                    <div class="flex-row align-c gap-10">
                        <el-switch v-model="form.general_safe_distance_value" active-value="1" inactive-value="0"></el-switch>
                        <el-tooltip effect="light" :show-after="200" :hide-after="200" content="开启后第一个组件上内边距将增加顶部安全距离+导航高度" placement="top">
                            <icon name="miaosha-hdgz" size="12" color="#999"></icon>
                        </el-tooltip>
                    </div>
                </el-form-item>
                <el-form-item label="上滑展示">
                    <el-switch v-model="form.up_slide_display" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <template v-if="form.up_slide_display == '1'">
                    <el-form-item v-if="['2', '3'].includes(page_content.theme) && !isEmpty(page_content.logo)" label="上滑logo">
                        <upload v-model="form.up_slide_logo" :limit="1"></upload>
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
                </template>
                <el-form-item label="返回颜色">
                    <color-picker v-model="form.left_back_btn_color" class="mr-10" default-color="#333"></color-picker>
                    <el-tooltip effect="light" :show-after="200" :hide-after="200" content="打开新页面才会出现返回按钮" raw-content placement="top">
                        <icon name="miaosha-hdgz" size="12" color="#999"></icon>
                    </el-tooltip>
                </el-form-item>
                <el-form-item v-if="page_content.data_alone_row_value.length > 0" label="换行间距">
                    <slider v-model="form.data_alone_row_space" :max="100"></slider>
                </el-form-item>
            </card-container>
            <template v-if="['4', '5'].includes(page_content.theme)">
                <div class="bg-f5 divider-line" />
                <card-container>
                    <div class="mb-12">定位设置</div>
                    <el-form-item label="定位背景">
                        <div class="flex-col gap-10 w">
                            <div class="size-12">背景色</div>
                            <mult-color-picker :value="form.location_color_list" :type="form.location_direction" @update:value="location_mult_color_picker_event"></mult-color-picker>
                            <div class="flex-row jc-sb align-c">
                                <div class="size-12">背景图</div>
                                <bg-btn-style v-model="form.location_background_img_style"></bg-btn-style>
                            </div>
                            <upload v-model="form.location_background_img" :limit="1" @update:model-value="location_background_img_change"></upload>
                        </div>
                    </el-form-item>
                    <el-form-item label="定位颜色">
                        <color-picker v-model="form.location_color" default-color="#333"></color-picker>
                    </el-form-item>
                    <template v-if="!isEmpty(page_content.location_left_icon)">
                        <el-form-item label="左侧图标">
                            <el-radio-group v-model="form.location_left_icon_size">
                                <el-radio :value="14">大</el-radio>
                                <el-radio :value="12">中</el-radio>
                                <el-radio :value="8">小</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </template>
                    <template v-if="!isEmpty(page_content.location_right_icon)">
                        <el-form-item label="右侧图标">
                            <el-radio-group v-model="form.location_right_icon_size">
                                <el-radio :value="14">大</el-radio>
                                <el-radio :value="12">中</el-radio>
                                <el-radio :value="8">小</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </template>
                    <el-form-item label="圆角">
                        <radius :value="form.location_radius"></radius>
                    </el-form-item>
                    <el-form-item label="内间距">
                        <padding :value="form.location_padding"></padding>
                    </el-form-item>
                    <el-form-item label="外边距">
                        <margin :value="form.location_margin"></margin>
                    </el-form-item>
                    <el-form-item label="边框">
                        <el-switch v-model="form.location_border_show" active-value="1" inactive-value="0" />
                    </el-form-item>
                    <template v-if="form.location_border_show == '1'">
                        <el-form-item label="边框颜色">
                            <color-picker v-model="form.location_border_color" default-color="#FF3F3F"></color-picker>
                        </el-form-item>
                        <el-form-item label="边框位置">
                            <el-radio-group v-model="form.location_border_direction">
                                <el-radio value="all">全部</el-radio>
                                <el-radio value="left">左侧</el-radio>
                                <el-radio value="right">右侧</el-radio>
                                <el-radio value="top">上边框</el-radio>
                                <el-radio value="bottom">下边框</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="边框粗细">
                            <slider v-model="form.location_border_size" :max="100"></slider>
                        </el-form-item>
                    </template>
                </card-container>
            </template>
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
                <el-form-item label="图标颜色">
                    <color-picker v-model="form.img_color" default-color="#666"></color-picker>
                </el-form-item>
            </card-container>
        </el-form>
        <template v-if="['3', '5'].includes(content.theme)">
            <div class="bg-f5 divider-line" />
            <model-search-styles :value="form" :content="props.content" :is-show-common="false"></model-search-styles>
        </template>
        <div class="bg-f5 divider-line" />
        <common-styles :value="form.common_style" :is-margin="false" :is-shadow="false" :is-radius="false" :is-floating-up="false" :is-up-down="false" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from "lodash";
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
    page_content: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, page_content } = toRefs(state);
// 监听属性变化
watchEffect(() => {
    form.value = props.value;
    page_content.value = props.content;
});

const header_background_type_change_event = (val: any) => {
    if (val === 'color_image') {
        form.value.immersive_style = '0';
        // 沉浸模式关闭的时候，安全距离关闭
        form.value.general_safe_distance_value = '0';
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
// 定位背景处理
const location_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.location_color_list = arry;
    form.value.location_direction = type.toString();
};
// 定位背景图片处理
const location_background_img_change = (val: uploadList[]) => {
    form.value.location_background_img = val;
};

const change_immersive_style = (val: string | number | boolean) => {
    if (val === '0') {
        // 沉浸模式关闭的时候，安全距离关闭
        form.value.general_safe_distance_value = '0';
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
