<template>
    <div class="content">
        <el-form :model="form" label-width="74" class="m-h">
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="选项卡置顶">
                    <div class="flex-row align-c gap-10">
                        <el-switch v-model="form.tabs_top_up" active-value="1" inactive-value="0" :disabled="is_immersion_model" />
                        <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="<span>开启沉浸样式时，选项卡置顶功能禁用</span>" raw-content placement="top">
                            <icon name="miaosha-hdgz" size="12" color="#999"></icon>
                        </el-tooltip>
                    </div>
                </el-form-item>
                <el-form-item label="选项卡风格">
                    <el-radio-group v-model="form.tabs_theme" @change="tabs_theme_change">
                        <el-radio v-for="item in base_list.tabs_theme_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="文章风格">
                    <el-radio-group v-model="form.article_theme" @change="article_theme_change">
                        <el-radio v-for="item in base_list.article_theme_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.article_theme == '4'" label="轮播列数">
                    <el-radio-group v-model="form.article_carousel_col">
                        <el-radio v-for="item in base_list.carousel_col_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">选项卡设置</div>
                <div class="nav-list">
                    <drag :data="form.tabs_list" type="card" icon-position="top" :space-col="20" @click="tabs_list_click" @remove="tabs_list_remove" @on-sort="tabs_list_sort">
                        <template #default="{ row, index }">
                            <div class="flex-col w">
                                <el-form-item label="显示标题">
                                    <el-input v-model="row.title" placeholder="请输入标题文字" clearable />
                                </el-form-item>
                                <template v-if="form.tabs_active_index == index">
                                    <el-form-item v-if="form.tabs_theme == '1'" label="简介配置">
                                        <el-input v-model="row.desc" placeholder="请输入简介" clearable />
                                    </el-form-item>
                                    <el-form-item label="读取方式">
                                        <el-radio-group v-model="row.data_type">
                                            <el-radio v-for="item in base_list.data_type_list" :key="item.value + get_math()" :value="item.value">{{ item.name }}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <template v-if="row.data_type === '0'">
                                        <div class="nav-list">
                                            <drag-group :list="row.data_list" img-params="cover" @onsort="data_list_sort($event, index)" @remove="data_list_remove($event, index)" @replace="data_list_replace"></drag-group>
                                            <el-button class="mtb-20 w" @click="article_add(index)">+添加</el-button>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <el-form-item label="文章分类">
                                            <el-select v-model="row.category_ids" multiple collapse-tags placeholder="请选择文章分类">
                                                <el-option v-for="item in base_list.article_category_list" :key="item.id" :label="item.name" :value="item.id" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="显示数量">
                                            <el-input-number v-model="row.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="排序类型">
                                            <el-radio-group v-model="row.order_by_type">
                                                <el-radio v-for="item in base_list.sort_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="排序规则">
                                            <el-radio-group v-model="row.order_by_rule">
                                                <el-radio v-for="item in base_list.order_by_rule_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="封面图片">
                                            <el-switch v-model="row.is_cover" active-value="1" inactive-value="0" />
                                        </el-form-item>
                                    </template>
                                </template>
                            </div>
                        </template>
                    </drag>
                    <el-button class="mtb-20 w" @click="tabs_add">+添加</el-button>
                </div>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">列表设置</div>
                <el-form-item label="是否显示">
                    <el-checkbox-group v-model="form.field_show">
                        <el-checkbox v-for="item in base_list.field_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </card-container>
        </el-form>
        <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['article']" :multiple="url_value_multiple_bool" @update:model-value="url_value_dialog_call_back"></url-value-dialog>
    </div>
