<template>
    <div class="footer-nav flex-row jc-c align-c" :class="showFooter ? 'br-2 br-primary' : ''" @click="footer_nav_event">
        <div class="footer-nav-content flex-row jc-c align-c w" :style="style_container">
            <ul class="flex-row jc-sa align-c w">
                <li v-for="(item, index) in nav_content" :key="index" class="flex-1 flex-col jc-c align-c gap-5" @mouseenter="is_hover = index" @mouseleave="is_hover = 0">
                    <div v-if="footerData.content.nav_style !== '2'" class="img re">
                        <div class="img-item abs radius-xs animate-linear w" :class="is_hover != index ? 'active' : ''">
                            <image-empty v-model="item.src[0]" error-img-style="width:1.5rem;height:1.5rem;"></image-empty>
                        </div>
                        <div class="img-item abs radius-xs animate-linear w" :class="is_hover == index ? 'active' : ''">
                            <image-empty v-model="item.src_checked[0]" error-img-style="width:1.5rem;height:1.5rem;"></image-empty>
                        </div>
                    </div>
                    <span v-if="footerData.content.nav_style !== '1'" class="animate-linear size-12 re z-i" :style="is_hover == index ? text_color_checked : default_text_color">{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { common_styles_computer, online_url } from '@/utils';
import { footerNavCounterStore } from '@/store';
const footer_nav_counter_store = footerNavCounterStore();
const props = defineProps({
    showFooter: {
        type: Boolean,
        default: false,
    },
    footerData: {
        type: Object,
        default: () => ({}),
    },
});
const style_container = ref('');
const default_text_color = ref('');
const text_color_checked = ref('');
const is_hover = ref(0);
const nav_content = ref<any[]>([]);

watch(
    props.footerData,
    async (newVal, oldValue) => {
        const new_content = newVal?.content || {};
        const new_style = newVal?.style || {};
        const url = await online_url('/static/app/tabbar/').then((res) => res);
        const clone_nav_content = cloneDeep(new_content.nav_content);
        nav_content.value =
            clone_nav_content.map((item: any) => {
                item.src = item.src.map((img: any) => {
                    return {
                        ...img,
                        url: item.src.includes('/') ? img.url : url + img.url,
                    };
                });
                item.src_checked = item.src_checked.map((img: any) => {
                    return {
                        ...img,
                        url: item.src_checked.includes('/') ? img.url : url + img.url,
                    };
                });
                return item;
            }) || [];
        default_text_color.value = 'color:' + new_style.default_text_color || 'rgba(0, 0, 0, 1)';
        text_color_checked.value = 'color:' + new_style.text_color_checked || 'rgba(204, 204, 204, 1)';

        style_container.value = common_styles_computer(new_style.common_style);
        let footer_height = new_style.common_style.padding_top + new_style.common_style.padding_bottom + new_style.common_style.margin_top + new_style.common_style.margin_bottom + 50;
        if (footer_height >= 70) {
            footer_height = footer_height;
        } else {
            footer_height = 70;
        }
        footer_nav_counter_store.padding_footer_computer(footer_height);
    },
    { immediate: true, deep: true }
);
const emits = defineEmits(['footer-nav']);
const footer_nav_event = () => {
    emits('footer-nav');
};
</script>
<style lang="scss" scoped>
.footer-nav {
    width: 39rem;
    margin: 0 auto;
    padding: 0rem;
    cursor: pointer;
    background-color: transparent;
    .footer-nav-content {
        min-height: 7rem;
        .img {
            width: 2rem;
            height: 2rem;
            .img-item {
                width: 2.2rem;
                height: 2.2rem;
                opacity: 0;
                &.active {
                    opacity: 1;
                }
            }
        }
    }
}
.br-2 {
    &::before {
        content: '';
        position: absolute;
        border: 0.2rem solid $cr-main;
        inset: 0;
        width: calc(100% + 0.4rem);
        height: calc(100% + 0.4rem);
    }
}
</style>
