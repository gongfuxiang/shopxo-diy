<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">数据魔方</div>
                <el-form-item label="数据间距">
                    <slider v-model="form.image_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="数据圆角">
                    <radius :value="form.data_radius"></radius>
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
</script>
<style lang="scss" scoped>
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
