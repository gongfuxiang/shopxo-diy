<template>
    <el-form-item label="读取方式">
        <el-radio-group v-model="form.data_type">
            <el-radio v-for="item in option_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
        </el-radio-group>
    </el-form-item>
    <div v-show="form.data_type === '0'" class="nav-list">
        <drag-group :list="drag_list" :img-params="config.imgParam" :title-params="config.titleParam" :type="config.typeParam" @onsort="data_list_sort" @remove="data_list_remove" @replace="data_list_replace"></drag-group>
        <el-button class="mt-20 w" @click="add">+添加</el-button>
    </div>
    <div v-show="form.data_type === '1'" class="w h">
        <!-- 直播筛选关键字在下方独立表单项中配置 -->
        <!-- 直播筛选关键字在下方独立表单项，避免顺序与视频/博客不一致 -->
        <el-form-item v-if="type !== 'plugins_live'" label="关键字">
            <el-input v-model="keywords" placeholder="请输入关键字" clearable @blur="keyword_blur"></el-input>
        </el-form-item>
        <!-- 商品 -->
        <template v-if="type === 'goods'">
            <el-form-item label="商品分类">
                <div class="flex-row gap-10 w h">
                    <el-cascader v-model="form.category_ids" placeholder="请选择商品分类" :show-all-levels="false" filterable clearable class="w h" collapse-tags popper-class="filter-form-cascader" placement="left" :props="{'multiple': true, 'checkStrictly': true, 'emitPath': false, 'value': 'id', 'label': 'name', 'children': 'items' }" :options="common_store.common.goods_category" /> 
                    <tooltip content="父级选中包含所有子级"></tooltip>
                </div>
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
        </template>
        <!-- 拼团自动筛选：字段与 autogroupbuylist 接口一致 -->
        <template v-else-if="type === 'plugins_groupbuy'">
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
        <!-- 直播自动筛选：字段与 autolivelist 接口一致 -->
        <template v-else-if="type === 'plugins_live'">
            <!-- live_status → 请求参数 live_status（逗号分隔） -->
            <el-form-item label="直播状态">
                <el-select v-model="form.live_status" multiple collapse-tags filterable clearable placeholder="请选择直播状态">
                    <el-option v-for="item in live_status_filter_list" :key="item.type" :label="item.name" :value="item.type" />
                </el-select>
            </el-form-item>
            <!-- keywords → live_keywords -->
            <el-form-item label="关键字">
                <el-input v-model="keywords" placeholder="请输入关键字" clearable @blur="keyword_blur"></el-input>
            </el-form-item>
            <el-form-item label="显示数量">
                <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
            </el-form-item>
            <!-- order_by_type → live_order_by_type，数据源 plugins.live.order_by_type_list -->
            <el-form-item label="排序类型">
                <el-radio-group v-model="form.order_by_type">
                    <el-radio v-for="item in get_data_list(common_store.common.plugins, 'live.order_by_type_list')" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- order_by_rule → live_order_by_rule，数据源 common.data_order_by_rule_list -->
            <el-form-item label="排序规则">
                <el-radio-group v-model="form.order_by_rule">
                    <el-radio v-for="item in common_store.common.data_order_by_rule_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否推荐">
                <el-switch v-model="form.is_recommended" active-value="1" inactive-value="0" />
            </el-form-item>
        </template>
        <!-- 文章 博客 视频-->
        <template v-else-if="['blog', 'article', 'plugins_video'].includes(type)">
            <el-form-item :label="`${ type === 'article' ? '文章' : type === 'plugins_video' ? '视频' : '博客' }分类`">
                <el-select v-model="form.category_ids" multiple collapse-tags filterable :placeholder="`请选择${ type === 'article' ? '文章' : type === 'plugins_video' ? '视频' : '博客' }分类`">
                    <template v-if="type === 'article'">
                        <el-option v-for="item in common_store.common.article_category" :key="item.id" :label="item.name" :value="item.id" />
                    </template>
                    <template v-else-if="type === 'plugins_video'">
                        <el-option v-for="item in get_data_list(common_store.common.plugins, 'video.category_list')" :key="item.id" :label="item.name" :value="item.id" />
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
                    <template v-else-if="type === 'plugins_video'">
                        <el-radio v-for="item in get_data_list(common_store.common.plugins, 'video.search_order_by_list')" :key="item.type" :value="item.type">{{ item.name }}</el-radio>
                    </template>
                    <template v-else>
                        <el-radio v-for="item in get_data_list(common_store.common.plugins, 'blog.order_by_type_list')" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                    </template>
                </el-radio-group>
            </el-form-item>
            <template v-if="['blog', 'blog-tabs', 'article'].includes(type)">
                <el-form-item label="排序规则">
                    <el-radio-group v-model="form.order_by_rule">
                        <el-radio v-for="item in common_store.common.data_order_by_rule_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item label="发布时间">
                    <el-radio-group v-model="form.order_by_release_time_rule">
                        <el-radio v-for="item in get_data_list(common_store.common.plugins, 'video.search_release_time_list')" :key="item.type" :value="item.type">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="视频时长">
                    <el-radio-group v-model="form.order_by_duration_rule">
                        <el-radio v-for="item in get_data_list(common_store.common.plugins, 'video.search_duration_list')" :key="item.type" :value="item.type">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </template>
            <template v-if="['blog', 'blog-tabs', 'article'].includes(type)">
                <el-form-item label="封面图片">
                    <el-switch v-model="form.is_cover" active-value="1" inactive-value="0" />
                </el-form-item>
            </template>
            <template v-if="['blog', 'blog-tabs', 'plugins_video'].includes(type)">
                <el-form-item label="是否推荐">
                    <el-switch v-model="form.is_recommended" active-value="1" inactive-value="0" />
                </el-form-item>
                <el-form-item label="是否热门">
                    <el-switch v-model="form.is_hot" active-value="1" inactive-value="0" />
                </el-form-item>
            </template>
        </template>
        <!-- 组合搭配 -->
        <template v-else-if="type == 'binding'">
            <el-form-item label="分类">
                <el-select v-model="form.category_ids" multiple collapse-tags filterable placeholder="请选择分类">
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
        </template>
        <!-- 多商户 | 多门店 -->
        <template v-else-if="['realstore', 'merchant'].includes(type)">
            <el-form-item :label="`${ type === 'realstore' ? '门店' : '商户' }分类`">
                <el-select v-model="form.category_ids" multiple collapse-tags filterable placeholder="请选择分类">
                    <template v-if="type === 'realstore'">
                        <el-option v-for="item in get_data_list(common_store.common.plugins, 'realstore.category_list')" :key="item.id" :label="item.name" :value="item.id" />
                    </template>
                    <template v-else>
                        <el-option v-for="item in get_data_list(common_store.common.plugins, 'shop.category_list')" :key="item.id" :label="item.name" :value="item.id" />
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="显示数量">
                <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="排序类型">
                <el-radio-group v-model="form.order_by_type">
                    <template v-if="type === 'realstore'">
                        <el-radio v-for="item in get_data_list(common_store.common.plugins, 'realstore.order_by_type_list')" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                    </template>
                    <template v-else>
                        <el-radio v-for="item in get_data_list(common_store.common.plugins, 'shop.order_by_type_list')" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                    </template>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序规则">
                <el-radio-group v-model="form.order_by_rule">
                    <el-radio v-for="item in common_store.common.data_order_by_rule_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="读取商品">
                <el-switch v-model="form.is_goods_list" active-value="1" inactive-value="0" />
            </el-form-item> -->
        </template>
        <!-- 问答 -->
        <template v-else-if="['ask'].includes(type)">
            <el-form-item label="问答分类">
                <el-select v-model="form.category_ids" multiple collapse-tags filterable placeholder="请选择分类">
                    <el-option v-for="item in get_data_list(common_store.common.plugins, 'ask.category_list')" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="显示数量">
                <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="排序类型">
                <el-radio-group v-model="form.order_by_type">
                    <el-radio v-for="item in get_data_list(common_store.common.plugins, 'ask.order_by_type_list')" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序规则">
                <el-radio-group v-model="form.order_by_rule">
                    <el-radio v-for="item in common_store.common.data_order_by_rule_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="回复状态">
                <el-radio-group v-model="form.is_reply">
                    <el-radio v-for="item in baseList.filter_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </template>
        <!-- 活动分类 -->
        <template v-else-if="['activity'].includes(type)">
            <el-form-item label="活动分类">
                <el-select v-model="form.category_ids" multiple collapse-tags filterable placeholder="请选择分类">
                    <el-option v-for="item in get_data_list(common_store.common.plugins, 'activity.category_list')" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="显示数量">
                <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="排序类型">
                <el-radio-group v-model="form.order_by_type">
                    <el-radio v-for="item in get_data_list(common_store.common.plugins, 'activity.order_by_type_list')" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序规则">
                <el-radio-group v-model="form.order_by_rule">
                    <el-radio v-for="item in common_store.common.data_order_by_rule_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="首页显示">
                <el-switch v-model="form.is_home" active-value="1" inactive-value="0" />
            </el-form-item>
        </template>
        <template v-else-if="['coupon'].includes(type)">
            <el-form-item label="类型">
                <el-select v-model="form.type" multiple collapse-tags filterable placeholder="请选择优惠券类型">
                    <el-option v-for="item in get_data_list(common_store.common.plugins, 'coupon.type_list')" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="到期类型">
                <el-select v-model="form.expire_type_ids" multiple collapse-tags filterable placeholder="请选择到期类型">
                    <el-option v-for="item in get_data_list(common_store.common.plugins, 'coupon.expire_type_list')" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="使用限制">
                <el-select v-model="form.use_limit_type_ids" multiple collapse-tags filterable placeholder="请选择使用限制">
                    <el-option v-for="item in get_data_list(common_store.common.plugins, 'coupon.use_limit_type_list')" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="显示数量">
                <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="排序类型">
                <el-radio-group v-model="form.order_by_type">
                    <el-radio v-for="item in get_data_list(common_store.common.plugins, 'coupon.order_by_type_list')" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序规则">
                <el-radio-group v-model="form.order_by_rule">
                    <el-radio v-for="item in common_store.common.data_order_by_rule_list" :key="item.index" :value="item.index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="重复领取">
                <el-switch v-model="form.is_repeat_receive" active-value="1" inactive-value="0" />
            </el-form-item>
            <el-form-item label="公共显示">
                <el-switch v-model="form.is_show" active-value="1" inactive-value="0" />
            </el-form-item>
            <template v-if="form.theme === '4'">
                <el-form-item label="内容标题">
                    <el-input v-model="form.title" placeholder="请输入内容" clearable></el-input>
                </el-form-item>
                <el-form-item label="内容描述">
                    <el-input v-model="form.desc" type="textarea" :rows="4" placeholder="请输入内容" clearable></el-input>
                </el-form-item>
            </template>
        </template>
        <template v-else>
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
        </template>
    </div>
