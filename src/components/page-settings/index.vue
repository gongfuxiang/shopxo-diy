<template>
    <div class="model-top">
        <div :class="[{ 'page-settings-border': showPage }]" :style="roll_style" @click="page_settings">
            <div class="roll re" :style="roll_img_style">
                <div class="w h abs up_slide_bg" :style="up_slide_style">
                    <div class="w h" :style="up_slide_img_style"></div>
                </div>
                <div class="pt-15 pl-18 pr-22 w pb-6 status-bar">
                    <img class="img" :style="`Filter: brightness(${new_style.function_buttons_type == '0' ? 0 : 100})`" :src="main_top_img" />
                </div>
                <div class="model-head tc re mlr-12 mt-6">
                    <div class="flex-col" :style="`gap: ${new_style.data_alone_row_space}px`">
                        <div class="model-head-content flex-row align-c jc-sb gap-16 re">
                            <div v-if="['1', '2', '3'].includes(form.theme)" class="flex-1">
                                <div class="flex-1 flex-row align-c jc-c h gap-16" :class="position_class" :style="[{ 'justify-content': form?.indicator_location || 'center' }, text_style]">
                                    <template v-if="['2', '3'].includes(form.theme) && form.logo.length > 0">
                                        <div class="logo-outer-style re">
                                            <template v-if="new_style.up_slide_logo && new_style.up_slide_logo.length > 0">
                                                <!-- 有上滑logo的处理逻辑 -->
                                                <img :src="form.logo[0].url" class="logo-style" :style="up_slide_old_logo_style + 'max-width:' + ((props.scollTop - 5) / 90 < 1 ? 100 + '%;' : 0)" />
                                                <img :src="new_style.up_slide_logo[0].url" :class="['logo-style left-0', {'abs': (props.scollTop - 5) / 90 < 1 }]" :style="'opacity:0;' + up_slide_opacity" />
                                            </template>
                                            <template v-else>
                                                <!-- 没有上滑logo -->
                                                <img class="logo-style" :src="form.logo[0].url" />
                                            </template>
                                        </div>
                                    </template>
                                    <div v-if="['1', '2', '3'].includes(form.theme) && !isEmpty(form.title)">{{ form.title }}</div>
                                    <template v-if="['3', '5'].includes(form.theme) && !is_search_alone_row">
                                        <div class="flex-1 fw-n">
                                            <model-search :value="pageData.com_data" :is-page-settings="true"></model-search>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div v-else-if="['4', '5'].includes(form.theme)" class="flex-1 flex-row align-c h re">
                                <div v-if="form.positioning_name_float !== '1'" class="model-head-location oh" :style="style_location_container">
                                    <div class="flex-row gap-4 align-c oh" :style="style_location_img_container">
                                        <template v-if="form.is_location_left_icon_show == '1'">
                                            <image-empty v-if="form.location_left_img.length > 0" v-model="form.location_left_img[0]" fit="contain" :error-img-style="'width: 12px; height:12px'"></image-empty>
                                            <icon v-else :name="form.location_left_icon" :size="new_style?.location_left_icon_size + '' || '12'"></icon>
                                        </template>
                                        <span class="location-name size-14 text-line-1" :style="location_name_style">{{ form.positioning_name }}</span>
                                        <template v-if="form.is_location_right_icon_show == '1'">
                                            <image-empty v-if="form.location_right_img.length > 0" v-model="form.location_right_img[0]" fit="contain" :error-img-style="'width: 12px; height:12px'"></image-empty>
                                            <icon v-else :name="form.location_right_icon" :size="new_style?.location_right_icon_size + '' || '12'"></icon>
                                        </template>
                                    </div>
                                </div>
                                <template v-if="['5'].includes(form.theme) && !is_search_alone_row">
                                    <div class="flex-1">
                                        <model-search :value="pageData.com_data" :is-page-settings="true" search-type="header" :header-location-style="style_location_container" :header-location-img-style="style_location_img_container"></model-search>
                                    </div>
                                </template>
                            </div>
                            <div v-if="!isEmpty(form.icon_setting) && !is_icon_alone_row" class="flex-row align-c" :class="'gap-' + new_style.img_space">
                                <div v-for="(item, index) in form.icon_setting" :key="index" :style="{ width: new_style.img_size + 'px', height: new_style.img_size + 'px' }">
                                    <image-empty v-if="item.img.length > 0" v-model="item.img[0]" fit="contain" :error-img-style="'width: ' + Number(new_style.img_size) / 2 + 'px;height:' + Number(new_style.img_size) / 2 + 'px;'"></image-empty>
                                    <icon v-else :name="item.icon" :size="new_style.img_size + ''" :styles="up_slide_icon_style"></icon>
                                </div>
                            </div>
                        </div>
                        <div v-if="is_search_alone_row || is_icon_alone_row" class="model-head-content flex-row align-c gap-16">
                            <template v-if="['3', '5'].includes(form.theme) && is_search_alone_row">
                                <div class="flex-1">
                                    <model-search :value="pageData.com_data" :is-page-settings="true" search-type="header" :header-location-style="style_location_container" :header-location-img-style="style_location_img_container"></model-search>
                                </div>
                            </template>
                            <div v-if="!isEmpty(form.icon_setting) && is_icon_alone_row" class="flex-row align-c" :class="'gap-' + new_style.img_space">
                                <div v-for="(item, index) in form.icon_setting" :key="index" :style="{ width: new_style.img_size + 'px', height: new_style.img_size + 'px' }">
                                    <image-empty v-if="item.img.length > 0" v-model="item.img[0]" fit="contain" :error-img-style="'width: ' + Number(new_style.img_size) / 2 + 'px;height:' + Number(new_style.img_size) / 2 + 'px;'"></image-empty>
                                    <icon v-else :name="item.icon" :size="new_style.img_size + ''" :styles="up_slide_icon_style"></icon>
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
import { background_computer, gradient_computer, margin_computer, padding_computer, radius_computer } from '@/utils';
import { isEmpty } from 'lodash';
import { commonStore } from '@/store';
const common_store = commonStore();

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
const main_top_img = ref(common_store.common.config.attachment_host + `/static/diy/images/layout/main/main-top.png`);
const page_settings = () => {
    emits('page_settings');
};
const form = computed(() => props.pageData.com_data.content);
const new_style = computed(() => props.pageData.com_data.style);
// 是否搜索换行
const is_search_alone_row = computed(() => form.value.data_alone_row_value.includes('search'));
// 是否图标换行
const is_icon_alone_row = computed(() => form.value.data_alone_row_value.includes('icon'));
// 沉浸式和上滑显示处理逻辑
const position = computed(() => (new_style.value.up_slide_display == '1' ? 'absolute' : 'relative'));
// 公共样式
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
const up_slide_opacity = computed(() => {
    let opacity = '1';
    if (props.scollTop > 20 && new_style.value.up_slide_display == '1') {
        opacity = `opacity: ${(props.scollTop - 20) / 90 > 1 ? 1 : ((props.scollTop - 20) / 90).toFixed(2)};`;
    }
    return opacity;
});
// 上滑时原logo 隐藏效果
const up_slide_old_logo_style = computed(() => {
    let style = ``;
    if (props.scollTop > 5 && new_style.value.up_slide_display == '1') {
        style += `opacity: ${(props.scollTop - 5) / 90 > 1 ? 0 : (1 - (props.scollTop - 5) / 90).toFixed(2)};`;
    }
    return style;
});
// 上滑显示渐变效果
const up_slide_style = computed(() => {
    let style = ``;
    const { up_slide_background_color_list, up_slide_background_direction, up_slide_display } = new_style.value;
    if (props.scollTop > 20 && up_slide_display == '1') {
        // 渐变
        const gradient = { color_list: up_slide_background_color_list, direction: up_slide_background_direction };
        style += gradient_computer(gradient) + up_slide_opacity.value;
    }
    return style;
});
// 上滑图标更新
const up_slide_icon_style = computed(() => {
    let style = ``;
    const { up_slide_display, img_color = '', up_slide_icon_color = '' } = new_style.value;
    if (props.scollTop > 20 && up_slide_display == '1') {
        const opacityValue = (props.scollTop - 20) / 90;
        const opacity = opacityValue > 1 ? '1' : opacityValue.toFixed(2);
        const numericOpacity = parseFloat(opacity); // 转换为数字
        style += up_slide_icon_color == '' || numericOpacity <= 0 ? `color: ${ img_color };` : `color: ${ up_slide_icon_color };${ up_slide_opacity.value }`;
    } else {
        style += `color: ${ img_color };`;
    }
    return style;
});
// 上滑显示图片效果
const up_slide_img_style = computed(() => {
    let style = ``;
    const { up_slide_background_img = '', up_slide_background_img_style = '', up_slide_display } = new_style.value;
    if (props.scollTop > 20 && up_slide_display == '1') {
        // 背景图
        const back = { background_img: up_slide_background_img, background_img_style: up_slide_background_img_style };
        style += background_computer(back);
    }
    return style;
});
// 定位设置
const style_location_container = computed(() => {
    const { location_margin, location_color_list, location_direction, location_radius} = new_style.value;
    const style = {
        color_list: location_color_list,
        direction: location_direction,
    }
    const height = 32 - location_margin.margin_top - location_margin.margin_bottom;
    return gradient_computer(style) + margin_computer(location_margin) + radius_computer(location_radius) + `color: ${new_style.value.location_color};height: ${height > 0 ? height : 0}px;line-height: ${height > 0 ? height : 0}px;`;
});
// 背景图片
const style_location_img_container = computed(() => {
    const { location_background_img, location_background_img_style, location_padding, location_border_size, location_border_color, location_margin, location_border_style = 'solid' } = new_style.value;
    const style = {
        background_img: location_background_img,
        background_img_style: location_background_img_style,
    }
    let border = ``;
    if (new_style.value.location_border_show == '1') {
        border += `border-width: ${location_border_size.padding_top}px ${location_border_size.padding_right}px ${location_border_size.padding_bottom}px ${location_border_size.padding_left}px;border-style: ${ location_border_style };border-color: ${location_border_color};`
    }
    const height = 32 - location_margin.margin_top - location_margin.margin_bottom;
    return background_computer(style) + padding_computer(location_padding) + radius_computer(new_style.value.location_radius) + border + `height: ${height > 0 ? height : 0 }px;line-height: ${height > 0 ? height : 0}px;`;
});

const location_name_style = computed(() => {
    let width = 0;
    if (is_search_alone_row.value && is_icon_alone_row.value) {
        width = 200;
    } else if (is_search_alone_row.value || is_icon_alone_row.value) {
        width = 100;
    }
    if (form.value.theme == '4') {
       return `max-width: ${ 150 + width }px;`;
    } else {
       return `max-width: ${ 100 + width }px;`;
    }
});

// 文字样式
const text_style = computed(() => `font-weight:${new_style.value.header_background_title_typeface}; font-size: ${new_style.value.header_background_title_size}px; color: ${new_style.value.header_background_title_color};`);
const position_class = computed(() => (form.value?.indicator_location == 'center' ? `indicator-center` : ''));
</script>
<style lang="scss" scoped>
.model-top {
    position: v-bind(position);
    top: 0;
    left: 50%;
    z-index: 13;
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
.status-bar {
    height: 4.2rem;
}
.model-head {
    // height: 3.2rem;
    overflow: hidden;
    .model-head-content {
        height: 3.2rem;
        .location-name {
            width: 100%;
            flex-basis: content;
            flex-shrink: 1;
        }
        .model-head-location {
            :deep(.el-image) {
                width: 100%;
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
        // transition: all 0.3s;
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
