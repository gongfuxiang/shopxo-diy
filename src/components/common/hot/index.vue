<!-- 上传组件 -->
<template>
    <el-dialog v-model="dialog_visible" fullscreen :close-on-click-modal="false" @close="close_event">
        <template #header>
            <div class="title re">
                <div class="tc size-16 fw">编辑热区</div>
            </div>
        </template>
        <el-scrollbar class="content-scrollbar">
            <div class="pa-40 flex-row gap-40">
                <div class="left-content flex-1 pa-20">
                    <el-scrollbar class="img-scrollbar">
                        <div class="img-container">
                            <div class="re">
                                <div ref="imgBoxRef" class="oh" @mousedown.prevent="start_drag" @mousemove.prevent="move_drag" @mouseup.prevent="end_drag">
                                    <div ref="imgRef">
                                        <el-image v-if="img_url.length > 0" :src="img_url[0].url" class="w img block" @selectstart.prevent @contextmenu.prevent @dragstart.prevent></el-image>
                                    </div>
                                    <div ref="areaRef" class="area" :style="init_drag_style"></div>
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
                                        <div class="text">
                                            <div class="name">{{ item.name }}</div>
                                            <div class="status" :class="!is_obj_empty(item.link) ? 'cr-primary' : 'cr-error'">{{ !is_obj_empty(item.link) ? (item.link?.name ?? '未设置') : '未设置' }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="right-content flex-1 pa-20">
                    <div class="size-16 fw mb-10">图片热区</div>
                    <div class="flex-col gap-20 item">
                        <div v-for="(item, index) in hot_list.data" :key="index" class="flex-row align-c gap-10">
                            <el-input v-model="item.name" class="name" placeholder="名称" clearable></el-input>
                            <url-value v-model="item.link"></url-value>
                            <icon name="del" size="20" @click="del_event(index)"></icon>
                        </div>
                        <el-button type="primary" class="add_hot" @click="add_event">添加选区</el-button>
                        <div class="size-12 cr-9">框选热区范围，双击设置热区信息</div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="plr-28 ptb-10" type="primary" @click="confirm_event">完成</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="hot_dialog_visible" width="560" append-to-body draggable :close-on-click-modal="false" @close="hot_close_event">
        <template #header>
            <div class="title re">
                <div class="tc size-16 fw">设置热区</div>
            </div>
        </template>
        <div class="content">
            <el-form ref="formRef" :model="form" label-width="85px" class="pa-20 mt-16">
                <el-form-item label="名称">
                    <el-input v-model="form.name" placeholder="请输入名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="热区跳转链接">
                    <url-value v-model="form.link"></url-value>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="plr-28 ptb-10" @click="hot_close_event">取消</el-button>
                <el-button class="plr-28 ptb-10" type="primary" @click="hot_confirm_event">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <el-button class="w" @click="open_hot_event"><icon name="add">编辑热区</icon></el-button>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash';
import { is_obj_empty } from '@/utils';
const app = getCurrentInstance();
/**
 * @description: 热区
 * @param modelValue{Object} 默认值
 * @param img_url {Array} 图片列表
 * @param dialog_visible {Boolean} 弹窗显示
 * @return {*} update:modelValue
 */
const props = defineProps({});
const modelValue = defineModel({ type: Object as PropType<hotData>, default: {} });
const img_url = defineModel('img', { type: Array as PropType<uploadList[]>, default: [] });
const dialog_visible = defineModel('visibleDialog', { type: Boolean, default: false });

const hot_list = ref<hotData>({
    img_height: 1,
    img_width: 1,
    data: [],
});
const hot_list_index = ref(0);

//#region 左侧画布-----------------------------------------------start
const imgBoxRef = ref<HTMLElement | null>(null);
const imgRef = ref<HTMLElement | null>(null);
const rect_start = ref<rectCoords>({ x: 0, y: 0, width: 0, height: 0 });
const rect_end = ref<rectCoords>({ x: 0, y: 0, width: 0, height: 0 });
const areaRef = ref<HTMLElement | null>(null);
const init_drag_style = ref('');
// 拖拽生成盒子的开关
const drag_bool = ref(false);
// 拖拽盒子的开关
const drag_box_bool = ref(false);
// 拖拽放大缩小盒子的开关
const drag_box_scale_bool = ref(false);
const start_drag = (event: MouseEvent) => {
    drag_bool.value = true;
    if (!imgBoxRef.value) return;
    rect_start.value.x = rect_start.value.x !== 0 ? rect_start.value.x : event.clientX - imgBoxRef.value.getBoundingClientRect().left;
    rect_start.value.y = rect_start.value.y !== 0 ? rect_start.value.y : event.clientY - imgBoxRef.value.getBoundingClientRect().top;
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
        init_drag_style.value = `left: ${rect_start.value.x}px;top: ${rect_start.value.y}px;width: ${Math.max(rect_end.value.width, 1)}px;height: ${Math.max(rect_end.value.height, 1)}px;display: flex;`;
    }
};
const end_drag = (event: MouseEvent) => {
    drag_bool.value = false;
    if (areaRef.value) areaRef.value.style.display = 'none';
    if (!imgBoxRef.value) return;
    init_drag_style.value = ``;
    if (rect_end.value.width > 16 && rect_end.value.height > 16) {
        hot_list.value.data.push({
            name: '热区' + (hot_list.value.data.length + 1),
            link: {},
            drag_start: cloneDeep(rect_start.value),
            drag_end: cloneDeep(rect_end.value),
        });
    }
    rect_start.value = { x: 0, y: 0, width: 0, height: 0 };
    rect_end.value = { x: 0, y: 0, width: 0, height: 0 };
};

