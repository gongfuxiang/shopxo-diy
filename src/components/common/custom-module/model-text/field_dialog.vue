<template>
    <el-dialog v-model="dialogVisible" title="字段选择" class="radius-lg" width="600" draggable append-to-body :close-on-click-modal="false" @close="dialogVisible = false;">
        <div class="flex-col gap-20 w h pa-20 oh align-e">
            <el-input v-model="search" class="search-w" placeholder="请输入搜索内容" @input="handle_search"></el-input>
            <!-- 表格头部如果传输了数据，就渲染表格, 否则就不渲染 -->
            <el-table :data="table_data" style="width: 100%; height: 400px;">
                <el-table-column prop="name" label="字段名称" />
                <el-table-column prop="field" label="字段值" />
                <el-table-column fixed="right" label="操作" width="60">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="copy(scope.row.field)">复制</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
    option: {
        type: Array as PropType<string[]>,
        default: () => [],
    }
});
const dialogVisible = defineModel('dialogVisible', { type: Boolean, default: false });
const table_data = ref(props.option);
const search = ref('');
const handle_search = () => {
    table_data.value = props.option.filter((item: any) => item.field.includes(search.value) || item.name.includes(search.value));
};

const copy = (val: string) => {
  const text = '${' + val + '}';
  navigator.clipboard
    .writeText(text)
    .then(() => {
        ElMessage({ type: 'success', message: '复制成功!'});
    })
    .catch((error) => {
        ElMessage({ type: 'error', message: '复制失败!'});
    });
    dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.search-w {
    width: 20rem;
    right: 0;
}
</style>