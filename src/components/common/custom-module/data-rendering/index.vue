<template>
    <div ref="allSignList" class="w h re custom-other">
        <div v-for="(item, index) in list" :key="item.id" ref="signList" :data-id="item.id" :data-location-x="item.location.x" :data-location-y="item.location.y" :class="`main-content flex-row ${ animation_class(item.com_data) }`" :style="`left: ${ percentage_count(item.location.x, item.com_data.data_follow, 'left') }; top: ${ percentage_count(item.location.y, item.com_data.data_follow, 'top') }; width: ${ percentage_count(item.com_data.com_width, item.com_data.data_follow, 'width', item.com_data.is_width_auto, item.com_data.max_width) }; height: ${ percentage_count(item.com_data.com_height, item.com_data.data_follow, 'height', item.com_data.is_height_auto, item.com_data.max_height) };z-index: ${ (list.length - 1) - index};`">
            <template v-if="item.key == 'text'">
                <model-text :key="item.id" :value="item.com_data" :scale="scale" :source-list="sourceList" :config-loop="configLoop" :is-custom="isCustom" :custom-group-field-id="customGroupFieldId" :is-custom-group="isCustomGroup" :title-params="showData?.data_name || 'name'" :is-display-panel="true"></model-text>
            </template>
            <template v-else-if="item.key == 'img'">
                <model-image :key="item.id" :value="item.com_data" :scale="scale" :source-list="sourceList" :config-loop="configLoop" :is-custom="isCustom" :custom-group-field-id="customGroupFieldId" :is-custom-group="isCustomGroup" :img-params="showData?.data_logo || ''" :is-display-panel="true"></model-image>
            </template>
            <template v-else-if="item.key == 'auxiliary-line'">
                <model-lines :key="item.id" :value="item.com_data" :scale="scale" :source-list="sourceList" :config-loop="configLoop" :is-custom="isCustom"  :custom-group-field-id="customGroupFieldId" :is-custom-group="isCustomGroup" :is-display-panel="true"></model-lines>
            </template>
            <template v-else-if="item.key == 'icon'">
                <model-icon :key="item.id" :value="item.com_data" :scale="scale" :source-list="sourceList" :config-loop="configLoop" :is-custom="isCustom"  :custom-group-field-id="customGroupFieldId" :is-custom-group="isCustomGroup" :is-display-panel="true"></model-icon>
            </template>
            <template v-else-if="item.key == 'panel'">
                <model-panel :key="item.id" :value="item.com_data" :scale="scale" :source-list="sourceList" :config-loop="configLoop" :is-custom="isCustom" :custom-group-field-id="customGroupFieldId" :is-custom-group="isCustomGroup" :is-display-panel="true"></model-panel>
            </template>
            <template v-else-if="item.key == 'custom-group'">
                <model-custom-group :key="item.id" :value="item.com_data" :scale="scale" :source-list="sourceList" :config-loop="configLoop" :group-source-list="groupSourceList" :show-data="showData" :data-height="item.com_data.custom_height" :data-width="item.com_data.com_width" :is-custom="isCustom" :is-display-panel="true"></model-custom-group>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash';
