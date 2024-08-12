interface location {
    x: number,
    y: number,
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
    id: string
}

interface expose {
    dialogVisible: boolean,
}