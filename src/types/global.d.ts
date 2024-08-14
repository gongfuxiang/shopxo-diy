declare global {
    // 数组索引
    interface arrayIndex {
        [key: string]: any;
    }
    // 可视化数据
    interface commonComponentData {
        src: string;
        name: string;
        key: string;
    }
    interface color_list {
        color: string;
        color_percentage: string;
    }
    /**
     * 渐变色参数集合
     */
    interface gradientStyle {
        color_list: color_list[];
        direction: string;
    }
    /**
     * 内边距的参数集合
     */
    type internalKeys = 'padding' | 'padding_bottom' | 'padding_top' | 'padding_left' | 'padding_right';
    type internalStyle = {
        [key in internalKeys]: number;
    };
    /**
     * 内边距的参数集合
     */
    type marginKeys = 'margin' | 'margin_bottom' | 'margin_top' | 'margin_left' | 'margin_right';
    type marginStyle = {
        [key in marginKeys]: number;
    };
    /**
     * 内边距的参数集合
     */
    type radiusKeys = 'radius' | 'radius_top_left' | 'radius_top_right' | 'radius_bottom_left' | 'radius_bottom_right';
    type radiusStyle = {
        [key in radiusKeys]: number;
    };

    /**
     * 阴影的参数集合
     */
    type boxShadowStyle = {
        box_shadow_color: string;
        box_shadow_x: number;
        box_shadow_y: number;
        box_shadow_blur: number;
        box_shadow_spread: number;
    };
    // 图片/视频/文件的数据类型
    export interface uploadList {
        id?: number;
        url: string;
        original?: string;
        ext?: string;
        title?: string;
        size?: number;
        type?: string;
        error?: boolean;
    }
    /**
     * 背景图
     */
    type backgroundImgUrlStyle = {
        background_img_url: uploadList[];
        background_img_style: number;
    };

    /**
     * 通用样式参数
     */
    type componentsCommonCommonStyle = {
        color_list: color_list[];
        direction: string;
        background_img_style: number;
        padding: number;
        padding_top: number;
        padding_bottom: number;
        padding_left: number;
        padding_right: number;
        margin: number;
        margin_top: number;
        margin_bottom: number;
        margin_left: number;
        margin_right: number;
        radius: number;
        radius_top_left: number;
        radius_top_right: number;
        radius_bottom_left: number;
        radius_bottom_right: number;
        box_shadow_color: string;
        box_shadow_x: number;
        box_shadow_y: number;
        box_shadow_blur: number;
        box_shadow_spread: number;
        background_img_url: uploadList[];
    };

    /**
     * 链接参数
     */
    type linkData = {
        id?: number;
        name: string;
        link?: String;
        data?: Data[];
        icon?: string;
        lng?: number;
        lat?: number;
        hasChildren?: boolean;
        children?: linkData[];
    };

    /**
     * 热区参数
     */
    type hotData = {
        img: string;
        img_width: number;
        img_height: number;
        data: hotListData[];
    };
    type rectCoords = {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    type hotListData = {
        drag_start: rectCoords;
        drag_end: rectCoords;
        name: string;
        link: linkData;
    };
}
export {};
