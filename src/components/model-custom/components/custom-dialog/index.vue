<template>
    <el-dialog v-model="dialogVisible" class="radius-lg" width="1168" draggable append-to-body :close-on-click-modal="false" :top="dialogPositionTop ? dialogPositionTop + 'px' : ''" @close="close_event">
        <template #header>
            <div class="title center re">
                <div class="tc size-16 fw">{{ config?.popup_title || '' }}</div>
            </div>
        </template>
        <div class="flex-col gap-20 w h pa-20 oh">
            <filter-form :filter-data="config.filter_form_config" direction="horizontal" :data-interface="default_data" @form-change="filter_form_change"></filter-form>
            <table-config v-loading="loading" :table-data="tableData" :multiple="multiple" :table-column-list="config.header" @select="table_select"></table-config>
            <div class="flex-row jc-e">
                <el-pagination :current-page="pagination_data.page" background :page-size="pagination_data.page_size" :pager-count="5" layout="prev, pager, next" :total="pagination_data.data_total" @current-change="get_list" />
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="plr-28 ptb-10" @click="close_event">取消</el-button>
                <el-button class="plr-28 ptb-10" type="primary" @click="confirm_event">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import request from '@/utils/request';
import { isEmpty } from 'lodash';

const props = defineProps({
    type: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    config: {
        type: Object as PropType<any>,
        default: () => {},
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    dialogPositionTop: {
        type: Number,
        default: 0,
    },
});
const dialogVisible = defineModel('dialogVisible', { type: Boolean, default: false });
//#region 数据传递
const select_data = ref([]);
const table_select = (val: any) => {
    select_data.value = val;
};
const emit = defineEmits(['confirm_event']);
const close_event = () => {
    dialogVisible.value = false;
};
const confirm_event = () => {
    dialogVisible.value = false;
    emit('confirm_event', select_data.value);
};
//#endregion
//#region 初始化数据
// 数据处理
const default_data = ref({});
const pagination_data = ref({
    page: 1,
    page_size: 10,
    data_total: 0,
});
// 初始化数据显示
watchEffect(() => {
    if (!isEmpty(props.config) && dialogVisible.value) {
        // 处理数据
        const staging_data : any = {};
        pagination_data.value = {
            page: 1,
            page_size: props.config?.page_size || 10,
            data_total: 0,
        }
        // 将数据赋值给默认数据
        // 根据不同的类型，初始化不同的数据, 并将对象处理成对应的值
        props.config.filter_form_config.forEach((item: any) => {
            let value : number | string | Array<any> = '';
            if (item.type == 'checkbox' || item.type == 'select' && item.config.is_multiple == '1') { // 多选
                value = item.config.default ? item.config.default : [];
            } else if (item.type == 'input' && item.config.type == 'number') { // 数字
                value = item.config.default ? item.config.default : 0;
            } else if (item.type == 'switch') {
                value = item.config.default ? item.config.default : "0";
            }
            staging_data[item.form_name] = value;
        })
        // 循环完之后赋值，避免多次赋值，传递给子组件出现多次调用和回调问题
        default_data.value = staging_data;
    }
});
// 子组件数据变更传递过来的数据
const filter_form_change = (val: any) => {
    default_data.value = val;
    // 更换数据之后，需要从第一页开始请求
    pagination_data.value.page = 1;
};
//#endregion
//region 表格数据更新操作
const get_list = (new_page: number) => {
    pagination_data.value.page = new_page;
    get_table_list(default_data.value);
}
const tableData = ref([]);
const loading = ref(false);
const get_table_list = (val: any) => {
    tableData.value = [];
    // 判断是否有数据和配置和请求地址
    if (!isEmpty(val) && !isEmpty(props.config) && !isEmpty(props.config.data_url)) {
        // 发送请求，获取数据
        const data = {
            ...val,
            page: pagination_data.value.page,
            page_size: pagination_data.value.page_size,
        }
        loading.value = true;
        request({
            url: props.config.data_url, // 请求地址
            method: 'post', // 请求方式
            data    // 请求数据
        }).then((res) => {
            if (res.data) {
                tableData.value = res.data.data_list;
                pagination_data.value.data_total = res.data.data_total;
            }
        }).finally(() => {
            loading.value = false;
        });
    }
}
watch(() => default_data.value, (val) => {
    get_table_list(val);
}, { deep: true })
//#endregion
</script>

<style lang="scss" scoped>

</style>