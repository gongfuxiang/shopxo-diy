import request from '@/utils/request';

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
        return request({
            url: `?s=plugins/index/pluginsname/coupon/pluginscontrol/diyapi/pluginsaction/couponlist`,
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
