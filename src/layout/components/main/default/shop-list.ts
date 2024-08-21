import defaultCommon from './index';
interface DefaultProductList {
    content: {
        product_style: string;
        product_check: string;
        goods_category_ids: string[];
        goods_brand_ids: string[];
        product_list: [];
        is_price_solo: boolean;
        number: number;
        sort: string;
        sort_rules: string;
        is_show: string[];
        is_shop_show: boolean;
        shop_type: string;
        shop_button_effect: string;
        shop_button_size: string;
    };
    style: {
        shop_padding: paddingStyle;
        shop_img_radius: radiusStyle;
        shop_radius: radiusStyle;
        content_outer_spacing: number;
        content_outer_width: number;
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
        common_style: object;
    };
}
const defaultProductList: DefaultProductList = {
    content: {
        product_style: '0',
        product_check: '0',
        product_list: [],
        goods_category_ids: [],
        goods_brand_ids: [],
        is_price_solo: true,
        number: 4,
        sort: '0',
        sort_rules: '0',
        is_show: ['0', '1', '2', '3', '4', '5'],
        is_shop_show: true,
        shop_type: '0',
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
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        shop_radius: {
            radius: 0,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        content_outer_spacing: 10, // 商品间距
        content_spacing: 10,
        content_outer_width: 104,
        shop_title_typeface: 'normal',
        shop_title_size: 12,    
        shop_title_color: "#000",
        shop_price_typeface: 'normal',
        shop_price_size: 12,
        shop_price_color: "#000",
        shop_sold_number_typeface: 'normal',
        shop_sold_number_size: 10,
        shop_sold_number_color: "#000",
        shop_score_typeface: 'normal',
        shop_score_size: 10,
        shop_score_color: "#000",
        shop_button_typeface:'normal',
        shop_button_size: 12,
        shop_button_color: [
            {
                color: '#2a94ff',
                color_percentage: ''
            },
            {
                color: '#2a94ff',
                color_percentage: ''
            }
        ],
        common_style: { ...defaultCommon, padding: 10, padding_top: 10, padding_bottom: 10, padding_left: 10, padding_right: 10 },
    },
};

export default defaultProductList;
