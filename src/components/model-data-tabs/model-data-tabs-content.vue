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
                                        <el-input v-else v-model="row.title" placeholder="请输入标题文字" clearable />
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
                                            <el-radio value="goods" @click="radio_click('goods', index)">商品</el-radio>
                                            <el-radio value="article" @click="radio_click('article', index)">文章</el-radio>
                                            <el-radio value="custom" @click="radio_click('custom', index)">自定义</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-tabs v-model="row.tabs_name" class="content-tabs" @tab-change="tabs_change">
                                        <el-tab-pane label="内容设置" name="content">
                                            <component :is="getContentComponent(row.tabs_data_type)" v-bind="getContentProps(row)"></component>
                                        </el-tab-pane>
                                        <el-tab-pane label="样式设置" name="styles">
                                            <component :is="getStylesComponent(row.tabs_data_type)" v-bind="getStylesProps(row)"></component>
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
// 引入需要的组件
import defaultDataGoodsContent from '@/components/common/data-tabs-common/goods/data-goods-content.vue';
import defaultDataArticleContent from '@/components/common/data-tabs-common/article/data-article-content.vue';
import defaultDataCustomContent from '@/components/common/data-tabs-common/data-custom-content.vue';
import defaultDataGoodsStyles from '@/components/common/data-tabs-common/goods/data-goods-styles.vue';
import defaultDataArticleStyles from '@/components/common/data-tabs-common/article/data-article-styles.vue';
import defaultDataCustomStyles from '@/components/model-custom/model-custom-styles.vue';

import { cloneDeep } from 'lodash';
import { article_default_parameter, goods_default_parameter } from "@/config/const/data-tabs";
import defaultCustom from '@/config/const/custom';
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
const arry_list = form.value.tabs_list;
// 历史数据处理
arry_list.forEach((item: any) => {
    item.tabs_name = `content`;
    if (item.tabs_data_type == 'goods') {
        item.article_config = cloneDeep(article_default_parameter);
        item.custom_config = cloneDeep(defaultCustom);
    } else if (item.tabs_data_type == 'article') {
        item.goods_config = cloneDeep(goods_default_parameter);
        item.custom_config = cloneDeep(defaultCustom);
    } else if (item.tabs_data_type == 'custom') {
        item.goods_config = cloneDeep(goods_default_parameter);
        item.article_config = cloneDeep(article_default_parameter);
    }
})
const getConfig = (tabs_data_type: string, row: any, ) => {
    switch (tabs_data_type) {
        case 'goods':
            return row.goods_config || {};
        case 'article':
            return row.article_config || {};
        case 'custom':
            return row.custom_config || {};
        default:
            return {};
    }
}

const getContentComponent = computed(() => {
    return (tabs_data_type: string) => {
        switch (tabs_data_type) {
            case 'goods':
                return defaultDataGoodsContent;
            case 'article':
                return defaultDataArticleContent;
            case 'custom':
                return defaultDataCustomContent;
            default:
                return defaultDataGoodsContent; // 默认组件
        }
    }
})
const getContentProps = computed(() => {
    return (row: any) => {
        const config = getConfig(row.tabs_data_type, row);
        return {
            value: config.content,
            tabStyle: config.style,
            ...(row.tabs_data_type == 'custom' ? { isSubcomponent: true } : {})
        };
    }
});

const getStylesComponent = computed(() => {
    return (tabs_data_type: string) => {
        switch (tabs_data_type) {
            case 'goods':
                return defaultDataGoodsStyles;
            case 'article':
                return defaultDataArticleStyles;
            case 'custom':
                return defaultDataCustomStyles;
            default:
                return defaultDataGoodsStyles; // 默认组件
        }
    }
})
const getStylesProps = computed(() => {
    return (row: any) => {
        const config = getConfig(row.tabs_data_type, row);
        return {
            value: config.style,
            content: config.content,
            ...(row.tabs_data_type == 'custom' ? { isCommonStyle: false } : {})
        };
    }
});
// 层级太深了，导致radio切换出现问题，所以需要在每个里边加一个点击事件
const radio_click = (val: any, index: number) => {
    nextTick(() => {
        form.value.tabs_list[index].tabs_data_type = val;
    })
}
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
        tabs_data_type: 'goods',
        tabs_name: 'content',
        goods_config: cloneDeep(goods_default_parameter),
        article_config: cloneDeep(article_default_parameter),
        custom_config: cloneDeep(defaultCustom)
    });
    form.value.tabs_active_index = form.value.tabs_list.length - 1;
};
const tabs_theme_change = (val: string | number | boolean | undefined): void => {
    styles.value.tabs_color_checked = tabs_style(styles.value.tabs_color_checked, val);
};
const is_immersion_model = computed(() => common_store.is_immersion_model);

const tabs_change = (val: string | number | boolean | undefined) => {
    console.log(val);
}
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
.tabs-animation {
    transition: 0.8s ease;
}
</style>
