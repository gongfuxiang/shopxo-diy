import request from '@/utils/request';

class UrlValueAPI {
    /**  链接初始化接口 */
    static getInit() {
        return request({
            url: `diyapi/linkinit`,
            method: 'post',
        });
    }
}

export default UrlValueAPI;

// 分类树结构
export interface Tree {
    /** 主键 */
    id: string;
    /** 父级id */
    pid: string;
    /** 名称 */
    name: string;
    /** 路径 */
    path: string;
    /** 是否开启 */
    is_enable: Number;
    /** 排序 */
    sort: number;
    /** 下级 */
    items?: Tree[];
    /** 图标 */
    icon?: string;
}
