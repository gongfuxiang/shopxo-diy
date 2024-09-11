<template>
    <div class="common-style-height">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">图片设置</div>
                <el-form-item label="圆角">
                    <radius :value="form" @update:value="radius_change"></radius>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">轮播设置</div>
                <el-form-item label="高度设置">
                    <slider v-model="form.height" :max="1000"></slider>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <carousel-indicator :value="form"></carousel-indicator>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">视频按钮是否显示</div>
                <el-form-item label="是否显示">
                    <el-switch v-model="form.is_show" active-value="1" inactive-value="0"/>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form" @update:value="radius_change"></radius>
                </el-form-item>
            </card-container>
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { pick } from 'lodash';

const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});

const state = reactive({
    form: props.value,
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

// 监听整个form对象,发生变化的时候触发emit
const emit = defineEmits(['update:value']);
// 图片圆角
const radius_change = (radius: any) => {
    form.value = Object.assign(form.value, pick(radius, ['radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right']));
    emit('update:value', form.value);
};
// 通用样式处理
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>
