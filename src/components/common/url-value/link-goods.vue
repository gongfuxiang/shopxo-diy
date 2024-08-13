<template>
    <!-- 商品 -->
    <div class="container">
        <div class="flex-row jc-e gap-20 mb-20">
            <el-select v-model="type" class="search-w" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="brand" class="search-w" placeholder="品牌">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-input v-model="search_value" placeholder="请输入搜索内容" class="search-w" @change="handle_search">
                <template #suffix>
                    <icon name="search" size="16" color="9"></icon>
                </template>
            </el-input>
        </div>
        <div class="content">
            <el-table :data="tableData" class="w" :header-cell-style="{ background: '#f7f7f7' }" row-key="id" height="438" fixed @row-click="row_click">
                <el-table-column label="#" width="120" type="">
                    <template #default="scope">
                        <el-radio v-model="template_selection" :label="scope.$index + ''">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="180" type="" />
                <el-table-column prop="icon" label="商品图片">
                    <template #default="scope">
                        <el-image :src="scope.row.icon" class="img" />
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="分类名称" />
            </el-table>
            <div class="mt-10 flex-row jc-e">
                <el-pagination :current-page="page" :page-size="21" :pager-count="5" layout="prev, pager, next" :total="data_total" @current-change="get_list" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    // 重置
    reset: {
        type: Boolean,
        default: () => false,
    },
});
watch(
    () => props.reset,
    () => {
        template_selection.value = '';
    }
);
const modelValue = defineModel({ type: Object, default: {} });
const tableData: linkData[] = [
    {
        id: 1,
        name: '一级分类',
        icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
        link: 'a',
    },
    {
        id: 3,
        name: '一级分类',
        icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
        link: 'c',
    },
    {
        id: 4,
        name: '一级分类',
        icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
        link: 'd',
    },
    {
        id: 5,
        name: '一级分类',
        icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
        link: 'e',
    },
];
const search_value = ref('');
const handle_search = () => {
    console.log(search_value.value);
};
const type = ref('');
const brand = ref('');
const options = ref([
    { value: '1', label: '一级分类' },
    { value: '2', label: '二级分类' },
    { value: '3', label: '三级分类' },
]);
const emit = defineEmits(['update:link']);
const template_selection = ref('');

const row_click = (row: any) => {
    const new_table_data = JSON.parse(JSON.stringify(tableData));
    template_selection.value = new_table_data.findIndex((item: linkData) => item.id == row.id).toString();
    modelValue.value = row;
};
//#region 分页 -----------------------------------------------start
// 总页数
// const page_total = ref(0);
// 当前页
const page = ref(1);
// 总数量
const data_total = ref(0);

// 查询文件
const search_data = ref({
    page: page.value,
    type: '',
    name: search_value.value,
});
// 查询文件
const get_list = () => {
    console.log('查询接口', search_data);
};
//#region 分页 -----------------------------------------------end
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
            height: 3.6rem;
        }
    }
}
</style>
