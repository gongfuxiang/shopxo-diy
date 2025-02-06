<template>
    <card-container class="card-container">
        <div class="mb-12">显示内容</div>
        <el-form-item label="是否显示">
            <el-checkbox-group v-model="form.is_show">
                <el-checkbox v-for="item in base_list.list_show_list.filter(item => item.type.includes(form.theme))" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="form.is_show.includes('simple_desc')" label="简述行数">
            <el-radio-group v-model="form.simple_desc_row">
                <el-radio v-for="item in base_list.shopping_simple_desc_row" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="['0', '1', '2'].includes(form.theme)" label="价格独行">
            <el-switch v-model="form.is_price_solo" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
    </card-container>
    <div class="divider-line data-tabs-line" />
    <card-container class="card-container">
        <div class="mb-12">购物车设置</div>
        <el-form-item label="是否显示">
            <el-switch v-model="form.is_shop_show" active-value="1" inactive-value="0" ></el-switch>
        </el-form-item>
        <el-form-item label="按钮样式">
            <div class="flex-col w gap-10">
                <el-radio-group v-model="form.shop_type" @change="change_shop_type">
                    <el-radio v-for="item in base_list.shopping_button_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                </el-radio-group>
                <template v-if="form.shop_type == 'text'">
                    <el-input v-model="form.shop_button_text" placeholder="请输入按钮文字" clearable></el-input>
                </template>
                <template v-else>
                    <upload v-model:icon-value="form.shop_button_icon_class" :is-delete="false" is-icon type="icon" :limit="1" size="50"></upload>
                </template>
            </div>
        </el-form-item>
        <el-form-item label="按钮效果">
            <el-radio-group v-model="form.shop_button_effect">
                <el-radio v-for="item in base_list.shopping_cart_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
    </card-container>
</template>

<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});

const state = reactive({
    form: props.value,
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);
const base_list = {
    list_show_list: [
        { name: '商品名称', value: 'title', type:['0', '1', '2', '3', '4', '5', '6']},
        { name: '商品简述', value: 'simple_desc', type:['0', '1', '2', '3', '5'] },
        { name: '商品标签', value: 'plugins_view_icon', type:['0', '1', '2'] },
        { name: '商品售价', value: 'price', type:['0', '1', '2', '3', '4', '5', '6'] },
        { name: '商品销量', value: 'sales_count', type:['0', '1', '2'] },
        // { name: '商品评分', value: '4' },
        { name: '商品原价', value: 'original_price', type:['0', '1', '2'] },
        { name: '售价单位', value: 'price_unit', type:['0', '1', '2', '3', '4', '5', '6'] },
        { name: '原价单位', value: 'original_price_unit', type:['0', '1', '2'] },
    ],
    shopping_button_list: [
        { name: '文字', value: 'text' },
        { name: '图标', value: 'icon' },
    ],
    shopping_cart_list: [
        { name: '进入商品详情页', value: '0' },
        { name: '商品加购', value: '1' }
    ],
    shopping_simple_desc_row: [
        { name: '一行', value: '1' },
        { name: '两行', value: '2' }
    ]
};
const emit = defineEmits(['change_shop_type']);
const change_shop_type = () => {
    emit('change_shop_type');
}
</script>

<style lang="scss" scoped>
.shopping_button {
    height: 2.7rem;
    line-height: 2.7rem;
}
.shopping_button_all {
    height: 4.7rem;
    box-sizing: border-box;
}
.button-checked {
    width: 0;
    height: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    border: 1.1rem solid #000;
    border-color: transparent $cr-primary $cr-primary transparent;
    .iconfont {
        width: 1rem;
        height: 2.1rem;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        font-weight: bold;
    }
}
:deep(.el-checkbox-group .el-checkbox){
    margin-right: 2rem;
}
</style>