<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">数据魔方</div>
                <el-form-item label="数据间距">
                    <slider v-model="form.image_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="数据圆角">
                    <radius :value="form.data_radius" @update:value="data_radius_change"></radius>
                </el-form-item>
                <el-form-item label="图片圆角">
                    <radius :value="form.img_radius" @update:value="img_radius_change"></radius>
                </el-form-item>
            </card-container>
        </el-form>
        <div class="bg-f5 divider-line" />
        <common-styles :value="form.common_style" @update:value="common_style_update" />
    </div>
</template>
<script setup lang="ts">
import { pick } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    }
});

// 默认值
const state = reactive({
    form: props.value
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

const common_style_update = (value: any) => {
    form.value.common_style = value;
};
// 内容圆角
const img_radius_change = (radius: any) => {
    form.value.img_radius = Object.assign(form.value.img_radius, pick(radius, [
        'radius',
        'radius_top_left',
        'radius_top_right',
        'radius_bottom_left',
        'radius_bottom_right',
    ]));
}
// 内容圆角
const data_radius_change = (radius: any) => {
    form.value.data_radius = Object.assign(form.value.data_radius, pick(radius, [
        'radius',
        'radius_top_left',
        'radius_top_right',
        'radius_bottom_left',
        'radius_bottom_right',
    ]));
}
</script>
<style lang="scss" scoped>
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>
