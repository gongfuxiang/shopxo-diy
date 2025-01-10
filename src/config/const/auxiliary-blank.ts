import defaultCommon from "./index";
import commonTop from './common-top';
interface defaultSearch {
    content: {
        content_top: object;
        height: number;
    };
    style: {
        line_color: string;
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        content_top: {
            ...commonTop,
        },
        height: 50
    },
    style: {
        line_color: '',
        common_style: defaultCommon,
    },
};

export default defaultSearch;
