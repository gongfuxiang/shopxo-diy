<template>
    <div class="w h">
        <el-form :model="form" label-width="80">
            <card-container>
                <div class="mb-12">基础样式</div>
                <template v-if="!is_img">
                    <el-form-item label="标题文字">
                        <color-text-size-group v-model:color="form.title_color" v-model:typeface="form.title_typeface" v-model:size="form.title_size" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                    <el-form-item label="标题背景" class="topic">
                        <flex-gradients-create :color-list="form.title_color_list"></flex-gradients-create>
                    </el-form-item>
                </template>
                <template v-else-if="is_img">
                    <template v-if="!isEmpty(substance.icon_class)">
                        <el-form-item label="左侧图标">
                            <div class="flex-col w gap-10">
                                <el-form-item label="大小" label-width="40" class="form-item-child-label">
                                    <slider v-model="form.icon_size" :max="100"></slider>
                                </el-form-item>
                                <el-form-item label="颜色" label-width="40" class="form-item-child-label">
                                    <color-picker v-model="form.icon_color" default-color="#999"></color-picker>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="左侧图片">
                            <div class="flex-col w gap-10">
                                <el-form-item label="宽度" label-width="40" class="form-item-child-label">
                                    <slider v-model="form.title_width" :max="1000"></slider>
                                </el-form-item>
                                <el-form-item label="高度" label-width="40" class="form-item-child-label">
                                    <slider v-model="form.title_height" :max="1000"></slider>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </template>
                </template>
                <!-- 样式三全部显示：左侧图标位置与外边距 -->
                <template v-if="is_marquee_full_display">
                    <el-form-item label="图标位置">
                        <el-radio-group v-model="form.left_icon_position">
                            <el-radio value="top">居上</el-radio>
                            <el-radio value="center">居中</el-radio>
                            <el-radio value="bottom">居下</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="图标外边距">
                        <padding v-model:value="form.left_icon_margin"></padding>
                    </el-form-item>
                </template>
                <el-form-item label="内容标题">
                    <color-text-size-group v-model:color="form.news_color" v-model:typeface="form.news_typeface" v-model:size="form.news_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">更多设置</div>
                <el-form-item label="按钮颜色">
                    <color-picker v-model="form.right_button_color" default-color="#999"></color-picker>
                </el-form-item>
                <el-form-item label="按钮文字">
                    <slider v-model="form.right_button_size" :max="100"></slider>
                </el-form-item>
                <!-- 样式三全部显示：右侧更多按钮图标位置与外边距 -->
                <template v-if="is_marquee_full_display">
                    <el-form-item label="图标位置">
                        <el-radio-group v-model="form.right_icon_position">
                            <el-radio value="top">居上</el-radio>
                            <el-radio value="center">居中</el-radio>
                            <el-radio value="bottom">居下</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="图标外边距">
                        <padding v-model:value="form.right_icon_margin"></padding>
                    </el-form-item>
                </template>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">容器设置</div>
                <!-- 样式三开启全部显示时不配置固定高度，由内容撑开 -->
                <template v-if="show_container_height">
                    <el-form-item label="高度">
                        <slider v-model="form.container_height" :min="1" :max="1000"></slider>
                    </el-form-item>
                </template>
                <el-form-item label="背景">
                    <background-common v-model:color_list="form.container_color_list" v-model:direction="form.container_direction" v-model:img_style="form.container_background_img_style" v-model:img="form.container_background_img" @mult_color_picker_event="mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="内边距">
                    <padding
                        :key="`notice-container-padding-${substance.notice_style}-${substance.is_full_display}`"
                        v-model:value="form.container_padding"
                    ></padding>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.container_radius"></radius>
                </el-form-item>
            </card-container>
        </el-form>
        <div class="bg-f5 divider-line" />
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    content: {
        type: Object,
        default: () => {},
    },
});

const state = reactive({
    form: props.value,
    substance: props.content,
});
const { form, substance } = toRefs(state);

const is_img = computed(() => substance.value.title_type == 'img-icon');
/** 样式三且开启全部显示 */
const is_marquee_full_display = computed(
    () => substance.value.notice_style == 'marquee' && substance.value.is_full_display === '1'
);
/** 样式一固定高度；样式三未开启全部显示时固定高度 */
const show_container_height = computed(() => {
    if (substance.value.notice_style === 'inherit') return true;
    if (substance.value.notice_style === 'marquee' && substance.value.is_full_display !== '1') return true;
    return false;
});

const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};

const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.container_color_list = arry;
    form.value.container_direction = type.toString();
};
</script>
<style lang="scss" scoped>
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
