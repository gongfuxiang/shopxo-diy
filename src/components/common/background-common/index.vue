<template>
    <div class="flex-col gap-10 w">
        <div class="size-12 flex-row gap-10">
            <span>背景色</span>
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" :content="props.tooltipContent" raw-content placement="top">
                <icon name="miaosha-hdgz" size="12" color="#999"></icon>
            </el-tooltip>
        </div>
        <mult-color-picker :value="color_list" :type="direction" @update:value="mult_color_picker_event"></mult-color-picker>
        <div class="flex-row jc-sb align-c">
            <div class="size-12">背景图</div>
            <bg-btn-style v-model="background_img_style"></bg-btn-style>
        </div>
        <upload v-model="background_img" :limit="1"></upload>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    tooltipContent?: string;
}
const props = withDefaults(defineProps<Props>(), {
    tooltipContent: '背景图的优先级比背景色的优先级高',
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
const emit = defineEmits(['mult_color_picker_event']);
const mult_color_picker_event = (arry: color_list[], type: number) => {
    emit('mult_color_picker_event', arry, type);
};
</script>