import request from '@/utils/request';

class CustomAPI {
    /**  分类品牌查询接口*/
    static getCustominit() {
        return request({
            url: `diyapi/custominit`,
            method: 'post',
        });
    }
}

export default CustomAPI;
