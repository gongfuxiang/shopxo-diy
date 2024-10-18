<template>
    <div :style="style_container">
        <div :style="style_img_container">
            <div class="video re" :style="style">
                <template v-if="video && !video_img">
                    <video :src="video" class="w h"></video>
                </template>
                <template v-else>
                    <image-empty v-model="video_img" error-img-style="width:60px;height:60px;"></image-empty>
                </template>
                <img src="@/assets/images/components/model-video/video.png" class="middle box-shadow-sm round" width="60" height="60" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, common_img_computer } from '@/utils';
/**
 * @description: 视频 （渲染）
 * @param value{Object} 传过来的数据，用于数据渲染
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});

const style = ref('');
const style_container = ref('');
const style_img_container = ref('');
const video_img = ref('');
const video = ref('');
watch(
    props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content || {};
        const new_style = newVal?.style || {};
        video_img.value = new_content?.video_img[0]?.url || '';
        video.value = new_content?.video[0]?.url || '';

        // 视频比例
        let video_ratio = ``;
        if (new_content?.video_ratio == '4:3') {
            video_ratio = `height: 292px;`;
        } else if (new_content?.video_ratio == '1:1') {
            video_ratio = `height: 388px;`;
        } else {
            // 16:9
            video_ratio = `height: 220px;`;
        }
        style.value = video_ratio;
        style_container.value = common_styles_computer(new_style.common_style);
        style_img_container.value = common_img_computer(new_style.common_style);        
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped>
.video {
    height: 22rem;
}
</style>
