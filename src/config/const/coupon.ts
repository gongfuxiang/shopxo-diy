import defaultCommon from './index';
import defaultSetting from '../setting/index';
import commonTop from './common-top';
import { online_url } from '@/utils';
const new_url = await online_url('/static/plugins/coupon/images/diy/').then((res) => res);
interface DefaultCoupon {
    content: {
        content_top: object;
        theme: string;
        data_type: string;
        type: string[];
        number: number;
        keywords: string,
        expire_type_ids: string[],
        use_limit_type_ids: string[],
        order_by_type: number,
        order_by_rule: number,
        is_repeat_receive: string,
        title: string;
        desc: string;
        data_list: object[];
        data_ids: string;
        data_auto_list: object[];
        theme_1_static_img: uploadList[];
        theme_2_static_img: uploadList[];
        theme_5_static_img: uploadList[];
    };
    style: {
        price_color: string;
        name_color: string;
        desc_color: string;
        limit_send_count: string;
        btn_background: color_list[];
        btn_direction: string;
        btn_color: string;
        background: color_list[];
        direction: string;
        background_inside: color_list[];
        direction_inside: string;
        spacing: number;
        common_style: object;
        // 风格4字段
        type_color: string;
        type_background: string;
        content_title_color: string;
        content_desc_color: string;
    };
}
const defaultCoupoin: DefaultCoupon = {
    content: {
        content_top: {
            ...commonTop,
        },
        theme: '1',
        data_type: '0',
        type: defaultSetting.coupon_ids,
        number: defaultSetting.page_size,
        keywords: '',
        expire_type_ids: [],
        use_limit_type_ids: [],
        order_by_type: 0,
        order_by_rule: 0,
        is_repeat_receive: '0',
        // 只有主题4用到
        title: '先领券 再购物',
        // 只有主题4用到
        desc: '领券下单·享购物优惠',
        data_list: [],
        data_ids: '',
        data_auto_list: [],
        // 优惠券图片
        theme_1_static_img: [{ id: 1, url: new_url + 'theme-1-bg.png', original: '', title: '', ext: '.png', type: 'img' }],
        theme_2_static_img: [{ id: 2, url: new_url + 'theme-2-content-bg.png', original: '', title: '', ext: '.png', type: 'img' }],
        theme_5_static_img: [{ id: 3, url: new_url + 'theme-5-bg.png', original: '', title: '', ext: '.png', type: 'img' }],
    },
    style: {
        price_color: '#FF3830',
        name_color: '#FF3830',
        desc_color: '#FF3830',
        limit_send_count: '#999',
        btn_background: [{ color: '#FFF1E1', color_percentage: undefined }],
        btn_direction: '90deg',
        btn_color: '#FF3830',
        background: [{ color: '#FF3830', color_percentage: undefined }],
        direction: '90deg',
        // 内背景
        background_inside: [{ color: '#FFF1E1', color_percentage: undefined }],
        direction_inside: '90deg',
        spacing: 20,
        common_style: { ...defaultCommon, padding_left: 10, padding_right: 10, padding_top: 10, padding_bottom: 10, color_list: [{ color: '#fff', color_percentage: undefined }] },

        // 风格4字段
        type_color: '#FF3830',
        type_background: '#FFF1E1',
        content_title_color: '#fff',
        content_desc_color: '#fff',
    },
};

export default defaultCoupoin;
