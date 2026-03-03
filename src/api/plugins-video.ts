import api_request from '@/utils/api-request';

class PluginsVideoAPI {
    /** 博客自动数据 */
    static getAutoList(data: any) {
        return api_request({
            url: `plugins/index/pluginsname/video/pluginscontrol/diyvideo/pluginsaction/autovideolist`,
            method: 'post',
            data,
        });
    }
}

export default PluginsVideoAPI;

// 分类树结构

export interface Tree {
    /** 主键 */
    id: string;
}
