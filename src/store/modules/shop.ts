import { ref } from 'vue';
import { defineStore } from 'pinia';

export const shopStore = defineStore('shop', () => {
    // 上传是否需要调接口判断
    const is_shop_api = ref(false);
    // 上传分类列表
    const category_list = ref<select_1[]>([]);
    // 上传品牌列表
    const brand_list = ref<select_1[]>([]);
    // 存储上传分类列表
    const set_category_brand = (category: select_1[], brand: select_1[]) => {
        category_list.value = category;
        brand_list.value = brand;
        is_shop_api.value = true;
    };
    // 如果为false 则转为true
    const set_is_shop_api = (bool: boolean) => {
        is_shop_api.value = bool;
    };

    return {
        category_list,
        brand_list,
        is_shop_api,
        set_category_brand,
        set_is_shop_api,
    };
});
