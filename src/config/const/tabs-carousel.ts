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
        img_fit: string;
        is_roll: string;
        interval_time: number;
        height: number;
    };
    style: {
        tabs_one_theme: string;
        tabs_checked: color_list[];
        tabs_direction: string;
        tabs_weight_checked: string;
        tabs_size_checked: number;
        tabs_color_checked: string;
        tabs_weight: string;
        tabs_size: number;
        tabs_color: string;
        tabs_spacing: number;
        tabs_sign_spacing: number;
        tabs_padding: paddingStyle;
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
        image_spacing: number;
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
        // 选项卡风格
        tabs_theme: '0',
        // 是否置顶
        tabs_top_up: '1',
        // 选项卡数据
        home_data: { id: get_math(), title: '首页', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
        tabs_list: [
            { id: get_math(), title: '热门推荐', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
            { id: get_math(), title: '测试一', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
            { id: get_math(), title: '测试二', desc: '简介', data_type: '0', classify: {}, micro_page: '', micro_page_list: {}, category_list: {} },
        ],
        // 轮播类型
        carousel_type: 'inherit',
        // 轮播图片方式
        img_fit: 'contain',
        // 轮播是否滚动
        is_roll: '1',
        interval_time: 3,
        // 轮播图片列表
        carousel_list: [
            {
                carousel_img: [],
                carousel_video: [],
                carousel_link: {},
                video_title: '视频名称',
            },
            {
                carousel_img: [],
                carousel_video: [],
                carousel_link: {},
                video_title: '视频名称',
            },
            {
                carousel_img: [],
                carousel_video: [],
                carousel_link: {},
                video_title: '视频名称',
            },
        ],
        // 轮播高度
        height: 300,
    },
    style: {
        // 选项卡设置
        tabs_one_theme: '0',
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
        tabs_sign_spacing: 4,
        tabs_padding: {
            padding: 0,
            padding_top: 0,
            padding_bottom: 0,
            padding_left: 0,
            padding_right: 0,
        },
        // 更多设置
        more_icon_class: 'category-more',
        more_icon_color: '#000',
        more_icon_size: 14,
        // 选项卡与轮播之间的间距
        data_spacing: 0,
        // 图片圆角
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
        // 图片间距
        image_spacing: 10,
        // 指示器设置
        is_show: '1',
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
        actived_color: '#2A94FF',
        color: '#DDDDDD',
        // 轮播视频处理
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
        // 视频标题设置
        video_title_color: '#666',
        video_title_size: 12,
        // 轮播视频背景
        video_color_list: [{ color: '#F0F0F0', color_percentage: undefined }],
        video_direction: '180deg',
        // 公共样式
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
