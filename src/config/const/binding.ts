import defaultCommon from "./index";
import commonTop from './common-top';
import { cloneDeep } from "lodash";

type icon_style = {
    color_list: color_list[];
    direction: string;
    color: string;
    size: number;
    img_width: number;
    img_height: number;
    margin: number;
    margin_top: number;
    margin_bottom: number;
    margin_left: number;
    margin_right: number;
    padding: number;
    padding_top: number;
    padding_bottom: number;
    padding_left: number;
    padding_right: number;
    radius: number;
    radius_top_left: number;
    radius_top_right: number;
    radius_bottom_left: number;
    radius_bottom_right: number;
}

const common_icon_style: icon_style = {
    color_list: [{ color: '', color_percentage: undefined }],
    direction: '90deg',
    color: '#52C41A',
    size: 12,
    img_width: 14,
    img_height: 14,
    margin: 0,
    margin_top: 0,
    margin_bottom: 0,
    margin_left: 0,
    margin_right: 0,
    padding: 0,
    padding_top: 0,
    padding_bottom: 0,
    padding_left: 0,
    padding_right: 0,
    radius: 0,
    radius_top_left: 0,
    radius_top_right: 0,
    radius_bottom_left: 0,
    radius_bottom_right: 0,
} 
interface defaultRealstore {
    content: {
        content_top: object;
        host_graph_theme: string;
        is_host_graph_show: string;
        theme: string;
        carousel_col: number;
        goods_save_price: string;
        goods_save_price_row: string;
        data_list: string[];
        is_goods_show: string[];
        is_default_show_goods: string;
        is_details_show: string;
        details_type: string;
        details_img: uploadList[];
        details_icon: string;
        details_text: string;
        is_data_discounts_show: string,
        data_discounts_type: string,
        data_discounts_img: uploadList[],
        data_discounts_icon: string,
        data_discounts_text: string,
        is_goods_discounts_show: string,
        goods_discounts_type: string,
        goods_discounts_img: uploadList[],
        goods_discounts_icon: string,
        goods_discounts_text: string,
    };
    style: {
        data_content_img_width: number;
        data_content_img_height: number;
        data_content_spacing: number;
        data_content_bottom_spacing: number;
        data_content_outer_spacing: number;
        data_color_list: color_list[];
        data_direction: string;
        data_background_img_style: string;
        data_background_img: uploadList[];
        data_img_radius: radiusStyle;
        data_margin: marginStyle;
        data_padding: paddingStyle;
        data_radius: radiusStyle;
        data_title_img_width: number,
        data_title_img_height: number,
        data_title_img_radius: radiusStyle,
        data_title_img_inner_spacing: number,
        data_title_img_outer_spacing: number,
        data_title_color: string;
        data_title_typeface: string;
        data_title_size: number;
        data_price_symbol_color: string;
        data_price_symbol_size: number;
        data_price_color: string;
        data_price_typeface: string;
        data_price_size: number;
        data_save_price_symbol_color: string;
        data_save_price_symbol_size: number;
        data_save_price_color: string;
        data_save_price_typeface: string;
        data_save_price_size: number;
        data_border_box: object;
        goods_content_img_width: number;
        goods_content_img_height: number;
        goods_content_spacing: number;
        goods_content_outer_spacing: number;
        goods_content_outer_height: number;
        goods_color_list: color_list[];
        goods_direction: string;
        goods_background_img_style: string;
        goods_background_img: uploadList[];
        goods_img_radius: radiusStyle;
        goods_margin: marginStyle;
        goods_padding: paddingStyle;
        goods_radius: radiusStyle;
        goods_title_img_width: number,
        goods_title_img_height: number,
        goods_title_img_radius: radiusStyle,
        goods_title_img_inner_spacing: number,
        goods_title_img_outer_spacing: number,
        goods_title_color: string;
        goods_title_typeface: string;
        goods_title_size: number;
        goods_price_symbol_color: string;
        goods_price_symbol_size: number;
        goods_price_color: string;
        goods_price_typeface: string;
        goods_price_size: number;
        goods_save_price_symbol_color: string;
        goods_save_price_symbol_size: number;
        goods_save_price_color: string;
        goods_save_price_typeface: string;
        goods_save_price_size: number;
        goods_border_box: object,
        details_style: object,
        data_discounts_style: object,
        goods_discounts_style: object,
        is_roll: string;
        interval_time: number;
        rolling_fashion: string;
        goods_content_style: object,
        bottom_button_color: string,
        bottom_button_typeface: string,
        bottom_button_size: number,
        bottom_button_icon_color: string,
        bottom_button_icon_size: number,
        bottom_button_style: object,
        common_style: object;  
    };
}
const defaultRealstore: defaultRealstore = {
    content: {
        content_top: {
            ...commonTop,
        },
        host_graph_theme: '0',
        is_host_graph_show: '1',
        theme: '0',
        carousel_col: 1,
        goods_save_price: '1',
        goods_save_price_row: '1',
        data_list: [],
        is_goods_show: ['title', 'goods_img', 'price', 'save_price'],
        is_default_show_goods: '1',
        is_details_show: '1',
        details_type: 'text',
        details_img: [],
        details_icon: '',
        details_text: '详情',
        is_data_discounts_show: '1',
        data_discounts_type: 'text',
        data_discounts_img: [],
        data_discounts_icon: '',
        data_discounts_text: '节省',
        is_goods_discounts_show: '1',
        goods_discounts_type: 'text',
        goods_discounts_img: [],
        goods_discounts_icon: '',
        goods_discounts_text: '节省',
    },
    style: {
        data_content_img_width: 128,
        data_content_img_height: 128,
        data_content_spacing: 10,
        data_content_bottom_spacing: 10,
        data_content_outer_spacing: 10,
        data_color_list: [{ color: '#fff', color_percentage: undefined }],
        data_direction: '90deg',
        data_background_img_style: '2',
        data_background_img: [],
        // 图片圆角
        data_img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        data_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        data_padding: {
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        data_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        data_title_img_width: 12,
        data_title_img_height: 12,
        data_title_img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        data_title_img_inner_spacing: 5,
        data_title_img_outer_spacing: 5,
        data_title_color: '#333',
        data_title_typeface: 'bold',
        data_title_size: 16,
        data_price_symbol_color: '#E22C08',
        data_price_symbol_size: 12,
        data_price_color: '#E22C08',
        data_price_typeface: '400',
        data_price_size: 12,
        data_save_price_symbol_color: '#52C41A',
        data_save_price_symbol_size: 12,
        data_save_price_color: '#52C41A',
        data_save_price_typeface: '400',
        data_save_price_size: 12,
        data_border_box: {
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
        },
        goods_content_img_width: 50,
        goods_content_img_height: 50,
        goods_content_spacing: 10,
        goods_content_outer_spacing: 10,
        goods_content_outer_height: 204,
        goods_color_list: [{ color: '#fff', color_percentage: undefined }],
        goods_direction: '90deg',
        goods_background_img_style: '2',
        goods_background_img: [],
        // 图片圆角
        goods_img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        goods_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        goods_padding: {
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        goods_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        goods_title_img_width: 12,
        goods_title_img_height: 12,
        goods_title_img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        goods_title_img_inner_spacing: 5,
        goods_title_img_outer_spacing: 5,
        goods_title_color: '#333',
        goods_title_typeface: '400',
        goods_title_size: 12,
        goods_price_symbol_color: '#EA3323',
        goods_price_symbol_size: 9,
        goods_price_color: '#EA3323',
        goods_price_typeface: '400',
        goods_price_size: 9,
        goods_save_price_symbol_color: '#52C41A',
        goods_save_price_symbol_size: 10,
        goods_save_price_color: '#52C41A',
        goods_save_price_typeface: '400',
        goods_save_price_size: 10,
        goods_border_box: {
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
        },
        details_style: {
            ...cloneDeep(common_icon_style),
            color_list: [{ color: '#E22C08', color_percentage: undefined }],
            color: '#fff',
            padding: 0,
            padding_top: 5,
            padding_bottom: 5,
            padding_left: 10,
            padding_right: 10,
            radius: 14,
            radius_top_left: 14,
            radius_top_right: 14,
            radius_bottom_left: 14,
            radius_bottom_right: 14,
        },
        data_discounts_style: {
            ...cloneDeep(common_icon_style),
            color_list: [{ color: '#61AB3C', color_percentage: undefined }, { color: '#91D552', color_percentage: undefined }, { color: '#9BA34A', color_percentage: undefined }],
            color: '#fff',
            padding: 0,
            padding_top: 0,
            padding_bottom: 0,
            padding_left: 8,
            padding_right: 8,
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 14,
            radius_bottom_left: 14,
            radius_bottom_right: 0,
        },
        goods_discounts_style: cloneDeep(common_icon_style),
        // 是否滚动
        is_roll: '1',
        interval_time: 3,
        rolling_fashion: 'translation', // 滚动方式  translation 平移 cut-screen 切屏
        goods_content_style: {
            color_list: [{ color: '#f8f8f8', color_percentage: undefined }],
            direction: '180deg',
            background_img_style: '2',
            background_img: [],
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
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
        bottom_button_color: '#999999',
        bottom_button_typeface: '400',
        bottom_button_size: 12,
        bottom_button_icon_color: '#999999',
        bottom_button_icon_size: 12,
        bottom_button_style: {
            color_list: [{ color: '#fff', color_percentage: undefined }],
            direction: '180deg',
            background_img_style: '2',
            background_img: [],
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
            padding: 0,
            padding_top: 0,
            padding_bottom: 0,
            padding_left: 0,
            padding_right: 0,
            margin: 0,
            margin_top: 10,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
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
        // 公共样式
        common_style: {
            ...defaultCommon,
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        }
    },
};

export default defaultRealstore;
