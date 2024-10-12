import { get_math } from "@/utils";
import defaultCommon from "./index";
interface hot_word_list {
    id: string;
    value: string;
    color: string;
}
interface defaultSearch {
    content: {
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
        icon_color: string;
        button_inner_color: string;
        search_botton_color_list: color_list[];
        search_botton_direction: string;
        search_botton_background_img_style: string;
        search_botton_background_img: uploadList[];
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
        is_center: '0',
        is_icon_show: '1',
        icon_link: {},
        icon_img: [],
        icon_class: '',
        search_botton_img: [],
        search_botton_icon: '',
        is_tips_show: '1',
        tips: '请输入搜索内容',
        is_search_show: '0',
        search_type: 'text',
        search_tips: '搜索',
        hot_word_list: [],
    },
    style: {
        icon_color: '#ccc',
        button_inner_color: '#fff',
        search_botton_color_list: [{ color: '#FF973D', color_percentage: undefined }, { color: '#FF3131', color_percentage: undefined }],
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
