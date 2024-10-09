import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
export const commonStore = defineStore('common', () => {
    // 链接是否需要调接口判断
    const is_common_api = ref(false);
    const is_immersion_model = ref(false);
    const is_have_tabs = ref(false);
    const common = ref({
        article_category: [] as any[], //---- 文章分类
        attachment_category: [] as any[], //---- 附件分类
        brand_category: [] as any[], //---- 品牌分类
        brand_list: [] as any[], //---- 品牌列表
        goods_category: [] as any[], //---- 商品分类
        module_list: [] as any[], //---- 模块列表
        page_link_list: [] as any[], //---- 页面链接
        plugins: {} as any, //---- 插件
        config: {
            common_amap_map_ak: '',
            common_amap_map_safety_ak: '',
            common_baidu_map_ak: '',
            common_map_type: '',
            common_tencent_map_ak: '',
            common_tianditu_map_ak: '',
            currency_symbol: '',
            attachment_host: '',
            store_diy_url: '',
        } as any, // 基础数据配置参数
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

    const set_is_immersion_model = (bool: boolean) => {
        is_immersion_model.value = bool;
    };

    const set_is_have_tabs = (bool: boolean) => {
        is_have_tabs.value = bool;
    };

    return {
        common,
        is_common_api,
        is_immersion_model,
        is_have_tabs,
        set_common,
        set_is_common_api,
        set_is_immersion_model,
        set_is_have_tabs,
    };
});
