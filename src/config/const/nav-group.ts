import { get_math } from '@/utils';
import defaultCommon from './index';
import subscriptStyle from './subscript-style';
interface subscript_type {
    content: {
        seckill_subscript_show: string,
        subscript_type: string,
        subscript_img_src: uploadList[],
        subscript_icon_class: string,
        subscript_text: string,
    },
    style: object;
}
interface nav_group {
    id: string;
    img: uploadList[];
    title: string;
    link: object;
    tabs_name: string;
    subscript: subscript_type;
}
interface defaultSearch {
    content: {
        nav_style: string;
        single_line: number;
        display_style: string;
        row: number;
        nav_content_list: nav_group[];
    };
    style: {
        space: number;
        img_size: number;
        radius: number;
        radius_top_left: number;
        radius_top_right: number;
        radius_bottom_left: number;
        radius_bottom_right: number;
        is_show: string;
        is_roll: string;
        rolling_fashion: string;
        interval_time: number;
        indicator_style: string;
        indicator_bottom: number;
        indicator_new_location: string;
        indicator_location: string;
        indicator_size: number;
        indicator_radius: radiusStyle;
        data_padding: paddingStyle;
        actived_color: string;
        color: string;
        title_color: string;
        title_size: number;
        title_space: number;
        subscript_style: object;
        common_style: object;
    };
}

const defaultSearch: defaultSearch = {
    content: {
        // 展示样式
        display_style: 'fixed',
        // 导航样式
        nav_style: 'image_with_text',
        // 每行显示数量
        single_line: 4,
        // 行数
        row: 1,
        // 导航组内容
        nav_content_list: [
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '测试标题',
                link: {},
                tabs_name: 'content',
                // 角标配置
                subscript: {
                    content: {
                        seckill_subscript_show: '0',
                        subscript_type: 'text',
                        subscript_img_src: [],
                        subscript_icon_class: '',
                        subscript_text: '',
                    },
                    style: {
                        ...subscriptStyle,
                        padding_top: 0,
                        padding_bottom: 0,
                        padding_left: 0,
                        padding_right: 0,
                    }
                }
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '测试标题',
                link: {},
                tabs_name: 'content',
                // 角标配置
                subscript: {
                    content: {
                        seckill_subscript_show: '0',
                        subscript_type: 'text',
                        subscript_img_src: [],
                        subscript_icon_class: '',
                        subscript_text: '',
                    },
                    style: {
                        ...subscriptStyle,
                        padding_top: 0,
                        padding_bottom: 0,
                        padding_left: 0,
                        padding_right: 0,
                    }
                }
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '测试标题',
                link: {},
                tabs_name: 'content',
                // 角标配置
                subscript: {
                    content: {
                        seckill_subscript_show: '0',
                        subscript_type: 'text',
                        subscript_img_src: [],
                        subscript_icon_class: '',
                        subscript_text: '',
                    },
                    style: {
                        ...subscriptStyle,
                        padding_top: 0,
                        padding_bottom: 0,
                        padding_left: 0,
                        padding_right: 0,
                    }
                }
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '测试标题',
                link: {},
                tabs_name: 'content',
                // 角标配置
                subscript: {
                    content: {
                        seckill_subscript_show: '0',
                        subscript_type: 'text',
                        subscript_img_src: [],
                        subscript_icon_class: '',
                        subscript_text: '',
                    },
                    style: {
                        ...subscriptStyle,
                        padding_top: 0,
                        padding_bottom: 0,
                        padding_left: 0,
                        padding_right: 0,
                    }
                }
            },
        ],
    },
    style: {
        // 数据间距
        space: 10,
        // 图片大小
        img_size: 36,
        // 图片圆角
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
        // 轮播处理
        is_roll: '1',
        interval_time: 3,
        // 指示器处理逻辑
        is_show: '1',
        rolling_fashion: 'translation',
        indicator_style: 'dot',
        indicator_new_location: 'bottom',
        indicator_location: 'center',
        indicator_size: 5,
        indicator_bottom: 6,
        indicator_radius: {
            radius: 4,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
        },
        data_padding: {
            padding: 0,
            padding_top: 0,
            padding_bottom: 0,
            padding_left: 0,
            padding_right: 0,
        },
        actived_color: '#2A94FF',
        color: '#DDDDDD',
        // 标题样式
        title_color: '#000',
        title_size: 12,
        title_space: 10,
        subscript_style: {
           ...subscriptStyle,
            padding_top: 0,
            padding_bottom: 0,
            padding_left: 0,
            padding_right: 0,
        },
        common_style: {
            ...defaultCommon,
            padding_top: 9,
            padding_bottom: 15,
            padding_left: 15,
            padding_right: 15,
        },
    },
};

export default defaultSearch;
