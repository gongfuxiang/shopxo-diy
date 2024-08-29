<template>
    <div class="model-top">
        <div :class="['roll', { 'page-settings-border': showPage }]" :style="roll_style" @click="page_settings">
            <div class="pb-12 pl-6 pr-13 w">
                <img class="img" :style="`Filter: brightness(${ new_style.function_buttons_type == 'black' ? 0 : 100 })`" src="@/assets/images/layout/main/main-top.png" />
            </div>
            <div class="model-head tc re">
                <div class="flex align-c jc-c h gap-16" :style="[{ 'justify-content': form?.indicator_location || 'center', 'padding-right': form?.indicator_location == 'flex-end' ? '90px' : '0'}, text_style]">
                    <template v-if="form.theme == '2' || form.theme == '3'">
                        <div class="logo-outer-style"><image-empty v-model="form.logo[0]" class="logo-style" error-img-style="width:2rem;height:2rem;"></image-empty></div>
                    </template>
                    <div v-if="form.theme == '1' || form.theme == '2'">{{ form?.title || '新建页面' }}</div>
                    <template v-if="form.theme == '3'">
                        <model-search :value="pageData.com_data"></model-search>
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
const text_style = computed(() => `font-weight:${ new_style.value.background_title_typeface }; font-size: ${ new_style.value.background_title_size }px; color: ${ new_style.value.background_title_color };`);
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
        padding: 1.5rem 1.2rem 0.9rem 1.2rem;
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
