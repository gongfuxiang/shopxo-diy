<template>
    <div class="model-top">
        <div :class="[{ 'page-settings-border': showPage }]" :style="roll_style" @click="page_settings">
            <div class="roll re" :style="roll_img_style">
                <div class="w h abs up_slide_bg" :style="up_slide_style">
                    <div class="w h" :style="up_slide_img_style"></div>
                </div>
                <div class="pt-15 pl-18 pr-22 w pb-6">
                    <img class="img" :style="`Filter: brightness(${new_style.function_buttons_type == '0' ? 0 : 100})`" src="@/assets/images/layout/main/main-top.png" />
                </div>
                <div class="model-head tc re mlr-12 mt-6">
                    <div class="flex-col" :style="`gap: ${ new_style.data_alone_row_space }px`">
                        <div class="model-head-content flex-row align-c jc-sb gap-16 re">
                            <div v-if="['1', '2', '3'].includes(form.theme)" class="flex-1">
                                <div class="flex-1 flex-row align-c jc-c h gap-16" :class="position_class" :style="[{ 'justify-content': form?.indicator_location || 'center' }, text_style]">
                                    <template v-if="['2', '3'].includes(form.theme) && form.logo.length > 0">
                                        <div class="logo-outer-style">
                                            <img class="logo-style" :src="form.logo[0].url" />
                                        </div>
                                    </template>
                                    <div v-if="['1', '2'].includes(form.theme)">{{ form.title }}</div>
                                    <template v-if="['3', '5'].includes(form.theme) && !is_search_alone_row">
                                        <div class="flex-1">
                                            <model-search :value="pageData.com_data" :is-page-settings="true"></model-search>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div v-else-if="['4', '5'].includes(form.theme)" class="flex-1 flex-row align-c h gap-10">
                                <div class="model-head-location flex-row gap-2 align-c" :style="'color:' + new_style.position_color">
                                    <template v-if="form.is_location_left_icon_show == '1'">
                                        <image-empty v-if="form.location_left_img.length > 0" v-model="form.location_left_img[0]" fit="contain" :error-img-style="'width: 12px; height:12px'"></image-empty>
                                        <icon v-else :name="form.location_left_icon" size="12"></icon>
                                    </template>
                                    <span class="location-name size-14 text-line-1">{{ form.positioning_name }}</span>
                                    <template v-if="form.is_location_right_icon_show == '1'">
                                        <image-empty v-if="form.location_right_img.length > 0" v-model="form.location_right_img[0]" fit="contain" :error-img-style="'width: 12px; height:12px'"></image-empty>
                                        <icon v-else :name="form.location_right_icon" size="12"></icon>
                                    </template>
                                </div>
                                <template v-if="['5'].includes(form.theme) && !is_search_alone_row">
                                    <div class="flex-1">
                                        <model-search :value="pageData.com_data" :is-page-settings="true"></model-search>
                                    </div>
                                </template>
                            </div>
                            <div v-if="!isEmpty(form.icon_setting) && !is_icon_alone_row" class="flex-row align-c" :class="'gap-' + new_style.img_space">
                                <div v-for="(item, index) in form.icon_setting" :key="index" :style="{ width: new_style.img_size + 'px', height: new_style.img_size + 'px' }">
                                    <image-empty v-if="item.img.length > 0" v-model="item.img[0]" fit="contain" :error-img-style="'width: ' + Number(new_style.img_size) / 2 + 'px;height:' + Number(new_style.img_size) / 2 + 'px;'"></image-empty>
                                    <icon v-else :name="item.icon" :size="new_style.img_size + ''" :color="new_style.img_color"></icon>
                                </div>
                            </div>
                        </div>
                        <div v-if="is_search_alone_row || is_icon_alone_row" class="model-head-content flex-row align-c gap-16">
                            <template v-if="['3', '5'].includes(form.theme) && is_search_alone_row">
                                <div class="flex-1">
                                    <model-search :value="pageData.com_data" :is-page-settings="true"></model-search>
                                </div>
                            </template>
                            <div v-if="!isEmpty(form.icon_setting) && is_icon_alone_row" class="flex-row align-c" :class="'gap-' + new_style.img_space">
                                <div v-for="(item, index) in form.icon_setting" :key="index" :style="{ width: new_style.img_size + 'px', height: new_style.img_size + 'px' }">
                                    <image-empty v-if="item.img.length > 0" v-model="item.img[0]" fit="contain" :error-img-style="'width: ' + Number(new_style.img_size) / 2 + 'px;height:' + Number(new_style.img_size) / 2 + 'px;'"></image-empty>
                                    <icon v-else :name="item.icon" :size="new_style.img_size + ''" :color="new_style.img_color"></icon>
                                </div>
                            </div>
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
    scollTop: number;
}
const props = withDefaults(defineProps<Props>(), {
    pageData: () => ({}),
    showPage: true,
    scollTop: 0,
});
const emits = defineEmits(['page_settings']);
const page_settings = () => {
    emits('page_settings');
};
const form = computed(() => props.pageData.com_data.content);
const new_style = computed(() => props.pageData.com_data.style);

