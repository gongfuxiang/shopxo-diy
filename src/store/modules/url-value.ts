import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
export const urlValueStore = defineStore('urlValue', () => {
    // 链接是否需要调接口判断
    const is_url_value_api = ref(false);
    // 链接数据
    const url_value = ref<urlValue>({
        goods_category: [],
        brand_list: [],
        article_category_list: [],
        page_link_list: [],
    });
    // 存储链接数据
    const set_url_value = (data: urlValue) => {
        url_value.value = data;
        is_url_value_api.value = true;
    };
    // 如果为false 则转为true
    const set_is_url_value_api = (bool: boolean) => {
        is_url_value_api.value = bool;
    };

    return {
        url_value,
        is_url_value_api,
        set_url_value,
        set_is_url_value_api,
    };
});

interface pageLinkList {
    name: string;
    type: string;
    data: pageLinkList[];
    page?: string;
}

// 分类树结构
export interface urlValue {
    goods_category: any[];
    brand_list: any[];
    article_category_list: any[];
    page_link_list: pageLinkList[];
}
