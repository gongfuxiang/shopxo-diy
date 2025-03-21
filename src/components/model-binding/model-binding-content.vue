<template>
    <div class="content">
        <el-form :model="form" label-width="75" class="m-h">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="主图风格">
                    <el-radio-group v-model="form.host_graph_theme" @change="host_graph_theme_change">
                        <el-radio v-for="item in base_list.host_graph_theme_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.theme" @change="theme_change">
                        <el-radio v-for="item in base_list.theme_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.theme == '3'" label="轮播列数">
                    <el-radio-group v-model="form.carousel_col">
                        <el-radio :value="1">单列展示</el-radio>
                        <el-radio :value="2">两列展示</el-radio>
                        <el-radio :value="3">三列展示</el-radio>
                        <el-radio :value="4">四列展示</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.host_graph_theme == '1'" label="主图显示">
                    <el-switch v-model="form.is_host_graph_show" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container class="card-container-br">
                <div class="mb-12">组合搭配设置</div>
                <!-- 数据筛选组件, 根据数据源类型显示不同的筛选组件 -->
                <data-filter type="binding" :value="form" :list="form.data_list" :base-list="base_list" @add="add" @data_list_replace="data_list_replace" @data_list_remove="data_list_remove" @data_list_sort="data_list_sort"></data-filter>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">显示内容</div>
                <el-form-item label="商品显示">
                    <el-checkbox-group v-model="form.is_goods_show">
                        <el-checkbox v-for="item in base_list.list_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="是否展开">
                    <el-switch v-model="form.is_default_show_goods" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <!-- <card-container> -->
            <el-tabs v-model="tabs_name" class="content-tabs">
                <el-tab-pane v-for="(tab, index) in base_list.tabs" :key="index" :label="tab.label" :name="tab.name">
                    <el-form-item :label="tab.label">
                        <img-or-icon-or-text-content v-model:value="form" :type="tab.name" />
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
            <!-- </card-container> -->
        </el-form>
        <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['binding']" :multiple="url_value_multiple_bool" @update:model-value="url_value_dialog_call_back"></url-value-dialog>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import { commonStore } from '@/store';
const common_store = commonStore();
/**
 * @description 博客列表（内容）
 * @param value{Object} 传过来的数据，用于数据渲染
 * @param styles{Object} 样式
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    styles: {
        type: Object,
        default: () => ({}),
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
// 默认值
const state = reactive({
    form: props.value,
    data: props.styles,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);

const tabs_name = ref('details');

const base_list = reactive({
    host_graph_theme_list: [
        { name: '单列展示', value: '0', width: 128, height: 128 },
        { name: '大图展示', value: '1', width: 0, height: 221 },
    ],
    theme_list: [
        { name: '单列展示', value: '0', width: 50, height: 50 },
        { name: '两列展示（纵向）', value: '1', width:156, height: 156 },
        { name: '两列展示（横向）', value: '2', width:50, height: 50 },
        { name: '左右滑动展示', value: '3', width:0, height: 0 },
    ],
    data_type_list: [
        { name: '指定组合搭配', value: '0' },
        { name: '筛选组合搭配', value: '1' },
    ],
    list_show_list: [
        { name: '商品名称', value: 'title'},
        { name: '商品图片', value: 'goods_img' },
        { name: '商品售价', value: 'price' },
        { name: '商品售价单位', value: 'price_unit' },
        { name: '商品节省价', value: 'save_price' },
    ],
    tabs: [
        { label: "详情按钮", name: "details" },
        { label: "数据优惠", name: "data_discounts" },
        { label: "商品优惠", name: "goods_discounts" },
    ]
});

const host_graph_theme_change = () => {
    // 切换风格时，将对应图片的默认值宽度和高度赋值
    const list = base_list.host_graph_theme_list.filter(item => item.value == form.value.host_graph_theme);
    if (list.length > 0) {
        data.value.data_content_img_width = list[0].width;
        data.value.data_content_img_height = list[0].height;
    }
}
// 主题改变
const theme_change = (val: any) => {
    if (val == '0') {
        if (data.value.goods_img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.goods_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.goods_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.goods_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.goods_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.goods_img_radius.radius = props.defaultConfig.img_radius_0;
            data.value.goods_img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
            data.value.goods_img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
            data.value.goods_img_radius.radius_top_left = props.defaultConfig.img_radius_0;
            data.value.goods_img_radius.radius_top_right = props.defaultConfig.img_radius_0;
        }
    } else {
        if (data.value.goods_img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.goods_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.goods_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.goods_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.goods_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.goods_img_radius.radius = props.defaultConfig.img_radius_1;
            data.value.goods_img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
            data.value.goods_img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
            data.value.goods_img_radius.radius_top_left = props.defaultConfig.img_radius_1;
            data.value.goods_img_radius.radius_top_right = props.defaultConfig.img_radius_1;
        }
    }
    // 切换风格时，将对应图片的默认值宽度和高度赋值
    const list = base_list.theme_list.filter(item => item.value == form.value.theme);
    if (list.length > 0) {
        // emits('theme_change', list[0].width, list[0].height);
        data.value.goods_content_img_width = list[0].width;
        data.value.goods_content_img_height = list[0].height;
    }
};
// 移除
const data_list_remove = (index: number) => {
    form.value.data_list.splice(index, 1);
};
const url_value_multiple_bool = ref(true);
const data_list_replace_index = ref(0);
// 替换
const data_list_replace = (index: number) => {
    data_list_replace_index.value = index;
    url_value_multiple_bool.value = false;
    url_value_dialog_visible.value = true;
};
// 拖动排序
const data_list_sort = (item: any) => {
    form.value.data_list = item;
};
//  新增
const add = () => {
    url_value_multiple_bool.value = true;
    url_value_dialog_visible.value = true;
};
// 开启关闭链接
const url_value_dialog_visible = ref(false);
const url_value_dialog_call_back = (item: any[]) => {
    if (url_value_multiple_bool.value) {
        item.forEach((child: any) => {
            form.value.data_list.push({
                id: get_math(),
                new_title: '',
                new_cover: [],
                data: child,
            });
        });
    } else {
        form.value.data_list[data_list_replace_index.value] = {
            id: get_math(),
            new_title: '',
            new_cover: form.value.data_list[data_list_replace_index.value]?.new_cover || [],
            data: item[0],
        };
    }
};
</script>
<style lang="scss" scoped>
// :deep(.el-tabs.content-tabs) {
//     .el-tabs__header.is-top {
//         background: #fff;
//         margin: 0;
//         padding-top: 0rem;
//     }
//     .el-tabs__item.is-top {
//         padding: 0;
//         align-items: center;
//         width: 10rem;
//         font-size: 1.4rem;
//     }
//     .el-tabs__active-bar{
//         width: 100%;
//     }
// }
</style>
