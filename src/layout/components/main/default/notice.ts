import { get_math } from '@/utils';
import defaultCommon from './index';

interface carousel_list {
    id: string;
    notice_title: string;
    notice_link: object;
    is_show: boolean;
}
interface defaultSearch {
    content: {
        notice_style: string;
        title_type: string;
        title: string;
        direction: string;
        img_src: uploadList[];
        icon_class: string;
        more_link: object;
        interval_time: number;
        is_right_button: string;
        notice_list: carousel_list[];
    };
    style: {
        button_color: string;
        news_color: string;
        news_typeface: string;
        news_size: number;
        topic_color_list: color_list[];
        topic_color: string;
        topic_typeface: string;
        topic_size: number;
        topic_width: number;
        topic_height: number;
        container_height: number;
        icon_size: number;
        icon_color: string;
        container_color_list: color_list[],
        container_direction: string,
        container_background_img_style: string,
        container_background_img_url: uploadList[],
        container_radius: radiusStyle,
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        notice_style: 'inherit',
        direction: 'vertical',
        title_type: 'img-icon',
        title: '测试标题',
        img_src: [],
        icon_class: '',
        is_right_button: 'show',
        interval_time: 2,
        more_link: {},
        notice_list: [
            {
                id: get_math(),
                notice_title: '公告栏',
                notice_link: {},
                is_show: true,
            },
        ],
    },
    style: {
        news_color: '#000',
        news_typeface: '400',
        news_size: 12,
        topic_color_list: [
            {
                color: '',
                color_percentage: undefined,
            },
            {
                color: '',
                color_percentage: undefined,
            },
        ],
        topic_color: '#000',
        topic_typeface: '400',
        topic_size: 14,
        topic_width: 24,
        topic_height: 24,
        container_height: 44,
        icon_size: 12,
        icon_color: '#999',
        button_color: '#999',
        container_color_list: [{ color: '#fff', color_percentage: undefined }],
        container_direction: '180deg',
        container_background_img_style: '2',
        container_background_img_url: [],
        container_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        common_style: defaultCommon,
    },
};

export default defaultSearch;
