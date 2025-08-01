<template>
    <!-- 轮播 -->
    <template v-if="magicType === 'carousel'"> 
        <model-carousel-content :value="form.content" :is-nest="true"></model-carousel-content>
    </template>
    <!-- 导航组 -->
    <template v-else-if="magicType === 'nav_group'"> 
        <model-nav-group-content :value="form.content" :is-nest="true"></model-nav-group-content>
    </template>
    <!-- 自定义 -->
    <template v-else-if="magicType === 'custom'"> 
        <model-custom-content :value="form.content" :is-nest="true"></model-custom-content>
    </template>
    <!-- 商品魔方 -->
    <template v-else-if="magicType === 'goods_magic'"> 
       <model-goods-magic-content :value="form.content" :styles="form.style" :default-config="data_config" :is-nest="true"></model-goods-magic-content>
    </template>
    <!-- 图片魔方 -->
    <template v-else-if="magicType === 'img_magic'"> 
        <model-img-magic-content :value="form.content" :is-nest="true"></model-img-magic-content>
    </template>
    <!-- 热区 -->
    <template v-else-if="magicType === 'hot_zone'"> 
        <model-hot-zone-content :value="form.content" :is-nest="true"></model-hot-zone-content>
    </template>
    <!-- 文章列表 -->
    <template v-else-if="magicType === 'article_list'"> 
        <model-article-list-content :value="form.content" :styles="form.style" :default-config="data_config" :is-nest="true"></model-article-list-content>
    </template>
    <!-- 商品列表 -->
    <template v-else-if="magicType === 'goods_list'"> 
        <model-goods-list-content :value="form.content" :styles="form.style" :default-config="data_config" :is-nest="true"></model-goods-list-content>
    </template>
    <!-- 视频 -->
    <template v-else-if="magicType === 'video'"> 
        <model-video-content :value="form.content" :is-nest="true"></model-video-content>
    </template>
</template>

<script lang="ts" setup>
const props = defineProps({
    magicType: {
        type: String,
        default: '',
    },
    value: {
        type: Object,
        default: () => {},
    }
});

const data_config = reactive({
    // 图片不同风格下的圆角
    img_radius_0: 4,
    img_radius_1: 0,
});

const form = ref(props.value);
watch(() => props.value, (newVal) => {
    form.value = newVal;
}, {immediate: true, deep: true});
</script>

