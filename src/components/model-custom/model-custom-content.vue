<template>
    <div class="auxiliary-line">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-20">数据源</div>
                <el-form-item label="动态数据">
                    <el-select v-model="form.data_source" value-key="id" placeholder="请选择数据源" filterable clearable @change="changeDataSource">
                        <el-option v-for="item in options" :key="item.type" :label="item.name" :value="item.type" />
                    </el-select>
                </el-form-item>
            </card-container>
            <!-- 筛选数据 -->
            <template v-if="!isEmpty(default_type_data)">
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">显示设置</div>
                    <el-form-item label="铺满方式">
                        <el-radio-group v-model="form.data_source_direction">
                            <el-radio v-for="(item, index) in default_type_data.show_type" :key="index" :value="item">{{ item == 'vertical' ? '纵向展示' : item == 'vertical-scroll' ? '纵向滑动' : '横向滑动' }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="['vertical-scroll', 'horizontal'].includes(form.data_source_direction)" label="每屏显示">
                        <el-radio-group v-model="form.data_source_carousel_col">
                            <el-radio v-for="(item, index) in default_type_data.show_number" :key="index" :value="item">{{ item }}{{ form.data_source_direction == 'vertical-scroll' ? '行' : '列' }}展示</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </card-container>
                <template v-if="!isEmpty(default_type_data.data_type)">
                    <div class="divider-line"></div>
                    <card-container>
                        <div class="mb-12">数据设置</div>
                        <div class="flex-col">
                            <el-form-item label="读取方式">
                                <el-radio-group v-model="form.data_source_content.data_type">
                                    <el-radio v-for="(item, index) in default_type_data.data_type" :key="index" :value="item">{{ item == 'appoint' ? '指定数据' : '筛选数据' }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <template v-if="form.data_source_content.data_type == 'appoint'">
                                <div class="nav-list">
                                    <drag-group :list="form.data_source_content.data_list" :img-params="default_type_data?.appoint_config?.show_data?.data_logo || ''" :title-params="default_type_data?.appoint_config?.show_data?.data_name || 'name'" type="custom" @onsort="data_list_sort" @remove="data_list_remove" @replace="data_list_replace"></drag-group>
                                    <el-button class="mt-20 w" @click="add">+添加</el-button>
                                </div>
                            </template>
                            <template v-else>
                                <filter-form :filter-data="default_type_data.filter_config.filter_form_config" direction="vertical" :title-width="70" :data-interface="form.data_source_content" @form-change="filter_form_change"></filter-form>
                            </template>
                        </div>
                    </card-container>
                </template>
            </template>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-20">内容设置</div>
                <el-button class="w" size="large" @click="custom_edit"><icon name="edit" size="12"></icon>自定义编辑</el-button>
            </card-container>
        </el-form>
        <Dialog ref="dialog" @accomplish="accomplish">
            <div class="flex-row h w">
                <!-- 左侧和中间区域 -->
                <DragIndex ref="draglist" :key="dragkey" v-model:height="center_height" v-model:width="custom_width" :source-list="!isEmpty(data_source_content_list) ? data_source_content_list[0] : {}" :source-type="form?.data_source || ''" :list="custom_list" @right-update="right_update"></DragIndex>
                <!-- 右侧配置区域 -->
                <div class="settings">
                    <template v-if="diy_data.key === 'img'">
                        <model-image-style :key="key" v-model:height="center_height" :options="model_data_source" :value="diy_data"></model-image-style>
                    </template>
                    <template v-else-if="diy_data.key == 'text'">
                        <model-text-style :key="key" v-model:height="center_height" :options="model_data_source" :value="diy_data"></model-text-style>
                    </template>
                    <template v-else-if="diy_data.key == 'auxiliary-line'">
                        <model-lines-style :key="key" v-model:height="center_height" :value="diy_data"></model-lines-style>
                    </template>
                    <template v-else-if="diy_data.key == 'icon'">
                        <model-icon-style :key="key" v-model:height="center_height" :options="model_data_source" :value="diy_data"></model-icon-style>
                    </template>
                    <template v-else-if="diy_data.key == 'panel'">
                        <model-panel-style :key="key" v-model:height="center_height" :value="diy_data"></model-panel-style>
                    </template>
                    <template v-else>
                        <div class="w h flex align-c bg-f">
                            <no-data></no-data>
                        </div>
                    </template>
                </div>
            </div>
        </Dialog>
        <custom-dialog v-model:dialog-visible="url_value_dialog_visible" :config="default_type_data.appoint_config" :multiple="url_value_multiple_bool" @confirm_event="url_value_dialog_call_back"></custom-dialog>
    </div>
</template>
<script setup lang="ts">
import Dialog from './components/dialog.vue';
import DragIndex from './components/index.vue';
import { isEmpty, cloneDeep, omit } from 'lodash';
import request from '@/utils/request';
import CustomAPI from '@/api/custom';
import { DataSourceStore } from '@/store';
import { get_math } from '@/utils';
const data_source_store = DataSourceStore();

const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    magicWidth: {
        type: Number,
        default: 390,
    }
});

