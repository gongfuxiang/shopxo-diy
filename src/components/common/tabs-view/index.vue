<template>
    <div :class="`flex-row gap-10 align-c ${ form.justification == 'center' ? 'jc-c' : form.justification == 'right' ? 'jc-e': 'jc-sb' }`">
        <div class="tabs flex-row oh" :style="`height: ${tabs_height}`">
            <template v-for="(item, index) in form.tabs_list" :key="index">
                <div class="item nowrap flex-col jc-c align-c" :class="tabs_theme + (index == activeIndex ? ' active' : '') + ((tabs_theme_index == '0' && tabs_theme_1_style) || tabs_theme_index == '1' || tabs_theme_index == '2' ? ' pb-0' : '')" :style="'flex:0 0 auto;' + item_style(index, item.is_sliding_fixed)">
                    <div class="nowrap ma-auto">
                        <template v-if="!isEmpty(item.img)">
                            <image-empty v-model="item.img[0]" class="img re z-deep" :style="top_img_style('data')" fit="contain" error-img-style="width:3.9rem;height:3.9rem;"></image-empty>
                        </template>
                        <template v-else>
                            <image-empty class="img re z-deep" :style="top_img_style('noData')" fit="contain" error-img-style="width:3.9rem;height:3.9rem;"></image-empty>
                        </template>
                        <template v-if="item.tabs_type == '1'">
                            <template v-if="!isEmpty(item.tabs_icon)">
                                <div :class="['title re ', tabs_theme_index == '4' ? 'z-i' : 'z-deep']" :style="title_icon_style(index, 'icon') + (index == activeIndex ? '' : padding_bottom)">
                                    <el-icon :class="`iconfont ${ 'icon-' + item.tabs_icon}`" :style="icon_style(index)" />
                                </div>
                            </template>
                            <template v-else>
                                <div :class="['title re ', tabs_theme_index == '4' ? 'z-i' : 'z-deep']" :style="title_icon_style(index, 'img') + (index == activeIndex ? '' : padding_bottom)">
                                    <image-empty v-model="item.tabs_img[0]" fit="contain" :style="img_style()" error-img-style="width: 2rem;height: 2rem;" />
                                </div>
                            </template>
                        </template>
                        <template v-else>
                            <div :class="['title re ', tabs_theme_index == '4' ? 'z-i' : 'z-deep']" :style="title_style(index) + (index == activeIndex ? '' : padding_bottom)">{{ item.title }}</div>
                        </template>
                        <div class="desc w re z-i" :style="tabs_sign_spacing + (tabs_theme_index == '1' && index == activeIndex ? tabs_check : '')">{{ item.desc }}</div>
                        <template v-if="tabs_theme_index == '3' && index == activeIndex">
                            <template v-if="!isEmpty(form.tabs_adorn_icon)">
                                <icon :name="form.tabs_adorn_icon" class="icon re z-i" :style="icon_tabs_check() + tabs_sign_spacing" :size="new_style.tabs_adorn_icon_size + ''"></icon>
                            </template>
                            <template v-else>
                                <image-empty v-model="form.tabs_adorn_img[0]" fit="contain" class="re z-i" :style="tabs_adorn_img_style + tabs_sign_spacing" error-img-style="width: 2rem;height: 2rem;" />
                            </template>
                        </template>
                        <div class="bottom_line re z-i" :class="tabs_bottom_line_theme" :style="tabs_check + tabs_sign_spacing"></div>
                    </div>
                </div>
            </template>
        </div>
        <icon v-if="isTabs && form.show_more !== '0'" :name="new_style.more_icon_class || 'category-more'" :size="new_style.more_icon_size + '' || '14'" :color="new_style.more_icon_color || '#000'" :styles="padding_bottom"></icon>
    </div>
</template>

<script lang="ts" setup>
import { gradient_computer, radius_computer } from '@/utils';
import { isEmpty } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    // 是否为tabs
    isTabs: {
        type: Boolean,
        default: false,
    },
    // 当前选中的tabs
    activeIndex: {
        type: Number,
        default: 0,
    },
    tabsSlidingFixedBg: {
        type: String,
        default: '',
    }
});
// const tabs = ref(props.value);
// 用于页面判断显示
const form = computed(() => props.value.content);
const new_style = computed(() => props.value.style);
// 选中的值
const tabs_theme_index = computed(() => form.value.tabs_theme);
const tabs_sign_spacing = computed(() => `margin-top: ${ new_style.value.tabs_sign_spacing }px;`);
//选中的样式
const tabs_theme = computed(() => {
    let tabs_theme = '';
    if (form.value.tabs_theme == '1') {
        tabs_theme = 'tabs-style-2';
    } else if (form.value.tabs_theme == '2') {
        tabs_theme = 'tabs-style-3';
    } else if (form.value.tabs_theme == '3') {
        tabs_theme = 'tabs-style-4';
    } else if (form.value.tabs_theme == '4') {
        tabs_theme = 'tabs-style-5';
    } else {
        tabs_theme = 'tabs-style-1';
    }
    return tabs_theme;
});
const item_style = computed(() => {
    return (index: number, is_sliding_fixed: string) => {
        return `padding-left: ${ index == 0 ? '0' : new_style.value.tabs_spacing / 2}px;padding-right:${ index + 1 == form.value.tabs_list.length ? '0' : new_style.value.tabs_spacing / 2 }px;${ is_sliding_fixed == '1' ? props.tabsSlidingFixedBg : ''}`
    }
});
const tabs_bottom_line_theme = computed(() => {
    return new_style.value.tabs_one_theme == '1' ? 'tabs-bottom-line-theme' : '';
});
const tabs_theme_1_style = computed(() => {
    return new_style.value.tabs_one_theme == '1';
});

