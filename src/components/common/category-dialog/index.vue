<template>
    <el-dialog v-model="dialogVisible" class="radius-lg" width="1168" draggable append-to-body :close-on-click-modal="false" @close="close_event">
        <template #header>
            <div class="title center re">
                <div class="tc size-16 fw">商品分类</div>
            </div>
        </template>
        <div class="container">
            <div class="flex-row jc-e gap-20 mb-20">
                <el-input v-model="search_value" placeholder="请输入搜索内容" class="search-w" @input="handle_search">
                    <template #suffix>
                        <icon name="search" size="16" color="9" class="c-pointer" @click="handle_search"></icon>
                    </template>
                </el-input>
            </div>
            <div class="content">
                <el-table ref="multipleTableRef" v-loading="loading" :data="table_data" class="w" :header-cell-style="{ background: '#f7f7f7' }" row-key="id" height="438" fixed @selection-change="selection_change">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="id" label="ID" type="" />
                    <el-table-column prop="name" label="分类名称"></el-table-column>
                    <el-table-column prop="image" label="分类图标">
                        <template #default="scope">
                            <image-empty v-if="scope.row.image" v-model="scope.row.image" class="img"></image-empty>
                        </template>
                    </el-table-column>
                    <template #empty>
                        <no-data></no-data>
                    </template>
                </el-table>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="plr-28 ptb-10" @click="close_event">取消</el-button>
                <el-button class="plr-28 ptb-10" type="primary" :disabled="select_all.length <= 0" @click="confirm_event">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { isEmpty } from 'lodash';
import { commonStore } from '@/store';
import { ElTable } from 'element-plus';
const common_store = commonStore();
const dialogVisible = defineModel('dialogVisible', { type: Boolean, default: false });
const search_value = ref('');
interface categoryList extends pageLinkList {
    image: string;
}
const table_data = ref<categoryList[]>([]);
const loading = ref(false);
// 使用 map 方法来遍历数组并返回新的数组
const goods_category_list: categoryList[] = common_store.common.goods_category.map(item => {
    if (!isEmpty(item.realistic_images)) {
        return { ...item, image: item.realistic_images };
    } else {
        return { ...item, image: item.icon };
    }
});
onMounted(() => {
    search_value.value = '';
    table_data.value = goods_category_list;
});
const handle_search = () => {
    loading.value = true;
    // 从分类中取出对应的数据
    const list = goods_category_list.filter(item => item.name?.includes(search_value.value));
    // 赋值给列表数据
    table_data.value = list;
    loading.value = false;
};
const select_all = ref<categoryList[]>([])
const selection_change = (list: categoryList[]) => {
    select_all.value = list;
}
const close_event = () => {
    clear_search();
    dialogVisible.value = false;
};
const emit = defineEmits(['confirm_event']);
const confirm_event = () => {
    const data_list = select_all.value;
    if (!isEmpty(data_list)) {
        emit('confirm_event', data_list);
        clear_search();
        dialogVisible.value = false;
    }
};
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const clear_search = () => {
    select_all.value = [];
    multipleTableRef.value!.clearSelection();
}
</script>

<style scoped lang="scss">
.container {
    padding: 2rem;
    .search-w {
        width: 22.2rem;
    }
}
.img {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 0.4rem;
}
</style>