<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container class="mb-8">
                <div class="mb-12">展示设置</div>
                <el-form-item label="是否展示">
                    <el-checkbox-group v-model="form.config">
                        <el-checkbox v-for="(item, index) in base_info_list" :key="index" :value="item.value">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">图标设置</div>
                <div class="size-12 cr-c mb-20">图片建议宽高80*80；鼠标拖拽左侧圆点可调整导航顺序</div>
                <div class="nav-list">
                    <drag :data="form.icon_setting" :space-col="20" @remove="icon_setting_remove" @on-sort="icon_setting_sort">
                        <template #default="{ row }">
                            <upload v-model="row.img" v-model:icon-value="row.icon" is-icon type="img" :limit="1" :styles="2" :size="30"></upload>
                            <url-value v-model="row.link"></url-value>
                        </template>
                    </drag>
                    <el-button class="mtb-20 w" @click="add">+添加</el-button>
                </div>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
/**
 * @description: 用户信息（内容）
 * @param value{Object} 内容数据
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});
const form = reactive(props.value);
const emit = defineEmits(['update:value']);
const base_info_list = reactive([
    { name: '订单总数', value: 'order_count' },
    { name: '商品收藏', value: 'goods_favor_count' },
    { name: '我的足迹', value: 'goods_browse_count' },
    { name: '我的积分', value: 'integral_number' },
    { name: 'ID', value: 'number_code' },
]);
const icon_setting_remove = (index: number) => {
    form.icon_setting.splice(index, 1);
};
const icon_setting_sort = (item: any) => {
    form.icon_setting = item;
};
const add = () => {
    form.icon_setting.push({
        id: get_math(),
        img: [],
        icon: '',
        link: {},
    });
    emit('update:value', form);
};
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
}
</style>
