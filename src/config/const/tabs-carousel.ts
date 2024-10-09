import { get_math } from '@/utils';
import defaultCommon from './index';
interface tabs_page {
    id: string;
    title: string;
    desc: string;
    data_type: string;
    classify: object;
    micro_page: string;
    micro_page_list: object;
    category_list: object;
}
interface carousel_list {
    carousel_img: uploadList[];
    carousel_video: uploadList[];
    carousel_link: object;
    video_title: string;
}
interface defaultTabs {
    content: {
        tabs_theme: string;
        tabs_top_up: string;
        home_data: tabs_page;
        tabs_list: tabs_page[];
        carousel_type: string;
        carousel_list: carousel_list[];
        img_fit: string,
        is_roll: string;
        interval_time: number;
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
        tabs_spacing: number;
        more_icon_class: string;
        more_icon_color: string;
        more_icon_size: number;
        data_spacing: number;
        radius: number;
        radius_top_left: number;
        radius_top_right: number;
        radius_bottom_left: number;
        radius_bottom_right: number;
        is_show: string;
        height: number,
        image_spacing: number,
        indicator_style: string;
        indicator_location: string;
        indicator_size: number;
        indicator_bottom: number;
        indicator_radius: radiusStyle;
        video_is_show: string;
        video_type: string;
        video_radius: radiusStyle;
        video_padding: paddingStyle;
        video_img: uploadList[];
        video_icon_class: string;
        video_icon_color: string;
        video_location: string;
        video_bottom: number;
        video_title_color: string;
        video_title_size: number;
        video_color_list: color_list[];
        video_direction: string;
        actived_color: string;
        color: string;
        common_style: object;
    };
}
const defaultTabs: defaultTabs = {
    content: {
        tabs_theme: '0',
        tabs_top_up: '1',
        home_data: { id: get_math(), title: '首页', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
        tabs_list: [
            { id: get_math(), title: '热门推荐', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
            { id: get_math(), title: '测试一', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
            { id: get_math(), title: '测试二', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
        ],
        carousel_type: 'inherit',
        img_fit: 'contain',
        is_roll: '1',
        interval_time: 3,
        carousel_list: [
            {
                carousel_img: [],
                carousel_video: [],
                carousel_link: {},
                video_title: '视频名称'
            },
            {
                carousel_img: [],
                carousel_video: [],
                carousel_link: {},
                video_title: '视频名称'
            },
            {
                carousel_img: [],
                carousel_video: [],
                carousel_link: {},
                video_title: '视频名称'
            }
        ]
    },
    style: {
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
        more_icon_class: 'fenlei-more',
        more_icon_color: '#000',
        more_icon_size: 14,
        data_spacing: 10,
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
        is_show: '1',
        height: 300,
        image_spacing: 10,
        indicator_style: 'dot',
        indicator_location: 'center',
        indicator_size: 5,
        indicator_bottom: 6,
        indicator_radius: {
            radius: 4,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
        },
        video_is_show: '1',
        video_type: 'icon',
        video_radius: {
            radius: 20,
            radius_top_left: 20,
            radius_top_right: 20,
            radius_bottom_left: 20,
            radius_bottom_right: 20,
        },
        video_padding: {
            padding: 0,
            padding_top: 3,
            padding_bottom: 3,
            padding_left: 6,
            padding_right: 12,
        },
        video_img: [],
        video_icon_class: '',
        video_icon_color: '#ff6868',
        video_location: 'center',
        video_bottom: 20,
        video_title_color: '#666',
        video_title_size: 12,
        video_color_list: [{ color: '#F0F0F0', color_percentage: undefined }],
        video_direction: '180deg',
        actived_color: '#2A94FF',
        color: '#DDDDDD',
        common_style: {
            ...defaultCommon,
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
    },
};

export default defaultTabs;
