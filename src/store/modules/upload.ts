import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const uploadrStore = defineStore('upload', () => {
    // 上传是否需要调接口判断
    const is_upload_api = ref(false);
    // 上传分类列表
    const category = ref<any[]>([]);
    // 存储上传分类列表
    const set_category = (data: any[]) => {
        category.value = data;
        is_upload_api.value = true;
    };
    // 如果为false 则转为true
    const set_is_upload_api = (bool: boolean) => {
        is_upload_api.value = bool;
    };

    return {
        category,
        is_upload_api,
        set_category,
        set_is_upload_api,
    };
});
