<template>
    <div class="w h">
        <el-form :model="form" label-width="70">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.notice_style" @change="change_style">
                        <el-radio value="inherit">样式一</el-radio>
                        <el-radio value="card">样式二</el-radio>
                        <el-radio value="marquee">样式三</el-radio>
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
                    <template v-if="is_marquee">
                        <el-form-item label="全部显示">
                            <el-switch v-model="form.is_full_display" active-value="1" inactive-value="0"></el-switch>
                        </el-form-item>
                        <template v-if="form.is_full_display !== '1'">
                            <el-form-item label="开启滚动">
                                <el-switch v-model="form.marquee_scroll" active-value="1" inactive-value="0"></el-switch>
                            </el-form-item>
                            <el-form-item v-if="form.marquee_scroll === '1'" label="间隔时间">
                                <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                            </el-form-item>
                        </template>
                    </template>
                    <template v-else>
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
                <template v-if="is_marquee">
                    <el-form-item label="公告内容" class="mb-0">
                        <el-input
                            v-model="form.marquee_content"
                            type="textarea"
                            :rows="3"
                            placeholder="请输入公告文字"
                            clearable
                        ></el-input>
                    </el-form-item>
                </template>
                <template v-else>
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
    noticeStyle: {
        type: Object,
        default: () => {},
    },
});

const is_card = computed(() => form.value.notice_style == 'card');
const is_marquee = computed(() => form.value.notice_style == 'marquee');
const is_text = computed(() => form.value.title_type == 'text');

const state = reactive({
    form: props.value,
    new_style: props.noticeStyle,
});
const { form, new_style } = toRefs(state);

if (form.value.marquee_content == null || form.value.marquee_content === undefined) {
    form.value.marquee_content = '';
}
if (form.value.marquee_scroll == null || form.value.marquee_scroll === undefined) {
    form.value.marquee_scroll = '1';
}
if (form.value.is_full_display == null || form.value.is_full_display === undefined) {
    form.value.is_full_display = '1';
}

const INHERIT_PADDING = {
    padding: 0,
    padding_top: 0,
    padding_right: 10,
    padding_bottom: 0,
    padding_left: 10,
};

const CARD_PADDING = {
    padding: 15,
    padding_top: 15,
    padding_right: 15,
    padding_bottom: 15,
    padding_left: 15,
};

const sync_marquee_from_list = () => {
    const t = String(form.value.marquee_content ?? '').trim();
    if (t) return;
    const row = form.value.notice_list?.find((i: { is_show?: string; notice_title?: string }) => i.is_show == '1' && String(i.notice_title ?? '').trim());
    if (row?.notice_title) {
        form.value.marquee_content = String(row.notice_title).trim();
    }
};

/** 原地更新内边距，避免替换对象导致 padding 组件持有旧引用 */
const apply_container_padding = (patch: Record<string, number>) => {
    if (!new_style.value.container_padding) {
        new_style.value.container_padding = { ...patch };
        return;
    }
    Object.assign(new_style.value.container_padding, patch);
};

/** 样式三：全部显示时上下 14，关闭时上下 0；左右保持 10 */
const sync_marquee_padding = () => {
    const tb = form.value.is_full_display === '1' ? 14 : 0;
    const cp = new_style.value.container_padding || {};
    apply_container_padding({
        padding: 0,
        padding_top: tb,
        padding_right: cp.padding_right ?? 10,
        padding_bottom: tb,
        padding_left: cp.padding_left ?? 10,
    });
};

const change_style = (val: string | number | boolean | undefined) => {
    if (val === 'marquee') {
        sync_marquee_padding();
        sync_marquee_from_list();
        // 仅切换到样式三时统一左侧图标为喇叭，样式一/二不改动
        form.value.icon_class = 'speaker';
    } else if (val === 'inherit') {
        apply_container_padding(INHERIT_PADDING);
    } else {
        apply_container_padding(CARD_PADDING);
    }
};

watch(
    () => form.value.is_full_display,
    () => {
        if (is_marquee.value) {
            sync_marquee_padding();
        }
    }
);
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

const on_sort = (new_list: nav_group[]) => {
    form.value.notice_list = new_list;
};

onMounted(() => {
    if (is_marquee.value) {
        sync_marquee_from_list();
        sync_marquee_padding();
    }
});
</script>
<style lang="scss" scoped>
:deep(.size-12.cr-9.mt-10) {
    display: none;
}
.tips {
    color: $cr-info-dark;
}
</style>
