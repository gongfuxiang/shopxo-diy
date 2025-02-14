import { get_math } from '@/utils';
import defaultCommon from './index';
import commonTop from './common-top';
interface tabs_page {
    id: string;
    tabs_type: string;
    tabs_img: uploadList[];
    tabs_icon: string;
    title: string;
    desc: string;
    data_type: string;
    classify: object;
    micro_page: string;
    micro_page_list: object;
    category_list: object;
}
interface defaultTabs {
    content: {
        content_top: object;
        justification: string,
        show_more: string,
        tabs_theme: string;
        tabs_adorn_icon: string;
        tabs_adorn_img: uploadList[];
        tabs_top_up: string;
        home_data: tabs_page;
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
        tabs_padding: paddingStyle;
        more_icon_class: string;
        more_icon_color: string;
        more_icon_size: number;
        common_style: object;
    };
}
const defaultTabs: defaultTabs = {
    content: {
        content_top: {
            ...commonTop,
        },
        justification: 'left',
        show_more: '1',
        tabs_theme: '0',
        // 选中装饰图标
        tabs_adorn_icon: 'checked-smooth',
        tabs_adorn_img: [],
        tabs_top_up: '0',
        home_data: { id: get_math(), tabs_type: '0', tabs_img: [], tabs_icon: '', title: '首页', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
        tabs_list: [
            { id: get_math(), tabs_type: '0', tabs_img: [], tabs_icon: '', title: '热门推荐', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
            { id: get_math(), tabs_type: '0', tabs_img: [], tabs_icon: '', title: '测试一', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
            { id: get_math(), tabs_type: '0', tabs_img: [], tabs_icon: '', title: '测试二', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
        ],
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
        tabs_padding: {
            padding: 0,
            padding_top: 0,
            padding_bottom: 0,
            padding_left: 0,
            padding_right: 0,
        },
        more_icon_class: 'category-more',
        more_icon_color: '#000',
        more_icon_size: 14,
        common_style: {
            ...defaultCommon,
            color_list: [{ color: '#fff', color_percentage: undefined }],
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
    },
};

export default defaultTabs;