const area_box_point = ref({ x: 0, y: 0 });
// area-box
const dbl_drag_event = (item: hotListData, index: number) => {
    hot_dialog_visible.value = true;
    form.value.link = item.link;
    form.value.name = item.name;
    hot_list_index.value = index;
};
const start_drag_area_box = (index: number, event: MouseEvent) => {
    hot_list_index.value = index;
    event.stopPropagation();
    drag_box_bool.value = true;
    let clone_drag_start = cloneDeep(hot_list.value.data[hot_list_index.value].drag_start);
    let clone_drag_end = cloneDeep(hot_list.value.data[hot_list_index.value].drag_end);
    // 记录原始位置
    area_box_point.value = {
        x: clone_drag_start.x - event.clientX,
        y: clone_drag_start.y - event.clientY,
    };

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
            hot_list.value.data[hot_list_index.value].drag_start.x = new_coordinate.x;
            hot_list.value.data[hot_list_index.value].drag_start.y = new_coordinate.y;
            hot_list.value.data[hot_list_index.value].drag_end.x = new_coordinate.x + Math.max(clone_drag_end.width, 1);
            hot_list.value.data[hot_list_index.value].drag_end.y = new_coordinate.y + Math.max(clone_drag_end.height, 1);
        }
    };
    document.onmouseup = (areaBoxEvent) => {
        // areaBoxEvent.stopPropagation();
        drag_box_bool.value = false;
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
    let clone_drag_start = hot_list.value.data[hot_list_index.value].drag_start;
    let clone_drag_end = hot_list.value.data[hot_list_index.value].drag_end;
    document.onmousemove = (dragBtnEvent) => {
        // dragBtnEvent.stopPropagation();
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        if (drag_box_scale_bool.value) {
            if (!imgBoxRef.value) return;

            switch (type) {
                case 'br':
                    // 下右
                    clone_drag_end.x = handleBoundary(dragBtnEvent.clientX - imgBoxRef.value.getBoundingClientRect().left, 0, imgBoxRef.value.getBoundingClientRect().width);
                    clone_drag_end.y = handleBoundary(dragBtnEvent.clientY - imgBoxRef.value.getBoundingClientRect().top, 0, imgBoxRef.value.getBoundingClientRect().height);
                    hot_list.value.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, clone_drag_end);
                    break;
                case 'bl':
                    // 下左
                    clone_drag_start.x = handleBoundary(dragBtnEvent.clientX - imgBoxRef.value.getBoundingClientRect().left, 0, clone_drag_end.x);
                    clone_drag_end.y = handleBoundary(dragBtnEvent.clientY - imgBoxRef.value.getBoundingClientRect().top, 0, imgBoxRef.value.getBoundingClientRect().height);
                    hot_list.value.data[hot_list_index.value].drag_start.x = clone_drag_start.x;
                    hot_list.value.data[hot_list_index.value].drag_end.y = clone_drag_end.y;
                    hot_list.value.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, { y: clone_drag_end.y });
                    break;
                case 'bc':
                    // 下中
                    clone_drag_end.y = handleBoundary(dragBtnEvent.clientY - imgBoxRef.value.getBoundingClientRect().top, 0, imgBoxRef.value.getBoundingClientRect().height);
                    hot_list.value.data[hot_list_index.value].drag_end.y = clone_drag_end.y;
                    hot_list.value.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, { y: clone_drag_end.y });
                    break;
                case 'tl':
                    // 上左
                    clone_drag_start.x = handleBoundary(dragBtnEvent.clientX - imgBoxRef.value.getBoundingClientRect().left, 0, clone_drag_end.x);
                    clone_drag_start.y = handleBoundary(dragBtnEvent.clientY - imgBoxRef.value.getBoundingClientRect().top, 0, clone_drag_end.y);
                    hot_list.value.data[hot_list_index.value].drag_start.x = clone_drag_start.x;
                    hot_list.value.data[hot_list_index.value].drag_start.y = clone_drag_start.y;
                    hot_list.value.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, {});
                    break;
                case 'tc':
                    // 上中
                    clone_drag_start.y = handleBoundary(dragBtnEvent.clientY - imgBoxRef.value.getBoundingClientRect().top, 0, clone_drag_end.y);
                    hot_list.value.data[hot_list_index.value].drag_start.y = clone_drag_start.y;
                    hot_list.value.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, { y: clone_drag_end.y });
                    break;
                case 'lc':
                    // 左中
                    clone_drag_start.x = handleBoundary(dragBtnEvent.clientX - imgBoxRef.value.getBoundingClientRect().left, 0, clone_drag_end.x);
                    hot_list.value.data[hot_list_index.value].drag_start.x = clone_drag_start.x;
                    hot_list.value.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, {});
                    break;
                case 'rc':
                    // 右中
                    clone_drag_end.x = handleBoundary(dragBtnEvent.clientX - imgBoxRef.value.getBoundingClientRect().left, 0, imgBoxRef.value.getBoundingClientRect().width);
                    hot_list.value.data[hot_list_index.value].drag_end.x = clone_drag_end.x;
                    hot_list.value.data[hot_list_index.value].drag_end = updateDragEnd(clone_drag_start, clone_drag_end, { x: clone_drag_end.x });
                    break;
            }
        }
    };
    document.onmouseup = (dragBtnEvent2) => {
        // dragBtnEvent2.stopPropagation();
        drag_box_scale_bool.value = false;
    };
};

