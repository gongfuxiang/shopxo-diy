import defaultCommon from "./index";
interface defaultSearch {
    content: {
        height: number;
    };
    style: {
        line_color: string;
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        height: 50
    },
    style: {
        line_color: 'rgba(204, 204, 204, 1)',
        common_style: defaultCommon,
    },
};

export default defaultSearch;
