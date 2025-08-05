<template>
    <div>
        <!-- 轮播 -->
        <template v-if="magicType === 'carousel'">
            <model-carousel-styles :value="form.style" :content="form.content" :is-common-style="false" :is-tabs-magic="true"></model-carousel-styles>
        </template>
        <!-- 导航组 -->
        <template v-else-if="magicType === 'nav_group'"> 
            <model-nav-group-styles :value="form.style" :content="form.content" :is-common-style="false"></model-nav-group-styles>
        </template>
        <!-- 自定义 -->
        <template v-else-if="magicType === 'custom'"> 
            <model-custom-styles :value="form.style" :content="form.content" :is-common-style="false" :is-tabs-magic="true"></model-custom-styles>
        </template>
        <!-- 商品魔方 -->
        <template v-else-if="magicType === 'goods_magic'"> 
            <model-goods-magic-styles :value="form.style" :content="form.content" :default-config="data_config" :is-common-style="false"></model-goods-magic-styles>
        </template>
        <!-- 图片魔方 -->
        <template v-else-if="magicType === 'img_magic'"> 
            <model-img-magic-styles :value="form.style" :content="form.content" :is-common-style="false"></model-img-magic-styles>
        </template>
        <!-- 热区 -->
        <template v-else-if="magicType === 'hot_zone'"> 
            <model-hot-zone-styles :value="form.style" :is-common-style="false"></model-hot-zone-styles>
        </template>
        <!-- 文章列表 -->
        <template v-else-if="magicType === 'article_list'"> 
            <model-article-list-styles :value="form.style" :content="form.content" :default-config="data_config" :is-common-style="false"></model-article-list-styles>
        </template>
        <!-- 商品列表 -->
        <template v-else-if="magicType === 'goods_list'"> 
            <model-goods-list-styles :value="form.style" :content="form.content" :default-config="data_config" :is-common-style="false"></model-goods-list-styles>
        </template>
        <!-- 视频 -->
        <template v-else-if="magicType === 'video'"> 
            <model-video-styles :value="form.style" :content="form.content" :is-common-style="false"></model-video-styles>
        </template>
        <!-- 公共样式 -->
        <tabs-magic-common :value="form.style"></tabs-magic-common>
    </div>
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

