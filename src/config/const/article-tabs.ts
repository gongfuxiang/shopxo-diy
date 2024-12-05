import defaultCommon from './index';
import defaultSetting from '../setting/index';
import subscriptStyle from './subscript-style';
interface ArticleList {
    id: number | string;
    data: object;
    new_title: string;
    new_cover: uploadList[];
}
interface articleTabsList {
    id: string;
    title: string;
    desc: string;
    data_type: string;
    keyword: string;
    category_ids: string[];
    number: number;
    order_by_type: string;
    order_by_rule: string;
    is_cover: string;
    data_ids: string;
    data_list: ArticleList[];
    data_auto_list: ArticleList[];
}
interface DefaultArticleTabs {
    content: {
        tabs_theme: string;
        tabs_top_up: string;
        article_theme: string;
        article_carousel_col: string;
        tabs_list: articleTabsList[];
        tabs_active_index: number;
        field_show: string[];
        seckill_subscript_show: string;
        subscript_type: string;
        subscript_img_src: uploadList[];
        subscript_icon_class: string;
        subscript_text: string;
        name_float: string;
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
        tabs_bg_direction: string,
        tabs_bg_color_list: color_list[],
        tabs_bg_background_img_style: string,
        tabs_bg_background_img: string[],
        tabs_sign_spacing: number;
        tabs_radius: radiusStyle;
        tabs_padding: paddingStyle;
        article_content_direction: string;
        article_content_color_list: color_list[];
        article_content_background_img_style: string;
        article_content_background_img: string[];
        article_content_radius: radiusStyle;
        article_content_margin: marginStyle;
        article_content_padding: paddingStyle;
        article_content_spacing: number;
        article_direction: string,
        article_color_list: color_list[],
        article_background_img_style: string,
        article_background_img: uploadList[],
        name_weight: string;
        name_size: number;
        name_color: string;
        name_bg_color_list: color_list[];
        name_bg_direction: string,
        name_bg_margin: marginStyle,
        name_bg_padding: paddingStyle,
        name_bg_radius: radiusStyle,
        desc_color: string;
        desc_size: number;
        name_desc_space: number;
        time_weight: string;
        time_size: number;
        time_color: string;
        page_view_weight: string;
        page_view_size: number;
        page_view_color: string;
        content_radius: radiusStyle;
        img_radius: radiusStyle;
        padding: paddingStyle;
        article_spacing: number;
        content_spacing: number;
        article_height: number;
        content_img_width: number | undefined;
        content_img_height: number | undefined;
        interval_time: number; //滚动时间
        is_roll: number;
        rolling_fashion: string;
        subscript_style: object;
        common_style: object;
    };
}
const defaultArticleTabs: DefaultArticleTabs = {
    content: {
        tabs_theme: '0',
        tabs_top_up: '0',
        article_theme: '0',
        article_carousel_col: '2',
        tabs_list: [
            { id: '1', title: '热门推荐', desc: '简介', data_type: '0', keyword: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '2', title: '测试一', desc: '简介', data_type: '0', keyword: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '3', title: '测试二', desc: '简介', data_type: '0', keyword: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '4', title: '测试三', desc: '简介', data_type: '0', keyword: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '5', title: '测试四', desc: '简介', data_type: '0', keyword: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '6', title: '测试五', desc: '简介', data_type: '0', keyword: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
        ],
        tabs_active_index: 0,
        field_show: ['0', '1', '3'],
        // 角标配置
        seckill_subscript_show: '0',
        subscript_type: 'text',
        subscript_img_src: [],
        subscript_icon_class: '',
        subscript_text: '',
        name_float: '0',
    },
    style: {
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
        // 文章内容设置
        article_content_direction: '90deg',
        article_content_color_list: [{ color: '', color_percentage: undefined }],
        article_content_background_img_style: '2',
        article_content_background_img: [],
        article_content_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        article_content_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        article_content_padding: {
            padding: 0,
            padding_top: 0,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        article_content_spacing: 0,
        // 文章背景设置
        article_direction: '90deg',
        article_color_list: [{ color: '#fff', color_percentage: undefined }],
        article_background_img_style: '0',
        article_background_img: [],
        name_weight: '500',
        name_size: 14,
        name_color: '#333',
        name_bg_color_list: [{ color: 'rgba(0, 0, 0, 0.7)', color_percentage: undefined }],
        name_bg_direction: '180deg',
        name_bg_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        name_bg_padding: {
            padding: 0,
            padding_top: 0,
            padding_bottom: 0,
            padding_left: 10,
            padding_right: 10,
        },
        name_bg_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
        },
        desc_color: '#999',
        desc_size: 12,
        name_desc_space: 4,
        time_weight: '400',
        time_size: 12,
        time_color: 'rgba(153, 153, 153, 1)',
        page_view_weight: '400',
        page_view_size: 12,
        page_view_color: 'rgba(153, 153, 153, 1)',
        // 内容圆角
        content_radius: {
            radius: 8,
            radius_top_left: 8,
            radius_top_right: 8,
            radius_bottom_left: 8,
            radius_bottom_right: 8,
        },
        // 图片圆角 ---- 除了风格一圆角是4，其他都是0
        img_radius: {
            radius: 4,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
        },
        // 内间距
        padding: {
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        content_spacing: 10, // 内容间距
        article_spacing: 10, // 文章间距
        article_height: 155, // 文章高度
        content_img_width: undefined,
        content_img_height: undefined,
        interval_time: 3, //滚动时间
        is_roll: 1, // 是否轮播
        rolling_fashion: 'translation', // 滚动方式  translation 平移 cut-screen 切屏
        subscript_style: subscriptStyle,
        common_style: { ...defaultCommon, padding: 10, padding_top: 10, padding_left: 10, padding_right: 10, padding_bottom: 10 },
    },
};

export default defaultArticleTabs;