const tabs_adorn_img_style = computed(() => {
    return radius_computer(new_style.value.tabs_adorn_img_radius) + `height: ${new_style.value.tabs_adorn_img_height}px;${ new_style.value.is_tabs_adorn_img_background == '1' ? tabs_check.value : ''}`;
});

const tabs_height = computed(() => {
    const DEFAULT_HEIGHT_THEME_2 = 12;
    const DEFAULT_HEIGHT_THEME_4 = 4;

    let default_height = 0;
    const { tabs_size_checked, tabs_size, tabs_icon_size_checked = 0, tabs_icon_size = 0, tabs_img_height = 0, tabs_top_img_height = 0, tabs_sign_spacing = 0 } = new_style.value || {};

    if (form.value?.tabs_theme === '2') {
        default_height = DEFAULT_HEIGHT_THEME_2; // 选中的时候,风格二的内间距
    } else if (form.value?.tabs_theme === '4') {
        default_height = DEFAULT_HEIGHT_THEME_4 + tabs_top_img_height + tabs_sign_spacing; // 选中的时候,风格二的内间距 加上上边图片的大小和上边图片之间的间距
    }

    // 筛选出所有的icon
    const is_icon = form.value?.tabs_list?.findIndex((item: { tabs_type: string, tabs_icon: string }) => item.tabs_type === '1' && !isEmpty(item.tabs_icon)) ?? -1;

    // 如果有icon，则取选中的icon大小和未选中的icon大小取最大值，作为图标的高度
    let icon_height = 0;
    if (is_icon > -1) {
        icon_height = Math.max(tabs_icon_size_checked + default_height, tabs_icon_size);
    }

    // 筛选出所有的图片, 没有选择图标的时候默认是图片
    const is_img = form.value?.tabs_list?.findIndex((item: { tabs_type: string, tabs_icon: string }) => item.tabs_type === '1' && isEmpty(item.tabs_icon)) ?? -1;

    // 选项卡高度 五个值，作为判断依据，因为图片没有未选中的大小设置，所以高度判断的时候只取选中的高度, 其余的icon和标题都分别取选中和未选中的大小对比，取出最大的值，作为选项卡的高度，避免选项卡切换时会出现抖动问题
    const height = Math.max(
        tabs_size_checked + default_height,
        tabs_size,
        icon_height,
        is_img > -1 ? (tabs_img_height + default_height) : 0
    );

    try {
        return ['2', '4'].includes(form.value?.tabs_theme) ? `${height}px;` : '100%;';
    } catch (error) {
        return '100%;';
    }
});

// 选中的背景渐变色样式
const tabs_check = computed(() => {
    const new_gradient_params = {
        color_list: new_style.value.tabs_checked,
        direction: new_style.value.tabs_direction,
    };
    return gradient_computer(new_gradient_params);
});

// 选中的内部样式
const tabs_theme_style = computed(() => {
    return {
        tabs_title_checked: `font-weight: ${new_style.value.tabs_weight_checked};font-size: ${new_style.value.tabs_size_checked}px;line-height: ${new_style.value.tabs_size_checked}px;color:${new_style.value.tabs_color_checked};`,
        tabs_title: `font-weight: ${new_style.value.tabs_weight};font-size: ${new_style.value.tabs_size}px;line-height: ${new_style.value.tabs_size}px;color:${new_style.value.tabs_color};`,
    };
});

const title_style = (index: number) => {
    // 默认是未选中的状态
    let style = `${tabs_theme_style.value.tabs_title}`;
    // 选中的状态
    if (index == props.activeIndex) {
        let checked_style = tabs_theme_style.value.tabs_title_checked;
        if (['2', '4'].includes(tabs_theme_index.value)) {
            checked_style += tabs_check.value;
        }
        style = checked_style;
    }
    if (tabs_theme_index.value == '4') {
        style += tabs_sign_spacing.value;
    }
    return style;
};

