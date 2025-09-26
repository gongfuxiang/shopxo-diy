<template>
    <div class="common-content-height">
        <el-form :model="form" label-width="60">
            <template v-if="!isNest">
                <common-content-top :value="form.content_top"></common-content-top>
                <div class="divider-line"></div>
            </template>
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.tabs_theme" @change="tabs_theme_change">
                        <el-radio value="0">样式一</el-radio>
                        <el-radio value="2">样式二</el-radio>
                        <el-radio value="3">样式三</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.tabs_theme == '3'" label="选中图标">
                    <upload v-model="form.tabs_adorn_img" v-model:icon-value="form.tabs_adorn_icon" is-icon :limit="1" size="50"></upload>
                </el-form-item>
                <el-form-item label="对齐方式">
                    <el-radio-group v-model="form.justification" @change="tabs_theme_change">
                        <el-radio value="left">居左</el-radio>
                        <el-radio value="center">居中</el-radio>
                        <el-radio value="right">居右</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="更多按钮">
                    <el-switch v-model="form.show_more" class="mr-10" active-value="1" inactive-value="0" />
                </el-form-item>
                <el-form-item label="滑动置顶">
                    <el-switch v-model="form.tabs_top_up" class="mr-10" active-value="1" inactive-value="0" />
                    <tooltip :content="`1.滑动置顶仅手机端有效${ isNest ? '<br/>2.滑动置顶后通用的圆角不生效' : ''}`"></tooltip>
                </el-form-item>
                <template v-if="isNest">
                    <el-form-item v-if="is_general_safe_distance" label="安全距离">
                        <el-switch v-model="form.is_tabs_safe_distance" class="mr-10" active-value="1" inactive-value="0" />
                        <tooltip content="选项卡是否支持安全距离"></tooltip>
                    </el-form-item>
                    <el-form-item label="轮播背景">
                        <el-switch v-model="form.rotating_background" class="mr-10" active-value="1" inactive-value="0" />
                        <tooltip content="1.关闭的时候,如果没有选项卡背景会使用通用背景.<br/>2.打开的时候,如果没有选项卡背景会使用轮播背景,都没有的时候会使用通用背景"></tooltip>
                    </el-form-item>
                </template>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">选项卡设置</div>
                <div class="flex-col gap-x-20">
                    <div :class="`card-background box-shadow-sm ptb-25 flex-row gap-16 re align-c ${ form.tabs_active_index == 0 ? 'model-type-index-select' : ''}`" @click="tabs_list_click('home', 0)">
                        <el-icon class="iconfont icon-jinzhi size-16 cursor-move" />
                        <div class="flex-col gap-10 w">
                            <el-form-item label="显示类型" class="w mb-0">
                                <div class="flex-col gap-10 w h">
                                    <el-radio-group v-model="form.home_data.tabs_type">
                                        <el-radio value="0">文本</el-radio>
                                        <el-radio value="1">图片/图标</el-radio>
                                    </el-radio-group>
                                    <template v-if="form.home_data.tabs_type == '1'">
                                        <upload v-model="form.home_data.tabs_img" v-model:icon-value="form.home_data.tabs_icon" is-icon :limit="1" size="50"></upload>
                                    </template>
                                    <template v-else>
                                        <el-input v-model="form.home_data.title" placeholder="请输入标题文字" clearable />
                                    </template>
                                </div>
                            </el-form-item>
                            <sliding-fixed v-model="form.home_data.is_sliding_fixed" @sliding_fixed_change="sliding_fixed_change($event, 0, 'home_data')"></sliding-fixed>
                        </div>
                    </div>
                    <drag :data="form.tabs_list" type="card" model-type="tabs" :model-index="form.tabs_active_index - 1" :space-col="25" @click="tabs_list_click" @remove="remove" @on-sort="on_sort">
                        <template #default="{ row, index }">
                            <div class="flex-col align-c jc-s gap-20 flex-1 w">
                                <el-form-item label="数据类型" class="w mb-0">
                                    <div class="flex-col gap-10 w h">
                                        <el-radio-group v-model="row.tabs_type">
                                            <el-radio value="0">文本</el-radio>
                                            <el-radio value="1">图片/图标</el-radio>
                                        </el-radio-group>
                                        <template v-if="row.tabs_type == '1'">
                                            <upload v-model="row.tabs_img" v-model:icon-value="row.tabs_icon" is-icon :limit="1" size="50"></upload>
                                        </template>
                                        <template v-else>
                                            <el-input v-model="row.title" placeholder="请输入标题文字" clearable />
                                        </template>
                                    </div>
                                </el-form-item>
                                <sliding-fixed v-model="row.is_sliding_fixed" class="mb-0" @sliding_fixed_change="sliding_fixed_change($event, index, 'tabs_list')"></sliding-fixed>
                                <el-form-item label="链接类型" class="w mb-0">
                                    <el-radio-group v-model="row.data_type">
                                        <el-radio v-if="page_link_diy_show" value="0">DIY页面</el-radio>
                                        <el-radio value="1">商品分类</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item :label="row.data_type == '0' ? 'DIY页面' : '商品分类'" class="w mb-0">
                                    <template v-if="row.data_type == '0'">
                                        <url-value v-model="row.micro_page_list" :type="['diy']"></url-value>
                                    </template>
                                    <template v-else>
                                        <url-value v-model="row.classify" :type="['goods-category']"></url-value>
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
import { isEmpty } from 'lodash';
import { commonStore } from '@/store';
const common_store = commonStore();