const is_search_alone_row = computed(() => form.value.data_alone_row_value.includes('search'));
const is_icon_alone_row = computed(() => form.value.data_alone_row_value.includes('icon'));

const position = computed(() => (new_style.value.up_slide_display == '1' ? 'absolute' : 'relative'));
const roll_style = computed(() => {
    let style = ``;
    const { header_background_color_list, header_background_direction, header_background_type } = new_style.value;
    if (header_background_type === 'color_image') {
        // 渐变
        const gradient = { color_list: header_background_color_list, direction: header_background_direction };
        style += gradient_computer(gradient);
    } else {
        style += `background: transparent;`;
    }
    return style;
});

const roll_img_style = computed(() => {
    let style = ``;
    const { header_background_img, header_background_img_style, header_background_type } = new_style.value;
    if (header_background_type === 'color_image') {
        // 背景图
        const back = { background_img: header_background_img, background_img_style: header_background_img_style };
        style += background_computer(back);
    }
    return style;
});

const up_slide_style = computed(() => {
    let style = ``;
    if (props.scollTop > 20) {
        const { up_slide_background_color_list, up_slide_background_direction } = new_style.value;
        // 渐变
        const gradient = { color_list: up_slide_background_color_list, direction: up_slide_background_direction };
        style += gradient_computer(gradient) + `opacity: ${(props.scollTop - 20) / 90 > 1 ? 1 : ((props.scollTop - 20) / 90).toFixed(2)};`;
    }
    return style;
});

const up_slide_img_style = computed(() => {
    let style = ``;
    if (props.scollTop > 20) {
        const { up_slide_background_img = '', up_slide_background_img_style = '' } = new_style.value;
        // 背景图
        const back = { background_img: up_slide_background_img, background_img_style: up_slide_background_img_style };
        style += background_computer(back);
    }
    return style;
});

const text_style = computed(() => `font-weight:${new_style.value.header_background_title_typeface}; font-size: ${new_style.value.header_background_title_size}px; color: ${new_style.value.header_background_title_color};`);
const position_class = computed(() => (form.value?.indicator_location == 'center' ? `indicator-center` : ''));
</script>
<style lang="scss" scoped>
.model-top {
    position: v-bind(position);
    top: 0;
    left: 50%;
    z-index: 3;
    transform: translateX(-50%);
    width: 39rem;
    .roll {
        padding-bottom: 1rem;
        margin: 0 auto;
        cursor: pointer;
        z-index: 1;
    }
    .img {
        width: 34rem;
    }
}
.model-head {
    // height: 3.2rem;
    overflow: hidden;
    .model-head-content {
        height: 3.2rem;
        .location-name {
            line-height: 3.2rem;
            max-width: 15rem;
            width: 100%;
            flex-basis: content;
            flex-shrink: 1;
        }
        .model-head-location {
            :deep(.el-image) {
                width: 100%;
                height: 2.8rem;
                flex-basis: content;
                flex-shrink: 1;
            }
        }
    }
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
    position: relative;
    z-index: 3;
    box-sizing: border-box;
    &::before {
        content: '';
        height: 100%;
        width: calc(100% + 0.4rem);
        position: absolute;
        left: -0.2rem;
        right: -0.2rem;
        border: 0.2rem solid $cr-main;
        z-index: 2;
    }
}
.logo-outer-style {
    height: 2.8rem;
    .logo-style {
        max-height: 2.8rem;
        max-width: 100%;
        :deep(.image-slot) {
            height: 2.8rem;
            width: 2.8rem;
        }
    }
}
.indicator-center {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: 0;
}
.up_slide_bg {
    z-index: -1;
}
</style>
