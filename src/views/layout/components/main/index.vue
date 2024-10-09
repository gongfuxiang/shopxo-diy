<template>
    <!-- 左侧模块 -->
    <div class="siderbar flex-col">
        <el-collapse v-model="activeNames">
            <template v-for="(com, i) in components">
                <el-collapse-item v-if="com.data.length > 0" :key="i" :title="com.name" :name="com.key">
                    <VueDraggable v-model="com.data" :animation="500" ghost-class="ghost" handle=".is-drag" :group="{ name: 'people', pull: 'clone', put: false }" class="component flex-row flex-wrap" :clone="clone_item_com_data" :sort="false" :force-fallback="true">
                        <template v-for="item in com.data" :key="item.key">
                            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="<span>该组件只可以点击添加, 并且只能添加一次。<br/>如果页面设置开启沉浸模式, 则不可添加</span>" raw-content placement="top" :disabled="!['tabs', 'tabs-carousel'].includes(item.key)">
                                <div :class="['item', { 'is-drag': !['tabs', 'tabs-carousel'].includes(item.key) }]" @click.stop="draggable_click(item)">
                                    <div class="main-border siderbar-hidden main-show tc">释放鼠标将组件添加到此处</div>
                                    <div class="siderbar-show main-hidden flex-col jc-c align-c gap-4">
                                        <img class="img radius-xs" :src="url_computer(item.key)" />
                                        <div>{{ item.name }}</div>
                                    </div>
                                </div>
                            </el-tooltip>
                        </template>
                    </VueDraggable>
                </el-collapse-item>
            </template>
        </el-collapse>
    </div>
    <div class="drawer-container" :style="`width: ${drawer_selected ? '12.8rem' : '0px'}`">
        <div class="drawer-content pt-5" :style="{ left: drawer_selected ? '0' : '-100%' }">
            <div class="size-14 cr-3 fw pl-12 drawer-title" :style="{ opacity: drawer_selected ? '1' : '0' }">已选组件({{ diy_data.length }})</div>
            <div ref="left_scrollTop" class="drawer-drag-area">
                <div v-for="(item, index) in tabs_data" :key="index" :class="['flex ptb-12 plr-10 gap-y-8 re align-c drawer-drag', { 'drawer-drag-bg': item.show_tabs == '1' }]" @click="set_tabs_event(true)">
                    <el-icon class="iconfont icon-jinzhi size-16 cr-d" />
                    <span class="size-12 cr-6">{{ item.name }}</span>
                    <el-icon class="iconfont icon-close-b size-16 abs" :style="[item.show_tabs == '1' ? '' : 'display:none']" @click.stop="del(index, true)" />
                </div>
                <VueDraggable v-model="diy_data" :animation="500" target=".sort-target" :scroll="true" :on-sort="on_sort">
                    <TransitionGroup type="transition" tag="ul" name="fade" class="sort-target flex-col">
                        <li v-for="(item, index) in diy_data" :key="index" :class="['flex ptb-12 plr-10 gap-y-8 re align-c drawer-drag', { 'drawer-drag-bg': item.show_tabs == '1' }]" @click="on_choose(index, item.show_tabs)">
                            <el-icon class="iconfont icon-drag size-16 cr-d" />
                            <span class="size-12 cr-6">{{ item.name }}</span>
                            <el-icon class="iconfont icon-close-b size-16 abs" :style="[item.show_tabs == '1' ? '' : 'display:none']" @click.stop="del(index, false)" />
                        </li>
                    </TransitionGroup>
                </VueDraggable>
            </div>
        </div>
    </div>
    <!-- 视图渲染 -->
    <div class="main re">
        <div v-if="diy_data.length > 0" :class="['layout-toggle-bar', drawer_selected ? 'layout-toggle-bar-close' : 'layout-toggle-bar-open']" @click="toggle_drawer">
            <div class="layout-toggle-bar-top"></div>
            <div class="layout-toggle-bar-bottom"></div>
        </div>
        <div class="model">
            <div class="model-content">
                <div class="acticons">
                    <el-button size="large" @click="page_settings">页面设置</el-button>
                    <el-button size="large" @click="export_click">导出</el-button>
                    <!-- <el-upload action="#" :accept="exts_text" :show-file-list="false" :auto-upload="false" :on-change="upload_change">
                        <template #trigger>
                            <el-button size="large">导入</el-button>
                        </template>
                    </el-upload> -->
                    <el-button size="large" @click="import_click">导入</el-button>
                    <el-button size="large" @click="clear_click">清空</el-button>
                </div>
                <!-- 拖拽区 -->
                <div ref="scrollTop" class="model-drag">
                    <!-- 页面设置 -->
                    <page-settings :show-page="page_data.show_tabs == '1'" :page-data="page_data" @page_settings="page_settings"></page-settings>
                    <div class="model-wall" :style="content_style">
                        <div class="model-wall-content" :style="`padding-top:${top_padding}px; margin-top: ${top_margin}px;padding-bottom:${bottom_navigation_show ? footer_nav_counter_store.padding_footer : 0}px;`">
                            <div-content :diy-data="tabs_data" :show-model-border="show_model_border" :is-tabs="true" :main-content-style="main_content_style" @on_choose="set_tabs_event(true)" @del="del"></div-content>
                            <div v-if="tabs_data.length > 0" class="seat"></div>
                            <VueDraggable v-model="diy_data" :animation="500" :touch-start-threshold="2" group="people" class="drag-area re" ghost-class="ghost" :on-sort="on_sort" :on-start="on_start" :on-end="on_end">
                                <div-content :diy-data="diy_data" :show-model-border="show_model_border" :main-content-style="main_content_style" @on_choose="on_choose" @del="del" @copy="copy" @move-up="moveUp" @move-down="moveDown"></div-content>
                            </VueDraggable>
                        </div>
                    </div>
                    <!-- <div class="seat"></div> -->
                </div>
                <!-- 底部区域 -->
                <div v-if="bottom_navigation_show" class="model-bottom">
                    <footer-nav :show-footer="footer_nav.show_tabs == '1'" :footer-data="footer_nav.com_data" @footer-nav="footer_nav_event"></footer-nav>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, get_math, gradient_computer, padding_computer } from '@/utils';
