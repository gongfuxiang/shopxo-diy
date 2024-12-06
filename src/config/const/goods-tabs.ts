import defaultCommon from './index';
import defaultSetting from '../setting/index';
import subscriptStyle from './subscript-style';
import { online_url } from '@/utils';
const new_url = await online_url('/static/app/common/').then((res) => res);
interface articleTabsList {
    id: string;
    title: string;
    img: uploadList[];
    desc: string;
    data_type: string;
    keyword: string;
    category_ids: string[];
    brand_ids: string[];
    data_ids: string[];
    number: number;
    order_by_type: number;
    order_by_rule: number;
    data_list: [];
    data_auto_list: [];
}
interface DefaultProductList {
    content: {
        tabs_theme: string;
        tabs_top_up: string;
        theme: string;
        carousel_col: number;
        tabs_list: articleTabsList[];
        tabs_active_index: number;
        static_img: uploadList[];
        is_show: string[];
        is_shop_show: string;
        is_price_solo: string;
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
        tabs_one_theme: string;
        tabs_checked: color_list[];
        tabs_direction: string;
        tabs_weight_checked: string;
        tabs_size_checked: number;
        tabs_color_checked: string;
        tabs_weight: string;
        tabs_size: number;
        tabs_color: string;
        tabs_spacing: number;
        tabs_sign_spacing: number;
        tabs_bg_direction: string,
        tabs_bg_color_list: color_list[],
        tabs_bg_background_img_style: string,
        tabs_bg_background_img: string[],
        tabs_radius: radiusStyle;
        tabs_padding: paddingStyle;
        shop_content_direction: string;
        shop_content_color_list: color_list[];
        shop_content_background_img_style: string;
        shop_content_background_img: string[];
        shop_content_radius: radiusStyle;
        shop_content_margin: marginStyle;
        shop_content_padding: paddingStyle;
        shop_content_spacing: number;
        shop_direction: string;
        shop_color_list: color_list[];
        shop_background_img_style: string;
        shop_background_img: uploadList[];
        shop_padding: paddingStyle;
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
        shop_button_typeface: string;
        shop_button_size: number;
        shop_button_color: color_list[];
        shop_button_text_color: string;
        shop_icon_size: number;
        shop_icon_color: string;
        subscript_style: object,
        common_style: object;
    };
}
const defaultProductList: DefaultProductList = {
    content: {
        // 选项卡风格
        tabs_theme: '0',
        // 是否置顶
        tabs_top_up: '0',
        // 商品风格
        theme: '0',
        // 轮播数量
        carousel_col: 3,
        // 选项卡数据
        tabs_list: [
            { id: '1', title: '热门推荐', img: [], desc: '简介', data_type: '0', keyword: '', category_ids: defaultSetting.category_ids, brand_ids: defaultSetting.brand_ids, data_ids: [], number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_type, data_list: [], data_auto_list: [] },
            { id: '2', title: '测试一', img: [], desc: '简介', data_type: '0', keyword: '', category_ids: defaultSetting.category_ids, brand_ids: defaultSetting.brand_ids, data_ids: [], number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_type, data_list: [], data_auto_list: [] },
            { id: '3', title: '测试二', img: [], desc: '简介', data_type: '0', keyword: '', category_ids: defaultSetting.category_ids, brand_ids: defaultSetting.brand_ids, data_ids: [], number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_type, data_list: [], data_auto_list: [] },
            { id: '4', title: '测试三', img: [], desc: '简介', data_type: '0', keyword: '', category_ids: defaultSetting.category_ids, brand_ids: defaultSetting.brand_ids, data_ids: [], number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_type, data_list: [], data_auto_list: [] },
        ],
        // 选中的内容索引
        tabs_active_index: 0,
        static_img: [{ id: 2, url: new_url + 'price.png', original: '角标', title: '角标', ext: '.png', type: 'img' }],
        // 显示内容
        is_show: ['title', 'plugins_view_icon', 'price', 'sales_count', 'original_price'],
        // 是否显示购买按钮
        is_shop_show: '1',
        // 价格是否独行
        is_price_solo: '1',
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
        // 选中样式风格
        tabs_one_theme: '0',
        tabs_checked: [
            { color: '#FF2222', color_percentage: undefined },
            { color: '#FF9898', color_percentage: undefined },
        ],
        tabs_direction: '90deg',
        tabs_weight_checked: '500',
        tabs_size_checked: 14,
        tabs_color_checked: 'rgba(51,51,51,1)',
        tabs_weight: '500',
        tabs_size: 14,
        tabs_color: 'rgba(51,51,51,1)',
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
        tabs_padding: {
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        // 商品内容设置
        shop_content_direction: '90deg',
        shop_content_color_list: [{ color: '', color_percentage: undefined }],
        shop_content_background_img_style: '2',
        shop_content_background_img: [],
        shop_content_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        shop_content_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        shop_content_padding: {
            padding: 0,
            padding_top: 0,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        shop_content_spacing: 0,
        // 商品背景设置
        shop_direction: '90deg',
        shop_color_list: [{ color: '#fff', color_percentage: undefined }],
        shop_background_img_style: '0',
        shop_background_img: [],
        // 商品圆角
        shop_padding: {
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        // 商品图片圆角
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
        // 商品外间距
        content_outer_spacing: 10,
        // 商品内间距
        content_spacing: 10,
        // 商品高度
        content_outer_height: 232,
        // 商品图片宽度和高度, 为了确保历史数据显示正常，这里设置为undefined
        content_img_width: undefined,
        content_img_height: undefined,
        // 轮播处理
        is_roll: '1',
        interval_time: 3,
        rolling_fashion: 'translation', // 滚动方式  translation 平移 cut-screen 切屏
        // 商品标题等内容处理
        shop_title_typeface: '500',
        shop_title_size: 14,
        shop_title_color: '#333333',
        shop_simple_desc_typeface: '400',
        shop_simple_desc_size: 12,    
        shop_simple_desc_color: "#999",
        title_simple_desc_spacing: 4,
        shop_price_typeface: '500',
        shop_price_size: 18,
        shop_price_color: '#EA3323;',
        shop_price_symbol_color: '#EA3323',
        shop_price_symbol_size: 9,
        shop_price_unit_color: '#EA3323',
        shop_price_unit_size: 9,
        shop_original_price_color: '#999',
        shop_original_price_size: 12,
        shop_sold_number_typeface: '400',
        shop_sold_number_size: 10,
        shop_sold_number_color: '#999999',
        shop_score_typeface: '400',
        shop_score_size: 10,
        shop_score_color: '#999999',
        // 购买按钮显示
        shop_button_typeface: '400',
        shop_button_size: 12,
        shop_button_color: [
            {
                color: '#FF3D53',
                color_percentage: undefined,
            },
            {
                color: '#D73A3A',
                color_percentage: undefined,
            },
        ],
        shop_button_text_color: '#fff',
        // 购买图标的大小和颜色
        shop_icon_size: 10,
        shop_icon_color: '#fff',
        subscript_style: subscriptStyle,
        common_style: defaultCommon,
    },
};

export default defaultProductList;
