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
    color: '#ccc',
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
        theme: string;
        data_list: string[];
        carousel_col: number;
        is_navigation_show: string;
        navigation_type: string;
        navigation_img: uploadList[];
        navigation_icon: string;
        navigation_text: string;
        is_phone_show: string;
        phone_type: string;
        phone_img: uploadList[];
        phone_icon: string;
        phone_text: string;
        is_time_show: string;
        time_type: string;
        time_img: uploadList[];
        time_icon: string;
        time_text: string;
        is_location_show: string;
        location_type: string;
        location_img: uploadList[];
        location_icon: string;
        location_text: string;
    };
    style: {
        realstore_color_list: color_list[];
        realstore_direction: string;
        realstore_background_img_style: string;
        realstore_background_img: uploadList[];
        realstore_img_radius: radiusStyle;
        realstore_margin: marginStyle;
        realstore_padding: paddingStyle;
        realstore_radius: radiusStyle;
        content_img_width: number;
        content_img_height: number;
        content_spacing: number;
        content_outer_spacing: number;
        content_outer_height: number;
        realstore_title_img_width: number,
        realstore_title_img_height: number,
        realstore_title_img_radius: radiusStyle,
        realstore_title_img_inner_spacing: number,
        realstore_title_img_outer_spacing: number,
        realstore_title_color: string;
        realstore_title_typeface: string;
        realstore_title_size: number;
        realstore_location_color: string;
        realstore_location_typeface: string;
        realstore_location_size: number;
        realstore_default_state_color: string;
        realstore_state_color: string;
        realstore_state_typeface: string;
        realstore_state_size: number;
        realstore_business_distance: marginStyle;
        realstore_business_hours_color: string;
        realstore_business_hours_typeface: string;
        realstore_business_hours_size: number;
        phone_navigation_spacing: number,
        navigation_style: icon_style;
        time_style: icon_style;
        phone_style: icon_style;
        location_style: icon_style;
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
        content_border_is_show: string,
        content_border_color: string,
        content_border_style: string,
        content_border_size: paddingStyle,
        content_border_margin: marginStyle,
        common_style: object;  
    };
}
const defaultRealstore: defaultRealstore = {
    content: {
        content_top: {
            ...commonTop,
        },
        theme: '0',
        data_list: [],
        carousel_col: 1,
        is_navigation_show: '1',
        navigation_type: 'img-icon',
        navigation_img: [],
        navigation_icon: 'send',
        navigation_text: '',
        is_phone_show: '0',
        phone_type: 'img-icon',
        phone_img: [],
        phone_icon: 'tel',
        phone_text: '',
        is_time_show: '1',
        time_type: 'img-icon',
        time_img: [],
        time_icon: 'time',
        time_text: '',
        is_location_show: '1',
        location_type: 'img-icon',
        location_img: [],
        location_icon: 'location',
        location_text: '',
    },
    style: {
        realstore_color_list: [{ color: '#fff', color_percentage: undefined }],
        realstore_direction: '90deg',
        realstore_background_img_style: '2',
        realstore_background_img: [],
        // 图片圆角
        realstore_img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        realstore_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        realstore_padding: {
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        realstore_radius: {
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
        realstore_title_img_width: 12,
        realstore_title_img_height: 12,
        realstore_title_img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        realstore_title_img_inner_spacing: 5,
        realstore_title_img_outer_spacing: 5,
        realstore_title_color: '#333',
        realstore_title_typeface: 'bold',
        realstore_title_size: 14,
        realstore_location_color: '#666',
        realstore_location_typeface: '400',
        realstore_location_size: 12,
        realstore_default_state_color: '#000',
        realstore_state_color: '#52C41A',
        realstore_state_typeface: '400',
        realstore_state_size: 12,
        realstore_business_distance: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 5,
            margin_right: 5,
        },
        realstore_business_hours_color: '#666',
        realstore_business_hours_typeface: '400',
        realstore_business_hours_size: 12,
        phone_navigation_spacing: 10,// 导航栏之间的间距
        navigation_style: {
            ...cloneDeep(common_icon_style),
            color_list: [{ color: '#FDEFED', color_percentage: undefined }],
            color: '#D46A50',
            padding: 4,
            padding_top: 4,
            padding_bottom: 4,
            padding_left: 4,
            padding_right: 4,
        },
        time_style: cloneDeep(common_icon_style),
        phone_style: cloneDeep(common_icon_style),
        location_style: cloneDeep(common_icon_style),
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
        content_border_is_show: '1',
        content_border_color: '#eee',
        content_border_style: 'dashed',
        content_border_size: {
            padding: 0,
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 1,
            padding_left: 0,
        },
        content_border_margin: {
            margin: 0,
            margin_top: 10,
            margin_bottom: 10,
            margin_left: 0,
            margin_right: 0,
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
