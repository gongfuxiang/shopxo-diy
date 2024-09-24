import request from '@/utils/request';

class ShopAPI {
    /**  获取tabbar列表 */
    static getTabbar(data: any) {
        return request({
            url: `diyapi/apptabbardata`,
            method: 'post',
            data,
        });
    }
    /** 保存tabbar */
    static saveTabbar(data: any) {
        return request({
            url: `diyapi/apptabbarsave`,
            method: 'post',
            data,
        });
    }
}

export default ShopAPI;
