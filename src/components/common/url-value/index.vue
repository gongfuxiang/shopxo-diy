<!-- 上传组件 -->
<template>
    <el-dialog v-model="dialogVisible" class="radius-lg" width="1168" append-to-body @close="close_event">
        <template #header>
            <div class="title center re">
                <div class="tc size-16 fw">选择链接</div>
            </div>
        </template>
        <div class="url-value-content pa-20 flex-row">
            <div class="left-content">
                <el-menu :default-active="link_select" class="w br-none" @select="handle_select">
                    <el-menu-item v-for="item in base_data" :key="item.type" :index="item.type" :disabled="!(custom_link_type.length == 0 || custom_link_type.includes(item.type))">
                        <span>{{ item.name }}</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="right-content flex-1">
                <template v-if="link_select == 'shop'">
                    <link-list v-model="link_value" :reset="reset_compontent"></link-list>
                </template>
                <template v-else-if="link_select == 'goods-category'">
                    <link-goods-category v-model="link_value" :reset="reset_compontent"></link-goods-category>
                </template>
                <template v-else-if="link_select == 'goods-search'">
                    <link-goods-search :reset="reset_compontent" :status="component_status" @update:link="goods_category_link" @type="goods_category_type_change" @required="required_tips"></link-goods-search>
                </template>
                <template v-else-if="link_select == 'goods'">
                    <link-goods v-model="link_value" :reset="reset_compontent"></link-goods>
                </template>
                <template v-else-if="link_select == 'articles'">
                    <link-articles v-model="link_value" :reset="reset_compontent"></link-articles>
                </template>
                <template v-else-if="link_select == 'diy'">
                    <link-table v-model="link_value" :reset="reset_compontent"></link-table>
                </template>
                <template v-else-if="link_select == 'design'">
                    <link-table v-model="link_value" :reset="reset_compontent"></link-table>
                </template>
                <template v-else-if="link_select == 'custom-view'">
                    <link-table v-model="link_value" :reset="reset_compontent"></link-table>
                </template>
                <template v-else-if="link_select == 'custom'">
                    <link-custom :reset="reset_compontent" :status="component_status" @update:link="custom_link" @required="required_tips"></link-custom>
                </template>
                <template v-else-if="link_select == 'plugins'">
                    <link-list v-model="link_value" :reset="reset_compontent"></link-list>
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
    <div class="flex-row align-c gap-10 br-d radius-sm plr-11 url-value-input" @click="dialogVisible = true">
        <div class="flex-1 flex-width size-12 text-line-1">
            <text v-if="!is_obj_empty(modelValue)">{{ modelValue.name }}</text>
            <text v-else class="cr-9">{{ placeholder }}</text>
        </div>
        <div class="value-input-icon">
            <template v-if="is_obj_empty(modelValue)">
                <icon name="arrow-right" size="12" color="9"></icon>
            </template>
            <template v-else>
                <div @click.stop="clear_model_value">
                    <icon name="close-o" size="12" color="c"></icon>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { MenuItemClicked } from 'element-plus/es/components/menu/src/types';
import { is_obj_empty } from '@/utils';
import { PropType } from 'vue';

const app = getCurrentInstance();
/**
 * @description: 页面链接
 * @param modelValue{Object} 默认值
 * @param dialogVisible {Boolean} 弹窗显示
 * @param type{String} 链接类型为空数组则表示无限制，全部可用，传过来则表示传的值可用
 * @param placeholder{String} 提示文字
 * @return {*} update:modelValue
 */
const props = defineProps({
    type: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    placeholder: {
        type: String,
        default: '请选择链接',
    },
});
const modelValue = defineModel({ type: Object, default: {} });
const dialogVisible = defineModel('visibleDialog', { type: Boolean, default: false });
const link_value = ref({});
const reset_compontent = ref(false);
const custom_link_type = ref(props.type);
const base_data = reactive([
    {
        name: '商城页面',
        type: 'shop',
        data: [{ name: '基础链接', data: [{ name: '', page: '' }] }],
    },
    {
        name: '商品分类',
        type: 'goods-category',
        data: null,
    },
    {
        name: '商品搜索',
        type: 'goods-search',
        data: null,
    },
    {
        name: '商品页面',
        type: 'goods',
        data: null,
    },
    {
        name: '文章页面',
        type: 'articles',
        data: null,
    },
    {
        name: 'DIY页面',
        type: 'diy',
        data: null,
    },
    {
        name: '页面设计',
        type: 'design',
        data: null,
    },
    {
        name: '自定义页面',
        type: 'custom-view',
        data: null,
    },
    {
        name: '自定义链接',
        type: 'custom',
        data: null,
    },
    {
        name: '插件',
        type: 'plugins',
        data: [{ name: '多商户', data: [{ name: '1', page: '2' }] }],
    },
]);
// 弹窗显示

//#region 链接回调 -----------------------------------------------start
// 菜单选中回调
const link_select = ref(props.type.length == 0 ? 'shop' : props.type[0]);
const handle_select = (index: string, indexPath: string[], item: MenuItemClicked, routeResult: any) => {
    // console.log(index, indexPath, item, routeResult);
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
        modelValue.value = data;
        close_event();
    } else {
        link_value.value = data;
    }
};
// 自定义地址回调
const custom_link = (data: object) => {
    modelValue.value = data;
    close_event();
};
// 错误回调
const required_tips = () => {
    ElMessage({
        type: 'warning',
        message: '必填项不能为空',
    });
};
//#endregion 子组件回调 -----------------------------------------------end

//#region 链接确认回调 -----------------------------------------------start
// 取消回调
const close_event = () => {
    link_select.value = props.type.length == 0 ? 'shop' : props.type[0];
    dialogVisible.value = false;
    link_value.value = {};
    reset_compontent.value = !reset_compontent.value;
};
// 确认回调
const confirm_event = () => {
    // 判断是否是自定义页面和商品查询
    if (link_select.value == 'custom' || (link_select.value == 'goods-search' && goods_category_type.value == 2)) {
        component_status.value = !component_status.value;
    } else {
        if (is_obj_empty(link_value.value)) {
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

//#endregion 链接清空-------------------------------------------------start
const clear_model_value = () => {
    modelValue.value = {};
};
//#endregion 链接清空-------------------------------------------------end
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
