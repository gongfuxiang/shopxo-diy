import { get_math } from '@/utils';
import defaultCommon from './index';
import commonTop from './common-top';

interface carousel_list {
    id: string;
    notice_title: string;
    notice_link: object;
    is_show: string;
}
interface defaultSearch {
    content: {
        content_top: object;
        notice_style: string;
        title_type: string;
        title: string;
        direction: string;
        img_src: uploadList[];
        /** 样式三：单条公告文案（替代 notice_list） */
        marquee_content: string;
        /** 样式三：是否开启横向滚动（1/0） */
        marquee_scroll: string;
        /** 样式三：是否全部显示（1/0） */
        is_full_display: string;
        /** 兼容旧数据，样式三已不再使用 */
        notice_left_img: uploadList[];
        notice_right_img: uploadList[];
        icon_class: string;
        right_title: string;
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
        /** 样式三全部显示：左侧图标垂直对齐 */
        left_icon_position: string;
        left_icon_margin: paddingStyle;
        /** 样式三全部显示：右侧更多图标垂直对齐 */
        right_icon_position: string;
        right_icon_margin: paddingStyle;
        /** 兼容旧数据 */
        icon_position: string;
        icon_margin: paddingStyle;
        icon_size: number;
        icon_color: string;
        /** 兼容旧数据 */
        marquee_slot_width: number;
        marquee_slot_height: number;
        container_color_list: color_list[],
        container_direction: string,
        container_background_img_style: string,
        container_background_img: uploadList[],
        container_radius: radiusStyle,
        container_padding: paddingStyle,
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        content_top: {
            ...commonTop,
        },
        // 风格
        notice_style: 'inherit',
        // 标题类型
        title_type: 'img-icon',
        title: '测试标题',
        img_src: [],
        marquee_content: '',
        marquee_scroll: '1',
        is_full_display: '1',
        notice_left_img: [],
        notice_right_img: [],
        // 滚动方式
        direction: 'vertical',
        interval_time: 3,
        // 更多配置
        is_right_button: '1',
        right_title: '',
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
        marquee_slot_width: 24,
        marquee_slot_height: 24,
        right_button_color: '#999',
        right_button_size: 12,
        // 容器高度
        container_height: 44,
        left_icon_position: 'center',
        left_icon_margin: {
            padding: 0,
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 0,
            padding_left: 0,
        },
        right_icon_position: 'center',
        right_icon_margin: {
            padding: 0,
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 0,
            padding_left: 0,
        },
        icon_position: 'center',
        icon_margin: {
            padding: 0,
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 0,
            padding_left: 0,
        },
        // 容器信息
        container_color_list: [{ color: '#fff', color_percentage: undefined }],
        container_direction: '180deg',
        container_background_img_style: '2',
        container_background_img: [],
        container_padding: {
            padding: 0,
            padding_top: 0,
            padding_right: 10,
            padding_bottom: 0,
            padding_left: 10,
        },
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
