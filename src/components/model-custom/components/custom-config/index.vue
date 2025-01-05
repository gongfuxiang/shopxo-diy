<template>
    <Dialog v-model:visible="dialogVisible" :title="configType == 'custom' ? '编辑自定义' : '编辑自定义组'" @accomplish="accomplish">
        <div class="flex-row h w">
            <!-- 左侧和中间区域 -->
            <DragIndex ref="draglist" :key="dragkey" v-model:height="center_height" v-model:width="center_width" :config-type="configType" :source-list="sourceList" :options="options" :is-custom="isCustom" :show-data="showData" :list="customList" @right-update="right_update"></DragIndex>
            <!-- 右侧配置区域 -->
            <div class="settings">
                <template v-if="diy_data.key === 'img'">
                    <model-image-style :key="key" v-model:height="center_height" :options="options" :value="diy_data" @operation_end="operation_end"></model-image-style>
                </template>
                <template v-else-if="diy_data.key == 'text'">
                    <model-text-style :key="key" v-model:height="center_height" :options="options" :value="diy_data" @operation_end="operation_end"></model-text-style>
                </template>
                <template v-else-if="diy_data.key == 'auxiliary-line'">
                    <model-lines-style :key="key" v-model:height="center_height" :options="options" :value="diy_data" @operation_end="operation_end"></model-lines-style>
                </template>
                <template v-else-if="diy_data.key == 'icon'">
                    <model-icon-style :key="key" v-model:height="center_height" :options="options" :value="diy_data" @operation_end="operation_end"></model-icon-style>
                </template>
                <template v-else-if="diy_data.key == 'panel'">
                    <model-panel-style :key="key" v-model:height="center_height" :options="options" :value="diy_data" @operation_end="operation_end"></model-panel-style>
                </template>
                <template v-else-if="diy_data.key == 'custom-group' && configType == 'custom'">
                    <model-custom-group-style :key="key" v-model:height="center_height" :options="options" :value="diy_data" @custom_edit="custom_edit" @operation_end="operation_end"></model-custom-group-style>
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
    configType: {
        type: String,
        default: 'custom',
    },
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
    customId: {
        type: String,
        default: '',
    },
    customList: {
        type: Array<any>,
        default: () => [],
    },
});
// 自定义组的父组件数据
const custom_father_list = defineModel('fatherList', { type: Array, default: () => [] });
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
const emits = defineEmits(['accomplish', 'custom_edit']);
// 点击完成按钮
const accomplish = () => {
    // 如果没有数据，直接返回
    if (!draglist.value) {
        return;
    } else {
        // 如果是自定点击完成，需要将数据传递给父组件
        if (props.configType == 'custom') {
            emits('accomplish', props.configType, draglist.value.diy_data);
        } else {
            // 如果是自定义组点击完成，需要将值赋值给对应的父组件数据中，再将完整的数据渲染出来
            custom_father_list.value.forEach((item: any) => {
                if (item.id == props.customId) {
                    item.com_data.custom_height = center_height.value;
                    item.com_data.custom_list = draglist.value?.diy_data || [];
                }
            });
            emits('accomplish', 'custom-group', custom_father_list.value);
        }
    }
};
// 自定义组编辑
const custom_edit = (id: string, list: diy, width: number, height: number, data_source_field: object) => {
    let father_list : any = [];
    if (props.configType == 'custom') {
        father_list = draglist.value?.diy_data || [];
    }
    emits('custom_edit', 'custom-group', id, father_list, list, width, height, data_source_field);
};
const operation_end = () => {
    console.log('操作结束');
}
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