const dialog = ref<expose | null>(null);
const draglist = ref<diy_data | null>(null);
const form = ref(props.value);
const center_width = ref(props.magicWidth);

const custom_width = computed(() => {
    // 如果是横向展示，那么就需要根据每屏显示的数量来计算宽度 data_source_direction == horizontal 为横向滑动
    if (form.value.is_custom_data == '1' && form.value.data_source_direction == 'horizontal') {
        return center_width.value / form.value.data_source_carousel_col;
    } else {
        return center_width.value;
    }
})
// 弹出框里的内容
let custom_list = reactive([]);
const center_height = ref(0);
interface custom_config {
    show_type: string[],
    show_number: number[],
    data_type: string[],
    filter_config: object,
    appoint_config: object,
}
interface data_list {
    name: string;
    field: string;
    type: string;
}
interface options_item {
    custom_config?: custom_config;
    appoint_data?: object;
    name: string;
    data: data_list[];
    type: string;
}
const options = ref<options_item[]>([]);
//#region 初始化数据处理
const getCustominit = () => {
    CustomAPI.getCustominit().then((res) => {
        const { data_source } = res.data;
        options.value = data_source;
        data_source_store.set_data_source(data_source);
        // 数据处理
        processing_data(form.value.data_source);
        data_processing();
    });
};

onBeforeMount(() => {
    if (!data_source_store.is_data_source_api) {
        data_source_store.set_is_data_source_api(true);
        getCustominit();
    } else {
        options.value = data_source_store.data_source_list;
        // 如果历史的值出现，根据历史选中的值处理一下传递的数据结构
        processing_data(form.value.data_source);
        data_processing();
    }
});
// 回显数据处理
const data_processing = () => {
    // 如果有历史的值，那么就需要根据历史的值来处理一下数据
    const type_data = options.value.filter((item) => item.type == form.value.data_source);
    if (type_data.length > 0 && !isEmpty(type_data[0].custom_config)) {
        default_type_data.value = type_data[0].custom_config;
    }
};
// 处理显示的图片和传递到下去的数据结构
const model_data_source = ref<data_list[]>([]);
const processing_data = (key: string) => {
    const list = options.value.filter((item) => item.type == key);
    if (list.length > 0) {
        model_data_source.value = list[0].data;
    } else {
        model_data_source.value = [];
    }
};
//#endregion
//#region 自定义编辑的内部处理逻辑
const diy_data = ref<diy>({
    key: '',
    location: {
        x: 0,
        y: 0,
        record_x: 0,
        record_y: 0,
        staging_y: 0,
    },
    com_data: {},
});
const key = ref('');
const dragkey = ref('');

