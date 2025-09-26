<template>
    <div class="content">
        <el-form :model="form" label-width="75" class="m-h">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="对齐方式">
                    <el-radio-group v-model="form.justification" @change="tabs_theme_change">
                        <el-radio value="left">居左</el-radio>
                        <el-radio value="center">居中</el-radio>
                        <el-radio value="right">居右</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选项卡置顶">
                    <div class="flex-row align-c gap-10">
                        <el-switch v-model="form.tabs_top_up" active-value="1" inactive-value="0" />
                        <tooltip content="1.滑动置顶仅手机端有效<br/>2.滑动置顶后通用的圆角不生效"></tooltip>
                    </div>
                </el-form-item>
                <template v-if="form.tabs_top_up == '1' && is_not_general_safe_distance">
                    <el-form-item label="安全距离">
                        <div class="flex-row align-c gap-10">
                            <el-switch v-model="form.is_general_safe_distance" active-value="1" inactive-value="0" />
                            <tooltip content="选项卡置顶是否需要安全距离"></tooltip>
                        </div>
                    </el-form-item>
                </template>
                <el-form-item label="选项卡风格">
                    <el-radio-group v-model="form.tabs_theme" @change="tabs_theme_change">
                        <el-radio v-for="item in base_list.tabs_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.tabs_theme == '3'" label="选中图标">
                    <upload v-model="form.tabs_adorn_img" v-model:icon-value="form.tabs_adorn_icon" is-icon :limit="1" size="50"></upload>
                </el-form-item>
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
            <card-container>
                <div class="mb-12">选项卡设置</div>
                <div class="nav-list">
                    <drag :data="form.tabs_list" type="card" icon-position="top" :space-col="20" @click="tabs_list_click" @remove="tabs_list_remove" @on-sort="tabs_list_sort">
                        <template #default="{ row, index }">
                            <div class="flex-col w">
                                <el-form-item label="显示类型" class="w mb-10">
                                    <div class="flex-col gap-10 w h">
                                        <el-radio-group v-model="row.tabs_type">
                                            <el-radio value="0">文本</el-radio>
                                            <el-radio value="1">图片/图标</el-radio>
                                        </el-radio-group>
                                        <template v-if="row.tabs_type == '1'">
                                            <upload v-model="row.tabs_img" v-model:icon-value="row.tabs_icon" is-icon :limit="1" size="50"></upload>
                                        </template>
                                        <template v-else>
                                            <el-input v-model="row.title" placeholder="请输入标题文字" clearable />
                                        </template>
                                    </div>
                                </el-form-item>
                                <sliding-fixed v-model="row.is_sliding_fixed" @sliding_fixed_change="sliding_fixed_change($event, index)"></sliding-fixed>
                                <template v-if="form.tabs_active_index == index">
                                    <el-form-item v-if="form.tabs_theme == '4'" label="上传图片">
                                        <upload v-model="row.img" :limit="1" size="40" styles="2"></upload>
                                    </el-form-item>
                                    <el-form-item v-if="form.tabs_theme == '1'" label="简介配置">
                                        <el-input v-model="row.desc" placeholder="请输入简介" clearable />
                                    </el-form-item>
                                    <!-- 数据筛选组件, 根据数据源类型显示不同的筛选组件 -->
                                    <data-filter type="ask" :value="row" :list="row.data_list" :base-list="base_list" @add="ask_add(index)" @data_list_replace="data_list_replace($event, index)" @data_list_remove="data_list_remove($event, index)" @data_list_sort="data_list_sort($event, index)"></data-filter>
                                </template>
                            </div>
                        </template>
                    </drag>
                    <el-button class="mtb-20 w" @click="tabs_add">+添加</el-button>
                </div>
            </card-container>
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
import { get_math, tabs_style } from '@/utils';
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
    tabs_style_list: [
        { name: '样式一', value: '0' },
        { name: '样式二', value: '1' },
        { name: '样式三', value: '2' },
        { name: '样式四', value: '3' },
        { name: '样式五', value: '4' },
    ],
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
const tabs_theme_change = (val: string | number | boolean | undefined): void => {
    data.value.tabs_color_checked = tabs_style(data.value.tabs_color_checked, val);
};
/**
 * 处理滑动固定状态变化的函数
 * 当某个标签页的滑动固定状态发生变化时，确保同时只有一个标签页被设置为滑动固定
 * 
 * @param val 新的滑动固定状态值，可以是字符串、数字或布尔值
 * @param index 当前标签页的索引
 */
 const sliding_fixed_change = (val: string | number | boolean, index: number) => {
    // 查找除当前标签页外，其他标签页中是否已有滑动固定的
    const tabs_list_is_sliding_fixed = form.value.tabs_list.findIndex((item: any, index1: number) => item.is_sliding_fixed == '1' && index != index1);
    // 如果当前标签页的滑动固定状态为'1'，且已存在其他滑动固定的标签页
    if (val == '1' && tabs_list_is_sliding_fixed != -1) {
        // 遍历所有标签页，将其他标签页的滑动固定状态设置为'0'
        form.value.tabs_list.forEach((item: any, index1: number) => {
            if (index != index1) {
                item.is_sliding_fixed = '0';
            }
        });
    }
}
// 选项卡设置
const tabs_list_remove = (index: number) => {
    if (form.value.tabs_list.length > 1) {
        form.value.tabs_list.splice(index, 1);
        if (form.value.tabs_list.length > index) {
            form.value.tabs_active_index = index;
        } else {
            form.value.tabs_active_index = index - 1;
        }
    } else {
        form.value.tabs_active_index = 0;
        ElMessage.warning('至少保留一个选项卡');
    }
};
const tabs_list_sort = (item: any) => {
    form.value.tabs_list = item;
};
const tabs_add = () => {
    form.value.tabs_list.push({
        id: get_math(),
        tabs_type: '0', 
        tabs_img: [], 
        tabs_icon: '',
        is_sliding_fixed: '0',
        title: '',
        img: [],
        desc: '',
        data_type: '0',
        keywords: '',
        category_ids: [],  
        data_ids: '',
        number: 4, 
        order_by_type: 0, 
        order_by_rule: 0, 
        is_reply: '0', 
        data_list: [], 
        data_auto_list: []
    });
    form.value.tabs_active_index = form.value.tabs_list.length - 1;
};
let click_index = 0;
const url_value_multiple_bool = ref(true);
const data_list_replace_index = ref(0);
// 打开弹出框
const url_value_dialog_visible = ref(false);

