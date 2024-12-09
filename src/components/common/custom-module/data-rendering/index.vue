<template>
    <div class="w h re custom-other">
        <div v-for="(item, index) in list" :key="item.id" class="main-content" :style="{'left': percentage_count(item.location.x) , 'top': percentage_count(item.location.y), 'width': percentage_count(item.com_data.com_width), 'height': percentage_count(item.com_data.com_height), 'z-index': (customList.length - 1) - index}">
            <template v-if="item.key == 'text'">
                <model-text :key="item.id" :value="item.com_data" :scale="scale" :source-list="sourceList" :is-custom="isCustom" :title-params="showData?.data_name || 'name'" :is-percentage="true"></model-text>
            </template>
            <template v-else-if="item.key == 'img'">
                <model-image :key="item.id" :value="item.com_data" :scale="scale" :source-list="sourceList" :is-custom="isCustom" :img-params="showData?.data_logo || ''" :is-percentage="true"></model-image>
            </template>
            <template v-else-if="item.key == 'auxiliary-line'">
                <model-lines :key="item.id" :value="item.com_data" :scale="scale" :source-list="sourceList" :is-custom="isCustom"  :is-percentage="true"></model-lines>
            </template>
            <template v-else-if="item.key == 'icon'">
                <model-icon :key="item.id" :value="item.com_data" :scale="scale" :source-list="sourceList" :is-custom="isCustom"  :is-percentage="true"></model-icon>
            </template>
            <template v-else-if="item.key == 'panel'">
                <model-panel :key="item.id" :value="item.com_data" :scale="scale" :source-list="sourceList" :is-custom="isCustom"  :is-percentage="true"></model-panel>
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

const list = computed(() => props.customList);

const percentage_count = (val: number) => {
    return val * props.scale + 'px';
};

const custom_height = computed(() => props.dataHeight * props.scale + 'px');
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