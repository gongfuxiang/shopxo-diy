<template>
    <div class="w">
        <el-form :model="form" label-width="74">
            <card-container>
                <div class="mb-12">选项卡样式</div>
                <el-form-item label="选中装饰">
                    <mult-color-picker :value="form.tabs_checked" :type="form.tabs_direction" @update:value="tabs_checked_event"></mult-color-picker>
                </el-form-item>
                <el-form-item label="选中标题">
                    <color-text-size-group v-model:color="form.tabs_color_checked" v-model:typeface="form.tabs_weight_checked" v-model:size="form.tabs_size_checked" default-color="rgba(51,51,51,1)"></color-text-size-group>
                </el-form-item>
                <el-form-item label="未选标题">
                    <color-text-size-group v-model:color="form.tabs_color" v-model:typeface="form.tabs_weight" v-model:size="form.tabs_size" default-color="rgba(51,51,51,1)"></color-text-size-group>
                </el-form-item>
                <el-form-item label="选项卡间距">
                    <slider v-model="form.tabs_spacing" :max="100"></slider>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">更多样式</div>
                <el-form-item label="图标">
                    <upload v-model:icon-value="form.more_icon_class" type="icon" is-icon :limit="1" size="50"></upload>
                </el-form-item>
                <el-form-item label="图标颜色">
                    <color-picker v-model="form.more_icon_color" default-color="#CCCCCC"></color-picker>
                </el-form-item>
                <el-form-item label="图标大小">
                    <slider v-model="form.more_icon_size" :max="100"></slider>
                </el-form-item>
            </card-container>
        </el-form>
        <template v-if="isCommon">
            <div class="divider-line"></div>
            <common-styles :value="form.common_style" :is-floating-up="false" @update:value="common_styles_update" />
        </template>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    isCommon: {
        type: Boolean,
        default: true,
    },
});

const state = reactive({
    form: props.value,
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
const tabs_checked_event = (arry: string[], type: number) => {
    form.value.tabs_checked = arry;
    form.value.tabs_direction = type.toString();
};
</script>
<style lang="scss" scoped></style>
