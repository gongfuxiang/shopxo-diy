import defaultCommon from './index';
import defaultGoodsList from '@/config/const/goods-list';
import defaultArticleList from '@/config/const/article-list';
import defaultCustom from '@/config/const/custom';
import commonTop from './common-top';
import { cloneDeep } from 'lodash';

interface articleTabsList {
    id: string;
    tabs_type: string;
    tabs_img: uploadList[];
    tabs_icon: string;
    title: string;
    img: uploadList[];
    desc: string;
    data_type: string;
    tabs_data_type: string;
    tabs_name: string;
    goods_config: any;
    article_config: any;
    custom_config: any;
}
interface DefaultProductList {
    content: {
        content_top: object;
        tabs_theme: string;
        tabs_adorn_icon: string;
        tabs_adorn_img: uploadList[];
        tabs_top_up: string;
        tabs_list: articleTabsList[];
        tabs_active_index: number;
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
        tabs_icon_size_checked: number;
        tabs_icon_color: string;
        tabs_icon_size: number;
        is_tabs_img_background: string;
        tabs_top_img_radius: radiusStyle;
        tabs_top_img_height: number;
        tabs_img_radius: radiusStyle;
        tabs_img_height: number;
        tabs_spacing: number;
        tabs_sign_spacing: number;
        tabs_bg_direction: string;
        tabs_bg_color_list: color_list[];
        tabs_bg_background_img_style: string;
        tabs_bg_background_img: string[];
        tabs_radius: radiusStyle;
        tabs_margin: marginStyle;
        tabs_padding: paddingStyle;
        tabs_content: object;
        data_content_direction: string;
        data_content_color_list: color_list[];
        data_content_background_img_style: string;
        data_content_background_img: string[];
        data_content_radius: radiusStyle;
        data_content_margin: marginStyle;
        data_content_padding: paddingStyle;
        data_content_spacing: number;
        data_content: object;
        common_style: object;
    };
}
const defaultProductList: DefaultProductList = {
    content: {
        content_top: {
            ...commonTop,
        },
        // 选项卡风格
        tabs_theme: '0',
        // 选中装饰图标
        tabs_adorn_icon: 'checked-smooth',
        tabs_adorn_img: [],
        // 是否置顶
        tabs_top_up: '0',
        // 选项卡数据
        tabs_list: [
            { id: '1', tabs_type: '0', tabs_img: [], tabs_icon: '', title: '热门推荐', img: [], desc: '简介', data_type: '0', tabs_data_type: 'goods', tabs_name: 'content', goods_config: cloneDeep(defaultGoodsList), article_config: cloneDeep(defaultArticleList), custom_config: cloneDeep(defaultCustom) },
            { id: '2', tabs_type: '0', tabs_img: [], tabs_icon: '', title: '测试一', img: [], desc: '简介', data_type: '0', tabs_data_type: 'goods', tabs_name: 'content', goods_config: cloneDeep(defaultGoodsList), article_config: cloneDeep(defaultArticleList), custom_config: cloneDeep(defaultCustom) },
            { id: '3', tabs_type: '0', tabs_img: [], tabs_icon: '', title: '测试二', img: [], desc: '简介', data_type: '0', tabs_data_type: 'goods', tabs_name: 'content', goods_config: cloneDeep(defaultGoodsList), article_config: cloneDeep(defaultArticleList), custom_config: cloneDeep(defaultCustom) },
            { id: '4', tabs_type: '0', tabs_img: [], tabs_icon: '', title: '测试三', img: [], desc: '简介', data_type: '0', tabs_data_type: 'goods', tabs_name: 'content', goods_config: cloneDeep(defaultGoodsList), article_config: cloneDeep(defaultArticleList), custom_config: cloneDeep(defaultCustom) },
        ],
        // 选中的内容索引
        tabs_active_index: 0,
    },
    style: {
        // 选中样式风格
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
        tabs_top_img_radius: {
            radius: 100,
            radius_top_left: 100,
            radius_top_right: 100,
            radius_bottom_left: 100,
            radius_bottom_right: 100,
        },
        tabs_top_img_height: 39,
        is_tabs_img_background: '0',
        tabs_img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        tabs_img_height: 20,
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
        // 数据内容设置
        data_content_direction: '90deg',
        data_content_color_list: [{ color: '', color_percentage: undefined }],
        data_content_background_img_style: '2',
        data_content_background_img: [],
        data_content_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        data_content_margin: {
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
        },
        data_content_padding: {
            padding: 0,
            padding_top: 0,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        data_content_spacing: 0,
        data_content: {
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
        common_style: defaultCommon,
    },
};

export default defaultProductList;
