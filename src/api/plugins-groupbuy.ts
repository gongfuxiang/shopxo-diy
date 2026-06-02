import api_request from '@/utils/api-request';

/** 拼团 DIY 数据接口（plugins/groupbuy/diygroupbuy） */
class PluginsGroupbuyAPI {
    /**
     * 拼团自动数据（autogroupbuylist）
     * @param groupby_keywords 关键字
     * @param groupby_order_by_type 排序类型
     * @param groupby_order_by_rule 排序规则
     * @param groupby_number 显示数量
     * @param groupbuy_is_recommended 是否推荐 0/1
     */
    static getAutoList(data: {
        groupby_keywords?: string;
        groupby_order_by_type?: string | number;
        groupby_order_by_rule?: string | number;
        groupby_number?: number | string;
        groupbuy_is_recommended?: number;
    }) {
        return api_request({
            url: `plugins/index/pluginsname/groupbuy/pluginscontrol/diygroupbuy/pluginsaction/autogroupbuylist`,
            method: 'post',
            data,
        });
    }

    /** 拼团指定数据（appointgroupbuylist），groupbuy_ids 多个逗号分隔 */
    static getAppointList(data: { groupbuy_ids: string }) {
        return api_request({
            url: `plugins/index/pluginsname/groupbuy/pluginscontrol/diygroupbuy/pluginsaction/appointgroupbuylist`,
            method: 'post',
            data,
        });
    }
}

export default PluginsGroupbuyAPI;
