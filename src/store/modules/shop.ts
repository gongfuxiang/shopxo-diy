import { ref } from 'vue';
import { defineStore } from 'pinia';

export const ShopStore = defineStore('shop', () => {
    interface product_list {
        id: number;
        name: string;
    };
    // 上传是否需要调接口判断
    const is_shop_api = ref(false);
    // 上传分类列表
    const category_list = ref<product_list[]>([]);
    // 上传品牌列表
    const brand_list = ref<product_list[]>([]);
    // 存储上传分类列表
    const set_category_brand = (category: product_list[], brand: product_list[]) => {
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
