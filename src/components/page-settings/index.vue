<template>
    <div class="model-top">
        <div :class="['roll', { 'page-settings-border': showPage }]" :style="roll_style" @click="page_settings">
            <div class="pt-15 pl-18 pr-22 w pb-6">
                <img class="img" :style="`Filter: brightness(${new_style.function_buttons_type == 'black' ? 0 : 100})`" src="@/assets/images/layout/main/main-top.png" />
            </div>
            <div class="model-head tc re mlr-12 mt-6">
                <div class="flex-row align-c jc-sb gap-16">
                    <div v-if="['1', '2', '3'].includes(form.theme)" class="flex-1 flex-row align-c jc-c h gap-16" :style="[{ 'justify-content': form?.indicator_location || 'center' }, text_style]">
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
                    <div v-else-if="['4', '5'].includes(form.theme)" class="flex-1 flex-row align-c h gap-10">
                        <div class="flex-row gap-2">
                            <icon name="position" size="12" color="0"></icon><span class="size-14 cr-3 text-line-1">{{ form.positioning_name }}</span
                            ><icon v-if="form.is_arrows_show == '1'" name="arrow-right" size="12" color="0"></icon>
                        </div>
                        <template v-if="['5'].includes(form.theme)">
                            <div class="flex-1">
                                <model-search :value="pageData.com_data" :is-page-settings="true"></model-search>
                            </div>
                        </template>
                    </div>
                    <div v-if="!isEmpty(form.icon_setting)" class="flex-row align-c" :class="'gap-' + new_style.img_space">
                        <div v-for="(item, index) in form.icon_setting" :key="index" :style="{ width: new_style.img_size + 'px', height: new_style.img_size + 'px' }">
                            <image-empty v-if="item.img.length > 0" v-model="item.img[0]" :error-img-style="'width: ' + Number(new_style.img_size) / 2 + 'px;height:' + Number(new_style.img_size) / 2 + 'px;'"></image-empty>
                            <icon v-else :name="item.icon" :size="new_style.img_size + ''" color="6"></icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, gradient_computer } from '@/utils';
import { isEmpty } from 'lodash';

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
const position = computed(() => (new_style.value.up_slide_display == '1' ? 'absolute' : 'relative'));
const roll_style = computed(() => {
    let style = ``;
    const { header_background_img, header_background_img_style, header_background_color_list, header_background_direction, header_background_type } = new_style.value;
    if (header_background_type === 'color_image') {
        // 渐变
        const gradient = { color_list: header_background_color_list, direction: header_background_direction };
        // 背景图
        const back = { background_img: header_background_img, background_img_style: header_background_img_style };
        style += gradient_computer(gradient) + background_computer(back);
    } else {
        style += `background: transparent;`;
    }
    return style;
});

const text_style = computed(() => `font-weight:${new_style.value.header_background_title_typeface}; font-size: ${new_style.value.header_background_title_size}px; color: ${new_style.value.header_background_title_color};`);
</script>
<style lang="scss" scoped>
.model-top {
    position: v-bind(position);
    top: 0;
    left: 50%;
    z-index: 3;
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
    z-index: 3;
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
