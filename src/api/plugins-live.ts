import api_request from '@/utils/api-request';

/** 直播 DIY 数据接口（plugins/live/diylive） */
class PluginsLiveAPI {
    /**
     * 直播自动数据（autolivelist）
     * @param live_keywords 关键字
     * @param live_status 直播状态，多选逗号分隔，如 "0,1"
     * @param live_is_recommended 是否推荐，0/1；未筛选时不传
     * @param live_order_by_type 排序类型，对应 plugins.live.order_by_type_list.index
     * @param live_order_by_rule 排序规则，对应 common.data_order_by_rule_list.index
     * @param live_number 显示数量
     */
    static getAutoList(data: {
        live_keywords?: string;
        live_status?: string;
        live_is_recommended?: number;
        live_order_by_type?: string;
        live_order_by_rule?: string;
        live_number?: number | string;
    }) {
        return api_request({
            url: `plugins/index/pluginsname/live/pluginscontrol/diylive/pluginsaction/autolivelist`,
            method: 'post',
            data,
        });
    }

    /** 直播指定数据（appointlivelist），live_ids 多个逗号分隔 */
    static getAppointList(data: { live_ids: string }) {
        return api_request({
            url: `plugins/index/pluginsname/live/pluginscontrol/diylive/pluginsaction/appointlivelist`,
            method: 'post',
            data,
        });
    }
}

export default PluginsLiveAPI;
