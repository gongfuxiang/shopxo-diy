<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container>
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
            <div class="divider-line"></div>
            <card-container class="card-container-br">
                <div class="mb-12">文章设置</div>
                <!-- 数据筛选组件, 根据数据源类型显示不同的筛选组件 -->
                <data-filter type="article" :value="form" :list="form.data_list" :base-list="base_list" @add="add" @data_list_replace="data_list_replace" @data_list_remove="data_list_remove" @data_list_sort="data_list_sort"></data-filter>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">列表设置</div>
                <el-form-item label="是否显示">
                    <el-checkbox-group v-model="form.field_show">
                        <el-checkbox v-for="item in base_list.field_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </card-container>
        </el-form>
        <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['article']" :multiple="url_value_multiple_bool" @update:model-value="url_value_dialog_call_back"></url-value-dialog>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import { commonStore } from '@/store';
const common_store = commonStore();
/**
 * @description 文章列表（内容）
 * @param value{Object} 传过来的数据，用于数据渲染
 * @param styles{Object} 样式
 * @param defaultConfig{Object} 默认配置
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
    article_category_list: [] as select_1[],
    sort_list: [
        { name: '综合', value: '0' },
        { name: '时间', value: '1' },
        { name: '浏览量', value: '2' },
    ],
    order_by_rule_list: [
        { name: '降序（desc）', value: '0' },
        { name: '升序（asc）', value: '1' },
    ],
    field_show_list: [
        { name: '日期时间', value: '0' },
        { name: '浏览量', value: '1' },
        { name: '描述', value: '2' },
    ],
});

const emits = defineEmits(['theme_change']);
onMounted(() => {
    nextTick(() => {
        // 定时获取common_store.common.article_category的数据，直到拿到值或者关闭页面为止
        if (common_store.common.article_category.length > 0) {
            base_list.article_category_list = common_store.common.article_category;
        }
    });
    // 如果历史数据没有操作，则修改默认值
    const { content_img_width = '', content_img_height = '' } = data.value;
    // 宽度和高度为空的时候，并且不是无图模式和左右滑动模式的时候，修改默认值
    if ((typeof content_img_width != 'number' || typeof content_img_height != 'number') && !['3', '4'].includes(form.value.theme)) {
        const list = base_list.theme_list.filter(item => item.value == form.value.theme);
        if (list.length > 0) {
            emits('theme_change', list[0].width, list[0].height);
        }
    }
});
// 主题改变
const theme_change = (val: any) => {
    if (val == '3' || val == '4') {
        form.value.field_show = ['1'];
    } else {
        form.value.field_show = ['0', '1'];
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
        emits('theme_change', list[0].width, list[0].height);
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
            new_cover: [],
            data: item[0],
        };
    }
};
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
}
.img {
    width: 4rem;
    height: 4rem;
}
.number-show {
    :deep(.el-input__wrapper .el-input__inner) {
        text-align: left;
    }
}
</style>
