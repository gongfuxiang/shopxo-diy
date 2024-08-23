import defaultCommon from './index';

interface ArticleList {
    id: number | string;
    data: object;
    new_title: string;
    new_cover: uploadList[];
}
interface DefaultArticleList {
    content: {
        // 风格
        theme: string;
        data_type: string;
        category: string[];
        data_list: ArticleList[];
        data_ids: string;
        number: number;
        sort: string;
        sort_rules: string;
        field_show: string[];
        is_cover: boolean;
    };
    style: {
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
        article_height: number;
        common_style: object;
    };
}
const defaultArticleList: DefaultArticleList = {
    content: {
        theme: '1',
        data_type: '0',
        category: [],
        data_list: [],
        data_ids: '',
        number: 4,
        sort: '0',
        sort_rules: '0',
        field_show: ['0', '1'],
        is_cover: true,
    },
    style: {
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
        article_width: 155, // 文章宽度
        article_height: 155, // 文章宽度
        common_style: { ...defaultCommon, padding: 10, padding_top: 10, padding_bottom: 10, padding_left: 10, padding_right: 10 },
    },
};

export default defaultArticleList;
