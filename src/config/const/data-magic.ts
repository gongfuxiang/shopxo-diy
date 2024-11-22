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
        // 公共样式
        common_style: defaultCommon,
    },
};

export default defaultSearch;
