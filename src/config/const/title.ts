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
        title: '',
        title_link: {},
        img_src: [],
        icon_class: '',
        subtitle: '',
        is_title_center: '0',
        keyword_show: '1',
        right_show: '1',
        right_title: '更多',
        right_link: {},
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
        title_color: '#000',
        title_size: 12,
        title_weight: 'normal',
        icon_size: 12,
        icon_color: '#999',
        subtitle_color: '#999',
        subtitle_size: 12,
        subtitle_weight: 'normal',
        keyword_color: '#000',
        keyword_size: 12,
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
