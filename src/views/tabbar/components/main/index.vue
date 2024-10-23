<template>
    <!-- 视图渲染 -->
    <div class="main re">
        <div class="model">
            <div class="model-content box-shadow-sm">
                <div class="bg-f re">
                    <image-empty v-model="header_image" error-img-style="width:100%;"></image-empty>
                </div>
                <div class="re">
                    <image-empty v-model="content_image" error-img-style="width:100%;height:100%;"></image-empty>
                </div>
                <!-- 底部区域 -->
                <div class="model-bottom">
                    <footer-nav :footer-data="footer_nav"></footer-nav>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { commonStore } from '@/store';
const common_store = commonStore();
const props = defineProps({
    footer: {
        type: Object,
        default: () => {},
    },
});
const footer_nav = ref(props.footer);
const header_image = ref(common_store.common.config.attachment_host + `/static/diy/images/components/page-settings/theme-1.png`);
const content_image = ref(common_store.common.config.attachment_host + `/static/diy/images/tabbar/phone-temp-bg.jpg`);
watch(
    () => props.footer,
    (newValue) => {
        footer_nav.value = newValue;
    },
    { deep: true }
);
//#endregion
</script>

<style lang="scss" scoped>
.main {
    flex: 1;
    position: relative;
    height: 100%;
    width: 100%;
    .model {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        height: 100%;
        padding: 2rem 0;
        .model-content {
            position: relative;
            max-height: 84.6rem;
            height: 100%;
            width: 39rem;
            overflow: hidden;
            .model-bottom {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                z-index: 2;
                .roll {
                    border-top: 0.1rem solid #f5f5f5;
                    height: 4rem;
                    width: 39rem;
                    background: #fff;
                    margin: 0 auto;
                }
            }
        }
    }
}
</style>
