import api_request from '@/utils/api-request';

class ShopAPI {
    /**  分类品牌查询接口*/
    static getSeckillList(data: any) {
        return api_request({
            url: `?s=plugins/index/pluginsname/seckill/pluginscontrol/diyapi/pluginsaction/seckilldata`,
            method: 'post',
            data,
        });
    }
}

export default ShopAPI;
