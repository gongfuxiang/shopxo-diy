<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <page-content :value="value.content" @update:change-theme="change_theme"></page-content>
        </template>
        <template v-else-if="type == '2'">
            <page-styles :value="value.style"></page-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
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
const default_config = {
    style: {
        theme_1: {
            background_type: 'color_image',
            background_color_list: [{ color: '#fff', color_percentage: undefined }],
            background_direction: '180deg',
            background_img_style: 2,
            background_img_url: [],
            background_title_color: '#000',
            background_title_typeface: '500',
            background_title_size: 14,
            function_buttons_type: 'black',
            immersive_style: false,
            up_slide_display: true,
        },
        theme_2: {
            background_type: 'color_image',
            background_color_list: [{ color: '#fff', color_percentage: undefined }],
            background_direction: '180deg',
            background_img_style: 2,
            background_img_url: [],
            background_title_color: '#000',
            background_title_typeface: '500',
            background_title_size: 14,
            function_buttons_type: 'black',
            immersive_style: false,
            up_slide_display: true,
        },
        theme_3: {
            background_type: 'color_image',
            background_color_list: [{ color: '#fff', color_percentage: undefined }],
            background_direction: '180deg',
            background_img_style: 2,
            background_img_url: [],
            background_title_color: '#000',
            background_title_typeface: '500',
            background_title_size: 14,
            function_buttons_type: 'black',
            immersive_style: false,
            up_slide_display: true,
        },
        theme_4: {
            background_type: 'color_image',
            background_color_list: [{ color: '#fff', color_percentage: undefined }],
            background_direction: '180deg',
            background_img_style: 2,
            background_img_url: [],
            background_title_color: '#000',
            background_title_typeface: '500',
            background_title_size: 14,
            function_buttons_type: 'black',
            immersive_style: false,
            up_slide_display: true,
        },
        theme_5: {
            background_type: 'color_image',
            background_color_list: [{ color: '#fff', color_percentage: undefined }],
            background_direction: '180deg',
            background_img_style: 2,
            background_img_url: [],
            background_title_color: '#000',
            background_title_typeface: '500',
            background_title_size: 14,
            function_buttons_type: 'black',
            immersive_style: false,
            up_slide_display: true,
        },
        theme_6: {
            background_type: 'color_image',
            background_color_list: [{ color: '#fff', color_percentage: undefined }],
            background_direction: '180deg',
            background_img_style: 2,
            background_img_url: [],
            background_title_color: '#000',
            background_title_typeface: '500',
            background_title_size: 14,
            function_buttons_type: 'black',
            immersive_style: false,
            up_slide_display: true,
        },
    },
};
const form = ref(props.value);
const change_theme = (val: string) => {
    if (val) {
        form.value.style = Object.assign({}, form.value.style, (<arrayIndex>default_config.style)[`theme_${Number(val)}`]);
    }
};
</script>