// 辅助函数用于更新drag_end
const updateDragEnd = (dragStart: { x: number; y: number }, dragEnd: { x: number; y: number }, newDragEnd: { x?: number; y?: number }) => {
    const newX = newDragEnd.x !== undefined ? newDragEnd.x : dragEnd.x;
    const newY = newDragEnd.y !== undefined ? newDragEnd.y : dragEnd.y;
    return {
        x: newX,
        y: newY,
        width: newX - dragStart.x > 0 ? newX - dragStart.x : 0,
        height: newY - dragStart.y > 0 ? newY - dragStart.y : 0,
    };
};

// 辅助函数用于更新drag_start
const updateDragStart = (dragStart: { x: number; y: number }, newDragStart: { x?: number; y?: number }) => {
    const newX = newDragStart.x !== undefined ? newDragStart.x : dragStart.x;
    const newY = newDragStart.y !== undefined ? newDragStart.y : dragStart.y;
    return { x: newX, y: newY };
};

// 辅助函数用于处理边界
const handleBoundary = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

const del_area_event = (index: number) => {
    hot_list.value.data.splice(index, 1);
};
const rect_style = computed(() => {
    return (start: rectCoords, end: rectCoords) => {
        return `left: ${start.x}px;top: ${start.y}px;width: ${Math.max(end.width, 1)}px;height: ${Math.max(end.height, 1)}px;display: flex;`;
    };
});

