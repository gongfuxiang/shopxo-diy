<template>
    <card-container class="card-container-br">
        <div class="mb-12">显示内容</div>
        <el-form-item label="是否显示">
            <el-checkbox-group v-model="form.is_show">
                <el-checkbox v-for="item in base_list.list_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="价格独行">
            <el-switch v-model="form.is_price_solo"></el-switch>
        </el-form-item>
    </card-container>
    <card-container>
        <div class="mb-12">购物车设置</div>
        <el-form-item label="是否显示">
            <el-switch v-model="form.is_shop_show"></el-switch>
        </el-form-item>
        <el-form-item label="按钮样式" class="align-c">
            <div class="flex-row align-c jc-s gap-20 shopping_button_all">
                <div v-for="item in base_list.shopping_button_list" :key="item.value" :class="['pa-10 re', { 'br-c br-primary radius-sm': shop_type(item) }]" @click="shopping_button_click(item)">
                    <template v-if="item.value == '0'">
                        <div :class="['pl-13 pr-13 round size-12 bg-primary cr-f shopping_button', {'disabled': ['3','4','5'].includes(form.product_style) }]">{{ item.name }}</div>
                    </template>
                    <template v-else-if="item.value == '1'">
                        <div :class="['pl-13 pr-13 round size-12 bg-primary cr-f shopping_button', {'disabled': ['3','4','5'].includes(form.product_style) }]">{{ item.name }}</div>
                    </template>
                    <template v-else-if="item.value == '2'">
                        <icon class="shopping_button round pl-6 pr-6 bg-primary " name="add" color="f" size="16"></icon>
                    </template>
                    <template v-else>
                        <icon class="shopping_button round pl-6 pr-6 bg-primary" name="cart" color="f" size="16"></icon>
                    </template>
                    <div v-if="shop_type(item)" class="button-checked">
                        <icon name="true" color="f" size="8"></icon>
                    </div>
                </div>
            </div>
        </el-form-item>
        <el-form-item label="是否显示" label-width="140">
            <el-radio-group v-model="form.shop_button_size">
                <el-radio v-for="item in base_list.shopping_button_size" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示">
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
        { name: '商品名称', value: '0' },
        { name: '商品标签', value: '1' },
        { name: '商品售价', value: '2' },
        { name: '商品销量', value: '3' },
        // { name: '商品评分', value: '4' },
        { name: '商品原价', value: '5' },
        { name: '售价单位', value: '6' },
        { name: '原价单位', value: '7' },
    ],
    shopping_button_list: [
        { name: '购买', value: '0' },
        { name: '立即购买', value: '1' },
        { name: '添加', value: '2' },
        { name: '购物车', value: '3' },
    ],
    shopping_cart_list: [
        { name: '进入商品详情页', value: '0' },
        { name: '商品加购', value: '1' }
    ],
    shopping_button_size: [
        { name: '大', value: '0' },
        { name: '中', value: '1' },
        { name: '小', value: '2' },
    ]
};

const shop_type = computed(() => {
    return (item: { value: string; }) => {
        return item.value == form.value.shop_type;
    };
});

const shopping_button_click = (item: { value: string; }) => {
    if (['3','4','5'].includes(form.value.product_style) && ['0', '1'].includes(item.value)) {
        return;
    } else {
        form.value.shop_type = item.value;
    }
};
</script>

<style lang="scss" scoped>
.card, .card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.card-container-br {
    border-bottom: 0.8rem solid #f0f2f5;
}
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
        font-weight: 700;
    }
}
</style>