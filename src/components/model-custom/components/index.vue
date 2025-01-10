<template>
    <!-- 左侧模块 -->
    <div class="siderbar flex-col">
        <card-container class="mb-8">
            <el-collapse v-model="activeNames">
                <el-collapse-item v-for="(com, i) in components" :key="i" :title="com.title" :name="com.key">
                    <div class="component flex-row flex-wrap">
                        <div v-for="item in com.item.filter(item => item.is_show)" :key="item.key" class="item">
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
            <slider v-model="center_height" :max="1000" @operation_end="operation_end(false)">组件高度</slider>
        </card-container>
        <card-container class="h selected">
            <div class="flex-col gap-10 drawer-container">
                <div class="flex-row align-c jc-sb">已选组件({{ diy_data.length }})
                    <div class="flex-row align-c gap-20">
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
                                            <el-input v-model="item.new_name" placeholder="请输入组件别名" size="small" clearable type="textarea" class="flex-1 do-not-trigger" :rows="1" resize="none" />
                                        </template>
                                        <template v-else>
                                            <span class="size-12 cr-6 text-word-break">{{ !isEmpty(item.new_name) ? item.new_name : item.name  }}</span>
                                        </template>
                                    </div>
                                    <div class="abs draggable-icon" :style="item.show_tabs == '1' ? 'opacity: 1;' : 'opacity: 0.5;'">
                                        <el-icon class="iconfont icon-edit size-16 cr-primary do-not-trigger two-click"  @click="on_edit(index)" />
                                        <el-icon class="iconfont icon-close-round-o size-16" @click.stop="del(index)" />
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
            <right-side-operation v-if="typeof select_index === 'number' && !isNaN(select_index) && diy_data.length > 0" v-model:index="select_index" v-model:data-length="diy_data.length" @del="del" @copy="copy" @previous_layer="previous_layer" @underlying_layer="underlying_layer" @top_up="top_up" @bottom_up="bottom_up"></right-side-operation>
            <!-- 拖拽区 -->
            <div class="model-drag">
                <top-side-operation class="model-top-wall" :config-type="props.configType" @back="back" @forward="forward" @handle-history="handle_history"></top-side-operation>
                <div class="model-wall">
                    <div ref="imgBoxRef" class="drag-area re dropzone" @dragover.prevent @dragenter.prevent @drop="drop">
                        <div class="w h" @mousedown.prevent="start_drag" @mousemove.prevent="move_drag" @mouseup.prevent="end_drag">
                            <DraggableContainer v-if="draggable_container" style="z-index:0" :reference-line-visible="true" :disabled="false" reference-line-color="#ddd" @selectstart.prevent @contextmenu.prevent @dragstart.prevent>
                                <!-- @mouseover="on_choose(index)" -->
                                <Vue3DraggableResizable v-for="(item, index) in diy_data" :key="item.id" v-model:w="item.com_data.com_width" v-model:h="item.com_data.com_height" :min-w="0" :min-h="0" :class="{'plug-in-show-component-line': is_show_component_line, 'plug-in-show-tabs': item.show_tabs == '1', 'vdr-handle-z-index': item.com_data.bottom_up == '1' }" :style="{ 'z-index': (diy_data.length - 1) - index }" :init-w="item.com_data.com_width" :init-h="item.com_data.com_height" :x="item.location.x" :y="item.location.y" :parent="true" :draggable="is_draggable" @mousedown.stop="on_choose(index, item.show_tabs)" @click.stop="on_choose(index, item.show_tabs)" @drag-end="dragEndHandle($event, index)" @resizing="resizingHandle($event, item.key, index, 'resizing')" @resize-end="resizingHandle($event, item.key, index, 'resizeEnd')">
                                    <div :class="['main-content flex-row', { 'plug-in-border': item.show_tabs == '1' }]">
                                        <template v-if="item.key == 'text'">
                                            <model-text :key="item.id" :value="item.com_data" :source-list="props.sourceList" :is-custom="isCustom" :custom-group-field-id="customGroupFieldId" :title-params="showData?.data_name || 'name'"></model-text>
                                        </template>
                                        <template v-else-if="item.key == 'img'">
                                            <model-image :key="item.id" :value="item.com_data" :source-list="props.sourceList" :is-custom="isCustom" :custom-group-field-id="customGroupFieldId" :img-params="showData?.data_logo || ''"></model-image>
                                        </template>
                                        <template v-else-if="item.key == 'auxiliary-line'">
                                            <model-lines :key="item.id" :value="item.com_data" :source-list="props.sourceList" :is-custom="isCustom" :custom-group-field-id="customGroupFieldId"></model-lines>
                                        </template>
                                        <template v-else-if="item.key == 'icon'">
                                            <model-icon :key="item.id" :value="item.com_data" :source-list="props.sourceList" :is-custom="isCustom" :custom-group-field-id="customGroupFieldId"></model-icon>
                                        </template>
                                        <template v-else-if="item.key == 'panel'">
                                            <model-panel :key="item.id" :value="item.com_data" :source-list="props.sourceList" :is-custom="isCustom" :custom-group-field-id="customGroupFieldId"></model-panel>
                                        </template>
                                        <template v-else-if="item.key == 'custom-group'">
                                            <model-custom-group :key="item.id" :value="item.com_data" :source-list="props.sourceList" :data-height="item.com_data.custom_height" :data-width="item.com_data.com_width" :is-custom="isCustom"></model-custom-group>
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
import { cloneDeep, isEmpty, property, isEqual } from 'lodash';
import { get_math, adjustPosition, getPlatform } from '@/utils';
import { defaultComData, isRectangleIntersecting } from "./index-default";
import { SortableEvent, VueDraggable } from 'vue-draggable-plus';
import { commonStore, DataSourceStore } from '@/store';
const common_store = commonStore();
// 删除
const app = getCurrentInstance();
//#region 传递参数和传出数据的处理
const emits = defineEmits(['rightUpdate', 'operation_end']);
interface Props {
    configType: string;
    list: diy_content[];
    sourceList: object;
    isCustom: boolean;
    showData: any;
    customGroupFieldId: string;
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
                is_show: true,
                new_name: '',
                com_data: defaultComData.text_com_data
            },
            {
                key: 'img',
                name: '图片',
                is_show: true,
                new_name: '',
                com_data: defaultComData.img_com_data,
            },
            {
                key: 'auxiliary-line',
                name: '线条',
                is_show: true,
                new_name: '',
                com_data: defaultComData.line_com_data,
            },
            {
                key: 'icon',
                name: '图标',
                is_show: true,
                new_name: '',
                com_data: defaultComData.icon_com_data,
            },
            {
                key: 'panel',
                name: '面板',
                is_show: true,
                new_name: '',
                com_data: defaultComData.panel_com_data,
            },
            {
                key: 'custom-group',
                name: '编组',
                is_show: props.configType == 'custom' ? true : false,
                new_name: '',
                com_data: defaultComData.custom_group_com_data,
            },
        ],
    },
]);
// 图标地址
const url_computer = (name: string) => {
    const new_url = ref(common_store.common.config.attachment_host + `/static/diy/images/custom/${name}.png`).value;
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
    operation_end();
};
//#endregion 
//#region 中间区域的处理逻辑
// 数据只需要一次更新即可，避免多次更新导致数据不一致
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
    if ((!isEmpty(e.target.className) && !e.target.className.includes('do-not-trigger')) && (!isEmpty(e.target.parentNode.className) && !e.target.parentNode.className.includes('do-not-trigger'))) {
        // 点击区域结束的时候触发事件, 为-1的时候，证明没有触发事件
        if (edit_index.value !== -1) {
            edit_close_processing(edit_index.value);
            edit_index.value = -1;
            operation_end();
        }
    }
};
// 双击事件
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
        const data = cloneDeep(get_diy_index_data(index));
        // 计算存在多少个相同的key
        const list = diy_data.value.filter(item => item.key == data.key);
        // 获取当前数据, 复制的时候id更换一下
        const new_data = {
            ...data,
            new_name: data.name + list.length, // 添加别名, 复制是在原有的基础上复制，所以必须要不需要判断是否存在历史的
            id: get_math(),
        };
        // 在当前位置下插入数据
        diy_data.value.splice(index, 0, new_data);
        set_show_tabs(index + 1);
        operation_end();
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
            select_index.value = diy_data.value.length > 0 ? select_index.value : null;
            operation_end();
        });
    }
};

