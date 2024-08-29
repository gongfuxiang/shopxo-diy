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
        is_center: boolean;
        is_icon_show: boolean;
        icon_src: string;
        icon_img_src: uploadList[];
        icon_class: string;
        search_botton_src: uploadList[];
        search_botton_icon: string;
        is_tips_show: boolean;
        tips: string;
        is_search_show: boolean;
        search_type: string;
        search_tips: string;
        hot_word_list: hot_word_list[];
    };
    style: {
        header_background_type: string;
        header_background_color_list: color_list[];
        header_background_direction: string;
        header_background_img_style: number;
        header_background_img_url: uploadList[];
        header_background_title_color: string,
        header_background_title_typeface: string,
        header_background_title_size: number,
        function_buttons_type: string,
        immersive_style: boolean,
        up_slide_display: boolean,
        icon_color: string;
        button_inner_color: string;
        color_list: color_list[];
        direction: string;
        background_img_style: string;
        background_img_url: uploadList[];
        search_button_radius: object;
        tips_color: string;
        hot_words_color: string;
        search_border: string;
        search_border_radius: object;
        common_style: object;
    }
}
const defaultFooterNav: DefaultFooterNav = {
    content: {
        theme: '1',
        logo: [],
        title: '',
        link: {},
        indicator_location: 'center',
        is_center: false,
        is_icon_show: true,
        icon_src: '',
        icon_img_src: [],
        icon_class: '',
        search_botton_src: [],
        search_botton_icon: '',
        is_tips_show: true,
        tips: '请输入搜索内容',
        is_search_show: false,
        search_type: 'text',
        search_tips: '搜索',
        hot_word_list: [
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                value: '',
                color: '#000000',
            }
        ],
        bottom_navigation_show: '1'
    },
    style: {
        header_background_type: 'color_image',
        header_background_color_list: [{ color: '#fff', color_percentage: undefined }],
        header_background_direction: '180deg',
        header_background_img_style: 2,
        header_background_img_url: [],
        header_background_title_color: '#000',
        header_background_title_typeface: '500',
        header_background_title_size: 14,
        function_buttons_type: 'black',
        immersive_style: false,
        up_slide_display: true,
        icon_color: '#ccc',
        button_inner_color: '#fff',
        color_list: [{ color: '#FF973D', color_percentage: undefined }, { color: '#FF3131', color_percentage: undefined }],
        direction: '90deg',
        background_img_style: '',
        background_img_url: [],
        search_button_radius: {
            radius: 16,
            radius_top_left: 16,
            radius_top_right: 16,
            radius_bottom_left: 16,
            radius_bottom_right: 16,
        },
        tips_color: '#ccc',
        hot_words_color: '#000',
        search_border: '#fff',
        search_border_radius: {
            radius: 16,
            radius_top_left: 16,
            radius_top_right: 16,
            radius_bottom_left: 16,
            radius_bottom_right: 16,
        },
        common_style: defaultCommon,
    },
};

export default defaultFooterNav;
