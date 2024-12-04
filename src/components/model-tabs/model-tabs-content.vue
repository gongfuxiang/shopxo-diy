<template>
    <div class="common-content-height">
        <el-form :model="form" label-width="60">
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.tabs_theme" @change="tabs_theme_change">
                        <el-radio value="0">样式一</el-radio>
                        <el-radio value="2">样式二</el-radio>
                        <el-radio value="3">样式三</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="滑动置顶">
                    <el-switch v-model="form.tabs_top_up" class="mr-10" active-value="1" inactive-value="0"></el-switch>
                    <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="滑动置顶仅手机端有效" raw-content placement="top">
                        <icon name="miaosha-hdgz" size="12" color="#999"></icon>
                    </el-tooltip>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">选项卡设置</div>
                <div class="flex-col gap-x-20">
                    <div class="card-background box-shadow-sm ptb-25 flex gap-y-16 re align-c">
                        <el-icon class="iconfont icon-jinzhi size-16 cursor-move" />
                        <el-form-item label="显示标题" class="w mb-0">
                            <el-input v-model="form.home_data.title" placeholder="请输入标题文字" clearable />
                        </el-form-item>
                    </div>
                    <drag :data="form.tabs_list" type="card" :space-col="25" @remove="remove" @on-sort="on_sort">
                        <template #default="scoped">
                            <div class="flex-col align-c jc-s gap-20 flex-1 w">
                                <el-form-item label="显示标题" class="w mb-0">
                                    <el-input v-model="scoped.row.title" placeholder="请输入标题文字" clearable />
                                </el-form-item>
                                <el-form-item label="数据类型" class="w mb-0">
                                    <el-radio-group v-model="scoped.row.data_type">
                                        <el-radio value="0">DIY页面</el-radio>
                                        <el-radio value="1">商品分类</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item :label="scoped.row.data_type == '0' ? 'DIY页面' : '商品分类'" class="w mb-0">
                                    <template v-if="scoped.row.data_type == '0'">
                                        <url-value v-model="scoped.row.micro_page_list" :type="['diy']"></url-value>
                                    </template>
                                    <template v-else>
                                        <url-value v-model="scoped.row.classify" :type="['goods-category']"></url-value>
                                    </template>
                                </el-form-item>
                            </div>
                        </template>
                    </drag>
                    <el-button class="mt-20 mb-20 w" @click="add">+添加</el-button>
                </div>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math, tabs_style } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    tabStyle: {
        type: Object,
        default: () => ({}),
    },
});

const state = reactive({
    form: props.value,
    styles: props.tabStyle,
});
const { form, styles } = toRefs(state);
const add = () => {
    form.value.tabs_list.push({
        id: get_math(),
        title: '',
        desc: '',
        data_type: '0',
        classify: {},
        micro_page: '',
        micro_page_list: {},
        category_list: {},
    });
};
const remove = (index: number) => {
    if (form.value.tabs_list.length > 1) {
        form.value.tabs_list.splice(index, 1);
    } else {
        ElMessage.warning('至少保留一个选项卡');
    }
};
// 拖拽更新之后，更新数据
const on_sort = (new_list: nav_group[]) => {
    form.value.tabs_list = new_list;
};
const tabs_theme_change = (val: string | number | boolean | undefined): void => {
    styles.value.tabs_color_checked = tabs_style(styles.value.tabs_color_checked, val);
};
</script>
<style lang="scss" scoped>
.cursor-move {
    color: #ddd;
    cursor: move;
}
.card-background {
    background: #fff;
    padding-left: 1.6rem;
    padding-right: 2rem;
}
</style>
