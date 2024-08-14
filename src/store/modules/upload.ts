import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const uploadrStore = defineStore('upload', () => {
    // 上传分类列表
    const category = ref<any[]>([]);
    // 上传分类是否有数据的判断
    const is_category = ref(false);
    // 存储上传分类列表
    function set_category(data: any[]) {
        category.value = data;
        is_category.value = true;
    }
    // 如果为false 则转为true
    function set_is_category(bool: boolean) {
        is_category.value = bool;
    }

    return {
        category,
        is_category,
        set_category,
        set_is_category,
    };
});
