<template>
    <div class="tabs-container flex-row gap-10 jc-sb align-c">
        <div class="tabs flex-row oh" :style="`column-gap: ${new_style.tabs_spacing}px;`">
            <template v-for="(item, index) in form.tabs_list" :key="index">
                <div class="item nowrap flex-col jc-c gap-4" :class="tabs_theme + (index == activeIndex ? ' active' : '')">
                    <template v-if="!isEmpty(item.img)">
                        <image-empty v-model="item.img[0]" class="img" error-img-style="width:2rem;height:2rem;"></image-empty>
                    </template>
                    <template v-else>
                        <image-empty class="img" error-img-style="width:2rem;height:2rem;"></image-empty>
                    </template>
                    <div class="title" :style="title_style(index)">{{ item.title }}</div>
                    <div class="desc" :style="tabs_theme_index == '1' && index == activeIndex ? tabs_check : ''">{{ item.desc }}</div>
                    <icon name="checked-smooth" class="icon" :style="tabs_theme_index == '3' ? icon_tabs_check() : ''"></icon>
                    <div class="bottom_line" :class="tabs_bottom_line_theme" :style="tabs_check"></div>
                </div>
            </template>
        </div>
        <icon v-if="isTabs" :name="new_style.more_icon_class || 'category-more'" :size="new_style.more_icon_size + '' || '14'" :color="new_style.more_icon_color || '#000'" class="pb-5"></icon>
    </div>
</template>

<script lang="ts" setup>
import { gradient_computer } from '@/utils';
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
});
// const tabs = ref(props.value);
// 用于页面判断显示
const form = computed(() => props.value.content);
const new_style = computed(() => props.value.style);
// 选中的值
const tabs_theme_index = computed(() => form.value.tabs_theme);
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
const tabs_bottom_line_theme = computed(() => {
    return new_style.value.tabs_one_theme == '1' ? 'tabs-bottom-line-theme' : '';
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
        tabs_title_checked: `font-weight: ${new_style.value.tabs_weight_checked};font-size: ${new_style.value.tabs_size_checked}px;color:${new_style.value.tabs_color_checked};`,
        tabs_title: `font-weight: ${new_style.value.tabs_weight};font-size: ${new_style.value.tabs_size}px;color:${new_style.value.tabs_color};`,
    };
});

const title_style = (index: number) => {
    // 默认是未选中的状态
    let style = `${tabs_theme_style.value.tabs_title}`;
    if (index == props.activeIndex) {
        let checked_style = tabs_theme_style.value.tabs_title_checked;
        if (['2', '4'].includes(tabs_theme_index.value)) {
            checked_style += tabs_check.value;
        }
        style = checked_style;
    }
    return style;
};
// icon的渐变色处理
const icon_tabs_check = () => {
    return `${tabs_check.value};line-height: 1;background-clip: text;-webkit-background-clip: text;-webkit-text-fill-color: transparent;`;
};
</script>
<style lang="scss" scoped>
.tabs-container {
    .tabs {
        max-width: 39rem;
        min-height: 2.9rem;
        .item {
            padding: 0 0 0.5rem 0;
            // margin: 0 1rem;
            position: relative;
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
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                display: none;
            }
            .icon {
                position: absolute;
                left: 0;
                right: 0;
                bottom: -0.6rem;
                text-align: center;
                font-size: 2rem;
                display: none;
            }
            .img {
                width: 3.9rem;
                height: 3.9rem;
                border-radius: 100%;
                border: 0.1rem solid transparent;
                display: none;
            }
            &.tabs-style-1 {
                &.active {
                    .bottom_line {
                        display: block;
                    }
                }
                .tabs-bottom-line-theme {
                    opacity: 0.6;
                    bottom: 0.8rem;
                    z-index: 0;
                    height: 0.6rem;
                    border-radius: 0;
                    width: 76%;
                    left: 12%;
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
                    display: inline-block;
                }
            }
            &.tabs-style-3 {
                &.active {
                    .title {
                        background: #ff2222;
                        border-radius: 2rem;
                        padding: 0.2rem 1.2rem;
                        color: #fff;
                    }
                }
            }
            &.tabs-style-4 {
                padding-bottom: 0.8rem;
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
                        font-size: 1.1rem;
                        background: #ff5e5e;
                        border-radius: 2rem;
                        padding: 0.2rem 0.7rem;
                        color: #fff;
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
}
</style>
