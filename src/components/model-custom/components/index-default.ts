
// 文本的默认值
export const text_com_data = {
    com_width: 150,
    com_height: 17,
    staging_height: 17,
    text_title: '文本',
    data_source_id: '',
    data_source_list: {},
    text_link: {},
    is_rich_text: '0',
    is_up_down: '1',
    text_color: '#000',
    text_weight: 'normal',
    text_size: 12,
    text_option: 'none',
    text_location: 'left',
    text_padding: {
        padding: 0,
        padding_top: 0,
        padding_bottom: 0,
        padding_left: 0,
        padding_right: 0,
    },
    text_rotate: 0,
    border_show: '0',
    border_color: '#FF5D5D',
    border_style: 'solid',
    bg_radius: {
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
    },
    border_size: 1,
    com_bg: '',
    bottom_up: '1',
}
// 图片的默认值
export const img_com_data = {
    com_width: 50,
    com_height: 50,
    staging_height: 50,
    img: [],
    data_source_id: '',
    data_source_list: {},
    link: {},
    img_radius: {
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
    },
    img_width: 50,
    img_height: 50,
    img_rotate: 0,
    border_show: '0',
    border_color: '#FF3F3F',
    border_style: 'dashed',
    border_radius: {
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
    },
    border_size: 1,
    bottom_up: '1',
}
// 线条的默认值
export const line_com_data = {
    com_width: 306,
    com_height: 11,
    staging_height: 11,
    line_settings: 'horizontal',
    line_style: 'solid',
    line_width: 306,
    line_size: 1,
    line_color: '#000',
    bottom_up: '1',
}

// 判断两个矩形是否有交集或者被包裹
export const isRectangleIntersecting = (rect1: react1, rect2: react1) => {
    // 矩形的格式为 { x, y, width, height }
    const { x: x1, y: y1, width: w1, height: h1 } = rect1;
    const { x: x2, y: y2, width: w2, height: h2 } = rect2;

    // 检查是否有交集
    if ((x1 < x2 + w2 && x1 + w1 > x2) && (y1 < y2 + h2 && y1 + h1 > y2)) {
        return '1'; // 有交集
    }

    // 检查是否一个包含另一个
    if (x1 >= x2 && y1 >= y2 && x1 + w1 <= x2 + w2 && y1 + h1 <= y2 + h2) {
        return '1'; // rect1完全包含rect2
    }
    return '0'; // 无交集
}
