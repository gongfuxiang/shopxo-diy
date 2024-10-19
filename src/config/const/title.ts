import { get_math, padding_computer } from '@/utils';
import defaultCommon from './index';

interface carousel_list {
    id: string;
    title: string;
    link: object;
    is_show: string;
}
interface defaultSearch {
    content: {
        title: string;
        title_link: object;
        img_src: uploadList[];
        icon_class: string;
        subtitle: string;
        is_title_center: string;
        keyword_show: string;
        keyword_list: carousel_list[];
        right_show: string;
        right_title: string;
        right_link: object;
    };
    style: {
        title_color: string;
        title_size: number;
        title_weight: string;
        img_height: number;
        icon_size: number;
        icon_color: string;
        subtitle_color: string;
        subtitle_size: number;
        subtitle_weight: string;
        keyword_color: string;
        keyword_size: number;
        right_color: string;
        right_size: number;
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        // 左侧图片或icon
        img_src: [],
        icon_class: '',
        // 标题
        title: '标题',
        title_link: {},
        // 副标题
        subtitle: '',
        // 内容居中
        is_title_center: '0',
        // 右侧内容设置
        right_show: '1',
        right_title: '更多',
        right_link: {},
        // 是否显示关键字
        keyword_show: '1',
        // 关键字数组
        keyword_list: [
            {
                id: get_math(),
                title: '',
                link: {},
                is_show: '1',
            },
        ],
    },
    style: {
        // 标题设置
        title_color: '#000',
        title_size: 12,
        title_weight: 'normal',
        // 图片高度
        img_height: 30,
        // icon 大小
        icon_size: 12,
        icon_color: '#999',
        // 副标题设置
        subtitle_color: '#999',
        subtitle_size: 12,
        subtitle_weight: 'normal',
        // 关键字设置
        keyword_color: '#000',
        keyword_size: 12,
        // 右侧更多按钮设置
        right_color: '#999',
        right_size: 12,
        common_style: {
            ...defaultCommon,
            color_list: [{ color: '#fff', color_percentage: undefined }],
            padding: 15,
            padding_top: 15,
            padding_bottom: 15,
            padding_left: 15,
            padding_right: 15,
        },
    },
};

export default defaultSearch;
