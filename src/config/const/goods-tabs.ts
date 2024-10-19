import defaultCommon from './index';
import defaultSetting from '../setting/index';
import { online_url } from '@/utils';
const new_url = await online_url('/static/app/common/').then((res) => res);
interface articleTabsList {
    id: string;
    title: string;
    img: uploadList[];
    desc: string;
    data_type: string;
    category_ids: string[];
    brand_ids: string[];
    data_ids: string[];
    number: number;
    order_by_type: string;
    order_by_rule: string;
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
        shop_padding: paddingStyle;
        shop_img_radius: radiusStyle;
        shop_radius: radiusStyle;
        content_outer_spacing: number;
        content_outer_height: number;
        is_roll: string;
        interval_time: number;
        content_spacing: number;
        shop_title_typeface: string;
        shop_title_size: number;
        shop_title_color: string;
        shop_simple_desc_typeface: string;
        shop_simple_desc_size: number;
        shop_simple_desc_color: string;
        title_simple_desc_spacing: 4,
        shop_price_typeface: string;
        shop_price_size: number;
        shop_price_color: string;
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
            { id: '1', title: '热门推荐', img: [], desc: '简介', data_type: '0', category_ids: defaultSetting.category_ids, brand_ids: defaultSetting.brand_ids, data_ids: [], number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_type, data_list: [], data_auto_list: [] },
            { id: '2', title: '测试一', img: [], desc: '简介', data_type: '0', category_ids: defaultSetting.category_ids, brand_ids: defaultSetting.brand_ids, data_ids: [], number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_type, data_list: [], data_auto_list: [] },
            { id: '3', title: '测试二', img: [], desc: '简介', data_type: '0', category_ids: defaultSetting.category_ids, brand_ids: defaultSetting.brand_ids, data_ids: [], number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_type, data_list: [], data_auto_list: [] },
            { id: '4', title: '测试三', img: [], desc: '简介', data_type: '0', category_ids: defaultSetting.category_ids, brand_ids: defaultSetting.brand_ids, data_ids: [], number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_type, data_list: [], data_auto_list: [] },
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
        // 轮播处理
        is_roll: '1',
        interval_time: 3,
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
        common_style: { ...defaultCommon, padding: 10, padding_top: 10, padding_bottom: 10, padding_left: 10, padding_right: 10 },
    },
};

export default defaultProductList;
