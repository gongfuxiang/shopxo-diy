import defaultCommon from './index';
import { online_url } from '@/utils';
const new_url = await online_url('/static/plugins/seckill/images/diy/').then((res) => res);
interface DefaultSeckill {
    content: {
        head_state: string;
        theme: string;
        topic_type: string;
        topic_src: uploadList[];
        topic_text: string;
        button_status: string;
        button_text: string;
        shop_style_type: string;
        carousel_col: number;
        shop_number: number;
        is_show: string[];
        shop_type: string;
        shop_button_text: string;
        shop_button_icon_class: string;
        is_shop_show: string;
        seckill_subscript_show: string;
        subscript_text: string;
    };
    style: {
        topic_color: string;
        topic_size: number;
        head_button_color: string;
        head_button_size: number;
        end_text_color: string;
        countdown_bg_color_list: color_list[];
        countdown_direction: string;
        countdown_color: string;
        header_background_color_list: color_list[];
        header_background_direction: string;
        header_background_img_style: string;
        header_background_img: uploadList[];
        shop_radius: radiusStyle;
        shop_img_radius: radiusStyle;
        shop_padding: paddingStyle;
        content_outer_spacing: number;
        content_spacing: number;
        content_outer_height: number;
        shop_title_color: string;
        shop_title_typeface: string;
        shop_title_size: number;
        shop_price_typeface: string;
        shop_price_size: number;
        shop_price_color: string;
        shop_button_typeface: string;
        shop_button_size: number;
        shop_button_color: color_list[];
        shop_button_text_color: string;
        shop_icon_size: number;
        shop_icon_color: string;
        original_price_color: string;
        seckill_subscript_location: string;
        seckill_subscript_text_color: string;
        seckill_subscript_bg_color: string;
        progress_bg_color: string;
        progress_actived_color_list: color_list[];
        progress_actived_direction: string;
        progress_button_color: string;
        progress_button_icon_color: string;
        progress_text_color: string;
        is_roll: boolean;
        interval_time: number;
        rolling_fashion: string;
        common_style: object;
    };
}
const defaultSeckill: DefaultSeckill = {
    content: {
        head_state: '1',
        theme: '1',
        topic_type: 'image',
        topic_src: [{ id: 1, url: new_url + 'header-title.png', original: '标题', title: '标题', ext: '.png', type: 'img' }],
        topic_text: '限时秒杀',
        button_status: '1',
        button_text: '更多',
        shop_style_type: '1',
        carousel_col: 3,
        shop_number: 10,
        is_show: ['title', 'price', 'original_price'],
        is_shop_show: '1',
        shop_type: 'text',
        shop_button_text: '去抢购',
        shop_button_icon_class: '',
        seckill_subscript_show: '1',
        subscript_text: '秒杀',
    },
    style: {
        topic_color: '#fff',
        topic_size: 18,
        head_button_color: '#fff',
        head_button_size: 12,
        end_text_color: '#fff',
        countdown_bg_color_list: [{ color: '#fff', color_percentage: undefined }],
        countdown_direction: '180deg',
        countdown_color: '#FF1818',
        header_background_color_list: [{ color: '', color_percentage: undefined }],
        header_background_direction: '180deg',
        header_background_img_style: '2',
        header_background_img: [{ id: 1, url: new_url + 'header-bg.png', original: '背景', title: '背景1', ext: '.png', type: 'img' }],
        shop_radius: {
            radius: 8,
            radius_top_left: 8,
            radius_top_right: 8,
            radius_bottom_left: 8,
            radius_bottom_right: 8,
        },
        shop_img_radius: {
            radius: 4,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
        },
        shop_padding: {
            padding: 10,
            padding_top: 10,
            padding_bottom: 10,
            padding_left: 10,
            padding_right: 10,
        },
        content_outer_spacing: 10, // 商品间距
        content_spacing: 10,
        content_outer_height: 232,
        shop_title_typeface: '500',
        shop_title_size: 14,
        shop_title_color: '#333333',
        shop_price_typeface: '500',
        shop_price_size: 18,
        shop_price_color: '#EA3323;',
        shop_button_typeface: '400',
        shop_button_size: 12,
        shop_button_color: [
            {
                color: '#FF3D53',
                color_percentage: undefined,
            },
            {
                color: '#D73A3A',
                color_percentage: undefined,
            },
        ],
        shop_button_text_color: '#fff',
        shop_icon_size: 10,
        shop_icon_color: '#fff',
        original_price_color: '#999',
        seckill_subscript_location: 'top-left',
        seckill_subscript_text_color: '#fff',
        seckill_subscript_bg_color: '#FF7607',
        progress_bg_color: '#FFEDED',
        progress_actived_color_list: [
            { color: '#FF3131', color_percentage: undefined },
            { color: '#FF973D', color_percentage: undefined },
        ],
        progress_actived_direction: '180deg',
        progress_button_color: '#FFDE81',
        progress_button_icon_color: '#FF2525',
        progress_text_color: '#FF3434',
        is_roll: true,
        interval_time: 2,
        rolling_fashion: 'translation',
        common_style: { ...defaultCommon, padding: 0, padding_top: 2, padding_bottom: 10, padding_left: 10, padding_right: 10 },
    },
};

export default defaultSeckill;
