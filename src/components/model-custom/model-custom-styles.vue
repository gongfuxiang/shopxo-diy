<template>
    <div class="w">
        <template v-if="['1', '2'].includes(data.data_source_direction)">
            <el-form :model="form" label-width="70">
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
            </el-form>
            <div class="bg-f5 divider-line" />
        </template>
        <common-styles :value="form.common_style" />
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
    }
});
const state = reactive({
    form: props.value,
    data: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);

</script>
<style lang="scss" scoped>
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
