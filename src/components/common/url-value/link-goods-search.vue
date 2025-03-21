<template>
    <!-- 商城 -->
    <div class="container">
        <div class="tabs flex-row gap-10 mb-20 align-c">
            <div v-for="item in custom_type" :key="item.id" class="item bg-f5 radius-sm" :class="custom_type_active === item.id ? 'active' : ''" @click="custom_type_event(item)">{{ item.name }}</div>
        </div>
        <div class="content">
            <template v-if="custom_type_active === 0">
                <div class="goods-tips ptb-10 plr-14 mb-20 size-12">
                    <text class="cr-666">您当前选择的产品类别是：</text>
                    <text>{{ one_item_text }} {{ two_item_text ? '>' : '' }}</text>
                    <text class="pl-3">{{ two_item_text }} {{ three_item_text ? '>' : '' }}</text>
                    <text class="pl-3">{{ three_item_text }}</text>
                </div>
                <div class="goods-category flex-row gap-30">
                    <div v-if="goods_category_data.length > 0" class="goods-category-wdith br-d radius-xs">
                        <el-scrollbar height="420px">
                            <div v-for="(item, index) in goods_category_data" :key="item.id" class="item flex-row jc-c align-c gap-10 pa-10" :class="one_item_index === index + 1 ? 'active' : ''" @click="goods_item_click(item, 1, index)">
                                <text class="flex-1 flex-width text-line-1">{{ item.name }}</text>
                                <icon v-if="item?.items" name="arrow-right"></icon>
                            </div>
                        </el-scrollbar>
                    </div>
                    <div v-if="two_item_data.length > 0" class="goods-category-wdith br-d radius-xs">
                        <el-scrollbar height="420px">
                            <div v-for="(item, index) in two_item_data" :key="item.id" class="item flex-row jc-c align-c gap-10 pa-10" :class="two_item_index === index + 1 ? 'active' : ''" @click="goods_item_click(item, 2, index)">
                                <text class="flex-1 flex-width text-line-1">{{ item.name }}</text>
                                <icon v-if="item?.items" name="arrow-right"></icon>
                            </div>
                        </el-scrollbar>
                    </div>
                    <div v-if="three_item_data.length > 0" class="goods-category-wdith br-d radius-xs">
                        <el-scrollbar height="420px">
                            <div v-for="(item, index) in three_item_data" :key="item.id" class="item flex-row jc-c align-c gap-10 pa-10" :class="three_item_index === index + 1 ? 'active' : ''" @click="goods_item_click(item, 3, index)">
                                <text class="flex-1 flex-width text-line-1">{{ item.name }}</text>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </template>
            <template v-if="custom_type_active === 1">
                <div class="brand">
                    <div class="flex-1 br-d radius-xs">
                        <el-scrollbar height="480px">
                            <div v-for="(item, index) in brand_data" :key="item.id" class="item flex-row jc-c align-c gap-10 pa-10" :class="brand_item_index === index + 1 ? 'active' : ''" @click="brand_item_click(item, index)">
                                <text class="flex-1 flex-width text-line-1">{{ item.name }}</text>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </template>
            <template v-if="custom_type_active === 2">
                <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="85px" status-icon>
                    <el-form-item label="关键字" prop="key">
                        <el-input v-model="form.key" class="link-input" placeholder="请输入关键字" clearable />
                    </el-form-item>
                    <el-button type="primary" class="hide" @click="on_submit">Create</el-button>
                </el-form>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import { commonStore } from '@/store';
const common_store = commonStore();
const props = defineProps({
    status: {
        type: Boolean,
        default: false,
    },
    // 重置
    reset: {
        type: Boolean,
        default: () => false,
    },
    // 判断是否返回链接地址
    selectIsUrl: {
        type: Boolean,
        default: false,
    },
});
watch(
    () => props.status,
    (val) => {
        on_submit();
    }
);
watch(
    () => props.reset,
    (val) => {
        if (val) {
            init();
        }
    }
);
const emit = defineEmits(['update:link', 'type']);

