import request from '@/utils/request';

class CouponAPI {
    /**  领取优惠券列表 */
    static getCoupon(data: any) {
        return request({
            url: `?s=plugins/index/pluginsname/coupon/pluginscontrol/diyapi/pluginsaction/receivecouponlist`,
            method: 'post',
            data,
        });
    }
}

export default CouponAPI;
