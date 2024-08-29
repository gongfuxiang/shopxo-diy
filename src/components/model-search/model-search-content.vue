<template>
    <div class="w h">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="图标样式" class="align-s">
                    <div class="flex-col w h gap-10">
                        <el-switch v-model="form.is_icon_show" />
                        <template v-if="form.is_icon_show">
                            <upload v-model="form.icon_img_src" v-model:icon-value="form.icon_class" is-icon :limit="1" size="50"></upload>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="提示文字">
                    <div class="flex-col gap-10 w">
                        <el-switch v-model="form.is_tips_show" />
                        <el-input v-if="form.is_tips_show" v-model="form.tips" placeholder="请输入提示文字"></el-input>
                    </div>
                </el-form-item>
                <el-form-item v-if="form.is_tips_show || form.is_icon_show" label="是否居中">
                    <el-switch v-model="form.is_center" />
                </el-form-item>
                <el-form-item label="搜索按钮" class="align-s">
                    <div class="flex-col w h gap-10">
                        <el-switch v-model="form.is_search_show" />
                        <template v-if="form.is_search_show">
                            <el-radio-group v-model="form.search_type" class="ml-4">
                                <el-radio value="img-icon">图片/图标</el-radio>
                                <el-radio value="text">文字</el-radio>
                            </el-radio-group>
                            <template v-if="form.search_type === 'img-icon'">
                                <upload v-model="form.search_botton_src" v-model:icon-value="form.search_botton_icon" is-icon :limit="1" size="50"></upload>
                            </template>
                            <template v-else>
                                <el-input v-model="form.search_tips" placeholder="请输入文字内容"></el-input>
                            </template>
                        </template>
                    </div>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
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
import { get_math } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});

const state = reactive({
    form: props.value,
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
interface hot_word_list {
    id: string;
    value: string;
    color: string;
}
// 拖拽更新之后，更新数据
const on_sort = (new_list: hot_word_list[]) => {
    form.value.hot_word_list = new_list;
};
const search_color_change = (color: string, old_hot_word: hot_word_list) => {
    const index = form.value.hot_word_list.findIndex((item: { id: string; }) => item.id == old_hot_word.id);
    (<arrayIndex>form.value.hot_word_list)[index].color = color;
};
</script>
<style lang="scss" scoped></style>
