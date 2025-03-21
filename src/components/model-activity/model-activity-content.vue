<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">活动设置</div>
                <el-form-item label="主图风格">
                    <el-radio-group v-model="form.main_theme" @change="change_main_style">
                        <el-radio v-for="item in base_list.main_product_style" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
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
                <el-form-item label="显示内容">
                    <el-checkbox-group v-model="form.is_main_show">
                        <el-checkbox v-for="item in base_list.show_list" :key="item.value" :value="item.value" :disabled="!item.type.includes(form.main_theme)">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">活动设置</div>
                <!-- 数据筛选组件, 根据数据源类型显示不同的筛选组件 -->
                <data-filter type="activity" :value="form" :list="form.data_list" :base-list="base_list" @add="add" @data_list_replace="data_list_replace" @data_list_remove="goods_list_remove" @data_list_sort="goods_list_sort"></data-filter>
            </card-container>
            <div class="divider-line"></div>
            <!-- 商品显示的配置信息 -->
            <product-show-config :value="form" @change_shop_type="change_shop_type"></product-show-config>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">商品角标设置</div>
                <!-- 角标设置 -->
                <subscript-content :value="form"></subscript-content>
            </card-container>
            <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['activity']" :multiple="url_value_multiple_bool" @update:model-value="url_value_dialog_call_back"></url-value-dialog>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import { commonStore } from '@/store';
const common_store = commonStore();

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
const state = reactive({
    form: props.value,
    data: props.styles,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);

const base_list = reactive({
    main_product_style: [
        { name: '左图右文', value: '0', width: 143, height: 143 },
        { name: '上图下文', value: '1', width: 0, height: 126 },
        { name: '大图显示', value: '2', width: 0, height: 126 },
    ],
    product_style_list: [
        { name: '单列展示', value: '0', width: 110, height: 120 },
        { name: '大图展示', value: '2', width: 166, height: 166 },
        { name: '无图模式', value: '6', width: 0, height: 0 },
        { name: '两列展示(纵向)', value: '1', width: 180, height: 180 },
        { name: '两列展示(横向)', value: '4', width: 70, height: 70 },
        { name: '三列展示', value: '3', width: 116, height: 114 },
        { name: '左右滑动展示', value: '5', width: 0, height: 0 },
    ],
    show_list: [
        { name: '图片', value: 'img', type: ['0', '1'] },
        { name: '标题', value: 'title', type: ['0', '1', '2'] },
        { name: '描述', value: 'desc', type: ['0', '1', '2'] },
        { name: '关键字', value: 'keywords', type: ['0', '1', '2'] },
    ],
    data_type_list: [
        { name: '指定活动', value: '0' },
        { name: '筛选活动', value: '1' },
    ],
});
const emits = defineEmits(['theme_change']);
const goods_list_remove = (index: number) => {
    form.value.data_list.splice(index, 1);
};
const url_value_multiple_bool = ref(true);
const data_list_replace_index = ref(0);
const data_list_replace = (index: number) => {
    data_list_replace_index.value = index;
    url_value_multiple_bool.value = false;
    url_value_dialog_visible.value = true;
};
const add = () => {
    url_value_multiple_bool.value = true;
    url_value_dialog_visible.value = true;
};
// 打开弹出框
const url_value_dialog_visible = ref(false);
// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
    if (url_value_multiple_bool.value) {
        item.forEach((item: any) => {
            form.value.data_list.push({
                id: get_math(),
                new_cover: [],
                new_title: '',
                data: item,
            });
        });
    } else {
        form.value.data_list[data_list_replace_index.value] = {
            id: get_math(),
            new_cover: form.value.data_list[data_list_replace_index.value]?.new_cover || [],
            new_title: '',
            data: item[0],
        };
    }
};
// 拖拽更新之后，更新数据
const goods_list_sort = (new_list: any) => {
    form.value.data_list = new_list;
};
const change_main_style = (val: any) => {
    form.value.is_main_show = ['img', 'title', 'desc', 'keywords'];
    const list = base_list.main_product_style.filter(item => item.value == val);
    let width = 0;
    let height = 0;
    if (list.length > 0) {
        width = list[0].width;
        height = list[0].height;
    }
    let color = '#fff';
    let padding = { padding: 0, padding_top: 16, padding_bottom: 0, padding_left: 10, padding_right: 0 };
    if (val == '1') {
        padding = { padding: 10, padding_top: 10, padding_bottom: 10, padding_left: 10, padding_right: 10 };
    } else if (val == '2') {
        color = '';
        padding = { padding: 0, padding_top: 10, padding_bottom: 0, padding_left: 0, padding_right: 0 };
    }
    data.value.activity_main = {
        ...data.value.activity_main,
        activity_main_right_content: {
            ...padding,
        },
        img_width: width,
        img_height: height,
        color_list: [{ color: color, color_percentage: undefined }],
    }
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
