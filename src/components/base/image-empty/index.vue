<template>
    <el-image :src="image?.url || ''" class="flex align-c jc-c">
        <template #error>
            <div class="image-slot" :style="errorStyle">
                <img :src="error_image" :style="errorImgStyle" />
            </div>
        </template>
    </el-image>
</template>
<script setup lang="ts">
const props = defineProps({
    errorImgStyle: {
        type: String,
        default: () => '',
    },
    errorStyle: {
        type: String,
        default: () => '',
    },
});
const image = defineModel({ type: Object, default: () => {} });
const error_image = ref(new URL(`../../../assets/images/empty.png`, import.meta.url).href);
</script>
<style lang="scss" scoped>
.image-slot {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4fcff;
}
</style>
