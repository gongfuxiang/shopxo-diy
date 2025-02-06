<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <template v-if="['vertical-scroll', 'horizontal'].includes(data.data_source_direction)">
                <card-container class="card-container">
                    <div class="mb-12">轮播设置</div>
                        <el-form-item label="自动轮播">
                            <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" @change="operation_end"/>
                        </el-form-item>
                        <template v-if="form.is_roll == '1'">
                            <el-form-item label="间隔时间">
                                <slider v-model="form.interval_time" :min="1" :max="100" @operation_end="operation_end"></slider>
                            </el-form-item>
                            <el-form-item label="滚动方式">
                                <el-radio-group v-model="form.rolling_fashion" @change="operation_end">
                                    <el-radio value="translation">平移</el-radio>
                                    <el-radio value="cut-screen">切屏</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </template>
                </card-container>
                <div class="divider-line data-tabs-line" />
                <card-container class="card-container">
                    <carousel-indicator :value="form" @operation_end="operation_end"></carousel-indicator>
                </card-container>
                <div class="divider-line data-tabs-line" />
            </template>
            <card-container class="card-container">
                <div class="mb-12">数据样式</div>
                <el-form-item label="背景">
                    <background-common v-model:color_list="form.data_style.color_list" v-model:direction="form.data_style.direction" v-model:img_style="form.data_style.background_img_style" v-model:img="form.data_style.background_img" @mult_color_picker_event="mult_color_picker_event" @operation_end="operation_end" />
                </el-form-item>
                <el-form-item label="外间距">
                    <margin :value="form.data_style" @operation_end="operation_end"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.data_style" @operation_end="operation_end"></padding>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.data_style" @operation_end="operation_end"></radius>
                </el-form-item>
                <el-form-item label="数据间距">
                    <div class="flex-col w h gap-10">
                        <el-form-item v-if="['vertical', 'horizontal'].includes(data.data_source_direction)" label="横向" label-width="40" class="mb-0 w form-item-child-label">
                            <slider v-model="form.column_gap" :max="100" @operation_end="operation_end"></slider>
                        </el-form-item>
                        <el-form-item v-if="['vertical', 'vertical-scroll'].includes(data.data_source_direction)" label="纵向" label-width="40" class="mb-0 w form-item-child-label">
                            <slider v-model="form.row_gap" :max="100" @operation_end="operation_end"></slider>
                        </el-form-item>
                    </div>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.data_style.border_is_show" v-model:color="form.data_style.border_color" v-model:style="form.data_style.border_style" v-model:size="form.data_style.border_size" @operation_end="operation_end"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.data_style" @operation_end="operation_end"></shadow-config>
            </card-container>
            <div class="divider-line data-tabs-line" />
            <card-container class="card-container">
                <div class="mb-12">内容样式</div>
                <el-form-item label="背景">
                    <background-common v-model:color_list="form.data_content_style.color_list" v-model:direction="form.data_content_style.direction" v-model:img_style="form.data_content_style.background_img_style" v-model:img="form.data_content_style.background_img" @mult_color_picker_event="mult_content_color_picker_event" @operation_end="operation_end" />
                </el-form-item>
                <el-form-item label="外间距">
                    <margin :value="form.data_content_style" @operation_end="operation_end"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.data_content_style" @operation_end="operation_end"></padding>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.data_content_style" @operation_end="operation_end"></radius>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.data_content_style.border_is_show" v-model:color="form.data_content_style.border_color" v-model:style="form.data_content_style.border_style" v-model:size="form.data_content_style.border_size" @operation_end="operation_end"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.data_content_style" @operation_end="operation_end"></shadow-config>
            </card-container>
        </el-form>
        <template v-if="isCommonStyle">
            <div class="divider-line data-tabs-line" />
            <common-styles :value="form.common_style" :is-floating-up="isFloatingUp" @operation_end="operation_end"/>
        </template>
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
    isCommonStyle: {
        type: Boolean,
        default: true,
    }
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
const emit = defineEmits(['operation_end']);
// 失去焦点时触发事件
const operation_end = () => {
    emit('operation_end');
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
