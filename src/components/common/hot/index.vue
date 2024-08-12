<!-- 上传组件 -->
<template>
    <el-dialog v-model="dialog_visible" append-to-body fullscreen @close="close_event">
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
                            <div ref="imgBoxRef" class="oh" @mousedown.prevent="start_drag" @mousemove.prevent="move_drag" @mouseup.prevent="end_drag">
                                <div ref="imgRef">
                                    <el-image :src="hot_list.img" class="w img" @selectstart.prevent @contextmenu.prevent @dragstart.prevent></el-image>
                                </div>
                                <div ref="areaRef" class="area" :style="init_drag_style"></div>
                                <div v-for="(item, index) in hot_list.hot" :key="index" class="area-box" :style="rect_style(item.drag_start, item.drag_end)" @mousedown.prevent="start_drag_area_box(index, $event)" @dblclick="dbl_drag_event(item, index)">
                                    <div class="del-btn" @click.stop="del_area_event(index)"><icon name="close"></icon></div>
                                    <div class="drag-btn" :data-index="index" @mousedown.prevent="start_drag_btn(index, $event)"></div>
                                    <div class="text">
                                        <div class="name">{{ item.name }}</div>
                                        <div class="status" :class="!is_obj_empty(item.link) ? 'cr-primary' : 'cr-error'">{{ !is_obj_empty(item.link) ? '已设置' : '未设置' }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="right-content flex-1 pa-20">
                    <div class="size-16 fw mb-10">图片热区</div>
                    <div class="size-12 cr-9 mb-20">框选热区范围，双击设置热区信息</div>
                    <div class="flex-col gap-20 item">
                        <div v-for="(item, index) in hot_list.hot" :key="index" class="flex-row align-c gap-10">
                            <el-input v-model="item.name" class="name" placeholder="名称"></el-input>
                            <url-value v-model="item.link"></url-value>
                            <icon name="del" size="20" @click="del_event(index)"></icon>
                        </div>
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
    <el-dialog v-model="hot_dialog_visible" width="560" append-to-body @close="hot_close_event">
        <template #header>
            <div class="title re">
                <div class="tc size-16 fw">设置热区</div>
            </div>
        </template>
        <div class="content">
            <el-form ref="formRef" :model="form" label-width="85px" class="pa-20 mt-16">
                <el-form-item label="名称">
                    <el-input v-model="form.name" placeholder="请输入名称"></el-input>
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
 * @param dialog_visible {Boolean} 弹窗显示
 * @return {*} update:modelValue
 */
const props = defineProps({});
const modelValue = defineModel({ type: Object as PropType<hotData>, default: {} });
const dialog_visible = defineModel('visibleDialog', { type: Boolean, default: false });
const hot_list = ref<hotData>({
    img: '',
    img_height: 1,
    img_width: 1,
    hot: [],
});
const hot_list_index = ref(0);
watch(
    () => modelValue.value,
    (val) => {
        hot_list.value = cloneDeep(val);
    },
    { immediate: true, deep: true }
);

//#region 左侧画布-----------------------------------------------start
const imgBoxRef = ref<HTMLElement | null>(null);
const imgRef = ref<HTMLElement | null>(null);
const rect_start = ref<rectCoords>({ x: 0, y: 0, width: 0, height: 0 });
const rect_end = ref<rectCoords>({ x: 0, y: 0, width: 0, height: 0 });
const areaRef = ref<HTMLElement | null>(null);
const init_drag_style = ref('');
const drag_bool = ref(false);
const drag_box_bool = ref(false);
const drag_box_scale_bool = ref(false);
const start_drag = (event: MouseEvent) => {
    drag_bool.value = true;
    if (!imgBoxRef.value) return;
    rect_start.value.x = event.clientX - imgBoxRef.value.getBoundingClientRect().left;
    rect_start.value.y = event.clientY - imgBoxRef.value.getBoundingClientRect().top;
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
        hot_list.value.hot.push({
            name: '热区' + (hot_list.value.hot.length + 1),
            link: {},
            drag_start: cloneDeep(rect_start.value),
            drag_end: cloneDeep(rect_end.value),
        });
    }
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
    let clone_drag_start = cloneDeep(hot_list.value.hot[hot_list_index.value].drag_start);
    let clone_drag_end = cloneDeep(hot_list.value.hot[hot_list_index.value].drag_end);
    // 记录原始位置
    area_box_point.value = {
        x: clone_drag_start.x - event.clientX,
        y: clone_drag_start.y - event.clientY,
    };

    // 当子元素拖拽方法触发后夫元素方法不触发
    document.onmousemove = (areaBoxEvent) => {
        areaBoxEvent.stopPropagation();
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
                new_coordinate.x = imgBoxRef.value.getBoundingClientRect().width - Math.max(clone_drag_end.width, 1) - 4;
            }
            if (new_coordinate.y + Math.max(clone_drag_end.height, 1) > imgBoxRef.value.getBoundingClientRect().height) {
                new_coordinate.y = imgBoxRef.value.getBoundingClientRect().height - Math.max(clone_drag_end.height, 1) - 7;
            }
            hot_list.value.hot[hot_list_index.value].drag_start.x = new_coordinate.x;
            hot_list.value.hot[hot_list_index.value].drag_start.y = new_coordinate.y;
        }
    };
    document.onmouseup = (areaBoxEvent) => {
        areaBoxEvent.stopPropagation();
        drag_box_bool.value = false;
    };
};
// drag-btn
const start_drag_btn = (index: number, event: MouseEvent) => {
    hot_list_index.value = index;
    event.stopPropagation();
    drag_box_scale_bool.value = true;
    let clone_drag_start = hot_list.value.hot[hot_list_index.value].drag_start;
    let clone_drag_end = hot_list.value.hot[hot_list_index.value].drag_end;
    document.onmousemove = (dragBtnEvent) => {
        dragBtnEvent.stopPropagation();
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        if (drag_box_scale_bool.value) {
            if (!imgBoxRef.value) return;
            clone_drag_end.x = dragBtnEvent.clientX - imgBoxRef.value.getBoundingClientRect().left;
            clone_drag_end.y = dragBtnEvent.clientY - imgBoxRef.value.getBoundingClientRect().top;
            hot_list.value.hot[hot_list_index.value].drag_end = {
                x: clone_drag_end.x,
                y: clone_drag_end.y,
                width: clone_drag_end.x - clone_drag_start.x > 0 ? clone_drag_end.x - clone_drag_start.x : 0,
                height: clone_drag_end.y - clone_drag_start.y > 0 ? clone_drag_end.y - clone_drag_start.y : 0,
            };
        }
    };
    document.onmouseup = (dragBtnEvent2) => {
        dragBtnEvent2.stopPropagation();
        drag_box_scale_bool.value = false;
    };
};
const del_area_event = (index: number) => {
    hot_list.value.hot.splice(index, 1);
};
const rect_style = computed(() => {
    return (start: rectCoords, end: rectCoords) => {
        return `left: ${start.x}px;top: ${start.y}px;width: ${Math.max(end.width, 1)}px;height: ${Math.max(end.height, 1)}px;display: flex;`;
    };
});
//#endregion 左侧画布-----------------------------------------------end

