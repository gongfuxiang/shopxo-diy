import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
export const articleStore = defineStore('article', () => {
    // 文章是否需要调接口判断
    const is_article_api = ref(false);
    // 文章数据
    const article = ref<select_1[]>([]);
    // 存储文章数据
    const set_article = (data: select_1[]) => {
        article.value = data;
        is_article_api.value = true;
    };
    // 如果为false 则转为true
    const set_is_article_api = (bool: boolean) => {
        is_article_api.value = bool;
    };

    return {
        article,
        is_article_api,
        set_article,
        set_is_article_api,
    };
});
