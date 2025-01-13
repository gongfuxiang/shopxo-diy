<template>
    <template v-if="type == '1'">
        <page-content :value="value.content" @update:change-theme="change_theme"></page-content>
    </template>
    <template v-else-if="type == '2'">
        <page-styles :value="value.style" :content="value.content"></page-styles>
    </template>
</template>
<script setup lang="ts">
import { cloneDeep, isEmpty } from 'lodash';
import { get_math } from '@/utils';
import { commonStore } from '@/store';
const common_store = commonStore();
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
    content: {
        title: !isEmpty(common_store.common.config.site_name) ? common_store.common.config.site_name : '新建页面',
        indicator_location: 'flex-start',
        logo: [],
        data_alone_row_value: [],
        icon_setting: [
            { id: get_math(), img: [], icon: 'bell', link: {} },
        ],
        positioning_name_float: '0',
        is_location_left_icon_show: '1',
        location_left_img: [],
        location_left_icon: 'location',
        is_location_right_icon_show: '1',
        location_right_img: [],
        location_right_icon: 'arrow-bottom',
    },
    style: {
        header_background_type: 'color_image',
        header_background_color_list: [{ color: '#fff', color_percentage: undefined }],
        header_background_direction: '180deg',
        header_background_img_style: '2',
        header_background_img: [],
        header_background_title_color: '#333',
        header_background_title_typeface: 'bold',
        header_background_title_size: 14,
        data_alone_row_space: 5,
        function_buttons_type: '0',
        immersive_style: '0',
        up_slide_logo: [],
        up_slide_display: '1',
        up_slide_background_color_list: [{ color: '#fff', color_percentage: undefined }],
        up_slide_background_direction: '180deg',
        up_slide_background_img_style: '2',
        up_slide_background_img: [],
        icon_color: '#ccc',
        button_inner_color: '#fff',
        search_botton_color_list: [
            { color: '#FF973D', color_percentage: undefined },
            { color: '#FF3131', color_percentage: undefined },
        ],
        search_botton_direction: '90deg',
        search_botton_background_img_style: '2',
        search_botton_background_img: [],
        search_button_radius: {
            radius: 16,
            radius_top_left: 16,
            radius_top_right: 16,
            radius_bottom_left: 16,
            radius_bottom_right: 16,
        },
        // 定位设置
        location_direction: '90deg',
        location_color_list: [{ color: '', color_percentage: undefined }],
        location_background_img_style: '0',
        location_background_img: [],
        location_color: '#333',
        location_left_icon_size: 12,
        location_right_icon_size: 12,
        location_border_show: '0',
        location_border_color: '#FF3F3F',
        location_border_style: 'solid',
        location_border_size: {
            padding: 0,
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 0,
            padding_left: 0,
        },
        location_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        location_padding: {
            padding: 0,
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 0,
            padding_left: 0,
        },
        location_margin: {
            margin: 0,
            margin_top: 0,
            margin_right: 10,
            margin_bottom: 0,
            margin_left: 0,
        },
        img_size: '23',
        img_space: '15',
        img_color: '#666',
        tips_color: '#ccc',
        hot_words_color: '#999',
        search_border: '#E4E4E4',
        search_bg_color: '#fff',
        search_border_radius: {
            radius: 16,
            radius_top_left: 16,
            radius_top_right: 16,
            radius_bottom_left: 16,
            radius_bottom_right: 16,
        },
        search_padding_left: 15,
    }
}
const common_config = computed(() => {
    const { site_logo_app, site_logo_wap, site_logo} = common_store.common.config;
    return !isEmpty(site_logo_app) ? site_logo_app : !isEmpty(site_logo_wap) ? site_logo_wap : site_logo;
});
const default_config = {
    style: {
        theme_1: {
            content: {
                indicator_location: 'center',
            },
            style: {}
        },
        theme_2: {
            content: {
                logo: [{ id: 1, url: common_config, original: '', title: '', ext: '.png', type: 'img' }],
            },
            style: {}
        },
        theme_3: {
            content: {
                logo: [{ id: 1, url: common_config, original: '', title: '', ext: '.png', type: 'img' }],
            },
            style: {}
        },
        theme_4: {
            content: {},
            style: {}
        },
        theme_5: {
            content: {},
            style: {}
        },
    },
};
const form = ref(props.value);
const change_theme = (val: string) => {
    if (val) {
        form.value.style = Object.assign({}, form.value.style, cloneDeep(default_data.style), cloneDeep((<arrayIndex>default_config.style)[`theme_${Number(val)}`].style));
        form.value.content = Object.assign({}, form.value.content, cloneDeep(default_data.content), cloneDeep((<arrayIndex>default_config.style)[`theme_${Number(val)}`].content));
    }
};
</script>
