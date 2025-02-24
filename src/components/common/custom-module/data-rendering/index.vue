<template>
    <div class="w h re custom-other">
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

const list = ref(props.customList);
const signList = ref<HTMLElement[] | null>(null);
watch(() => props.customList, async (val) => {
    list.value = val;
    const follow_list = val.filter(item => item.com_data?.data_follow?.id !== '');
    if (follow_list.length > 0) {
        await nextTick();
        if (signList.value && signList.value.length > 0) {
            // 使用双重for循环确保每个组件都进行了刷新
            signList.value.forEach((item) => {
                follow_list.forEach((item1) => {
                    const { data_follow } = item1.com_data;
                    if (data_follow?.id === item.dataset.id) {
                        if (data_follow?.type == 'left') {
                            if (item1.location && item.dataset.locationX) {
                                const locationX = parseFloat(item.dataset.locationX);
                                if (!isNaN(locationX)) {
                                    item1.location.x = ((locationX + data_follow.spacing) * props.scale) + item.clientWidth;
                                }
                            }
                        } else if (data_follow?.type == 'top') {
                            if (item1.location && item.dataset.locationY) {
                                const locationY = parseFloat(item.dataset.locationY);
                                if (!isNaN(locationY)) {
                                    item1.location.y = ((locationY + data_follow.spacing) * props.scale) + item.clientWidth;
                                }
                            }
                        }
                    }
                })
            });
        }
    }
}, { immediate: true, deep: true });

const percentage_count = (val: number, data_follow: { id: string, type: string }, type: string, is_auto?: string, max_size?: number) => {
    if (['left', 'top'].includes(type)) {
        const { id = '', type: follow_type = 'left' } = data_follow;
        if (id !== '' && follow_type == type) {
            return val + 'px';
        } else {
            return val * props.scale + 'px';
        }
    } else {
        if (is_auto == '1') {
            if (type === 'width') {
                if (max_size !== undefined && max_size > 0) {
                    return `auto; max-width:${max_size * props.scale}px;`;
                } else {
                    return 'auto;';
                }
            } else if (type === 'height') {
                if (max_size !== undefined && max_size > 0) {
                    return `auto; max-height:${max_size * props.scale}px;`;
                } else {
                    return 'auto;';
                }
            }
        } else {
            return val * props.scale + 'px';
        }   
    }
};

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