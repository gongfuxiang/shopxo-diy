import defaultCommon from './index';
interface articleTabsList {
    id: string;
    title: string;
    img: uploadList[];
    desc: string;
    product_check: string;
    goods_category_ids: string[];
    goods_brand_ids: string[];
    is_price_solo: boolean;
    number: number;
    sort: string;
    sort_rules: string;
    product_list: [];
}
interface DefaultProductList {
    content: {
        tabs_style: string;
        tabs_top_up: boolean;
        product_style: string;
        tabs_list: articleTabsList[];
        is_show: string[];
        is_shop_show: boolean;
        shop_type: string;
        shop_button_effect: string;
        shop_button_size: string;
    };
    style: {
        tabs_checked: color_list[];
        tabs_direction: string;
        tabs_weight_checked: string,
        tabs_size_checked: number,
        tabs_color_checked: string,
        tabs_weight: string,
        tabs_size: number,
        tabs_color: string,
        shop_padding: internalStyle;
        shop_img_radius: radiusStyle;
        shop_radius: radiusStyle;
        content_outer_down_spacing: number;
        content_outer_about_spacing: number;
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
        tabs_style: '0',
        tabs_top_up: false,
        product_style: '0',
        tabs_list: [
            { id: '1', title: '热门推荐', img: [], desc: '简介', product_check: '0', goods_category_ids: [], goods_brand_ids: [], number: 4, is_price_solo: true, sort: '0', sort_rules: '0', product_list: [] },
            { id: '2', title: '测试一', img: [], desc: '简介', product_check: '0', goods_category_ids: [], goods_brand_ids: [], number: 4, is_price_solo: true, sort: '0', sort_rules: '0', product_list: [] },
            { id: '3', title: '测试二', img: [], desc: '简介', product_check: '0', goods_category_ids: [], goods_brand_ids: [], number: 4, is_price_solo: true, sort: '0', sort_rules: '0', product_list: [] },
            { id: '4', title: '测试三', img: [], desc: '简介', product_check: '0', goods_category_ids: [], goods_brand_ids: [], number: 4, is_price_solo: true, sort: '0', sort_rules: '0', product_list: [] },
        ],
        is_show: ['0', '1', '2', '3', '4', '5'],
        is_shop_show: true,
        shop_type: '0',
        shop_button_effect: '0',
        shop_button_size: '1',
    },
    style: {
        tabs_checked: [{ color: 'rgba(212,212,212,2)', color_percentage: '' }, { color: 'rgba(255,210,210,1)', color_percentage: '' }],
        tabs_direction: '90deg',
        tabs_weight_checked: '500',
        tabs_size_checked: 14,
        tabs_color_checked: 'rgba(51,51,51,1)',
        tabs_weight: '500',
        tabs_size: 14,
        tabs_color: 'rgba(51,51,51,1)',
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
        content_outer_down_spacing: 10, // 内容间的上下间距
        content_outer_about_spacing: 10, // 内容间的左右间距
        content_spacing: 10,
        content_outer_width: 104,
        shop_title_typeface: 'normal',
        shop_title_size: 12,    
        shop_title_color: "#000",
        shop_price_typeface: 'normal',
        shop_price_size: 12,
        shop_price_color: "#000",
        shop_sold_number_typeface: 'normal',
        shop_sold_number_size: 12,
        shop_sold_number_color: "#000",
        shop_score_typeface: 'normal',
        shop_score_size: 12,
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
