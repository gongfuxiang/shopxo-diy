<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container class="mb-8">
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <theme-select v-model="form.theme" :data="base_list.themeList"></theme-select>
                </el-form-item>
            </card-container>
            <card-container class="common-content-height">
                <div class="mb-12">优惠券数据</div>
                <el-form-item label="数据来源">
                    <el-radio-group v-model="form.data_type">
                        <el-radio v-for="item in base_list.data_type_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="form.data_type === '0'">
                    <el-form-item label="手动选择">
                        <div class="flex-col gap-20 w">
                            <drag v-if="form.data_list.length > 0" :data="form.data_list" :space-col="20" @remove="remove" @on-sort="on_sort">
                                <template #default="{ row }">
                                    <div class="flex-1 cr-6 size-12">{{ row.title }}</div>
                                </template>
                            </drag>
                            <el-button class="w" @click="add">+添加</el-button>
                        </div>
                    </el-form-item>
                </template>
                <template v-else>
                    <slider></slider>
                </template>
                <el-form-item label="内容标题">
                    <el-input v-model="form.title" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="内容描述">
                    <el-input v-model="form.desc" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                </el-form-item>
            </card-container>
        </el-form>
    </div>
    <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['article']" multiple @update:model-value="url_value_dialog_call_back"></url-value-dialog>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});
const form = reactive(props.value);
const url_value_dialog_visible = ref(false);
const base_list = reactive({
    data_type_list: [
        { name: '默认', value: '0' },
        { name: '手动', value: '1' },
    ],
    themeList: [
        // { name: '风格1', url: new URL(`../../assets/images/components/model-coupon/theme-1.png`, import.meta.url).href },
        // { name: '风格2', url: new URL(`../../assets/images/components/model-coupon/theme-2.png`, import.meta.url).href },
        // { name: '风格3', url: new URL(`../../assets/images/components/model-coupon/theme-3.png`, import.meta.url).href },
        // { name: '风格3', url: new URL(`../../assets/images/components/model-coupon/theme-3.png`, import.meta.url).href },
        // { name: '风格4', url: new URL(`../../assets/images/components/model-coupon/theme-4.png`, import.meta.url).href },
        // { name: '风格5', url: new URL(`../../assets/images/components/model-coupon/theme-5.png`, import.meta.url).href },
        // { name: '风格6', url: new URL(`../../assets/images/components/model-coupon/theme-6.png`, import.meta.url).href },
        // { name: '风格7', url: new URL(`../../assets/images/components/model-coupon/theme-7.png`, import.meta.url).href },
    ],
});
const remove = (index: number) => {
    form.data_list.splice(index, 1);
};
const on_sort = (item: any) => {
    form.data_list = item;
};
const add = () => {
    url_value_dialog_visible.value = true;
};
const url_value_dialog_call_back = (item: any[]) => {
    item.forEach((child: any) => {
        form.data_list.push(child);
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
