<template>
    <Dialog v-model:visible="dialogVisible" @accomplish="accomplish">
        <div class="flex-row h w">
            <!-- 左侧和中间区域 -->
            <DragIndex ref="draglist" :key="dragkey" v-model:height="center_height" v-model:width="center_width" :source-list="sourceList" :options="options" :is-custom="isCustom" :show-data="showData" :list="customList" @right-update="right_update"></DragIndex>
            <!-- 右侧配置区域 -->
            <div class="settings">
                <template v-if="diy_data.key === 'img'">
                    <model-image-style :key="key" v-model:height="center_height" :options="options" :value="diy_data"></model-image-style>
                </template>
                <template v-else-if="diy_data.key == 'text'">
                    <model-text-style :key="key" v-model:height="center_height" :options="options" :value="diy_data"></model-text-style>
                </template>
                <template v-else-if="diy_data.key == 'auxiliary-line'">
                    <model-lines-style :key="key" v-model:height="center_height" :value="diy_data"></model-lines-style>
                </template>
                <template v-else-if="diy_data.key == 'icon'">
                    <model-icon-style :key="key" v-model:height="center_height" :options="options" :value="diy_data"></model-icon-style>
                </template>
                <template v-else-if="diy_data.key == 'panel'">
                    <model-panel-style :key="key" v-model:height="center_height" :options="options" :value="diy_data"></model-panel-style>
                </template>
                <template v-else>
                    <div class="w h flex align-c bg-f">
                        <no-data></no-data>
                    </div>
                </template>
            </div>
        </div>
    </Dialog>
</template>
<script lang="ts" setup>
import Dialog from '@/components/model-custom/components/dialog.vue';
import DragIndex from '@/components/model-custom/components/index.vue';
const props = defineProps({
    dragkey: {
        type: String,
        default: '',
    },
    options: {
        type: Array<any>,
        default: () => [],
    },
    sourceList: {
        type: Object,
        default: () => {},
    },
    isCustom: {
        type: Boolean,
        default: false,
    },
    showData: {
        type: Object,
        default: () => ({ data_key: 'id', data_name: 'name' }),
    },
    customList: {
        type: Array<any>,
        default: () => [],
    },
})
// 中间区域的宽高
const center_width = defineModel('width', { type: Number, default: 390 });
const center_height = defineModel('height', { type: Number, default: 0 });
// 弹出框显示逻辑
const dialogVisible = defineModel('visible', { type: Boolean, default: false });
//#region 自定义编辑的内部处理逻辑
const diy_data = ref<diy>({
    key: '',
    location: {
        x: 0,
        y: 0,
        record_x: 0,
        record_y: 0,
        staging_y: 0,
    },
    com_data: {},
});
// 唯一标识
const key = ref('');
const right_update = (item: any) => {
    diy_data.value = item;
    // 生成随机id
    key.value = Math.random().toString(36).substring(2);
};

const draglist = ref<diy_data | null>(null);
const emits = defineEmits(['accomplish']);
const accomplish = () => {
    if (!draglist.value) {
        return;
    } else {
        emits('accomplish', draglist.value.diy_data);
    }
    
};
</script>

<style lang="scss" scoped>
.settings {
    width: 46rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
}
@media screen and (max-width: 1560px) {
    .settings {
        width: 40rem;
    }
}
</style>