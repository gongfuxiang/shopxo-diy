import request from '@/utils/request';

class ShopAPI {
    /** 自动查询商品接口*/
    static getBrandLists(data: any) {
        return request({
            url: `diyapi/brandautodata`,
            method: 'post',
            data,
        });
    }
    
}

export default ShopAPI;
