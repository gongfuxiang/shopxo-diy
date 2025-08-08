import api_request from '@/utils/api-request';

class ArticleAPI {
    /**  链接初始化接口 */
    static getInit() {
        return api_request({
            url: `?s=diyapi/linkinit`,
            method: 'post',
        });
    }
    /** 文章指定数据 */
    static getAppointList(data: any) {
        return api_request({
            url: `?s=diyapi/articleappointdata`,
            method: 'post',
            data,
        });
    }
    /** 文章自动数据 */
    static getAutoList(data: any) {
        return api_request({
            url: `?s=diyapi/articleautodata`,
            method: 'post',
            data,
        });
    }
}

export default ArticleAPI;

// 分类树结构
export interface Tree {
    /** 主键 */
    id: string;
}
