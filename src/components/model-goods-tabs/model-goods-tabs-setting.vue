<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-goods-tabs-content :value="form.content" :tab-style="form.style" :default-config="data_config"></model-goods-tabs-content>
        </template>
        <template v-if="type == '2'">
            <model-goods-tabs-styles :value="form.style" :content="form.content" :default-config="data_config"></model-goods-tabs-styles>
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
const form = ref(props.value);
</script>
<style lang="scss" scoped>
.auxiliary-line-setting {
    width: 100%;
}
</style>