import { cloneDeep, isEmpty } from 'lodash';
import { SortableEvent, VueDraggable } from 'vue-draggable-plus';
import defaultSettings from './index';
import { footerNavCounterStore, commonStore } from '@/store';
const footer_nav_counter_store = footerNavCounterStore();
const common_store = commonStore();
const app = getCurrentInstance();
const props = defineProps({
    diyData: {
        type: Array<any>,
        default: () => [],
    },
    tabsData: {
        type: Array<any>,
        default: () => [],
    },
    footer: {
        type: Object,
        default: () => {},
    },
    header: {
        type: Object,
        default: () => {},
    },
});
const diy_data = ref(props.diyData);
const tabs_data = ref(props.tabsData);
const page_data = ref(props.header);
const footer_nav = ref(props.footer);
// 监听
watch(
    () => props.diyData,
    (newValue) => {
        diy_data.value = newValue;
    }
);
watch(
    () => props.tabsData,
    (newValue) => {
        tabs_data.value = newValue;
    }
);
// 监听
watch(
    () => props.header,
    (newValue) => {
        page_data.value = newValue;
        page_settings();
    }
);

watch(
    () => props.footer,
    (newValue) => {
        footer_nav.value = newValue;
    },
    { deep: true }
);
const top_padding = ref(90);
const top_margin = ref(0);
const content_style = ref('');
const main_content_style = ref('');
const bottom_navigation_show = ref(true);
watchEffect(() => {
    const data = page_data.value.com_data;
    if (data) {
        // 底部按钮显示
        const content = data.content;
        bottom_navigation_show.value = content.bottom_navigation_show == '1' ? true : false;
        // 通用样式设置
        const new_style = data.style;
        content_style.value = gradient_computer(new_style.common_style) + background_computer(new_style.common_style);
        main_content_style.value = padding_computer(new_style.common_style);

        const { immersive_style, up_slide_display } = new_style;
        // 不开启沉浸式 和 上滑显示
        if (immersive_style == '1' || up_slide_display != '1') {
            top_padding.value = 2;
        } else {
            top_padding.value = 90;
        }
        // 开启沉浸式并且没有开通上滑显示
        if (immersive_style == '1' && up_slide_display != '1') {
            top_margin.value = -90;
        } else {
            top_margin.value = 0;
        }
    }
});

