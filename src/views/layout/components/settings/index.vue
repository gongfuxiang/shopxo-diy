<template>
    <!-- 顶部导航栏 -->
    <div class="settings">
        <card-container class="settings-title flex-row jc-sb align-c mb-8" padding="2.1rem 3.8rem">
            <div class="title">{{ value.name }}</div>
            <el-radio-group v-model="radio" class="radio-group" size="large" is-button>
                <el-radio-button class="radio-item" value="1">内容</el-radio-button>
                <el-radio-button class="radio-item" value="2">样式</el-radio-button>
            </el-radio-group>
        </card-container>
        <div ref="scrollTop" class="setting-content" :style="value.key == 'custom' ? '' : 'background-color: #fff;'">
            <!-- 基础组件 -->
            <!-- 页面设置 -->
            <template v-if="value.key == 'page-settings'">
                <page-setting :type="radio" :value="value.com_data"></page-setting>
            </template>
            <!-- 基础组件 -->
            <template v-else-if="value.key == 'video'">
                <model-video-setting :type="radio" :value="value.com_data"></model-video-setting>
            </template>
            <!-- 用户信息 -->
            <template v-else-if="value.key == 'user-info'">
                <model-user-info-setting :type="radio" :value="value.com_data"></model-user-info-setting>
            </template>
            <!-- 文章列表 -->
            <template v-else-if="value.key == 'article-list'">
                <model-article-list-setting :type="radio" :value="value.com_data"></model-article-list-setting>
            </template>
            <!-- 文章选项卡 -->
            <template v-else-if="value.key == 'article-tabs'">
                <model-article-tabs-setting :type="radio" :value="value.com_data"></model-article-tabs-setting>
            </template>
            <!-- 搜索框 -->
            <template v-else-if="value.key == 'search'">
                <model-search-setting :type="radio" :value="value.com_data"></model-search-setting>
            </template>
            <!-- 导航组 -->
            <template v-else-if="value.key == 'nav-group'">
                <model-nav-group-setting :type="radio" :value="value.com_data"></model-nav-group-setting>
            </template>
            <!-- 轮播图 -->
            <template v-else-if="value.key == 'carousel'">
                <model-carousel-setting :type="radio" :value="value.com_data"></model-carousel-setting>
            </template>
            <!-- 公告 -->
            <template v-else-if="value.key == 'notice'">
                <model-notice-setting :type="radio" :value="value.com_data"></model-notice-setting>
            </template>
            <!-- 选项卡 -->
            <template v-else-if="value.key == 'tabs'">
                <model-tabs-setting :type="radio" :value="value.com_data"></model-tabs-setting>
            </template>
            <!-- 选项卡轮播 -->
            <template v-else-if="value.key == 'tabs-carousel'">
                <model-tabs-carousel-setting :type="radio" :value="value.com_data"></model-tabs-carousel-setting>
            </template>
            <!-- 商品列表 -->
            <template v-else-if="value.key == 'goods-list'">
                <model-goods-list-setting :type="radio" :value="value.com_data"></model-goods-list-setting>
            </template>
            <!-- 商品选项卡 -->
            <template v-else-if="value.key == 'goods-tabs'">
                <model-goods-tabs-setting :type="radio" :value="value.com_data"></model-goods-tabs-setting>
            </template>
            <!-- 数据选项卡 -->
            <template v-else-if="value.key == 'data-tabs'">
                <model-data-tabs-setting :type="radio" :value="value.com_data" @set_offset_top="set_offset_top"></model-data-tabs-setting>
            </template>
            <!-- 图片魔方 -->
            <template v-else-if="value.key == 'img-magic'">
                <model-img-magic-setting :type="radio" :value="value.com_data"></model-img-magic-setting>
            </template>
            <!-- 图片魔方 -->
            <template v-else-if="value.key == 'data-magic'">
                <model-data-magic-setting :type="radio" :value="value.com_data"></model-data-magic-setting>
            </template>
            <!-- 热区 -->
            <template v-else-if="value.key == 'hot-zone'">
                <model-hot-zone-setting :type="radio" :value="value.com_data"></model-hot-zone-setting>
            </template>
            <!-- 自定义 -->
            <template v-else-if="value.key == 'custom'">
                <model-custom-setting :type="radio" :value="value.com_data" :all-value="value"></model-custom-setting>
            </template>
            <!-- 底部导航 -->
            <template v-else-if="value.key == 'footer-nav'">
                <footer-nav-setting :type="radio" :value="value.com_data"></footer-nav-setting>
            </template>
            <!-- 营销组件 -->
            <!-- 优惠券 -->
            <template v-else-if="value.key == 'coupon'">
                <model-coupon-setting :type="radio" :value="value.com_data"></model-coupon-setting>
            </template>
            <template v-else-if="value.key == 'seckill'">
                <model-seckill-setting :type="radio" :value="value.com_data"></model-seckill-setting>
            </template>
            <!-- 工具组件 -->
            <!-- 辅助空白 -->
            <template v-else-if="value.key == 'auxiliary-blank'">
                <model-auxiliary-blank-setting :type="radio" :value="value.com_data"></model-auxiliary-blank-setting>
            </template>
            <!-- 辅助线 -->
            <template v-else-if="value.key == 'row-line'">
                <model-auxiliary-line-setting :type="radio" :value="value.com_data"></model-auxiliary-line-setting>
            </template>
            <!--富文本 -->
            <template v-else-if="value.key == 'rich-text'">
                <model-rich-text-setting :type="radio" :value="value.com_data"></model-rich-text-setting>
            </template>
            <!-- 标题 -->
            <template v-else-if="value.key == 'title'">
                <model-title-setting :type="radio" :value="value.com_data"></model-title-setting>
            </template>
            <!-- 悬浮按钮 -->
            <template v-else-if="value.key == 'float-window'">
                <model-float-window-setting :type="radio" :value="value.com_data"></model-float-window-setting>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const radio = ref('1'); // 创建一个响应式的数字变量，初始值为0

const scrollTop = ref<HTMLElement | null>(null);
const set_offset_top = (scrollY: number) => {
    if (scrollTop.value) {
        // 选中的滚动到指定位置
        scrollTop.value.scrollTo({ top: scrollY - 160, behavior: 'smooth' });
    }
};
</script>
<style lang="scss" scoped>
.settings {
    width: 46rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .settings-title {
        height: 7.8rem;
        .title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
        }
        .radio-group {
            background: #f4f4f4;
            border-radius: 100rem;
            .el-radio-button {
                overflow: hidden;
                border-radius: 100rem;
                :deep(.el-radio-button__inner) {
                    border: 0;
                    background: #f4f4f4;
                }
                :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
                    background: $cr-primary;
                }
            }
        }
    }
    .setting-content {
        height: calc(100vh - 14.8rem);
        overflow: auto;
    }
    :deep(.el-input-number) {
        width: 100%;
    }
}
@media screen and (max-width: 1560px) {
    .settings {
        width: 40rem;
    }
}
</style>
