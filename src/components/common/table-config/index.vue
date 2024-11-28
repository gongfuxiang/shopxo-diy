<template>
    <el-table :data="tableData" class="custom-table" style="width: 100%" height="438"  :header-cell-style="{ background: '#f7f7f7' }" @row-click="row_click" @select="handle_select" @select-all="handle_select" >
        <el-table-column v-if="multiple" type="selection" width="60" />
        <el-table-column v-else label="#" width="60" type="">
            <template #default="scope">
                <el-radio v-model="template_selection" :label="scope.$index + ''">&nbsp;</el-radio>
            </template>
        </el-table-column>
        <template v-for="(item, index) in tableColumnList" :key="index">
            <el-table-column :prop="item.field" :label="item.name" :width="item?.width || ''">
                <template #default="scope">
                    <template v-if="item.type == 'images'">
                        <image-empty v-if="scope.row[item.field]" v-model="scope.row[item.field]" fit="contain" class="img"></image-empty>
                    </template>
                    <template v-else-if="item.type == 'text'">
                        {{ scope.row[item.field] }}
                    </template>
                </template>
            </el-table-column>
        </template>
        <template #empty>
            <no-data></no-data>
        </template>
    </el-table>
</template>

<script lang="ts" setup>
interface TableColumn {
    field: string;
    name: string;
    width?: string;
    type: string;
}
const props = defineProps({
    tableData: {
        type: Array,
        default: () => ([]),
    },
    type: {
        type: String,
        default: 'id',
    },
    // 是否为tabs
    tableColumnList: {
        type: Array as PropType<TableColumn[]>,
        default: () => ([]),
    },
    multiple: {
        type: Boolean,
        default: false,
    }
});

const template_selection = ref('');
const emit = defineEmits(['select']);
//#region 点击事件
// 单选时的触发逻辑
const row_click = (row: any) => {
    if (!props.multiple) {
        // 深拷贝数据，防止修改数据后影响到原来的数据
        const new_table_data = JSON.parse(JSON.stringify(props.tableData));
        // 通过唯一标识判断当前是属于哪一个的数据
        template_selection.value = new_table_data.findIndex((item: any) => item[props.type] == row[props.type]).toString();
        emit('select', [ row ]);
    }
};
// 多选时的触发逻辑
const handle_select = (selection: any) => {
    emit('select', selection);
};
//#endregion
</script>

<style lang="scss" scoped>
.custom-table {
    .img {
        width: 3.2rem;
    }
}
</style>

