import { get_math } from '@/utils';
import defaultCommon from './index';
interface nav_group {
    id: string;
    nav_image: uploadList[];
    title: string;
    title_link: object;
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
        radius: number;
        radius_top_left: number;
        radius_top_right: number;
        radius_bottom_left: number;
        radius_bottom_right: number;
        is_show: boolean;
        is_roll: boolean;
        interval_time: number;
        indicator_style: string;
        indicator_location: string;
        indicator_size: number;
        indicator_radius: radiusStyle;
        actived_color: string;
        color: string;
        title_color: string;
        title_size: number;
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
                nav_image: [],
                title: '测试标题',
                title_link: {},
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                nav_image: [],
                title: '测试标题',
                title_link: {},
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                nav_image: [],
                title: '测试标题',
                title_link: {},
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                nav_image: [],
                title: '测试标题',
                title_link: {},
            },
        ],
    },
    style: {
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
        is_show: true,
        is_roll: true,
        interval_time: 2,
        indicator_style: 'dot',
        indicator_location: 'center',
        indicator_size: 5,
        indicator_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        actived_color: '#2A94FF',
        color: '#DDDDDD',
        title_color: '#000',
        title_size: 12,
        common_style: {
            ...defaultCommon,
            padding_top: 9,
            padding_bottom: 9,
            padding_left: 15,
            padding_right: 15,
        },
    },
};

export default defaultSearch;
