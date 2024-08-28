<template>
    <div class="model-top">
        <div :class="['roll', { 'page-settings-border': showPage }]" :style="roll_style" @click="page_settings">
            <div class="pt-15 pb-10 pl-25 pr-25 w">
                <img class="img" :style="`Filter: brightness(${ new_style.function_buttons_type == 'black' ? 0 : 100 })`" src="@/assets/images/layout/main/main-top.png" />
            </div>
            <div class="model-head tc re">
                <div class="flex align-c jc-c w h">
                    {{ props.pageData.com_data?.content?.title || '新建页面' }}
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
    if (new_style.value.background_type === 'color_image') {
        style += gradient_computer({ color_list: new_style.value.background_color_list, direction: new_style.value.background_direction }) + background_computer(new_style.value);
    } else {
        style += `background: transparent;`;
    }
    return style
});
const url_computer = (name: string) => {
    const new_url = ref(new URL(`../../assets/images/layout/main/${name}.png`, import.meta.url).href).value;
    return new_url;
};
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
        margin: 0 auto;
        cursor: pointer;
    }
    .img {
        width: 34rem;
    }
}
.model-head {
    height: 4.3rem;
}
.model-head-icon {
    position: absolute;
    right: 1.2rem;
    bottom: 0.6rem;
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
</style>
