import { get_math } from '@/utils';
import defaultCommon from './index';

interface carousel_list {
    id: string;
    notice_title: string;
    notice_link: object;
    is_show: string;
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
        right_button_color: string;
        right_button_size: number;
        news_color: string;
        news_typeface: string;
        news_size: number;
        title_color_list: color_list[];
        title_color: string;
        title_typeface: string;
        title_size: number;
        title_width: number;
        title_height: number;
        container_height: number;
        icon_size: number;
        icon_color: string;
        container_color_list: color_list[],
        container_direction: string,
        container_background_img_style: string,
        container_background_img: uploadList[],
        container_radius: radiusStyle,
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        // 风格
        notice_style: 'inherit',
        // 标题类型
        title_type: 'img-icon',
        title: '测试标题',
        img_src: [],
        // 滚动方式
        direction: 'vertical',
        interval_time: 3,
        // 更多配置
        is_right_button: '1',
        more_link: {},
        icon_class: '',
        // 公告内容
        notice_list: [
            {
                id: get_math(),
                notice_title: '公告栏',
                notice_link: {},
                is_show: '1',
            },
        ],
    },
    style: {
        // 内容标题
        news_color: '#000',
        news_typeface: '400',
        news_size: 12,
        // 标题背景
        title_color_list: [
            {
                color: '',
                color_percentage: undefined,
            },
            {
                color: '',
                color_percentage: undefined,
            },
        ],
        // 标题信息
        title_color: '#000',
        title_typeface: '400',
        title_size: 14,
        title_width: 24,
        title_height: 24, 
        icon_size: 12,
        icon_color: '#999',
        right_button_color: '#999',
        right_button_size: 12,
        // 容器高度
        container_height: 44,
        // 容器信息
        container_color_list: [{ color: '#fff', color_percentage: undefined }],
        container_direction: '180deg',
        container_background_img_style: '2',
        container_background_img: [],
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
