import { get_math } from "@/utils";
import defaultCommon from "./index";
interface hot_word_list {
    id: string;
    value: string;
    color: string;
}
interface defaultSearch {
    content: {
        is_center: boolean;
        is_icon_show: boolean;
        icon_type: string;
        icon_src: string;
        icon_img_src: uploadList[];
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
    };
}
const defaultSearch: defaultSearch = {
    content: {
        is_center: false,
        is_icon_show: true,
        icon_type: 'icon',
        icon_src: '',
        icon_img_src: [],
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
    },
    style: {
        icon_color: '#ccc',
        button_inner_color: '#fff',
        color_list: [{ color: '#FF973D', color_percentage: '' }, { color: '#FF3131', color_percentage: '' }],
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
        common_style: {
            ...defaultCommon,
            padding_top: 9,
            padding_bottom: 9,
            padding_left: 15,
            padding_right: 15,
        }
    },
};

export default defaultSearch;
