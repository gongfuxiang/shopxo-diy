import api_request from '@/utils/api-request';

class PresaleAPI {
    /**  预售商品查询接口*/
    static getPresaleList(data: any) {
        return api_request({
            url: `plugins/index/pluginsname/presale/pluginscontrol/diyapi/pluginsaction/presaledata`,
            method: 'post',
            data,
        });
    }
}

export default PresaleAPI;
