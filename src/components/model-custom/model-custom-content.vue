<template>
    <div class="auxiliary-line">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-20">数据源</div>
                <el-form-item label="动态数据">
                    <el-select v-model="form.data_source" value-key="id" placeholder="请选择数据源" filterable clearable @change="changeDataSource">
                        <el-option v-for="item in options" :key="item.type" :label="item.name" :value="item.type" />
                    </el-select>
                </el-form-item>
            </card-container>
            <!-- 商品的筛选数据 -->
            <template v-if="['goods', 'article', 'brand'].includes(form.data_source)">
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">{{ form.data_source == 'goods' ? '商品' : form.data_source == 'article' ? '文章' : '品牌' }}设置</div>
                    <!-- 数据筛选组件, 根据数据源类型显示不同的筛选组件 -->
                    <data-filter :type="form.data_source" :value="form.data_source_content" :list="form.data_source_content.data_list" :base-list="base_list" @add="add" @data_list_replace="data_list_replace" @data_list_remove="data_list_remove" @data_list_sort="data_list_sort"></data-filter>
                </card-container>
            </template>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-20">内容设置</div>
                <el-button class="w" size="large" @click="custom_edit"><icon name="edit" size="12"></icon>自定义编辑</el-button>
            </card-container>
        </el-form>
        <Dialog ref="dialog" @accomplish="accomplish">
            <div class="flex-row h w">
                <!-- 左侧和中间区域 -->
                <DragIndex ref="draglist" :key="dragkey" v-model:height="center_height" v-model:width="center_width" :source-list="!isEmpty(data_source_content_list) ? data_source_content_list[0] : {}" :source-type="form?.data_source || ''" :list="custom_list" @right-update="right_update"></DragIndex>
                <!-- 右侧配置区域 -->
                <div class="settings">
                    <template v-if="diy_data.key === 'img'">
                        <model-image-style :key="key" v-model:height="center_height" :options="model_data_source" :value="diy_data"></model-image-style>
                    </template>
                    <template v-else-if="diy_data.key == 'text'">
                        <model-text-style :key="key" v-model:height="center_height" :options="model_data_source" :value="diy_data"></model-text-style>
                    </template>
                    <template v-else-if="diy_data.key == 'auxiliary-line'">
                        <model-lines-style :key="key" v-model:height="center_height" :value="diy_data"></model-lines-style>
                    </template>
                    <template v-else-if="diy_data.key == 'icon'">
                        <model-icon-style :key="key" v-model:height="center_height" :options="model_data_source" :value="diy_data"></model-icon-style>
                    </template>
                    <template v-else-if="diy_data.key == 'panel'">
                        <model-panel-style :key="key" v-model:height="center_height" :value="diy_data"></model-panel-style>
                    </template>
                    <template v-else>
                        <div class="w h flex align-c bg-f">
                            <no-data></no-data>
                        </div>
                    </template>
                </div>
            </div>
        </Dialog>
        <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="[form.data_source]" :multiple="url_value_multiple_bool" @update:model-value="url_value_dialog_call_back"></url-value-dialog>
    </div>
</template>
<script setup lang="ts">
import Dialog from './components/dialog.vue';
import DragIndex from './components/index.vue';
import { isEmpty, cloneDeep } from 'lodash';
import CustomAPI from '@/api/custom';
import ShopAPI from '@/api/shop';
import ArticleAPI from '@/api/article';
import BrandAPI from '@/api/brand';
import { commonStore, DataSourceStore } from '@/store';
import { get_math } from '@/utils';
const common_store = commonStore();
const data_source_store = DataSourceStore();

const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    magicWidth: {
        type: Number,
        default: 390,
    }
});

const dialog = ref<expose | null>(null);
const draglist = ref<diy_data | null>(null);
const form = reactive(props.value);
const center_width = ref(props.magicWidth);
// 弹出框里的内容
let custom_list = reactive([]);
const center_height = ref(0);
interface data_list {
    name: string;
    field: string;
    type: string;
}
interface options_item {
    appoint_data?: object;
    name: string;
    data: data_list[];
    type: string;
}
const options = ref<options_item[]>([]);
//#region 初始化数据处理
const getCustominit = () => {
    CustomAPI.getCustominit().then((res) => {
        const { data_source } = res.data;
        options.value = data_source;
        data_source_store.set_data_source(data_source);
        // 数据处理
        processing_data(form.data_source);
    });
};

