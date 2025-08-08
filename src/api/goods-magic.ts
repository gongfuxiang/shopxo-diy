import api_request from '@/utils/api-request';

class CustomAPI {
    /**  分类品牌查询接口*/
    static getGoodsmagicinit() {
        return api_request({
            url: `?s=diyapi/goodsmagicinit`,
            method: 'post',
        });
    }
}

export default CustomAPI;