//#endregion 左侧画布-----------------------------------------------end

//#region 右侧热区编辑-----------------------------------------------start
const del_event = (index: number) => {
    hot_list.value.data.splice(index, 1);
};
const add_event = () => {
    hot_list.value.data.push({
        name: '热区' + (hot_list.value.data.length + 1),
        link: {},
        drag_start: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        },
        drag_end: {
            x: 100,
            y: 100,
            width: 100,
            height: 100,
        },
    });
};
//#endregion 右侧热区编辑-----------------------------------------------end

//#region 设置热区弹窗-----------------------------------------------start
const hot_dialog_visible = ref(false);
interface formData {
    link: pageLinkList;
    name: string;
}
const form = ref<formData>({
    link: {
        name: '',
    },
    name: '',
});
const hot_close_event = () => {
    hot_dialog_visible.value = false;
};
const hot_confirm_event = () => {
    hot_list.value.data[hot_list_index.value].name = form.value.name;
    if (hot_list.value.data[hot_list_index.value].link) {
        hot_list.value.data[hot_list_index.value].link = form.value.link;
    }
    hot_close_event();
};
//#endregion 设置热区弹窗-----------------------------------------------end

//#region 热区开启关闭确认取消回调 -----------------------------------------------start
// 打开热区弹窗
const open_hot_event = () => {
    if (img_url.value.length > 0) {
        dialog_visible.value = true;
        setTimeout(() => {
            // 创建临时变量储存传过来的数据
            let temp_data = cloneDeep(modelValue.value);
            // 获取最新的图片高度和宽度
            temp_data.img_height = imgBoxRef.value?.clientHeight || 0;
            temp_data.img_width = imgBoxRef.value?.clientWidth || 0;
            // 根据原始数据的宽高和更新后的宽高的比例，计算出事实的坐标比例
            const scale = temp_data.img_width / modelValue.value.img_width;
            console.log(scale);
            temp_data.data.forEach((item) => {
                item.drag_start.x = item.drag_start.x * scale;
                item.drag_start.y = item.drag_start.y * scale;
                item.drag_end.x = item.drag_end.x * scale;
                item.drag_end.y = item.drag_end.y * scale;
                item.drag_end.width = item.drag_end.width * scale;
                item.drag_end.height = item.drag_end.height * scale;
            });
            hot_list.value = temp_data;
        }, 100);
    } else {
        ElMessage({
            type: 'warning',
            message: '请先选择图片',
        });
    }
};

// 取消回调
const close_event = () => {
    dialog_visible.value = false;
};
// 确认回调
const confirm_event = () => {
    if (hot_list.value.data.length > 0) {
        // 筛选数组hot中所有的link是否有空值，如果有则提示出来
        if (is_obj_empty(hot_list.value.data)) {
            ElMessage({
                type: 'warning',
                message: '请先设置热区',
            });
            return;
        }
        const no_link_list = hot_list.value.data.filter((item) => {
            return is_obj_empty(item.link);
        });
        if (no_link_list.length > 0) {
            ElMessage.error('请设置热区链接!');
            return;
        } else {
            modelValue.value = cloneDeep(hot_list.value);
            close_event();
        }
    } else {
        ElMessage.error('至少选择一个热区!');
    }
};
//#endregion 热区开启关闭确认取消回调 -----------------------------------------------end
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
