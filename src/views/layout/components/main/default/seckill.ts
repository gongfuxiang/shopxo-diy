import defaultCommon from './index';
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
        single_line_number: number;
        shop_number: number,
        is_show: string[];
        seckill_button_show: string;
        seckill_subscript_show: string;
        subscript_text: string;
    };
    style: {
        topic_color: string;
        topic_size: string;
        head_button_color: string;
        head_button_size: string;
        end_text_color: string;
        countdown_bg_color_list: string;
        countdown_direction: string;
        countdown_color: string;
        header_background_color_list: string;
        header_background_direction: string;
        header_background_img_style: string;
        header_background_img_url: uploadList[];
        shop_radius: radiusStyle;
        shop_img_radius: radiusStyle;
        shop_title_color: string;
        shop_title_typeface: string;
        shop_title_size: string;
        price_color: string;
        original_price_color: string;
        seckill_subscript_location: string;
        seckill_subscript_text_color: string;
        seckill_subscript_bg_color: string;
        progress_bg_color: string,
        progress_actived_color: string,
        progress_actived_direction: string,
        progress_button_color: string,
        progress_button_icon_color: string,
        progress_text_color: string,
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
        topic_type: 'text',
        topic_src: [],
        topic_text: '',
        button_status: '1',
        button_text: '',
        shop_style_type: '1',
        single_line_number: 3,
        shop_number: 10,
        is_show: ['title', 'price', 'original_price'],
        seckill_button_show: '1',
        seckill_subscript_show: '1',
        subscript_text: '秒杀'
    },
    style: {
        topic_color: '',
        topic_size: '',
        head_button_color: '',
        head_button_size: '',
        end_text_color: '',
        countdown_bg_color_list: '',
        countdown_direction: '180deg',
        countdown_color: '',
        header_background_color_list: '',
        header_background_direction: '180deg',
        header_background_img_style: '2',
        header_background_img_url: [],
        shop_radius: {
            radius: 8,
            radius_top_left: 8,
            radius_top_right: 8,
            radius_bottom_left: 8,
            radius_bottom_right: 8,
        } ,
        shop_img_radius: {
            radius: 4,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
        },
        shop_title_color: '',
        shop_title_typeface: '',
        shop_title_size: '',
        price_color: '',
        original_price_color: '',
        seckill_subscript_location: '',
        seckill_subscript_text_color: '',
        seckill_subscript_bg_color: '',
        progress_bg_color: '',
        progress_actived_color: '',
        progress_actived_direction: '180deg',
        progress_button_color: '',
        progress_button_icon_color: '',
        progress_text_color: '',
        is_roll: true,
        interval_time: 2,
        rolling_fashion: '',
        common_style: { ...defaultCommon, padding: 10, padding_top: 10, padding_bottom: 10, padding_left: 10, padding_right: 10 },
    },
};

export default defaultSeckill;
