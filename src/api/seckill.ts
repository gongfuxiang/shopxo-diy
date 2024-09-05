import request from '@/utils/request';

class ShopAPI {
    /**  分类品牌查询接口*/
    static getSeckillList(data: any) {
        return request({
            url: `plugins/index/pluginsname/seckill/pluginscontrol/diyapi/pluginsaction/goods`,
            method: 'post',
            data,
        });
    }
}

export default ShopAPI;
