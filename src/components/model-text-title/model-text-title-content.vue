<template>
    <div class="auxiliary-line common-content-height">
        <el-form :model="form" label-width="70">
            <card-container class="mb-8">
                <div class="mb-12">标题设置</div>
                <el-form-item label="标题名字">
                    <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="标题链接">
                    <url-value v-model="form.title_link"></url-value>
                </el-form-item>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">关键字设置</div>
                <el-form-item label="关键字">
                    <el-radio-group v-model="form.keyword_show" class="ml-4">
                        <el-radio :value="true">显示</el-radio>
                        <el-radio :value="false">隐藏</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="form.keyword_show">
                    <drag :data="form.keyword_list" type="card" :space-col="25" @remove="remove" @on-sort="on_sort">
                        <template #default="scoped">
                            <div class="flex-col align-c jc-s gap-20 flex-1">
                                <el-form-item label="名称" label-width="40" class="w mb-0">
                                    <el-input v-model="scoped.row.title" placeholder="请输入标题"></el-input>
                                </el-form-item>
                                <el-form-item label="链接" label-width="40" class="w mb-0">
                                    <url-value v-model="scoped.row.link"></url-value>
                                </el-form-item>
                                <el-form-item label="状态" label-width="40" class="w mb-0">
                                    <el-switch v-model="scoped.row.is_show"></el-switch>
                                </el-form-item>
                            </div>
                        </template>
                    </drag>
                    <el-button class="mt-20 mb-20 w" @click="add">+添加</el-button>
                </template>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">更多设置</div>
                <el-form-item label="右侧按钮">
                    <el-radio-group v-model="form.right_show" class="ml-4">
                        <el-radio :value="true">显示</el-radio>
                        <el-radio :value="false">隐藏</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="form.right_show">
                    <el-form-item label="右侧文字">
                        <el-input v-model="form.right_title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="链接">
                        <url-value v-model="form.right_link"></url-value>
                    </el-form-item>
                </template>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math } from "@/utils";
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
    form.value.keyword_list.push({
        id: get_math(),
        notice_title: '',
        notice_link: '',
        is_show: true
    })
}
const remove = (index: number) => {
    form.value.keyword_list.splice(index, 1);
}

// 拖拽更新之后，更新数据
const on_sort = (new_list: nav_group[]) => {
    form.value.keyword_list = new_list;
}
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
:deep(.size-12.cr-9.mt-10) {
    display: none;
}
.tips {
    color: $cr-info-dark;
}
</style>
