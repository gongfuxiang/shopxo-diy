import defaultCommon from './index';
import commonTop from './common-top';
import defaultSetting from '../setting/index';
import subscriptStyle from './subscript-style';
interface BlogList {
    id: number | string;
    data: object;
    new_title: string;
    new_cover: uploadList[];
}
interface blogTabsList {
    id: string;
    tabs_type: string;
    tabs_img: uploadList[];
    tabs_icon: string;
    is_sliding_fixed: string,
    title: string;
    desc: string;
    data_type: string;
    keywords: string;
    category_ids: string[];
    number: number;
    order_by_type: number;
    order_by_rule: number;
    is_cover: string;
    data_ids: string;
    data_list: BlogList[];
    data_auto_list: BlogList[];
}
interface DefaultBlogTabs {
    content: {
        content_top: object;
        tabs_theme: string;
        tabs_adorn_icon: string;
        tabs_adorn_img: uploadList[];
        is_general_safe_distance: string;
        tabs_top_up: string;
        blog_theme: string;
        blog_carousel_col: string;
        tabs_list: blogTabsList[];
        tabs_active_index: number;
        field_show: string[];
        field_desc_row: string;
        seckill_subscript_show: string;
        subscript_type: string;
        subscript_img_src: uploadList[];
        subscript_icon_class: string;
        subscript_text: string;
        name_float: string;
        justification: string;
    };
    style: {
        tabs_one_theme: string;
        tabs_checked: color_list[];
        is_tabs_adorn_img_background: string;
        tabs_adorn_icon_size: number,
        tabs_adorn_img_radius: radiusStyle,
        tabs_adorn_img_height: number,
        tabs_direction: string;
        tabs_weight_checked: string;
        tabs_size_checked: number;
        tabs_color_checked: string;
        tabs_weight: string;
        tabs_size: number;
        tabs_color: string;
        tabs_icon_color_checked: string;
        tabs_icon_size_checked: number,
        tabs_icon_color: string,
        tabs_icon_size: number,
        is_tabs_img_background: string,
        tabs_img_radius: radiusStyle,
        tabs_img_height: number,
        tabs_spacing: number;
        tabs_bg_direction: string,
        tabs_bg_color_list: color_list[],
        tabs_bg_background_img_style: string,
        tabs_bg_background_img: string[],
        tabs_sign_spacing: number;
        tabs_radius: radiusStyle;
        tabs_margin: marginStyle;
        tabs_padding: paddingStyle;
        tabs_content: object;
        blog_content_direction: string;
        blog_content_color_list: color_list[];
        blog_content_background_img_style: string;
        blog_content_background_img: string[];
        blog_content_radius: radiusStyle;
        blog_content_margin: marginStyle;
        blog_content_padding: paddingStyle;
        blog_content_spacing: number;
        blog_content: object;
        blog_direction: string,
        blog_color_list: color_list[],
        blog_background_img_style: string,
        blog_background_img: uploadList[],
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
        blog_spacing: number;
        content_spacing: number;
        blog_height: number;
        content_img_width: number;
        content_img_height: number;
        interval_time: number; //滚动时间
        is_roll: number;
        rolling_fashion: string;
        subscript_style: object;
        common_style: object;
    };
}
const defaultBlogTabs: DefaultBlogTabs = {
    content: {
        content_top: {
            ...commonTop,
        },
        // 对齐方式
        justification: 'left',
        tabs_theme: '0',
        is_general_safe_distance: '0',
        // 选中装饰图标
        tabs_adorn_icon: 'checked-smooth',
        tabs_adorn_img: [],
        tabs_top_up: '0',
        blog_theme: '0',
        blog_carousel_col: '2',
        tabs_list: [
            { id: '1', tabs_type: '0', tabs_img: [], tabs_icon: '', is_sliding_fixed: '0', title: '热门推荐', desc: '简介', data_type: '0', keywords: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '2', tabs_type: '0', tabs_img: [], tabs_icon: '', is_sliding_fixed: '0', title: '测试一', desc: '简介', data_type: '0', keywords: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '3', tabs_type: '0', tabs_img: [], tabs_icon: '', is_sliding_fixed: '0', title: '测试二', desc: '简介', data_type: '0', keywords: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '4', tabs_type: '0', tabs_img: [], tabs_icon: '', is_sliding_fixed: '0', title: '测试三', desc: '简介', data_type: '0', keywords: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '5', tabs_type: '0', tabs_img: [], tabs_icon: '', is_sliding_fixed: '0', title: '测试四', desc: '简介', data_type: '0', keywords: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
            { id: '6', tabs_type: '0', tabs_img: [], tabs_icon: '', is_sliding_fixed: '0', title: '测试五', desc: '简介', data_type: '0', keywords: '', category_ids: defaultSetting.category_ids, data_ids: '', number: defaultSetting.page_size, order_by_type: defaultSetting.order_by_type, order_by_rule: defaultSetting.order_by_rule, is_cover: defaultSetting.is_cover, data_list: [], data_auto_list: [] },
        ],
        tabs_active_index: 0,
        field_show: ['0', '1', '3'],
        field_desc_row: '1',
        // 角标配置
        seckill_subscript_show: '0',
        subscript_type: 'text',
        subscript_img_src: [],
        subscript_icon_class: '',
        subscript_text: '',
        name_float: '0'
    },
    style: {
        tabs_one_theme: '0',
        tabs_checked: [
            { color: '#FF2222', color_percentage: undefined },
            { color: '#FF9898', color_percentage: undefined },
        ],
        is_tabs_adorn_img_background: '0',
        tabs_adorn_icon_size: 15,
        tabs_adorn_img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        tabs_adorn_img_height: 10,
        tabs_direction: '90deg',
        tabs_weight_checked: 'bold',
        tabs_size_checked: 14,
        tabs_color_checked: 'rgba(51,51,51,1)',
        tabs_weight: 'bold',
        tabs_size: 14,
        tabs_color: 'rgba(51,51,51,1)',
        // 选项卡图标和图片设置
        tabs_icon_color_checked: 'rgba(51,51,51,1)',
        tabs_icon_size_checked: 14,
        tabs_icon_color: 'rgba(51,51,51,1)',
        tabs_icon_size: 14,
        is_tabs_img_background: '0',
        tabs_img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        tabs_img_height: 20,
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
        tabs_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        tabs_padding: {
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        tabs_content: {
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
        },
        // 博客内容设置
        blog_content_direction: '90deg',
        blog_content_color_list: [{ color: '', color_percentage: undefined }],
        blog_content_background_img_style: '2',
        blog_content_background_img: [],
        blog_content_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        blog_content_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        blog_content_padding: {
            padding: 0,
            padding_top: 0,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        blog_content: {
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
        },
        blog_content_spacing: 0,
        // 博客背景设置
        blog_direction: '90deg',
        blog_color_list: [{ color: '#fff', color_percentage: undefined }],
        blog_background_img_style: '0',
        blog_background_img: [],
        name_weight: 'bold',
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
        blog_spacing: 10, // 博客间距
        blog_height: 155, // 博客高度
        content_img_width: 110,
        content_img_height: 83,
        interval_time: 3, //滚动时间
        is_roll: 1, // 是否轮播
        rolling_fashion: 'translation', // 滚动方式  translation 平移 cut-screen 切屏
        subscript_style: subscriptStyle,
        common_style: defaultCommon,
    },
};

export default defaultBlogTabs;
