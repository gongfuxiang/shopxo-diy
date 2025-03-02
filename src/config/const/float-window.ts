import { get_math } from "@/utils";
import commonTop from './common-top';
interface defaultSearch {
    content: {
        content_top: object;
        button_jump: string;
        button_img: uploadList[];
        button_link: object;
    };
    style: {
        display_location: string;
        offset_number: number;
        offset_number_percentage: string;
        float_style: string;
        float_style_color: string;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        content_top: {
            ...commonTop,
        },
        // 跳转方式
        button_jump: 'link',
        // 图片信息
        button_img: [],
        // 跳转地址
        button_link: {},
    },
    style: {
        // 显示位置
        display_location: 'right',
        // 距离底部位置
        offset_number: 120,
        offset_number_percentage: '100%',
        // 浮动样式
        float_style: 'shadow',
        // 浮动样式颜色
        float_style_color: '#32373a1a',
    },
};

export default defaultSearch;
