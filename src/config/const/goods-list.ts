import defaultCommon from './index';
import defaultSetting from '../setting/index';
import subscriptStyle from './subscript-style';
import { online_url } from '@/utils';
const new_url = await online_url('/static/app/common/').then((res) => res);
interface DefaultProductList {
    content: {
        theme: string;
        data_type: string;
        keyword: string;
        carousel_col: number;
        category_ids: string[];
        brand_ids: string[];
        data_ids: string[];
        product_show_list: string[];
        data_list: string[];
        data_auto_list: string[];
        is_price_solo: string;
        number: number;
        order_by_type: number;
        order_by_rule: number;
        is_show: string[];
        simple_desc_row: string;
        static_img: uploadList[];
        is_shop_show: string;
        shop_type: string;
        shop_button_text: string;
        shop_button_icon_class: string;
        shop_button_effect: string;
        seckill_subscript_show: string;
        subscript_type: string;
        subscript_img_src: uploadList[];
        subscript_icon_class: string;
        subscript_text: string;
    };
    style: {
        shop_direction: string,
        shop_color_list: color_list[],
        shop_background_img_style: string,
        shop_background_img: uploadList[],
        shop_padding: paddingStyle;
        shop_img_radius: radiusStyle;
        shop_radius: radiusStyle;
        content_outer_spacing: number;
        content_outer_height: number;
        content_img_width: number | undefined;
        content_img_height: number | undefined;
        is_roll: string,
        interval_time: number,
        rolling_fashion: string;
        content_spacing: number;
        shop_title_typeface: string;
        shop_title_size: number;
        shop_title_color: string;
        shop_simple_desc_typeface: string;
        shop_simple_desc_size: number;
        shop_simple_desc_color: string;
        title_simple_desc_spacing: number,
        shop_price_typeface: string;
        shop_price_size: number;
        shop_price_color: string;
        shop_price_symbol_color: string;
        shop_price_symbol_size: number;
        shop_price_unit_color: string;
        shop_price_unit_size: number;
        shop_original_price_color: string;
        shop_original_price_size: number;
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
        subscript_style: object,
        common_style: object;
    };
}
const defaultProductList: DefaultProductList = {
    content: {
        // 商品风格
        theme: '0',
        // 商品类型
        data_type: '0',
        // 商品关键字
        keyword: '',
        // 轮播列数
        carousel_col: 3,
        // 商品列表
        product_show_list: [],
        data_list: [],
        data_auto_list: [],
        data_ids: [],
        // 价格是否独行
        is_price_solo: '1',
        // 分类数组
        category_ids: defaultSetting.category_ids,
        // 品牌数组
        brand_ids: defaultSetting.brand_ids,
        // 排序方式和数量
        number: defaultSetting.page_size,
        order_by_type: defaultSetting.order_by_type,
        order_by_rule: defaultSetting.order_by_rule,
        // 显示内容
        is_show: ['title', 'plugins_view_icon', 'price', 'sales_count', 'original_price'],
        simple_desc_row: '1',
        // 价格图标地址
        static_img: [{ id: 2, url: new_url + 'price.png', original: '角标', title: '角标', ext: '.png', type: 'img' }],
        // 是否显示购买按钮
        is_shop_show: '1',
        // 购买按钮类型
        shop_type: 'text',
        shop_button_text: '购买',
        shop_button_icon_class: 'cart',
        // 点击购买按钮的操作处理
        shop_button_effect: '0',
        // 角标配置
        seckill_subscript_show: '0',
        subscript_type: 'text',
        subscript_img_src: [],
        subscript_icon_class: '',
        subscript_text: '',
    },
    style: {
        shop_direction: '90deg',
        shop_color_list: [{ color: '#fff', color_percentage: undefined }],
        shop_background_img_style: '0',
        shop_background_img: [],
        // 商品内边距
        shop_padding: {
            padding: 10, 
            padding_top: 10, 
            padding_bottom: 10, 
            padding_left: 10, 
            padding_right: 10,
        },
        // 图标圆角
        shop_img_radius: {
            radius: 4,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
        },
        // 商品圆角
        shop_radius: {
            radius: 8,
            radius_top_left: 8,
            radius_top_right: 8,
            radius_bottom_left: 8,
            radius_bottom_right: 8,
        },
        content_outer_spacing: 10, // 商品外间距
        // 商品内间距
        content_spacing: 10,
        // 商品高度
        content_outer_height: 232,
        content_img_width: undefined,
        content_img_height: undefined,
        // 是否滚动
        is_roll: '1',
        interval_time: 3,
        rolling_fashion: 'translation', // 滚动方式  translation 平移 cut-screen 切屏
        // 商品内容大小和颜色设置
        shop_title_typeface: '500',
        shop_title_size: 14,    
        shop_title_color: "#333333",
        shop_simple_desc_typeface: '400',
        shop_simple_desc_size: 12,    
        shop_simple_desc_color: "#999",
        title_simple_desc_spacing: 4,
        shop_price_typeface: '500',
        shop_price_size: 18,
        shop_price_color: "#EA3323;",
        shop_price_symbol_color: '#EA3323',
        shop_price_symbol_size: 9,
        shop_price_unit_color: '#EA3323',
        shop_price_unit_size: 9,
        shop_original_price_color: '#999',
        shop_original_price_size: 12,
        shop_sold_number_typeface: '400',
        shop_sold_number_size: 10,
        shop_sold_number_color: "#999999",
        shop_score_typeface: '400',
        shop_score_size: 10,
        shop_score_color: "#999999",
        shop_button_typeface:'400',
        shop_button_size: 12,
        // 购买按钮渐变颜色
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
        // 购买按钮文字颜色
        shop_button_text_color: '#fff',
        // 购买按钮图标颜色和大小
        shop_icon_size: 10,
        shop_icon_color: "#fff",
        subscript_style: subscriptStyle,
        common_style: { ...defaultCommon, padding: 10, padding_top: 10, padding_bottom: 10, padding_left: 10, padding_right: 10 },
    },
};

export default defaultProductList;
