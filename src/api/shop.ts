import request from '@/utils/request';
import api_request from '@/utils/api-request';
class ShopAPI {
    /**  分类品牌查询接口*/
    static getShop() {
        return request({
            url: `diyapi/goodsinit`,
            method: 'post',
        });
    }
    /** 自动查询商品接口*/
    static getShopLists(data: any) {
        return request({
            url: `diyapi/goodsautodata`,
            method: 'post',
            data,
        });
    }
    // 获取多商户的数据
    static getShopList(data: any) {
        return api_request({
            url: `?s=plugins/index/pluginsname/shop/pluginscontrol/diyshop/pluginsaction/autoshoplist.html`,
            method: 'post',
            data,
        });
    }
}

export default ShopAPI;
