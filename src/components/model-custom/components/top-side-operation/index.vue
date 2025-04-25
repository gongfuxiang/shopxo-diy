<template>
    <div v-if="typeof records_index === 'number' && !isNaN(records_index)" class="sticky-top">
        <div class="acticons">
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="回退" placement="top">
                <el-icon :class="['iconfont icon-left-arrow tooltip-icon', { 'disabled': records_index == history_list.length - 1 }]" @click.stop="back(records_index, records_index < history_list.length - 1)" />
            </el-tooltip>
            <div class="icon_border"></div>
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="前进" placement="top">
                <el-icon :class="['iconfont icon-right-arrow tooltip-icon', { 'disabled': records_index <= 0 }] " @click.stop="forward(records_index, records_index > 0)" />
            </el-tooltip>
            <div class="icon_border"></div>
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="历史记录" placement="top">
                <el-icon :class="['iconfont icon-historical-records tooltip-icon', { 'disabled': history_list.length === 0 }]" @click.stop="open_history(history_list.length !== 0)" />
            </el-tooltip>
        </div>
        <el-dialog v-model="dialogVisible" class="history-dialog" :style="{ top: '80px', left: dialog_left + 'px' }" title="历史记录" width="220" draggable show-close :modal="false" :close-on-click-modal="false" :close-on-press-escape="false">
            <div ref="historyDialog" class="history-dialog-content flex-col gap-14">
                <div v-for="(item, index1) in history_list" :key="index1" :class="[`history-dialog-item ${props.configType}`, {'active': records_index == index1 }]" @click="handleHistory(index1, records_index !== index1)">
                        <div class="history-dialog-item-title flex-row gap-5">
                            <el-tooltip effect="dark" :disabled="item.title.length < 5" :show-after="200" :hide-after="200" :content="item.title" placement="top">
                                <span class="item-title text-line-1">{{ item.title }}</span>
                            </el-tooltip>
                            {{ item.time }}
                        </div>
                    <el-icon v-if="records_index == index1" class="iconfont icon-checked size-14" />
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { DataSourceStore } from '@/store';
const dataSourceStore = DataSourceStore();
const props = defineProps({
    configType: {
        type: String,
        default: 'custom',
    }
});
const records_index = ref(-1);
const history_list = ref<any[]>([]);
const historyDialog = ref<HTMLElement | null>(null);
onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
const dialog_left = ref(0);
const handleResize = () => {
    // 处理一半区域的大小
    let width = (window.innerWidth - 220) / 2;
    // 减去右侧的宽度
    if (window.innerWidth <= 1560) {
        width = width - 410;
    } else {
        width = width - 470;
    }
    // 设置dialog的left
    dialog_left.value = width;
}

watchEffect(() => {
    if (props.configType == 'custom') {
        history_list.value = dataSourceStore.custom_records;
        records_index.value = dataSourceStore.custom_records_index;
    } else {
        history_list.value = dataSourceStore.custom_group_records;
        records_index.value = dataSourceStore.custom_group_records_index;
    }
    nextTick(() => {
        // 获取当前选中的内容 --中间区域的滚动效果
        const activeCard: HTMLElement | null = document.querySelector(`.history-dialog-item.active.${props.configType}`);
        if (activeCard) {
            // 获取选中内容的位置
            const scrollY = activeCard.offsetTop;
            if (historyDialog.value) {
                // 选中的滚动到指定位置
                historyDialog.value.scrollTo({ top: scrollY - 100, behavior: 'smooth' });
            }
        }
    });
});
const emits = defineEmits(['back', 'forward', 'handleHistory']);

const dialogVisible = ref(false);
//回退
const back = (index: number, is_click: boolean) => {
    if (is_click) {
        emits('back', index, props.configType);
    }
}
// 前进
const forward = (index: number, is_click: boolean) => {
    if (is_click) {
        emits('forward', index, props.configType)
    }
}
const handleHistory = (index: number, is_click: boolean) => {
    // 判断是否可点击数据
    if (is_click) {
        emits('handleHistory', index, props.configType);
    }
}
const open_history = (is_click: boolean) => {
    // 判断是否可点击数据
    if (is_click) {
        dialogVisible.value = !dialogVisible.value;
    }
} 
</script>

<style scoped lang="scss">
.sticky-top{
    position: sticky;
    top: 1rem;
    z-index: 1;
    height: 4rem;
    .acticons {
        display: flex;
        align-items: center;
        max-width: 16rem;
        background: #fff;
    }
    .icon_border {
        border-right: 1px solid #eeeeee;
        height: 1.6rem;
    }
    .tooltip-icon {
        font-size: 2rem;
        width: 5.7rem;
        height: 100%;
        padding: 0.8rem 1.6rem;
        cursor: pointer;
    }
    .tooltip-icon.disabled {
        cursor: default !important;
    }
}
:deep(.el-dialog) {
    // transform: translate(238px, 159px);
    .el-dialog__header{
        padding: 1.2rem 1.4rem !important;
    }
    .el-dialog__header .el-dialog__headerbtn {
        padding: 1.3rem 1.4rem 0.7rem !important;
        font-size: 1.6rem !important; 
    }
    .el-dialog__title {
        font-size: 1.2rem !important;
        line-height: 1.2rem !important;
    }
}
// 实现dialog可拖拽且底层可点击
:deep(:has(> .el-overlay-dialog .history-dialog)) {
  pointer-events: none !important;
}

:deep(.el-overlay-dialog) {
  pointer-events: none !important;

  .history-dialog {
    .el-dialog__header,
    .el-dialog__body,
    .el-dialog__footer {
      pointer-events: auto !important;
    }
  }
}
.history-dialog-content {
    overflow: auto;
    height: 23rem;
    padding: 1rem 0.8rem;
    background: #fff;
    .history-dialog-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.6rem 1rem;
    }
    .history-dialog-item-title {
        font-weight: 400;
        font-size: 14px;
        color: #666666;
        line-height: 20px;
        font-style: normal;
    }
    .item-title {
        width: 6rem;
        overflow: hidden;
        font-weight: bold;
    }
    .history-dialog-item.active {
        background: #F4f4f4;
        border-radius: 4px;
    }
    .icon-checked{
        color: #2A94FF;
    }
}
</style>