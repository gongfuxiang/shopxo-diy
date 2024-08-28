<template>
    <div class="model-top">
        <div :class="['roll', { 'page-settings-border': showPage }]" :style="roll_style" @click="page_settings">
            <div class="pt-15 pb-10 pl-25 pr-25 w">
                <img class="img" :style="`Filter: brightness(${ new_style.function_buttons_type == 'black' ? 0 : 100 })`" :src="url_computer()" />
            </div>
            <div class="model-head tc">
                {{ props.pageData.com_data?.content?.title || '新建页面' }}
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
    if (new_style.value.background_type === 'color') {
        style += gradient_computer({ color_list: new_style.value.background_color_list, direction: new_style.value.background_direction });
    } else if (new_style.value.background_type === 'image') {
        style += background_computer(new_style.value);
    } else {
        style += `background: transparent;`;
    }
    return style
});
const url_computer = () => {
    const new_url = ref(new URL(`../../assets/images/layout/main/main-top.png`, import.meta.url).href).value;
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
        // box-shadow: 0px 0 0px 0.2rem #fff;
        // border-bottom: 0.1rem solid #f5f5f5;
    }
    .img {
        width: 34rem;
    }
}
.model-head {
    height: 4.3rem;
    padding: 1.1rem 0;
    cursor: pointer;
}
.page-settings-border {
    // border: 0.2rem solid $cr-main;
    position: relative;
    box-shadow: 0px 0 0px 0.2rem $cr-main !important;
    z-index: 1;
    box-sizing: border-box;
}
</style>