onBeforeMount(() => {
    // 不包含新创建的数组时，将历史数据放到手动添加数组中
    if (!Object.keys(form.data_source_content).includes('data_auto_list') && !Object.keys(form.data_source_content).includes('data_list')) {
        const data = cloneDeep(form.data_source_content);
        const new_list = cloneDeep(source_list[form.data_source as keyof typeof source_list]);
        if (!isEmpty(new_list)) {
            form.data_source_content = new_list;
        } else {
            form.data_source_content = cloneDeep(source_list['common']);
        }
        if (!isEmpty(data)) {
            form.data_source_content.data_list = [ data ];
        }
    }
    if (!data_source_store.is_data_source_api) {
        data_source_store.set_is_data_source_api(true);
        getCustominit();
    } else {
        options.value = data_source_store.data_source_list;
        // 如果历史的值出现，根据历史选中的值处理一下传递的数据结构
        processing_data(form.data_source);
    }
});
// 处理显示的图片和传递到下去的数据结构
const model_data_source = ref<data_list[]>([]);
const is_show_more = ref(false);
const processing_data = (key: string) => {
    const list = options.value.filter((item) => item.type == key);
    if (list.length > 0) {
        model_data_source.value = list[0].data;
        if (!isEmpty(list[0].appoint_data)) {
            is_show_more.value = false;
        } else {
            is_show_more.value = true;
            // 从中取出包含图片的内容
            const field_list = list[0].data.filter((item) => item.type == 'images');
            // 取出图片的key
            if (field_list.length > 0) {
                form.img_key = field_list[0].field;
            }
        }
    } else {
        model_data_source.value = [];
    }
};
//#endregion
//#region 自定义编辑的内部处理逻辑
const diy_data = ref<diy>({
    key: '',
    location: {
        x: 0,
        y: 0,
        record_x: 0,
        record_y: 0,
        staging_y: 0,
    },
    com_data: {},
});
const key = ref('');
const dragkey = ref('');

