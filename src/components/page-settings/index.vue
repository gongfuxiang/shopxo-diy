<template>
    <div class="model-top">
        <div :class="['roll', { 'page-settings-border': showPage }]" :style="roll_style" @click="page_settings">
            <div class="pt-15 pl-18 pr-22 w pb-6">
                <img class="img" :style="`Filter: brightness(${ new_style.function_buttons_type == 'black' ? 0 : 100 })`" src="@/assets/images/layout/main/main-top.png" />
            </div>
            <div class="model-head tc re mlr-12 mt-6">
                <div v-if="['1', '2', '3'].includes(form.theme)" class="flex align-c jc-c h gap-16" :style="[{ 'justify-content': form?.indicator_location || 'center', 'padding-right': form.indicator_location == 'flex-end' || form.theme == 3 ? '95px' : '0'}, text_style]">
                    <template v-if="['2', '3'].includes(form.theme)">
                        <div class="logo-outer-style"><image-empty v-model="form.logo[0]" class="logo-style" error-img-style="width:2rem;height:2rem;"></image-empty></div>
                    </template>
                    <div v-if="['1', '2'].includes(form.theme)">{{ form.title }}</div>
                    <template v-if="['3', '5'].includes(form.theme)">
                        <div class="flex-1">
                            <model-search :value="pageData.com_data" :is-page-settings="true"></model-search>
                        </div>
                    </template>
                </div>
                <div v-else-if="['4', '5'].includes(form.theme)" class="flex align-c h gap-10">
                    <div class="flex-row gap-2"><icon name="position" size="12" color="0"></icon><span class="size-14 cr-3 text-line-1">{{ form.positioning_name }}</span><icon v-if="form.is_arrows_show" name="arrow-right" size="12" color="0"></icon></div>
                    <template v-if="['5'].includes(form.theme)">
                        <div class="flex-1" style="padding-right:95px">
                            <model-search :value="pageData.com_data" :is-page-settings="true"></model-search>
                        </div>
                    </template>
                </div>
                <div class="model-head-icon">
                    <img class="function-icon" :src="url_computer(new_style.function_buttons_type == 'black' ? 'function-icon-black' : 'function-icon-white')" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, gradient_computer } from '@/utils';
interface Props {
    pageData: any;
    showPage: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    pageData: () => ({}),
    showPage: true,
});
const emits = defineEmits(['page_settings']);
const page_settings = () => {
    emits('page_settings');
};
const form = computed(() => props.pageData.com_data.content);
const new_style = computed(() => props.pageData.com_data.style);
const position = computed(() => new_style.value.up_slide_display ? 'absolute' : 'relative');
const roll_style = computed(() => {
    let style = ``;
    const { header_background_img_url, header_background_img_style, header_background_color_list, header_background_direction, header_background_type } = new_style.value;
    if (header_background_type === 'color_image') {
        // 渐变
        const gradient = { color_list: header_background_color_list, direction: header_background_direction };
        // 背景图
        const back = { background_img_url: header_background_img_url, background_img_style: header_background_img_style };
        style += gradient_computer(gradient) + background_computer(back);
    } else {
        style += `background: transparent;`;
    }
    return style;
});
const url_computer = (name: string) => {
    const new_url = ref(new URL(`../../assets/images/layout/main/${name}.png`, import.meta.url).href).value;
    return new_url;
};
const text_style = computed(() => `font-weight:${ new_style.value.header_background_title_typeface }; font-size: ${ new_style.value.header_background_title_size }px; color: ${ new_style.value.header_background_title_color };`);
</script>
<style lang="scss" scoped>
.model-top {
    position: v-bind(position);
    top: 0;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
    .roll {
        width: 39rem;
        padding-bottom: 0.9rem;
        margin: 0 auto;
        cursor: pointer;
    }
    .img {
        width: 34rem;
    }
}
.model-head {
    height: 3.2rem;
    overflow: hidden;
}
.model-head-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 3.2rem;
    .function-icon {
        height: 3.2rem;
    }
}
.page-settings-border {
    // border: 0.2rem solid $cr-main;
    position: relative;
    box-shadow: 0px 0 0px 0.2rem $cr-main !important;
    z-index: 1;
    box-sizing: border-box;
}
.logo-outer-style {
    height: 3.2rem;
    .logo-style {
        max-height: 3.2rem;
        max-width: 100%;
        :deep(.image-slot) {
            height: 3.2rem;
            width: 3.2rem;
        }
    }
}

</style>
