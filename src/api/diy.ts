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
    /** diy导入 */
    static import(data: FormData) {
        return request({
            url: `diyapi/diyupload`,
            method: 'post',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    /** diy导出 */
    static export(data: diy) {
        return request({
            url: `diyapi/diydownload`,
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
export interface headerAndFooter {
    name: string;
    show_tabs: string;
    key: string;
    com_data: any;
}
export interface diyConfig {
    diy_data: Array<any>;
    footer: headerAndFooter;
    header: headerAndFooter;
}
export interface diyData {
    id: string;
    logo: string;
    name: string;
    describe: string;
    config: diyConfig | string;
    is_enable: string;
}
