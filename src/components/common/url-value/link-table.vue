<template>
    <!-- 商品 -->
    <div class="container">
        <div class="flex-row jc-e gap-20 mb-20">
            <el-input v-model="search_value" placeholder="请输入搜索内容" class="search-w" @change="handle_search">
                <template #suffix>
                    <icon name="search" size="16" color="9" class="c-pointer" @click="handle_search"></icon>
                </template>
            </el-input>
        </div>
        <div class="content">
            <el-table :data="tableData" class="w" :header-cell-style="{ background: '#f7f7f7' }" row-key="id" height="438" fixed @row-click="row_click" @select="handle_select" @select-all="handle_select">
                <el-table-column v-if="multiple" type="selection" width="60" />
                <el-table-column v-else label="#" width="60" type="">
                    <template #default="scope">
                        <el-radio v-model="template_selection" :label="scope.$index + ''">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="80" type="" />
                <el-table-column prop="logo" label="封面" width="100" type="">
                    <template #default="scope">
                        <div class="flex-row align-c gap-10">
                            <image-empty v-if="scope.row.logo" v-model="scope.row.logo" class="img"></image-empty>
                            <div class="flex-1">{{ scope.row.title }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="页面名称" />
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
import UrlValueAPI from '@/api/url-value';
const props = defineProps({
    type: {
        type: String,
        default: () => '',
    },
    // 重置
    reset: {
        type: Boolean,
        default: () => false,
    },
    multiple: {
        type: Boolean,
        default: () => false,
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

const init = () => {
    template_selection.value = '';
    search_value.value = '';
    get_list(1);
};
const handle_search = () => {
    get_list(1);
};
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
    const new_data = {
        page: new_page,
        page_size: page_size.value,
        keywords: search_value.value,
    };
    if (props.type == 'diy') {
        UrlValueAPI.getDiyList(new_data).then((res: any) => {
            tableData.value = res.data.data_list;
            data_total.value = res.data.data_total;
            page.value = res.data.page;
        });
    } else if (props.type == 'design') {
        UrlValueAPI.getDesignList(new_data).then((res: any) => {
            tableData.value = res.data.data_list;
            data_total.value = res.data.data_total;
            page.value = res.data.page;
        });
    } else if (props.type == 'custom-view') {
        UrlValueAPI.getCustomList(new_data).then((res: any) => {
            tableData.value = res.data.data_list;
            data_total.value = res.data.data_total;
            page.value = res.data.page;
        });
    }
};
//#region 分页 -----------------------------------------------end
// 根据是diy还是design或者custom-view获取link地址
const computer_link = computed(() => {
    if (props.type == 'design') {
        return '/pages/design/design?id=';
    } else if (props.type == 'custom-view') {
        return '/pages/customview/customview?id=';
    } else {
        return '/pages/diy/diy?id=';
    }
});
const row_click = (row: any) => {
    if (!props.multiple) {
        const new_table_data = JSON.parse(JSON.stringify(tableData.value));
        template_selection.value = new_table_data.findIndex((item: pageLinkList) => item.id == row.id).toString();
        if (props.selectIsUrl) {
            const new_row = {
                id: row.id,
                name: row.name,
                page: computer_link.value + row.id,
            };
            modelValue.value = [new_row];
        } else {
            modelValue.value = row;
        }
    }
};
const handle_select = (selection: any) => {
    if (props.selectIsUrl) {
        // 遍历数组selection
        const new_selection = selection.map((item: any) => {
            return {
                id: item.id,
                name: item.name,
                page: computer_link.value + item.id,
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
</style>
