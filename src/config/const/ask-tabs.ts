import defaultCommon from "./index";
import commonTop from './common-top';
import { cloneDeep } from "lodash";
interface askTabsList {
    id: string;
    tabs_type: string;
    tabs_img: uploadList[];
    tabs_icon: string;
    is_sliding_fixed: string,
    title: string;
    img: uploadList[];
    desc: string;
    data_type: string, 
    data_ids: string,
    data_list: string[];
    data_auto_list: string[];
    category_ids: string[], 
    number: number, 
    order_by_type: number, 
    order_by_rule:number, 
    keywords: string;
    is_reply: string;
}
interface defaultRealstore {
    content: {
        content_top: object;
        tabs_theme: string;
        tabs_adorn_icon: string;
        tabs_adorn_img: uploadList[];
        is_general_safe_distance: string;
        justification: string;
        tabs_top_up: string;
        tabs_list: askTabsList[];
        tabs_active_index: number;
        theme: string;
        carousel_col: number;
        data_type: string, 
        data_ids: string,
        data_list: string[];
        data_auto_list: string[];
        category_ids: string[], 
        number: number, 
        order_by_type: number, 
        order_by_rule:number, 
        keywords: string;
        is_reply: string;
        is_show: string[],
        title_display_method: string,
    };
    style: {
        tabs_one_theme: string;
        tabs_checked: color_list[];
        is_tabs_adorn_img_background: string;
        tabs_adorn_icon_size: number,
        tabs_adorn_img_radius: radiusStyle,
        tabs_adorn_img_height: number,
        tabs_direction: string;
        tabs_weight_checked: string;
        tabs_size_checked: number;
        tabs_color_checked: string;
        tabs_weight: string;
        tabs_size: number;
        tabs_color: string;
        tabs_icon_color_checked: string;
        tabs_icon_size_checked: number;
        tabs_icon_color: string;
        tabs_icon_size: number;
        is_tabs_img_background: string;
        tabs_top_img_radius: radiusStyle;
        tabs_top_img_height: number;
        tabs_img_radius: radiusStyle;
        tabs_img_height: number;
        tabs_spacing: number;
        tabs_sign_spacing: number;
        tabs_bg_direction: string;
        tabs_bg_color_list: color_list[];
        tabs_bg_background_img_style: string;
        tabs_bg_background_img: string[];
        tabs_radius: radiusStyle;
        tabs_margin: marginStyle;
        tabs_padding: paddingStyle;
        tabs_content: object;
        ask_content_direction: string;
        ask_content_color_list: color_list[];
        ask_content_background_img_style: string;
        ask_content_background_img: string[];
        ask_content_radius: radiusStyle;
        ask_content_margin: marginStyle;
        ask_content_padding: paddingStyle;
        ask_content_spacing: number;
        ask_content: object;
        ask_color_list: color_list[];
        ask_direction: string;
        ask_background_img_style: string;
        ask_background_img: uploadList[];
        ask_margin: marginStyle;
        ask_padding: paddingStyle;
        ask_radius: radiusStyle;
        content_img_width: number;
        content_img_height: number;
        content_spacing: number;
        content_outer_spacing: number;
        content_outer_height: number;
        ask_title_color: string;
        ask_title_typeface: string;
        ask_title_size: number;
        ask_time_color: string;
        ask_time_typeface: string;
        ask_time_size: number;
        ask_page_view_color: string;
        ask_page_view_typeface: string;
        ask_page_view_size: number;
        is_roll: string;
        interval_time: number;
        rolling_fashion: string;
        border_is_show: string,
        border_color: string,
        border_style: string,
        border_size: paddingStyle,
        // 阴影
        box_shadow_color: string;
        box_shadow_x: number;
        box_shadow_y: number;
        box_shadow_blur: number;
        box_shadow_spread: number;
        returned_style: object;
        not_replied_yet_style: object;
        common_style: object;  
    };
}
const defaultRealstore: defaultRealstore = {
    content: {
        content_top: {
            ...commonTop,
        },
        justification: 'left',
        // 选项卡风格
        tabs_theme: '0',
        // 选中装饰图标
        tabs_adorn_icon: 'checked-smooth',
        is_general_safe_distance: '0',
        tabs_adorn_img: [],
        // 是否置顶
        tabs_top_up: '0',
        // 选项卡数据
        tabs_list: [
            { id: '1', tabs_type: '0', tabs_img: [], tabs_icon: '', is_sliding_fixed: '0', title: '热门推荐', img: [], desc: '简介', data_type: '0', keywords: '', category_ids: [],  data_ids: '', number: 4, order_by_type: 0, order_by_rule: 0, is_reply: '0', data_list: [], data_auto_list: [] },
            { id: '2', tabs_type: '0', tabs_img: [], tabs_icon: '', is_sliding_fixed: '0', title: '测试一', img: [], desc: '简介', data_type: '0', keywords: '', category_ids: [],  data_ids: '', number: 4, order_by_type: 0, order_by_rule: 0, is_reply: '0', data_list: [], data_auto_list: [] },
            { id: '3', tabs_type: '0', tabs_img: [], tabs_icon: '', is_sliding_fixed: '0', title: '测试二', img: [], desc: '简介', data_type: '0', keywords: '', category_ids: [],  data_ids: '', number: 4, order_by_type: 0, order_by_rule: 0, is_reply: '0', data_list: [], data_auto_list: [] },
            { id: '4', tabs_type: '0', tabs_img: [], tabs_icon: '', is_sliding_fixed: '0', title: '测试三', img: [], desc: '简介', data_type: '0', keywords: '', category_ids: [],  data_ids: '', number: 4, order_by_type: 0, order_by_rule: 0, is_reply: '0', data_list: [], data_auto_list: [] },
        ],
        // 选中的内容索引
        tabs_active_index: 0,
        // 问答风格
        theme: '0',
        // 轮播数量
        carousel_col: 3,
        data_type: '0',
        data_ids: '', 
        data_list: [],
        data_auto_list: [],
        category_ids: [],
        number: 4, 
        order_by_type: 0, 
        order_by_rule: 0,
        keywords: '',
        is_reply: '',
        is_show: ['time', 'page_view', 'reply_status', 'ranking'],
        title_display_method: '0',
    },
    style: {
        // 选中样式风格
        tabs_one_theme: '0',
        tabs_checked: [
            { color: '#FF2222', color_percentage: undefined },
            { color: '#FF9898', color_percentage: undefined },
        ],
        is_tabs_adorn_img_background: '0',
        tabs_adorn_icon_size: 15,
        tabs_adorn_img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        tabs_adorn_img_height: 10,
        tabs_direction: '90deg',
        tabs_weight_checked: 'bold',
        tabs_size_checked: 14,
        tabs_color_checked: 'rgba(51,51,51,1)',
        tabs_weight: 'bold',
        tabs_size: 14,
        tabs_color: 'rgba(51,51,51,1)',
        tabs_icon_color_checked: 'rgba(51,51,51,1)',
        tabs_icon_size_checked: 14,
        tabs_icon_color: 'rgba(51,51,51,1)',
        tabs_icon_size: 14,
        tabs_top_img_radius: {
            radius: 100,
            radius_top_left: 100,
            radius_top_right: 100,
            radius_bottom_left: 100,
            radius_bottom_right: 100,
        },
        tabs_top_img_height: 39,
        is_tabs_img_background: '0',
        tabs_img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        tabs_img_height: 20,
        // tabs间距
        tabs_spacing: 20,
        tabs_sign_spacing: 4,
        // 选项卡背景设置
        tabs_bg_direction: '90deg',
        tabs_bg_color_list: [{ color: '', color_percentage: undefined }],
        tabs_bg_background_img_style: '2',
        tabs_bg_background_img: [],
        tabs_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        tabs_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        tabs_padding: {
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        tabs_content: {
            // 边框样式
            border_is_show: '0',
            border_color: '#FF3F3F',
            border_style: 'solid',
            border_size: {
                padding: 1,
                padding_top: 1,
                padding_right: 1,
                padding_bottom: 1,
                padding_left: 1,
            },
            // 阴影
            box_shadow_color: '',
            box_shadow_x: 0,
            box_shadow_y: 0,
            box_shadow_blur: 0,
            box_shadow_spread: 0,
        },
        // 问答内容设置
        ask_content_direction: '90deg',
        ask_content_color_list: [{ color: '', color_percentage: undefined }],
        ask_content_background_img_style: '2',
        ask_content_background_img: [],
        ask_content_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        ask_content_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        ask_content_padding: {
            padding: 0,
            padding_top: 0,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        ask_content_spacing: 0,
        ask_content: {
            // 边框样式
            border_is_show: '0',
            border_color: '#FF3F3F',
            border_style: 'solid',
            border_size: {
                padding: 1,
                padding_top: 1,
                padding_right: 1,
                padding_bottom: 1,
                padding_left: 1,
            },
            // 阴影
            box_shadow_color: '',
            box_shadow_x: 0,
            box_shadow_y: 0,
            box_shadow_blur: 0,
            box_shadow_spread: 0,
        },
        ask_color_list: [{ color: '#fff', color_percentage: undefined }],
        ask_direction: '90deg',
        ask_background_img_style: '2',
        ask_background_img: [],
        ask_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        ask_padding: {
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        ask_radius: {
            radius: 8,
            radius_top_left: 8,
            radius_top_right: 8,
            radius_bottom_left: 8,
            radius_bottom_right: 8,
        },
        content_img_width: 50,
        content_img_height: 50,
        content_spacing: 10,
        content_outer_spacing: 10,
        content_outer_height: 204,
        ask_title_color: '#333',
        ask_title_typeface: 'bold',
        ask_title_size: 14,
        ask_time_color: '#999',
        ask_time_typeface: '400',
        ask_time_size: 11,
        ask_page_view_color: '#999',
        ask_page_view_typeface: '400',
        ask_page_view_size: 11,
        // 是否滚动
        is_roll: '1',
        interval_time: 3,
        rolling_fashion: 'translation', // 滚动方式  translation 平移 cut-screen 切屏
        border_is_show: '0',
        border_color: '#eee',
        border_style: 'solid',
        border_size: {
            padding: 1,
            padding_top: 1,
            padding_right: 1,
            padding_bottom: 1,
            padding_left: 1,
        },
        // 阴影
        box_shadow_color: '',
        box_shadow_x: 0,
        box_shadow_y: 0,
        box_shadow_blur: 0,
        box_shadow_spread: 0,
        returned_style: {
            color_list: [{ color: '#10BB78', color_percentage: undefined }],
            direction: '90deg',
            background_img_style: '2',
            background_img: [],
            font_color: '#fff',
            font_size: 12,
            font_typeface: '400',
            font_padding: {
                padding: 0,
                padding_top: 0,
                padding_bottom: 0,
                padding_left: 7,
                padding_right: 7,
            },
            font_radius: {
                radius: 4,
                radius_top_left: 4,
                radius_top_right: 4,
                radius_bottom_left: 4,
                radius_bottom_right: 4,
            },
            border_is_show: '0',
            border_color: '#eee',
            border_style: 'solid',
            border_size: {
                padding: 1,
                padding_top: 1,
                padding_right: 1,
                padding_bottom: 1,
                padding_left: 1,
            },
        },
        not_replied_yet_style: {
            color_list: [{ color: '#E3CD35', color_percentage: undefined }],
            direction: '90deg',
            background_img_style: '2',
            background_img: [],
            font_color: '#fff',
            font_size: 12,
            font_typeface: '400',
            font_padding: {
                padding: 0,
                padding_top: 0,
                padding_bottom: 0,
                padding_left: 7,
                padding_right: 7,
            },
            font_radius: {
                radius: 4,
                radius_top_left: 4,
                radius_top_right: 4,
                radius_bottom_left: 4,
                radius_bottom_right: 4,
            },
            border_is_show: '0',
            border_color: '#eee',
            border_style: 'solid',
            border_size: {
                padding: 1,
                padding_top: 1,
                padding_right: 1,
                padding_bottom: 1,
                padding_left: 1,
            },
        },
        // 公共样式
        common_style: defaultCommon
    },
};

export default defaultRealstore;
