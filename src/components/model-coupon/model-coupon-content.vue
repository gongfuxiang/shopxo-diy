<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <theme-select v-model="form.theme" :data="base_list.themeList" @update:model-value="themeChange"></theme-select>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container class="content-height">
                <div class="mb-12">优惠券数据</div>
                <!-- 数据筛选组件, 根据数据源类型显示不同的筛选组件 -->
                <data-filter type="coupon" :value="form" :list="form.data_list" :base-list="base_list" @add="add" @data_list_replace="data_list_replace" @data_list_remove="data_list_remove" @data_list_sort="data_list_sort"></data-filter>
            </card-container>
        </el-form>
    </div>
    <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['coupon']" :multiple="url_value_multiple_bool" @update:model-value="url_value_dialog_call_back"></url-value-dialog>
</template>
<script setup lang="ts">
import { online_url, is_obj_empty, get_data_list, get_math } from '@/utils';
import { commonStore } from '@/store';
const common_store = commonStore();
/**
 * @description: 文章选项卡列表（内容）
 * @param value{Object} 内容数据
 * @param styles{Object} 样式数据
 * @param defaultConfig{Object} 默认配置
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    styles: {
        type: Object,
        default: () => {},
    },
    defaultConfig: {
        type: Object,
        default: () => {},
    },
});
const form = ref(props.value);
const url_value_dialog_visible = ref(false);
const new_url = ref('');
const base_list = reactive({
    data_type_list: [
        { name: '手动', value: '0' },
        { name: '自动', value: '1' },
    ],
    themeList: Array.from({ length: 7 }, (_, index) => ({
        id: String(index + 1),
        name: `风格${index + 1}`,
        url: `${new_url.value}theme-${index + 1}.png`,
    })),
    type_list: [] as select_2[],
});
onMounted(async () => {
    // 获取图片地址
    new_url.value = await online_url('/static/plugins/coupon/images/diy/').then((res) => res);
    // 添加图片地址
    base_list.themeList.forEach((item) => {
        item.url = `${new_url.value}${item.url}`;
    });
    nextTick(() => {
        // 定时获取common_store.common.article_category的数据，直到拿到值或者关闭页面为止
        if (!is_obj_empty(common_store.common.plugins) && !is_obj_empty(common_store.common.plugins.coupon) && common_store.common.plugins.coupon.type_list.length > 0) {
            base_list.type_list = common_store.common.plugins.coupon.type_list;
        }
    });
});
const emit = defineEmits(['update:change-theme']);
// 触发主题切换事件
const themeChange = (val: string) => {
    emit('update:change-theme', val);
};
// 移除
const data_list_remove = (index: number) => {
    form.value.data_list.splice(index, 1);
};
// 排序
const data_list_sort = (item: any) => {
    form.value.data_list = item;
};
const url_value_multiple_bool = ref(true);
const data_list_replace_index = ref(0);
const data_list_replace = (index: number) => {
    data_list_replace_index.value = index;
    url_value_multiple_bool.value = false;
    url_value_dialog_visible.value = true;
};
const add = () => {
    url_value_multiple_bool.value = true;
    url_value_dialog_visible.value = true;
};
// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
    if (url_value_multiple_bool.value) {
        item.forEach((item: any) => {
            form.value.data_list.push({
                id: get_math(),
                new_cover: [],
                new_title: '',
                data: item,
            });
        });
    } else {
        form.value.data_list[data_list_replace_index.value] = {
            id: get_math(),
            new_cover: form.value.data_list[data_list_replace_index.value]?.new_cover || [],
            new_title: '',
            data: item[0],
        };
    }
};
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    .content-height {
        min-height: calc(100vh - 31.8rem);
    }
}
</style>
