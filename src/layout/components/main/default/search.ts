import { get_math } from "@/utils";
import defaultCommon from "./index";
interface hot_word_list {
    id: string;
    value: string;
    color: string;
}
interface defaultSearch {
    content: {
        style_radio: string;
        style_type: string;
        logo: string;
        search_title: string;
        search_link: object;
        location: string;
        tips: string;
        hot_word_list: hot_word_list[];
    };
    style: {
        search_border: string;
        tips_color: string;
        hot_words_color: string;
        text_location: string;
        text_style: string;
        text_color: string;
        text_size: number;
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        style_radio: 'search',
        style_type: 'title',
        logo: '',
        search_title: '',
        search_link: {},
        location: 'store',
        tips: '',
        hot_word_list: [
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                value: '',
                color: '#000000',
            }
        ],
    },
    style: {
        search_border: '#F5F5F5',
        tips_color: '#CCCCCC',
        hot_words_color: '#000',
        text_location: 'left',
        text_style: 'normal',
        text_color: '#000',
        text_size: 15,
        common_style: {
            ...defaultCommon,
            padding_top: 9,
            padding_bottom: 9,
            padding_left: 15,
            padding_right: 15,
        }
    },
};

export default defaultSearch;
