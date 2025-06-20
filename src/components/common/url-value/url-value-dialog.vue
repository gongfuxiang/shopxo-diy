<template>
    <el-dialog v-model="dialogVisible" class="radius-lg" width="1168" draggable append-to-body :close-on-click-modal="false" :top="dialogPositionTop ? dialogPositionTop + 'px' : ''" @close="close_event">
        <template #header>
            <div class="title center re">
                <div class="tc size-16 fw-b">{{ dialog_title }}</div>
            </div>
        </template>
        <div class="url-value-content pa-20 flex-row">
            <div v-if="custom_link_type.length != 1" class="left-content">
                <el-menu :default-active="link_select" class="w br-none" @select="handle_select">
                    <el-menu-item v-for="item in base_data" :key="item.type" :index="item.type" :disabled="!(custom_link_type.includes(item.type) || custom_link_type.length == 0)">
                        <span>{{ item.name }}</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="right-content flex-1 w h">
                <!-- 商城链接/插件 -->
                <template v-if="link_select == 'shop' || link_select == 'plugins'">
                    <link-list :key="link_select" v-model="link_value" :type="link_select" :reset="reset_compontent"></link-list>
                </template>
                <!-- 商品分类 -->
                <template v-else-if="link_select == 'goods-category'">
                    <link-goods-category v-model="link_value" :select-is-url="selectIsUrl" :reset="reset_compontent"></link-goods-category>
                </template>
                <!-- 商品搜索 -->
                <template v-else-if="link_select == 'goods-search'">
                    <link-goods-search :reset="reset_compontent" :status="component_status" :select-is-url="selectIsUrl" @update:link="goods_category_link" @type="goods_category_type_change"></link-goods-search>
                </template>
                <!-- 商品页面 -->
                <template v-else-if="link_select == 'goods'">
                    <link-goods v-model="link_value" :select-is-url="selectIsUrl" :multiple="multiple" :reset="reset_compontent"></link-goods>
                </template>
                <!-- 文章页面 -->
                <template v-else-if="link_select == 'article'">
                    <link-articles v-model="link_value" :select-is-url="selectIsUrl" :multiple="multiple" :reset="reset_compontent"></link-articles>
                </template>
                <!-- 博客页面 -->
                <template v-else-if="link_select == 'blog'">
                    <link-blog v-model="link_value" :select-is-url="selectIsUrl" :multiple="multiple" :reset="reset_compontent"></link-blog>
                </template>
                <!-- diy页面/页面设计/自定义页面  -->
                <template v-else-if="link_select == 'diy' || link_select == 'design' || link_select == 'custom-view'">
                    <link-table :key="link_select" v-model="link_value" :select-is-url="selectIsUrl" :multiple="multiple" :type="link_select" :reset="reset_compontent"></link-table>
                </template>
                <!-- 品牌 -->
                <template v-else-if="link_select == 'brand'">
                    <link-brand v-model="link_value" :select-is-url="selectIsUrl" :multiple="multiple" :reset="reset_compontent"></link-brand>
                </template>
                <!-- 自定义链接 -->
                <template v-else-if="link_select == 'custom-url'">
                    <link-custom :reset="reset_compontent" :select-is-url="selectIsUrl" :status="component_status" @update:link="custom_link"></link-custom>
                </template>
                <!-- 优惠券链接 -->
                <template v-else-if="link_select == 'coupon'">
                    <link-coupon v-model="link_value" :multiple="multiple" :reset="reset_compontent"></link-coupon>
                </template>
                <!-- 组合搭配 -->
                <template v-else-if="link_select == 'binding'">
                    <link-binding v-model="link_value" :multiple="multiple" :reset="reset_compontent"></link-binding>
                </template>
                <!-- 多商户 -->
                <template v-else-if="link_select == 'merchant'">
                    <link-shop v-model="link_value" :multiple="multiple" :reset="reset_compontent"></link-shop>
                </template>
                <!-- 多门店 -->
                <template v-else-if="link_select == 'realstore'">
                    <link-realstore v-model="link_value" :multiple="multiple" :reset="reset_compontent"></link-realstore>
                </template>
                <!-- 问答 -->
                <template v-else-if="link_select == 'ask'">
                    <link-ask v-model="link_value" :multiple="multiple" :reset="reset_compontent"></link-ask>
                </template>
                <!-- 活动选择 -->
                <template v-else-if="link_select == 'activity'">
                    <link-activity v-model="link_value" :multiple="multiple" :reset="reset_compontent"></link-activity>
                </template>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="plr-28 ptb-10" @click="close_event">取消</el-button>
                <el-button class="plr-28 ptb-10" type="primary" @click="confirm_event">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { MenuItemClicked } from 'element-plus/es/components/menu/src/types';
import { PropType } from 'vue';
import { commonStore } from '@/store';
const common_store = commonStore();
const app = getCurrentInstance();
/**
 * @description: 页面链接
 * @param modelValue{Object} 默认值
 * @param dialogVisible {Boolean} 弹窗显示
 * @param type{String} 链接类型为空数组则表示无限制，全部可用，传过来则表示传的值可用
 * @param multiple{Boolean} 是否多选 默认单选 只生效 商品页面 goods/ 文章页面 article/ 博客页面 blog / DIY页面 diy/ 设计页面 design/ 自定义页面 custom-view/ 品牌页面 brand
 * @return {*} update:modelValue
 */
