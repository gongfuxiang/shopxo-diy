<template>
    <div class="w h">
        <el-form :model="form" label-width="70">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.notice_style">
                        <el-radio value="inherit">样式一</el-radio>
                        <el-radio value="card">样式二</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">公告风格</div>
                <el-form-item label="标题类型">
                    <el-radio-group v-model="form.title_type">
                        <el-radio value="img-icon">图片/图标</el-radio>
                        <el-radio value="text">文字</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="!is_text" label="上传图片">
                    <upload v-model="form.img_src" v-model:icon-value="form.icon_class" is-icon :limit="1" size="50"></upload>
                </el-form-item>
                <el-form-item v-if="is_text" label="标题文字">
                    <el-input v-model="form.title" placeholder="请输入标题" maxlength="30" clearable></el-input>
                </el-form-item>
                <template v-if="!is_card">
                    <el-form-item label="滚动方式">
                        <el-radio-group v-model="form.direction">
                            <el-radio value="vertical">上下滚动</el-radio>
                            <el-radio value="horizontal">左右滚动</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="间隔时间">
                        <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                    </el-form-item>
                </template>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">按钮设置</div>
                <el-form-item label="右侧按钮">
                    <el-switch v-model="form.is_right_button" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <template v-if="form.is_right_button != '0'">
                    <el-form-item label="右侧文字">
                        <el-input v-model="form.right_title" placeholder="请输入标题" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="链接">
                        <url-value v-model="form.more_link"></url-value>
                    </el-form-item>
                </template>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">内容设置</div>
                <drag :data="form.notice_list" type="card" :space-col="25" @remove="remove" @on-sort="on_sort">
                    <template #default="scoped">
                        <div class="flex-col align-c jc-s gap-20 flex-1">
                            <el-form-item label="标题" class="w mb-0" label-width="40">
                                <el-input v-model="scoped.row.notice_title" placeholder="请输入标题" maxlength="100" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="链接" class="w mb-0" label-width="40">
                                <url-value v-model="scoped.row.notice_link"></url-value>
                            </el-form-item>
                            <el-form-item label="状态" class="w mb-0" label-width="40">
                                <el-switch v-model="scoped.row.is_show" active-value="1" inactive-value="0"></el-switch>
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

const is_card = computed(() => form.value.notice_style == 'card');
const is_text = computed(() => form.value.title_type == 'text');

const state = reactive({
    form: props.value,
});
const { form } = toRefs(state);
const add = () => {
    form.value.notice_list.push({
        id: get_math(),
        notice_title: '',
        notice_link: {},
        is_show: '1',
    });
};
const remove = (index: number) => {
    form.value.notice_list.splice(index, 1);
};

// 拖拽更新之后，更新数据
const on_sort = (new_list: nav_group[]) => {
    form.value.notice_list = new_list;
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
