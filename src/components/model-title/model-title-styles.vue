<template>
    <div class="w h">
        <el-form :model="form" label-width="80">
            <card-container>
                <div class="mb-12">标题设置</div>
                <template v-if="!isEmpty(content.icon_class)">
                    <el-form-item label="左侧图标">
                        <div class="flex-col w gap-10">
                            <el-form-item label="颜色" label-width="40" class="form-item-child-label">
                                <color-picker v-model="form.icon_color" default-color="#999"></color-picker>
                            </el-form-item>
                            <el-form-item label="大小" label-width="40" class="form-item-child-label">
                                <slider v-model="form.icon_size" :max="100"></slider>
                            </el-form-item>
                        </div>
                    </el-form-item>
                </template>
                <el-form-item label="主标题">
                    <div class="flex-col gap-10 w">
                        <color-picker v-model="form.title_color" default-color="#000000"></color-picker>
                        <el-radio-group v-model="form.title_weight">
                            <el-radio value="500">加粗</el-radio>
                            <el-radio value="normal">正常</el-radio>
                            <el-radio value="italic">倾斜</el-radio>
                        </el-radio-group>
                        <el-form-item label="字号" label-width="40" class="mb-0 w">
                            <slider v-model="form.title_size" :max="100"></slider>
                        </el-form-item>
                    </div>
                </el-form-item>
                <template v-if="!isEmpty(content.subtitle)">
                    <el-form-item label="副标题">
                        <div class="flex-col gap-10 w">
                            <color-picker v-model="form.subtitle_color" default-color="#000000"></color-picker>
                            <el-radio-group v-model="form.subtitle_weight">
                                <el-radio value="500">加粗</el-radio>
                                <el-radio value="normal">正常</el-radio>
                                <el-radio value="italic">倾斜</el-radio>
                            </el-radio-group>
                            <el-form-item label="字号" label-width="40" class="mb-0 w">
                                <slider v-model="form.subtitle_size" :max="100"></slider>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item label="标题同行">
                        <el-switch v-model="form.title_line" active-value="1" inactive-value="0" />
                    </el-form-item>
                </template>
                <el-form-item label="图片高度">
                    <slider v-model="form.img_height" :max="500"></slider>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">关键字设置</div>
                <el-form-item label="文字颜色">
                    <color-picker v-model="form.keyword_color" default-color="#000000"></color-picker>
                </el-form-item>
                <el-form-item label="文字大小">
                    <slider v-model="form.keyword_size" :max="100"></slider>
                </el-form-item>
                <el-form-item label="间距">
                    <slider v-model="form.keyword_spacing" :min="0" :max="50"></slider>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">更多设置</div>
                <el-form-item label="按钮颜色">
                    <color-picker v-model="form.right_color" default-color="#999"></color-picker>
                </el-form-item>
                <el-form-item label="按钮文字">
                    <slider v-model="form.right_size" :max="100"></slider>
                </el-form-item>
            </card-container>
        </el-form>
        <div class="bg-f5 divider-line" />
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
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

// 通用样式处理
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped>
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
.connect-line {
    width: 0.1rem;
    height: 1.6rem;
    background: #d8d8d8;
    position: relative;
    left: 1rem;
    // 合并before和after重复代码
    &::before,
    &::after {
        position: absolute;
        left: -0.2rem;
        content: '';
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: #ddd;
    }
    &::before {
        top: -0.25rem;
    }
    &::after {
        bottom: -0.25rem;
    }
}
</style>
