import { get_math } from '@/utils';
import defaultCommon from './index';
interface hot_word_list {
    id: string;
    value: string;
    color: string;
}
interface DefaultFooterNav {
    content: {
        theme: string;
        logo: uploadList[];
        title: string;
        link: object;
        indicator_location: string;
        bottom_navigation_show: string;
        positioning_name: string;
        icon_setting: { id: string; img: uploadList[]; link: object; icon: string }[];
        is_arrows_show: string;
        is_center: string;
        is_icon_show: string;
        icon_link: object;
        icon_img: uploadList[];
        icon_class: string;
        search_botton_img: uploadList[];
        search_botton_icon: string;
        is_tips_show: string;
        tips: string;
        is_search_show: string;
        search_type: string;
        search_tips: string;
        hot_word_list: hot_word_list[];
    };
    style: {
        header_background_type: string;
        header_background_color_list: color_list[];
        header_background_direction: string;
        header_background_img_style: string;
        header_background_img: uploadList[];
        header_background_title_color: string;
        header_background_title_typeface: string;
        header_background_title_size: number;
        function_buttons_type: string;
        immersive_style: string;
        up_slide_display: string;
        up_slide_background_color_list: color_list[];
        up_slide_background_direction: string;
        up_slide_background_img_style: string;
        up_slide_background_img: uploadList[];
        left_back_btn_color: string;
        icon_color: string;
        button_inner_color: string;
        search_botton_color_list: color_list[];
        search_botton_direction: string;
        search_botton_background_img_style: string;
        search_botton_background_img: uploadList[];
        search_button_radius: object;
        position_color: string;
        img_size: string;
        img_space: string;
        img_color: string;
        tips_color: string;
        hot_words_color: string;
        search_border: string;
        search_bg_color: string;
        search_border_radius: object;
        common_style: object;
    };
}
const defaultFooterNav: DefaultFooterNav = {
    content: {
        theme: '1',
        logo: [],
        title: '新建页面',
        link: {},
        indicator_location: 'center',
        positioning_name: '未选择位置',
        icon_setting: [{ id: get_math(), img: [], icon: 'applet-me-message-acquiesce', link: { name: '我的消息', page: '/pages/message/message' } }],
        is_arrows_show: '1',
        is_center: '0',
        is_icon_show: '1',
        icon_link: {},
        icon_img: [],
        icon_class: 'search',
        search_botton_img: [],
        search_botton_icon: '',
        is_tips_show: '1',
        tips: '请输入搜索内容',
        is_search_show: '0',
        search_type: 'text',
        search_tips: '搜索',
        hot_word_list: [],
        bottom_navigation_show: '0',
    },
    style: {
        header_background_type: 'color_image',
        header_background_color_list: [{ color: '#fff', color_percentage: undefined }],
        header_background_direction: '180deg',
        header_background_img_style: '2',
        header_background_img: [],
        header_background_title_color: '#333',
        header_background_title_typeface: '500',
        header_background_title_size: 14,
        function_buttons_type: '0',
        immersive_style: '0',
        up_slide_display: '1',
        up_slide_background_color_list: [{ color: '#fff', color_percentage: undefined }],
        up_slide_background_direction: '180deg',
        up_slide_background_img_style: '2',
        up_slide_background_img: [],
        left_back_btn_color: '#333',
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
        position_color: '#333',
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
        common_style: {
            ...defaultCommon,
            color_list: [{ color: '#f5f5f5', color_percentage: undefined }],
        },
    },
};

export default defaultFooterNav;
