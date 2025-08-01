import { get_math } from '@/utils';
import { cloneDeep } from 'lodash';
import defaultCommon from './index';
import commonTop from './common-top';
// 轮播图
import defaultCarousel from '@/config/const/carousel';
// 视频
import defaultVideo from '@/config/const/video';
// 导航组
import defaultNavGroup from '@/config/const/nav-group';
// 文章列表
import defaultArticleList from '@/config/const/article-list';
// 商品列表
import defaultGoodsList from '@/config/const/goods-list';
// 商品魔方
import defaultGoodsMagic from '@/config/const/goods-magic';
// 图片魔方
import defaultImgMagic from '@/config/const/img-magic';
// 热区
import defaultHotZone from '@/config/const/hot-zone';
// 自定义
import defaultCustom from '@/config/const/custom';
interface tabs_page {
    id: string;
    tabs_type: string;
    tabs_img: uploadList[];
    tabs_icon: string;
    is_sliding_fixed: string,
    title: string;
    desc: string;
    data_type: string;
    classify: object;
    micro_page: string;
    micro_page_list: object;
    category_list: object;
    magic_type: string;
    carousel: object;
    video: object;
    nav_group: object;
    article_list: object;
    goods_list: object;
    goods_magic: object;
    img_magic: object;
    hot_zone: object;
    custom: object;
}
interface defaultTabs {
    content: {
        content_top: object;
        justification: string,
        rotating_background: string;
        show_more: string,
        tabs_theme: string;
        tabs_adorn_icon: string;
        tabs_adorn_img: uploadList[];
        tabs_top_up: string;
        is_tabs_safe_distance: string;
        home_data: tabs_page;
        tabs_active_index: number;
        tabs_list: tabs_page[];
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
        tabs_sign_spacing: number;
        tabs_bg_direction: string,
        tabs_bg_color_list: color_list[],
        tabs_bg_background_img_style: string,
        tabs_bg_background_img: string[],
        tabs_radius: radiusStyle;
        tabs_margin: marginStyle;
        tabs_padding: paddingStyle;
        tabs_content: object;
        more_icon_class: string;
        more_icon_color: string;
        more_icon_size: number;
        data_spacing: number;
        common_style: object;
    };
}
// 魔方配置
export const magic_config = {
    carousel: {
        content: cloneDeep(defaultCarousel.content),
        style: {
            ...cloneDeep(defaultCarousel.style),
            // 轮播内间距设置
            carousel_content_direction: '90deg',
            carousel_content_color_list: [{ color: '', color_percentage: undefined }],
            carousel_content_background_img_style: '2',
            carousel_content_background_img: [],
            carousel_content_radius: {
                radius: 0,
                radius_top_left: 0,
                radius_top_right: 0,
                radius_bottom_left: 0,
                radius_bottom_right: 0,
            },
            carousel_content_margin: {
                margin: 0,
                margin_top: 0,
                margin_bottom: 0,
                margin_left: 0,
                margin_right: 0,
            },
            carousel_content_padding: {
                padding: 0,
                padding_top: 0,
                padding_bottom: 10,
                padding_left: 10,
                padding_right: 10,
            },
            carousel_content: {
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
        }
    },
    video: cloneDeep(defaultVideo),
    nav_group: cloneDeep(defaultNavGroup),
    article_list: cloneDeep(defaultArticleList),
    goods_list: cloneDeep(defaultGoodsList),
    goods_magic: cloneDeep(defaultGoodsMagic),
    img_magic: cloneDeep(defaultImgMagic),
    hot_zone: cloneDeep(defaultHotZone),
    custom: cloneDeep(defaultCustom),
}

const defaultTabs: defaultTabs = {
    content: {
        content_top: {
            ...commonTop,
        },
        justification: 'left',
        show_more: '1',
        // 选项卡风格
        tabs_theme: '0',
        rotating_background: '0',
        // 选中装饰图标
        tabs_adorn_icon: 'checked-smooth',
        tabs_adorn_img: [],
        // 是否置顶
        tabs_top_up: '0',
        // 是否支持安全距离
        is_tabs_safe_distance: '0',
        // 选项卡索引
        tabs_active_index: 0,
        // 选项卡数据
        home_data: { 
            id: get_math(), 
            tabs_type: '0', 
            tabs_img: [], 
            tabs_icon: '', 
            is_sliding_fixed: '0', 
            title: '首页', 
            desc: '简介', 
            data_type: '0', 
            classify: {},
            micro_page: '', 
            micro_page_list: {}, 
            category_list: {},
            magic_type: 'carousel',
            ...cloneDeep(magic_config),
        },
        tabs_list: [
            { 
                id: get_math(), 
                tabs_type: '0', 
                tabs_img: [],
                tabs_icon: '', 
                is_sliding_fixed: '0',
                title: '热门推荐',
                desc: '简介',
                data_type: '0',
                classify: {},
                micro_page: '',
                micro_page_list: {},
                category_list: {},
                magic_type: 'carousel',
                ...cloneDeep(magic_config),
            },
            { 
                id: get_math(), 
                tabs_type: '0', 
                tabs_img: [], 
                tabs_icon: '', 
                is_sliding_fixed: '0', 
                title: '测试一', 
                desc: '简介', 
                data_type: '0', 
                classify: {}, 
                micro_page: '', 
                micro_page_list: {}, 
                category_list: {},
                magic_type: 'carousel',
                ...cloneDeep(magic_config),
            },
            { 
                id: get_math(), 
                tabs_type: '0', 
                tabs_img: [], 
                tabs_icon: '', 
                is_sliding_fixed: '0', 
                title: '测试二', 
                desc: '简介', 
                data_type: '0', 
                classify: {}, 
                micro_page: '', 
                micro_page_list: {}, 
                category_list: {},
                magic_type: 'carousel',
                ...cloneDeep(magic_config),
            },
        ],
    },
    style: {
        // 选项卡设置
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
        // 更多设置
        more_icon_class: 'category-more',
        more_icon_color: '#000',
        more_icon_size: 14,
        // 选项卡与轮播之间的间距
        data_spacing: 0,
        // 公共样式
        common_style: defaultCommon,
    },
};

export default defaultTabs;
