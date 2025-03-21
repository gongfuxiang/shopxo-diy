import defaultCommon from './index';
import defaultSetting from '../setting/index';
import subscriptStyle from './subscript-style';
import commonTop from './common-top';
import { online_url } from '@/utils';
import { cloneDeep } from 'lodash';
import { radioButtonProps } from 'element-plus';
const new_url = await online_url('/static/app/common/').then((res) => res);

interface DefaultProductList {
    content: {
        content_top: object;
        main_theme: string;
        is_main_show: string[];
        theme: string;
        is_img_mask: string;
        carousel_col: number;
        data_type: string;
        data_ids: string[];
        data_list: string[];
        data_auto_list: string[];
        keywords: string;
        category_ids: string[];
        number: number;
        order_by_type: number;
        order_by_rule: number;
        is_home: string;
        is_show: string[];
        is_price_solo: string;
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
        activity_main: object;
        activity_outer_spacing: number;
        activity_content: componentsCommonCommonStyle;
        shop_content_spacing: number;
        shop_content: componentsCommonCommonStyle;
        shop_direction: string;
        shop_color_list: color_list[];
        shop_background_img_style: string;
        shop_background_img: uploadList[];
        shop_padding: paddingStyle;
        shop_margin: marginStyle;
        border_is_show: string;
        border_color: string;
        border_style: string;
        border_size: paddingStyle;
        // 阴影
        box_shadow_color: string;
        box_shadow_x: number;
        box_shadow_y: number;
        box_shadow_blur: number;
        box_shadow_spread: number;
        shop_img_radius: radiusStyle;
        shop_radius: radiusStyle;
        content_outer_spacing: number;
        content_outer_height: number;
        content_img_width: number | undefined;
        content_img_height: number | undefined;
        is_roll: string;
        interval_time: number;
        rolling_fashion: string;
        content_spacing: number;
        shop_title_typeface: string;
        shop_title_size: number;
        shop_title_color: string;
        shop_simple_desc_typeface: string;
        shop_simple_desc_size: number;
        shop_simple_desc_color: string;
        title_simple_desc_spacing: number;
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
        shop_button_text_color: string;
        shop_icon_size: number;
        shop_icon_color: string;
        subscript_style: object;
        common_style: object;
    };
}
const defaultProductList: DefaultProductList = {
    content: {
        content_top: {
            ...commonTop,
        },
        // 主图样式
        main_theme: '0',
        // 商品风格
        theme: '1',
        is_main_show: ['img', 'title', 'desc', 'keywords'],
        // 商品关键字
        keywords: '',
        // 轮播列数
        carousel_col: 3,
        is_img_mask: '1',
        // 商品类型
        data_type: '0',
        data_list: [],
        data_auto_list: [],
        data_ids: [],
        // 分类数组
        category_ids: defaultSetting.category_ids,
        // 排序方式和数量
        number: defaultSetting.page_size,
        order_by_type: defaultSetting.order_by_type,
        order_by_rule: defaultSetting.order_by_rule,
        is_home: '0',
        // 显示内容
        is_show: ['title', 'plugins_view_icon', 'price', 'sales_count', 'original_price'],
        // 价格是否独行
        is_price_solo: '1',
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
        activity_main: {
            ...cloneDeep(defaultCommon),
            color_list: [{ color: '#fff', color_percentage: undefined }],
            img_width: 143,
            img_height: 143,
            img_radius: {
              radius: 0,
              radius_top_left: 0,
              radius_top_right: 0,
              radius_bottom_left: 0,
              radius_bottom_right: 0,
            },
            radius: 8,
            radius_top_left: 8,
            radius_top_right: 8,
            radius_bottom_left: 8,
            radius_bottom_right: 8,
            title_color: '#333',
            title_size: 16,
            title_typeface: 'bold',
            desc_color: '#999',
            desc_size: 12,
            desc_typeface: '400',
            desc_spacing: 6,
            keywords_style: {
                color_list: [{ color: '', color_percentage: undefined }],
                direction: '90deg',
                background_img_style: '2',
                background_img: [],
                font_color: '#FF3C3C',
                font_size: 10,
                font_typeface: '400',
                font_padding: {
                    padding: 0,
                    padding_top: 0,
                    padding_bottom: 0,
                    padding_left: 10,
                    padding_right: 10,
                },
                font_radius: {
                    radius: 50,
                    radius_top_left: 50,
                    radius_top_right: 50,
                    radius_bottom_left: 50,
                    radius_bottom_right: 50,
                },
                border_is_show: '1',
                border_color: '#FF3C3C',
                border_style: 'solid',
                border_size: {
                    padding: 1,
                    padding_top: 1,
                    padding_right: 1,
                    padding_bottom: 1,
                    padding_left: 1,
                },
            },
            activity_main_right_content: {
                padding: 0,
                padding_top: 16,
                padding_bottom: 0,
                padding_left: 10,
                padding_right: 0,
            }
        },
        // 多个活动之间的间距
        activity_outer_spacing: 10,
        // 活动跟商品之间的间距
        shop_content_spacing: 10,
        activity_content: cloneDeep(defaultCommon),
        shop_content: cloneDeep(defaultCommon),
        shop_direction: '90deg',
        shop_color_list: [{ color: '#fff', color_percentage: undefined }],
        shop_background_img_style: '0',
        shop_background_img: [],
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
        // 商品内边距
        shop_padding: {
            padding: 10, 
            padding_top: 10, 
            padding_bottom: 10, 
            padding_left: 10, 
            padding_right: 10,
        },
        shop_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
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
        content_img_width: 110,
        content_img_height: 120,
        // 是否滚动
        is_roll: '1',
        interval_time: 3,
        rolling_fashion: 'translation', // 滚动方式  translation 平移 cut-screen 切屏
        // 商品内容大小和颜色设置
        shop_title_typeface: 'bold',
        shop_title_size: 14,    
        shop_title_color: "#333333",
        shop_simple_desc_typeface: '400',
        shop_simple_desc_size: 12,
        shop_simple_desc_color: "#999",
        title_simple_desc_spacing: 4,
        shop_price_typeface: 'bold',
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
