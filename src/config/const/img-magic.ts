import { get_math } from "@/utils";
import defaultCommon from "./index";
interface img_magic {
    start: object;
    end: object;
    img: uploadList[],
    img_link: object;
}
interface defaultSearch {
    content: {
        style_actived: number;
        img_magic_list: img_magic[];
        img_fit: string;
        limit_size: string,
        image_height: number;
    };
    style: {
        radius: number;
        radius_top_left: number;
        radius_top_right: number;
        radius_bottom_left: number;
        radius_bottom_right: number;
        image_spacing: number;
        common_style: object;
    };
}

const defaultSearch: defaultSearch = {
    content: {
        style_actived: 0,
        img_magic_list: [
            {
                start: {x: 1, y: 1},
                end: {x: 4, y: 2},
                img: [],
                img_link: {}
            },
            {
                start: {x: 1, y: 3},
                end: {x: 4, y: 4},
                img: [],
                img_link: {}
            }
        ],
        img_fit: 'cover',
        limit_size: '0',
        image_height: 100,
    },
    style: {
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
        image_spacing: 2,
        common_style: defaultCommon,
    },
};

export default defaultSearch;
