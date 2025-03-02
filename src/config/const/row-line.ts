import defaultCommon from './index';
import commonTop from './common-top';
interface DefaultRowLine {
    content: {
        content_top: object;
        styles: string;
    };
    style: {
        line_color: string;
        line_width: number;
        common_style: object;
    };
}
const defaultRowLine: DefaultRowLine = {
    content: {
        content_top: {
            ...commonTop,
        },
        // 线条样式
        styles: 'solid',
    },
    style: {
        // 线条颜色
        line_color: 'rgba(204, 204, 204, 1)',
        line_width: 1,
        common_style: {
            ...defaultCommon,
            padding_top: 10,
            padding_bottom: 10,
        },
    },
};

export default defaultRowLine;
