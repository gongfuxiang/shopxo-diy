import api_request from '@/utils/api-request';

class CouponAPI {
    /**  领取优惠券列表 */
    static getCoupon(data: any) {
        return api_request({
            url: `?s=plugins/index/pluginsname/coupon/pluginscontrol/diycoupon/pluginsaction/autocouponlist.html`,
            method: 'post',
            data,
        });
    }
}

export default CouponAPI;