const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    tabStyle: {
        type: Object,
        default: () => ({}),
    },
    isNest: {
        type: Boolean,
        default: false,
    },
});

const state = reactive({
    form: props.value,
    styles: props.tabStyle,
});
const { form, styles } = toRefs(state);
// 判断diy页面是否显示
const page_link_diy_show = computed(() => common_store.common.page_link_list.some(item => item.is_show == '1' && item.type == 'diy' && !isEmpty(item.url)));

onBeforeMount(() => {
    if (form.value.tabs_list.length > 1) {
        form.value.tabs_list.forEach((item: any) => {
            item.is_sliding_fixed = !isEmpty(item.is_sliding_fixed) ? item.is_sliding_fixed : '0';
            item.tabs_img = !isEmpty(item.tabs_img) ? item.tabs_img : [];
            item.tabs_icon = !isEmpty(item.tabs_icon) ? item.tabs_icon : '';
            item.tabs_type = !isEmpty(item.tabs_type) ?  item.tabs_type : '0';
        });
    }
    form.value.home_data.is_sliding_fixed = !isEmpty(form.value.home_data.is_sliding_fixed) ? form.value.home_data.is_sliding_fixed : '0';
});

const add = () => {
    form.value.tabs_list.push({
        id: get_math(),
        tabs_type: '0', 
        tabs_img: [], 
        tabs_icon: '',
        title: '',
        desc: '',
        data_type: '0',
        classify: {},
        micro_page: '',
        micro_page_list: {},
        category_list: {},
    });
    form.value.tabs_active_index = form.value.tabs_list.length;
};
const remove = (index: number) => {
    form.value.tabs_list.splice(index, 1);
    if (form.value.tabs_list.length > index) {
        form.value.tabs_active_index = index + 1;
    } else {
        form.value.tabs_active_index = index;
    }
};
// 选项卡点击事件
const tabs_list_click = (item: any, index: number) => { 
    if (item == 'home') {
        form.value.tabs_active_index = index;
    } else {
        form.value.tabs_active_index = index + 1;
    }
}
// 拖拽更新之后，更新数据
const on_sort = (new_list: nav_group[]) => {
    form.value.tabs_list = new_list;
};
const tabs_theme_change = (val: string | number | boolean | undefined): void => {
    styles.value.tabs_color_checked = tabs_style(styles.value.tabs_color_checked, val);
};
const sliding_fixed_change = (val: string | number | boolean, index: number, type: string) => {
    const home_data_is_sliding_fixed = form.value.home_data.is_sliding_fixed == '1';
    const tabs_list_is_sliding_fixed = form.value.tabs_list.findIndex((item: any, index1: number) => item.is_sliding_fixed == '1' && index != index1);
    // 如果是选中的话，判断是否其他选项卡是否选中，如果有的话，就将其他选项卡设置为0
    if (val == '1' && ( home_data_is_sliding_fixed || tabs_list_is_sliding_fixed != -1)) {
        // 如果是首页的话，直接将选项卡的数据全部设置为0
        if (type == 'home_data') {
            form.value.tabs_list.forEach((item: any) => {
                item.is_sliding_fixed = '0';
            });
        } else {
            // 如果是其他的话，将首页的数据全部设置为0，不符合当前index也设置为0
            form.value.home_data.is_sliding_fixed = '0';
            form.value.tabs_list.forEach((item: any, index1: number) => {
                if (index != index1) {
                    item.is_sliding_fixed = '0';
                }
            });
        }
    }
}
// 选项卡是否设置安全距离
const is_general_safe_distance = computed(() => common_store.is_general_safe_distance);
watchEffect(() => {
    if (!is_general_safe_distance.value) {
        form.value.is_tabs_safe_distance = '0';
    }
});
</script>
<style lang="scss" scoped>
.cursor-move {
    color: #ddd;
    cursor: move;
}
.mb-0 {
    margin-bottom: 0 !important;
}
.card-background {
    background: #fff;
    padding-left: 1.6rem;
    padding-right: 2rem;
}
</style>
