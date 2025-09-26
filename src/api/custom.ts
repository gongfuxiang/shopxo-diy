import api_request from '@/utils/api-request';

class CustomAPI {
    /**  分类品牌查询接口*/
    static getCustominit() {
        return api_request({
            url: `?s=diyapi/custominit`,
            method: 'post',
        });
    }
}

export default CustomAPI;
