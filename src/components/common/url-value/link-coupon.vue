<template>
    <!-- 优惠券 -->
    <div class="container">
        <div class="flex-row jc-e gap-20 mb-20">
            <div class="filter-style flex-row gap-12">
                <div class="title">类型</div>
                <el-select v-model="type" class="search-w" placeholder="请选择" multiple collapse-tags filterable @change="handle_search">
                    <el-option v-for="item in coupon_type_list" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
            </div>
            <div class="filter-style flex-row gap-12">
                <div class="title">到期类型</div>
                <el-select v-model="expire_type_ids" multiple collapse-tags filterable placeholder="请选择到期类型">
                    <el-option v-for="item in get_data_list(common_store.common.plugins, 'coupon.expire_type_list')" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
            </div>
            <div class="filter-style flex-row gap-12">
                <div class="title">使用限制</div>
                <el-select v-model="use_limit_type_ids" multiple collapse-tags filterable placeholder="请选择使用限制">
                    <el-option v-for="item in get_data_list(common_store.common.plugins, 'coupon.use_limit_type_list')" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
            </div>
            <el-input v-model="search_value" placeholder="请输入搜索内容" class="search-w" @change="handle_search">
                <template #suffix>
                    <icon name="search" size="16" color="9" class="c-pointer" @click="handle_search"></icon>
                </template>
            </el-input>
        </div>
        <div class="content">
            <el-table v-loading="loading" :data="tableData" class="w" :header-cell-style="{ background: '#f7f7f7' }" row-key="id" height="438" fixed @row-click="row_click" @select="handle_select" @select-all="handle_select">
                <el-table-column v-if="multiple" type="selection" width="60" />
                <el-table-column v-else label="#" width="60" type="">
                    <template #default="scope">
                        <el-radio v-model="template_selection" :label="scope.$index + ''">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="80" type="" />
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="desc" label="描述"></el-table-column>
                <el-table-column prop="type_name" label="类型"></el-table-column>
                <el-table-column prop="expire_type_name" label="到期类型"></el-table-column>
                <el-table-column prop="use_limit_type_name" label="使用限制"></el-table-column>
                <el-table-column prop="cover" label="优惠信息">
                    <template #default="scope">
                        <div class="flex-row align-c gap-3">
                            <div>{{ scope.row.type_first }}</div>
                            <div>{{ scope.row.discount_value }}</div>
                            <div>{{ scope.row.type_unit }}</div>
                        </div>
                    </template>
                </el-table-column>
                <template #empty>
                    <no-data></no-data>
                </template>
            </el-table>
            <div class="mt-10 flex-row jc-e">
                <el-pagination :current-page="page" background :page-size="page_size" :pager-count="5" layout="prev, pager, next" :total="data_total" @current-change="get_list" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { is_obj_empty, get_data_list } from '@/utils';
import UrlValueAPI from '@/api/url-value';
import { commonStore } from '@/store';
const common_store = commonStore();
const props = defineProps({
    // 重置
    reset: {
        type: Boolean,
        default: () => false,
    },
    multiple: {
        type: Boolean,
        default: () => false,
    },
});
watch(
    () => props.reset,
    (val) => {
        if (val) {
            init();
        }
    }
);
onMounted(() => {
    init();
});
const modelValue = defineModel({ type: Object, default: {} });
const tableData = ref<pageLinkList[]>([]);
const search_value = ref('');
const loading = ref(false);
const init = () => {
    template_selection.value = '';
    type.value = [];
    expire_type_ids.value = [];
    use_limit_type_ids.value = [];
    search_value.value = '';
    if (!is_obj_empty(common_store.common.plugins) && !is_obj_empty(common_store.common.plugins.coupon) && common_store.common.plugins.coupon.type_list.length > 0) {
        coupon_type_list.value = common_store.common.plugins.coupon.type_list;
    }
    get_list(1);
};
const handle_search = () => {
    get_list(1);
};
const type = ref([]);
const expire_type_ids = ref([]);
const use_limit_type_ids = ref([]);
interface couponType {
    value: string;
    name: string;
    checked?: boolean;
}
const coupon_type_list = ref<couponType[]>([]);
const template_selection = ref('');
//#region 分页 -----------------------------------------------start
// 当前页
const page = ref(1);
// 每页数量
const page_size = ref(30);
// 总数量
const data_total = ref(0);
// 查询文件
const get_list = (new_page: number) => {
    let new_data = {
        page: new_page,
        keywords: search_value.value,
        type_ids: type.value.length > 0 ? type.value.join(',') : '',
        expire_type_ids: expire_type_ids.value.length > 0 ? expire_type_ids.value.join(',') : '',
        use_limit_type_ids: use_limit_type_ids.value.length > 0 ? use_limit_type_ids.value.join(',') : '',
        page_size: page_size.value,
    };
    loading.value = true;
    UrlValueAPI.getCouponList(new_data).then((res: any) => {
        tableData.value = res.data.data_list;
        data_total.value = res.data.data_total;
        page.value = res.data.page;
        setTimeout(() => {
            loading.value = false;
        }, 500);
    });
};
//#region 分页 -----------------------------------------------end
const row_click = (row: any) => {
    if (!props.multiple) {
        const new_table_data = JSON.parse(JSON.stringify(tableData.value));
        template_selection.value = new_table_data.findIndex((item: pageLinkList) => item.id == row.id).toString();
        modelValue.value = [row];
    }
};
const handle_select = (selection: any) => {
    modelValue.value = selection;
};
</script>
<style lang="scss" scoped>
.container {
    .search-w {
        width: 22.5rem;
    }
    .content {
        :deep(.el-table__inner-wrapper:before) {
            background-color: transparent;
        }
        .img {
            width: 3.6rem;
        }
    }
}
.filter-style {
    min-height: 3.2rem;
    min-width: 20rem;
}
.title {
    font-size: 1.2rem;
    line-height: 3.2rem;
    text-align: right;
    width: 100%;
    color: #606266;
}
</style>
