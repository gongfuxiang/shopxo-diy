<template>
    <el-dialog v-model="dialogVisible" class="radius-lg" width="1168" draggable append-to-body :close-on-click-modal="false" :top="dialogPositionTop ? dialogPositionTop + 'px' : ''" @close="close_event">
        <template #header>
            <div class="title center re">
                <div class="tc size-16 fw">{{ config?.popup_title || '数据选择' }}</div>
            </div>
        </template>
        <div class="flex-col gap-20 w h pa-20 oh">
            <filter-form v-if="dialogVisible && !isEmpty(config?.filter_form_config)" :filter-data="config.filter_form_config" direction="horizontal" :data-interface="default_data" @form-change="filter_form_change"></filter-form>
            <!-- 表格头部如果传输了数据，就渲染表格, 否则就不渲染 -->
            <template v-if="!isEmpty(config?.header)">
                <table-config v-loading="loading" :table-data="tableData" :multiple="multiple" :table-column-list="config.header" :table-row-class-list="tableRowClassList" @select="table_select"></table-config>
                <div class="flex-row jc-e">
                    <el-pagination :current-page="pagination_data.page" background :page-size="pagination_data.page_size" :pager-count="5" layout="prev, pager, next" :total="pagination_data.data_total" @current-change="get_list" />
                </div>
            </template>
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
    dataListKey: {
        type: String,
        default: () => '',
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
const tableRowClassList = ref<number[]>([]);
const table_select = (val: any) => {
    // 用户选中操作之后，更新报错的数据，历史报错的如果没有勾选就不报错
    if (val.length > 0) {
        const contain_list: number[] = [];
        val.forEach((item: any) => {
            if (tableRowClassList.value.includes(item.data_index)) {
                contain_list.push(item.data_index);
            }
        });
        tableRowClassList.value = contain_list;
    } else {
        tableRowClassList.value = [];
    }
    select_data.value = val;
};
const emit = defineEmits(['confirm_event']);
const close_event = () => {
    dialogVisible.value = false;
};
const confirm_event = () => {
    if (init_data()) {
        // 传递数据
        dialogVisible.value = false;
        emit('confirm_event', select_data.value);
    }
    
};
const init_data = () => {
    if (select_data.value.length > 0) {
        // 获取所有的选中数据的长度
        const all_length = select_data.value.length;
        // 将没有data_key的值取出来
        const list = select_data.value.filter((item: any) => item[props.dataListKey] == null );
        if (list.length == 0) {
           return true;
        } else {
            if (list.length == all_length) {
                // 从中需要显示取出报错的内容
                tableRowClassList.value = select_data.value.map((item: any) => item.data_index);
                ElMessage.error(`没有${props.dataListKey}对应的数据`);
            } else {
                // 从中需要显示取出报错的内容
                tableRowClassList.value = list.map((item: any) => item.data_index);
                ElMessage.error(`${list.length}个数据没有${props.dataListKey}对应`);
            }
            return false;
        }
    } else {
        return true;
    }
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
            page_size: props?.config?.page_size || undefined,
            data_total: 0,
        }
        const filter_form_config = props?.config?.filter_form_config || [];
        // 将数据赋值给默认数据
        if (filter_form_config.length > 0) {
             // 根据不同的类型，初始化不同的数据, 并将对象处理成对应的值
             filter_form_config.forEach((item: any) => {
                let value : number | string | Array<any> = '';
                if (item.type == 'checkbox' || item.type == 'select' && +item?.config?.is_multiple == 1) { // 多选
                    value = item?.config?.default ?? [];
                } else if ((item.type == 'input' && item?.config?.type == 'number') || item.type == 'switch') { // 数字/开关
                    value = Number(item?.config?.default ?? 0);
                } else { // 其他
                    value = item?.config?.default ?? '';
                }
                staging_data[item.form_name] = value;
            })
        }
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
    if (!isEmpty(props.config) && !isEmpty(props.config.data_url)) {
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
            loading.value = false;
            if (res.data) {
                // 列表数据改变时，清空报错的内容
                tableRowClassList.value = [];
                tableData.value = res.data.data_list;
                pagination_data.value.data_total = res.data.data_total;
            }
        }).catch((error) => {
            // 接口取消的时候，不处理loading
            if (error != 'canceled') {
                loading.value = false;
            }
        })
    }
}
watch(() => default_data.value, (val) => {
    get_table_list(val);
}, { deep: true })
//#endregion
</script>

<style lang="scss" scoped>

</style>