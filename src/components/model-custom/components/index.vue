<template>
    <!-- 左侧模块 -->
    <div class="siderbar flex-col">
        <card-container class="mb-8">
            <el-collapse v-model="activeNames">
                <el-collapse-item v-for="(com, i) in components" :key="i" :title="com.title" :name="com.key">
                    <div class="component flex-row flex-wrap">
                        <div v-for="item in com.item" :key="item.key" class="item">
                            <div class="siderbar-item flex-col jc-c align-c gap-4 draggable" draggable="true" @dragstart="dragStart(item, $event)" @dragend="dragEnd">
                                <img class="img radius-xs" :src="url_computer(item.key)" />
                                <div>{{ item.name }}</div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </card-container>
        <card-container class="mb-8">
            <div class="mb-12">内容设置</div>
            <slider v-model="center_height" :max="1000">组件高度</slider>
        </card-container>
        <card-container class="h selected">
            <div class="flex-col gap-10 drawer-container">
                <div class="flex-row align-c jc-sb">已选组件
                    <div class="flex-row align-c gap-10">
                        <span class="clear-selection" @click="show_computer_line">{{ !is_show_component_line ? '显示' : '关闭' }}参考线</span>
                        <span class="clear-selection" @click="cancel">清除选中</span>
                    </div>
                </div>
                <div ref="left_scrollTop" class="drawer-drag-area">
                    <VueDraggable v-model="diy_data" :animation="500" target=".sort-target" :scroll="true" @sort="on_sort">
                        <TransitionGroup type="transition" tag="ul" name="fade" class="sort-target flex-col h">
                            <template v-if="!isEmpty(diy_data)">
                                <li v-for="(item, index) in diy_data" :key="index" :class="['flex-row gap-y-8 re align-c drawer-drag', { 'drawer-custom-drag-bg': item.show_tabs == '1' }]" @click="on_choose(index, item.show_tabs)" @dblclick="double_click(index)">
                                    <el-icon class="iconfont icon-drag size-16 cr-d" />
                                    <div class="text-line-1 flex align-c" style="width: 70%;">
                                        <template v-if="edit_index == index">
                                            <el-input v-model="item.new_name" placeholder="请输入组件别名" size="small" clearable type="textarea" class="flex-1 do-not-trigger" :rows="1" />
                                        </template>
                                        <template v-else>
                                            <span class="size-12 cr-6 break">{{ !isEmpty(item.new_name) ? item.new_name : item.name  }}</span>
                                        </template>
                                    </div>
                                    <div class="abs draggable-icon" :style="item.show_tabs == '1' ? 'opacity: 1;' : 'opacity: 0.5;'">
                                        <el-icon class="iconfont icon-commodity-edit size-16 cr-primary do-not-trigger two-click"  @click="on_edit(index)" />
                                        <el-icon class="iconfont icon-close-b size-16" @click.stop="del(index)" />
                                    </div>
                                </li>
                            </template>
                            <div v-else class="w h flex jc-c align-c">
                                <no-data></no-data>
                            </div>
                        </TransitionGroup>
                    </VueDraggable>
                </div>
            </div>
        </card-container>
    </div>
    <!-- 视图渲染 -->
    <div class="main">
        <div class="model-content">
            <div v-if="typeof select_index === 'number' && !isNaN(select_index)" class="acticons">
                <div class="plug-in-right" chosenClass="close">
                    <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="删除组件" placement="top">
                        <el-icon class="iconfont icon-del" @click.stop="del(select_index)" />
                    </el-tooltip>
                    <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="复制组件" placement="top">
                        <el-icon class="iconfont icon-copy" @click.stop="copy(select_index)" />
                    </el-tooltip>
                    <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="组件置底" placement="top">
                        <el-icon class="iconfont icon-bottom-up" @click.stop="bottom_up(select_index)" />
                    </el-tooltip>
                    <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="取消置底" placement="top">
                        <el-icon class="iconfont icon-cancel-bottom-placement" @click.stop="cancel_bottom_up(select_index)" />
                    </el-tooltip>
                </div>
            </div>
            <!-- 拖拽区 -->
            <div class="model-drag">
                <div class="model-wall">
                    <div ref="imgBoxRef" class="drag-area re dropzone" @dragover.prevent @dragenter.prevent @drop="drop">
                        <div class="w h" @mousedown.prevent="start_drag" @mousemove.prevent="move_drag" @mouseup.prevent="end_drag">
                            <DraggableContainer v-if="draggable_container" style="z-index:0" :reference-line-visible="true" :disabled="false" reference-line-color="#ddd" @selectstart.prevent @contextmenu.prevent @dragstart.prevent>
                                <!-- @mouseover="on_choose(index)" -->
                                <Vue3DraggableResizable v-for="(item, index) in diy_data" :key="item.id" v-model:w="item.com_data.com_width" v-model:h="item.com_data.com_height" :min-w="0" :min-h="0" :class="{'plug-in-show-component-line': is_show_component_line, 'plug-in-show-tabs': item.show_tabs == '1', 'vdr-handle-z-index': item.com_data.bottom_up == '1' }" :style="{ 'z-index': item.com_data.z_index }" :init-w="item.com_data.com_width" :init-h="item.com_data.com_height" :x="item.location.x" :y="item.location.y" :parent="true" :draggable="is_draggable" @mousedown.stop="on_choose(index, item.show_tabs)" @click.stop="on_choose(index, item.show_tabs)" @drag-end="dragEndHandle($event, index)" @resizing="resizingHandle($event, item.key, index)" @resize-end="resizingHandle($event, item.key, index)">
                                    <div :class="['main-content', { 'plug-in-border': item.show_tabs == '1' }]">
                                        <template v-if="item.key == 'text'">
                                            <model-text :key="item.id" :value="item.com_data" :source-list="props.sourceList"></model-text>
                                        </template>
                                        <template v-else-if="item.key == 'img'">
                                            <model-image :key="item.id" :value="item.com_data" :source-list="props.sourceList"></model-image>
                                        </template>
                                        <template v-else-if="item.key == 'auxiliary-line'">
                                            <model-lines :key="item.id" :value="item.com_data" :source-list="props.sourceList"></model-lines>
                                        </template>
                                        <template v-else-if="item.key == 'icon'">
                                            <model-icon :key="item.id" :value="item.com_data" :source-list="props.sourceList"></model-icon>
                                        </template>
                                        <template v-else-if="item.key == 'panel'">
                                            <model-panel :key="item.id" :value="item.com_data" :source-list="props.sourceList"></model-panel>
                                        </template>
                                    </div>
                                </Vue3DraggableResizable>
                            </DraggableContainer>
                            <div ref="areaRef" class="area" :style="init_drag_style"></div>
                        </div>
                        <div v-for="(item, index) in hot_list.data" :key="index" class="area-box" :style="rect_style(item.drag_start, item.drag_end)" @mousedown.stop="start_drag_area_box(index, $event)" @dblclick="dbl_drag_event(item, index)">
                            <div class="del-btn" @click.stop="del_area_event(index)"><icon name="close"></icon></div>
                            <div class="drag-btn drag-tl" :data-index="index" @mousedown.stop="start_drag_btn_tl(index, $event)"></div>
                            <div class="drag-btn drag-tc" :data-index="index" @mousedown.stop="start_drag_btn_tc(index, $event)"></div>
                            <div class="drag-btn drag-lc" :data-index="index" @mousedown.stop="start_drag_btn_lc(index, $event)"></div>
                            <div class="drag-btn drag-bl" :data-index="index" @mousedown.stop="start_drag_btn_bl(index, $event)"></div>
                            <div class="drag-btn drag-bc" :data-index="index" @mousedown.stop="start_drag_btn_bc(index, $event)"></div>
                            <!-- 已完成 -->
                            <div class="drag-btn drag-br" :data-index="index" @mousedown.stop="start_drag_btn_br(index, $event)"></div>
                            <div class="drag-btn drag-rc" :data-index="index" @mousedown.stop="start_drag_btn_rc(index, $event)"></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { cloneDeep, isEmpty } from 'lodash';
