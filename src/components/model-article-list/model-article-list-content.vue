<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.theme" @change="theme_change">
                        <el-radio v-for="item in base_list.theme_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.theme == '4'" label="轮播列数">
                    <el-radio-group v-model="form.carousel_col">
                        <el-radio v-for="item in base_list.carousel_col_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container class="card-container-br">
                <div class="mb-12">文章设置</div>
                <el-form-item label="读取方式">
                    <el-radio-group v-model="form.data_type">
                        <el-radio v-for="item in base_list.data_type_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="form.data_type === '0'">
                    <div class="nav-list">
                        <drag-group :list="form.data_list" img-params="cover" @onsort="data_list_sort" @remove="data_list_remove"></drag-group>
                        <el-button class="mtb-20 w" @click="add">+添加</el-button>
                    </div>
                </template>
                <template v-else>
                    <el-form-item label="文章分类">
                        <el-select v-model="form.category_ids" multiple collapse-tags placeholder="请选择文章分类">
                            <el-option v-for="item in base_list.article_category_list" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="显示数量">
                        <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
                    </el-form-item>
                    <el-form-item label="排序类型">
                        <el-radio-group v-model="form.order_by_type">
                            <el-radio v-for="item in base_list.sort_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排序规则">
                        <el-radio-group v-model="form.order_by_rule">
                            <el-radio v-for="item in base_list.order_by_rule_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="封面图片">
                        <el-switch v-model="form.is_cover" active-value="1" inactive-value="0" />
                    </el-form-item>
                </template>
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
        <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['article']" multiple @update:model-value="url_value_dialog_call_back"></url-value-dialog>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import { commonStore } from '@/store';
const common_store = commonStore();
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    styles: {
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
// 默认值
const state = reactive({
    form: props.value,
    data: props.styles,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
const base_list = reactive({
    theme_list: [
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
const theme_change = (val: any) => {
    if (val == '3' || val == '4') {
        form.value.field_show = ['1'];
    } else {
        form.value.field_show = ['0', '1'];
    }
    if (val == '0') {
        if (data.value.img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.img_radius.radius = props.defaultConfig.img_radius_0;
            data.value.img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
            data.value.img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
            data.value.img_radius.radius_top_left = props.defaultConfig.img_radius_0;
            data.value.img_radius.radius_top_right = props.defaultConfig.img_radius_0;
        }
    } else {
        if (data.value.img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.img_radius.radius = props.defaultConfig.img_radius_1;
            data.value.img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
            data.value.img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
            data.value.img_radius.radius_top_left = props.defaultConfig.img_radius_1;
            data.value.img_radius.radius_top_right = props.defaultConfig.img_radius_1;
        }
    }
};

const data_list_remove = (index: number) => {
    form.value.data_list.splice(index, 1);
};
const data_list_sort = (item: any) => {
    form.value.data_list = item;
};
const add = () => {
    url_value_dialog_visible.value = true;
};
// 开启关闭链接
const url_value_dialog_visible = ref(false);
const url_value_dialog_call_back = (item: any[]) => {
    item.forEach((child: any) => {
        form.value.data_list.push({
            id: get_math(),
            new_title: '',
            new_cover: [],
            data: child,
        });
    });
};
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
