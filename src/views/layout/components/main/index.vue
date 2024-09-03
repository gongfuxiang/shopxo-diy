<template>
    <!-- 左侧模块 -->
    <div class="siderbar flex-col">
        <el-collapse v-model="activeNames">
            <el-collapse-item v-for="(com, i) in components" :key="i" :title="com.name" :name="com.key">
                <VueDraggable v-model="com.data" :animation="500" ghost-class="ghost" :group="{ name: 'people', pull: 'clone', put: false }" class="component flex-row flex-wrap" :clone="clone_item_com_data" :on-start="onStart" :sort="false" :force-fallback="true">
                    <div v-for="item in com.data" :key="item.key" class="item">
                        <div class="main-border siderbar-hidden main-show tc">释放鼠标将组件添加到此处</div>
                        <div class="siderbar-show main-hidden flex-col jc-c align-c gap-4">
                            <img class="img radius-xs" :src="url_computer(item.key)" />
                            <div>{{ item.name }}</div>
                        </div>
                    </div>
                </VueDraggable>
            </el-collapse-item>
        </el-collapse>
    </div>
    <div class="drawer-container" :style="`width: ${diy_data.length > 0 ? '12.8rem' : '0px'}`">
        <div class="drawer-content" :style="{ left: diy_data.length > 0 ? '0' : '-100%' }">
            <div class="size-14 cr-3 fw ptb-20 pl-12 drawer-title" :style="{ opacity: diy_data.length > 0 ? '1' : '0' }">已选组件({{ diy_data.length }})</div>
            <div ref="left_scrollTop" class="drawer-drag-area">
                <VueDraggable v-model="diy_data" :animation="500" target=".sort-target" :scroll="true" :on-sort="on_sort">
                    <TransitionGroup type="transition" tag="ul" name="fade" class="sort-target flex-col">
                        <li v-for="(item, index) in diy_data" :key="index" :class="['flex ptb-12 plr-10 gap-y-8 re align-c drawer-drag', { 'drawer-drag-bg': item.show_tabs }]" @click="on_choose(index, item.show_tabs)">
                            <el-icon class="iconfont icon-drag size-16 cr-d" />
                            <span class="size-12 cr-6">{{ item.name }}</span>
                            <el-icon class="iconfont icon-close-b size-16 abs" :style="[item.show_tabs ? '' : 'display:none']" @click.stop="del(index)" />
                        </li>
                    </TransitionGroup>
                </VueDraggable>
            </div>
        </div>
    </div>
    <!-- 视图渲染 -->
    <div class="main">
        <div class="model">
            <div class="model-content">
                <div class="acticons">
                    <el-button size="large" class="" @click="page_settings">页面设置</el-button>
                    <el-button size="large" class="" @click="export_click">导出</el-button>
                    <el-button size="large" class="" @click="import_click">导入</el-button>
                    <el-button size="large" class="" @click="clear_click">清空</el-button>
                </div>
                <!-- 拖拽区 -->
                <div ref="scrollTop" class="model-drag">
                    <!-- 页面设置 -->
                    <page-settings :show-page="page_data.show_tabs" :page-data="page_data" @page_settings="page_settings"></page-settings>
                    <div class="model-wall" :style="content_style">
                        <div class="model-wall-content" :style="`padding-top:${top_padding}px; margin-top: ${top_margin}px;padding-bottom:${bottom_navigation_show ? footer_nav_counter_store.padding_footer : 0}px;`">
                            <VueDraggable v-model="diy_data" :animation="500" :touch-start-threshold="2" group="people" class="drag-area re" ghost-class="ghost" :on-sort="on_sort" :on-start="on_start" :on-end="on_end">
                                <div v-for="(item, index) in diy_data" :key="item.id" :class="model_class(item)" :style="model_style(item)" @click="on_choose(index, item.show_tabs)">
                                    <div v-if="item.show_tabs" class="plug-in-right" chosenClass="close">
                                        <el-icon :class="`iconfont ${item.is_enable ? 'icon-eye' : 'icon-eye-close'}`" @click.stop="set_enable(index)" />
                                        <el-icon class="iconfont icon-del" @click.stop="del(index)" />
                                        <el-icon class="iconfont icon-copy" @click.stop="copy(index)" />
                                        <el-icon :class="['iconfont', 'icon-arrow-top', icon_arrow_disable(item.key, index, 'moveUp')]" @click.stop="moveUp(index, arrow_disable_method(item.key, index, 'moveUp'))" />
                                        <el-icon :class="['iconfont', 'icon-arrow-bottom', icon_arrow_disable(item.key, index, 'moveDown')]" @click.stop="moveDown(index, arrow_disable_method(item.key, index, 'moveDown'))" />
                                    </div>
                                    <div class="plug-in-name">{{ item.name }}</div>
                                    <div class="main-content" :class="{ 'plug-in-close': !item.is_enable }" :style="main_content_style">
                                        <!-- 基础组件 -->
                                        <!-- 视频 -->
                                        <template v-if="item.key == 'video'">
                                            <model-video :key="item.com_data" :value="item.com_data"></model-video>
                                        </template>
                                        <!-- 用户信息 -->
                                        <template v-else-if="item.key == 'user-info'">
                                            <model-user-info :key="item.com_data" :value="item.com_data"></model-user-info>
                                        </template>
                                        <!-- 文章列表 -->
                                        <template v-else-if="item.key == 'article-list'">
                                            <model-article-list :key="item.com_data" :value="item.com_data"></model-article-list>
                                        </template>
                                        <!-- 文章选项卡 -->
                                        <template v-else-if="item.key == 'article-tabs'">
                                            <model-article-tabs :key="item.com_data" :value="item.com_data"></model-article-tabs>
                                        </template>
                                        <!-- 搜索框 -->
                                        <template v-else-if="item.key == 'search'">
                                            <model-search :key="item.com_data" :value="item.com_data"></model-search>
                                        </template>
                                        <!-- 导航组 -->
                                        <template v-else-if="item.key == 'nav-group'">
                                            <model-nav-group :key="item.com_data" :value="item.com_data"></model-nav-group>
                                        </template>
                                        <!-- 轮播图 -->
                                        <template v-else-if="item.key == 'carousel'">
                                            <model-carousel :key="item.com_data" :value="item.com_data"></model-carousel>
                                        </template>
                                        <!-- 公告 -->
                                        <template v-else-if="item.key == 'notice'">
                                            <model-notice :key="item.com_data" :value="item.com_data"></model-notice>
                                        </template>
                                        <!-- 选项卡 -->
                                        <template v-else-if="item.key == 'tabs'">
                                            <model-tabs :key="item.com_data" :value="item.com_data"></model-tabs>
                                        </template>
                                        <!-- 商品列表 -->
                                        <template v-else-if="item.key == 'shop-list'">
                                            <model-shop-list :key="item.com_data" :value="item.com_data"></model-shop-list>
                                        </template>
                                        <!-- 商品选项卡 -->
                                        <template v-else-if="item.key == 'shop-tabs'">
                                            <model-shop-tabs :key="item.com_data" :value="item.com_data"></model-shop-tabs>
                                        </template>
                                        <!-- 图片魔方 -->
                                        <template v-else-if="item.key == 'img-magic'">
                                            <model-img-magic :key="item.com_data" :value="item.com_data" :show-tabs="item.show_tabs"></model-img-magic>
                                        </template>
                                        <!-- 数据魔方 -->
                                        <template v-else-if="item.key == 'data-magic'">
                                            <model-data-magic :key="item.com_data" :value="item.com_data" :show-tabs="item.show_tabs"></model-data-magic>
                                        </template>
                                        <!-- 热区 -->
                                        <template v-else-if="item.key == 'hot-zone'">
                                            <model-hot-zone :key="item.com_data" :value="item.com_data"></model-hot-zone>
                                        </template>
                                        <!-- 自定义 -->
                                        <template v-else-if="item.key == 'custom'">
                                            <model-custom :key="item.com_data" :value="item.com_data" :show-tabs="item.show_tabs"></model-custom>
                                        </template>
                                        <!-- 营销组件 -->
                                        <!-- 优惠券 -->
                                        <template v-else-if="item.key == 'coupon'">
                                            <model-coupon :key="item.com_data" :value="item.com_data"></model-coupon>
                                        </template>
                                        <template v-else-if="item.key == 'seckill'">
                                            <model-seckill :key="item.com_data" :value="item.com_data"></model-seckill>
                                        </template>
                                        <!-- 工具组件 -->
                                        <!-- 辅助线 -->
                                        <template v-else-if="item.key == 'row-line'">
                                            <model-auxiliary-line :key="item.com_data" :value="item.com_data"></model-auxiliary-line>
                                        </template>
                                        <!-- 辅助空白 -->
                                        <template v-else-if="item.key == 'auxiliary-blank'">
                                            <model-auxiliary-blank :key="item.com_data" :value="item.com_data"></model-auxiliary-blank>
                                        </template>
                                        <!--富文本 -->
                                        <template v-else-if="item.key == 'rich-text'">
                                            <model-rich-text :key="item.com_data" :value="item.com_data"></model-rich-text>
                                        </template>
                                        <!-- 文本标题 -->
                                        <template v-else-if="item.key == 'text-title'">
                                            <model-text-title :key="item.com_data" :value="item.com_data"></model-text-title>
                                        </template>
                                        <!-- 悬浮按钮 -->
                                        <template v-else-if="item.key == 'float-window'">
                                            <model-float-window :key="item.com_data" :value="item.com_data" @change="float_bottom_change($event, item.id)"></model-float-window>
                                        </template>
                                    </div>
                                </div>
                            </VueDraggable>
                        </div>
                    </div>
                    <div class="seat"></div>
                </div>
                <!-- 底部区域 -->
                <div v-if="bottom_navigation_show" class="model-bottom">
                    <footer-nav :show-footer="footer_nav.show_tabs" :footer-data="footer_nav.com_data" @footer-nav="footer_nav_event"></footer-nav>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, get_math, gradient_computer, padding_computer, radius_computer } from '@/utils';
