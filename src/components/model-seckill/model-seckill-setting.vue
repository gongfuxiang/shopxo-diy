<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-seckill-content :value="value.content" :styles="value.style" :default-config="data_config"></model-seckill-content>
        </template>
        <template v-if="type == '2'">
            <model-seckill-styles :value="value.style" :content="value.content" :default-config="data_config"></model-seckill-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    type: {
        type: String,
        default: '1',
    },
    value: {
        type: Object,
        default: () => ({}),
    },
});
const data_config = reactive({
    // 图片不同风格下的圆角
    img_radius_0: 4,
    img_radius_1: 0,
});
</script>
<style lang="scss" scoped>
.auxiliary-line-setting {
    width: 100%;
}
</style>
