<template>
    <div class="auxiliary-line custom-data">
        <el-form :model="form" label-width="70">
            <template v-if="!isSubcomponent">
                <common-content-top :value="form.content_top"></common-content-top>
                <div class="divider-line data-tabs-line"></div>
            </template>
            <card-container class="card-container">
                <div class="mb-20">数据源</div>
                <el-form-item label="动态数据">
                    <el-select v-model="form.data_source" value-key="id" placeholder="请选择数据源" filterable clearable @change="changeDataSource">
                        <el-option v-for="item in options" :key="item.type" :label="item.name" :value="item.type" />
                    </el-select>
                </el-form-item>
                <template v-if="!isEmpty(form.data_source)">
                    <el-form-item label="数据循环">
                        <div class="flex-row gap-10">
                            <el-radio-group v-model="form.data_source_is_loop">
                                <el-radio value="1">是</el-radio>
                                <el-radio value="0">否</el-radio>
                            </el-radio-group>
                            <tooltip content="1.是的情况下，第一层自定义自动循环动态数据，编组可以使用循环项数据或其中的列表数据。<br/>2.否的情况下，第一层自定义不能使用当前动态数据，只能在编组里面选择使用。"></tooltip>
                        </div>
                    </el-form-item>
                </template>
            </card-container>
            <!-- 筛选数据 -->
            <template v-if="!isEmpty(default_type_data)">
                <template v-if="default_type_data?.show_type.length > 0 && form.data_source_is_loop == '1'">
                    <div class="divider-line data-tabs-line"></div>
                    <card-container class="card-container">
                        <div class="mb-12">显示设置</div>
                        <el-form-item label="铺满方式">
                            <el-radio-group v-model="form.data_source_direction">
                                <el-radio v-for="(item, index) in default_type_data?.show_type" :key="index" :value="item">{{ item == 'vertical' ? '纵向展示' : item == 'vertical-scroll' ? '纵向滑动' : '横向滑动' }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <template v-if="default_type_data?.show_number.length > 0">
                            <el-form-item label="每屏显示">
                                <el-radio-group v-model="form.data_source_carousel_col">
                                    <el-radio v-for="(item, index) in default_type_data?.show_number" :key="index" :value="item">{{ item }}{{ form.data_source_direction == 'vertical-scroll' ? '行' : '列' }}展示</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </template>
                    </card-container>
                </template>
                <template v-if="default_type_data.data_type.length > 0">
                    <div class="divider-line data-tabs-line"></div>
                    <card-container class="card-container">
                        <div class="mb-12">数据设置</div>
                        <div class="flex-col">
                            <!-- 筛选数据只有一条的时候，并且显示为true的时候才显示，否则的话不显示数据 -->
                            <el-form-item v-if="(default_type_data.data_type.length == 1 && default_type_data.is_type_show) || default_type_data.data_type.length > 1" label="读取方式">
                                <el-radio-group v-model="form.data_source_content.data_type">
                                    <el-radio v-for="(item, index) in default_type_data.data_type" :key="index" :value="item">{{ +item === 0 ? '指定数据' : '筛选数据' }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <template v-if="Number(form.data_source_content.data_type) === 0">
                                <div class="nav-list flex-col gap-20">
                                    <filter-form v-if="!isEmpty(default_type_data?.appoint_config?.filter_form_config || {})" :filter-data="default_type_data?.appoint_config?.filter_form_config || {}" direction="vertical" :title-width="58" :data-interface="form.data_source_content" @form-change="filter_form_change"></filter-form>
                                    <drag-group v-if="!isEmpty(form.data_source_content.data_list)" :list="form.data_source_content.data_list" :img-params="form.show_data?.data_logo || ''" :title-params="form.show_data?.data_name || 'name'" type="custom" @onsort="data_list_sort" @remove="data_list_remove" @replace="data_list_replace"></drag-group>
                                    <el-button class="w" @click="add">+添加</el-button>
                                </div>
                            </template>
                            <template v-else>
                                <filter-form :filter-data="default_type_data?.filter_config?.filter_form_config || {}" direction="vertical" :title-width="58" :data-interface="form.data_source_content" @form-change="filter_form_change"></filter-form>
                            </template>
                        </div>
                    </card-container>
                </template>
            </template>
            <div class="divider-line data-tabs-line"></div>
            <el-button class="w custom-button size-14" size="large" @click="custom_edit('custom')"><icon name="edit" size="14"></icon>自定义编辑</el-button>
        </el-form>
        <!-- 自定义内容处理 -->
        <custom-config :key="dragkey + 'custom'" v-model:visible="dialogVisible" v-model:width="custom_width" v-model:height="center_height" :config-loop="form.data_source_is_loop" :dragkey="dragkey + 'custom'" :options="model_data_source" :source-list="!isEmpty(data_source_content_list) ? data_source_content_list[0] : {}" :group-source-list="data_source_content_list" :is-custom="form.is_custom_data == '1'" :show-data="form?.show_data || { data_key: 'id', data_name: 'name' }" :custom-list="custom_list" @accomplish="accomplish" @custom_edit="custom_edit"></custom-config>
        <!-- 自定义内部数据内容处理 -->
        <custom-config :key="drag_group_key + 'custom-group'" v-model:visible="dialogVisible_group" v-model:width="center_group_width" v-model:height="center_group_height" v-model:father-list="custom_group_father_list" config-type="custom-group" config-loop="1" :dragkey="drag_group_key + 'custom-group'" :options="custom_group_option_list" :source-list="!isEmpty(new_group_source_list) ? new_group_source_list : {}" :group-source-list="data_source_content_list" :is-custom="form.is_custom_data == '1'" :is-custom-group="true" :show-data="form?.show_data || { data_key: 'id', data_name: 'name' }" :custom-id="center_group_id" :custom-list="custom_group_list" :custom-group-field-id="custom_group_field_id" @accomplish="accomplish"></custom-config>
        <!-- 手动筛选数据弹出框 -->
        <custom-dialog v-model:dialog-visible="url_value_dialog_visible" :data-list-key="form.show_data?.data_key || 'id'" :config="default_type_data.appoint_config" :extra-search-data="form.data_source_content" :multiple="url_value_multiple_bool" @confirm_event="url_value_dialog_call_back"></custom-dialog>
    </div>
</template>
<script setup lang="ts">
import { isEmpty, cloneDeep, pick } from 'lodash';
import request from '@/utils/request';
import CustomAPI from '@/api/custom';
import { DataSourceStore } from '@/store';
import { get_math, get_nested_property, interface_field_processing } from '@/utils';
const data_source_store = DataSourceStore();

const props = defineProps({
    configType: {
        type: String,
        default: 'custom',
    },
    value: {
        type: Object,
        default: () => {},
    },
    magicWidth: {
        type: Number,
        default: 390,
    },
    isSubcomponent: {
        type: Boolean,
        default: false,
    }
});
// 容器宽度
const center_width = ref(props.magicWidth);
// 可拖拽区域的宽度
const custom_width = computed(() => {
    // 如果是横向展示，那么就需要根据每屏显示的数量来计算宽度 data_source_direction != vertical-scroll 不为纵向滑动的都是横向宽度变化
    if (form.value.is_custom_data == '1' && form.value.data_source_direction != 'vertical-scroll') {
        return center_width.value / form.value.data_source_carousel_col;
    } else {
        return center_width.value;
    }
})
const form = ref(props.value);
// 外层的内容
// 外层自定义的弹出框
const dragkey = ref('');
const dialogVisible = ref(false);
const custom_list = ref([]);
const center_height = ref(0);
// 自定义组的内容
// 自定义组的弹出框
const dialogVisible_group = ref(false);
 // 自定义组数据
const custom_group_list = ref([]);
// 自定义组的默认宽高
const center_group_height = ref(0);
const center_group_width = ref(0);
// 自定义组的id
const center_group_id = ref('');
// 自定义组的父级数据
const custom_group_father_list = ref([]);
// 自定义组的弹出框的key值
const drag_group_key = ref('');
// 数据源id
const custom_group_field_id = ref('');
// 获取到真实数据和选项值
const custom_group_option_list = ref<any[]>([]);
const new_group_source_list = ref({});
// 自定义编辑的逻辑
const custom_edit = (type: string, id?: string, father_list?: any, list?: any, width?: number, height?: number, data_source_field?: { id: string, option: []}, is_use_parent_data?: string) => {
    // 如果是自定义点击编辑
    if (type == 'custom') {
        dragkey.value = Math.random().toString(36).substring(2);
        dialogVisible.value = true;
        // 主自定义的数据
        custom_list.value = cloneDeep(form.value.custom_list);
        // 主自定义的高度
        center_height.value = cloneDeep(form.value.height);
        // 设置是否是子页面
        data_source_store.set_is_children_custom(false);
    } else {
        // 自定义组的弹出框显示
        drag_group_key.value = Math.random().toString(36).substring(2);
        // 自定义组的弹出框
        dialogVisible_group.value = true;
        // 自定义组数据
        custom_group_list.value = list;
        // 自定义组的父级数据，因为父级没有点击完成数据不会记录，所以需要子级点击完成的时候传递过来
        custom_group_father_list.value = father_list;
        // 自定义组的id，避免多个组的赋值失败
        center_group_id.value = id || '';
        // 自定义组的默认宽高
        center_group_width.value = width || 0;
        center_group_height.value = height || 0;
        // 获取到真实数据和选项值
        custom_group_field_id.value = data_source_field?.id || '';
        // 自定义组的数据源内容切换, 如果选择了自定义数据源，那么就获取到自定义数据源的内容，否则的话取当前整个自定义组的数据源
        const is_data_source_id = model_data_source.value.filter((item: any) => item.field == data_source_field?.id);
        if (form.value.data_source_is_loop == '1') {
            if (is_data_source_id.length > 0) {
                custom_group_option_list.value = data_source_field?.option || [];
                new_group_source_list.value = new_group_source_list_handle(data_source_field?.id || '');
            } else {
                custom_group_option_list.value = model_data_source.value;
                new_group_source_list.value = !isEmpty(data_source_content_list) ? data_source_content_list.value[0] : {};
            }
        } else {
            // 是否使用父级数据
            if (is_use_parent_data == '1') {
                custom_group_option_list.value = model_data_source.value;
                new_group_source_list.value = !isEmpty(data_source_content_list) ? data_source_content_list.value[0] : {};
            } else {
                custom_group_option_list.value = [];
                new_group_source_list.value = {};
            }
        }
        // 设置是否是子页面
        data_source_store.set_is_children_custom(true);
    }
};
// 处理获取自定义组内的真实数据
const new_group_source_list_handle = (data_source_id: string) => {
    const source_list = !isEmpty(data_source_content_list.value) ? data_source_content_list.value[0] : {};
    if (!isEmpty(source_list)) {
        let list = get_nested_property(source_list, data_source_id);
        // 如果是自定义标题，进一步处理嵌套对象中的数据
        if (source_list.data) {
            list = get_nested_property(source_list.data, data_source_id);
        }
        return list.length > 0 ? list[0] : {};
    } else {
        return {};
    }
}
// 点击完成的处理逻辑
const accomplish = (type: string, list: any) => {
    // 点击完成，证明弹出框结束了，不管是子页面结束还是主页面结束，都是非子页面
    data_source_store.set_is_children_custom(false);
    // 如果是自定义点击完成，就更新主数据
    if (type == 'custom') {
        form.value.custom_list = list;
        form.value.height = center_height.value;
    } else {
        // 自定义组点击完成，更新自定义内的数据
        custom_list.value = list;
    }
};
//#endregion
// 弹出框里的内容
interface custom_config {
    show_type: string[],
    show_number: number[],
    data_type: string[],
    is_type_show: boolean,
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
        // 接口成功之后设置true
        data_source_store.set_is_data_source_api(true);
        // 数据处理
        processing_data(form.value.data_source);
        data_processing();
    }).catch((err) => {
        // 接口成功之后设置为false，下次仍旧获取数据
        data_source_store.set_is_data_source_api(false);
    });
};

