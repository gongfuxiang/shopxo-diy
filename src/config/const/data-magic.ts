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
        style_actived: number;
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
        // 样式风格
        style_actived: 0,
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
