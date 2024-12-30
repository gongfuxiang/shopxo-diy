import defaultCommon from './index';
import defaultSetting from '../setting/index';
import subscriptStyle from './subscript-style';

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
        carousel_col: string;
        data_type: string;
        keyword: string;
        category_ids: string[];
        data_list: ArticleList[];
        data_ids: string;
        data_auto_list: ArticleList[];
        number: number;
        order_by_type: number;
        order_by_rule: number;
        field_show: string[];
        field_desc_row: string,
        is_cover: string;
        seckill_subscript_show: string;
        subscript_type: string;
        subscript_img_src: uploadList[];
        subscript_icon_class: string;
        subscript_text: string;
        name_float: string;
    };
    style: {
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
        margin: marginStyle;    
        padding: paddingStyle;
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
const defaultArticleList: DefaultArticleList = {
    content: {
        theme: '0',
        carousel_col: '2',
        data_type: '0',
        keyword: '',
        category_ids: defaultSetting.category_ids,
        data_list: [],
        data_ids: '',
        data_auto_list: [],
        number: defaultSetting.page_size,
        order_by_type: defaultSetting.order_by_type,
        order_by_rule: defaultSetting.order_by_rule,
        field_show: ['0', '1', '3'],
        field_desc_row: '1',
        is_cover: defaultSetting.is_cover,
        // 角标配置
        seckill_subscript_show: '0',
        subscript_type: 'text',
        subscript_img_src: [],
        subscript_icon_class: '',
        subscript_text: '',
        name_float: '0'
    },
    style: {
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
        margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        // 内间距
        padding: {
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
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
        content_spacing: 10, // 内容间距
        article_spacing: 10, // 文章间距
        article_height: 155, // 文章高度
        content_img_width: undefined,
        content_img_height: undefined,
        interval_time: 3, //滚动时间
        is_roll: 1, // 是否轮播
        rolling_fashion: 'translation', // 滚动方式  translation 平移 cut-screen 切屏
        subscript_style: subscriptStyle,
        common_style: { ...defaultCommon, padding: 10, padding_top: 10, padding_bottom: 10, padding_left: 10, padding_right: 10 },
    },
};

export default defaultArticleList;
