import request from '@/utils/request';

class ShopAPI {
    /**  分类查询接口*/
    static getShop() {
        return request({
            url: `diyapi/goodsinit`,
            method: 'post',
        });
    }
}

export default ShopAPI;
