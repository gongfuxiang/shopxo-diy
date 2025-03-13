<template>
    <el-form-item label="读取方式">
        <el-radio-group v-model="form.data_type">
            <el-radio v-for="item in option_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
        </el-radio-group>
    </el-form-item>
    <div v-show="form.data_type === '0'" class="nav-list">
        <drag-group :list="drag_list" :img-params="img_params" @onsort="data_list_sort" @remove="data_list_remove" @replace="data_list_replace"></drag-group>
        <el-button class="mt-20 w" @click="add">+添加</el-button>
    </div>
    <!-- 商品 -->
    <template v-if="type === 'goods'">
        <div v-show="form.data_type === '1'" class="w h">
            <el-form-item label="关键字">
                <el-input v-model="keywords" placeholder="请输入商品关键字" clearable @blur="keyword_blur"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-select v-model="form.category_ids" multiple collapse-tags filterable placeholder="请选择商品分类">
                    <el-option v-for="item in common_store.common.goods_category" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="指定品牌">
                <el-select v-model="form.brand_ids" multiple collapse-tags filterable placeholder="请选择品牌">
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
        </div>
    </template>
    <!-- 文章 博客 博客选项卡-->
    <template v-else-if="type === 'article' || ['blog', 'blog-tabs'].includes(type)">
        <div v-show="form.data_type === '1'" class="w h">
            <el-form-item label="关键字">
                <el-input v-model="keywords" placeholder="请输入文章关键字" clearable @blur="keyword_blur"></el-input>
            </el-form-item>
            <el-form-item :label="`${ type === 'article' ? '文章' : '博客' }分类`">
                <el-select v-model="form.category_ids" multiple collapse-tags filterable :placeholder="`请选择${ type === 'article' ? '文章' : '博客' }分类`">
                    <template v-if="type === 'article'">
                        <el-option v-for="item in common_store.common.article_category" :key="item.id" :label="item.name" :value="item.id" />
                    </template>
                    <template v-else>
                        <el-option v-for="item in get_data_list(common_store.common.plugins, 'blog.category_list')" :key="item.id" :label="item.name" :value="item.id" />
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="显示数量">
                <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="排序类型">
                <el-radio-group v-model="form.order_by_type">
                    <template v-if="type === 'article'">
                        <el-radio v-for="item in common_store.common.article_order_by_type_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                    </template>
                    <template v-else>
                        <el-radio v-for="item in get_data_list(common_store.common.plugins, 'blog.order_by_type_list')" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                    </template>
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
            <template v-if="['blog', 'blog-tabs'].includes(type)">
                <el-form-item label="是否推荐">
                    <el-switch v-model="form.is_recommended" active-value="1" inactive-value="0" />
                </el-form-item>
                <el-form-item label="是否热门">
                    <el-switch v-model="form.is_hot" active-value="1" inactive-value="0" />
                </el-form-item>
            </template>
        </div>
    </template>
    <!-- 组合搭配 -->
    <template v-else-if="type == 'binding'">
        <div v-show="form.data_type === '1'" class="w h">
            <el-form-item label="关键字">
                <el-input v-model="keywords" placeholder="请输入组合搭配关键字" clearable @blur="keyword_blur"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="form.binding_type" multiple collapse-tags filterable placeholder="请选择类型">
                    <el-option v-for="item in get_data_list(common_store.common.plugins, 'binding.type_list')" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="显示数量">
                <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="排序类型">
                <el-radio-group v-model="form.order_by_type">
                    <el-radio v-for="item in get_data_list(common_store.common.plugins, 'binding.order_by_type_list')" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序规则">
                <el-radio-group v-model="form.order_by_rule">
                    <el-radio v-for="item in common_store.common.data_order_by_rule_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="首页显示">
                <div class="flex-row align-c gap-10">
                    <el-switch v-model="form.is_home_show" active-value="1" inactive-value="0" />
                    <tooltip content="开启仅读取开启首页显示的数据，则全部"></tooltip>
                </div>
            </el-form-item>
        </div>
    </template>
    <template v-else>
        <div v-show="form.data_type === '1'" class="w h">
            <el-form-item label="关键字">
                <el-input v-model="keywords" placeholder="请输入品牌关键字" clearable @blur="keyword_blur"></el-input>
            </el-form-item>
            <el-form-item label="品牌分类">
                <el-select v-model="form.category_ids" multiple collapse-tags filterable placeholder="请选择品牌分类">
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
        </div>
    </template>
</template>

<script lang="ts" setup>
    import { commonStore } from '@/store';
    import { get_data_list } from '@/utils';
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
    const keywords = ref(props.value.keywords);
    const form = ref(props.value);
    const drag_list = ref(props.list);
    type option = {
        name: string,
        value: string,
    }
    const option_list = ref<option[]>([]);
    const img_params = ref('logo');
    // 更新数据，避免子组件数据不刷新
    watchEffect(() => {
        if (props.type === 'goods') {
            option_list.value = props.baseList.product_list;
            img_params.value = 'images';
        } else if (props.type === 'article' || ['blog', 'blog-tabs'].includes(props.type)) {
            option_list.value = props.baseList.data_type_list;
            img_params.value = 'cover';
        } else if (props.type === 'binding') {
            option_list.value = props.baseList.data_type_list;
            img_params.value = 'images';
        } else {
            option_list.value = props.baseList.brand_data_type_list;
            img_params.value = 'logo';
        }
        // 关键字信息
        keywords.value = props.value.keywords;
        form.value = props.value;
        // 历史数据转成数字类型
        form.value.order_by_type = Number(props.value?.order_by_type || 0); 
        form.value.order_by_rule = Number(props.value?.order_by_rule || 0);
        drag_list.value = props.list;
    });
    const keyword_blur = () => {
        form.value.keywords = keywords.value;
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
