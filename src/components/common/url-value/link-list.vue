<template>
    <!-- 商城 -->
    <div class="container">
        <div class="flex-row jc-e mb-20">
            <div class="search">
                <el-input v-model="search_value" placeholder="请输入搜索内容" class="" @change="handle_search">
                    <template #suffix>
                        <icon name="search" size="16" color="9"></icon>
                    </template>
                </el-input>
            </div>
        </div>
        <div class="content">
            <el-scrollbar height="480px">
                <div class="flex-col gap-30">
                    <div v-for="item in base_data" :key="item.id">
                        <div class="fw mb-15">{{ item.name }}</div>
                        <div class="flex-row flex-wrap gap-15">
                            <div v-for="child in item.data" :key="child.id" class="item" :class="menu_active == item.id + '-' + child.id ? 'active' : ''" @click="menu_link_event(child, item.id)">{{ child.name }}</div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    // 重置
    reset: {
        type: Boolean,
        default: () => false,
    },
});
watch(
    () => props.reset,
    () => {
        menu_active.value = '';
    }
);
const modelValue = defineModel({ type: Object, default: {} });
const search_value = ref('');
const base_data = ref<linkData[]>([
    {
        id: 0,
        name: '基础链接',
        data: [
            { id: 0, name: '首页', link: '首页' },
            { id: 1, name: '商城分类', link: '商城分类' },
            { id: 2, name: '购物车', link: '购物车' },
            { id: 3, name: '分类商品列表', link: '分类商品列表' },
            { id: 4, name: '退款列表', link: '退款列表' },
            { id: 5, name: '我的订单', link: '我的订单' },
            { id: 6, name: '文章列表', link: '文章列表' },
            { id: 7, name: '供应商入驻', link: '供应商入驻' },
        ],
    },
    {
        id: 1,
        name: '个人中心',
        data: [
            { id: 0, name: '付费会员', link: '付费会员' },
            { id: 1, name: '收银页面', link: '收银页面' },
            { id: 2, name: '我的订单', link: '我的订单' },
            { id: 3, name: '我的收藏', link: '我的收藏' },
            { id: 4, name: '我的地址', link: '我的地址' },
            { id: 5, name: '我的优惠券', link: '我的优惠券' },
            { id: 6, name: '我的消息', link: '我的消息' },
            { id: 7, name: '我的资料', link: '我的资料' },
            { id: 8, name: '我的积分', link: '我的积分' },
            { id: 9, name: '我的余额', link: '我的余额' },
            { id: 10, name: '我的红包', link: '我的红包' },
        ],
    },
    {
        id: 2,
        name: '分销',
        data: [
            { id: 0, name: '分销中心', link: '分销中心' },
            { id: 1, name: '分销订单', link: '分销订单' },
            { id: 2, name: '分销商品', link: '分销商品' },
            { id: 3, name: '分销提现', link: '分销提现' },
            { id: 4, name: '分销佣金', link: '分销佣金' },
            { id: 5, name: '分销设置', link: '分销设置' },
            { id: 6, name: '分销关系', link: '分销关系' },
            { id: 7, name: '分销商列表', link: '分销商列表' },
            { id: 8, name: '分销商等级', link: '分销商等级' },
            { id: 9, name: '分销商统计', link: '分销商统计' },
            { id: 10, name: '分销商提现', link: '分销商提现' },
        ],
    },
]);
const handle_search = () => {
    console.log(search_value.value);
};
const menu_active = ref('');
const emit = defineEmits(['update:link']);
const menu_link_event = (item: linkData, parent_id: number | undefined) => {
    if (`${parent_id}-${item.id}` == menu_active.value) {
        menu_active.value = '';
        modelValue.value = {};
    } else {
        menu_active.value = `${parent_id}-${item.id}`;
        modelValue.value = item;
    }
};
</script>
<style lang="scss" scoped>
.container {
    search {
        width: 22.5rem;
    }
    .content {
        .item {
            width: 10.3rem;
            padding: 0 0.5rem;
            height: 3.6rem;
            line-height: 3.6rem;
            background-color: #f9f9f9;
            border-radius: 0.2rem;
            font-size: 1.2rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s linear;
            &:hover {
                background-color: #edf4ff;
                color: $cr-primary;
            }
            &.active {
                background: #edf4ff;
                color: $cr-primary;
            }
        }
    }
}
</style>
