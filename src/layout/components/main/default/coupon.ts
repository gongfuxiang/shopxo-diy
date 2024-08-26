import defaultCommon from './index';
interface DefaultCoupon {
    content: {
    };
    style: {
        common_style: object;
    };
}
const defaultCoupoin: DefaultCoupon = {
    content: {
    },
    style: {
        common_style: { ...defaultCommon, padding: 10, padding_top: 10, padding_bottom: 10, padding_left: 10, padding_right: 10 },
    },
};

export default defaultCoupoin;
