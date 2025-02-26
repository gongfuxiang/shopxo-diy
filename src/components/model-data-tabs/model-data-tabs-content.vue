<template>
    <div class="content">
        <el-form :model="form" label-width="60" class="m-h">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">选项卡设置</div>
                <el-form-item label="对齐方式">
                    <el-radio-group v-model="form.justification" @change="tabs_theme_change">
                        <el-radio value="left">居左</el-radio>
                        <el-radio value="center">居中</el-radio>
                        <el-radio value="right">居右</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="置顶">
                    <div class="flex-row align-c gap-10">
                        <el-switch v-model="form.tabs_top_up" active-value="1" inactive-value="0" />
                        <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="<span>滑动置顶仅手机端有效</span>" raw-content placement="top">
                            <icon name="miaosha-hdgz" size="12" color="#999"></icon>
                        </el-tooltip>
                    </div>
                </el-form-item>
                <template v-if="form.tabs_top_up == '1' && is_not_general_safe_distance">
                    <el-form-item label="安全距离">
                        <div class="flex-row align-c gap-10">
                            <el-switch v-model="form.is_general_safe_distance" active-value="1" inactive-value="0" />
                            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="<span>选项卡置顶是否需要安全距离</span>" raw-content placement="top">
                                <icon name="miaosha-hdgz" size="12" color="#999"></icon>
                            </el-tooltip>
                        </div>
                    </el-form-item>
                </template>
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
                    <drag :data="form.tabs_list" type="card" icon-position="top" :space-col="20" multiple-icons @click="tabs_list_click" @remove="tabs_list_remove" @copy="tabs_list_copy" @on-sort="tabs_list_sort">
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
                                <sliding-fixed v-model="row.is_sliding_fixed" @sliding_fixed_change="sliding_fixed_change($event, index)"></sliding-fixed>
                                <template v-if="form.tabs_active_index == index">
                                    <el-form-item v-if="form.tabs_theme == '4'" label="上传图片">
                                        <upload v-model="row.img" :limit="1" size="40" styles="2"></upload>
                                    </el-form-item>
                                    <el-form-item v-if="form.tabs_theme == '1'" label="简介配置">
                                        <el-input v-model="row.desc" placeholder="请输入简介" clearable />
                                    </el-form-item>
                                    <el-form-item label="数据类型">
                                        <el-radio-group v-model="row.tabs_data_type">
                                            <el-radio v-for="(item, index1) in base_list.tabs_data_type_list" :key="index1" :value="item.value" @click="radio_click(item.value, index)">{{ item.label }}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-tabs v-model="row.tabs_name" class="content-tabs" @tab-change="tabs_change(index)">
                                        <el-tab-pane label="内容设置" name="content">
                                            <div class="data-tabs-style">
                                                <component :is="getContentComponent(row.tabs_data_type)" v-bind="getContentProps(row)"></component>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="样式设置" name="styles">
                                            <div class="data-tabs-style">
                                                <component :is="getStylesComponent(row.tabs_data_type)" v-bind="getStylesProps(row)"></component>
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

import { cloneDeep, isEmpty } from 'lodash';
import { article_default_parameter, goods_default_parameter } from "@/config/const/data-tabs";
import defaultCustom from '@/config/const/custom';
import { get_math, tabs_style } from '@/utils';
import { commonStore } from '@/store';
const common_store = commonStore();
// 默认数据
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
    ],
    tabs_data_type_list: [
        { label: '商品', value: 'goods',},
        { label: '文章', value: 'article',},
        { label: '自定义', value: 'custom',},
    ]
});

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
    item.is_sliding_fixed = !isEmpty(item.is_sliding_fixed) ? item.is_sliding_fixed : '0';
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
//#region 组件数据渲染
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
//#endregion
const emits = defineEmits(['theme_change', 'set_offset_top']);
//#region 获取offsetTop的位置
// 获取offsetTop的位置
const set_offset_top = (index: number) => {
    setTimeout(() => {
        const elements = Array.from(document.querySelectorAll('.nav-list .flex.gap-y-16.re'));
        if (elements && elements.length > 0) {
            elements.forEach((element: any, index1: number) => {
                if (index == index1) {
                    const offsetTop = element.offsetTop;
                    if (offsetTop != null) {
                        emits('set_offset_top', offsetTop);
                    }
                }
            })
        }
    }, 0)
}
// 选项卡点击
const tabs_list_click = (item: any, index: number) => {
    if (form.value.tabs_active_index !== index) {
        set_offset_top(index);
    }
    form.value.tabs_active_index = index;
};
// 选项卡中的tab切换
const tabs_change = (index: number) => {
    set_offset_top(index);
}
//#endregion
//#region 选项卡数据设置
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
    set_offset_top(form.value.tabs_active_index);
};
// 选项卡复制
const tabs_list_copy = (index: number) => {
    const data = {
        ...cloneDeep(form.value.tabs_list[index]),
        is_sliding_fixed: '0',
        tabs_name: 'content',
        title: (form.value.tabs_list[index]?.title || '') + '(复制)',
    };
    const new_index = index + 1;
    form.value.tabs_list.splice(new_index, 0, data);
    form.value.tabs_active_index = new_index;
    set_offset_top(new_index);
};
// 选项卡排序
const tabs_list_sort = (item: any) => {
    form.value.tabs_list = item;
};
// 添加选项卡
const tabs_add = () => {
    form.value.tabs_list.push({
        id: get_math(),
        tabs_type: '0', 
        tabs_img: [], 
        tabs_icon: '',
        is_sliding_fixed: '0',
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
    set_offset_top(form.value.tabs_active_index);
};
const tabs_theme_change = (val: string | number | boolean | undefined): void => {
    styles.value.tabs_color_checked = tabs_style(styles.value.tabs_color_checked, val);
};
/**
 * 处理滑动固定状态变化的函数
 * 当某个标签页的滑动固定状态发生变化时，确保同时只有一个标签页被设置为滑动固定
 * 
 * @param val 新的滑动固定状态值，可以是字符串、数字或布尔值
 * @param index 当前标签页的索引
 */
 const sliding_fixed_change = (val: string | number | boolean, index: number) => {
    // 查找除当前标签页外，其他标签页中是否已有滑动固定的
    const tabs_list_is_sliding_fixed = form.value.tabs_list.findIndex((item: any, index1: number) => item.is_sliding_fixed == '1' && index != index1);
    // 如果当前标签页的滑动固定状态为'1'，且已存在其他滑动固定的标签页
    if (val == '1' && tabs_list_is_sliding_fixed != -1) {
        // 遍历所有标签页，将其他标签页的滑动固定状态设置为'0'
        form.value.tabs_list.forEach((item: any, index1: number) => {
            if (index != index1) {
                item.is_sliding_fixed = '0';
            }
        });
    }
}
// #endregion
// 沉浸模式下是否设置安全距离
const is_not_general_safe_distance = computed(() => common_store.is_immersion_model && !common_store.is_general_safe_distance);
watchEffect(() => {
    if (!is_not_general_safe_distance.value) {
        form.value.is_general_safe_distance = '0';
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