import { location_compute } from '@/utils';
// 定义 customList 中每个元素的结构
interface CustomItem {
    id: string | number;
    key: string;
    location: {
        x: number;
        y: number;
    };
    com_data: {
        com_width: number;
        com_height: number;
        [key: string]: any; // 其他可能的属性
    };
}
const props = defineProps({
    customList: {
        type: Array as PropType<CustomItem[]>,
        default: () => {
            return [];
        },
    },
    sourceList: {
        type: Object,
        default: () => {
            return {};
        }
    },
    configLoop: {
        type: String,
        default: "1"
    },
    dataHeight: {
        type: Number,
        default: 0,
    },
    scale: {
        type: Number,
        default: 1,
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    isCustomGroup: {
        type: Boolean,
        default: false
    },
    groupSourceList: {
        type: Array,
        default: () => {
            return [];
        }
    },
    customGroupFieldId: {
        type: String,
        default: ''
    },
    showData: {
        type: Object as PropType<{
            data_key: string;
            data_name: string;
            data_logo?: string;
        }>,
        default: () => ({
            data_key: 'id',
            data_name: 'name',
        })
    }
});

const updateLocation = (targetItem: HTMLElement, data_follow: { spacing: number }, scale: number, isX: boolean): number => {
    try {
        const locationValueStr = targetItem.dataset[`location${isX ? 'X' : 'Y'}`];
        if (locationValueStr == null) {
            return 0;
        }
        const locationValue = parseFloat(locationValueStr);
        if (isNaN(locationValue) || scale <= 0 || (isX ? targetItem.clientWidth < 0 : targetItem.clientHeight < 0)) return 0;

        return ((locationValue + (data_follow?.spacing || 0)) * scale) + (isX ? targetItem.clientWidth : targetItem.clientHeight);
    } catch (error) {
        return 0;
    }
};

const list = ref<CustomItem[]>([]);
const allSignList = ref<HTMLElement | null>(null);
const signList = ref<HTMLElement[] | null>(null);
const custom_width = ref(0);

watch(() => props.customList, async (val) => {
    // 第一次渲染先渲染全部数据
    const new_val = cloneDeep(val);
    list.value = new_val;
    // 判断是否有跟随的数据
    const follow_list = new_val.filter(item => item.com_data.data_follow && item.com_data?.data_follow?.id !== '');
    if (follow_list.length > 0) {
        await nextTick();
        // 获取当前容器的宽度
        if (allSignList.value) {
            custom_width.value = allSignList.value.clientWidth;
        }
        // 第二次如果有跟随数据，更新对应数据的内容， 如果有超出容器范围的数据，限制其超出容器范围
        if (signList.value && signList.value.length > 0) {
            const idMap = new Map(signList.value.map(item => [item.dataset.id, item]));
            list.value.forEach((item1) => {
                const { data_follow } = item1.com_data;
                const targetItem = idMap.get(data_follow?.id);
                if (targetItem) {
                    // 获取自身的id信息
                    const text_item = item1.key == 'text' ? idMap.get((item1?.id || '')+ '') : undefined;
                    if (data_follow?.type === 'left') {
                        try {
                            // 更新位置信息 
                            const location_x = updateLocation(targetItem, data_follow, props.scale, true);
                            // 获取组件的宽度，如果是宽度自适应，则需要重新计算位置
                            let item_width = item1.com_data.com_width;
                            // 如果是宽度自适应,需要重新判断一下处理逻辑
                            if (item1.com_data?.is_width_auto === '1' && text_item) {
                                item_width = text_item.clientWidth;
                            }
                            // 根据容器信息更新位置信息
                            item1.location.x = location_compute(item_width, location_x, custom_width.value);
                        } catch (error) {
                            console.log(error);
                        }
                    } else if (data_follow?.type === 'top') {
                        try {
                            // 更新位置信息 
                            const location_y = updateLocation(targetItem, data_follow, props.scale, false);
                            // 获取组件的宽度，如果是宽度自适应，则需要重新计算位置
                            let item_height = item1.com_data.com_height;
                            // 如果是高度自适应,需要重新判断一下处理逻辑
                            if (item1.com_data?.is_height_auto === '1' && text_item) {
                                item_height = text_item.clientHeight;
                            }
                            // 根据容器信息更新位置信息
                            item1.location.y = location_compute(item_height, location_y, props.dataHeight * props.scale);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            });
        }
    }
}, { immediate: true, deep: true });

/**
 * 根据给定的值、跟随数据、类型等参数计算并返回一个表示百分比或特定值的字符串
 * 主要用于计算CSS样式中的尺寸属性值
 * 
 * @param {number} val - 需要转换为百分比或特定值的原始数值
 * @param {Object} data_follow - 包含跟随信息的对象，用于确定是否需要跟随其他元素
 * @param {string} type - 尺寸类型，可以是'left'、'top'、'width'或'height'
 * @param {string} [is_auto] - 可选参数，如果设置为'1'，则根据type和max_size计算自动样式
 * @param {number} [max_size] - 可选参数，用于计算最大宽度或高度
 * @returns {string} - 返回一个表示百分比或特定值的字符串，用于CSS样式
 */
 const percentage_count = (val: number, data_follow: { id: string, type: string }, type: string, is_auto?: string, max_size?: number) => {
    // 检查类型是否为'left'或'top'，如果是，则根据跟随数据计算样式
    if (['left', 'top'].includes(type)) {
        const { id = '', type: follow_type = 'left' } = data_follow || { id: '', type: 'left' };
        // 如果id不为空且follow_type与type匹配，则返回原始值的字符串表示
        if (id !== '' && follow_type === type) {
            return `${val}px`;
        }
        // 如果条件不满足，则根据比例缩放val并返回
        return `${val * props.scale}px`;
    } else {
        // 如果is_auto设置为'1'，则根据type和max_size计算自动样式
        if (is_auto === '1') {
            if (type === 'width' || type === 'height') {
                if (typeof max_size === 'number' && max_size >= 0) {
                    const scaledMaxSize = max_size * props.scale;
                    const autoStyle = 'auto;';
                    const maxSizeStyle = scaledMaxSize > 0 ? ` max-${type}: ${scaledMaxSize}px;` : '';
                    const whiteSpaceStyle = type === 'width' && scaledMaxSize <= 0 ? ' white-space:nowrap;' : '';
                    return `${ autoStyle }${ maxSizeStyle }${ whiteSpaceStyle }`;
                } else {
                    return 'auto;';
                }
            }
        } else {
            // 如果is_auto未设置或条件不满足，则根据比例缩放val并返回
            return `${val * props.scale}px`;
        }
    }
}

const custom_height = computed(() => props.dataHeight * props.scale + 'px');

const animation_class = computed(() => {
    return (val: any) => {
        const { type = 'none', number = 'infinite' } = val?.animation_style || {};
        if (type != 'none') {
            return type + (number == 'infinite' ? `-${number}` : '');
        } else {
            return '';
        }
    }
});
</script>

<style lang="scss" scoped>
.custom-other {
    height: v-bind(custom_height);
}
.main-content {
    position: absolute;
    overflow: hidden;
}
</style>