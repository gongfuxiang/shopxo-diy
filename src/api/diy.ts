import { id } from 'element-plus/es/locale';
import request from '@/utils/request';

class DiyAPI {
    /**  diy初始化接口--获取详情 */
    static getInit(data: diy) {
        return request({
            url: `diyapi/diydetail`,
            method: 'post',
            data,
        });
    }
    /**  diy接口--保存 */
    static save(data: diyData) {
        return request({
            url: `diyapi/diysave`,
            method: 'post',
            data,
        });
    }
}

export default DiyAPI;

interface diy {
    /** 主键 */
    id: string;
}
export interface diyData {
    id: string;
    logo: string;
    name: string;
    describe: string;
    config: string;
    is_enable: string;
}