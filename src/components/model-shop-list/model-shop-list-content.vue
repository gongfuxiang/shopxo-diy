<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container class="mb-8">
                <div class="mb-12">列表设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.product_style" @change="change_style">
                        <el-radio v-for="item in base_list.product_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="content-height bg-f">
                <card-container class="card-container-br">
                    <div class="mb-12">商品设置</div>
                    <el-form-item label="添加商品">
                        <el-radio-group v-model="form.product_check">
                            <el-radio v-for="item in base_list.product_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="form.product_check === '0'">
                        <div class="nav-list">
                            <drag-group :list="form.product_list" img-params="images" @onsort="product_list_sort" @remove="product_list_remove"></drag-group>
                            <el-button class="mt-20 w" @click="add">+添加</el-button>
                        </div>
                    </template>
                    <template v-else>
                        <el-form-item label="商品分类">
                            <el-select v-model="form.goods_category_ids" multiple collapse-tags placeholder="请选择商品分类">
                                <el-option v-for="item in base_list.product_category_list" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="指定品牌">
                            <el-select v-model="form.goods_brand_ids" multiple collapse-tags placeholder="请选择品牌">
                                <el-option v-for="item in base_list.product_brand_list" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="显示数量">
                            <el-input-number v-model="form.number" :min="1" :max="100" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
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
                    </template>
                </card-container>
                <!-- 商品显示的配置信息 -->
                <product-show-config :value="form"></product-show-config>
            </div>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import ShopAPI from '@/api/shop';
import { shopStore } from '@/store';
const shop_store = shopStore();

const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const state = reactive({
    form: props.value,
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

const base_list = reactive({
    product_style_list: [
        { name: '单列展示', value: '0' },
        { name: '大图展示', value: '2' },
        { name: '两列展示(纵向)', value: '1' },
        { name: '两列展示(横向)', value: '4' },
        { name: '三列展示', value: '3' },
        { name: '左右滑动展示', value: '5' },
    ],
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
    sort_rules_list: [
        { name: '降序(desc)', value: '0' },
        { name: '升序(asc)', value: '1' },
    ],
});

const init = () => {
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

const product_list_remove = (index: number) => {
    form.value.product_list.splice(index, 1);
};
const add = () => {
    form.value.product_list.push({
        id: get_math(),
        src: 'carousel',
        new_src: [],
        href: {},
    });
};
// 拖拽更新之后，更新数据
const product_list_sort = (new_list: any) => {
    form.value.product_list = new_list;
};
const change_style = (val: any): void => {
    form.value.product_style = val;
    if (['3', '4', '5'].includes(val) && ['0', '1'].includes(form.value.shop_type)) {
        form.value.shop_type = '2';
    }
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
.card,
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.img {
    width: 4rem;
    height: 4rem;
}
.number-show {
    :deep(.el-input__wrapper .el-input__inner) {
        text-align: left;
    }
}
</style>
