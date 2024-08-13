<template>
    <div class="auxiliary-line common-content-height">
        <el-form :model="form" label-width="70">
            <card-container class="mb-8">
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.style_radio" class="ml-4">
                        <el-radio value="search">搜索</el-radio>
                        <el-radio value="title">标题</el-radio>
                        <el-radio value="location">定位</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.style_radio == 'search'" label="样式类型">
                    <el-radio-group v-model="form.style_type" class="ml-4">
                        <el-radio value="title">标题</el-radio>
                        <el-radio value="location">定位</el-radio>
                        <el-radio value="logo">logo</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="(form.style_radio == 'search' && form.style_type == 'title') || form.style_radio == 'title'">
                    <el-form-item label="标题">
                        <el-input v-model="form.search_title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="链接">
                        <url-value v-model="form.search_link"></url-value>
                    </el-form-item>
                </template>
                <template v-if="(form.style_radio == 'search' && form.style_type == 'location') || form.style_radio == 'location'">
                    <el-form-item label="定位方式">
                        <el-radio-group v-model="form.location" class="ml-4">
                            <el-radio value="store">门店</el-radio>
                            <el-radio value="user_location">用户位置</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </template>
                <template v-if="form.style_radio == 'search' && form.style_type == 'logo'">
                    <el-form-item label="logo图">
                        <upload v-model="form.logo" :limit="1" size="60"></upload>
                    </el-form-item>
                </template>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">搜索内容</div>
                <el-form-item label="提示文字">
                    <el-input v-model="form.tips" placeholder="请输入提示文字"></el-input>
                </el-form-item>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">搜索热词</div>
                <drag :data="form.hot_word_list" @remove="remove" @on-sort="on_sort">
                    <template #default="scoped">
                        <el-input v-model="scoped.row.value" placeholder="请输入搜索热词" />
                        <color-picker v-model="scoped.row.color" :default-color="'#000000'" @update:value="search_color_change($event, scoped.row)"></color-picker>
                    </template>
                </drag>
                <el-button class="mt-20 mb-20 w" @click="add">+添加</el-button>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math } from "@/utils";
interface Props {
    value: search_content;
}
const props = withDefaults(defineProps<Props>(), {
    value: () => ({
        style_radio: 'search',
        style_type: 'title',
        logo: '',
        search_title: '',
        search_link: '',
        location: 'store',
        tips: '',
        hot_word_list: [
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                value: '',
                color: '#000000',
            }
        ],
    })
});

const state = reactive({
    form: props.value
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

const add = () => {
    form.value.hot_word_list.push({
        id: get_math(),
        value: '',
        color: '#000000',
    });
};
const remove = (index: number) => {
    form.value.hot_word_list.splice(index, 1);
};
// 拖拽更新之后，更新数据
const on_sort = (new_list: hot_word_list[]) => {
    form.value.hot_word_list = new_list;
}
const search_color_change = (color: string, old_hot_word: hot_word_list) => {
    const index = form.value.hot_word_list.findIndex(item => item.id == old_hot_word.id);
    (<arrayIndex>form.value.hot_word_list)[index].color = color;
}
</script>
<style lang="scss" scoped>
</style>
