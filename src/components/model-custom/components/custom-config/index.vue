<template>
    <Dialog v-model:visible="dialogVisible" :title="configType == 'custom' ? '编辑自定义' : '编辑自定义组'" @accomplish="accomplish" @close_event="close_event">
        <div class="flex-row h w">
            <!-- 左侧和中间区域 -->
            <DragIndex ref="draglist" :key="dragkey" v-model:height="center_height" v-model:width="center_width" :config-type="configType" :source-list="sourceList" :group-source-list="groupSourceList" :custom-group-field-id="customGroupFieldId" :is-custom-group="isCustomGroup" :is-custom="isCustom" :show-data="showData" :list="new_list" @right-update="right_update" @operation_end="operation_end"></DragIndex>
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
import { DataSourceStore } from '@/store';
import { formatDate } from '@/utils';
import { cloneDeep, isEqual } from "lodash";
const data_source_store = DataSourceStore();

const props = defineProps({
    // 配置类型，custom：自定义，custom-group：自定义组
    configType: {
        type: String,
        default: 'custom',
    },
    dragkey: {
        type: String,
        default: '',
    },
    // 数据源配置项
    options: {
        type: Array<any>,
        default: () => [],
    },
    // 真实数据，独立的数据信息
    sourceList: {
        type: Object,
        default: () => {},
    },
    // 自定义组使用的真实数据，包含整个外层真实数据，如果自定义组不使用内部数据源的时候，那么就是父级的数据源
    groupSourceList: {
        type: Array,
        default: () => {
            return [];
        }
    },
    // 判断是否是自定义
    isCustom: {
        type: Boolean,
        default: false,
    },
    // 判断是否是自定义组
    isCustomGroup: {
        type: Boolean,
        default: false,
    },
    // 手动模式下的显示数据
    showData: {
        type: Object,
        default: () => ({ data_key: 'id', data_name: 'name' }),
    },
    // 自定义组的id
    customId: {
        type: String,
        default: '',
    },
    // 自定义数据源id
    customGroupFieldId: {
        type: String,
        default: '',
    },
    // 自定义内容的渲染处理，自定义组传递的是内部的自定义内容
    customList: {
        type: Array<any>,
        default: () => [],
    },
});
const new_list = ref(cloneDeep(props.customList))
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
// 点击取消按钮显示逻辑
const close_event = () => {
    // 如果是自定点击完成，需要将数据传递给父组件
    if (props.configType == 'custom') {
        // 点击完成的时候，清除历史数据
        data_source_store.set_custom_records([]);
        data_source_store.set_custom_records_index(-1);
    } else {
        // 点击完成的时候，清除历史数据
        data_source_store.set_custom_group_records([]);
        data_source_store.set_custom_group_records_index(-1);
    }
}
// 点击完成按钮
const accomplish = () => {
    // 如果没有数据，直接返回
    if (!draglist.value) {
        return;
    } else {
        // 如果是自定点击完成，需要将数据传递给父组件
        if (props.configType == 'custom') {
            // 点击完成的时候，清除历史数据
            data_source_store.set_custom_records([]);
            data_source_store.set_custom_records_index(-1);
            emits('accomplish', props.configType, draglist.value.diy_data);
        } else {
            // 点击完成的时候，清除历史数据
            data_source_store.set_custom_group_records([]);
            data_source_store.set_custom_group_records_index(-1);
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
// 初始化的时候默认生成一条新数据，避免用户无法回到最初的记录
onBeforeMount(() => {
    const new_data = [{ title: '初始化', name: formatDate('HH点mm分ss秒'), height: center_height.value, value: props.customList }];
    if (props.configType == 'custom') {
        // 传递给store进行存储
        data_source_store.set_custom_records(new_data);
        // 操作之后更新数据
        data_source_store.set_custom_records_index(0);
    } else {
        // 传递给store进行存储
        data_source_store.set_custom_group_records(new_data);
        // 操作之后更新数据
        data_source_store.set_custom_group_records_index(0);
    }
})
// 操作结束触发事件
const operation_end = (title:string, is_compare: boolean = true) => {
    // 如果没有数据，直接返回
    if (!draglist.value) {
        return;
    } else {
        // 历史数据和新数据进行对比，如果新数据跟历史数据不相同就设置历史数据记录， is_compare = false的值是代表着不需要进行判断就要保存的记录
        let old_index = 0;
        let old_compare_data = {};
        if (props.configType == 'custom') {
            old_index = data_source_store.custom_records_index;
            old_compare_data = cloneDeep(data_source_store.custom_records[old_index].value) || {};
        } else {
            old_index = data_source_store.custom_group_records_index;
            old_compare_data = cloneDeep(data_source_store.custom_group_records[old_index].value) || {};
        }
        // 新的数据
        const new_compare_data = cloneDeep(draglist.value.diy_data);
        if (!is_compare || !isEqual(old_compare_data, new_compare_data)) {
            // 如果是自定点击完成，需要将数据传递给父组件
            if (props.configType == 'custom') {
                // 获取历史数据
                const new_data = old_data_handle(data_source_store?.custom_records || [], data_source_store?.custom_records_index || -1);
                // 新增一条新数据
                new_data.unshift({ title: title, name: formatDate('HH点mm分ss秒'), height: center_height.value, value: new_compare_data });
                // 传递给store进行存储
                data_source_store.set_custom_records(new_data);
                // 操作之后更新数据
                data_source_store.set_custom_records_index(0);
            } else {
                // 获取历史数据
                const new_data = old_data_handle(data_source_store?.custom_group_records || [], data_source_store?.custom_group_records_index || -1);
                // 新增一条新数据
                new_data.unshift({ title: title, name: formatDate('HH点mm分ss秒'), height: center_height.value, value: new_compare_data });
                // 更改自定义组的内容
                data_source_store.set_custom_group_records(new_data);
                // 更改自定义组的历史记录值
                data_source_store.set_custom_group_records_index(0);
            }
        }
    }
}
/**
 * 处理旧数据以生成新数据数组
 * 此函数用于根据当前选中的历史记录索引，对旧数据进行克隆和更新
 * 主要目的是维护一个最多包含10条记录的历史数据列表
 * 
 * @param old_data 任何类型的旧数据数组，包含历史记录
 * @param index 当前选中的历史记录的索引，用于决定如何更新数据
 * @returns 返回更新后的新数据数组
 */
 const old_data_handle = (old_data: any, index: number) => {
    // 克隆旧数据数组以避免直接修改原始数据
    const new_data = cloneDeep(old_data);
    // 判断当前选中的历史记录是不是最新的,如果不是，更新之后清除当前数据
    if (index !== 0 && index !== -1) {
        // 先判断index是为了确保10条数据更新的时候不会出现数据问题
        new_data.splice(index, 1);
    } else if (new_data.length == 10) {
        // 如果历史数据已经是10条了，那就删除最后一条数据， 否则的话就可以正常添加
        new_data.splice(new_data.length - 1, 1);
    }
    // 返回处理后的新数据数组
    return new_data;
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