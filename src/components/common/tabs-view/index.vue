<template>
    <div class="tabs flex-row oh">
        <template v-for="(item, index) in tabs.content.tabs_list" :key="index">
            <div class="item nowrap flex-col jc-c gap-4" :class="tabs_style + (index == 0 ? ' active' : '')">
                <img class="img" src="@/assets/images/components/model-user-info/avatar.png" />
                <div class="title" :style="index == 0 ? tabs_style_style.tabs_title_checked : tabs_style_style.tabs_title">{{ item.title }}</div>
                <div class="desc">{{ item.desc }}</div>
                <icon name="checked-1" class="icon"></icon>
                <div class="bottom_line" :style="tabs_style_style.tabs_check"></div>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { gradient_computer } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const tabs = ref(props.value);
const tabs_style = computed(() => {
    let tabs_style = '';
    if (tabs.value.content.tabs_style == '1') {
        tabs_style = 'tabs-style-2';
    } else if (tabs.value.content.tabs_style == '2') {
        tabs_style = 'tabs-style-3';
    } else if (tabs.value.content.tabs_style == '3') {
        tabs_style = 'tabs-style-4';
    } else if (tabs.value.content.tabs_style == '4') {
        tabs_style = 'tabs-style-5';
    } else {
        tabs_style = 'tabs-style-1';
    }
    return tabs_style;
});
const tabs_style_style = computed(() => {
    const new_gradient_params = {
        color_list: tabs.value.style.tabs_checked,
        direction: tabs.value.style.tabs_direction,
    };
    const new_style = {
        tabs_check: gradient_computer(new_gradient_params),
        tabs_title_checked: 'font-weight:' + tabs.value.style.tabs_weight_checked + ';' + 'font-size:' + tabs.value.style.tabs_size_checked + 'px;' + 'color:' + tabs.value.style.tabs_color_checked,
        tabs_title: 'font-weight:' + tabs.value.style.tabs_weight + ';' + 'font-size:' + tabs.value.style.tabs_size + 'px;' + 'color:' + tabs.value.style.tabs_color,
    };
    return new_style;
});
</script>
<style lang="scss" scoped>
.tabs {
    max-width: 39rem;
    .item {
        padding: 0.5rem 0;
        margin: 0 1rem;
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
            bottom: 0;
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
        }
        &.tabs-style-2 {
            &.active {
                .desc {
                    background: red;
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
                    background: red;
                    border-radius: 2rem;
                    padding: 0.2rem 1.2rem;
                    color: #fff;
                }
            }
        }
        &.tabs-style-4 {
            padding-bottom: 1.8rem;
            &.active {
                .title {
                    color: red;
                }
                .icon {
                    color: red;
                    display: block;
                }
            }
        }
        &.tabs-style-5 {
            align-items: center;
            &.active {
                .title {
                    font-size: 1.1rem;
                    background: red;
                    border-radius: 2rem;
                    padding: 0.2rem 0.7rem;
                    color: #fff;
                }
                .img {
                    border-color: red;
                }
            }
            .img {
                display: block;
            }
        }
    }
}
</style>
