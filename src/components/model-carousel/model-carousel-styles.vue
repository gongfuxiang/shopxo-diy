<template>
    <div class="common-style-height">
        <el-form :model="form" label-width="80">
            <card-container class="mb-8">
                <div class="mb-12">图片设置</div>
                <el-form-item label="圆角">
                    <radius :value="form" @update:value="radius_change"></radius>
                </el-form-item>
            </card-container>
            <card-container class="mb-8">
                <carousel-indicator :value="form"></carousel-indicator>
            </card-container>
        </el-form>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { pick } from 'lodash';

const props = defineProps({
    value: {
        type: Object,
        default: () => {}
    }
})

const state = reactive({
    form: props.value
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

// 监听整个form对象,发生变化的时候触发emit
const emit = defineEmits(['update:value']);
// 图片圆角
const radius_change = (radius: any) => {
    form.value = Object.assign(form.value, pick(radius, [
        'radius',
        'radius_top_left',
        'radius_top_right',
        'radius_bottom_left',
        'radius_bottom_right',
    ]));
    emit('update:value', form.value);
}
// 通用样式处理
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped>
.auxiliary-line {
    width: 100%;
}
</style>
