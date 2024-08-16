interface location {
    x: number,
    y: number,
    record_x: number, // 用于记录位置
    record_y: number, // 用于记录位置
    staging_y: number, // 用于记录位置
}
interface diy {
    key: string,
    location: location,
    com_data: any,
}
interface diy_content extends diy{
    com_width: number,
    com_height: number,
    name: string,
    show_tabs: Boolean,
    is_enable: Boolean,
    src: string,
    is_hot: Boolean,
    id: string
}

interface expose {
    dialogVisible: boolean,
}

interface diy_data {
    diy_data: diy_content[]
}

interface react1 { 
    x: number; 
    y: number; 
    width: number; 
    height: number; 
}
// 文本的默认值
const text_com_data = {
    com_width: 150,
    com_height: 17,
    staging_height: 17,
    text_title: '文本',
    data_source_id: '',
    data_source_list: {},
    text_link: {},
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
    border_show: false,
    border_color: '#FF5D5D',
    border_style: 'solid',
    border_radius: {
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
    },
    border_size: 1,
    com_bg: '',
    bottom_up: true,
}
// 图片的默认值
const img_com_data = {
    com_width: 50,
    com_height: 50,
    staging_height: 50,
    img_src: [],
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
    border_show: false,
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
    bottom_up: true,
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
    bottom_up: true,
}