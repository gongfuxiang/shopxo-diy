<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <card-container class="mb-8">
                <div class="mb-12">图片魔方</div>
                <el-form-item label="图片间距">
                    <slider v-model="form.image_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="图片圆角">
                    <radius :value="form" @update:value="radius_change"></radius>
                </el-form-item>
            </card-container>
        </el-form>
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
const radius_change = (radius: any) => {
    form.value = Object.assign(form.value, pick(radius, [
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
