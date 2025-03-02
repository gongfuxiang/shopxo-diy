<template>
    <div class="re w h oh">
        <template v-if="video && !video_img">
            <video :src="video" class="w h" :style="video_style"></video>
        </template>
        <template v-else>
            <image-empty v-model="video_img" :style="video_style" error-img-style="width:60px;height:60px;"></image-empty>
        </template>
        <img :src="video_src" class="middle box-shadow-sm round" width="50" height="50" />
    </div>
</template>
<script setup lang="ts">
import { commonStore } from '@/store';
import { padding_computer, radius_computer } from '@/utils';
const common_store = commonStore();
/**
 * @description: 视频 （渲染）
 * @param value{Object} 传过来的数据，用于数据渲染
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    dataStyle: {
        type: Object,
        default: () => ({}),
    }
});

const video_src = ref(common_store.common.config.attachment_host + `/static/diy/images/components/model-video/video.png`);
const video_img = computed(() => {
    if (props.value.video_img.length > 0) {
        return props.value.video_img[0]?.url;
    } else {
        return '';
    }
});
const video = computed(() => {
    if (props.value.video.length > 0) {
        return props.value.video[0]?.url;
    } else {
        return '';
    }
});
// 公共样式
const video_style = computed(() => radius_computer(props.dataStyle.img_radius));
</script>
<style lang="scss" scoped>
video {
    object-fit: cover;
}
</style>