import { cloneDeep } from 'lodash';
import { SortableEvent, VueDraggable } from 'vue-draggable-plus';
import defaultSettings from './index';
import { footerNavCounterStore, commonStore } from '@/store';
const footer_nav_counter_store = footerNavCounterStore();
const common_store = commonStore();
const app = getCurrentInstance();
import { isEmpty } from 'lodash';
const props = defineProps({
    diyData: {
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
const page_data = ref(props.header);
const footer_nav = ref(props.footer);
// 监听
watch(
    () => props.diyData,
    (newValue) => {
        diy_data.value = newValue;
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
        if (immersive_style || !up_slide_display) {
            top_padding.value = 0;
        } else {
            top_padding.value = 90;
        }
        // 开启沉浸式并且没有开通上滑显示
        if (immersive_style && !up_slide_display) {
            top_margin.value = -90;
        } else {
            top_margin.value = 0;
        }
    }
});

watch(
    () => props.footer,
    (newValue) => {
        footer_nav.value = newValue;
    }
);

// 父组件调用的方法
const emits = defineEmits(['rightUpdate']);
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

// 模块的class
const model_class = computed(() => {
    return (item: { show_tabs: boolean; key: string; is_enable: boolean; id: string }) => {
        return ['plug-in-table', { 'plug-in-border': item.show_tabs, 'float-window': item.key == 'float-window', 'plug-in-animation': !item.show_tabs && show_model_border }];
    };
});

const model_style = computed(() => {
    return (item: { id: string; key: string }) => {
        // window.innerHeight(当前页面高度) - 80(顶部高度) - 844
        const height = (window.innerHeight - 924) / 2;
        let bottom = parseInt(float_bottom[item.id]) + height;
        // 容器自身高度是60 775-60 =  695
        if (parseInt(float_bottom[item.id]) > 695) {
            bottom = 695 + height;
        }
        return item.key == 'float-window' ? `bottom: ${((bottom / window.innerHeight) * 100).toFixed(4) + '%'};` : '';
    };
});
const icon_arrow_disable = computed(() => {
    return (item_key: string, index: number, key: string) => {
        return arrow_disable_method(item_key, index, key) ? '' : 'disabled';
    };
});
// 判断逻辑
const arrow_disable_method = (item_key: string, index: number, key: string) => {
    let arrow_disable = true;
    if (item_key == 'float-window') {
        arrow_disable = false;
    } else {
        if (key == 'moveUp') {
            if (index == 0) {
                arrow_disable = false;
            } else {
                // 截取前半部分信息
                const new_list = diy_data.value.slice(0, index);
                // 去除所有的float-window
                const remove_float_list = new_list.filter((item) => item.key != 'float-window');
                // 判断前面除了float-window的个数是否大于0
                arrow_disable = remove_float_list.length == 0 ? false : true;
            }
        } else if (key == 'moveDown') {
            if (index == diy_data.value.length - 1) {
                arrow_disable = false;
            } else {
                // 截取后半部分信息, 舍弃自身的信息
                const new_list = diy_data.value.slice(index + 1, diy_data.value.length);
                // 去除所有的float-window
                const remove_float_list = new_list.filter((item) => item.key != 'float-window');
                // 判断前面除了float-window的个数是否大于0
                arrow_disable = remove_float_list.length == 0 ? false : true;
            }
        }
    }
    return arrow_disable;
};
//#region 拖拽组件的公共方法
// 是否显示提示用户拖拽位置
const isDrag = ref(false);
const show_model_border = ref(true);
interface FloatBottom {
    [key: string]: string;
}
const float_bottom = reactive<FloatBottom>({});
const float_location = reactive<FloatBottom>({});

// 开始拖拽的时候显示位置提示
const onStart = () => {
    isDrag.value = true;
};
// 复制
const clone_item_com_data = (item: commonComponentData) => {
    return {
        name: item.name,
        show_tabs: true,
        is_enable: true,
        src: item.src,
        id: get_math(),
        key: item.key,
        com_data: cloneDeep((defaultSettings as any)[item.key.replace(/-/g, '_')]),
    };
};

// 选中时候的效果
const on_choose = (index: number, show_tabs: Boolean) => {
    // 如果已经选中了, 设置为不可再次触发事件
    if (!show_tabs) {
        // 设置对应的位置为显示
        set_show_tabs(index);
    }
};
// 任何行动都会触发
const on_sort = (item: SortableEvent) => {
    let index = item?.newIndex || 0;
    // if (diy_data.value.length - 1 < index) {
    //     index = diy_data.value.length - 1;
    // }
    isDrag.value = false;
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

//#region 复制 删除 移动等方法的实现
// 是否启用
const set_enable = (index: number) => {
    const old_data = get_diy_index_data(index);
    old_data.is_enable = !old_data.is_enable;
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
const del = (index: number) => {
    app?.appContext.config.globalProperties.$common.message_box('删除后不可恢复，确定继续吗?', 'warning').then(() => {
        const show_tabs_index = diy_data.value.findIndex((item: any) => item.show_tabs);
        if (show_tabs_index == index) {
            diy_data.value.splice(index, 1);
            if (diy_data.value.length > 0) {
                let new_index: number = index;
                // 删除的时候如果大于0，则显示上边的数据
                if (index > 0) {
                    new_index = new_index - 1;
                }
                set_show_tabs(new_index);
            } else {
                page_settings();
            }
        } else {
            diy_data.value.splice(index, 1);
        }
    });
};
// 获取当前传递过来的index对应的diy_data中的数据
const get_diy_index_data = (index: number) => {
    return (<arrayIndex>diy_data.value)[index.toString()];
};
// 设置复制 删除 移动几个按钮的显示位置，
// 设置当前选中的是那个
const set_show_tabs = (index: number) => {
    page_data.value.show_tabs = false;
    footer_nav.value.show_tabs = false;
    diy_data.value.forEach((item, for_index) => {
        // 先将全部的设置为false,再将当前选中的设置为true
        item.show_tabs = false;
        if (for_index == index) {
            emits('rightUpdate', item, diy_data.value, page_data.value, footer_nav.value);
            item.show_tabs = true;
            // 悬浮按钮的时候不用滚动到指定位置
            if (item.key !== 'float-window') {
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
                scrollTop.value.scrollTo({ top: scrollY - 200, behavior: 'smooth' });
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
    page_data.value.show_tabs = true;
    footer_nav.value.show_tabs = false;
    // 将拖拽的信息全部变为不选中
    if (diy_data.value.length > 0) {
        diy_data.value.forEach((item) => {
            item.show_tabs = false;
        });
    }

    emits('rightUpdate', page_data.value, diy_data.value, page_data.value, footer_nav.value);
};
//导出
const export_click = () => {};
//导入
const import_click = () => {};
// 清空列表
const clear_click = () => {
    app?.appContext.config.globalProperties.$common.message_box('清空后不可恢复，确定继续吗?', 'warning').then(() => {
        diy_data.value = [];
        page_settings();
    });
};
//#endregion

//#region 底部导航
//底部导航设置
const footer_nav_event = () => {
    // 页面设置显示
    page_data.value.show_tabs = false;
    footer_nav.value.show_tabs = true;
    // 将拖拽的信息全部变为不选中
    if (diy_data.value.length > 0) {
        diy_data.value.forEach((item) => {
            item.show_tabs = false;
        });
    }
    emits('rightUpdate', footer_nav.value, diy_data.value, page_data.value, footer_nav.value);
};
//#endregion
const float_bottom_change = (val: { bottom: string; location: string }, id: string) => {
    float_bottom[id] = val.bottom;
    float_location[id] = val.location;
};
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
