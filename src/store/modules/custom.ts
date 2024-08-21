import { ref } from 'vue';
import { defineStore } from 'pinia';

export const DataSourceStore = defineStore('dataSource', () => {
    interface data_list {
        name: string;
        field: string;
        type: string;
    };
    interface source_list {
        name: string;
        data: data_list[];
        type: string;
    };
    // 上传是否需要调接口判断
    const is_data_source_api = ref(false);
    // 数据源
    const data_source_list = ref<source_list[]>([]);
    // 存储上传分类列表
    const set_data_source = (source_list: source_list[]) => {
        data_source_list.value = source_list;
        is_data_source_api.value = true;
    };
    // 如果为false 则转为true
    const set_is_data_source_api = (bool: boolean) => {
        is_data_source_api.value = bool;
    };

    return {
        data_source_list,
        is_data_source_api,
        set_data_source,
        set_is_data_source_api,
    };
});