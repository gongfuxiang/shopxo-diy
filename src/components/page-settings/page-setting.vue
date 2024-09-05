<template>
    <template v-if="type == '1'">
        <page-content :value="value.content" @update:change-theme="change_theme"></page-content>
    </template>
    <template v-else-if="type == '2'">
        <page-styles :value="value.style" :content="value.content"></page-styles>
    </template>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash';
const props = defineProps({
    type: {
        type: String,
        default: '1',
    },
    value: {
        type: Object,
        default: () => ({}),
    },
});
const default_data = {
    header_background_type: 'color_image',
    header_background_color_list: [{ color: '#fff', color_percentage: undefined }],
    header_background_direction: '180deg',
    header_background_img_style: 2,
    header_background_img: [],
    header_background_title_color: '#333',
    header_background_title_typeface: '500',
    header_background_title_size: 16,
    function_buttons_type: 'black',
    immersive_style: '0',
    up_slide_display: '1',
    icon_color: '#ccc',
    button_inner_color: '#fff',
    search_botton_color_list: [{ color: '#FF973D', color_percentage: undefined }, { color: '#FF3131', color_percentage: undefined }],
    search_botton_direction: '90deg',
    search_botton_background_img_style: '',
    search_botton_background_img: [],
    search_button_radius: {
        radius: 16,
        radius_top_left: 16,
        radius_top_right: 16,
        radius_bottom_left: 16,
        radius_bottom_right: 16,
    },
    tips_color: '#ccc',
    hot_words_color: '#000',
    search_border: '#E4E4E4',
    search_border_radius: {
        radius: 16,
        radius_top_left: 16,
        radius_top_right: 16,
        radius_bottom_left: 16,
        radius_bottom_right: 16,
    },
}
const default_config = {
    style: {
        theme_1: {},
        theme_2: {},
        theme_3: {},
        theme_4: {},
        theme_5: {},
    },
};
const form = ref(props.value);
const change_theme = (val: string) => {
    if (val) {
        form.value.style = Object.assign({}, form.value.style, cloneDeep(default_data), (<arrayIndex>default_config.style)[`theme_${Number(val)}`]);
    }
};
</script>
