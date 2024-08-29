<template>
    <div class="auxiliary-line common-content-height">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="导航样式">
                    <el-radio-group v-model="form.nav_style" class="ml-4">
                        <el-radio value="image_with_text">图片加文字</el-radio>
                        <el-radio value="image">图片</el-radio>
                        <el-radio value="text">文字</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="单行显示">
                    <el-radio-group v-model="form.single_line" class="ml-4">
                        <el-radio :value="3">3个</el-radio>
                        <el-radio :value="4">4个</el-radio>
                        <el-radio :value="5">5个</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="展示样式">
                    <el-radio-group v-model="form.display_style" class="ml-4">
                        <el-radio value="fixed">固定显示</el-radio>
                        <el-radio value="slide">分页滑动</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.display_style === 'slide'" label="显示行数">
                    <el-radio-group v-model="form.row" class="ml-4">
                        <el-radio :value="1">1行</el-radio>
                        <el-radio :value="2">2行</el-radio>
                        <el-radio :value="3">3行</el-radio>
                        <el-radio :value="4">4行</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">内容设置</div>
                <div class="tips mt-10 mb-20 size-12">最多添加{{ form.nav_content_list.length }}张图片，建议尺寸90*90px</div>
                <drag :data="form.nav_content_list" type="card" :space-col="27" @remove="remove" @on-sort="on_sort">
                    <template #default="scoped">
                        <div class="flex-row align-c jc-c">
                            <upload v-model="scoped.row.nav_image" :limit="1" size="72"></upload>
                            <div class="flex-col align-c jc-c gap-20">
                                <el-form-item label="标题" class="mb-0" label-width="50">
                                    <el-input v-model="scoped.row.title" placeholder="请输入标题" maxlength="4" show-word-limit></el-input>
                                </el-form-item>
                                <el-form-item label="链接" class="w mb-0" label-width="50">
                                    <url-value v-model="scoped.row.title_link"></url-value>
                                </el-form-item>
                            </div>
                        </div>
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
    value: nav_group_content;
}
const props = withDefaults(defineProps<Props>(),{
    value: () => ({
        display_style: 'fixed',
        nav_style: 'image_with_text',
        single_line: 4,
        row: 1,
        nav_content_list: [
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                nav_image: [],
                title: '',
                title_link: '',
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                nav_image: [],
                title: '',
                title_link: '',
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                nav_image: [],
                title: '',
                title_link: '',
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                nav_image: [],
                title: '',
                title_link: '',
            }
        ]
    })
});

const state = reactive({
    form: props.value
});
const { form } = toRefs(state);
const add = () => {
    form.value.nav_content_list.push({
        id: get_math(),
        nav_image: [],
        title: '',
        title_link: '',
    });
}
const remove = (index: number) => {
    form.value.nav_content_list.splice(index, 1);
}
// 拖拽更新之后，更新数据
const on_sort = (new_list: nav_group[]) => {
    form.value.nav_content_list = new_list;
}
</script>
<style lang="scss" scoped>
:deep(.size-12.cr-9.mt-10) {
    display: none;
}
.tips {
    color: $cr-info-dark;
}
</style>
