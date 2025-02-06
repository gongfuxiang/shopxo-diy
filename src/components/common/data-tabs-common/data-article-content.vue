<template>
    <card-container class="card-container">
        <div class="mb-12">展示设置</div>
        <el-form-item label="选择风格">
            <el-radio-group v-model="form.theme" @change="theme_change">
                <el-radio v-for="item in base_list.theme_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.theme == '4'" label="轮播列数">
            <el-radio-group v-model="form.carousel_col">
                <el-radio v-for="item in base_list.carousel_col_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
    </card-container>
    <div class="divider-line data-tabs-line"></div>
    <card-container class="card-container">
        <div class="mb-12">列表设置</div>
        <el-form-item label="是否显示">
            <el-checkbox-group v-model="form.field_show">
                <el-checkbox v-for="item in base_list.field_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="form.field_show.includes('2')" label="描述行数">
            <el-radio-group v-model="form.field_desc_row">
                <el-radio v-for="item in base_list.field_desc_row" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="form.theme == '4'">
            <el-form-item label="标题浮起">
                <el-switch v-model="form.name_float" active-value="1" inactive-value="0" @change="switch_chage"></el-switch>
            </el-form-item>
        </template>
    </card-container>
    <div class="divider-line data-tabs-line"></div>
    <card-container class="card-container">
        <div class="mb-12">角标设置</div>
        <!-- 角标设置 -->
        <subscript-content :value="form"></subscript-content>
    </card-container>
    <div class="divider-line data-tabs-line"></div>
    <!-- 数据筛选组件, 根据数据源类型显示不同的筛选组件 -->
    <data-filter type="article" :value="form" :list="form.data_list" :base-list="base_list" @add="add" @data_list_replace="data_list_replace" @data_list_remove="data_list_remove" @data_list_sort="data_list_sort"></data-filter>
    <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['article']" :multiple="url_value_multiple_bool" @update:model-value="url_value_dialog_call_back"></url-value-dialog>
</template>

<script lang="ts" setup>
import { get_math } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    tabStyle: {
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

const base_list = reactive({
    theme_list: [
        { name: '单列展示', value: '0', width:110, height: 83 },
        { name: '两列展示（纵向）', value: '1', width:180, height: 180 },
        { name: '大图展示', value: '2', width:0, height: 180 },
        { name: '无图模式', value: '3', width:0, height: 0 },
        { name: '左右滑动展示', value: '4', width:0, height: 0 },
    ],
    carousel_col_list: [
        { name: '单列展示', value: '0' },
        { name: '两列展示', value: '1' },
        { name: '三列展示', value: '2' },
        { name: '四列展示', value: '3' },
    ],
    data_type_list: [
        { name: '选择文章', value: '0' },
        { name: '筛选文章', value: '1' },
    ],
    field_show_list: [
        { name: '文章标题', value: '3' },
        { name: '日期时间', value: '0' },
        { name: '浏览量', value: '1' },
        { name: '描述', value: '2' },
    ],
    field_desc_row: [
        { name: '一行', value: '1' },
        { name: '两行', value: '2' }
    ]
});

// 默认值
const state = reactive({
    form: props.value,
    data: props.tabStyle,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
watch(() => props.value, (value) => {
    form.value = value;
},{deep: true, immediate: true });

watch(() => props.tabStyle, (value) => {
    data.value = value;
},{deep: true, immediate: true });
// 主题改变
const theme_change = (val: any) => {
    if (val == '3' || val == '4') {
        form.value.field_show = ['1', '3'];
    } else {
        form.value.field_show = ['0', '1', '3'];
    }
    if (val == '0') {
        if (data.value.img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.img_radius.radius = props.defaultConfig.img_radius_0;
            data.value.img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
            data.value.img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
            data.value.img_radius.radius_top_left = props.defaultConfig.img_radius_0;
            data.value.img_radius.radius_top_right = props.defaultConfig.img_radius_0;
        }
    } else {
        if (data.value.img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.img_radius.radius = props.defaultConfig.img_radius_1;
            data.value.img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
            data.value.img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
            data.value.img_radius.radius_top_left = props.defaultConfig.img_radius_1;
            data.value.img_radius.radius_top_right = props.defaultConfig.img_radius_1;
        }
    }
    // 切换风格时，将对应图片的默认值宽度和高度赋值
    const list = base_list.theme_list.filter(item => item.value == form.value.theme);
    if (list.length > 0) {
        data.value.style.content_img_width = list[0].width;
        data.value.style.content_img_height = list[0].height;
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
// 标题浮起之后文章标题的颜色和字体更新
const switch_chage = (val: string | number | boolean) => {
    if (val == '1') {
        data.value.name_color = '#fff';
        data.value.name_weight = '400';
    } else {
        data.value.name_color = '#333';
        data.value.name_weight = 'bold';
    }
};
</script>