onBeforeMount(() => {
    // 如果没有数据源，那么就请求一次接口, 获取数据源
    if (!data_source_store.is_data_source_api) {
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
        // 是自定义数据类型
        form.value.is_custom_data = '1';
        const custom_config = type_data[0].custom_config;
        // 将数据赋值给默认数据，不存在时需要显示全部
        default_type_data.value = {
            ...custom_config,
            show_type: custom_config?.show_type || ['vertical', 'vertical-scroll', 'horizontal'],
            show_number: custom_config?.show_number || [1, 2, 3, 4],
            data_type: custom_config?.data_type || [0, 1],
            is_type_show: custom_config?.is_type_show || true,
        };
        filter_data_handling('old');
        default_data();
    }
};
// 默认数据处理
const default_data = () => {
    const { show_type = [], show_number = [], data_type = []} = default_type_data.value;
    const { data_source_direction, data_source_carousel_col, data_source_content} = form.value;
    // 如果存在默认数据类型的时候, 并且跟当前的不一致时，默认选中第一个
    if (!isEmpty(show_type)) {
        if (!show_type.includes(data_source_direction)) {
            form.value.data_source_direction = show_type[0];
        }
    } else {
        // show_type 是空数组时，设置为默认值
        form.value.data_source_direction = 'vertical';
    }
    // 如果存在默认数据类型的时候, 并且跟当前的不一致时，默认选中第一个
    if (!isEmpty(show_number)) {
        if (!show_number.includes(data_source_carousel_col)) {
            form.value.data_source_carousel_col = show_number[0];
        }
    } else {
        // 如果show_number 是空数组时，设置为默认值
        form.value.data_source_carousel_col = 1;
    }
    // 如果存在默认数据类型的时候, 并且跟当前的不一致时，默认选中第一个
    if (!isEmpty(data_type)) {
        if (isEmpty(data_source_content.data_type) && !data_type.includes(Number(data_source_content.data_type))) {
            form.value.data_source_content.data_type = data_type[0];
        }
    } else if (!isEmpty(data_source_content.data_type) && typeof data_source_content.data_type == 'string') { // 老数据使用的是字符串类型，需要转换一下
        form.value.data_source_content.data_type = Number(form.value.data_source_content.data_type);
    } else {
        // data_type 是空数组时，设置为默认值
        form.value.data_source_content.data_type = 0;
    }
    // 如果不存在的时候，默认取id
    form.value.show_data = default_type_data.value?.appoint_config?.show_data || { data_key: 'id', data_name: 'name' };
}
// data_source_content 中的数据处理，历史数据有可能不存在当前的某些字段，所以每次都会进行判断，需要处理一下数据 type old 代表历史数据， new 新数据
const filter_data_handling = (type: string = 'old') => {
    // 处理之后的读取方式
    const data_type = default_type_data.value.data_type.length > 0 ? default_type_data.value.data_type[0] : 0;
    // 处理数据
    const staging_data : any = {
        // 存放手动输入的id
        data_ids: type == 'old' ? form.value.data_source_content?.data_ids ?? [] : [],
        // 手动输入
        data_list: type == 'old' ? form.value.data_source_content?.data_list ?? [] : [],
        // 自动
        data_auto_list: type == 'old' ? form.value.data_source_content?.data_auto_list ?? [] : [],
        // 类型 历史的如果不存在，就使用第一个，否则的话，使用第一个
        data_type: type == 'old'? (form.value.data_source_content?.data_type ?? data_type) : data_type,
    };
    let new_data_field = {};
    // 根据不同的数据初始化不同的内容, 两个处理看似一样，实际上是后边的覆盖前面的内容，避免老数据没有更新
    if (staging_data.data_type === 0) {
        // 如果是手动模式，就取手动模式的数据为默认数据，避免两者重复导致数据冲突
        new_data_field = {
            ...interface_field_processing(default_type_data.value?.filter_config?.filter_form_config, type, form.value?.data_source_content || {}),
            ...interface_field_processing(default_type_data.value?.appoint_config?.filter_form_config, type, form.value?.data_source_content || {}),
        }
    } else {
        // 如果是自动模式，就取自动模式的数据为默认数据，避免两者重复导致数据冲突
        new_data_field = {
            ...interface_field_processing(default_type_data.value?.appoint_config?.filter_form_config, type, form.value?.data_source_content || {}),
            ...interface_field_processing(default_type_data.value?.filter_config?.filter_form_config, type, form.value?.data_source_content || {}),
        }
    }
    // 循环完之后赋值，避免多次赋值，传递给子组件出现多次调用和回调问题
    form.value.data_source_content = {
        ...staging_data,
        ...new_data_field,
    };
};
// 处理显示的图片和传递到下去的数据结构
const model_data_source = ref<data_list[]>([]);
const processing_data = (key: string) => {
    const list = options.value.filter((item) => item.type == key);
    if (list.length > 0) {
        model_data_source.value = list[0].data;
        form.value.field_list = list[0].data;
    } else {
        model_data_source.value = [];
        form.value.field_list = [];
    }
};
// 将内容传递给子组件
provide('field_list', computed(() => form.value.field_list));
//#endregion
//#region 数据源更新逻辑处理
// 打开弹出框
const url_value_dialog_visible = ref(false);
const default_type_data = ref<any>({})
const url_value_multiple_bool = ref(true);
const emits = defineEmits(['data_source_change']);
// 动态数据切换时触发的逻辑
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
        emits('data_source_change', type_data[0].name);
        form.value.data_source_content.data_list = [ type_data[0].appoint_data ];
    } else if (type_data.length > 0 && !isEmpty(type_data[0].custom_config)) {
        emits('data_source_change', type_data[0].name);
        // 是自定义数据类型
        form.value.is_custom_data = '1';
        // 自定义数据取值
        const custom_config = type_data[0].custom_config
        // 将数据赋值给默认数据
        default_type_data.value = {
            ...custom_config,
            show_type: custom_config?.show_type || ['vertical', 'vertical-scroll', 'horizontal'],
            show_number: custom_config?.show_number || [1, 2, 3, 4],
            data_type: custom_config?.data_type || [0, 1],
            is_type_show: custom_config?.is_type_show || true,
        };
        // 默认数据处理
        default_data();
        // 筛选数据处理
        filter_data_handling('new');
    } else {
        emits('data_source_change', '')
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
// 新增数据
const add = () => {
    if (isEmpty(default_type_data.value) || isEmpty(default_type_data.value.appoint_config)) {
        ElMessage.error('请先配置数据源内容(appoint_config)');
    } else if (isEmpty(default_type_data.value.appoint_config.data_url)) {
        ElMessage.error('请先配置请求地址(data_url)');
    } else if (isEmpty(default_type_data.value.appoint_config.header)) {
        ElMessage.error('请先配置表格头(header)');
    } else {
        // 添加的时候，index为-1
        data_list_replace_index.value = -1;
        // 添加是单选还是多选由后台配置决定
        url_value_multiple_bool.value = +default_type_data.value.appoint_config?.is_multiple == 1 ? true : false;
        url_value_dialog_visible.value = true;
    }
};
// 拖拽更新之后，更新数据
const data_list_sort = (new_list: any) => {
    form.value.data_source_content.data_list = new_list;
    data_list_index_update();
};
const data_list_remove = (index: number) => {
    form.value.data_source_content.data_list.splice(index, 1);
    data_list_index_update();
};
// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
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
            new_cover: form.value.data_source_content.data_list[data_list_replace_index.value]?.new_cover || [],
            new_title: '',
            data: item[0],
        };
    }
    data_list_index_update();
};
// 更新索引, 避免添加多条时，索引不连续
const data_list_index_update = () => {
    if (form.value.data_source_content.data_list.length > 0) {
        form.value.data_source_content.data_list.forEach((item: any, index: number) => {
            item.data.data_index = index + 1;
        });
    }
};
// 数据来源的内容
const data_source_content_list = computed(() => {
    if (form.value.is_custom_data == '1') {
        if (Number(form.value.data_source_content.data_type) === 0) {
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
    if (isEmpty(default_type_data.value) || isEmpty(default_type_data.value.filter_config)) {
        ElMessage.error('请先配置数据源内容(filter_config)');
    } else if (isEmpty(default_type_data.value.filter_config.data_url)) {
        ElMessage.error('请先配置请求地址(data_url)');
    } else {
        // 取出自动模式所有的字段
        const filter_data = interface_field_processing(default_type_data.value?.filter_config?.filter_form_config, 'new', {}) || {};
        // 取出所有字段的key
        const filter_key = Object.keys(filter_data);
        // 取出对应key的数据
        const data = pick(cloneDeep(form.value.data_source_content), filter_key);
        request({
            url: default_type_data.value.filter_config.data_url, // 请求地址
            method: 'post', // 请求方式
            data    // 请求数据
        }).then((res) => {
            if (res.data) {
                form.value.data_source_content.data_auto_list = res.data;
            } else {
                //  清空数据, 避免接口报错等显示的还是老数据
                form.value.data_source_content.data_auto_list = [];
            }
        }).catch((err) => {
            //  清空数据, 避免接口报错等显示的还是老数据
            form.value.data_source_content.data_auto_list = [];
        });
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
    if (JSON.stringify(new_val) != JSON.stringify(old_val) && Number(new_val?.data_type || 0) !== 0) {
        get_auto_data();
    }
},{ deep: true });
//#endregion
</script>
<style lang="scss" scoped>
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
.custom-data {
    background: transparent;
}
.custom-button {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0; /* 固定在底部 */
  background-color: white; /* 设置背景色以避免按钮看不见 */
  z-index: 1000; /* 确保按钮在其他内容之上 */
  width: 100%; /* 确保按钮宽度占满父容器 */
  padding: 1rem; /* 添加一些内边距 */
}
</style>
