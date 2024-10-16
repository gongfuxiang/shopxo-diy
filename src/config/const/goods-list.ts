import defaultCommon from './index';
import defaultSetting from '../setting/index';
import { online_url } from '@/utils';
const new_url = await online_url('/static/app/common/').then((res) => res);
interface DefaultProductList {
    content: {
        theme: string;
        data_type: string;
        carousel_col: number;
        category_ids: string[];
        brand_ids: string[];
        data_ids: string[];
        product_show_list: string[];
        data_list: string[];
        data_auto_list: string[];
        is_price_solo: string;
        number: number;
        order_by_type: string;
        order_by_rule: string;
        is_show: string[];
        static_img: uploadList[];
        is_shop_show: string;
        shop_type: string;
        shop_button_text: string;
        shop_button_icon_class: string;
        shop_button_effect: string;
        shop_button_size: string;
    };
    style: {
        shop_padding: paddingStyle;
        shop_img_radius: radiusStyle;
        shop_radius: radiusStyle;
        content_outer_spacing: number;
        content_outer_height: number;
        is_roll: string,
        interval_time: number,
        content_spacing: number;
        shop_title_typeface: string;
        shop_title_size: number;
        shop_title_color: string;
        shop_price_typeface: string;
        shop_price_size: number;
        shop_price_color: string;
        shop_sold_number_typeface: string;
        shop_sold_number_size: number;
        shop_sold_number_color: string;
        shop_score_typeface: string;
        shop_score_size: number;
        shop_score_color: string;
        shop_button_typeface:string;
        shop_button_size: number;
        shop_button_color: color_list[];
        shop_button_text_color: string,
        shop_icon_size: number;
        shop_icon_color: string;
        common_style: object;
    };
}
const defaultProductList: DefaultProductList = {
    content: {
        theme: '0',
        data_type: '0',
        carousel_col: 3,
        product_show_list: [],
        data_list: [],
        data_auto_list: [],
        category_ids: defaultSetting.category_ids,
        brand_ids: defaultSetting.brand_ids,
        data_ids: [],
        is_price_solo: '1',
        number: defaultSetting.page_size,
        order_by_type: defaultSetting.order_by_type,
        order_by_rule: defaultSetting.order_by_rule,
        is_show: ['title', 'plugins_view_icon', 'price', 'sales_count', 'original_price'],
        static_img: [{ id: 2, url: new_url + 'price.png', original: '角标', title: '角标', ext: '.png', type: 'img' }],
        is_shop_show: '1',
        shop_type: 'text',
        shop_button_text: '购买',
        shop_button_icon_class: 'cart',
        shop_button_effect: '0',
        shop_button_size: '1',
    },
    style: {
        shop_padding: {
            padding: 10, 
            padding_top: 10, 
            padding_bottom: 10, 
            padding_left: 10, 
            padding_right: 10,
        },
        shop_img_radius: {
            radius: 4,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
        },
        shop_radius: {
            radius: 8,
            radius_top_left: 8,
            radius_top_right: 8,
            radius_bottom_left: 8,
            radius_bottom_right: 8,
        },
        content_outer_spacing: 10, // 商品间距
        content_spacing: 10,
        content_outer_height: 232,
        is_roll: '1',
        interval_time: 3,
        shop_title_typeface: '500',
        shop_title_size: 14,    
        shop_title_color: "#333333",
        shop_price_typeface: '500',
        shop_price_size: 18,
        shop_price_color: "#EA3323;",
        shop_sold_number_typeface: '400',
        shop_sold_number_size: 10,
        shop_sold_number_color: "#999999",
        shop_score_typeface: '400',
        shop_score_size: 10,
        shop_score_color: "#999999",
        shop_button_typeface:'400',
        shop_button_size: 12,
        shop_button_color: [
            {
                color: '#FF3D53',
                color_percentage: undefined
            },
            {
                color: '#D73A3A',
                color_percentage: undefined
            }
        ],
        shop_button_text_color: '#fff',
        shop_icon_size: 10,
        shop_icon_color: "#fff",
        common_style: { ...defaultCommon, padding: 10, padding_top: 10, padding_bottom: 10, padding_left: 10, padding_right: 10 },
    },
};

export default defaultProductList;
