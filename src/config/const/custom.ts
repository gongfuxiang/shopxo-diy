import defaultCommon from "./index";
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
        data_source_direction: string;
        data_source_carousel_col: number;
        custom_list: string[];
    };
    style: {
        is_roll: string;
        interval_time: number;
        rolling_fashion: string;
        is_show: boolean;
        actived_color: string;
        color: string;
        indicator_style: string;
        indicator_bottom: number;
        indicator_location: string;
        indicator_size: number;
        indicator_radius: radiusStyle;
        common_style: object;
    };
}
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
        // 铺满方式 0 横向 1 纵向
        data_source_direction: '1',
        // 横向滑动时的显示 轮播数量
        data_source_carousel_col: 1,
        // 自定义内容列表
        custom_list: []
    },
    style: {
        is_roll: '0',
        interval_time: 3,
        rolling_fashion: 'translation',
        is_show: false,
        // 指示器选中颜色
        actived_color: '#2A94FF',
        // 常规颜色
        color: '#DDDDDD',
        indicator_style: 'dot',
        indicator_location: 'center',
        indicator_size: 5,
        indicator_bottom: 6,
        indicator_radius: {
            radius: 4,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
        },
        common_style: {
            ...defaultCommon,
            color_list: [{ color: 'rgb(244, 252, 255)', color_percentage: undefined }],
        }
    },
};

export default defaultSearch;
