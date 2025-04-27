<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-goods-magic-content :value="form.content" :styles="form.style" :default-config="data_config" @data_source_change="data_source_change"></model-goods-magic-content>
        </template>
        <template v-if="type == '2'">
            <model-goods-magic-styles :value="form.style" :content="form.content" :default-config="data_config"></model-goods-magic-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from 'lodash';
const props = defineProps({
    type: {
        type: String,
        default: '1',
    },
    value: {
        type: Object,
        default: () => ({}),
    },
    allValue: {
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
const all_content = ref(props.allValue);
const data_source_change = (name: string) => {
    // 改变所有内容的名称
    if (!isEmpty(name)) {
        all_content.value.mark_name = name;
    } else {
        all_content.value.mark_name = '';
    }   
}
</script>
<style lang="scss" scoped>
.auxiliary-line-setting {
    width: 100%;
}
</style>
