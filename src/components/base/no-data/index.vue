<template>
    <div class="flex-col align-c jc-c w h bg-f" :style="container_style">
        <img :style="style" :src="no_data_image" />
        <p class="cr-c mt-12" :style="text_style">{{ text }}</p>
    </div>
</template>

<script setup lang="ts">
import { commonStore } from '@/store';
const common_store = commonStore();
interface Props {
    imgWidth?: string;
    height?: string;
    size?: string;
    text?: string;
}
const props = withDefaults(defineProps<Props>(), {
    imgWidth: '100px',
    height: '200px',
    size: '14px',
    text: '暂无数据',
});
const no_data_image = ref(common_store.common.config.attachment_host + `/static/diy/images/no-data.png`);
const style = computed(() => {
    return {
        width: props.imgWidth,
    };
});
const container_style = computed(() => {
    return {
        height: props.height,
    };
});
const text_style = computed(() => {
    return {
        fontSize: props.size,
    };
});
</script>
