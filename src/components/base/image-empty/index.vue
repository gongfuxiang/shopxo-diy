<template>
    <el-image :src="is_obj(image) ? image?.url || '' : image" class="flex align-c jc-c w h radius-sm" :fit="fit" @load="on_load">
        <template #error>
            <div class="image-slot" :style="errorStyle">
                <img :src="error_image" :style="errorImgStyle" />
            </div>
        </template>
    </el-image>
</template>
<script setup lang="ts">
import { is_obj } from '@/utils';
import type { ImageProps } from 'element-plus';
import { commonStore } from '@/store';
const common_store = commonStore();
const props = defineProps({
    errorImgStyle: {
        type: String,
        default: () => '',
    },
    errorStyle: {
        type: String,
        default: () => '',
    },
    fit: {
        type: String as PropType<ImageProps['fit']>,
        default: () => 'cover',
    },
});
const image = defineModel({ type: [Object, String], default: () => {} });
const error_image = ref(common_store.common.config.attachment_host + `/static/diy/images/empty.png`);
const emit = defineEmits(['load']);
const on_load = (e: any) => {
    const { width, height } = e.target;
    emit('load', width, height);
};
</script>
<style lang="scss" scoped>
.image-slot {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4fcff;
    img {
        width: 100%;
        padding: 0.4rem;
    }
}
</style>