import { get_math } from '@/utils';
import { text_com_data, img_com_data, line_com_data, icon_com_data, panel_com_data, isRectangleIntersecting } from "./index-default";
import { SortableEvent, VueDraggable } from 'vue-draggable-plus';
// 删除
const app = getCurrentInstance();
//#region 传递参数和传出数据的处理
const emits = defineEmits(['rightUpdate']);
interface Props {
    list: diy_content[];
    sourceList: object;
}
const props = defineProps<Props>();
//#endregion
//#region 初始值
const activeNames = reactive(['1', '2']);
const components = reactive([
    {
        title: '组件',
        key: '1',
        item: [
            {
                key: 'text',
                name: '文本',
                new_name: '',
                com_data: text_com_data
            },
            {
                key: 'img',
                name: '图片',
                new_name: '',
                com_data: img_com_data,
            },
            {
                key: 'auxiliary-line',
                name: '线条',
                new_name: '',
                com_data: line_com_data,
            },
            {
                key: 'icon',
                name: '图标',
                new_name: '',
                com_data: icon_com_data,
            },
            {
                key: 'panel',
                name: '面板',
                new_name: '',
                com_data: panel_com_data,
            },
        ],
    },
]);
const url_computer = (name: string) => {
    const new_url = ref(new URL(`../../../assets/images/custom/${name}.png`, import.meta.url).href).value;
    return new_url;
};
//#endregion
//#region 组件边线相关
const is_show_component_line = ref(false);
const show_computer_line = () => {
    is_show_component_line.value = !is_show_component_line.value;
    // set_show_tabs(0);
    cancel();
};
//#endregion
//#region 左侧处理逻辑
const select_index = ref<null | number>(null);
// 任何行动都会触发
const on_sort = (item: SortableEvent) => {
    let index = item?.newIndex || 0;
    // 设置对应的位置为显示
    set_show_tabs(index);
};
//#endregion 
//#region 中间区域的处理逻辑
const diy_data = toRef(props.list);

