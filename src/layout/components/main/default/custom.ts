import defaultCommon from "./index";

interface defaultSearch {
    content: {
        height: number;
        img_key: string;
        data_source: string;
        source_list: string[];
        custom_list: string[];
    };
    style: {
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        height: 390,
        img_key: '',
        source_list: [],
        data_source:'',
        custom_list: []
    },
    style: {
        common_style: {
            ...defaultCommon,
            color_list: [{ color: 'rgb(244, 252, 255)', color_percentage: '' }],
        }
    },
};

export default defaultSearch;
