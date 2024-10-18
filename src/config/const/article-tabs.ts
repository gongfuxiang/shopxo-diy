import defaultCommon from './index';
import defaultSetting from '../setting/index';
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
        name_weight: string;
        name_size: number;
        name_color: string;
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
        interval_time: number; //滚动时间
        is_roll: number;
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
            { id: '1', title: '热门推荐', desc: '简介', data_type: '0', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '2', title: '测试一', desc: '简介', data_type: '0', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '3', title: '测试二', desc: '简介', data_type: '0', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '4', title: '测试三', desc: '简介', data_type: '0', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '5', title: '测试四', desc: '简介', data_type: '0', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '6', title: '测试五', desc: '简介', data_type: '0', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
        ],
        tabs_active_index: 0,
        field_show: ['0', '1'],
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
        name_weight: '500',
        name_size: 14,
        name_color: 'rgba(51, 51, 51, 1)',
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
        interval_time: 3, //滚动时间
        is_roll: 1, // 是否轮播
        common_style: { ...defaultCommon, padding: 10, padding_top: 10, padding_left: 10, padding_right: 10, padding_bottom: 10 },
    },
};

export default defaultArticleTabs;
