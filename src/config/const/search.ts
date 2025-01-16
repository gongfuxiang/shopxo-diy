import { get_math } from "@/utils";
import defaultCommon from "./index";
import commonTop from './common-top';
interface hot_word_list {
    id: string;
    value: string;
    color: string;
}
interface defaultSearch {
    content: {
        content_top: object;
        is_center: string;
        is_icon_show: string;
        icon_link: object;
        icon_img: uploadList[];
        icon_class: string;
        search_botton_img: uploadList[];
        search_botton_icon: string;
        is_tips_show: string;
        tips: string;
        is_right_icon_show: string,
        right_icon_link: object,
        right_icon_img: uploadList[],
        right_icon_class: string,
        is_search_show: string;
        search_type: string;
        search_tips: string;
        is_hot_word_show: string;
        hot_word_list: hot_word_list[];
    };
    style: {
        icon_color: string;
        right_icon_color: string;
        button_inner_color: string;
        search_botton_color_list: color_list[];
        search_botton_direction: string;
        search_botton_background_img_style: string;
        search_botton_background_img: uploadList[];
        search_button_radius: object;
        search_padding_left: number;
        tips_color: string;
        hot_words_color: string;
        search_border: string;
        search_bg_color: string;
        search_border_radius: object;
        is_roll: string;
        interval_time: number;
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        content_top: {
            ...commonTop,
        },
        // 搜索提示是否居中
        is_center: '0',
        // 是否显示左侧icon
        is_icon_show: '1',
        icon_link: {},
        icon_img: [],
        icon_class: '',
        // 搜索提示信息
        is_tips_show: '1',
        tips: '请输入搜索内容',
        // 是否显示右侧icon
        is_right_icon_show: '1',
        right_icon_link: {},
        right_icon_img: [],
        right_icon_class: '',
        // 搜索按钮显示逻辑
        search_botton_img: [],
        search_botton_icon: '',
        is_search_show: '0',
        search_type: 'text',
        search_tips: '搜索',
        // 是否显示热词
        is_hot_word_show: '0',
        // 热词数据
        hot_word_list: [],
    },
    style: {
        // 搜索图标颜色
        icon_color: '#ccc',
        right_icon_color: '#ccc',
        // 搜索按钮显示样式
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
        // 搜索提示颜色
        tips_color: '#ccc',
        // 搜索热词颜色
        hot_words_color: '#999',
        // 搜索边框颜色
        search_border: '#fff',
        // 搜索背景颜色
        search_bg_color: '#fff',
        // 搜索圆角
        search_border_radius: {
            radius: 16,
            radius_top_left: 16,
            radius_top_right: 16,
            radius_bottom_left: 16,
            radius_bottom_right: 16,
        },
        search_padding_left: 15,
        // 热词轮播
        is_roll: '1',
        interval_time: 3,
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
