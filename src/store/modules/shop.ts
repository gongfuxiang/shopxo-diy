import { ref } from 'vue';
import { defineStore } from 'pinia';

export const ShopStore = defineStore('shop', () => {
    // 上传是否需要调接口判断
    const is_shop_api = ref(false);
    // 上传分类列表
    const category = ref<any[]>([]);
    // 上传分类列表
    const brand = ref<any[]>([]);
    // 存储上传分类列表
    const set_category = (data: any[]) => {
        category.value = data;
        is_shop_api.value = true;
    };
    const set_brand = (data: any[]) => {
        brand.value = data;
        is_shop_api.value = true;
    };
    // 如果为false 则转为true
    const set_is_shop_api = (bool: boolean) => {
        is_shop_api.value = bool;
    };

    return {
        category,
        is_shop_api,
        set_category,
        set_brand,
        set_is_shop_api,
    };
});
