<template>
    <!-- 商品 -->
    <div class="container">
        <div class="flex-row jc-e gap-20 mb-20 align-c">
            <el-cascader v-model="category_ids" :options="category_list" :props="cascader_config" placeholder="请选择" :show-all-levels="false" collapse-tags filterable clearable @change="cascader_change" />
            <el-select v-model="brand_ids" class="search-w" placeholder="品牌" filterable clearable @change="handle_search">
                <el-option v-for="item in brand_list" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
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
                <el-table-column prop="images" label="商品">
                    <template #default="scope">
                        <div class="flex-row align-c gap-10">
                            <image-empty v-if="scope.row.images" v-model="scope.row.images" class="img"></image-empty>
                            <div class="flex-1">{{ scope.row.title }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="category_text" width="100" label="分类名称" />
                <el-table-column prop="brand_name" width="100" label="品牌名称" />
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
import commonApi from '@/api/common';
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
    linkUrl: {
        type: String,
        default: '',
    },
    // 判断是否返回链接地址
    selectIsUrl: {
        type: Boolean,
        default: false,
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
const cascader_config = {
    value: 'id',
    label: 'name',
    children: 'items',
    multiple: true,
    checkStrictly: true,
    emitPath: false,
};
const init = () => {
    template_selection.value = '';
    category_ids.value = [];
    brand_ids.value = '';
    search_value.value = '';
    category_list.value = common_store.common.goods_category;
    brand_list.value = common_store.common.brand_list;
    get_list(1);
};
const handle_search = () => {
    get_list(1);
};
const cascader_change = (val: any) => {
    // 根据获取的val从data中获取label
    category_ids.value = val ? val : [];
    get_list(1);
};
const category_ids = ref([]);
const brand_ids = ref('');
const category_list = ref<pageLinkList[]>([]);
const brand_list = ref<any[]>([]);
const emit = defineEmits(['update:link']);
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
        brand_ids: brand_ids.value,
        page_size: page_size.value,
        category_ids: category_ids.value,
    };
    loading.value = true;
    commonApi.getDynamicApi(props.linkUrl, new_data).then((res: any) => {
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
        if (props.selectIsUrl) {
            const page = '/pages/goods-detail/goods-detail?id=' + row.id;
            const new_row = {
                id: row.id,
                name: row.name || row.title || page,
                page: page,
            };
            modelValue.value = [new_row];
        } else {
            modelValue.value = [row];
        }
    }
};
const handle_select = (selection: any) => {
    if (props.selectIsUrl) {
        // 遍历数组selection
        const new_selection = selection.map((item: any) => {
            const page = '/pages/goods-detail/goods-detail?id=' + item.id;
            return {
                id: item.id,
                name: item.name || item.title || page,
                page: page,
            };
        });
        modelValue.value = new_selection;
    } else {
        modelValue.value = selection;
    }
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
// 输入框超出隐藏，不换行
:deep(.el-cascader) {
    height: 3.2rem;
    .el-input {
        height: 3.2rem;
    }
    .el-cascader__tags {
        flex-wrap: nowrap !important;
    }
    .el-tag {
        max-width: 10rem;
    }
}
</style>
