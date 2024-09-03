import { get_math, padding_computer } from '@/utils';
import defaultCommon from './index';

interface carousel_list {
    id: string;
    title: string;
    link: object;
    is_show: boolean;
}
interface defaultSearch {
    content: {
        title: string;
        title_link: object;
        is_title_center: number;
        keyword_show: true;
        keyword_list: carousel_list[];
        right_show: true;
        right_title: string;
        right_link: object;
    };
    style: {
        title_color: string;
        title_size: number;
        title_weight: string;
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
        is_title_center: 0,
        keyword_show: true,
        right_show: true,
        right_title: '更多',
        right_link: {},
        keyword_list: [
            {
                id: get_math(),
                title: '',
                link: {},
                is_show: true,
            },
        ],
    },
    style: {
        title_color: '#000',
        title_size: 12,
        title_weight: 'normal',
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
