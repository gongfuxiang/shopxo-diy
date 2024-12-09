<template>
    <div class="w">
        <template v-if="type == '1'">
            <model-custom-content :value="value.content" :all-value="allValue" @data_source_change="data_source_change"></model-custom-content>
        </template>
        <template v-if="type == '2'">
            <model-custom-styles :value="value.style" :content="value.content" ></model-custom-styles>
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
<style lang="scss" scoped></style>
