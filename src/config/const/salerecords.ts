import defaultCommon from "./index";
import commonTop from './common-top';
import { cloneDeep } from "lodash";

interface defaultSalerecords {
    content: {
        content_top: object;
        is_roll: string;
        rotation_direction: string;
        interval_time: number;
        keywords: string,
        show_number: number,
        number: number;
        is_show: string[];
    };
    style: {
        heading_img_width: number;
        heading_img_height: number;
        heading_img_border_color: string;
        heading_img_border_size: number;
        heading_img_radius: {
            radius: number;
            radius_top_left: number;
            radius_top_right: number;
            radius_bottom_left: number;
            radius_bottom_right: number;
        };
        nick_name_color: string;
        nick_name_typeface: string;
        nick_name_size: number;
        goods_img_width: number;
        goods_img_height: number;
        goods_img_border_color: string;
        goods_img_border_size: number;
        goods_img_radius: {
            radius: number;
            radius_top_left: number;
            radius_top_right: number;
            radius_bottom_left: number;
            radius_bottom_right: number;
        };
        goods_title_color: string;
        goods_title_typeface: string;
        goods_title_size: number;
        time_color: string;
        time_typeface: string;
        time_size: number;
        content_color_list: color_list[];
        content_direction: number;
        content_background_img_style: string;
        content_background_img: string[];
        data_spacing: number;
        content_padding: paddingStyle;
        content_radius: {
            radius: number;
            radius_top_left: number;
            radius_top_right: number;
            radius_bottom_left: number;
            radius_bottom_right: number;
        };
        common_style: object;  
    };
}
const defaultSalerecords: defaultSalerecords = {
    content: {
        content_top: {
            ...commonTop,
        },
        is_roll: '1',
        rotation_direction: 'vertical',
        interval_time: 3,
        show_number: 2,
        keywords: '',
        number: 4,
        is_show: ['head', 'nick_name', 'goods_image', 'goods_title', 'time'],
    },
    style: {
        heading_img_width: 28,
        heading_img_height: 28,
        heading_img_border_color: '',
        heading_img_border_size: 0,
        heading_img_radius: {
            radius: 20,
            radius_top_left: 20,
            radius_top_right: 20,
            radius_bottom_left: 20,
            radius_bottom_right: 20,
        },
        nick_name_color: '#666',
        nick_name_typeface: '400',
        nick_name_size: 14,
        goods_img_width: 28,
        goods_img_height: 28,
        goods_img_border_color: '',
        goods_img_border_size: 0,
        goods_img_radius: {
            radius: 20,
            radius_top_left: 20,
            radius_top_right: 20,
            radius_bottom_left: 20,
            radius_bottom_right: 20,
        },
        goods_title_color: '#666',
        goods_title_typeface: '400',
        goods_title_size: 14,
        time_color: '#999',
        time_typeface: '400',
        time_size: 14,
        content_color_list: [{ color: '#F4F4F4', color_percentage: undefined }],
        content_direction: 0,
        content_background_img_style: '2',
        content_background_img: [],
        data_spacing: 10,
        content_padding: {
            padding: 0,
            padding_top: 6,
            padding_bottom: 6,
            padding_left: 10,
            padding_right: 10,
        },
        content_radius: {
            radius: 20,
            radius_top_left: 20,
            radius_top_right: 20,
            radius_bottom_left: 20,
            radius_bottom_right: 20,
        },
        // 公共样式
        common_style: {
            ...defaultCommon,
            color_list: [{ color: '#fff', color_percentage: undefined }],
            margin: 10,
            margin_top: 10,
            margin_bottom: 10,
            margin_left: 10,
            margin_right: 10,
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        }
    },
};

export default defaultSalerecords;
