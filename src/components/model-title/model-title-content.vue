<template>
    <div class="w h">
        <el-form :model="form" label-width="80">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">标题设置</div>
                <el-form-item label="标题名字">
                    <el-input v-model="form.title" placeholder="请输入标题" clearable></el-input>
                </el-form-item>
                <el-form-item label="标题链接">
                    <url-value v-model="form.title_link"></url-value>
                </el-form-item>
                <el-form-item label="标题居中">
                    <el-switch v-model="form.is_title_center" active-value="1" inactive-value="0"/>
                </el-form-item>
                <el-form-item label="图片/图标">
                    <upload v-model="form.img_src" v-model:icon-value="form.icon_class" is-icon :limit="1" size="50"></upload>
                </el-form-item>
                <el-form-item label="副标题">
                    <el-input v-model="form.subtitle" placeholder="请输入副标题" clearable></el-input>
                </el-form-item>
                <el-form-item label="副标题居中">
                    <el-switch v-model="form.is_subtitle_center" active-value="1" inactive-value="0"/>
                </el-form-item>
                <el-form-item label="标题同行">
                    <el-switch v-model="form.title_line" active-value="1" inactive-value="0" />
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">关键字设置</div>
                <el-form-item label="关键字">
                    <el-switch v-model="form.keyword_show" active-value="1" inactive-value="0"/>
                </el-form-item>
                <template v-if="form.keyword_show == '1'">
                    <drag :data="form.keyword_list" type="card" :space-col="25" @remove="remove" @on-sort="on_sort">
                        <template #default="scoped">
                            <div class="flex-col align-c jc-s gap-20 flex-1">
                                <el-form-item label="名称" label-width="40" class="w mb-0">
                                    <el-input v-model="scoped.row.title" placeholder="请输入标题" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="链接" label-width="40" class="w mb-0">
                                    <url-value v-model="scoped.row.link"></url-value>
                                </el-form-item>
                                <el-form-item label="状态" label-width="40" class="w mb-0">
                                    <el-switch v-model="scoped.row.is_show" active-value="1" inactive-value="0"></el-switch>
                                </el-form-item>
                            </div>
                        </template>
                    </drag>
                    <el-button class="mt-20 mb-20 w" @click="add">+添加</el-button>
                </template>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">更多设置</div>
                <el-form-item label="右侧按钮">
                    <el-switch v-model="form.right_show" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <template v-if="form.right_show == '1'">
                    <el-form-item label="右侧文字">
                        <el-input v-model="form.right_title" placeholder="请输入标题" clearable></el-input>
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
import { get_math } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});

const state = reactive({
    form: props.value,
});
const { form } = toRefs(state);
const add = () => {
    form.value.keyword_list.push({
        id: get_math(),
        notice_title: '',
        notice_link: '',
        is_show: '1',
    });
};
const remove = (index: number) => {
    form.value.keyword_list.splice(index, 1);
};

// 拖拽更新之后，更新数据
const on_sort = (new_list: nav_group[]) => {
    form.value.keyword_list = new_list;
};
</script>
<style lang="scss" scoped>
:deep(.size-12.cr-9.mt-10) {
    display: none;
}
.tips {
    color: $cr-info-dark;
}
</style>
