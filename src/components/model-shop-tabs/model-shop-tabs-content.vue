<template>
    <div class="content">
        <el-form :model="form" label-width="74" class="m-h">
            <card-container class="mb-8">
                <div class="mb-12">展示设置</div>
                <el-form-item label="选项卡风格">
                    <el-radio-group v-model="form.tabs_theme" @change="tabs_theme_change">
                        <el-radio v-for="item in base_list.tabs_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选项卡置顶">
                    <el-switch v-model="form.tabs_top_up" />
                </el-form-item>
                <el-form-item label="商品风格">
                    <el-radio-group v-model="form.theme" @change="change_style">
                        <el-radio v-for="item in base_list.product_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <card-container class="content-height">
                <div class="mb-12">选项卡设置</div>
                <div class="nav-list">
                    <drag :data="form.tabs_list" type="card" icon-position="top" :space-col="20" @click="tabs_list_click" @remove="tabs_list_remove" @on-sort="tabs_list_sort">
                        <template #default="{ row, index }">
                            <div class="flex-col w">
                                <el-form-item label="显示标题">
                                    <el-input v-model="row.title" placeholder="请输入标题文字" clearable />
                                </el-form-item>
                                <template v-if="active_index == index">
                                    <el-form-item label="上传图片">
                                        <upload v-model="row.img" :limit="1" size="40" styles="2"></upload>
                                    </el-form-item>
                                    <el-form-item label="简介配置">
                                        <el-input v-model="row.desc" placeholder="请输入简介" clearable />
                                    </el-form-item>
                                    <el-form-item label="添加商品">
                                        <el-radio-group v-model="row.data_type">
                                            <el-radio v-for="item in base_list.product_list" :key="item.value + get_math()" :value="item.value">{{ item.name }}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <template v-if="row.data_type === '0'">
                                        <div class="nav-list">
                                            <drag-group :list="row.data_list" img-params="images" @onsort="goods_list_sort($event, index)" @remove="goods_list_remove($event, index)"></drag-group>
                                            <el-button class="mtb-20 w" @click="product_add(index)">+添加</el-button>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <el-form-item label="商品分类">
                                            <el-select v-model="row.category" multiple collapse-tags placeholder="请选择商品分类">
                                                <el-option v-for="item in base_list.product_category_list" :key="item.id" :label="item.name" :value="item.id" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="指定品牌">
                                            <el-select v-model="row.data_ids" multiple collapse-tags placeholder="请选择商品品牌">
                                                <el-option v-for="item in base_list.product_brand_list" :key="item.id" :label="item.name" :value="item.id" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="显示数量">
                                            <el-input-number v-model="row.number" :min="1" :max="100" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="排序类型">
                                            <el-radio-group v-model="row.sort">
                                                <el-radio v-for="item in base_list.sort_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="排序规则">
                                            <el-radio-group v-model="row.sort_rules">
                                                <el-radio v-for="item in base_list.sort_rules_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </template>
                                </template>
                            </div>
                        </template>
                    </drag>
                    <el-button class="mtb-20 w" @click="tabs_add">+添加</el-button>
                </div>
            </card-container>
            <!-- 商品显示的配置信息 -->
            <product-show-config :value="form"></product-show-config>
            <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['goods']" multiple @update:model-value="url_value_dialog_call_back"></url-value-dialog>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math, tabs_style } from '@/utils';
import ShopAPI from '@/api/shop';
import { shopStore } from '@/store';
const shop_store = shopStore();

const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    tabStyle: {
        type: Object,
        default: () => ({}),
    }
});
const state = reactive({
    form: props.value,
    styles: props.tabStyle,
});
// 如果需要解构，确保使用toRefs
const { form, styles } = toRefs(state);

const base_list = reactive({
    tabs_style_list: [
        { name: '样式一', value: '0' },
        { name: '样式二', value: '1' },
        { name: '样式三', value: '2' },
        { name: '样式四', value: '3' },
        { name: '样式五', value: '4' },
    ],
    product_style_list: [
        { name: '单列展示', value: '0' },
        { name: '大图展示', value: '2' },
        { name: '无图模式', value: '6' },
        { name: '两列展示(纵向)', value: '1' },
        { name: '两列展示(横向)', value: '4' },
        { name: '三列展示', value: '3' },
        { name: '左右滑动展示', value: '5' },
    ],
    product_list: [
        { name: '指定商品', value: '0' },
        { name: '选择商品', value: '1' },
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
    sort_rules_list: [
        { name: '降序（desc）', value: '0' },
        { name: '升序（asc）', value: '1' },
    ],
    list_show_list: [
        { name: '日期时间', value: '0' },
        { name: '浏览量', value: '1' },
    ],
});
// 获取商品分类和品牌分类
const init = () => {
    // 判断是否有历史数据
    if (!shop_store.is_shop_api) {
        shop_store.set_is_shop_api(true);
        ShopAPI.getShop()
            .then((res) => {
                const { goods_category, brand_list } = res.data;
                base_list.product_category_list = goods_category;
                base_list.product_brand_list = brand_list;
                shop_store.set_category_brand(goods_category, brand_list);
            })
            .catch((err) => {
                shop_store.set_is_shop_api(false);
            });
    } else {
        base_list.product_category_list = shop_store.category_list;
        base_list.product_brand_list = shop_store.brand_list;
    }
};

onBeforeMount(() => {
    init();
});

const active_index = ref(0);
const tabs_list_click = (item: any, index: number) => {
    active_index.value = index;
};
// 选项卡设置
const tabs_list_remove = (index: number) => {
    form.value.tabs_list.splice(index, 1);
};
const tabs_list_sort = (item: any) => {
    form.value.tabs_list = item;
};
const tabs_add = () => {
    form.value.tabs_list.push({
        id: get_math(),
        title: '',
        img: [],
        desc: '',
        data_type: '0',
        category: [],
        data_ids: [],
        number: 4,
        sort: '0',
        sort_rules: '0',
        data_list: [],
    });
};

// 指定商品
const goods_list_remove = (index: number, product_index: number) => {
    form.value.tabs_list[product_index].data_list.splice(index, 1);
};
const goods_list_sort = (item: any, index: number) => {
    form.value.tabs_list[index].data_list = item;
};
let click_index = 0;
const product_add = (index: number) => {
    click_index = index;
    url_value_dialog_visible.value = true;
};

// 打开弹出框
const url_value_dialog_visible = ref(false);
// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
    item.forEach((item: any) => {
        form.value.tabs_list[click_index].data_list.push({
            id: get_math(),
            new_cover: [],
            new_title: '',
            data: item,
        });
    });
};

const tabs_theme_change = (val: string | number | boolean | undefined):void => {
    styles.value.tabs_color_checked = tabs_style(styles.value.tabs_color_checked, val);
};
// 选择某些风格时， 切换到对应的按钮
const change_style = (val: any): void => {
    form.value.theme = val;
    if (['3', '4', '5'].includes(val) && form.value.shop_type == 'text') {
        form.value.shop_type = 'icon';
    } else {
        form.value.shop_type = 'text';
    }
};
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    .content-height {
        min-height: calc(100vh - 38.2rem);
    }
}
.number-show {
    :deep(.el-input__wrapper .el-input__inner) {
        text-align: left;
    }
}
</style>
