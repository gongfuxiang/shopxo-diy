<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <template v-if="['vertical-scroll', 'horizontal'].includes(data.data_source_direction)">
                <card-container>
                    <div class="mb-12">轮播设置</div>
                        <el-form-item label="自动轮播">
                            <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
                        </el-form-item>
                        <template v-if="form.is_roll == '1'">
                            <el-form-item label="间隔时间">
                                <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                            </el-form-item>
                            <el-form-item label="滚动方式">
                                <el-radio-group v-model="form.rolling_fashion">
                                    <el-radio value="translation">平移</el-radio>
                                    <el-radio value="cut-screen">切屏</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </template>
                </card-container>
                <div class="bg-f5 divider-line" />
                <card-container>
                    <carousel-indicator :value="form"></carousel-indicator>
                </card-container>
                <div class="bg-f5 divider-line" />
            </template>
            <card-container>
                <div class="mb-12">数据样式</div>
                <el-form-item label="背景">
                    <background-common v-model:color_list="form.data_style.color_list" v-model:direction="form.data_style.direction" v-model:img_style="form.data_style.background_img_style" v-model:img="form.data_style.background_img" @mult_color_picker_event="mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="外间距">
                    <margin :value="form.data_style"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.data_style"></padding>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.data_style"></radius>
                </el-form-item>
                <el-form-item label="数据间距">
                    <div class="flex-col w h gap-10">
                        <el-form-item v-if="['vertical', 'horizontal'].includes(data.data_source_direction)" label="横向" label-width="40" class="mb-0 w form-item-child-label">
                            <slider v-model="form.column_gap" :max="100"></slider>
                        </el-form-item>
                        <el-form-item v-if="['vertical', 'vertical-scroll'].includes(data.data_source_direction)" label="纵向" label-width="40" class="mb-0 w form-item-child-label">
                            <slider v-model="form.row_gap" :max="100"></slider>
                        </el-form-item>
                    </div>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.data_style.border_is_show" v-model:color="form.data_style.border_color" v-model:style="form.data_style.border_style" v-model:size="form.data_style.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.data_style"></shadow-config>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">内容样式</div>
                <el-form-item label="背景">
                    <background-common v-model:color_list="form.data_content_style.color_list" v-model:direction="form.data_content_style.direction" v-model:img_style="form.data_content_style.background_img_style" v-model:img="form.data_content_style.background_img" @mult_color_picker_event="mult_content_color_picker_event" />
                </el-form-item>
                <el-form-item label="外间距">
                    <margin :value="form.data_content_style"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.data_content_style"></padding>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.data_content_style"></radius>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.data_content_style.border_is_show" v-model:color="form.data_content_style.border_color" v-model:style="form.data_content_style.border_style" v-model:size="form.data_content_style.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.data_content_style"></shadow-config>
            </card-container>
        </el-form>
        <div class="bg-f5 divider-line" />
        <common-styles :value="form.common_style" :is-floating-up="isFloatingUp" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: Object,
        default: () => ({}),
    },
    isFloatingUp: {
        type: Boolean,
        default: true,
    },
});
const state = reactive({
    form: props.value,
    data: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
// 内容样式
const mult_content_color_picker_event = (arry: color_list[], type: number) => {
    form.value.data_content_style.color_list = arry;
    form.value.data_content_style.direction = type.toString();
}
// 数据样式
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.data_style.color_list = arry;
    form.value.data_style.direction = type.toString();
}
</script>
<style lang="scss" scoped>
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
