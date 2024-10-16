<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">图片魔方</div>
                <el-form-item v-if="new_content.style_actived !== 10" label="图片间距">
                    <slider v-model="form.image_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="图片圆角">
                    <radius :value="form" @update:value="radius_change"></radius>
                </el-form-item>
                <template v-if="new_content.style_actived === 10">
                    <el-form-item label="限制尺寸">
                        <el-switch v-model="form.limit_size" active-value="1" inactive-value="0" />
                    </el-form-item>
                    <el-form-item v-if="form.limit_size == '1'" label="图片高度">
                        <slider v-model="form.image_height" :max="500"></slider>
                    </el-form-item>
                </template>
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
    },
    content: {
        type: Object,
        default: () => ({}),
    }
});

// 默认值
const state = reactive({
    form: props.value,
    new_content: props.content
});
// 如果需要解构，确保使用toRefs
const { form, new_content } = toRefs(state);

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
