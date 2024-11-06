<template>
    <div class="w h oh" :style="style_container">
        <div class="w h re custom-other oh">
            <div v-for="(item, index) in form.custom_list" :key="item.id" class="main-content" :style="{'left': percentage_count(item.location.x) , 'top': percentage_count(item.location.y), 'width': percentage_count(item.com_data.com_width), 'height': percentage_count(item.com_data.com_height), 'z-index': (form.custom_list.length - 1) - index}">
                <template v-if="item.key == 'text'">
                    <model-text :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="form.data_source_content" :is-percentage="true"></model-text>
                </template>
                <template v-else-if="item.key == 'img'">
                    <model-image :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="form.data_source_content" :is-percentage="true"></model-image>
                </template>
                <template v-else-if="item.key == 'auxiliary-line'">
                    <model-lines :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="form.data_source_content" :is-percentage="true"></model-lines>
                </template>
                <template v-else-if="item.key == 'icon'">
                    <model-icon :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="form.data_source_content" :is-percentage="true"></model-icon>
                </template>
                <template v-else-if="item.key == 'panel'">
                    <model-panel :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="form.data_source_content" :is-percentage="true"></model-panel>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { padding_computer } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
    magicScale: {
        type: Number,
        default: 1,
    },
    dataSpacing: {
        type: Number,
        default: 0,
    }
});
// 用于页面判断显示
const state = reactive({
    form: props.value.data_content,
    new_style: props.value.data_style,
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);
const scale = ref(1);
const percentage_count = (val: number) => {
    return val * scale.value + 'px';
};
// 公共样式
const style_container = computed(() => padding_computer(new_style.value.chunk_padding));
watchEffect(() => {
    // 重新赋值
    form.value = props.value.data_content;
    new_style.value = props.value.data_style;

    const { padding_left, padding_right } = new_style.value.chunk_padding;
    // 当前容器的宽度 减去 左右两边的padding值 再减去 数据间距的一半 再除以 容器的宽度 得到比例 再乘以数据魔方的比例
    const width = form.value.width - padding_left - padding_right - (props.dataSpacing / 2);
    scale.value = (width / form.value.width) * props.magicScale;
})
</script>
<style lang="scss" scoped>
.main-content {
    position: absolute;
    overflow: hidden;
}
</style>