// 已选组件逻辑处理
const drawer_selected = ref(false);
watchEffect(() => {
    if (diy_data.value.length > 0 || tabs_data.value.length > 0) {
        drawer_selected.value = true;
    } else {
        drawer_selected.value = false;
    }
});
const toggle_drawer = () => {
    drawer_selected.value = !drawer_selected.value;
};
// 父组件调用的方法
const emits = defineEmits(['rightUpdate', 'import', 'export', 'clear']);
const activeNames = reactive(['base', 'plugins', 'tool']);
interface componentsData {
    name: string;
    key: string;
    data: componentsData[];
}
const components = ref<componentsData[]>([]);
const url_computer = (name: string) => {
    const new_url = ref(new URL(`../../../../assets/images/layout/siderbar/${name}.png`, import.meta.url).href).value;
    return new_url;
};

//#region 拖拽组件的公共方法
// 是否显示提示用户拖拽位置
const show_model_border = ref(true);
// 点击添加tabs组件
const draggable_click = (item: componentsData) => {
    const type_data = ['tabs', 'tabs-carousel'];
    
    if (common_store.is_immersion_model) {
        ElMessage.error('开启沉浸样式下不可以添加该组件');
        return;
    }

    if (type_data.includes(item.key) && isEmpty(tabs_data.value)) {
        // 添加tabs组件
        tabs_data.value.push({
            name: item.name,
            show_tabs: '1',
            is_enable: '1',
            src: '',
            id: get_math(),
            key: item.key,
            com_data: cloneDeep((defaultSettings as any)[item.key.replace(/-/g, '_')]),
        });
        common_store.set_is_have_tabs(true);
        set_tabs_event(true);
    } else if (type_data.includes(item.key) && !isEmpty(tabs_data.value)) {
        if (tabs_data.value[0].key == item.key) {
            ElMessage.error('该组件只可以添加一次');
        } else if (tabs_data.value[0].key != item.key) {
            ElMessage.error('选项卡轮播不能与选项卡同时存在');
        }
    }
};
watchEffect(() => {
    if (tabs_data.value.length <= 0) {
        common_store.set_is_have_tabs(false);
    }
});

// 复制
const clone_item_com_data = (item: commonComponentData) => {
    return {
        name: item.name,
        show_tabs: '1',
        is_enable: '1',
        src: item.src,
        id: get_math(),
        key: item.key,
        com_data: cloneDeep((defaultSettings as any)[item.key.replace(/-/g, '_')]),
    };
};

// 任何行动都会触发
const on_sort = (item: SortableEvent) => {
    let index = item?.newIndex || 0;
    // 设置对应的位置为显示
    set_show_tabs(index);
};
// 开始拖拽时
const on_start = () => {
    show_model_border.value = false;
};
// 拖拽结束时
const on_end = () => {
    show_model_border.value = true;
};
//#endregion