//前置一层 - 1
const previous_layer = (index: number) => {
    if (diy_data.value.length > 0 && index > 0) {
        moveItem(index, index - 1);
    }
}
//后置一层 + 1
const underlying_layer = (index: number) => {
    if (diy_data.value.length > 0 && index < diy_data.value.length - 1) {
        moveItem(index, index + 1);
    }
}
//组件置顶
const top_up = (index: number) => {
    if (!isEmpty(diy_data.value[index])) {
        moveItem(index, 0);
    }
}
//组件置底
const bottom_up = (index: number) => {
    if (!isEmpty(diy_data.value[index])) {
        const old_length = diy_data.value.length - 1;
        moveItem(index, old_length);
    }
}
const moveItem = (index: number, newIndex: number) => {
    if (index < 0 || index >= diy_data.value.length || newIndex < 0 || newIndex >= diy_data.value.length) {
        return;
    }
    try {
        const old_data = get_diy_index_data(index);
        // 删除当前位置信息
        diy_data.value.splice(index, 1);
        // 将数据插入新位置
        diy_data.value.splice(newIndex, 0, old_data);
        set_show_tabs(newIndex);
        operation_end();
    } catch (error) {
        console.error('Error moving item:', error);
    }
}

// 获取当前传递过来的index对应的diy_data中的数据
const get_diy_index_data = (index: number) => {
    return (<arrayIndex>diy_data.value)[index.toString()];
};
// 设置当前选中的是那个
const set_show_tabs = (index: number) => {
    // is_show_component_line.value = false;
    diy_data.value.forEach((item, for_index) => {
        // 先将全部的设置为false,再将当前选中的设置为true
        item.show_tabs = '0';
        if (for_index == index) {
            select_index.value = for_index;
            item.show_tabs = '1';
            // 滚动到指定位置
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
//#region 容器高度发生变化时的处理，拖拽组件高度变化时数据需要重新赋值，避免拖拽不到新高度的区域
const center_height = defineModel('height', { type: Number, default: 0 });
const center_width = defineModel('width', { type: Number, default: 390 });

const drag_area_height = computed(() => center_height.value + 'px');
const drag_area_width = computed(() => center_width.value + 'px');
// 头部页面显示内容
const drag_area_top_width = computed(() => center_width.value > 170 ? center_width.value + 'px' : '170px');

const draggable_container = ref(true);
let data = reactive<diy_content[]>([]);
// 拖拽组件高度变化时数据需要重新赋值，避免拖拽不到新高度的区域
watch(() => center_height.value, () => {
    data = diy_data.value;
    // 从 DOM 中删除组件
    draggable_container.value = false;
    nextTick(() => {
        // 在 DOM 中添加组件
        diy_data.value = data.map((item, index) => ({
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
                // 规整历史数据，避免有新增字段不存在导致报错
                ...Object.assign({}, cloneDeep((defaultComData as any)[`${item.key}_com_data`]), item.com_data),
                com_height: item.com_data.staging_height,
                data_source_field: {
                    ...item.com_data?.data_source_field ?? { id: item.key == 'text' ? [] : '', option: item.key == 'text' ? [] : {} },
                    id: !isEmpty(item.com_data?.data_source_field?.id || '') ? item.com_data.data_source_field.id : item.key == 'text' ? [] : '',
                },
                data_source_link_field: {
                    ...item.com_data?.data_source_link_field ?? { id: '', option: {} },
                    id: !isEmpty(item.com_data?.data_source_link_field?.id || '')? item.com_data.data_source_link_field.id : '',
                },
            },
        }));
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
        com_data: {
            ...cloneDeep(item.com_data),
        },
    };
    // 拖拽的时候清空热区
    hot_list.data = [];
};
// 没有拖拽到内容区域的逻辑
const dragEnd = () => {
    draggedItem.value = {};
};
// 拖拽到内容区域的逻辑
const drop = (event: any) => {
    if (draggedItem.value) {
        // 记录当前组件的默认宽度和高度
        const com_width = draggedItem.value.com_data.com_width;
        const com_height = draggedItem.value.com_data.com_height;
        // 记录当天鼠标所在的位置
        let location_x = event.offsetX;
        let location_y = event.offsetY;
        // 使用新函数调整位置，使添加的元素居中显示
        const { x: adjustedX, y: adjustedY } = adjustPosition(location_x, location_y, com_width, com_height, 390, center_height.value);
        // 计算存在多少个相同的key，设置组件别名
        const list = diy_data.value.filter(item => item.key == draggedItem.value.key);
        // 组装新数据
        const newItem = {
            ...draggedItem.value,
            new_name: list.length > 0 ? draggedItem.value.name + list.length : '', // 默认添加别名
            location: {
                x: adjustedX,
                y: adjustedY,
                record_x: adjustedX,
                record_y: adjustedY,
                staging_y: adjustedY,
            },
        };
        // 因为修改层级之后z-index是递减的，所以新添加的元素，需要添加到头部    
        diy_data.value.unshift(newItem);
        // 因为是添加到头部，所以默认选中第0个
        set_show_tabs(0);
        operation_end();
    }
};
//#endregion
//#region 区域内拖拽显示
const dragEndHandle = (item: any, index: number) => {
    const old_location = diy_data.value[index].location;
    const new_location = { x: item.x, y: item.y, record_x: item.x, record_y: item.y, staging_y: item.y };
    // 对数组进行比较，确定跟之前的是否有变化
    if (!isEqual(old_location, new_location)) {
        operation_end();
    }
    diy_data.value[index].location = new_location;
};
// 拖拽结束时触发的事件 {x: number, y: number, w: number, h: number}
const resizingHandle = (new_location: any, key: string, index: number, type: string) => {
    const { x, y, w, h } = new_location;
    // 对应位置的定位修改为当前更新的位置
    diy_data.value[index].location = { x, y, record_x: x, record_y: y, staging_y: y };
    // 获取到当前更新的内容
    const com_data = diy_data.value[index].com_data;
    // 更新组件的宽高
    com_data.com_width = w;
    com_data.com_height = h;
    com_data.staging_height = h;
    // 图片和线的宽高需要重新计算
    if (key == 'img') {
        const { img_width, img_height } = handleImg(com_data, w, h);
        com_data.img_width = img_width;
        com_data.img_height = img_height;
    } else if (key == 'auxiliary-line') {
        const { line_width, line_size } = handleAuxiliaryLine(com_data, w, h);
        com_data.line_width = line_width;
        com_data.line_size = line_size;
    }
    if (type == 'resizeEnd') {
        operation_end();
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
//#region 同时拖拽多个组件的逻辑，生成一个虚拟的盒子跟盒子有关联的都需要更新x y
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
// 开始拖拽生成时的坐标
const start_drag = (event: MouseEvent) => {
    drag_bool.value = true;
    if (!imgBoxRef.value) return;
    rect_start.value.x = rect_start.value.x != 0 ? rect_start.value.x : event.clientX - imgBoxRef.value.getBoundingClientRect().left;
    rect_start.value.y = rect_start.value.y != 0 ? rect_start.value.y : event.clientY - imgBoxRef.value.getBoundingClientRect().top;
    rect_start.value.width = 0;
    rect_start.value.height = 0;
};
// 拖动中
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
// 拖动结束时的处理
const end_drag = (event: MouseEvent) => {
    drag_bool.value = false;
    if (areaRef.value) areaRef.value.style.display = 'none';
    if (!imgBoxRef.value) return;
    init_drag_style.value = ``;
    // 大于16px才添加热区
    if (rect_end.value.width > 16 && rect_end.value.height > 16) {
        hot_list.data = [{ name: '热区' + (hot_list.data.length + 1), link: {}, drag_start: cloneDeep(rect_start.value), drag_end: cloneDeep(rect_end.value) }];
        diy_data.value.forEach((item: any) => {
            item.show_tabs = '0';
        });
        // 清除选中
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
// 开始拖拽生成的热区时候
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
                    let { record_x, record_y } = cloneDeep(item.location);
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
        operation_end();
    };
};

// drag-btn, 角标触发事件
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
// 删除拖拽热区
const del_area_event = (index: number) => {
    hot_list.data.splice(index, 1);
};
// 获取热区样式
const rect_style = computed(() => {
    return (start: rectCoords, end: rectCoords) => {
        return `left: ${start.x}px;top: ${start.y}px;width: ${Math.max(end.width, 1)}px;height: ${Math.max(end.height, 1)}px;display: flex;`;
    };
});
//#endregion
//#region 绑定上下左右事件和回退按钮
// 获取电脑是什么牌子 window 还是mac
const platform = getPlatform();
// 缓存内容，用于回退
const data_source_store = DataSourceStore();
const handle_keydown = (e: KeyboardEvent) => {
    // 排除默认事件
    const default_list = ['textarea', 'input'];
    // 判断是否是用户手动输入框之内操作的
    if (e.target instanceof HTMLElement && default_list.includes(e.target?.localName)) {
        return;
    }
    // 检查 A 和 B 键是否同时按下
    if ((e.ctrlKey && e.key === 'z' && platform == 'Windows') || (e.metaKey && e.key === 'z' && platform == 'Mac')) {
        // 监听开启的是全局监听，为了避免全局监听的同时也监听了子组件的回退事件，所以需要判断当前是全局监听还是子组件监听
        if (!data_source_store.is_children_custom && props.configType == 'custom') {
            back(data_source_store.custom_records_index, props.configType);
        } else if (data_source_store.is_children_custom && props.configType == 'custom-group') {
            back(data_source_store.custom_group_records_index, props.configType);
        }
    } else if ((e.ctrlKey && e.key === 'y' && platform == 'Windows') || (e.metaKey && e.key === 'y' && platform == 'Mac')) {
        // 监听开启的是全局监听，为了避免全局监听的同时也监听了子组件的回退事件，所以需要判断当前是全局监听还是子组件监听
        if (!data_source_store.is_children_custom && props.configType == 'custom') {
            forward(data_source_store.custom_records_index, props.configType);
        } else if (data_source_store.is_children_custom && props.configType == 'custom-group') {
            forward(data_source_store.custom_group_records_index, props.configType);
        }
    }
    // 阻止默认事件
    e.preventDefault();
}

// 提取公共逻辑
const getRecordsList = (type: string) => {
    if (type === 'custom') {
        return data_source_store.custom_records;
    } else if (type === 'custom-group') {
        return data_source_store.custom_group_records;
    }
    throw new Error('Invalid type');
};
// 设置新的选中值
const setIndex = (type: string, index: number) => {
    if (type === 'custom') {
        data_source_store.set_custom_records_index(index);
    } else if (type === 'custom-group') {
        data_source_store.set_custom_group_records_index(index);
    }
};
// 数据回退
const back = (index: number, type: string) => {
    const list = getRecordsList(type);
    if (!list || list.length === 0) return;
    let new_index = index + 1;
    if (new_index < list.length) {
        setIndex(type, new_index);
        const data = list[new_index];
        if (!isEmpty(data)) {
            diy_data.value = data.value;
            center_height.value = data?.height || center_height.value;
            cancel();
        }
    }
};
// 数据前进
const forward = (index: number, type: string) => {
    const list = getRecordsList(type);
    if (!list || list.length === 0) return;

    let new_index = Math.max(0, index - 1);
    if (new_index >= 0 && new_index < list.length) {
        setIndex(type, new_index);
        const data = list[new_index];
        if (!isEmpty(data)) {
            diy_data.value = data.value;
            center_height.value = data?.height || center_height.value;
            cancel();
        }
    }
};
// 跳转到指定数据
const handle_history = (index: number, type: string) => {
    const list = getRecordsList(type);
    if (!list || list.length === 0 || index === -1) return;

    if (index >= 0 && index < list.length) {
        setIndex(type, index);
        const data = list[index];
        if (!isEmpty(data)) {
            diy_data.value = data.value;
            center_height.value = data?.height || center_height.value;
            cancel();
        }
    }
};

const handleKeyUp = (e: KeyboardEvent) => {
    // 排除默认事件
    const default_list = ['textarea', 'input'];
    // 判断是否是用户手动输入框之内操作的
    if (e.target instanceof HTMLElement && default_list.includes(e.target?.localName)) {
        return;
    }
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
    // 监听开启的是全局监听，为了避免全局监听的同时也监听了子组件的回退事件，所以需要判断当前是全局监听还是子组件监听
    if (!data_source_store.is_children_custom && props.configType == 'custom') {
        // 阻止默认事件
        e.preventDefault();
        // 只有是点击上下左右的时候才会生效
        if (key_code.includes(e.key)) {
            data_handling(x, y);
            operation_end();
        }
    } else if (data_source_store.is_children_custom && props.configType == 'custom-group') {
        // 阻止默认事件
        e.preventDefault();
        // 只有是点击上下左右的时候才会生效
        if (key_code.includes(e.key)) {
            data_handling(x, y);
            operation_end();
        }
    }
};
/**
 * 数据处理函数，用于处理操作键盘上下左右操作后的数据更新
 * 判断是否生成了多个组件同时拖拽的盒子，如果有则更新盒子和盒子有交集的组件, 如果内容没有盒子则只更新当前选中的
 * hot_list: 存放盒子的数组，因为目前最多只能生成一个盒子，所以直接取第一个盒子即可
 * @param {number} x 键盘上下左右操作在x轴上的变化量
 * @param {number} y 键盘上下左右操作在y轴上的变化量
 */
 const data_handling = (x: number, y: number) => {
    // 遍历对象,内部容器更新,
    if (hot_list.data.length > 0) {
        // 更新热区位置
        const { drag_start, drag_end } = hot_list.data[0];
        // 检查热区在x轴上的新位置是否在有效范围内
        if (isWithinBounds(drag_start.x + x, drag_end.width, 390)) {
            hot_list.data[0].drag_start.x += x;
        }
        // 检查热区在y轴上的新位置是否在有效范围内
        if (isWithinBounds(drag_start.y + y, drag_end.height, center_height.value)) {
            hot_list.data[0].drag_start.y += y;
        }
        // 按下按钮的时候判断当前包含哪些组件, 避免后续包裹的或者没有手动拖拽过的无法更新其中组件的内容
        const rect1 = { x: drag_start.x, y: drag_start.y, width: drag_end.width, height: drag_end.height }
        // 遍历自定义数据，更新组件位置
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
        // 如果没有热区数据，则直接更新自定义数据中选中组件的位置
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

// 键盘控制
onMounted(() => {
    document.addEventListener('keydown', handle_keydown);
    // 监听键盘事件
    document.addEventListener('keyup', handleKeyUp);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handle_keydown);
    // 移除监听事件
    document.removeEventListener('keyup', handleKeyUp);
});
//#endregion
// 用户操作结束触发事件
const operation_end = (is_compare: boolean = true) => {
    emits('operation_end', is_compare);
}
// 暴露出去的数据，避免跟外部数据双向绑定，点击保存的时候才会保存数据
defineExpose({
    diy_data,
});
</script>

<style lang="scss" scoped>
@import 'index.scss';
.model-drag {
    overflow-y: scroll;
    .model-top-wall {
        width: v-bind(drag_area_top_width);
        margin: 0 auto;
        z-index: 999;
    }
    .model-wall {
        width: v-bind(drag_area_width);
        background-image: linear-gradient(45deg, #e5e5e5 25%, transparent 25%), linear-gradient(135deg, #e5e5e5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e5e5 75%), linear-gradient(135deg, transparent 75%, #e5e5e5 75%);
        background-size: 32px 32px;
        background-position: 0 0, 16px 0, 16px -16px, 0 16px;
        margin: 0 auto;
        .drag-area {
            height: v-bind(drag_area_height);
            width: 100%;
            margin: 1.4rem 0; // 用于将上边框和下边框显示出来
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
