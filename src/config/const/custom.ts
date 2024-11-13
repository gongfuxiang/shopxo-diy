import defaultCommon from "./index";
interface content {
    data_list: Array<object>;
    data_auto_list: Array<object>;
}
interface defaultSearch {
    content: {
        height: number;
        img_key: string;
        data_source: string;
        data_source_content_value: string | object;
        data_source_content: content;
        custom_list: string[];
    };
    style: {
        common_style: object;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        // 自定义内容高度
        height: 390,
        // 图片key  
        img_key: '',
        // 存放数据内容的id
        data_source_content_value: '',
        // 数据源内容
        data_source_content: {
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