const right_update = (item: any) => {
    diy_data.value = item;
    // 生成随机id
    key.value = Math.random().toString(36).substring(2);
};
// 自定义编辑的逻辑
const custom_edit = () => {
    if (!dialog.value) return;
    dialog.value.dialogVisible = true;
    dragkey.value = Math.random().toString(36).substring(2);
    custom_list = cloneDeep(form.custom_list);
    center_height.value = cloneDeep(form.height);
};
// 点击完成的处理逻辑
const accomplish = () => {
    if (!draglist.value) {
        return;
    } else {
        form.custom_list = draglist.value.diy_data;
    }
    form.height = center_height.value;
};
//#endregion
//#region 数据源更新逻辑处理
// 打开弹出框
const url_value_dialog_visible = ref(false);
const source_list = {
    goods: {
        // 存放手动输入的id
        data_ids: [],
        // 手动输入
        data_list: [],
        // 自动
        data_auto_list: [],
        // 商品类型
        data_type: '0',
        // 关键字
        keyword: '',
        // 商品分类
        category_ids: [],
        // 品牌
        brand_ids: [],
        // 显示数量
        number: 4,
        // 排序类型
        order_by_type: '0',
        // 排序规则
        order_by_rule: '0',
    },
    article: {
        // 存放手动输入的id
        data_ids: [],
        // 手动输入
        data_list: [],
        // 自动
        data_auto_list: [],
        data_type: '0',
        // 关键字
        keyword: '',
        number: 4,
        order_by_type: '0',
        order_by_rule: '0',
        // 文章封面
        is_cover: '0',
        // 分类id
        category_ids: [],
    },
    brand: {
        // 存放手动输入的id
        data_ids: [],
        // 手动输入
        data_list: [],
        // 自动
        data_auto_list: [],
        // 商品类型
        data_type: '0',
        // 关键字
        keyword: '',
        // 商品分类
        category_ids: [],
        // 显示数量
        number: 4,
        // 排序类型
        order_by_type: '0',
        // 排序规则
        order_by_rule: '0',
    },
    common: {
        // 存放手动输入的id
        data_ids: [],
        // 手动输入
        data_list: [],
        // 自动
        data_auto_list: [],
    }
};
const changeDataSource = (key: string) => {
    const type_data = options.value.filter((item) => item.type == key);
    processing_data(key);
    if (type_data.length > 0 && !isEmpty(type_data[0].appoint_data)) {
        form.data_source_content = {
            // 存放手动输入的id
            data_ids: [],
            data_list: [ type_data[0].appoint_data ],
            // 自动
            data_auto_list: [],
        }
    } else {
        form.data_source_content = {
            // 存放手动输入的id
            data_ids: [],
            // 手动输入
            data_list: [],
            // 自动
            data_auto_list: [],
        };
        if (!isEmpty(key) && key in source_list) {
            form.data_source_content = cloneDeep(source_list[key as keyof typeof source_list]);
        }
    }
};
//#endregion
//#region 数据源内容多选处理
const base_list = reactive({
    // 商品分类
    product_list: [
        { name: '指定商品', value: '0' },
        { name: '筛选商品', value: '1' },
    ],
    product_category_list: [] as select_1[],
    product_brand_list: [] as select_1[],
    sort_list: [
        { name: '综合', value: '0' },
        { name: '销量', value: '1' },
        { name: '热度', value: '2' },
        { name: '价格', value: '3' },
        { name: '最新', value: '4' },
    ],
    // 公共分类
    order_by_rule_list: [
        { name: '降序(desc)', value: '0' },
        { name: '升序(asc)', value: '1' },
    ],
    // 文章分类
    article_category_list: [] as select_1[],
    data_type_list: [
        { name: '指定文章', value: '0' },
        { name: '筛选文章', value: '1' },
    ],
    new_sort_list: [
        { name: '综合', value: '0' },
        { name: '时间', value: '1' },
        { name: '浏览量', value: '2' },
    ],
    field_show_list: [
        { name: '日期时间', value: '0' },
        { name: '浏览量', value: '1' },
        { name: '描述', value: '2' },
    ],
    // 品牌数据
    brand_category_list: [] as select_1[],
    brand_data_type_list: [
        { name: '指定品牌', value: '0' },
        { name: '筛选品牌', value: '1' },
    ],
    brand_sort_list: [
        { name: '最新', value: '0' },
        { name: '热度', value: '1' },
    ],
});
onBeforeMount(() => {
    nextTick(() => {
        // 定时获取common_store.common.article_category的数据，直到拿到值或者关闭页面为止
        const interval = setInterval(() => {
            const { goods_category = [], brand_list = [], article_category = [], brand_category = [] } = common_store.common;
            if (goods_category.length > 0 || brand_list.length > 0 || article_category.length > 0) {
                base_list.product_category_list = goods_category;
                base_list.product_brand_list = brand_list;
                base_list.article_category_list = article_category;
                base_list.brand_category_list = brand_category;
                clearInterval(interval);
            }
        }, 1000);
    });
});

