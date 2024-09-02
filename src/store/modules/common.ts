import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
export const commonStore = defineStore('common', () => {
    // 链接是否需要调接口判断
    const is_common_api = ref(false);
    const common = ref({
        article_category: [] as any[], //---- 文章分类
        attachment_category: [] as any[], //---- 附件分类
        brand_category: [] as any[], //---- 品牌分类
        brand_list: [] as any[], //---- 品牌列表
        goods_category: [] as any[], //---- 商品分类
        module_list: [] as any[], //---- 模块列表
        page_link_list: [] as any[], //---- 页面链接
    });
    // 存储链接数据
    const set_common = (data: any) => {
        common.value = data;
        is_common_api.value = true;
    };
    // 如果为false 则转为true
    const set_is_common_api = (bool: boolean) => {
        is_common_api.value = bool;
    };

    return {
        common,
        is_common_api,
        set_common,
        set_is_common_api,
    };
});
