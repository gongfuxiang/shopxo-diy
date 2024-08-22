<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container class="mb-8">
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.article_style">
                        <el-radio v-for="item in base_list.article_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="content-height bg-f">
                <card-container class="card-container-br">
                    <div class="mb-12">文章设置</div>
                    <el-form-item label="读取方式">
                        <el-radio-group v-model="form.article_check">
                            <el-radio v-for="item in base_list.get_data_method_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="form.article_check === '0'">
                        <div class="nav-list">
                            <drag :data="form.article_list" :space-col="20" @remove="article_list_remove" @on-sort="article_list_sort">
                                <template #default="{ row }">
                                    <upload v-model="row.new_url" :limit="1" size="40" styles="2"></upload>
                                    <el-image :src="row.link.cover" fit="contain" class="img">
                                        <template #error>
                                            <div class="bg-f5 flex-row jc-c align-c radius h w">
                                                <icon name="error-img" size="16" color="9"></icon>
                                            </div>
                                        </template>
                                    </el-image>
                                    <div class="flex-1 flex-width text-line-2 size-12 self-s">{{ row.new_title }}</div>
                                </template>
                            </drag>
                            <el-button class="mtb-20 w" @click="add">+添加</el-button>
                        </div>
                    </template>
                    <template v-else>
                        <el-form-item label="文章分类">
                            <el-select v-model="form.article_category" multiple collapse-tags placeholder="请选择文章分类">
                                <el-option v-for="item in base_list.article_category_list" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="显示数量">
                            <el-input v-model="form.number" type="number" placeholder="请输入显示数量" clearable />
                        </el-form-item>
                        <el-form-item label="排序类型">
                            <el-radio-group v-model="form.sort">
                                <el-radio v-for="item in base_list.sort_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="排序规则">
                            <el-radio-group v-model="form.sort_rules">
                                <el-radio v-for="item in base_list.sort_rules_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="封面图片">
                            <el-switch v-model="form.is_img_show" />
                        </el-form-item>
                    </template>
                </card-container>
                <card-container>
                    <div class="mb-12">列表设置</div>
                    <el-form-item label="是否显示">
                        <el-checkbox-group v-model="form.is_show">
                            <el-checkbox v-for="item in base_list.list_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </card-container>
            </div>
        </el-form>
        <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['article']" multiple @update:model-value="url_value_dialog_call_back"></url-value-dialog>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import ArticleAPI from '@/api/article';
import { articleStore } from '@/store/article';
const article_store = articleStore();
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const form = reactive(props.value);
const base_list = reactive({
    article_style_list: [
        { name: '单列展示', value: '0' },
        { name: '两列展示（纵向）', value: '1' },
        { name: '大图展示', value: '2' },
        { name: '左右滑动展示', value: '3' },
    ],
    get_data_method_list: [
        { name: '选择文章', value: '0' },
        { name: '筛选文章', value: '1' },
    ],
    article_category_list: [] as select_1[],
    sort_list: [
        { name: '综合', value: '0' },
        { name: '时间', value: '1' },
        { name: '浏览量', value: '2' },
    ],
    sort_rules_list: [
        { name: '降序（desc）', value: '0' },
        { name: '升序（asc）', value: '1' },
    ],
    list_show_list: [
        { name: '日期时间', value: '0' },
        { name: '浏览量', value: '1' },
    ],
});
onMounted(() => {
    init();
});
const init = () => {
    // 判断是否有历史数据
    if (!article_store.is_article_api) {
        article_store.set_is_article_api(true);
        ArticleAPI.getInit()
            .then((res: any) => {
                const { article_category_list } = res.data;
                base_list.article_category_list = article_category_list;
                article_store.set_article(article_category_list);
            })
            .catch((err: any) => {
                article_store.set_is_article_api(false);
            });
    } else {
        base_list.article_category_list = article_store.article;
    }
};

const article_list_remove = (index: number) => {
    form.article_list.splice(index, 1);
};
const article_list_sort = (item: any) => {
    form.article_list = item;
};
const add = () => {
    url_value_dialog_visible.value = true;
};
// 开启关闭链接
const url_value_dialog_visible = ref(false);
const url_value_dialog_call_back = (item: any[]) => {
    item.forEach((child: any) => {
        form.article_list.push({
            id: get_math(),
            new_title: child.title,
            new_url: [],
            link: child,
        });
    });
};
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    .content-height {
        min-height: calc(100vh - 31.8rem);
        .card-container-br {
            border-bottom: 0.8rem solid #f0f2f5;
        }
    }
}
.img {
    width: 4rem;
    height: 4rem;
}
</style>
