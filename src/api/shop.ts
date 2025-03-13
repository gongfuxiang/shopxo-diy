import request from '@/utils/request';

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
        return request({
            url: `plugins/index/pluginsname/shop/pluginscontrol/diyshop/pluginsaction/index`,
            method: 'post',
            data,
        });
    }
}

export default ShopAPI;
