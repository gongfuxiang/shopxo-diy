import defaultCommon from './index';
interface DefaultCoupon {
    content: {
        theme: string;
        data_type: string;
        type: string[];
        number: number;
        title: string;
        desc: string;
        data_list: object[];
        data_ids: string;
        data_auto_list: object[];
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
        theme: '1',
        data_type: '0',
        type: [],
        number: 4,
        // 只有主题4用到
        title: '先领券 再购物',
        // 只有主题4用到
        desc: '领券下单·享购物优惠',
        data_list: [],
        data_ids: '',
        data_auto_list: [],
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
