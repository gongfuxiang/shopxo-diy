import { de } from "element-plus/es/locale";
import defaultCommon from "./index";

interface defaultSearch {
    content: {
        height: number;
        data_source: string;
        custom_list: string[];
    };
    style: {
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        height: 390,
        data_source:'',
        custom_list: []
    },
    style: {
        common_style: {
            ...defaultCommon,
            color_list: ['rgb(244, 252, 255)'],
        }
    },
};

export default defaultSearch;