// 设置复制 删除 移动几个按钮的显示位置，
// 选中时候的效果
const on_choose = (index: number, show_tabs: string) => {
    // 如果已经选中了, 设置为不可再次触发事件
    if (show_tabs != '1') {
        // 设置对应的位置为显示
        set_show_tabs(index);
    }
};
// 复制
const copy = (index: number) => {
    // 获取当前数据, 复制的时候id更换一下
    const new_data = {
        ...cloneDeep(get_diy_index_data(index)),
        id: get_math(),
    };
    // 在当前位置下插入数据
    diy_data.value.splice(index, 0, new_data);
    set_show_tabs(index + 1);
};
// 删除
const del = (index: number, is_tabs: boolean) => {
    app?.appContext.config.globalProperties.$common.message_box('删除后不可恢复，确定继续吗?', 'warning').then(() => {
        // 如果是选项卡被删除，则删除tabs组件，并判断是否有拖拽内容，有的选中第一个，没有的时候，默认选中页面设置
        if (is_tabs) {
            tabs_data.value.splice(0, 1);
            if (diy_data.value.length > 0) {
                set_show_tabs(0);
            } else {
                page_settings();
            }
            return;
        } else {
            const show_tabs_index = diy_data.value.findIndex((item: any) => item.show_tabs == '1');
            // 删除的是当前的这个数据
            if (show_tabs_index == index) {
                diy_data.value.splice(index, 1);
                if (diy_data.value.length > 0) {
                    let new_index: number = index;
                    // 删除的时候如果大于0，则显示上边的数据
                    if (index > 0) {
                        new_index = new_index - 1;
                    }
                    set_show_tabs(new_index);
                } else if (tabs_data.value.length > 0) {
                    // 拖拽数据不存在时，选中tabs组件
                    set_tabs_event(true);
                } else {
                    page_settings();
                }
            } else {
                diy_data.value.splice(index, 1);
            }
        }
    });
};
// 向上移动
const moveUp = (index: number, flag: boolean) => {
    if (flag) {
        const old_data = get_diy_index_data(index);
        // 截取前半部分信息, 并反转一下，从最后边往前查询
        const new_list = diy_data.value.slice(0, index).reverse();
        const count = float_count(new_list);
        // 删除当前位置信息
        diy_data.value.splice(index, 1);
        // 将数据插入上一层数据中
        diy_data.value.splice(index - count, 0, old_data);
        // 设置对应的位置为显示
        set_show_tabs(index - count);
    }
};
// 向下移动
const moveDown = (index: number, flag: boolean) => {
    if (flag) {
        const old_data = get_diy_index_data(index);
        // 截取后半部分信息, 舍弃自身的信息
        const new_list = diy_data.value.slice(index + 1, diy_data.value.length);
        const count = float_count(new_list);
        // 删除当前位置信息
        diy_data.value.splice(index, 1);
        // 将数据插入下一层数据中
        diy_data.value.splice(index + count, 0, old_data);
        set_show_tabs(index + count);
    }
};

