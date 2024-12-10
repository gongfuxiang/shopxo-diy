<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <theme-select v-model="form.theme" :data="base_list.themeList" @update:model-value="themeChange"></theme-select>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container class="content-height">
                <div class="mb-12">优惠券数据</div>
                <el-form-item label="数据来源">
                    <el-radio-group v-model="form.data_type">
                        <el-radio v-for="item in base_list.data_type_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="form.data_type === '1'">
                    <el-form-item label="手动选择">
                        <div class="flex-col gap-20 w">
                            <drag v-if="form.data_list.length > 0" :data="form.data_list" :space-col="20" @remove="remove" @on-sort="on_sort">
                                <template #default="{ row }">
                                    <div class="flex-1 cr-6 size-12">{{ row.name }}</div>
                                </template>
                            </drag>
                            <el-button class="w" @click="add">+添加</el-button>
                        </div>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="类型">
                        <el-select v-model="form.type" multiple collapse-tags filterable placeholder="请选择优惠券类型">
                            <el-option v-for="item in base_list.coupon_type_list" :key="item.value" :label="item.name" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="展示数量">
                        <slider v-model="form.number"></slider>
                    </el-form-item>
                </template>
                <template v-if="form.theme === '4'">
                    <el-form-item label="内容标题">
                        <el-input v-model="form.title" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="内容描述">
                        <el-input v-model="form.desc" type="textarea" :rows="4" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                </template>
            </card-container>
        </el-form>
    </div>
    <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['coupon']" multiple @update:model-value="url_value_dialog_call_back"></url-value-dialog>
</template>
<script setup lang="ts">
import { online_url, is_obj_empty } from '@/utils';
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
        { name: '自动', value: '0' },
        { name: '手动', value: '1' },
    ],
    themeList: Array.from({ length: 7 }, (_, index) => ({
        id: String(index + 1),
        name: `风格${index + 1}`,
        url: `${new_url.value}theme-${index + 1}.png`,
    })),
    coupon_type_list: [] as select_2[],
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
        if (!is_obj_empty(common_store.common.plugins) && !is_obj_empty(common_store.common.plugins.coupon) && common_store.common.plugins.coupon.coupon_type_list.length > 0) {
            base_list.coupon_type_list = common_store.common.plugins.coupon.coupon_type_list;
        }
    });
});
const emit = defineEmits(['update:change-theme']);
// 触发主题切换事件
const themeChange = (val: string) => {
    emit('update:change-theme', val);
};
// 移除
const remove = (index: number) => {
    form.value.data_list.splice(index, 1);
};
// 排序
const on_sort = (item: any) => {
    form.value.data_list = item;
};
// 新增
const add = () => {
    url_value_dialog_visible.value = true;
};
// 弹窗回调
const url_value_dialog_call_back = (item: any[]) => {
    item.forEach((child: any) => {
        form.value.data_list.push(child);
    });
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
