import { ref } from 'vue';
import { defineStore } from 'pinia';

export const DataSourceStore = defineStore('dataSource', () => {
    interface data_list {
        name: string;
        field: string;
        type: string;
    };
    interface data_source_content {
        appoint_data?: object;
        name: string;
        data: data_list[];
        type: string;
    };
    const is_children_custom = ref(false);
    // 上传是否需要调接口判断
    const is_data_source_api = ref(false);
    // 数据源
    const data_source_list = ref<data_source_content[]>([]);
    // 自定义历史记录
    const custom_records_index = ref<number>(-1);
    const custom_records = ref<any[]>([]);
    // 自定义组历史记录
    const custom_group_records_index = ref<number>(-1);
    const custom_group_records = ref<any[]>([]);
    // 存储上传分类列表
    const set_data_source = (data_source_content: data_source_content[]) => {
        data_source_list.value = data_source_content;
        is_data_source_api.value = true;
    };
    // 如果为false 则转为true
    const set_is_data_source_api = (bool: boolean) => {
        is_data_source_api.value = bool;
    };

    const set_is_children_custom = (bool: boolean) => {
        is_children_custom.value = bool;
    };
    // 设置自定义的历史数据
    const set_custom_records_index = (index: number) => {
        custom_records_index.value = index;
    };
    const set_custom_records = (records: any[]) => {
        custom_records.value = records;
    };
    // 设置自定义组的历史数据
    const set_custom_group_records_index = (index: number) => {
        custom_group_records_index.value = index;
    };
    const set_custom_group_records = (records: any[]) => {
        custom_group_records.value = records;
    };
    return {
        custom_records,
        custom_group_records,
        custom_records_index,
        custom_group_records_index,
        is_children_custom,
        data_source_list,
        is_data_source_api,
        set_data_source,
        set_is_data_source_api,
        set_is_children_custom,
        set_custom_records,
        set_custom_records_index,
        set_custom_group_records,
        set_custom_group_records_index,
    };
});
