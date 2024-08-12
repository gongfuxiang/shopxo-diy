<template>
    <div :style="style_container">
        <div class="video re" :style="style">
            <image-empty v-model="img" class="w" error-img-style="width:10rem;height:10rem;" error-style="padding:15rem 0;"></image-empty>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});

const style = ref('');
const style_container = ref('');
const img = ref('');
watch(
    props.value,
    (newVal, oldValue) => {
        console.log(newVal);
        const new_content = newVal?.content || {};
        const new_style = newVal?.style || {};
        img.value = new_content?.img[0];
        style_container.value = common_styles_computer(new_style.common_style);
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped>
.video {
    min-height: 1rem;
}
</style>
