import { ref } from 'vue';
import { defineStore } from 'pinia';

export const DataSourceStore = defineStore('dataSource', () => {
    interface product_list {
        id: number;
        name: string;
    };
    // 上传是否需要调接口判断
    const is_data_source_api = ref(false);
    // 数据源
    const data_source_list = ref<product_list[]>([]);
    // 存储上传分类列表
    const set_data_source = (category: product_list[], brand: product_list[]) => {
        data_source_list.value = category;
        is_data_source_api.value = true;
    };
    // 如果为false 则转为true
    const set_is_shop_api = (bool: boolean) => {
        is_data_source_api.value = bool;
    };

    return {
        data_source_list,
        is_data_source_api,
        set_data_source,
        set_is_shop_api,
    };
});