onMounted(() => {
    init();
});
const reset_data = () => {
    one_item_index.value = 0;
    one_item_text.value = '';
    two_item_index.value = 0;
    two_item_text.value = '';
    three_item_index.value = 0;
    three_item_text.value = '';
    two_item_data.value = [];
    brand_item_index.value = 0;
    form.key = '';
};

const brand_data = ref<pageLinkList[]>([]);
const init = () => {
    reset_data();
    custom_type_active.value = 0;
    goods_category_data.value = common_store.common.goods_category;
    brand_data.value = common_store.common.brand_list;
};
const custom_type = [
    { id: 0, name: '商品分类' },
    { id: 1, name: '品牌' },
    { id: 2, name: '关键字' },
];
const custom_type_active = ref(0);
const custom_type_event = (item: any) => {
    custom_type_active.value = item.id;
    emit('type', item.id);
};
//#region 商品分类  -----------------------------------------------start
// 商品分类
const goods_category_data = ref<pageLinkList[]>([]);
const check_data = ref({});
const two_item_data = ref<pageLinkList[]>([]);
const three_item_data = ref<pageLinkList[]>([]);
const one_item_index = ref(0);
const two_item_index = ref(0);
const three_item_index = ref(0);
const one_item_text = ref('');
const two_item_text = ref('');
const three_item_text = ref('');
// 商品项点击事件
const goods_item_click = (item: pageLinkList, level: number, index: number) => {
    if (level === 1) {
        one_item_index.value = index + 1;
        one_item_text.value = item.name || '';
        two_item_index.value = 0;
        two_item_text.value = '';
        three_item_index.value = 0;
        three_item_text.value = '';
        two_item_data.value = [];
        three_item_data.value = [];
    } else if (level === 2) {
        two_item_index.value = index + 1;
        two_item_text.value = item.name || '';
        three_item_index.value = 0;
        three_item_text.value = '';
        three_item_data.value = [];
    } else {
        three_item_index.value = index + 1;
        three_item_text.value = item.name || '';
    }
    if (item.items && item.items.length > 0) {
        if (level === 1) {
            two_item_data.value = item.items;
        } else if (level === 2) {
            three_item_data.value = item.items;
        }
    } else {
        check_data.value = item;
        if (props.selectIsUrl) {
            const new_item = {
                page: '/pages/goods-search/goods-search?category_id=' + item.id,
                ...item,
            };
            emit('update:link', new_item, 0);
        } else {
            emit('update:link', item, 0);
        }
    }
};
//#endregion 商品分类  -----------------------------------------------end

//#region 品牌  -----------------------------------------------start
const brand_item_index = ref(0);
const brand_item_click = (item: any, index: number) => {
    brand_item_index.value = index + 1;
    check_data.value = item;
    if (props.selectIsUrl) {
        const new_item = {
            page: '/pages/goods-search/goods-search?brand=' + item.id,
            ...item,
        };
        emit('update:link', new_item, 1);
    } else {
        emit('update:link', item, 1);
    }
};
//#endregion 品牌  -----------------------------------------------end

//#region 关键字  -----------------------------------------------start
const form = reactive({
    key: '',
});
const rules = ref<FormRules>({
    key: [{ required: true, trigger: 'change', message: '关键词不能为空' }],
});
const ruleFormRef = ref<FormInstance>();
const on_submit = () => {
    if (!ruleFormRef.value) return;
    ruleFormRef.value.validate((valid: boolean) => {
        if (valid) {
            let new_value: pageLinkList = {
                name: form.key,
                page: '/pages/goods-search/goods-search?keywords=' + form.key,
            };
            emit('update:link', new_value, 2);
        }
    });
};
//#endregion 关键字  -----------------------------------------------end
</script>
<style lang="scss" scoped>
.container {
    .tabs {
        .item {
            width: 8rem;
            height: 3rem;
            line-height: 3rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
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
    .content {
        .goods-tips {
            background-color: #f3f2fc;
        }
        .goods-category,
        .brand {
            .item {
                transition: all 0.3s ease-in-out;
                &:hover,
                &.active {
                    background: #edf4ff;
                    color: $cr-primary;
                }
            }
        }
        .goods-category-wdith {
            width: calc((100% - 6rem) / 3);
        }
    }
    .link-input {
        width: 33.2rem;
    }
}
</style>