// 因为容器变更的话，需要重新计算高度，所以不能默认选中第一个
// onMounted(() => {
//     // 如果默认不等于空的话，则默认选中第一个
//     if (!isEmpty(diy_data)) {
//         on_choose(0, false);
//     }
// });
onMounted(() => {
    // 监听点击事件
    document.addEventListener('click', outerClick);
});
onUnmounted(() => {
    // 移除监听事件
    document.removeEventListener('click', outerClick);
});

const edit_index = ref(-1);
const on_edit = (index: number) => {
    if (edit_index.value === index) {
        edit_close_processing(index);
        edit_index.value = -1;
    } else {
        edit_index.value = index;
        edit_processing(index);
    }
};
// 判断点击的是否是可以点击的区域，其他区域隐藏掉编辑属性
const outerClick = (e: any) => {
    if (!e.target.className.includes('do-not-trigger') && !e.target.parentNode.className.includes('do-not-trigger')) {
        edit_close_processing(edit_index.value);
        edit_index.value = -1;
    }
};
const double_click = (index: number) => {
    edit_index.value = index;
    edit_processing(index);
};
// 编辑时的数据处理
const edit_processing = (index: number) => {
    const list = diy_data.value[index];
    if (!isEmpty(list) && isEmpty(list.new_name)) {
        list.new_name = list.name;
    }
};
//编辑关闭前的处理
const edit_close_processing = (index: number) => {
    const list = diy_data.value[index];
    if (!isEmpty(list) && !isEmpty(list.new_name) && list.new_name === list.name) {
        list.new_name = '';
    }
};
// 复制
const copy = (index: null | number) => {
    if (typeof index === 'number' && !isNaN(index)) {
        // 获取当前数据, 复制的时候id更换一下
        const new_data = {
            ...cloneDeep(get_diy_index_data(index)),
            id: get_math(),
        };
        // 在当前位置下插入数据
        diy_data.value.splice(index, 0, new_data);
        set_show_tabs(index + 1);
    }
};

// 删除
const del = (index: null | number) => {
    if (typeof index === 'number' && !isNaN(index)) {
        app?.appContext.config.globalProperties.$common.message_box('删除后不可恢复，确定继续吗?', 'warning').then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功!',
            });
            const show_tabs_index = diy_data.value.findIndex((item: any) => item.show_tabs == '1');
            // 删除的是当前的这个数据
            if (show_tabs_index == index) {
                // 调用删除接口，然后，更新数据
                diy_data.value.splice(index, 1);
                if (diy_data.value.length > 0) {
                    let new_index: number = index;
                    // 删除的时候如果大于0，则显示上边的数据
                    if (index > 0) {
                        new_index = new_index - 1;
                    }
                    set_show_tabs(new_index);
                } else {
                    emits('rightUpdate', {});
                }
            } else {
                diy_data.value.splice(index, 1);
            }
        });
    }
};
const bottom_up = (index: number) => {
    console.log('bottom_up', index);
    if (typeof index === 'number' && !isNaN(index)) {
        if (!isEmpty(diy_data.value[index])) {
            const new_z_index = z_index.value - 1;
            diy_data.value[index].com_data.z_index = new_z_index;
            z_index.value = new_z_index;
        }
    }
};

const cancel_bottom_up = (index: number) => {
    if (typeof index === 'number' && !isNaN(index)) {
        if (!isEmpty(diy_data.value[index])) {
            diy_data.value[index].com_data.z_index = 0;
        }
    }
};

