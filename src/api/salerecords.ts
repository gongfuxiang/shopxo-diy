import api_request from '@/utils/api-request';

class BlogAPI {
    /** 博客自动数据 */
    static getAutoList(data: any) {
        return api_request({
            url: `?s=plugins/index/pluginsname/salerecords/pluginscontrol/diyapi/pluginsaction/salerecordsdata`,
            method: 'post',
            data,
        });
    }
}

export default BlogAPI;

// 分类树结构
export interface Tree {
    /** 主键 */
    id: string;
}
