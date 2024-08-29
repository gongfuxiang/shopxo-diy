<template>
    <div class="common-style-height">
        <el-form :model="form" label-width="80">
            <card-container class="mb-8">
                <div class="mb-12">标题样式</div>
                <template v-if="!is_img">
                    <el-form-item label="标题文字">
                        <color-text-size-group v-model:color="form.topic_color" v-model:typeface="form.topic_typeface" v-model:size="form.topic_size" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                    <el-form-item label="标题背景" class="topic">
                        <flex-gradients-create :color-list="form.topic_color_list"></flex-gradients-create>
                    </el-form-item>
                </template>
                <template v-else>
                    <template v-if="!isEmpty(substance.icon_class)">
                        <el-form-item label="图标大小">
                            <slider v-model="form.icon_size" :max="100"></slider>
                        </el-form-item>
                        <el-form-item label="图标颜色">
                            <color-picker v-model="form.icon_color" default-color="#999"></color-picker>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="图片宽度">
                            <slider v-model="form.topic_width" :max="1000"></slider>
                        </el-form-item>
                        <el-form-item label="图片高度">
                            <slider v-model="form.topic_height" :max="1000"></slider>
                        </el-form-item>
                    </template>
                </template>
                <template v-if="substance.notice_style === 'inherit'">
                    <el-form-item label="容器高度">
                        <slider v-model="form.container_height" :max="1000"></slider>
                    </el-form-item>
                </template>
                <el-form-item label="容器背景">
                    <div class="flex-col gap-10 w">
                        <div class="size-12">背景色</div>
                        <mult-color-picker :value="form.container_color_list" :type="form.container_direction" @update:value="mult_color_picker_event"></mult-color-picker>
                        <div class="flex-row jc-sb align-c">
                            <div class="size-12">背景图</div>
                            <el-radio-group v-model="form.container_background_img_style" is-button>
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
                        <upload v-model="form.container_background_img_url" :limit="1"></upload>
                    </div>
                </el-form-item>
                <el-form-item label="容器圆角">
                    <radius :value="form.container_radius"></radius>
                </el-form-item>
                <el-form-item label="按钮颜色">
                    <color-picker v-model="form.button_color" default-color="#999"></color-picker>
                </el-form-item>
                <el-form-item label="内容标题">
                    <color-text-size-group v-model:color="form.news_color" v-model:typeface="form.news_typeface" v-model:size="form.news_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
            </card-container>
        </el-form>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from "lodash";
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    content: {
        type: Object,
        default: () => {},
    }
});

const state = reactive({
    form: props.value,
    substance: props.content
});
// 如果需要解构，确保使用toRefs
const { form, substance } = toRefs(state);

const is_img = computed(() => substance.value.title_type == 'img-icon');
// 通用样式处理
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};

const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.container_color_list = arry;
    form.value.container_direction = type.toString();
};
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
