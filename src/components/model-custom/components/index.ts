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