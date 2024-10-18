import defaultCommon from "./index";

interface defaultSearch {
    content: {
        height: number;
        img_key: string;
        data_source: string;
        data_source_content_value: string;
        data_source_content: object;
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
        data_source_content: {},
        // 数据源
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
