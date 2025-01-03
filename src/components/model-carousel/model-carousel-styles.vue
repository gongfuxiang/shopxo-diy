<template>
    <div class="common-style-height">
        <el-form :model="form" label-width="70">
            <template v-if="!isCommon">
                <card-container>
                    <div class="mb-12">内容设置</div>
                    <el-form-item label="内容背景">
                        <background-common v-model:color_list="form.carousel_content_color_list" v-model:direction="form.carousel_content_direction" v-model:img_style="form.carousel_content_background_img_style" v-model:img="form.carousel_content_background_img" @mult_color_picker_event="carousel_content_mult_color_picker_event" />
                    </el-form-item>
                    <el-form-item label="圆角">
                        <radius :value="form.carousel_content_radius"></radius>
                    </el-form-item>
                    <el-form-item label="外间距">
                        <margin :value="form.carousel_content_margin"></margin>
                    </el-form-item>
                    <el-form-item label="内间距">
                        <padding :value="form.carousel_content_padding"></padding>
                    </el-form-item>
                </card-container>
                <div class="divider-line"></div>
            </template>
            <card-container>
                <div class="mb-12">图片设置</div>
                <el-form-item label="圆角">
                    <radius :value="form"></radius>
                </el-form-item>
            </card-container>
            <template v-if="['oneDragOne', 'twoDragOne'].includes(new_content.carousel_type)">
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">轮播设置</div>
                    <el-form-item label="图片间距">
                        <slider v-model="form.image_spacing" :max="100"></slider>
                    </el-form-item>
                </card-container>
            </template>
            <div class="divider-line"></div>
            <card-container>
                <carousel-indicator :value="form"></carousel-indicator>
            </card-container>
            <template v-if="is_video">
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">视频按钮</div>
                    <el-form-item label="是否显示">
                        <el-switch v-model="form.video_is_show" active-value="1" inactive-value="0"/>
                    </el-form-item>
                    <template v-if="form.video_is_show == '1'">
                        <el-form-item label="图标样式">
                            <div class="flex-col gap-10">
                                <el-radio-group v-model="form.video_type" class="mb-10">
                                    <el-radio value="img">图片</el-radio>
                                    <el-radio value="icon">图标</el-radio>
                                </el-radio-group>
                                <template v-if="form.video_type == 'img'">
                                    <upload v-model="form.video_img" :limit="1" size="50"></upload>
                                </template>
                                <template v-else>
                                    <upload v-model:icon-value="form.video_icon_class" type="icon" is-icon :limit="1" size="50"></upload>
                                    <color-picker v-model="form.video_icon_color" default-color="#ff6868"></color-picker>
                                </template>
                            </div>
                        </el-form-item>
                        <el-form-item label="位置">
                            <el-radio-group v-model="form.video_location" is-button>
                                <el-tooltip content="左对齐" placement="top" effect="dark">
                                    <el-radio-button value="flex-start"><icon name="iconfont icon-left"></icon></el-radio-button>
                                </el-tooltip>
                                <el-tooltip content="居中" placement="top" effect="dark">
                                    <el-radio-button value="center"><icon name="iconfont icon-center"></icon></el-radio-button>
                                </el-tooltip>
                                <el-tooltip content="右对齐" placement="top" effect="dark">
                                    <el-radio-button value="flex-end"><icon name="iconfont icon-right"></icon></el-radio-button>
                                </el-tooltip>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="下边距">
                            <slider v-model="form.video_bottom" :min="0" :max="100"></slider>
                        </el-form-item>
                        <el-form-item label="按钮名称">
                            <color-text-size-group v-model:color="form.video_title_color" v-model:size="form.video_title_size" default-color="#666" :type-list="['color', 'size']"></color-text-size-group>
                        </el-form-item>
                        <el-form-item label="背景色">
                            <mult-color-picker :value="form.video_color_list" :type="form.video_direction" @update:value="mult_color_picker_event"></mult-color-picker>
                        </el-form-item>
                        <el-form-item label="圆角">
                            <radius :value="form.video_radius"></radius>
                        </el-form-item>
                        <el-form-item label="内边距">
                            <padding :value="form.video_padding"></padding>
                        </el-form-item>
                    </template>
                </card-container>
            </template>
        </el-form>
        <template v-if="isCommon">
            <div class="divider-line"></div>
            <common-styles :value="form.common_style" @update:value="common_styles_update" />
        </template>
    </div>
</template>
<script setup lang="ts">
import { pick } from 'lodash';

const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    content: {
        type: Object,
        default: () => {},
    },
    isCommon: {
        type: Boolean,
        default: true
    }
});

const state = reactive({
    form: props.value,
    new_content: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, new_content } = toRefs(state);

const is_video = computed(() => new_content.value.carousel_list.length > 0 && (new_content.value.carousel_list.findIndex((item: any) => item.carousel_video.length > 0)) != -1);

// 内容区域背景渐变设置
const carousel_content_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.carousel_content_color_list = arry;
    form.value.carousel_content_direction = type.toString();
};
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.video_color_list = arry;
    form.value.video_direction = type.toString();
};

// 通用样式处理
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped></style>