</template>
<script setup lang="ts">
import { get_math, tabs_style } from '@/utils';
import ArticleAPI from '@/api/article';
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
const form = reactive(props.value);
const base_list = reactive({
    tabs_theme_list: [
        { name: '样式一', value: '0' },
        { name: '样式二', value: '1' },
        { name: '样式三', value: '2' },
        { name: '样式四', value: '3' },
    ],
    article_theme_list: [
        { name: '单列展示', value: '0' },
        { name: '两列展示（纵向）', value: '1' },
        { name: '大图展示', value: '2' },
        { name: '无图模式', value: '3' },
        { name: '左右滑动展示', value: '4' },
    ],
    carousel_col_list: [
        { name: '单列展示', value: '0' },
        { name: '两列展示', value: '1' },
        { name: '三列展示', value: '2' },
        { name: '四列展示', value: '3' },
    ],
    data_type_list: [
        { name: '选择文章', value: '0' },
        { name: '筛选文章', value: '1' },
    ],
    article_category_list: [] as select_1[],
    sort_list: [
        { name: '综合', value: '0' },
        { name: '时间', value: '1' },
        { name: '浏览量', value: '2' },
    ],
    order_by_rule_list: [
        { name: '降序（desc）', value: '0' },
        { name: '升序（asc）', value: '1' },
    ],
    field_show_list: [
        { name: '日期时间', value: '0' },
        { name: '浏览量', value: '1' },
    ],
});
onMounted(() => {
    nextTick(() => {
        // 定时获取common_store.common.article_category的数据，直到拿到值或者关闭页面为止
        if (common_store.common.article_category.length > 0) {
            base_list.article_category_list = common_store.common.article_category;
        }
    });
});
const article_theme_change = (val: any) => {
    if (val == '3' || val == '4') {
        form.field_show = ['1'];
    } else {
        form.field_show = ['0', '1'];
    }
    if (val == '0') {
        if (styles.img_radius.radius == props.defaultConfig.img_radius_0 || (styles.img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && styles.img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && styles.img_radius.radius_top_left == props.defaultConfig.img_radius_1 && styles.img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            styles.img_radius.radius = props.defaultConfig.img_radius_0;
            styles.img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
            styles.img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
            styles.img_radius.radius_top_left = props.defaultConfig.img_radius_0;
            styles.img_radius.radius_top_right = props.defaultConfig.img_radius_0;
        }
    } else {
        if (styles.img_radius.radius == props.defaultConfig.img_radius_0 || (styles.img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && styles.img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && styles.img_radius.radius_top_left == props.defaultConfig.img_radius_1 && styles.img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            styles.img_radius.radius = props.defaultConfig.img_radius_1;
            styles.img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
            styles.img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
            styles.img_radius.radius_top_left = props.defaultConfig.img_radius_1;
            styles.img_radius.radius_top_right = props.defaultConfig.img_radius_1;
        }
    }
};

// 开启关闭链接
const url_value_dialog_visible = ref(false);
const tabs_list_click = (item: any, index: number) => {
    form.tabs_active_index = index;
};
// 选项卡设置
const tabs_list_remove = (index: number) => {
    if (form.tabs_list.length > 1) {
        form.tabs_list.splice(index, 1);
        if (form.tabs_list.length > index) {
            form.tabs_active_index = index;
        } else {
            form.tabs_active_index = index - 1;
        }
    } else {
        form.tabs_active_index = 0;
        ElMessage.warning('至少保留一个选项卡');
    }
};
const tabs_list_sort = (item: any) => {
    // 拖拽完成后更新数组
    form.tabs_list = item;
};

const tabs_add = () => {
    form.tabs_list.push({
        id: get_math(),
        title: '',
        desc: '',
        data_type: '0',
        category: [],
        number: 4,
        order_by_type: '0',
        order_by_rule: '0',
        is_cover: '1',
        data_list: [],
    });
    // emit('update:value', form);
};

// 指定文章
const data_list_remove = (index: number, article_index: number) => {
    form.tabs_list[article_index].data_list.splice(index, 1);
};
const data_list_sort = (item: any, index: number) => {
    form.tabs_list[index].data_list = item;
};

const url_value_multiple_bool = ref(true);
const data_list_replace_index = ref(0);
const data_list_replace = (index: number) => {
    data_list_replace_index.value = index;
    url_value_multiple_bool.value = false;
    url_value_dialog_visible.value = true;
};

const article_index = ref(0);
const article_add = (index: number) => {
    url_value_multiple_bool.value = true;
    url_value_dialog_visible.value = true;
    article_index.value = index;
};
const url_value_dialog_call_back = (item: any[]) => {
    if (url_value_multiple_bool.value) {
        // console.log(item);
        item.forEach((child: any) => {
            form.tabs_list[article_index.value].data_list.push({
                id: get_math(),
                new_title: '',
                new_cover: [],
                data: child,
            });
        });
    } else {
        form.tabs_list[article_index.value].data_list[data_list_replace_index.value] = {
            id: get_math(),
            new_title: '',
            new_cover: [],
            data: item[0],
        };
    }
};

const styles = reactive(props.tabStyle);
const tabs_theme_change = (val: string | number | boolean | undefined): void => {
    styles.tabs_color_checked = tabs_style(styles.tabs_color_checked, val);
};
const is_immersion_model = computed(() => common_store.is_immersion_model);
watchEffect(() => {
    if (is_immersion_model.value) {
        form.tabs_top_up = '0';
    }
});
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
}
.img {
    width: 4rem;
    height: 4rem;
}
.number-show {
    :deep(.el-input__wrapper .el-input__inner) {
        text-align: left;
    }
}
</style>
