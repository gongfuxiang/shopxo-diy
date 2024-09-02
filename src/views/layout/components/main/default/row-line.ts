import defaultCommon from './index';
interface DefaultRowLine {
    content: {
        styles: string;
    };
    style: {
        line_color: string;
        line_width: number;
        padding_top: number;
        padding_bottom: number;
        common_style: object;
    };
}
const defaultRowLine: DefaultRowLine = {
    content: {
        styles: 'solid',
    },
    style: {
        line_color: 'rgba(204, 204, 204, 1)',
        line_width: 1,
        padding_top: 10,
        padding_bottom: 10,
        common_style: {
            ...defaultCommon,
            padding_top: 10,
            padding_bottom: 10,
        },
    },
};

export default defaultRowLine;