</template>

<script lang="ts" setup>
    import { commonStore } from '@/store';
    import { get_data_list } from '@/utils';
    import { get_live_status_filter_list } from '@/config/const/plugins-live-status';
    const common_store = commonStore();
    /** 直播状态筛选项（plugins.live.status_list） */
    const live_status_filter_list = computed(() => get_live_status_filter_list(common_store.common.plugins));
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
            type: String as PropType<'goods' | 'blog' | 'article' | 'binding' | 'realstore' | 'merchant' | 'ask' | 'activity' | 'coupon' | 'plugins_video' | 'plugins_live' | 'plugins_groupbuy'>,
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
    // 不同组件的默认配置
    const configMap = {
        goods: {
            optionListKey: 'product_list',
            imgParam: 'images',
            titleParam: 'title',
        },
        blog: {
            optionListKey: 'data_type_list',
            imgParam: 'cover',
            titleParam: 'title',
        },
        plugins_video: {
            optionListKey: 'data_type_list',
            imgParam: 'cover',
            titleParam: 'title',
        },
        // 直播列表/选项卡：读取方式、筛选字段配置
        plugins_live: {
            optionListKey: 'data_type_list',
            imgParam: 'cover',
            titleParam: 'title',
        },
        plugins_groupbuy: {
            optionListKey: 'product_list',
            imgParam: 'cover',
            titleParam: 'title',
        },
        article: {
            optionListKey: 'data_type_list',
            imgParam: 'cover',
            titleParam: 'title',
        },
        binding: {
            optionListKey: 'data_type_list',
            imgParam: 'images',
            titleParam: 'title',
        },
        realstore: {
            optionListKey: 'data_type_list',
            imgParam: 'logo',
            titleParam: 'name',
        },
        merchant: {
            optionListKey: 'data_type_list',
            imgParam: 'logo',
            titleParam: 'name',
        },
        ask: {
            optionListKey: 'data_type_list',
            imgParam: '',
            titleParam: 'title',
            typeParam: 'custom',
        },
        activity: {
            optionListKey: 'data_type_list',
            imgParam: 'cover',
            titleParam: 'title',
        },
        coupon: {
            optionListKey: 'data_type_list',
            imgParam: '',
            titleParam: 'name',
            typeParam: 'custom',
        },
        default: {
            optionListKey: 'brand_data_type_list',
            imgParam: 'logo',
            titleParam: 'title',
        }
    };
    type config_type = {
        optionListKey: string,
        imgParam: string,
        titleParam: string,
        typeParam?: string,
    };
    const config = ref<config_type>(configMap.default);
    // 更新数据，避免子组件数据不刷新
    watchEffect(() => {
        // 获取不同数据对应的值
        config.value = configMap[props.type] || configMap.default;
        // 不同数据对应的type类型
        option_list.value = props.baseList[config.value.optionListKey];
        // 关键字复制
        keywords.value = props.value.keywords;
        form.value = props.value;
        // 历史数据转成数字类型
        if (props.type === 'plugins_video') {
            form.value.order_by_type = props.value?.order_by_type || 'default';
            form.value.order_by_release_time_rule = props.value?.order_by_release_time_rule || 'default';
            form.value.order_by_duration_rule = props.value?.order_by_duration_rule || 'default';
        } else if (props.type === 'plugins_live') {
            // 排序类型/规则为 number，与 order_by_type_list、data_order_by_rule_list 的 index 对应
            form.value.order_by_type = Number(props.value?.order_by_type ?? 0);
            form.value.order_by_rule = Number(props.value?.order_by_rule ?? 0);
            form.value.live_status = Array.isArray(props.value?.live_status) ? props.value.live_status : [];
            const recommended = props.value?.is_recommended;
            form.value.is_recommended =
                recommended === '' || recommended === null || recommended === undefined ? '0' : String(recommended);
        } else {
            form.value.order_by_type = Number(props.value?.order_by_type || 0);
            form.value.order_by_rule = Number(props.value?.order_by_rule || 0);
        }
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
