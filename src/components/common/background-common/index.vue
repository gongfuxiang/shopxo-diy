<template>
    <div class="flex-col gap-10 w">
        <div class="size-12 flex-row gap-10">
            <span>背景色</span>
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" :content="props.tooltipContent" raw-content placement="top">
                <icon name="miaosha-hdgz" size="12" color="#999"></icon>
            </el-tooltip>
        </div>
        <mult-color-picker :value="color_list" :type="direction" @update:value="mult_color_picker_event"></mult-color-picker>
        <div class="flex-row jc-sb align-c is-newline">
            <div class="size-12">背景图</div>
            <bg-btn-style v-model="background_img_style" @operation_end="operation_end"></bg-btn-style>
        </div>
        <template v-if="componentType == 'carousel'">
            <el-radio-group v-model="background_type">
                <el-radio value="custom">自定义图片</el-radio>
                <el-radio value="carousel">轮播图片</el-radio>
            </el-radio-group>
            <template v-if="background_type == 'custom'">
                <upload v-model="background_img" :limit="1" @update:model-value="operation_end"></upload>
            </template>
        </template>
        <template v-else>
            <upload v-model="background_img" :limit="1" @update:model-value="operation_end"></upload>
        </template>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    tooltipContent?: string;
    componentType?: string;
}
const props = withDefaults(defineProps<Props>(), {
    tooltipContent: '背景图的优先级比背景色的优先级高',
    componentType: 'all'
});

const color_list = defineModel('color_list', {
    type: Array,
    default: () => ([{ color: '', color_percentage: undefined }]),
});
const direction = defineModel('direction', {
    type: String,
    default: '90deg',
});
const background_img_style = defineModel('img_style', {
    type: String,
    default: '2',
});
const background_img = defineModel('img', {
    type: Array as PropType<uploadList[]>,
    default: () => [],
});
const background_type = defineModel('type', {
    type: String,
    default: 'custom',
});
const emit = defineEmits(['mult_color_picker_event', 'operation_end']);
const mult_color_picker_event = (arry: color_list[], type: number) => {
    emit('mult_color_picker_event', arry, type);
    operation_end();
};

const operation_end = () => {
    emit('operation_end');
};
</script>