import defaultCommon from './index';
interface DefaultCoupon {
    content: {
        theme: string;
        data_type: string;
        number: number;
        title: string;
        desc: string;
        data_list: object[];
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
        spacing: number;
        common_style: object;
    };
}
const defaultCoupoin: DefaultCoupon = {
    content: {
        theme: '1',
        data_type: '0',
        number: 4,
        // 只有主题4用到
        title: '先领券 再购物',
        // 只有主题4用到
        desc: '领券下单·享购物优惠',
        data_list: [],
    },
    style: {
        price_color: '#FF3830',
        name_color: '#FF3830',
        desc_color: '#FF3830',
        limit_send_count: '#999',
        btn_background: [{ color: '#FFF1E1', color_percentage: undefined }],
        btn_direction: '90deg',
        btn_color: '#FF3830',
        background: [{ color: '#FFF1E1', color_percentage: undefined }],
        direction: '90deg',
        spacing: 10,
        common_style: defaultCommon,
    },
};

export default defaultCoupoin;