// 获取当前传递过来的index对应的diy_data中的数据
const get_diy_index_data = (index: number) => {
    return (<arrayIndex>diy_data.value)[index.toString()];
};
// 设置当前选中的是那个
const set_show_tabs = (index: number) => {
    is_show_component_line.value = false;
    diy_data.value.forEach((item, for_index) => {
        // 先将全部的设置为false,再将当前选中的设置为true
        item.show_tabs = '0';
        if (for_index == index) {
            select_index.value = for_index;
            item.show_tabs = '1';
            scroll();
            emits('rightUpdate', item);
        }
    });
};
// 左边已选组件的滚动效果
const left_scrollTop = ref<HTMLElement | null>(null);
const left_activeCard = ref<HTMLElement | null>(null);
// 滚动到指定位置
const scroll = () => {
    nextTick(() => {
        // 左边已选组件的滚动效果
        left_activeCard.value = document.querySelector('.drawer-custom-drag-bg');
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
// 选中和鼠标按下时候的效果
const on_choose = (index: number, show_tabs: string) => {
    // 如果已经选中了, 设置为不可再次触发事件
    if (show_tabs != '1') {
        // 设置对应的位置为显示
        set_show_tabs(index);
    }
};
// 清除选中
const cancel = () => {
    diy_data.value.forEach((item) => {
        item.show_tabs = '0';
    });
    select_index.value = null;
    emits('rightUpdate', {});
};
//#endregion
//#region 容器高度发生变化时的处理
const center_height = defineModel('height', { type: Number, default: 0 });
const drag_area_height = computed(() => center_height.value + 'px');
const draggable_container = ref(true);
let data = reactive<diy_content[]>([]);
const z_index = ref(0);
watch(() => center_height.value, () => {
    data = diy_data.value;
    // 从 DOM 中删除组件
    draggable_container.value = false;
    nextTick(() => {
        // 在 DOM 中添加组件
        diy_data.value = data.map((item) => ({
            ...item,
            show_tabs: '0',
            location: {
                x: item.location.x,
                y: item.location.staging_y,
                record_x: item.location.x,
                record_y: item.location.staging_y,
                staging_y: item.location.staging_y,
            },
            com_data: {
                ...item.com_data,
                com_height: item.com_data.staging_height,
            },
        }));
        if (diy_data.value.length > 0) {
            const list = diy_data.value.sort((a, b) => a.com_data.z_index - b.com_data.z_index);
            z_index.value = list[list.length - 1].com_data.z_index || 0;
        }
        // 容器高度变化时，组件不绑定右侧数据
        emits('rightUpdate', {});
        draggable_container.value = true;
    });
},{ immediate:true, deep: true });
//#endregion
//#region 左侧拖拽过来的处理
let draggedItem = ref<any>({});
const dragStart = (item: any, event: any) => {
    // 初始化拖拽的数据
    draggedItem.value = {
        name: item.name,
        show_tabs: '1',
        is_enable: '1',
        location: { x: 0, y: 0, record_x: 0, record_y: 0, staging_y: 0},
        src: item.src,
        id: get_math(),
        key: item.key,
        is_hot: '0',
        com_data: cloneDeep(item.com_data),
    };
    // 拖拽的时候清空热区
    hot_list.data = [];
};
const dragEnd = () => {
    draggedItem.value = {};
};
const drop = (event: any) => {
    if (draggedItem.value) {
        const com_width = draggedItem.value.com_data.com_width;
        const com_height = draggedItem.value.com_data.com_height;
        let location_x = event.offsetX;
        let location_y = event.offsetY;
        // 使用新函数调整位置
        const { x: adjustedX, y: adjustedY } = adjustPosition(location_x, location_y, com_width, com_height, 390, center_height.value);
        const newItem = {
            ...draggedItem.value,
            location: {
                x: adjustedX,
                y: adjustedY,
                record_x: adjustedX,
                record_y: adjustedY,
                staging_y: adjustedY,
            },
        };

        diy_data.value.push(newItem);
        set_show_tabs(diy_data.value.length - 1);
    }
};
function adjustPosition(x: number, y: number, width:number, height:number, maxWidth:number, maxHeight:number) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // 确保元素不会超出屏幕范围
    x = Math.max(0, Math.min(maxWidth - width, x - halfWidth));
    y = Math.max(0, Math.min(maxHeight - height, y - halfHeight));

    return { x, y };
}
//#endregion
//#region 区域内拖拽显示
const dragEndHandle = (item: any, index: number) => {
    diy_data.value[index].location = { x: item.x, y: item.y, record_x: item.x, record_y: item.y, staging_y: item.y };
};
// {x: number, y: number, w: number, h: number}
const resizingHandle = (new_location: any, key: string, index: number) => {
    const { x, y, w, h } = new_location;
    diy_data.value[index].location = { x, y, record_x: x, record_y: y, staging_y: y };
    const com_data = diy_data.value[index].com_data;
    com_data.com_width = w;
    com_data.com_height = h;
    com_data.staging_height = h;
    if (key == 'img') {
        const { img_width, img_height } = handleImg(com_data, w, h);
        com_data.img_width = img_width;
        com_data.img_height = img_height;
    } else if (key == 'auxiliary-line') {
        const { line_width, line_size } = handleAuxiliaryLine(com_data, w, h);
        com_data.line_width = line_width;
        com_data.line_size = line_size;
    }
};
// 图片大小的计算
const handleImg = (com_data: any, w: number, h: number ) => {
    if (com_data.border_show == '1') {
        return { img_width: w - com_data.border_size * 2, img_height: h - com_data.border_size * 2 }
    } else {
        return { img_width: w, img_height: h }
    }
};
// 线条的计算
const handleAuxiliaryLine = (com_data: any, w: number, h: number ) => {
    if (com_data.line_settings === 'horizontal') {
        return { line_width: com_data.com_width, line_size: com_data.com_height - 10 }
    } else {
        return { line_width: com_data.com_height, line_size: com_data.com_width - 10 }
    }
};
//#endregion
//#region 全部拖拽添加
const hot_list = reactive({ data: [] as hotListData[] });
const hot_list_index = ref(0);
const imgBoxRef = ref<HTMLElement | null>(null);
const rect_start = ref<rectCoords>({ x: 0, y: 0, width: 0, height: 0 });
const rect_end = ref<rectCoords>({ x: 0, y: 0, width: 0, height: 0 });
const areaRef = ref<HTMLElement | null>(null);
const init_drag_style = ref('');
const is_draggable = ref(true);
// 拖拽生成盒子的开关
const drag_bool = ref(false);
// 拖拽盒子的开关
const drag_box_bool = ref(false);
// 拖拽放大缩小盒子的开关
const drag_box_scale_bool = ref(false);
const start_drag = (event: MouseEvent) => {
    drag_bool.value = true;
    if (!imgBoxRef.value) return;
    rect_start.value.x = rect_start.value.x != 0 ? rect_start.value.x : event.clientX - imgBoxRef.value.getBoundingClientRect().left;
    rect_start.value.y = rect_start.value.y != 0 ? rect_start.value.y : event.clientY - imgBoxRef.value.getBoundingClientRect().top;
    rect_start.value.width = 0;
    rect_start.value.height = 0;
};
const move_drag = (event: MouseEvent) => {
    if (drag_bool.value) {
        if (!imgBoxRef.value) return;
        rect_end.value.x = event.clientX - imgBoxRef.value.getBoundingClientRect().left;
        rect_end.value.y = event.clientY - imgBoxRef.value.getBoundingClientRect().top;
        rect_end.value.width = rect_end.value.x - rect_start.value.x > 0 ? rect_end.value.x - rect_start.value.x : 0;
        rect_end.value.height = rect_end.value.y - rect_start.value.y > 0 ? rect_end.value.y - rect_start.value.y : 0;
        if (rect_end.value.width > 5 && rect_end.value.height > 5) {
            hot_list.data = [];
        }
        init_drag_style.value = `left: ${rect_start.value.x}px;top: ${rect_start.value.y}px;width: ${Math.max(rect_end.value.width, 1)}px;height: ${Math.max(rect_end.value.height, 1)}px;display: flex;`;
    }
};
const end_drag = (event: MouseEvent) => {
    drag_bool.value = false;
    if (areaRef.value) areaRef.value.style.display = 'none';
    if (!imgBoxRef.value) return;
    init_drag_style.value = ``;
    if (rect_end.value.width > 16 && rect_end.value.height > 16) {
        hot_list.data = [{ name: '热区' + (hot_list.data.length + 1), link: {}, drag_start: cloneDeep(rect_start.value), drag_end: cloneDeep(rect_end.value) }];
        diy_data.value.forEach((item: any) => {
            item.show_tabs = '0';
        });
        select_index.value = null;
        emits('rightUpdate', {});
    }
    rect_start.value = { x: 0, y: 0, width: 0, height: 0 };
    rect_end.value = { x: 0, y: 0, width: 0, height: 0 };
};
const area_box_point = ref({ x: 0, y: 0 });
// area-box
const dbl_drag_event = (item: hotListData, index: number) => {
    hot_list_index.value = index;
};
const start_drag_area_box = (index: number, event: MouseEvent) => {
    hot_list_index.value = index;
    event.stopPropagation();
    drag_box_bool.value = true;
    let clone_drag_start = cloneDeep(hot_list.data[hot_list_index.value].drag_start);
    let clone_drag_end = cloneDeep(hot_list.data[hot_list_index.value].drag_end);
    // 记录原始位置
    area_box_point.value = {
        x: clone_drag_start.x - event.clientX,
        y: clone_drag_start.y - event.clientY,
    };
    is_draggable.value = false;
    // 当前选中区域包含的内容
    const rect1 = { x: clone_drag_start.x, y: clone_drag_start.y, width: clone_drag_end.width, height: clone_drag_end.height }
    diy_data.value.forEach(item => {
        const rect2 = { x: item.location.x, y: item.location.y, width: item.com_data.com_width, height: item.com_data.com_height };
        // 如果交集或者包裹，返回为1，否则为0
        item.is_hot = isRectangleIntersecting(rect1, rect2);
    });

    // 当子元素拖拽方法触发后父元素方法不触发
    document.onmousemove = (areaBoxEvent) => {
        // areaBoxEvent.stopPropagation();
        if (drag_box_bool.value) {
            if (!imgBoxRef.value) return;
            const new_coordinate = {
                x: areaBoxEvent.clientX + area_box_point.value.x,
                y: areaBoxEvent.clientY + area_box_point.value.y,
            };
            // 左上边界判断
            if (new_coordinate.x < 0) {
                new_coordinate.x = 0;
            }
            if (new_coordinate.y < 0) {
                new_coordinate.y = 0;
            }
            // 右下边界判断
            if (new_coordinate.x + Math.max(clone_drag_end.width, 1) > imgBoxRef.value.getBoundingClientRect().width) {
                new_coordinate.x = imgBoxRef.value.getBoundingClientRect().width - Math.max(clone_drag_end.width, 1);
            }
            if (new_coordinate.y + Math.max(clone_drag_end.height, 1) > imgBoxRef.value.getBoundingClientRect().height) {
                new_coordinate.y = imgBoxRef.value.getBoundingClientRect().height - Math.max(clone_drag_end.height, 1);
            }
            // 计算鼠标移动的距离
            const move_x = new_coordinate.x - clone_drag_start.x;
            const move_y = new_coordinate.y - clone_drag_start.y;
            // 遍历对象,包裹在区域内部的拖拽距离更新
            diy_data.value.forEach(item => {
                if (item.is_hot == '1') { // 只更新交集和包裹中的数据
                    let { record_x, record_y} = cloneDeep(item.location);
                    item.location.x = Math.max(0, record_x + move_x);
                    item.location.y = Math.max(0, record_y + move_y);
                }
            });
            hot_list.data[hot_list_index.value].drag_start.x = new_coordinate.x;
            hot_list.data[hot_list_index.value].drag_start.y = new_coordinate.y;
            hot_list.data[hot_list_index.value].drag_end.x = new_coordinate.x + Math.max(clone_drag_end.width, 1);
            hot_list.data[hot_list_index.value].drag_end.y = new_coordinate.y + Math.max(clone_drag_end.height, 1);
        }
    };
    document.onmouseup = () => {
        is_draggable.value = true;
        drag_box_bool.value = false;
        // 鼠标抬起的时候将默认值重置为当前x、y坐标
        diy_data.value.forEach(item => {
            if (item.is_hot == '1') {
                const { x, y } = cloneDeep(item.location);
                item.location.record_x = x;
                item.location.record_y = y;
            }
        });
    };
};

// drag-btn
const start_drag_btn_br = (index: number, event: MouseEvent) => {
    start_drag_btn(index, event, 'br');
};
const start_drag_btn_bl = (index: number, event: MouseEvent) => {
    start_drag_btn(index, event, 'bl');
};
const start_drag_btn_bc = (index: number, event: MouseEvent) => {
    start_drag_btn(index, event, 'bc');
};
const start_drag_btn_tl = (index: number, event: MouseEvent) => {
    start_drag_btn(index, event, 'tl');
};
const start_drag_btn_tc = (index: number, event: MouseEvent) => {
    start_drag_btn(index, event, 'tc');
};
const start_drag_btn_lc = (index: number, event: MouseEvent) => {
    start_drag_btn(index, event, 'lc');
};
const start_drag_btn_rc = (index: number, event: MouseEvent) => {
    start_drag_btn(index, event, 'rc');
};
// 画布拖拽公用方法
const start_drag_btn = (index: number, event: MouseEvent, type: string) => {
    hot_list_index.value = index;
    event.stopPropagation();
    drag_box_scale_bool.value = true;
    let clone_drag_start = hot_list.data[hot_list_index.value].drag_start;
    let clone_drag_end = hot_list.data[hot_list_index.value].drag_end;
    document.onmousemove = (dragBtnEvent) => {
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        if (drag_box_scale_bool.value) {
            if (!imgBoxRef.value) return;

            switch (type) {
                case 'br':
                    // 下右
                    clone_drag_end.x = handleBoundary(dragBtnEvent.clientX - imgBoxRef.value.getBoundingClientRect().left, 0, imgBoxRef.value.getBoundingClientRect().width);
                    clone_drag_end.y = handleBoundary(dragBtnEvent.clientY - imgBoxRef.value.getBoundingClientRect().top, 0, imgBoxRef.value.getBoundingClientRect().height);
                    hot_list.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, clone_drag_end);
                    break;
                case 'bl':
                    // 下左
                    clone_drag_start.x = handleBoundary(dragBtnEvent.clientX - imgBoxRef.value.getBoundingClientRect().left, 0, clone_drag_end.x);
                    clone_drag_end.y = handleBoundary(dragBtnEvent.clientY - imgBoxRef.value.getBoundingClientRect().top, 0, imgBoxRef.value.getBoundingClientRect().height);
                    hot_list.data[hot_list_index.value].drag_start.x = clone_drag_start.x;
                    hot_list.data[hot_list_index.value].drag_end.y = clone_drag_end.y;
                    hot_list.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, { y: clone_drag_end.y });
                    break;
                case 'bc':
                    // 下中
                    clone_drag_end.y = handleBoundary(dragBtnEvent.clientY - imgBoxRef.value.getBoundingClientRect().top, 0, imgBoxRef.value.getBoundingClientRect().height);
                    hot_list.data[hot_list_index.value].drag_end.y = clone_drag_end.y;
                    hot_list.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, { y: clone_drag_end.y });
                    break;
                case 'tl':
                    // 上左
                    clone_drag_start.x = handleBoundary(dragBtnEvent.clientX - imgBoxRef.value.getBoundingClientRect().left, 0, clone_drag_end.x);
                    clone_drag_start.y = handleBoundary(dragBtnEvent.clientY - imgBoxRef.value.getBoundingClientRect().top, 0, clone_drag_end.y);
                    hot_list.data[hot_list_index.value].drag_start.x = clone_drag_start.x;
                    hot_list.data[hot_list_index.value].drag_start.y = clone_drag_start.y;
                    hot_list.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, {});
                    break;
                case 'tc':
                    // 上中
                    clone_drag_start.y = handleBoundary(dragBtnEvent.clientY - imgBoxRef.value.getBoundingClientRect().top, 0, clone_drag_end.y);
                    hot_list.data[hot_list_index.value].drag_start.y = clone_drag_start.y;
                    hot_list.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, { y: clone_drag_end.y });
                    break;
                case 'lc':
                    // 左中
                    clone_drag_start.x = handleBoundary(dragBtnEvent.clientX - imgBoxRef.value.getBoundingClientRect().left, 0, clone_drag_end.x);
                    hot_list.data[hot_list_index.value].drag_start.x = clone_drag_start.x;
                    hot_list.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, {});
                    break;
                case 'rc':
                    // 右中
                    clone_drag_end.x = handleBoundary(dragBtnEvent.clientX - imgBoxRef.value.getBoundingClientRect().left, 0, imgBoxRef.value.getBoundingClientRect().width);
                    hot_list.data[hot_list_index.value].drag_end.x = clone_drag_end.x;
                    hot_list.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, { x: clone_drag_end.x });
                    break;
            }
        }
    };
    document.onmouseup = () => {
        drag_box_scale_bool.value = false;
    };
};

