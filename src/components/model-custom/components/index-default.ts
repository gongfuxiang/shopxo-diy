import defaultCustom from '@/config/const/custom';
// 文本的默认值
const text_com_data = {
    com_width: 150,
    com_height: 17,
    staging_height: 17,
    text_captions: '',
    text_title: '文本',
    data_source_field: {
        id: [],
        option: []
    },
    data_source_list: {},
    text_link: {},
    data_source_link_field: {
        id: '',
        option: {}
    },
    data_split: {
        left: '',
        middle: '',
        right: '',
    },
    is_rich_text: '0',
    is_up_down: '1',
    text_color: '#000',
    text_weight: 'normal',
    text_size: 12,
    line_text_size: undefined,
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
    direction: '90deg',
    color_list: [{ color: '', color_percentage: undefined }],
    // 条件判断
    condition: {
        field: '', // 字段id
        type: '', // 条件类型
        value: '', // 值
    }
}
// 图片的默认值
const img_com_data = {
    com_width: 50,
    com_height: 50,
    staging_height: 50,
    img: [],
    data_source_field: {
        id: '',
        option: {}
    },
    data_source_list: {},
    link: {},
    data_source_link_field: {
        id: '',
        option: {}
    },
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
    // 条件判断
    condition: {
        field: '', // 字段id
        type: '', // 条件类型
        value: '', // 值
    }
}
// 线条的默认值
const line_com_data = {
    com_width: 306,
    com_height: 11,
    staging_height: 11,
    line_settings: 'horizontal',
    line_style: 'solid',
    line_width: 306,
    line_size: 1,
    line_color: '#000',
    // 条件判断
    condition: {
        field: '', // 字段id
        type: '', // 条件类型
        value: '', // 值
    }
}

// icon的默认值
const icon_com_data = {
    com_width: 36,
    com_height: 36,
    staging_height: 36,
    icon_class: '',
    data_source_field: {
        id: '',
        option: {}
    },
    data_source_list: {},
    icon_link: {},
    data_source_link_field: {
        id: '',
        option: {}
    },
    is_rich_icon: '0',
    is_up_down: '1',
    icon_color: '#000',
    icon_weight: 'normal',
    icon_size: 12,
    icon_option: 'none',
    icon_location: 'center',
    icon_padding: {
        padding: 0,
        padding_top: 0,
        padding_bottom: 0,
        padding_left: 0,
        padding_right: 0,
    },
    icon_rotate: 0,
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
    direction: '90deg',
    color_list: [{ color: '', color_percentage: undefined }],
    // 条件判断
    condition: {
        field: '', // 字段id
        type: '', // 条件类型
        value: '', // 值
    }
}

// 面板的默认值
const panel_com_data = {
    com_width: 100,
    com_height: 100,
    staging_height: 100,
    link: {},
    data_source_link_field: {
        id: '',
        option: {}
    },
    icon_rotate: 0,
    background_img_style: '2',
    background_img: [],
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
    direction: '90deg',
    color_list: [{ color: '#fff', color_percentage: undefined }],
    // 条件判断
    condition: {
        field: '', // 字段id
        type: '', // 条件类型
        value: '', // 值
    }
}

const custom_group_com_data = {
    // 容器高度
    com_width: 100,
    com_height: 100,
    staging_height: 100,
    data_source_field: {
        id: '',
        option: []
    },
    // 条件判断
    condition: {
        field: '', // 字段id
        type: '', // 条件类型
        value: '', // 值
    },
    custom_list: [], // 自定义内容处理
    custom_height: 100, // 自定义高度
    data_source_direction: 'vertical', // 铺满方式
    data_source_carousel_col: 1, // 铺满数量
    data_style: {
        ...defaultCustom.style
    }
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


export const defaultComData = {
    text_com_data,
    img_com_data,
    line_com_data,
    icon_com_data,
    panel_com_data,
    custom_group_com_data
}