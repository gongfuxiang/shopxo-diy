<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <template v-if="!isNest">
                <common-content-top :value="form.content_top"></common-content-top>
                <div class="divider-line"></div>
            </template>
            <card-container class="card-container">
                <div class="mb-12">列表设置</div>
                <el-form-item label="动态数据">
                    <el-select v-model="form.data_source" value-key="id" placeholder="请选择数据源" filterable clearable @change="changeDataSource">
                        <el-option v-for="item in options" :key="item.type" :label="item.name" :value="item.type" />
                    </el-select>
                </el-form-item>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.theme" @change="change_style">
                        <el-radio v-for="item in base_list.product_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.theme == '5'" label="轮播列数">
                    <el-radio-group v-model="form.carousel_col">
                        <el-radio :value="1">单列展示</el-radio>
                        <el-radio :value="2">两列展示</el-radio>
                        <el-radio :value="3">三列展示</el-radio>
                        <el-radio :value="4">四列展示</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <template v-if="!isEmpty(default_type_data)">
                <template v-if="default_type_data.data_type.length > 0">
                    <div class="divider-line"></div>
                    <card-container class="card-container">
                        <div class="mb-12">商品设置</div>
                        <div class="flex-col">
                            <!-- 筛选数据只有一条的时候，并且显示为true的时候才显示，否则的话不显示数据 -->
                            <el-form-item v-if="(default_type_data.data_type.length == 1 && +default_type_data.is_type_show == 1) || default_type_data.data_type.length > 1" label="读取方式">
                                <el-radio-group v-model="form.data_source_content.data_type">
                                    <el-radio v-for="(item, index) in default_type_data.data_type" :key="index" :value="item">{{ +item === 0 ? '指定数据' : '筛选数据' }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <template v-if="Number(form.data_source_content.data_type) === 0">
                                <div class="nav-list flex-col gap-20">
                                    <filter-form v-if="!isEmpty(default_type_data?.appoint_config?.filter_form_config || {})" :filter-data="default_type_data?.appoint_config?.filter_form_config || {}" direction="vertical" :title-width="58" :data-interface="form.data_source_content" @form-change="filter_form_change"></filter-form>
                                    <drag-group v-if="!isEmpty(form.data_source_content.data_list)" :list="form.data_source_content.data_list" :img-params="form.show_data?.data_logo || ''" :title-params="form.show_data?.data_name || 'name'" type="custom" @onsort="goods_list_sort" @remove="goods_list_remove" @replace="data_list_replace"></drag-group>
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
            <div class="divider-line"></div>
            <!-- 商品显示的配置信息 -->
            <product-show-config :value="form" @change_shop_type="change_shop_type"></product-show-config>
            <div class="divider-line"></div>
            <card-container class="card-container">
                <div class="mb-12">角标设置</div>
                <!-- 角标设置 -->
                <subscript-content :value="form"></subscript-content>
            </card-container>
            <!-- 手动筛选数据弹出框 -->
            <custom-dialog v-model:dialog-visible="url_value_dialog_visible" :data-list-key="form.show_data?.data_key || 'id'" :config="default_type_data.appoint_config" :extra-search-data="form.data_source_content" :multiple="url_value_multiple_bool" @confirm_event="url_value_dialog_call_back"></custom-dialog>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { cloneDeep, isEmpty, pick } from "lodash";
import { get_math, interface_field_processing } from '@/utils';
import { DataSourceStore } from '@/store';
import GoodsMagicAPI from '@/api/goods-magic';
import request from "@/utils/request";
const goods_source_store = DataSourceStore();

const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    styles: {
        type: Object,
        default: () => ({}),
    },
    isNest: {
        type: Boolean,
        default: false,
    },
    defaultConfig: {
        type: Object,
        default: () => ({
            // 图片不同风格下的圆角
            img_radius_0: 4,
            img_radius_1: 0,
        }),
    },
});
const state = reactive({
    form: props.value,
    data: props.styles,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
// 默认商品数据
const default_type_data = ref<any>({});

const base_list = reactive({
    product_style_list: [
        { name: '单列展示', value: '0', width: 110, height: 120 },
        { name: '大图展示', value: '2', width: 166, height: 166 },
        { name: '无图模式', value: '6', width: 0, height: 0 },
        { name: '两列展示(纵向)', value: '1', width: 180, height: 180 },
        { name: '两列展示(横向)', value: '4', width: 70, height: 70 },
        { name: '三列展示', value: '3', width: 116, height: 114 },
        { name: '左右滑动展示', value: '5', width: 0, height: 0 },
    ],
    product_list: [
        { name: '指定商品', value: '0' },
        { name: '筛选商品', value: '1' },
    ],
});
// #region 动态数据处理逻辑
interface custom_config {
    show_type: string[],
    show_number: number[],
    data_type: string[],
    is_type_show: string,
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
const getGoodsmagicinit = () => {
    GoodsMagicAPI.getGoodsmagicinit().then((res) => {
        const { data_source } = res.data;
        options.value = data_source;
        goods_source_store.set_goods_source(data_source);
        // 接口成功之后设置true
        goods_source_store.set_is_goods_source_api(true);
        data_processing();
    }).catch((err) => {
        // 接口成功之后设置为false，下次仍旧获取数据
        goods_source_store.set_is_goods_source_api(false);
    });
};

onBeforeMount(() => {
    if (!goods_source_store.is_goods_source_api) {
        getGoodsmagicinit();
    } else {
        options.value = goods_source_store.goods_source_list;
        data_processing();
    }
});
// 回显数据处理
const data_processing = () => {
    // 如果有历史的值，那么就需要根据历史的值来处理一下数据
    const type_data = options.value.filter((item) => item.type == form.value.data_source);
    if (type_data.length > 0 && !isEmpty(type_data[0].custom_config)) {
        const custom_config = type_data[0].custom_config;
        // 将数据赋值给默认数据，不存在时需要显示全部
        default_type_data.value = {
            ...custom_config,
            show_type: custom_config?.show_type || ['vertical', 'vertical-scroll', 'horizontal'],
            show_number: custom_config?.show_number || [1, 2, 3, 4],
            data_type: custom_config?.data_type || [0, 1],
            is_type_show: custom_config?.is_type_show || '1',
        };
        filter_data_handling('old');
        default_data();
    }
};
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
// 默认数据处理
const default_data = () => {
    const { data_type = [] } = default_type_data.value;
    const { data_source_content } = form.value;
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
const emits = defineEmits(['data_source_change']);
// 动态数据切换时触发的逻辑
const changeDataSource = (key: string) => {
    const type_data = options.value.filter((item) => item.type == key);
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
    if (type_data.length > 0 && !isEmpty(type_data[0].custom_config)) {
        emits('data_source_change', type_data[0].name);
        // 自定义数据取值
        const custom_config = type_data[0].custom_config
        // 将数据赋值给默认数据
        default_type_data.value = {
            ...custom_config,
            show_type: custom_config?.show_type || ['vertical', 'vertical-scroll', 'horizontal'],
            show_number: custom_config?.show_number || [1, 2, 3, 4],
            data_type: custom_config?.data_type || [0, 1],
            is_type_show: custom_config?.is_type_show || '1',
        };
        // 默认数据处理
        default_data();
        // 筛选数据处理
        filter_data_handling('new');
    } else {
        emits('data_source_change', '')
    }
};
// #endregion

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
const goods_list_remove = (index: number) => {
    form.value.data_list.splice(index, 1);
};
const url_value_multiple_bool = ref(true);
const data_list_replace_index = ref(0);
// 打开弹出框
const url_value_dialog_visible = ref(false);
const data_list_replace = (index: number) => {
    data_list_replace_index.value = index;
    url_value_multiple_bool.value = false;
    url_value_dialog_visible.value = true;
};
const add = () => {
    url_value_multiple_bool.value = true;
    url_value_dialog_visible.value = true;
};
// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
    if (url_value_multiple_bool.value) {
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
};
// 拖拽更新之后，更新数据
const goods_list_sort = (new_list: any) => {
    form.value.data_list = new_list;
};
const filter_form_change = (val: any) => {
    form.value.data_source_content = val;
}
// 选择某些风格时， 切换到对应的按钮
const change_style = (val: string | number | boolean | undefined): void => {
    if (typeof val !== 'string') return;
    form.value.theme = val;
    if (!is_revise.value) {
        if (['3', '4', '5'].includes(val) && form.value.shop_type == 'text') {
            form.value.shop_type = 'icon';
        } else if (['0', '1', '2'].includes(val) && form.value.shop_type == 'icon') {
            form.value.shop_type = 'text';
        }
    }
    if (['0', '4'].includes(val)) {
        if (data.value.shop_img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.shop_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.shop_img_radius.radius = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_top_left = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_top_right = props.defaultConfig.img_radius_0;
        }
    } else {
        if (data.value.shop_img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.shop_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.shop_img_radius.radius = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_top_left = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_top_right = props.defaultConfig.img_radius_1;
        }
    }
    // 切换风格时，将对应图片的默认值宽度和高度赋值
    const list = base_list.product_style_list.filter(item => item.value == form.value.theme);
    if (list.length > 0) {
        // emits('theme_change', list[0].width, list[0].height);
        data.value.content_img_width = list[0].width;
        data.value.content_img_height = list[0].height;
    }
};
const is_revise = ref(false);
const change_shop_type = () => {
    is_revise.value = true;
};
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    .content-height {
        min-height: calc(100vh - 31.8rem);
        .card-container-br {
            border-bottom: 0.8rem solid #f0f2f5;
        }
    }
}
.img {
    width: 4rem;
    height: 4rem;
}
</style>