const props = defineProps({
    type: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    // 判断是否返回链接地址
    selectIsUrl: {
        type: Boolean,
        default: false,
    },
    dialogPositionTop: {
        type: Number,
        default: 0,
    },
});
const modelValue = defineModel({ type: Array, default: [] });
const dialogVisible = defineModel('dialogVisible', { type: Boolean, default: false });
const link_value = ref<any[]>([]);
const reset_compontent = ref(false);
const custom_link_type = ref(props.type);
const base_data = ref<any[]>([]);
watch(
    () => props.type,
    (new_val) => {
        if (new_val.length > 0) {
            link_select.value = props.type[0];
        } else {
            link_select.value = '';
        }
    }
);
onMounted(() => {
    nextTick(() => {
        // 定时获取common_store.common.article_category的数据，直到拿到值或者关闭页面为止
        const interval = setInterval(() => {
            // 获取分类
            if (common_store.common.page_link_list.length > 0) {
                base_data.value = common_store.common.page_link_list;
                if (common_store.common.page_link_list.length > 0) {
                    if (props.type.length == 0) {
                        link_select.value = common_store.common.page_link_list[0].type || '';
                    } else {
                        link_select.value = props.type[0];
                    }
                    clearInterval(interval);
                }
            }
        }, 1000);
    });
});
const dialog_title = computed(() => {
    if (props.type.length == 1) {
        let name = '';
        if (props.type[0] == 'shop') {
            name = '商城';
        } else if (props.type[0] == 'goods-category') {
            name = '商品分类';
        } else if (props.type[0] == 'goods-search') {
            name = '商品搜索';
        } else if (props.type[0] == 'goods') {
            name = '商品';
        } else if (props.type[0] == 'article') {
            name = '文章';
        } else if (props.type[0] == 'blog') {
            name = '博客';
        } else if (props.type[0] == 'diy') {
            name = 'DIY';
        } else if (props.type[0] == 'design') {
            name = '页面设计';
        } else if (props.type[0] == 'custom-view') {
            name = '自定义页面';
        } else if (props.type[0] == 'custom-url') {
            name = '自定义';
        } else if (props.type[0] == 'brand') {
            name = '品牌';
        } else if (props.type[0] == 'plugins') {
            name = '插件';
        } else if (props.type[0] == 'coupon') {
            name = '优惠券';
        } else if (props.type[0] == 'binding') {
            name = '组合搭配';
        } else if (props.type[0] == 'merchant') {
            name = '多商户';
        } else if (props.type[0] == 'realstore') {
            name = '多门店';
        } else if (props.type[0] == 'ask') {
            name = '问答';
        } else if (props.type[0] == 'activity') {
            name = '活动';
        }
        return name + '选择';
    } else {
        return '内容选择';
    }
});

//#region 链接回调 -----------------------------------------------start
// 菜单选中回调
const link_select = ref('');
const handle_select = (index: string, indexPath: string[], item: MenuItemClicked, routeResult: any) => {
    link_select.value = index;
};
//#endregion 链接回调 -----------------------------------------------end

//@region 子组件回调 -----------------------------------------------start
const component_status = ref(false);
// 商品分类选中回调
const goods_category_type = ref(0);
const goods_category_type_change = (type: number) => {
    goods_category_type.value = type;
};
const goods_category_link = (data: object, type: number) => {
    if (type == 2) {
        modelValue.value = [data];
        close_event();
    } else {
        link_value.value = [data];
    }
};
// 自定义地址回调
const custom_link = (data: object) => {
    modelValue.value = [data];
    close_event();
};
//#endregion 子组件回调 -----------------------------------------------end

//#region 链接确认回调 -----------------------------------------------start
// 取消回调
const emit = defineEmits(['close']);
const close_event = () => {
    link_select.value = props.type.length == 0 ? 'shop' : props.type[0];
    dialogVisible.value = false;
    link_value.value = [];
    reset_compontent.value = !reset_compontent.value;
    emit('close');
};
// 确认回调
const confirm_event = () => {
    // 判断是否是自定义页面和商品查询
    if (link_select.value == 'custom-url' || (link_select.value == 'goods-search' && goods_category_type.value == 2)) {
        component_status.value = !component_status.value;
    } else {
        if (link_value.value.length < 1) {
            ElMessage({
                type: 'warning',
                message: '请先选择链接',
            });
        } else {
            modelValue.value = link_value.value;
            close_event();
        }
    }
};
//#endregion 链接确认回调 -----------------------------------------------end
</script>
<style lang="scss" scoped>
.url-value-content {
    height: 57.3rem;
    gap: 6rem;
    overflow: hidden;
    .left-content {
        width: 22.5rem;
        .el-menu-item {
            height: 4rem;
            line-height: 4rem;
            &.is-active {
                background: var(--el-menu-hover-bg-color);
                color: #333;
            }
        }
    }
}
</style>
