import request from '@/utils/request';

class CustomAPI {
    /**  分类品牌查询接口*/
    static getGoodsmagicinit() {
        return request({
            url: `diyapi/goodsmagicinit`,
            method: 'post',
        });
    }
}

export default CustomAPI;
