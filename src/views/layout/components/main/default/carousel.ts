import { padding_computer } from "@/utils";
import defaultCommon from "./index";

interface carousel_list {
    carousel_img: uploadList[];
    carousel_link: object;
}
interface defaultSearch {
    content: {
        carousel_type: string;
        carousel_list: carousel_list[];
        img_fit: string,
        is_roll: string;
        interval_time: number;
    };
    style: {
        radius: number;
        radius_top_left: number;
        radius_top_right: number;
        radius_bottom_left: number;
        radius_bottom_right: number;
        is_show: string;
        height: number,
        indicator_style: string;
        indicator_location: string;
        indicator_size: number;
        indicator_radius: radiusStyle;
        actived_color: string;
        color: string;
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        carousel_type: 'inherit',
        img_fit: 'contain',
        is_roll: '1',
        interval_time: 2,
        carousel_list: [
            {
                carousel_img: [],
                carousel_link: {}
            },
            {
                carousel_img: [],
                carousel_link: {}
            },
            {
                carousel_img: [],
                carousel_link: {}
            }
        ]
    },
    style: {
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
        is_show: '1',
        height: 300,
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

export default defaultSearch;
