import defaultCommon from './index';
interface ArticleList {
    id: number;
    link: object;
    url: string;
    new_url: uploadList[];
}
interface articleTabsList {
    id: string;
    title: string;
    desc: string;
    article_check: string;
    article_category: string[];
    number: number;
    sort: string;
    sort_rules: string;
    is_img_show: boolean;
    article_list: ArticleList[];
}
interface DefaultArticleTabs {
    content: {
        tabs_style: string;
        tabs_top_up: boolean;
        article_style: string;
        tabs_list: articleTabsList[];
        is_show: string[];
    };
    style: {
        tabs_checked: color_list[];
        tabs_direction: string;
        tabs_weight_checked: string;
        tabs_size_checked: number;
        tabs_color_checked: string;
        tabs_weight: string;
        tabs_size: number;
        tabs_color: string;
        name_weight: string;
        name_size: number;
        name_color: string;
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
        article_width: number;
        common_style: object;
    };
}
const defaultArticleTabs: DefaultArticleTabs = {
    content: {
        tabs_style: '0',
        tabs_top_up: true,
        article_style: '0',
        tabs_list: [
            { id: '1', title: '热门推荐', desc: '简介', article_check: '0', article_category: [], number: 4, sort: '0', sort_rules: '0', is_img_show: true, article_list: [] },
            { id: '2', title: '测试一', desc: '简介', article_check: '0', article_category: [], number: 4, sort: '0', sort_rules: '0', is_img_show: true, article_list: [] },
            { id: '3', title: '测试二', desc: '简介', article_check: '0', article_category: [], number: 4, sort: '0', sort_rules: '0', is_img_show: true, article_list: [] },
            { id: '4', title: '测试三', desc: '简介', article_check: '0', article_category: [], number: 4, sort: '0', sort_rules: '0', is_img_show: true, article_list: [] },
            { id: '5', title: '测试四', desc: '简介', article_check: '0', article_category: [], number: 4, sort: '0', sort_rules: '0', is_img_show: true, article_list: [] },
            { id: '6', title: '测试五', desc: '简介', article_check: '0', article_category: [], number: 4, sort: '0', sort_rules: '0', is_img_show: true, article_list: [] },
        ],
        is_show: ['0', '1'],
    },
    style: {
        tabs_checked: [
            { color: 'rgba(212,212,212,2)', color_percentage: '' },
            { color: 'rgba(255,210,210,1)', color_percentage: '' },
        ],
        tabs_direction: '90deg',
        tabs_weight_checked: '500',
        tabs_size_checked: 14,
        tabs_color_checked: 'rgba(51,51,51,1)',
        tabs_weight: '500',
        tabs_size: 14,
        tabs_color: 'rgba(51,51,51,1)',
        name_weight: '500',
        name_size: 16,
        name_color: 'rgba(51, 51, 51, 1)',
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
        // 图片圆角
        img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
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
        article_width: 160, // 文章宽度
        common_style: { ...defaultCommon, padding_left: 10, padding_right: 10, padding_bottom: 10 },
    },
};

export default defaultArticleTabs;
