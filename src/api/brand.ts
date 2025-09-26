import api_request from '@/utils/api-request';

class ShopAPI {
    /** 自动查询商品接口*/
    static getBrandLists(data: any) {
        return api_request({
            url: `?s=diyapi/brandautodata`,
            method: 'post',
            data,
        });
    }
    
}

export default ShopAPI;