const data_list_replace = (index: number, row_index: number) => {
    click_index = row_index;
    data_list_replace_index.value = index;
    url_value_multiple_bool.value = false;
    url_value_dialog_visible.value = true;
};
// 移除
const data_list_remove = (index: number, ask_index: number) => {
    form.value.tabs_list[ask_index].data_list.splice(index, 1);
};
// 拖动排序
const data_list_sort = (item: any, index: number) => {
    form.value.tabs_list[index].data_list = item;
};
//  新增
const ask_add = (index: number) => {
    click_index = index;
    url_value_multiple_bool.value = true;
    url_value_dialog_visible.value = true;
};
const tabs_list_click = (item: any, index: number) => {
    form.value.tabs_active_index = index;
};
// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
    if (url_value_multiple_bool.value) {
        item.forEach((item: any) => {
            form.value.tabs_list[click_index].data_list.push({
                id: get_math(),
                new_cover: [],
                new_title: '',
                data: item,
            });
        });
    } else {
        form.value.tabs_list[click_index].data_list[data_list_replace_index.value] = {
            id: get_math(),
            new_cover: form.value.tabs_list[click_index].data_list[data_list_replace_index.value]?.new_cover || [],
            new_title: '',
            data: item[0],
        };
    }
};
// 是否设置安全距离
const is_not_general_safe_distance = computed(() => common_store.is_immersion_model && !common_store.is_general_safe_distance);
watchEffect(() => {
    if (!is_not_general_safe_distance.value) {
        form.value.is_general_safe_distance = '0';
    }
});
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
