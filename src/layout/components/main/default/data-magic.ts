import { get_math } from "@/utils";
import defaultCommon from "./index";
import { tr } from "element-plus/es/locale";
interface data_magic {
    start: object;
    end: object;
    img: uploadList[];
    data_content: object;
    data_style: object;
}
interface defaultSearch {
    content: {
        style_actived: number;
        data_magic_list: data_magic[];
    };
    style: {
        img_radius: object
        data_radius: object;
        image_spacing: number;
        common_style: object;
    };
}

const defaultSearch: defaultSearch = {
    content: {
        style_actived: 0,
        data_magic_list: [],
    },
    style: {
        img_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        data_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        image_spacing: 2,
        common_style: defaultCommon,
    },
};

export default defaultSearch;
