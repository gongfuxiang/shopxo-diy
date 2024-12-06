<template>
    <template v-if="type === 'goods'">
        <el-form-item label="读取方式">
            <el-radio-group v-model="form.data_type">
                <el-radio v-for="item in baseList.product_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="form.data_type === '0'">
            <div class="nav-list">
                <drag-group :list="drag_list" img-params="images" @onsort="data_list_sort" @remove="data_list_remove" @replace="data_list_replace"></drag-group>
                <el-button class="mt-20 w" @click="add">+添加</el-button>
            </div>
        </template>
        <template v-else>
            <el-form-item label="关键字">
                <el-input v-model="keyword" placeholder="请输入商品关键字" clearable @blur="keyword_blur"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-select v-model="form.category_ids" multiple collapse-tags placeholder="请选择商品分类">
                    <el-option v-for="item in common_store.common.goods_category" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="指定品牌">
                <el-select v-model="form.brand_ids" multiple collapse-tags placeholder="请选择品牌">
                    <el-option v-for="item in common_store.common.brand_list" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="显示数量">
                <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="排序类型">
                <el-radio-group v-model="form.order_by_type">
                    <el-radio v-for="item in common_store.common.goods_order_by_type_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序规则">
                <el-radio-group v-model="form.order_by_rule">
                    <el-radio v-for="item in common_store.common.data_order_by_rule_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </template>
    </template>
    <template v-else-if="type === 'article'">
        <el-form-item label="读取方式">
            <el-radio-group v-model="form.data_type">
                <el-radio v-for="item in baseList.data_type_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="form.data_type === '0'">
            <div class="nav-list">
                <drag-group :list="drag_list" img-params="cover" @onsort="data_list_sort" @remove="data_list_remove" @replace="data_list_replace"></drag-group>
                <el-button class="mtb-20 w" @click="add">+添加</el-button>
            </div>
        </template>
        <template v-else>
            <el-form-item label="关键字">
                <el-input v-model="keyword" placeholder="请输入文章关键字" clearable @blur="keyword_blur"></el-input>
            </el-form-item>
            <el-form-item label="文章分类">
                <el-select v-model="form.category_ids" multiple collapse-tags placeholder="请选择文章分类">
                    <el-option v-for="item in common_store.common.article_category" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="显示数量">
                <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="排序类型">
                <el-radio-group v-model="form.order_by_type">
                    <el-radio v-for="item in common_store.common.article_order_by_type_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序规则">
                <el-radio-group v-model="form.order_by_rule">
                    <el-radio v-for="item in common_store.common.data_order_by_rule_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="封面图片">
                <el-switch v-model="form.is_cover" active-value="1" inactive-value="0" />
            </el-form-item>
        </template>
    </template>
    <template v-else>
        <el-form-item label="读取方式">
            <el-radio-group v-model="form.data_type">
                <el-radio v-for="item in baseList.brand_data_type_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="form.data_type === '0'">
            <div class="nav-list">
                <drag-group :list="drag_list" img-params="logo" @onsort="data_list_sort" @remove="data_list_remove" @replace="data_list_replace"></drag-group>
                <el-button class="mt-20 w" @click="add">+添加</el-button>
            </div>
        </template>
        <template v-else>
            <el-form-item label="关键字">
                <el-input v-model="keyword" placeholder="请输入品牌关键字" clearable @blur="keyword_blur"></el-input>
            </el-form-item>
            <el-form-item label="品牌分类">
                <el-select v-model="form.category_ids" multiple collapse-tags placeholder="请选择品牌分类">
                    <el-option v-for="item in common_store.common.brand_list" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="显示数量">
                <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="排序类型">
                <el-radio-group v-model="form.order_by_type">
                    <el-radio v-for="item in common_store.common.brand_order_by_type_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序规则">
                <el-radio-group v-model="form.order_by_rule">
                    <el-radio v-for="item in common_store.common.data_order_by_rule_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </template>
    </template>
</template>

<script lang="ts" setup>
    import { commonStore } from '@/store';
    const common_store = commonStore();
    // 定义组件的属性和事件
    const props = defineProps({
        value: {
            type: Object as PropType<any>,
            default: () => {},
        },
        list: {
            type: Array,
            default: () => [],
        },
        baseList: {
            type: Object,
            default: () => {},
        },
        type: {
            type: String,
            default: 'goods',
        }
    });
    const keyword = ref(props.value.keyword);
    const form = ref(props.value);
    const drag_list = ref(props.list);
    // 更新数据，避免子组件数据不刷新
    watchEffect(() => {
        keyword.value = props.value.keyword;
        form.value = props.value;
        // 历史数据转成数字类型
        form.value.order_by_type = Number(props.value?.order_by_type || 0); 
        form.value.order_by_rule = Number(props.value?.order_by_rule || 0);
        drag_list.value = props.list;
    });
    const keyword_blur = () => {
        form.value.keyword = keyword.value;
    }
    const emits = defineEmits(['data_list_sort', 'data_list_remove', 'data_list_replace', 'add']);
    // 数组顺序更新时触发事件
    const data_list_sort = (new_list: any) => {
        emits('data_list_sort', new_list);
    };
    // 数组数据删除时触发的事件
    const data_list_remove = (index: number) => {
        emits('data_list_remove', index);
    };
    // 数组数据替换时触发的事件
    const data_list_replace = (index: number) => {
        emits('data_list_replace', index);
    };
    // 数组添加数据时触发的事件
    const add = () => {
        emits('add');
    };
</script>
