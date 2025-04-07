<template>
    <div class="content">
        <el-form :model="form" label-width="75" class="m-h">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.theme">
                        <el-radio v-for="item in base_list.theme_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.theme == '2'" label="轮播列数">
                    <el-radio-group v-model="form.carousel_col">
                        <el-radio :value="1">单列展示</el-radio>
                        <el-radio :value="2">两列展示</el-radio>
                        <el-radio :value="3">三列展示</el-radio>
                        <el-radio :value="4">四列展示</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container class="card-container-br">
                <div class="mb-12">问答设置</div>
                <!-- 数据筛选组件, 根据数据源类型显示不同的筛选组件 -->
                <data-filter type="ask" :value="form" :list="form.data_list" :base-list="base_list" @add="add" @data_list_replace="data_list_replace" @data_list_remove="data_list_remove" @data_list_sort="data_list_sort"></data-filter>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">列表设置</div>
                <el-form-item label="是否显示">
                    <el-checkbox-group v-model="form.is_show">
                        <el-checkbox v-for="item in base_list.show_list.filter(item => item.show.includes(form.theme))" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item> 
                <el-form-item label="标题显示">
                    <el-radio-group v-model="form.title_display_method">
                        <el-radio v-for="item in base_list.display_method" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item> 
            </card-container>
        </el-form>
        <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['ask']" :multiple="url_value_multiple_bool" @update:model-value="url_value_dialog_call_back"></url-value-dialog>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import { commonStore } from '@/store';
const common_store = commonStore();
interface form {
    theme: string;
    data_list: any[];
    content_top: any;
    is_show: string[];
    carousel_col: number;
}
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
        { name: '单列展示', value: '0', width: 50, height: 50 },
        { name: '两列展示（纵向）', value: '1', width:180, height: 180 },
        { name: '左右滑动展示', value: '2', width:0, height: 0 },
    ],
    data_type_list: [
        { name: '指定问答', value: '0' },
        { name: '筛选问答', value: '1' },
    ],
    show_list: [
        { name: '回复状态', value: 'reply_status', show: ['0', '1' , '2'] },
        { name: '日期时间', value: 'time', show: ['0', '1' , '2'] },
        { name: '浏览量', value: 'page_view', show: ['0', '1'] },
        { name: 'TOP排名', value: 'ranking', show: ['0'] },
    ],
    filter_list: [
        { name: '全部', value: '' },
        { name: '未回', value: '0' },
        { name: '已回', value: '1' },
    ],
    display_method: [
        { name: '自动', value: '0' },
        { name: '一行', value: '1' },
        { name: '两行', value: '2' },
    ],
});

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
