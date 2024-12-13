import { padding_computer } from "@/utils";
import defaultCommon from "./index";

interface carousel_list {
    carousel_img: uploadList[];
    carousel_video: uploadList[];
    carousel_link: object;
    video_title: string;
    style: {
        direction: string;
        color_list: color_list[];
        background_img_style: string;
        background_img: uploadList[];
        background_img_blur: 0,
    }
}
interface defaultSearch {
    content: {
        carousel_type: string;
        carousel_list: carousel_list[];
        img_fit: string,
        is_roll: string;
        interval_time: number;
        height: number,
    };
    style: {
        radius: number;
        radius_top_left: number;
        radius_top_right: number;
        radius_bottom_left: number;
        radius_bottom_right: number;
        is_show: string;
        image_spacing: number,
        indicator_style: string;
        indicator_new_location: string;
        indicator_location: string;
        indicator_size: number;
        indicator_bottom: number;
        indicator_radius: radiusStyle;
        video_is_show: string;
        video_type: string;
        video_radius: radiusStyle;
        video_padding: paddingStyle;
        video_img: uploadList[];
        video_icon_class: string;
        video_icon_color: string;
        video_location: string;
        video_bottom: number;
        video_title_color: string;
        video_title_size: number;
        video_color_list: color_list[];
        video_direction: string;
        actived_color: string;
        color: string;
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        carousel_type: 'inherit', //轮播风格
        img_fit: 'contain', //图片裁剪方式
        is_roll: '1',//是否轮播
        interval_time: 3,//轮播时间
        height: 300,//轮播高度
        // 轮播图片
        carousel_list: [
            {
                carousel_img: [],
                carousel_video: [],
                carousel_link: {},
                video_title: '视频名称',
                style: {
                    direction: '90deg',
                    color_list: [{ color: '', color_percentage: undefined }],
                    background_img_style: '2',
                    background_img: [],
                    background_img_blur: 0,
                }
            },
            {
                carousel_img: [],
                carousel_video: [],
                carousel_link: {},
                video_title: '视频名称',
                style: {
                    direction: '90deg',
                    color_list: [{ color: '', color_percentage: undefined }],
                    background_img_style: '2',
                    background_img: [],
                    background_img_blur: 0,
                }
            },
            {
                carousel_img: [],
                carousel_video: [],
                carousel_link: {},
                video_title: '视频名称',
                style: {
                    direction: '90deg',
                    color_list: [{ color: '', color_percentage: undefined }],
                    background_img_style: '2',
                    background_img: [],
                    background_img_blur: 0,
                }
            }
        ]
    },
    style: {
        //圆角
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
        // 图片间距
        image_spacing: 10,
        // 指示器是否显示
        is_show: '1',
        // 指示器样式
        indicator_style: 'dot',
        // 指示器选中颜色
        actived_color: '#2A94FF',
        // 常规颜色
        color: '#DDDDDD',
        indicator_new_location: 'bottom',
        // 指示器位置
        indicator_location: 'center',
        // 指示器大小
        indicator_size: 5,
        // 指示器距离底部位置
        indicator_bottom: 6,
        // 指示器圆角
        indicator_radius: {
            radius: 4,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
        },
        // 视频是否显示
        video_is_show: '1',
        // 视频圆角
        video_radius: {
            radius: 20,
            radius_top_left: 20,
            radius_top_right: 20,
            radius_bottom_left: 20,
            radius_bottom_right: 20,
        },
        // 视频边距
        video_padding: {
            padding: 0,
            padding_top: 3,
            padding_bottom: 3,
            padding_left: 6,
            padding_right: 12,
        },
        // 视频左侧类型
        video_type: 'icon',
        // 视频左侧图片
        video_img: [],
        // 视频左侧icon
        video_icon_class: '',
        // 视频左侧icon颜色
        video_icon_color: '#ff6868',
        // 视频位置
        video_location: 'center',
        // 视频距离底部距离
        video_bottom: 20,
        // 视频标题设置
        video_title_color: '#666',
        video_title_size: 12,
        video_color_list: [{ color: '#F0F0F0', color_percentage: undefined }],
        video_direction: '180deg',
        // 公共样式
        common_style: {
            ...defaultCommon,
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        }
    },
};

export default defaultSearch;