const right_update = (item: any) => {
    diy_data.value = item;
    // 生成随机id
    key.value = Math.random().toString(36).substring(2);
};
// 自定义编辑的逻辑
const custom_edit = () => {
    if (!dialog.value) return;
    dialog.value.dialogVisible = true;
    dragkey.value = Math.random().toString(36).substring(2);
    custom_list = cloneDeep(form.value.custom_list);
    center_height.value = cloneDeep(form.value.height);
};
// 点击完成的处理逻辑
const accomplish = () => {
    if (!draglist.value) {
        return;
    } else {
        form.value.custom_list = draglist.value.diy_data;
    }
    form.value.height = center_height.value;
};
//#endregion
//#region 数据源更新逻辑处理
// 打开弹出框
const url_value_dialog_visible = ref(false);
const default_type_data = ref<any>({})
const url_value_multiple_bool = ref(true);
const changeDataSource = (key: string) => {
    form.value.is_custom_data = '0';
    const type_data = options.value.filter((item) => item.type == key);
    processing_data(key);
    // 默认数据类型
    form.value.data_source_content = {
        // 存放手动输入的id
        data_ids: [],
        data_list: [],
        // 自动
        data_auto_list: [],
    }
    // 默认数据， 避免不选报错
    default_type_data.value = {};
    form.value.data_source_direction = 'vertical';
    // 如果存在默认数据类型的时候，就直接赋值给data_list
    if (type_data.length > 0 && !isEmpty(type_data[0].appoint_data)) {
        form.value.data_source_content.data_list = [ type_data[0].appoint_data ];
    } else if (type_data.length > 0 && !isEmpty(type_data[0].custom_config)) {
        // 是自定义数据类型
        form.value.is_custom_data = '1';
        // 自定义数据取值
        const custom_config = type_data[0].custom_config;
        // 默认赋值第一个
        form.value.data_source_direction = custom_config.show_type[0];
        // 处理数据
        const staging_data : any = {
            // 存放手动输入的id
            data_ids: [],
            // 手动输入
            data_list: [],
            // 自动
            data_auto_list: [],
            // 类型
            data_type: custom_config.data_type[0],
        };
        // 将数据赋值给默认数据
        default_type_data.value = custom_config;
        // 如果不存在的时候，默认取id
        form.value.data_list_key = default_type_data.value?.appoint_config?.show_data?.data_key || 'id';
        // 根据不同的类型，初始化不同的数据, 并将对象处理成对应的值
        default_type_data.value.filter_config.filter_form_config.forEach((item: any) => {
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
        form.value.data_source_content = staging_data;
    }
};
const filter_form_change = (val: any) => {
    form.value.data_source_content = val;
}
//#endregion
//#region 数据源内容多选处理
const data_list_replace_index = ref(0);
const data_list_replace = (index: number) => {
    // 替换的时候，index为选择的索引
    data_list_replace_index.value = index;
    // 替换的时候，是单选
    url_value_multiple_bool.value = false;
    url_value_dialog_visible.value = true;
};
const add = () => {
    // 添加的时候，index为-1
    data_list_replace_index.value = -1;
    // 添加是单选还是多选由后台配置决定
    url_value_multiple_bool.value = default_type_data.value.appoint_config.is_multiple.toString() == '1' ? true : false;
    url_value_dialog_visible.value = true;
};
// 拖拽更新之后，更新数据
const data_list_sort = (new_list: any) => {
    form.value.data_source_content.data_list = new_list;
};
const data_list_remove = (index: number) => {
    form.value.data_source_content.data_list.splice(index, 1);
};
// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
    if (form.value.data_source == 'brand') {
        item.forEach((item: any) => {
            item.title = item.name;
        });
    }
    // 如果是单选，当时data_list_replace_index 为-1，说明是添加，否则是替换
    if (url_value_multiple_bool.value || data_list_replace_index.value == -1) {
        item.forEach((item: any) => {
            form.value.data_source_content.data_list.push({
                id: get_math(),
                new_cover: [],
                new_title: '',
                data: item,
            });
        });
    } else {
        form.value.data_source_content.data_list[data_list_replace_index.value] = {
            id: get_math(),
            new_cover: [],
            new_title: '',
            data: item[0],
        };
    }
};
// 数据来源的内容
let data_source_content_list = computed(() => {
    if (form.value.is_custom_data == '1') {
        if (form.value.data_source_content.data_type == 'appoint') {
            return form.value.data_source_content.data_list;
        } else {
            return form.value.data_source_content.data_auto_list;
        }
    } else {
        return form.value.data_source_content.data_list;
    }
})
// 获取商品自动数据
const get_auto_data = () => {
    //  清空数据, 避免接口报错等显示的还是老数据
    form.value.data_source_content.data_auto_list = [];
    if (!isEmpty(default_type_data.value) && !isEmpty(default_type_data.value.filter_config) && !isEmpty(default_type_data.value.filter_config.data_url)) {
        const data = omit(cloneDeep(form.value.data_source_content), ['data_ids', 'data_list', 'data_auto_list', 'data_type']);
        request({
            url: default_type_data.value.filter_config.data_url, // 请求地址
            method: 'post', // 请求方式
            data    // 请求数据
        }).then((res) => {
            if (res.data) {
                form.value.data_source_content.data_auto_list = res.data;
            }
        })
    }
};
// 将不需要监听的数据移除，只监听需要监听的数据
const data_source_content_value = computed(() => {
    // 从对象中移除不需要监听的 'data_ids', 'data_list', 'data_auto_list'三个值
    const data: any = {};
    for (const key in form.value.data_source_content) {
        if (!['data_ids', 'data_list', 'data_auto_list'].includes(key)) {
            data[key] = form.value.data_source_content[key];
        }
    }
    return data;
})
// 数据发生变化时，调用接口获取数据
watch(() => data_source_content_value.value, (new_val, old_val) => {
    // 数据发生变化时，如果是自动获取数据，则调用接口获取数据
    if (JSON.stringify(new_val) != JSON.stringify(old_val) && new_val.data_type != 'appoint') {
        get_auto_data();
    }
},{ deep: true });
//#endregion
</script>
<style lang="scss" scoped>
.settings {
    width: 46rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
}
@media screen and (max-width: 1560px) {
    .settings {
        width: 40rem;
    }
}
:deep(.el-dialog) {
    margin-top: 0;
    padding: 0;
    overflow: hidden;
    .el-dialog__header {
        padding: 2.3rem 2rem;
        .el-dialog__title {
            font-size: 16px;
        }
        .el-dialog__headerbtn {
            font-size: 2.4rem;
            padding: 2rem;
            height: auto;
            width: auto;
        }
    }
    .el-dialog__body {
        background: #f5f5f5;
        height: calc(100% - 15rem);
    }
    .el-dialog__footer {
        padding: 2.4rem 3rem;
    }
}
.replace-data {
    height: 2.4rem;
    bottom: 0.5rem;
    left: 2.1rem;
    line-height: 2.2rem;
    border-radius: 2rem;
    border: 1px solid #ddd;
    cursor: pointer;
}
</style>
