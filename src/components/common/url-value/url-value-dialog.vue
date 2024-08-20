<template>
    <el-dialog v-model="dialogVisible" class="radius-lg" width="1168" draggable append-to-body @close="close_event">
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
                <template v-if="link_select == 'shop' || link_select == 'plugins'">
                    <link-list :key="link_select" v-model="link_value" :type="link_select" :reset="reset_compontent"></link-list>
                </template>
                <template v-else-if="link_select == 'goods-category'">
                    <link-goods-category v-model="link_value" :reset="reset_compontent"></link-goods-category>
                </template>
                <template v-else-if="link_select == 'goods-search'">
                    <link-goods-search :reset="reset_compontent" :status="component_status" @update:link="goods_category_link" @type="goods_category_type_change"></link-goods-search>
                </template>
                <template v-else-if="link_select == 'goods'">
                    <link-goods v-model="link_value" :reset="reset_compontent"></link-goods>
                </template>
                <template v-else-if="link_select == 'article'">
                    <link-articles v-model="link_value" :reset="reset_compontent"></link-articles>
                </template>
                <template v-else-if="link_select == 'diy' || link_select == 'design' || link_select == 'custom-view'">
                    <link-table :key="link_select" v-model="link_value" :type="link_select" :reset="reset_compontent"></link-table>
                </template>
                <template v-else-if="link_select == 'custom-url'">
                    <link-custom :reset="reset_compontent" :status="component_status" @update:link="custom_link"></link-custom>
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
import { is_obj_empty } from '@/utils';
import { PropType } from 'vue';
import UrlValueAPI from '@/api/url-value';
import { urlValueStore, urlValue } from '@/store';
const url_value_store = urlValueStore();
const app = getCurrentInstance();
/**
 * @description: 页面链接
 * @param modelValue{Object} 默认值
 * @param dialogVisible {Boolean} 弹窗显示
 * @param type{String} 链接类型为空数组则表示无限制，全部可用，传过来则表示传的值可用
 * @return {*} update:modelValue
 */
const props = defineProps({
    type: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
});
const modelValue = defineModel({ type: Object, default: {} });
const dialogVisible = defineModel('dialogVisible', { type: Boolean, default: false });
const link_value = ref({});
const reset_compontent = ref(false);
const custom_link_type = ref(props.type);
const base_data = ref<any[]>([]);
const init_data = ref({});
watch(
    () => dialogVisible.value,
    (val) => {
        if (val) {
            init();
        }
    }
);
onMounted(() => {
    init();
});
const init = () => {
    if (!url_value_store.is_url_value_api) {
        url_value_store.set_is_url_value_api(true);
        UrlValueAPI.getInit()
            .then((res: any) => {
                init_data.value = res.data;
                base_data.value = res.data.page_link_list;
                if (res.data.page_link_list.length > 0) {
                    link_select.value = res.data.page_link_list[0].type;
                }
                url_value_store.set_url_value(res.data);
            })
            .catch(() => {
                url_value_store.set_is_url_value_api(false);
            });
    } else {
        init_data.value = url_value_store.url_value;
        base_data.value = url_value_store.url_value.page_link_list;
        if (url_value_store.url_value.page_link_list.length > 0) {
            link_select.value = url_value_store.url_value.page_link_list[0].type || '';
        }
    }
};

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
    if (link_select.value == 'custom-url' || (link_select.value == 'goods-search' && goods_category_type.value == 2)) {
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
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
