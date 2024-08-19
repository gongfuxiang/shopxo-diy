import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const urlValueStore = defineStore('urlValue', () => {
    // 链接是否需要调接口判断
    const is_urlValue_api = ref(false);
    // 链接数据
    const category = ref<any[]>([]);
    // 存储链接数据
    const set_category = (data: any[]) => {
        category.value = data;
        is_urlValue_api.value = true;
    };
    // 如果为false 则转为true
    const set_is_urlValue_api = (bool: boolean) => {
        is_urlValue_api.value = bool;
    };

    return {
        category,
        is_urlValue_api,
        set_category,
        set_is_urlValue_api,
    };
});
