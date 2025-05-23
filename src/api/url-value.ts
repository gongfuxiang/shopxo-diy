import request from '@/utils/request';
import api_request from '@/utils/api-request';

class UrlValueAPI {
    /**  获取商品列表 */
    static getGoodsList(data: any) {
        return request({
            url: `diyapi/goodslist`,
            method: 'post',
            data,
        });
    }
    /** 获取文章列表 */
    static getArticleList(data: any) {
        return request({
            url: `diyapi/articlelist`,
            method: 'post',
            data,
        });
    }
    /** 获取diy列表 */
    static getDiyList(data: any) {
        return request({
            url: `diyapi/diylist`,
            method: 'post',
            data,
        });
    }
    /** 获取页面设计列表 */
    static getDesignList(data: any) {
        return request({
            url: `diyapi/designlist`,
            method: 'post',
            data,
        });
    }

    /** 获取自定义列表 */
    static getCustomList(data: any) {
        return request({
            url: `diyapi/customviewlist`,
            method: 'post',
            data,
        });
    }
    /** 获取品牌列表 */
    static getBrandList(data: any) {
        return request({
            url: `diyapi/brandlist`,
            method: 'post',
            data,
        });
    }
    /** 获取优惠券列表 */
    static getCouponList(data: any) {
        return api_request({
            url: `?s=plugins/index/pluginsname/coupon/pluginscontrol/diycoupon/pluginsaction/index.html`,
            method: 'post',
            data,
        });
    }

    /** 博客指定数据 */
    static getblogList(data: any) {
        return api_request({
            url: `?s=plugins/index/pluginsname/blog/pluginscontrol/diyblog/pluginsaction/index.html`,
            method: 'post',
            data,
        });
    }
    /** 组合搭配指定数据 */
    static getBindingList(data: any) {
        return api_request({
            url: `?s=plugins/index/pluginsname/binding/pluginscontrol/diybinding/pluginsaction/index.html`,
            method: 'post',
            data,
        });
    }   
    /** 多商户指定数据 */
    static getShopList(data: any) {
        return api_request({
            url: `?s=plugins/index/pluginsname/shop/pluginscontrol/diyshop/pluginsaction/index.html`,
            method: 'post',
            data,
        });
    }   
    /** 多门店指定数据 */
    static getRealstoreList(data: any) {
        return api_request({
            url: `?s=plugins/index/pluginsname/realstore/pluginscontrol/diyrealstore/pluginsaction/index.html`,
            method: 'post',
            data,
        });
    }   

    /** 多门店指定数据 */
    static getAskList(data: any) {
        return api_request({
            url: `?s=plugins/index/pluginsname/ask/pluginscontrol/diyask/pluginsaction/index.html`,
            method: 'post',
            data,
        });
    }   
    /** 活动指定数据 */
    static getActivityList(data: any) {
        return api_request({
            url: `?s=plugins/index/pluginsname/activity/pluginscontrol/diyactivity/pluginsaction/index.html`,
            method: 'post',
            data,
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