const url_value_multiple_bool = ref(true);
const data_list_replace_index = ref(0);
const data_list_replace = (index: number) => {
    data_list_replace_index.value = index;
    url_value_multiple_bool.value = false;
    url_value_dialog_visible.value = true;
};
const add = () => {
    url_value_multiple_bool.value = true;
    url_value_dialog_visible.value = true;
};
// 拖拽更新之后，更新数据
const data_list_sort = (new_list: any) => {
    form.data_source_content.data_list = new_list;
};
const data_list_remove = (index: number) => {
    form.data_source_content.data_list.splice(index, 1);
};
// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
    if (form.data_source == 'brand') {
        item.forEach((item: any) => {
            item.title = item.name;
        });
    }
    if (url_value_multiple_bool.value) {
        item.forEach((item: any) => {
            form.data_source_content.data_list.push({
                id: get_math(),
                new_cover: [],
                new_title: '',
                data: item,
            });
        });
    } else {
        form.data_source_content.data_list[data_list_replace_index.value] = {
            id: get_math(),
            new_cover: [],
            new_title: '',
            data: item[0],
        };
    }
};
// 数据来源的内容
let data_source_content_list = computed(() => {
    if (['goods', 'article', 'brand'].includes(form.data_source)) {
        if (form.data_source_content.data_type == '0') {
            return form.data_source_content.data_list;
        } else {
            return form.data_source_content.data_auto_list;
        }
    } else {
        return form.data_source_content.data_list;
    }
})
// 获取商品自动数据
const get_products = () => {
    const { category_ids, brand_ids, number, order_by_type, order_by_rule, keyword } = form.data_source_content;
    const params = {
        goods_keywords: keyword,
        goods_category_ids: category_ids,
        goods_brand_ids: brand_ids,
        goods_order_by_type: order_by_type,
        goods_order_by_rule: order_by_rule,
        goods_number: number,
    };
    // 获取商品列表
    ShopAPI.getShopLists(params).then((res: any) => {
        // 清空历史数据
        form.data_source_content.data_auto_list = [];
        if (!isEmpty(res.data)) {
            form.data_source_content.data_auto_list = res.data;
        }
    });
};
// 获取文章自动数据
const get_article = async () => {
    const { category_ids, number, order_by_type, order_by_rule, is_cover, keyword } = form.data_source_content;
    const new_data = {
        article_keywords: keyword,
        article_category_ids: category_ids.join(','),
        article_order_by_type: order_by_type,
        article_order_by_rule: order_by_rule,
        article_number: number,
        article_is_cover: is_cover,
    };
    const res = await ArticleAPI.getAutoList(new_data);
    // 清空历史数据
    form.data_source_content.data_auto_list = [];
    if (!isEmpty(res.data)) {
        form.data_source_content.data_auto_list = res.data;
    }
};
// 获取品牌自动数据
const get_brand =  () => {
    const { category_ids, number, order_by_type, order_by_rule, keyword } = form.data_source_content;
    console.log(form.data_source_content);
    const params = {
        brand_keywords: keyword,
        brand_category_ids: category_ids,
        brand_order_by_type: order_by_type,
        brand_order_by_rule: order_by_rule,
        brand_number: number,
    };
    // 获取商品列表
    BrandAPI.getBrandLists(params).then((res: any) => {
        // 清空历史数据
        form.data_source_content.data_auto_list = [];
        if (!isEmpty(res.data)) {
            form.data_source_content.data_auto_list = res.data;
        }
    });
    console.log('品牌分类数据');
    form.data_source_content.data_auto_list = [];
}
const data_source_content_value = computed(() => {
    const { category_ids, brand_ids, number, order_by_type, order_by_rule, data_type, is_cover, keyword } = form.data_source_content;
    return { category_ids: category_ids, brand_ids: brand_ids, number: number, order_by_type: order_by_type, order_by_rule: order_by_rule, data_type: data_type, is_cover: is_cover, keyword: keyword };
})

watch(() => data_source_content_value.value, (new_val) => {
    // 数据发生变化时，如果是自动获取数据，则调用接口获取数据
    if (new_val.data_type != '0') {
        if (form.data_source == 'goods') {
            get_products();
        } else if (form.data_source == 'article') {
            get_article();
        } else if (form.data_source == 'brand') {
            get_brand();
        }
    }
},{ deep: true });
//#endregion
</script>
<style lang="scss" scoped>
.settings {
    width: 46rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
}
@media screen and (max-width: 1560px) {
    .settings {
        width: 40rem;
    }
}
:deep(.el-dialog) {
    margin-top: 0;
    padding: 0;
    overflow: hidden;
    .el-dialog__header {
        padding: 2.3rem 2rem;
        .el-dialog__title {
            font-size: 16px;
        }
        .el-dialog__headerbtn {
            font-size: 2.4rem;
            padding: 2rem;
            height: auto;
            width: auto;
        }
    }
    .el-dialog__body {
        background: #f5f5f5;
        height: calc(100% - 15rem);
    }
    .el-dialog__footer {
        padding: 2.4rem 3rem;
    }
}
.replace-data {
    height: 2.4rem;
    bottom: 0.5rem;
    left: 2.1rem;
    line-height: 2.2rem;
    border-radius: 2rem;
    border: 1px solid #ddd;
    cursor: pointer;
}
</style>
