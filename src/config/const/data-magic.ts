import { get_math } from "@/utils";
import defaultCommon from "./index";
interface data_magic {
    start: object;
    end: object;
    data_content: object;
    data_style: object;
}
interface defaultSearch {
    content: {
        magic_cube_density: number;
        style_actived: number;
        container_height: number;
        // limit_size: string;
        data_magic_list: data_magic[];
    };
    style: {
        image_spacing: number;
        data_radius: object;
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
        // 数据密度 4 x 4 | 6 x 6 | 8 x 8
        magic_cube_density: 4,
        // 样式风格
        style_actived: 0,
        // 容器高度
        container_height: 390,
        // 是否限制尺寸
        // limit_size: '1',
        // 数据列表
        data_magic_list: [],
    },
    style: {
        // 内容圆角
        data_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        // 图片间距
        image_spacing: 2,
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
        // 公共样式
        common_style: defaultCommon,
    },
};

export default defaultSearch;
