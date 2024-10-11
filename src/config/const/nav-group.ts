import { get_math } from '@/utils';
import defaultCommon from './index';
interface nav_group {
    id: string;
    img: uploadList[];
    title: string;
    link: object;
}
interface defaultSearch {
    content: {
        nav_style: string;
        single_line: number;
        display_style: string;
        row: number;
        nav_content_list: nav_group[];
    };
    style: {
        space: number;
        radius: number;
        radius_top_left: number;
        radius_top_right: number;
        radius_bottom_left: number;
        radius_bottom_right: number;
        is_show: string;
        is_roll: string;
        interval_time: number;
        indicator_style: string;
        indicator_location: string;
        indicator_size: number;
        indicator_radius: radiusStyle;
        actived_color: string;
        color: string;
        title_color: string;
        title_size: number;
        title_space: number;
        common_style: object;
    };
}

const defaultSearch: defaultSearch = {
    content: {
        display_style: 'fixed',
        nav_style: 'image_with_text',
        single_line: 4,
        row: 1,
        nav_content_list: [
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '测试标题',
                link: {},
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '测试标题',
                link: {},
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '测试标题',
                link: {},
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '测试标题',
                link: {},
            },
        ],
    },
    style: {
        space: 10,
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
        is_show: '1',
        is_roll: '1',
        interval_time: 3,
        indicator_style: 'dot',
        indicator_location: 'center',
        indicator_size: 5,
        indicator_radius: {
            radius: 4,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
        },
        actived_color: '#2A94FF',
        color: '#DDDDDD',
        title_color: '#000',
        title_size: 12,
        title_space: 10,
        common_style: {
            ...defaultCommon,
            padding_top: 9,
            padding_bottom: 5,
            padding_left: 15,
            padding_right: 15,
        },
    },
};

export default defaultSearch;
