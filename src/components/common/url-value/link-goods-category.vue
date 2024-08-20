<template>
    <!-- 商品分类 -->
    <div class="container">
        <div class="flex-row jc-e gap-20 mb-20">
            <el-input v-model="search_value" placeholder="请输入搜索内容" class="search-w" @change="handle_search">
                <template #suffix>
                    <icon name="search" size="16" color="9" class="c-pointer" @click="handle_search"></icon>
                </template>
            </el-input>
        </div>
        <div class="content">
            <el-table :data="new_table_data" class="w" :header-cell-style="{ background: '#f7f7f7' }" :tree-props="{ children: 'items' }" row-key="id" height="460" fixed @row-click="row_click">
                <el-table-column label="#" width="120" type="">
                    <template #default="scope">
                        <el-radio v-model="template_selection" :label="scope.$index + ''">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="180" type="" />
                <el-table-column prop="name" label="分类名称"></el-table-column>
                <el-table-column prop="icon" label="分类图标">
                    <template #default="scope">
                        <image-empty v-model="scope.row.icon" class="img"></image-empty>
                    </template>
                </el-table-column>
                <template #empty>
                    <no-data></no-data>
                </template>
            </el-table>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { urlValueStore, urlValue, pageLinkList } from '@/store';
const url_value_store = urlValueStore();
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
        init();
    }
);
const modelValue = defineModel({ type: Object, default: {} });
const table_data = ref<pageLinkList[]>([]);
const new_table_data = ref<pageLinkList[]>([]);
const search_value = ref('');
onMounted(() => {
    init();
});
const init = () => {
    search_value.value = '';
    table_data.value = url_value_store.url_value.goods_category;
    new_table_data.value = url_value_store.url_value.goods_category;
};
// 筛选
const handle_search = () => {
    // 根据关键词过滤new_table_data数据,如果==父级 显示父级和父级下的所有子级数据，
    if (search_value.value) {
        new_table_data.value = filterData(search_value.value, table_data.value || []);
    } else {
        new_table_data.value = table_data.value || [];
    }
};

const filterData = (input: string, data: pageLinkList[]) => {
    let result = [];
    // 遍历数组
    for (let item of data) {
        // 检查当前项的name是否匹配
        if (item.name.includes(input)) {
            result.push(item);
        } else {
            if (item.items) {
                // 否则，‌检查当前项的data属性中的子项
                let subResult = item.items.filter((subItem) => subItem.name.includes(input));
                // 如果找到匹配的子项，‌将当前项（‌父级）‌添加到结果中
                if (subResult.length > 0) {
                    result.push({ ...item, items: subResult });
                } else {
                    // 如果二级还没有查到则查询三级
                    let result_child: pageLinkList[] = [];
                    item.items.forEach((child: pageLinkList) => {
                        if (child.items) {
                            let subResult = child.items.filter((subItem) => subItem.name.includes(input));
                            if (subResult.length > 0) {
                                result_child.push({ ...child, items: subResult });
                            }
                        }
                    });
                    if (result_child.length > 0) {
                        result.push({ ...item, items: result_child });
                    }
                }
            }
        }
    }

    return result;
};

const template_selection = ref('');

const row_click = (row: any) => {
    let new_data: pageLinkList[] = [];
    // 多级数组转换一级数组
    const array_conversion = (item: pageLinkList[]) => {
        item.forEach((item) => {
            new_data.push(item);
            if (item.items) {
                array_conversion(item.items);
            }
        });
        return new_data;
    };
    const new_table_datas = array_conversion(JSON.parse(JSON.stringify(new_table_data.value)));
    template_selection.value = new_table_datas.findIndex((item: pageLinkList) => item.id == row.id).toString();
    modelValue.value = row;
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
            height: 3.6rem;
        }
    }
}
</style>