const title_icon_style = (index: number, type: string) => {
    let style = '';
    // 选中的状态
    if (index == props.activeIndex) {
        if ((type =='icon' && ['2', '4'].includes(tabs_theme_index.value)) || (type =='img' && new_style.value.is_tabs_img_background == '1' && ['2', '4'].includes(tabs_theme_index.value))) {
            style += tabs_check.value;
        }
    }
    if (tabs_theme_index.value == '4') {
        style += tabs_sign_spacing.value;
    }
    return style;
};

const icon_style = (index: number) => {
    // 默认是未选中的状态
    let style = `font-size: ${new_style.value.tabs_icon_size}px;line-height: ${new_style.value.tabs_icon_size}px;color:${new_style.value.tabs_icon_color};display:flex;`;
    // 选中的状态
    if (index == props.activeIndex) {
        style = `font-size: ${new_style.value.tabs_icon_size_checked}px;line-height: ${new_style.value.tabs_icon_size_checked}px;color:${new_style.value.tabs_icon_color_checked};display:flex;`;
    }
    return style;
};

const img_style = () => {
    return `height: ${new_style.value.tabs_img_height}px;` + radius_computer(new_style.value.tabs_img_radius);
};

const top_img_style = (type: string) => {
    const tabs_top_img_height = new_style.value?.tabs_top_img_height || 39;
    const tabs_top_img_radius = new_style.value?.tabs_top_img_radius || { radius: 100, radius_top_left: 100, radius_top_right: 100, radius_bottom_left: 100, radius_bottom_right: 100}
    return `height: ${tabs_top_img_height}px; width: ${ type == 'noData' ? tabs_top_img_height + 'px;' : '100%;' }` + radius_computer(tabs_top_img_radius);
};

const padding_bottom = computed(() => {
    let bottom = 0;
    if (form.value.tabs_theme == '0') {
        if (new_style.value.tabs_one_theme == '1') {
            bottom = 6;
        } else {
            bottom = 3;
        }
    } else if (form.value.tabs_theme == '3') {
        bottom = !isEmpty(form.value.tabs_adorn_icon) ? new_style.value.tabs_adorn_icon_size : new_style.value.tabs_adorn_img_height;
    }
    return ['1', '2', '4'].includes(form.value.tabs_theme) ? '' : `padding-bottom: ${(new_style.value?.tabs_sign_spacing || 0) + bottom}px;`;
});
// icon的渐变色处理
const icon_tabs_check = () => {
    return `${tabs_check.value};line-height: 1;background-clip: text;-webkit-background-clip: text;-webkit-text-fill-color: transparent;`;
};
</script>
<style lang="scss" scoped>
.tabs {
    max-width: 39rem;
    .item {
        // padding: 0 0 0.5rem 0;
        // margin: 0 1rem;
        position: relative;
        // transition: all 0.3s ease-in-out;
        &:first-of-type {
            margin-left: 0;
        }
        &:last-of-type {
            margin-right: 0;
        }
        .title {
            font-size: 1.4rem;
            text-align: center;
        }
        .desc {
            font-size: 1.1rem;
            color: #999;
            text-align: center;
            display: none;
        }
        .bottom_line {
            width: 100%;
            height: 0.3rem;
            border-radius: 1rem;
            background-color: red;
            // position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: none;
        }
        .icon {
            // position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            text-align: center;
            font-size: 2rem;
            // line-height: 1rem !important;
            display: none;
        }
        .img {
            // width: 3.9rem;
            // height: 3.9rem;
            // border-radius: 100%;
            border: 0.1rem solid transparent;
            display: none;
            margin: 0 auto;
        }
        &.tabs-style-1 {
            &.active {
                .bottom_line {
                    display: block;
                }
            }
            .tabs-bottom-line-theme {
                opacity: 0.6;
                bottom: 0;
                z-index: 0;
                height: 0.6rem;
                border-radius: 0;
                // left: 12%;
            }
        }
        &.tabs-style-2 {
            &.active {
                .desc {
                    background: #ff5e5e;
                    color: #fff;
                }
            }
            .desc {
                border-radius: 2rem;
                padding: 0.2rem 0.6rem;
                display: block;
            }
        }
        &.tabs-style-3 {
            &.active {
                .title {
                    border-radius: 2rem;
                    padding: 0.6rem 1.2rem;
                    color: #fff;
                }
            }
        }
        &.tabs-style-4 {
            // padding-bottom: 1.4rem;
            &.active {
                .title {
                    color: #ff2222;
                }
                .icon {
                    color: #ff2222;
                    display: block;
                }
            }
        }
        &.tabs-style-5 {
            align-items: center;
            &.active {
                .title {
                    border-radius: 2rem;
                    padding: 0.2rem 0.7rem;
                }
                .img {
                    border-color: #ff5e5e;
                }
            }
            .img {
                display: block;
            }
        }
    }
}
.pb-0 {
    padding-bottom: 0 !important;
}
.ma-auto {
    margin: auto;
}
</style>
