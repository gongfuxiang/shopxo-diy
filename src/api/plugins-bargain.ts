import api_request from '@/utils/api-request';

/** 砍价 DIY 数据接口（plugins/bargain/diybargain） */
class PluginsBargainAPI {
    /**
     * 砍价自动数据（autobargainlist）
     * @param bargain_keywords 关键字
     * @param bargain_order_by_type 排序类型
     * @param bargain_order_by_rule 排序规则
     * @param bargain_number 显示数量
     */
    static getAutoList(data: {
        bargain_keywords?: string;
        bargain_order_by_type?: string | number;
        bargain_order_by_rule?: string | number;
        bargain_number?: number | string;
    }) {
        return api_request({
            url: `plugins/index/pluginsname/bargain/pluginscontrol/diybargain/pluginsaction/autobargainlist`,
            method: 'post',
            data,
        });
    }

    /** 砍价指定数据（appointbargainlist），bargain_ids 多个逗号分隔 */
    static getAppointList(data: { bargain_ids: string }) {
        return api_request({
            url: `plugins/index/pluginsname/bargain/pluginscontrol/diybargain/pluginsaction/appointbargainlist`,
            method: 'post',
            data,
        });
    }
}

export default PluginsBargainAPI;
