import { get_math } from "@/utils";
import defaultCommon from "./index";
interface tabs_page {
    id: string;
    title: string;
    desc: string;
    data_type: string;
    classify: object;
    micro_page: string;
    micro_page_list: string[];
    category_list: string[];
}
interface defaultTabs {
    content: {
        tabs_theme: string;
        tabs_top_up: string;
        tabs_list: tabs_page[];
    };
    style: {
        tabs_checked: color_list[];
        tabs_direction: string;
        tabs_weight_checked: string,
        tabs_size_checked: number,
        tabs_color_checked: string,
        tabs_weight: string,
        tabs_size: number,
        tabs_color: string,
        tabs_spacing: number;
        common_style: object;
    };
}
const defaultTabs: defaultTabs = {
    content: {
        tabs_theme: '0',
        tabs_top_up: '1',
        tabs_list: [
            { id: get_math(), title: '热门推荐', desc: '简介', data_type: 'micro_page', classify: {}, micro_page: '', micro_page_list: [], category_list: [] },
            { id: get_math(), title: '测试一', desc: '简介',  data_type: 'micro_page', classify: {}, micro_page: '', micro_page_list: [],  category_list: [] },
            { id: get_math(), title: '测试二', desc: '简介',  data_type: 'micro_page', classify: {}, micro_page: '', micro_page_list: [],  category_list: [] },
        ]
    },
    style: {
        tabs_checked: [{ color: '#FF2222', color_percentage: undefined }, { color: '#FF9898', color_percentage: undefined }],
        tabs_direction: '90deg',
        tabs_weight_checked: '500',
        tabs_size_checked: 14,
        tabs_color_checked: 'rgba(51,51,51,1)',
        tabs_weight: '500',
        tabs_size: 14,
        tabs_color: 'rgba(51,51,51,1)',
        tabs_spacing: 20,
        common_style: {
            ...defaultCommon,
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        }
    },
};

export default defaultTabs;