//#region 右侧热区编辑-----------------------------------------------start
const del_event = (index: number) => {
    hot_list.value.hot.splice(index, 1);
};
//#endregion 右侧热区编辑-----------------------------------------------end

//#region 设置热区弹窗-----------------------------------------------start
const hot_dialog_visible = ref(false);
const form = ref({
    link: {},
    name: '',
});
const hot_close_event = () => {
    hot_dialog_visible.value = false;
};
const hot_confirm_event = () => {
    hot_list.value.hot[hot_list_index.value].link = form.value.link;
    hot_list.value.hot[hot_list_index.value].name = form.value.name;
    hot_close_event();
};
//#endregion 设置热区弹窗-----------------------------------------------end

//#region 热区开启关闭确认取消回调 -----------------------------------------------start
// 打开热区弹窗
const open_hot_event = () => {
    if (modelValue.value.img.length > 0) {
        dialog_visible.value = true;
        hot_list.value = cloneDeep(modelValue.value);
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
    if (hot_list.value.hot.length > 0) {
        // 筛选数组hot中所有的link是否有空值，如果有则提示出来
        if (is_obj_empty(hot_list.value.hot)) {
            ElMessage({
                type: 'warning',
                message: '请先设置热区',
            });
            return;
        }
        const no_link_list = hot_list.value.hot.filter((item) => {
            return is_obj_empty(item.link);
        });
        if (no_link_list.length > 0) {
            ElMessage.error('请设置热区链接!');
            return;
        } else {
            hot_list.value.img_height = imgRef.value?.clientHeight || 0;
            hot_list.value.img_width = imgRef.value?.clientWidth || 0;
            modelValue.value = hot_list.value;
            close_event();
        }
    } else {
        ElMessage.error('至少选择一个热区!');
    }
};
//#endregion 热区开启关闭确认取消回调 -----------------------------------------------end
</script>
<style lang="scss" scoped>
.content-scrollbar {
    height: calc(100vh - 13.8rem);
    margin: 0 -1.6rem;
    .left-content {
        .img-scrollbar {
            display: flex;
            justify-content: center;
            .img-container {
                max-width: 60rem;
                min-width: 30rem;
                height: calc(100vh - 25.8rem);
                position: relative;
                .img {
                    user-select: none;
                    cursor: crosshair;
                    padding: 0 0.4rem 0.4rem 0;
                }
                .area {
                    position: absolute;
                    background: rgba(41, 128, 185, 0.3);
                    border: 1px dashed #34495e;
                    width: 0px;
                    height: 0px;
                    left: 0px;
                    top: 0px;
                    display: none;
                }
                .area-box {
                    position: absolute;
                    background: rgba(42, 148, 255, 0.25);
                    border: 1px dashed #8ec6ff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #1989fa;
                    font-size: 1.2rem;
                    cursor: move;
                    transition: transform 0.1s;
                    .del-btn {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #1890ff;
                        color: #fff;
                        text-align: center;
                        border-radius: 0 0 0 0.3rem;
                        position: absolute;
                        right: 0.7rem;
                        top: 0.7rem;
                        transform: translate3d(50%, -50%, 0);
                        cursor: default;
                        width: 1.6rem;
                        height: 1.6rem;
                        line-height: 1.6rem;
                        z-index: 1;
                        i {
                            font-size: 0.9rem;
                        }
                    }
                    .drag-btn {
                        position: absolute;
                        width: 7px;
                        height: 7px;
                        background: #f0f0f0;
                        border: 1px solid #333;
                        right: -0.4rem;
                        bottom: -0.4rem;
                        cursor: nwse-resize;
                        z-index: 1;
                    }
                    .text {
                        overflow: hidden;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        max-width: 100%;
                        max-height: 100%;
                        text-align: center;
                        align-items: center;
                        color: #fff;
                        font-size: 1.2rem;
                        .name {
                            color: #fff;
                            margin: 0 0.2rem;
                        }
                        .status {
                            margin: 0 0.2rem;
                        }
                    }
                }
            }
        }
    }
    .right-content {
        .item {
            max-width: 47.8rem;
            .name {
                width: 9.8rem;
            }
        }
    }
}
</style>
