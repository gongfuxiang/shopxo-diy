<template>
    <div class="common-content-height">
        <el-form :model="form" label-width="60">
            <card-container class="mb-8">
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.tabs_theme" class="ml-4">
                        <el-radio value="0">样式一</el-radio>
                        <el-radio value="2">样式二</el-radio>
                        <el-radio value="3">样式三</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="滑动置顶">
                    <el-radio-group v-model="form.tabs_top_up" class="ml-4">
                        <el-radio :value="true">启用</el-radio>
                        <el-radio :value="false">不启用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">选项卡设置</div>
                <drag :data="form.tabs_list" type="card" :space-col="25" @remove="remove" @on-sort="on_sort">
                    <template #default="scoped">
                        <div class="flex-col align-c jc-s gap-20 flex-1 w">
                            <el-form-item label="显示文字" class="w mb-0">
                                <el-input v-model="scoped.row.title" placeholder="请输入标题文字" />
                            </el-form-item>
                            <el-form-item label="数据类型" class="w mb-0">
                                <el-radio-group v-model="scoped.row.data_type" class="ml-4">
                                    <el-radio value="micro_page">微页面</el-radio>
                                    <el-radio value="category">选择分类</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item :label="scoped.row.data_type == 'micro_page' ? '微页面' : '商品分类'" class="w mb-0">
                                <!-- <el-input v-model="scoped.row.classify" placeholder="请选择页面" /> -->
                                <url-value v-model="scoped.row.classify"></url-value>
                            </el-form-item>
                        </div>
                    </template>
                </drag>
                <el-button class="mt-20 mb-20 w" @click="add">+添加</el-button>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});

const state = reactive({
    form: props.value
});
const { form } = toRefs(state);
const add = () => {
    form.value.tabs_list.push({
        id: get_math(),
        title: '',
        desc: '',
        data_type: 'micro_page',
        classify: {},
        micro_page: '',
        category_list: []
    })
}
const remove = (index: number) => {
    form.value.tabs_list.splice(index, 1);
}
// 拖拽更新之后，更新数据
const on_sort = (new_list: nav_group[]) => {
    form.value.tabs_list = new_list;
}
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>