// 辅助函数用于更新drag_end
const updateDragEnd = (dragStart: { x: number; y: number }, dragEnd: { x: number; y: number }, newDragEnd: { x?: number; y?: number }) => {
    const newX = newDragEnd.x != undefined ? newDragEnd.x : dragEnd.x;
    const newY = newDragEnd.y != undefined ? newDragEnd.y : dragEnd.y;
    return {
        x: newX,
        y: newY,
        width: newX - dragStart.x > 0 ? newX - dragStart.x : 0,
        height: newY - dragStart.y > 0 ? newY - dragStart.y : 0,
    };
};

// 辅助函数用于处理边界
const handleBoundary = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

const del_area_event = (index: number) => {
    hot_list.data.splice(index, 1);
};
const rect_style = computed(() => {
    return (start: rectCoords, end: rectCoords) => {
        return `left: ${start.x}px;top: ${start.y}px;width: ${Math.max(end.width, 1)}px;height: ${Math.max(end.height, 1)}px;display: flex;`;
    };
});
//#endregion
//#region 绑定上下左右事件
const handleKeyUp = (e: KeyboardEvent) => {
    let key_code = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    let x = 0;
    let y = 0;
    // 键盘控制
    if (e.key === 'ArrowUp') { //上键
        y = -1;
    } else if (e.key === 'ArrowDown') { // 下键
        y = 1;
    } else if (e.key === 'ArrowLeft') { //左键
        x = -1;
    } else if (e.key === 'ArrowRight') { //右键
        x = 1;
    }
    e.preventDefault();
    // 只有是点击上下左右的时候才会生效
    if (key_code.includes(e.key)) {
        data_handling(x, y);
    }
};
const data_handling = (x: number, y: number) => {
    // 遍历对象,内部容器更新
    if (hot_list.data.length > 0) {
        // 更新热区位置
        const { drag_start, drag_end } = hot_list.data[0];
        if (isWithinBounds(drag_start.x + x, drag_end.width, 390)) {
            hot_list.data[0].drag_start.x += x;
        }
        if (isWithinBounds(drag_start.y + y, drag_end.height, center_height.value)) {
            hot_list.data[0].drag_start.y += y;
        }
        // 按下按钮的时候判断当前包含哪些组件, 避免后续包裹的或者没有手动拖拽过的无法更新其中组件的内容
        const rect1 = { x: drag_start.x, y: drag_start.y, width: drag_end.width, height: drag_end.height }
        diy_data.value.forEach(item => {
            const rect2 = { x: item.location.x, y: item.location.y, width: item.com_data.com_width, height: item.com_data.com_height };
            // 如果交集或者包裹，返回为1，否则为0
            if (isRectangleIntersecting(rect1, rect2) == '1') {
                // x 轴不小于0 并且不大于容器宽度
                if (isWithinBounds(item.location.x + x, item.com_data.com_width, 390)) {
                    item.location.x += x;
                }
                // Y轴不小于0 并且不大于容器高度
                if (isWithinBounds(item.location.y + y, item.com_data.com_height, center_height.value)) {
                    item.location.y += y;
                    item.location.staging_y += y;
                }
            }
        });
    } else {
        diy_data.value.forEach(item => {
            // 只更新选中的数据
            if (item.show_tabs == '1') {
                // x 轴不小于0 并且不大于容器宽度
                if (isWithinBounds(item.location.x + x, item.com_data.com_width, 390)) {
                    item.location.x += x;
                }
                // Y轴不小于0 并且不大于容器高度
                if (isWithinBounds(item.location.y + y, item.com_data.com_height, center_height.value)) {
                    item.location.y += y;
                    item.location.staging_y += y;
                }
            }
        });
    }
};
// coordinate 新的坐标 current_size 当前坐标对应的组件大小(指的是组件的宽高) max_size 容器的最大大小
const isWithinBounds = (coordinate:number, current_size: number, max_size: number) => coordinate >= 0 && coordinate + current_size <= max_size;
onMounted(() => {
    // 监听键盘事件
    document.addEventListener('keyup', handleKeyUp);
});
onUnmounted(() => {
    // 移除监听事件
    document.removeEventListener('keyup', handleKeyUp);
});
//#endregion 
defineExpose({
    diy_data,
});
</script>

<style lang="scss" scoped>
@import 'index.scss';
.model-drag {
    overflow-y: scroll;
    .model-wall {
        width: 39rem;
        background-image: linear-gradient(45deg, #e5e5e5 25%, transparent 25%), linear-gradient(135deg, #e5e5e5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e5e5 75%), linear-gradient(135deg, transparent 75%, #e5e5e5 75%);
        background-size: 32px 32px;
        background-position: 0 0, 16px 0, 16px -16px, 0 16px;
        margin: 0 auto;
        .drag-area {
            height: v-bind(drag_area_height);
            width: 100%;
            margin: 0.5rem 0; // 用于将上边框和下边框显示出来
            user-select: none;
            cursor: crosshair;
        }
        .main-content {
            max-width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
}
</style>
