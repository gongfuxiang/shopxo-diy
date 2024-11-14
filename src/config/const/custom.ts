import defaultCommon from "./index";
interface content {
    data_ids: Array<string>;
    data_list: Array<object>;
    data_auto_list: Array<object>;
}
interface defaultSearch {
    content: {
        height: number;
        data_source: string;
        data_source_content: content;
        custom_list: string[];
    };
    style: {
        common_style: object;
    };
}
export const source_list = {
    goods: {
        // 存放手动输入的id
        data_ids: [],
        // 手动输入
        data_list: [],
        // 自动
        data_auto_list: [],
        // 商品类型
        data_type: '0',
        // 关键字
        keyword: '',
        // 商品分类
        category_ids: [],
        // 品牌
        brand_ids: [],
        // 显示数量
        number: 4,
        // 排序类型
        order_by_type: '0',
        // 排序规则
        order_by_rule: '0',
    },
    article: {
        // 存放手动输入的id
        data_ids: [],
        // 手动输入
        data_list: [],
        // 自动
        data_auto_list: [],
        data_type: '0',
        // 关键字
        keyword: '',
        number: 4,
        order_by_type: '0',
        order_by_rule: '0',
        // 文章封面
        is_cover: '0',
        // 分类id
        category_ids: [],
    },
    brand: {
        // 存放手动输入的id
        data_ids: [],
        // 手动输入
        data_list: [],
        // 自动
        data_auto_list: [],
        // 商品类型
        data_type: '0',
        // 关键字
        keyword: '',
        // 商品分类
        category_ids: [],
        // 显示数量
        number: 4,
        // 排序类型
        order_by_type: '0',
        // 排序规则
        order_by_rule: '0',
    },
    common: {
        // 存放手动输入的id
        data_ids: [],
        // 手动输入
        data_list: [],
        // 自动
        data_auto_list: [],
    }
};
const defaultSearch: defaultSearch = {
    content: {
        // 自定义内容高度
        height: 390,
        // 数据源内容
        data_source_content: {
            // 存放手动输入的id
            data_ids: [],
            // 手动输入
            data_list: [],
            // 自动
            data_auto_list: [],
        },
        // 数据源类型 商品(goods) 文章(article) 品牌(brand) 用户信息(user-info)
        data_source:'',
        // 自定义内容列表
        custom_list: []
    },
    style: {
        common_style: {
            ...defaultCommon,
            color_list: [{ color: 'rgb(244, 252, 255)', color_percentage: undefined }],
        }
    },
};

export default defaultSearch;
