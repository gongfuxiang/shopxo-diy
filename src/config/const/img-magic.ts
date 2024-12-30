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
        container_height: number;
        img_fit: string;
        limit_size: string,
        image_height: number;
        magic_cube_density: number;
    };
    style: {
        radius: number;
        radius_top_left: number;
        radius_top_right: number;
        radius_bottom_left: number;
        radius_bottom_right: number;
        image_spacing: number;
        direction: string,
        color_list: color_list[],
        background_img_style: string,
        background_img: uploadList[],
        margin: marginStyle,
        padding: paddingStyle,
        // 边框样式
        border_is_show: string,
        border_color: string,
        border_style: string,
        border_size: paddingStyle,
        // 阴影
        box_shadow_color: string,
        box_shadow_x: number,
        box_shadow_y: number,
        box_shadow_blur: number,
        box_shadow_spread: number,
        common_style: object;
    };
}

const defaultSearch: defaultSearch = {
    content: {
        // 图标风格
        style_actived: 0,
        // 图标数据
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
        // 容器高度
        container_height: 390,
        // 图标填充方式
        img_fit: 'cover',
        // 是否限制尺寸
        limit_size: '0',
        // 图片高度
        image_height: 100,
        // 魔方密度
        magic_cube_density: 4,
    },
    style: {
        // 图片圆角
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
        direction: '90deg',
        color_list: [{ color: '', color_percentage: undefined }],
        background_img_style: '0',
        background_img: [],
        margin: {
            margin_top: 0,
            margin_right: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin: 0
        },
        padding: {
            padding: 0,
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 0,
            padding_left: 0,
        },
        // 图片间距
        image_spacing: 2,
        // 边框样式
        border_is_show: '0',
        border_color: '#FF3F3F',
        border_style: 'solid',
        border_size: {
            padding: 1,
            padding_top: 1,
            padding_right: 1,
            padding_bottom: 1,
            padding_left: 1,
        },
        // 阴影
        box_shadow_color: '',
        box_shadow_x: 0,
        box_shadow_y: 0,
        box_shadow_blur: 0,
        box_shadow_spread: 0,
        common_style: defaultCommon,
    },
};

export default defaultSearch;
