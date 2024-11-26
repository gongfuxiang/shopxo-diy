<template>
    <div class="container">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="导航样式">
                    <el-radio-group v-model="form.nav_style" is-button @change="nav_style_change">
                        <el-radio value="0">图片加文字</el-radio>
                        <el-radio value="1">图片</el-radio>
                        <el-radio value="2">文字</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="导航类型">
                    <el-radio-group v-model="form.nav_type" is-button @change="nav_type_change">
                        <el-radio value="0">底部固定</el-radio>
                        <el-radio value="1">底部悬浮</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12 flex-row gap-10 jc-sb">
                    <div>导航内容</div>
                    <div class="flex-row gap-20 align-c">
                        <div v-if="!config.sync_bool" class="cr-primary c-pointer" @click="sync_sys_event">同步到系统</div>
                        <div class="cr-primary c-pointer" @click="reset_event">恢复默认</div>
                    </div>
                </div>
                <div class="size-12 cr-c mb-20">图片建议宽高80*80,鼠标拖拽左侧圆点可调整导航顺序</div>
                <div class="nav-list">
                    <drag :data="form.nav_content" type="card" :space-col="20" @remove="nav_content_remove" @on-sort="on_sort">
                        <template #default="{ row }">
                            <div class="w">
                                <el-form-item label="图标" label-width="45">
                                    <div class="flex-col jc-c align-c mr-12">
                                        <upload v-model="row.img" :limit="1" :size="44" :styles="1" :dialog-position-top="footerDialogPositionTop"></upload>
                                        <text class="cr-9 size-12">未选中</text>
                                    </div>
                                    <div class="flex-col jc-c align-c">
                                        <upload v-model="row.img_checked" :limit="1" :size="44" :styles="1" :dialog-position-top="footerDialogPositionTop"></upload>
                                        <text class="cr-9 size-12">选中</text>
                                    </div>
                                </el-form-item>
                                <el-form-item label="名称" label-width="45">
                                    <el-input v-model="row.name" placeholder="请输入名称" clearable />
                                </el-form-item>
                                <el-form-item label="链接" label-width="45">
                                    <url-value v-model="row.link" :dialog-position-top="footerDialogPositionTop"></url-value>
                                </el-form-item>
                            </div>
                        </template>
                    </drag>
                    <el-button class="mtb-20 w" @click="add">+添加</el-button>
                </div>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { get_math } from '@/utils';
import DiyAPI from '@/api/tabbar';
import defaultFooterNav from '@/config/const/footer-nav';
const app = getCurrentInstance();
/**
 * @description: 底部导航（内容）
 * @param value{Object} 传过来的数据，用于数据渲染
 * @param footerStyle{Object} 底部导航样式
 * @param footerDialogPositionTop{Number} 底部导航弹窗样式
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    footerStyle: {
        type: Object,
        default: () => {},
    },
    footerDialogPositionTop: {
        type: Number,
        default: 0,
    },
    config: {
        type: Object,
        default: () => {},
    },
});
const form = ref(props.value);
const emit = defineEmits(['update:value']);
// 导航样式change事件
const nav_style_change = (style: any) => {
    form.value.nav_style = style;
    emit('update:value', form.value);
};
// 导航类型change事件
const nav_type_change = (type: any) => {
    form.value.nav_type = type;
    emit('update:value', form.value);
};
// data_list移除事件
const nav_content_remove = (index: number) => {
    form.value.nav_content.splice(index, 1);
    emit('update:value', form.value);
};
// 拖拽排序事件
const on_sort = (item: any) => {
    form.value.nav_content = item;
};
// 添加导航
const add = () => {
    form.value.nav_content.push({
        id: get_math(),
        name: '',
        img: [],
        img_checked: [],
        link: {},
    });
    emit('update:value', form.value);
};
// 同步到系统
const sync_sys_event = () => {
    const new_form = {
        content: form.value,
        style: props.footerStyle,
    };
    const clone_form = cloneDeep(new_form);
    const new_data = {
        type: 'home',
        config: clone_form,
    };
    app?.appContext.config.globalProperties.$common.message_box('将数据同步到系统底部菜单，确定继续吗？', 'warning').then(() => {
        DiyAPI.saveTabbar(new_data).then((res: any) => {
            ElMessage.success('同步成功');
        });
    });
};
// 恢复默认数据
const reset_event = () => {
    const clone_data = cloneDeep(defaultFooterNav);
    form.value.nav_content = clone_data.content.nav_content;
    emit('update:value', form.value);
};
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>
