<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container>
                <div class="mb-12">列表设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.theme" @change="change_style">
                        <el-radio v-for="item in base_list.product_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.theme == '5'" label="轮播列数">
                    <el-radio-group v-model="form.carousel_col" class="ml-4">
                        <el-radio :value="1">1个</el-radio>
                        <el-radio :value="2">2个</el-radio>
                        <el-radio :value="3">3个</el-radio>
                        <el-radio :value="4">4个</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">商品设置</div>
                <el-form-item label="添加商品">
                    <el-radio-group v-model="form.data_type">
                        <el-radio v-for="item in base_list.product_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="form.data_type === '0'">
                    <div class="nav-list">
                        <drag-group :list="form.data_list" img-params="images" @onsort="goods_list_sort" @remove="goods_list_remove"></drag-group>
                        <el-button class="mt-20 w" @click="add">+添加</el-button>
                    </div>
                </template>
                <template v-else>
                    <el-form-item label="商品分类">
                        <el-select v-model="form.category" multiple collapse-tags placeholder="请选择商品分类">
                            <el-option v-for="item in base_list.product_category_list" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指定品牌">
                        <el-select v-model="form.data_ids" multiple collapse-tags placeholder="请选择品牌">
                            <el-option v-for="item in base_list.product_brand_list" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="显示数量">
                        <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
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
            <div class="divider-line"></div>
            <!-- 商品显示的配置信息 -->
            <product-show-config :value="form" @change_shop_type="change_shop_type"></product-show-config>
            <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['goods']" multiple @update:model-value="url_value_dialog_call_back"></url-value-dialog>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import { commonStore } from '@/store';
const common_store = commonStore();

const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    styles: {
        type: Object,
        default: () => ({}),
    },
    defaultConfig: {
        type: Object,
        default: () => ({
            // 图片不同风格下的圆角
            img_radius_0: 4,
            img_radius_1: 0,
        }),
    },
});
const state = reactive({
    form: props.value,
    data: props.styles,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);

const base_list = reactive({
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

onBeforeMount(() => {
    nextTick(() => {
        // 定时获取common_store.common.article_category的数据，直到拿到值或者关闭页面为止
        const interval = setInterval(() => {
            if (common_store.common.goods_category.length > 0 || common_store.common.brand_list.length > 0) {
                base_list.product_category_list = common_store.common.goods_category;
                base_list.product_brand_list = common_store.common.brand_list;
                clearInterval(interval);
            }
        }, 1000);
    });
});

const goods_list_remove = (index: number) => {
    form.value.data_list.splice(index, 1);
};
const add = () => {
    url_value_dialog_visible.value = true;
};
// 打开弹出框
const url_value_dialog_visible = ref(false);
// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
    item.forEach((item: any) => {
        form.value.data_list.push({
            id: get_math(),
            new_cover: [],
            new_title: '',
            data: item,
        });
    });
};
// 拖拽更新之后，更新数据
const goods_list_sort = (new_list: any) => {
    form.value.data_list = new_list;
};
// 选择某些风格时， 切换到对应的按钮
const change_style = (val: any): void => {
    form.value.theme = val;
    if (!is_revise.value) {
        if (['3', '4', '5'].includes(val) && form.value.shop_type == 'text') {
            form.value.shop_type = 'icon';
        } else if (['0', '1', '2'].includes(val) && form.value.shop_type == 'icon') {
            form.value.shop_type = 'text';
        }
    }
    if (['0', '4'].includes(val)) {
        if (data.value.shop_img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.shop_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.shop_img_radius.radius = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_top_left = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_top_right = props.defaultConfig.img_radius_0;
        }
    } else {
        if (data.value.shop_img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.shop_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.shop_img_radius.radius = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_top_left = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_top_right = props.defaultConfig.img_radius_1;
        }
    }
};
const is_revise = ref(false);
const change_shop_type = () => {
    is_revise.value = true;
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
