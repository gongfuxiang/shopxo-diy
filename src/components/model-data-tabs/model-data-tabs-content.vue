<template>
    <div class="content">
        <el-form :model="form" label-width="60" class="m-h">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">选项卡设置</div>
                <el-form-item label="置顶">
                    <div class="flex-row align-c gap-10">
                        <el-switch v-model="form.tabs_top_up" active-value="1" inactive-value="0" :disabled="is_immersion_model" />
                        <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="<span>1.开启沉浸样式时，选项卡置顶功能禁用</span><br/><span>2.滑动置顶仅手机端有效</span>" raw-content placement="top">
                            <icon name="miaosha-hdgz" size="12" color="#999"></icon>
                        </el-tooltip>
                    </div>
                </el-form-item>
                <el-form-item label="风格">
                    <el-radio-group v-model="form.tabs_theme" @change="tabs_theme_change">
                        <el-radio v-for="item in base_list.tabs_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.tabs_theme == '3'" label="选中图标">
                    <upload v-model="form.tabs_adorn_img" v-model:icon-value="form.tabs_adorn_icon" is-icon :limit="1" size="50"></upload>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">选项卡设置</div>
                <div class="nav-list">
                    <drag :data="form.tabs_list" type="card" icon-position="top" :space-col="20" @click="tabs_list_click" @remove="tabs_list_remove" @on-sort="tabs_list_sort">
                        <template #default="{ row, index }">
                            <div class="flex-col w">
                                <el-form-item label="显示类型" class="w mb-10">
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
                                <template v-if="form.tabs_active_index == index">
                                    <el-form-item v-if="form.tabs_theme == '4'" label="上传图片">
                                        <upload v-model="row.img" :limit="1" size="40" styles="2"></upload>
                                    </el-form-item>
                                    <el-form-item v-if="form.tabs_theme == '1'" label="简介配置">
                                        <el-input v-model="row.desc" placeholder="请输入简介" clearable />
                                    </el-form-item>
                                    <el-form-item label="数据类型">
                                        <el-radio-group v-model="row.tabs_data_type">
                                            <el-radio value="goods">商品</el-radio>
                                            <el-radio value="article">文章</el-radio>
                                            <el-radio value="custom">自定义</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-tabs v-model="row.tabs_name" class="content-tabs">
                                        <el-tab-pane label="内容设置" name="content">
                                            <div v-show="row.tabs_data_type == 'goods'">
                                                <goods-content :value="row.goods_config.content" :tab-style="row.goods_config.style"></goods-content>
                                            </div>
                                            <div v-show="row.tabs_data_type == 'article'">
                                                <goods-content :value="row.goods_config.content" :tab-style="row.goods_config.style"></goods-content>
                                            </div>
                                            <div v-show="row.tabs_data_type == 'custom'">
                                                <goods-content :value="row.goods_config.content" :tab-style="row.goods_config.style"></goods-content>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="样式设置" name="styles">
                                            <div v-show="row.tabs_data_type == 'goods'">
                                                <goods-style :value="row.goods_config.style" :content="row.goods_config.content"></goods-style>
                                            </div>
                                            <div v-show="row.tabs_data_type == 'article'">
                                                <goods-style :value="row.goods_config.style" :content="row.goods_config.content"></goods-style>
                                            </div>
                                            <div v-show="row.tabs_data_type == 'custom'">
                                                <goods-style :value="row.goods_config.style" :content="row.goods_config.content"></goods-style>
                                            </div>
                                        </el-tab-pane>
                                    </el-tabs>
                                </template>
                            </div>
                        </template>
                    </drag>
                    <el-button class="mtb-20 w" @click="tabs_add">+添加</el-button>
                </div>
            </card-container>
            <div class="divider-line"></div>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">角标设置</div>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from 'lodash';
import { get_math, tabs_style } from '@/utils';
import { commonStore } from '@/store';
const common_store = commonStore();

const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    tabStyle: {
        type: Object,
        default: () => ({}),
    },
    defaultConfig: {
        type: Object,
        default: () => ({
            // 图片不同风格下的圆角
            img_radius_0: 4,
            img_radius_1: 0,
        }),
    },
});
const state = reactive({
    form: props.value,
    styles: props.tabStyle,
});
// 如果需要解构，确保使用toRefs
const { form, styles } = toRefs(state);

const base_list = reactive({
    tabs_style_list: [
        { name: '样式一', value: '0' },
        { name: '样式二', value: '1' },
        { name: '样式三', value: '2' },
        { name: '样式四', value: '3' },
        { name: '样式五', value: '4' },
    ],
    product_list: [
        { name: '指定商品', value: '0' },
        { name: '筛选商品', value: '1' },
    ]
});
const emits = defineEmits(['theme_change']);
const tabs_list_click = (item: any, index: number) => {
    form.value.tabs_active_index = index;
};
// 选项卡设置
const tabs_list_remove = (index: number) => {
    if (form.value.tabs_list.length > 1) {
        form.value.tabs_list.splice(index, 1);
        if (form.value.tabs_list.length > index) {
            form.value.tabs_active_index = index;
        } else {
            form.value.tabs_active_index = index - 1;
        }
    } else {
        form.value.tabs_active_index = 0;
        ElMessage.warning('至少保留一个选项卡');
    }
};
const tabs_list_sort = (item: any) => {
    form.value.tabs_list = item;
};
const tabs_add = () => {
    form.value.tabs_list.push({
        id: get_math(),
        tabs_type: '0', 
        tabs_img: [], 
        tabs_icon: '',
        title: '',
        img: [],
        desc: '',
        data_type: '0',
        category: [],
        data_ids: [],
        number: 4,
        order_by_type: '0',
        order_by_rule: '0',
        data_list: [],
    });
    form.value.tabs_active_index = form.value.tabs_list.length - 1;
};
const tabs_theme_change = (val: string | number | boolean | undefined): void => {
    styles.value.tabs_color_checked = tabs_style(styles.value.tabs_color_checked, val);
};
const is_immersion_model = computed(() => common_store.is_immersion_model);
watchEffect(() => {
    if (is_immersion_model.value) {
        form.value.tabs_top_up = '0';
    }
});
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    .content-height {
        min-height: calc(100vh - 38.2rem);
    }
}
.number-show {
    :deep(.el-input__wrapper .el-input__inner) {
        text-align: left;
    }
}
</style>