const float_count = (new_list: any[]) => {
    // 记录一下当前查询的是否是对应的信息
    let key = '';
    let conunt = 1;
    new_list.forEach((item, index) => {
        // 如果当前的key是悬浮按钮，并且历史的也是就加一，否则的话记录一下当前的key，避免多次循环
        if (item.key == 'float-window' && isEmpty(key)) {
            conunt += 1;
        } else {
            key = item.key;
        }
    });
    return conunt;
};
// 获取当前传递过来的index对应的diy_data中的数据
const get_diy_index_data = (index: number) => {
    return (<arrayIndex>diy_data.value)[index.toString()];
};
// 设置当前选中的是那个
const set_show_tabs = (index: number) => {
    page_data.value.show_tabs = '0';
    footer_nav.value.show_tabs = '0';
    set_tabs_event(false);
    diy_data.value.forEach((item, for_index) => {
        // 先将全部的设置为false,再将当前选中的设置为true
        item.show_tabs = '0';
        if (for_index == index) {
            emits('rightUpdate', item, diy_data.value, page_data.value, footer_nav.value, tabs_data.value);
            item.show_tabs = '1';
            // 悬浮按钮的时候不用滚动到指定位置
            if (item.key != 'float-window') {
                scroll();
            }
        }
    });
};
// 中间区域的滚动效果
const scrollTop = ref<HTMLElement | null>(null);
const activeCard = ref<HTMLElement | null>(null);
// 左边已选组件的滚动效果
const left_scrollTop = ref<HTMLElement | null>(null);
const left_activeCard = ref<HTMLElement | null>(null);
// 滚动到指定位置
const scroll = () => {
    nextTick(() => {
        // 获取当前选中的内容 --中间区域的滚动效果
        activeCard.value = document.querySelector('.plug-in-table.plug-in-border');
        if (activeCard.value) {
            // 获取选中内容的位置
            const scrollY = activeCard.value.offsetTop;
            if (scrollTop.value) {
                // 选中的滚动到指定位置
                scrollTop.value.scrollTo({ top: scrollY - 100, behavior: 'smooth' });
            }
        }
        // 左边已选组件的滚动效果
        left_activeCard.value = document.querySelector('.drawer-drag-bg');
        if (left_activeCard.value) {
            // 获取选中内容的位置
            const left_scrollY = left_activeCard.value.offsetTop;
            if (left_scrollTop.value) {
                // 选中的滚动到指定位置
                left_scrollTop.value.scrollTo({ top: left_scrollY - 200, behavior: 'smooth' });
            }
        }
    });
};
//#endregion
//#region 页面设置 导出 导入
// 在组件挂载时默认执行
onMounted(() => {
    page_settings();
    nextTick(() => {
        const interval = setInterval(() => {
            // 获取分类
            if (common_store.common.module_list.length > 0) {
                components.value = common_store.common.module_list;
                clearInterval(interval);
            }
        }, 1000);
    });
});
//页面设置
const page_settings = () => {
    // 页面设置显示
    page_data.value.show_tabs = '1';
    footer_nav.value.show_tabs = '0';
    set_tabs_event(false);
    // 将拖拽的信息全部变为不选中
    if (diy_data.value.length > 0) {
        diy_data.value.forEach((item) => {
            item.show_tabs = '0';
        });
    }
    emits('rightUpdate', page_data.value, diy_data.value, page_data.value, footer_nav.value, tabs_data.value);
};
const set_tabs_event = (choose: Boolean) => {
    if (tabs_data.value.length > 0 && !choose) {
        tabs_data.value[0].show_tabs = '0';
    } else if (tabs_data.value.length > 0 && choose) {
        tabs_data.value[0].show_tabs = '1';
        page_data.value.show_tabs = '0';
        footer_nav.value.show_tabs = '0';
        // 将拖拽的信息全部变为不选中
        if (diy_data.value.length > 0) {
            diy_data.value.forEach((item) => {
                item.show_tabs = '0';
            });
        }
        emits('rightUpdate', tabs_data.value[0], diy_data.value, page_data.value, footer_nav.value, tabs_data.value);
    }
};
//导出
const export_click = () => {
    emits('export');
};
// 导入
const import_click = () => {
    emits('import');
};
// 清空列表
const clear_click = () => {
    app?.appContext.config.globalProperties.$common.message_box('清空后不可恢复，确定继续吗?', 'warning').then(() => {
        emits('clear');
    });
};
//#endregion

//#region 底部导航
//底部导航设置
const footer_nav_event = () => {
    // 页面设置显示
    page_data.value.show_tabs = '0';
    footer_nav.value.show_tabs = '1';
    set_tabs_event(false);
    // 将拖拽的信息全部变为不选中
    if (diy_data.value.length > 0) {
        diy_data.value.forEach((item) => {
            item.show_tabs = '0';
        });
    }
    emits('rightUpdate', footer_nav.value, diy_data.value, page_data.value, footer_nav.value, tabs_data.value);
};
//#endregion
</script>

<style lang="scss" scoped>
@import 'index.scss';
.drag-area {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1;
}
</style>
