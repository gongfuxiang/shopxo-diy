import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { commonStore } from '@/store';
import commonTop from './common-top';
import App from '@/App.vue';
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
import { get_math } from '@/utils';
import defaultCommon from './index';
import { isEmpty } from 'lodash';
const common_store = commonStore();
interface hot_word_list {
    id: string;
    value: string;
    color: string;
}
interface DefaultFooterNav {
    content: {
        content_top: object;
        theme: string;
        logo: uploadList[];
        title: string;
        link: object;
        data_alone_row_value: string[];
        is_left_back_btn_show: string;
        indicator_location: string;
        bottom_navigation_show: string;
        positioning_name: string;
        positioning_name_float: string;
        icon_setting: { id: string; img: uploadList[]; link: object; icon: string }[];
        is_location_left_icon_show: string;
        location_left_img: uploadList[];
        location_left_icon: string;
        is_location_right_icon_show: string;
        location_right_img: uploadList[];
        location_right_icon: string;
        is_center: string;
        is_icon_show: string;
        icon_link: object;
        icon_img: uploadList[];
        icon_class: string;
        search_botton_img: uploadList[];
        search_botton_icon: string;
        is_tips_show: string;
        tips: string;
        is_right_icon_show: string,
        right_icon_link: object,
        right_icon_img: uploadList[],
        right_icon_class: string,
        is_search_show: string;
        search_type: string;
        search_tips: string;
        hot_word_list: hot_word_list[];
    };
    style: {
        header_background_type: string;
        header_background_color_list: color_list[];
        header_background_direction: string;
        header_background_img_style: string;
        header_background_img: uploadList[];
        header_background_title_color: string;
        header_background_title_typeface: string;
        header_background_title_size: number;
        function_buttons_type: string;
        data_alone_row_space: number;
        immersive_style: string;
        general_safe_distance_value: string;
        up_slide_logo: uploadList[];
        up_slide_display: string;
        up_slide_background_color_list: color_list[];
        up_slide_background_direction: string;
        up_slide_background_img_style: string;
        up_slide_background_img: uploadList[];
        left_back_btn_color: string;
        icon_color: string;
        right_icon_color: string,
        button_inner_color: string;
        search_botton_color_list: color_list[];
        search_botton_direction: string;
        search_botton_background_img_style: string;
        search_botton_background_img: uploadList[];
        search_button_radius: object;
        search_botton_padding: paddingStyle;
        search_botton_margin: marginStyle,
        search_botton_border_show: string,
        search_botton_border_color: string,
        search_botton_border_style: string,
        search_botton_border_size: paddingStyle;
        location_direction: string;
        location_color_list: color_list[],
        location_background_img_style: string,
        location_background_img: string[],
        location_color: string;
        location_left_icon_size: number;
        location_right_icon_size: number;
        location_border_show: string;
        location_border_color: string;
        location_border_style: string;
        location_border_size: paddingStyle;
        location_radius: radiusStyle;
        location_padding: paddingStyle;
        location_margin: marginStyle;
        img_size: string;
        img_space: string;
        img_color: string;
        tips_color: string;
        hot_words_color: string;
        search_border: string;
        search_bg_color: string;
        search_border_radius: object;
        search_padding_left: number,
        common_style: object;
    };
}
const defaultFooterNav: DefaultFooterNav = {
    content: {
        content_top: {
            ...commonTop,
        },
        // 页面设置的风格
        theme: '1',
        logo: [],
        // 默认文字
        title: !isEmpty(common_store.common.config.site_name) ? common_store.common.config.site_name : '新建页面',
        // 跳转地址
        link: {},
        // 换行内容
        data_alone_row_value: [],
        is_left_back_btn_show: '1',
        // 对齐方式
        indicator_location: 'center',
        // 右侧图标信息
        icon_setting: [{ id: get_math(), img: [], icon: 'bell', link: { name: '我的消息', page: '/pages/message/message' } }],
        // 定位左侧图标内容
        is_location_left_icon_show: '1',
        location_left_img: [],
        location_left_icon: 'location',
        // 定位内容
        positioning_name: '未选择位置',
        positioning_name_float: '0',
        // 定位右侧图标内容
        is_location_right_icon_show: '1',
        location_right_img: [],
        location_right_icon: 'arrow-bottom',
        // 搜索框处理 内容是否居中显示
        is_center: '0',
        // 是否显示图标
        is_icon_show: '1',
        icon_link: {},
        icon_img: [],
        icon_class: 'search',
        // 搜索提示信息
        tips: '请输入搜索内容',
        // 是否显示右侧icon
        is_right_icon_show: '0',
        right_icon_link: {},
        right_icon_img: [],
        right_icon_class: '',
        // 搜索按钮右侧搜索内容
        is_search_show: '0',
        search_botton_img: [],
        search_botton_icon: '',
        is_tips_show: '1',
        search_type: 'text',
        search_tips: '搜索',
        // 热词数据信息
        hot_word_list: [],
        // 底部导航显示 0 不显示 1 显示
        bottom_navigation_show: '0',
    },
    style: {
        // 头部背景显示
        header_background_type: 'color_image',
        header_background_color_list: [{ color: '#fff', color_percentage: undefined }],
        header_background_direction: '180deg',
        header_background_img_style: '2',
        header_background_img: [],
        header_background_title_color: '#333',
        header_background_title_typeface: 'bold',
        header_background_title_size: 14,
        // 换行间距
        data_alone_row_space: 5,
        // 状态栏风格
        function_buttons_type: '0',
        // 沉浸样式
        immersive_style: '0',
        // 安全距离
        general_safe_distance_value: '0',
        // 上滑显示处理
        up_slide_logo: [],
        up_slide_display: '1',
        up_slide_background_color_list: [{ color: '#fff', color_percentage: undefined }],
        up_slide_background_direction: '180deg',
        up_slide_background_img_style: '2',
        up_slide_background_img: [],
        // 左侧返回按钮颜色
        left_back_btn_color: '#333',
        icon_color: '#ccc',
        right_icon_color: '#ccc',
        // 定位设置
        location_direction: '90deg',
        location_color_list: [{ color: '', color_percentage: undefined }],
        location_background_img_style: '0',
        location_background_img: [],
        location_color: '#333',
        location_left_icon_size: 12,
        location_right_icon_size: 12,
        location_border_show: '0',
        location_border_color: '#FF3F3F',
        location_border_style: 'solid',
        location_border_size: {
            padding: 0,
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 0,
            padding_left: 0,
        },
        location_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        location_padding: {
            padding: 0,
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 0,
            padding_left: 0,
        },
        location_margin: {
            margin: 0,
            margin_top: 0,
            margin_right: 10,
            margin_bottom: 0,
            margin_left: 0,
        },
        // 右侧图标大小和间距
        img_size: '23',
        img_space: '15',
        img_color: '#666',
        // 搜索提示文字颜色
        tips_color: '#ccc',
        // 搜索热词文字颜色
        hot_words_color: '#999',
        // 搜索边框颜色
        search_border: '#E4E4E4',
        // 搜索背景颜色
        search_bg_color: '#fff',
        search_border_radius: {
            radius: 16,
            radius_top_left: 16,
            radius_top_right: 16,
            radius_bottom_left: 16,
            radius_bottom_right: 16,
        },
        search_botton_padding: {
            padding: 0,
            padding_top: 3,
            padding_left: 12,
            padding_right: 12,
            padding_bottom: 3,
        },
        search_botton_margin: {
            margin: 0,
            margin_top: 2,
            margin_right: 2,
            margin_bottom: 2,
            margin_left: 0,
        },
        search_botton_border_size: {
            padding: 0,
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 0,
            padding_left: 0,
        },
        search_botton_border_show: '0',
        search_botton_border_color: '#FF3F3F',
        search_botton_border_style: 'solid',
        // 搜索按钮显示样式
        button_inner_color: '#fff',
        search_botton_color_list: [
            { color: '#FF973D', color_percentage: undefined },
            { color: '#FF3131', color_percentage: undefined },
        ],
        search_botton_direction: '90deg',
        search_botton_background_img_style: '2',
        search_botton_background_img: [],
        search_button_radius: {
            radius: 16,
            radius_top_left: 16,
            radius_top_right: 16,
            radius_bottom_left: 16,
            radius_bottom_right: 16,
        },
        search_padding_left: 15,
        common_style: {
            ...defaultCommon,
            color_list: [{ color: '#f5f5f5', color_percentage: undefined }],
        },
    },
};

export default defaultFooterNav;
