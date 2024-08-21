import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
export const articleStore = defineStore('article', () => {
    // 链接是否需要调接口判断
    const is_article_api = ref(false);
    // 链接数据
    const article = ref<article_list[]>([]);
    // 存储链接数据
    const set_article = (data: article_list[]) => {
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
interface article_list {
    id: number;
    name: string;
    url?: string;
}
