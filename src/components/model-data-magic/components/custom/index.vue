<template>
    <template v-if="data_source_content_list.length > 0">
        <div v-for="(item1, index1) in data_source_content_list" :key="index1" class="oh" :style="style_container">
            <div class="w h oh" :style="style_img_container">
                <div class="w h re custom-other oh">
                    <div v-for="(item, index) in form.custom_list" :key="item.id" class="main-content" :style="{'left': percentage_count(item.location.x) , 'top': percentage_count(item.location.y), 'width': percentage_count(item.com_data.com_width), 'height': percentage_count(item.com_data.com_height), 'z-index': (form.custom_list.length - 1) - index}">
                        <template v-if="item.key == 'text'">
                            <model-text :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="item1" :source-type="form?.data_source || ''" :is-percentage="true"></model-text>
                        </template>
                        <template v-else-if="item.key == 'img'">
                            <model-image :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="item1" :source-type="form?.data_source || ''" :is-percentage="true"></model-image>
                        </template>
                        <template v-else-if="item.key == 'auxiliary-line'">
                            <model-lines :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="item1" :source-type="form?.data_source || ''" :is-percentage="true"></model-lines>
                        </template>
                        <template v-else-if="item.key == 'icon'">
                            <model-icon :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="item1" :source-type="form?.data_source || ''" :is-percentage="true"></model-icon>
                        </template>
                        <template v-else-if="item.key == 'panel'">
                            <model-panel :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="item1" :source-type="form?.data_source || ''" :is-percentage="true"></model-panel>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="oh" :style="style_container">
            <div class="w h oh" :style="style_img_container">
                <div class="w h re custom-other oh">
                    <div v-for="(item, index) in form.custom_list" :key="item.id" class="main-content" :style="{'left': percentage_count(item.location.x) , 'top': percentage_count(item.location.y), 'width': percentage_count(item.com_data.com_width), 'height': percentage_count(item.com_data.com_height), 'z-index': (form.custom_list.length - 1) - index}">
                        <template v-if="item.key == 'text'">
                            <model-text :key="item.com_data" :value="item.com_data" :scale="scale" :is-percentage="true"></model-text>
                        </template>
                        <template v-else-if="item.key == 'img'">
                            <model-image :key="item.com_data" :value="item.com_data" :scale="scale" :is-percentage="true"></model-image>
                        </template>
                        <template v-else-if="item.key == 'auxiliary-line'">
                            <model-lines :key="item.com_data" :value="item.com_data" :scale="scale" :is-percentage="true"></model-lines>
                        </template>
                        <template v-else-if="item.key == 'icon'">
                            <model-icon :key="item.com_data" :value="item.com_data" :scale="scale" :is-percentage="true"></model-icon>
                        </template>
                        <template v-else-if="item.key == 'panel'">
                            <model-panel :key="item.com_data" :value="item.com_data" :scale="scale" :is-percentage="true"></model-panel>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>
<script setup lang="ts">
import { background_computer, gradient_computer, margin_computer, padding_computer, radius_computer } from '@/utils';
import { isEmpty } from "lodash";

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
// 数据来源的内容
let data_source_content_list = computed(() => {
    if (['goods', 'article', 'brand'].includes(form.value.data_source)) {
        if (form.value.data_source_content_value.data_type == '0') {
            return form.value.data_source_content.data_list;
        } else {
            return form.value.data_source_content.data_auto_list;
        }
    } else {
        return form.value.data_source_content.data_list;
    }
})
interface new_style {
    data_color_list: color_list[];
    data_direction: string; 
    data_radius: radiusStyle;
    data_chunk_margin: marginStyle;
    data_chunk_padding: paddingStyle;
    data_background_img: uploadList[];
    data_background_img_style: string;
}
// 用于样式显示
const style_container = computed(() => {
    if (!isEmpty(new_style.value)) {
        const { data_color_list = [], data_direction = '180deg', data_radius = { radius: 0, radius_top_left: 0, radius_top_right: 0, radius_bottom_left: 0, radius_bottom_right: 0 }, data_chunk_margin = { margin: 0, margin_top: 0, margin_bottom: 0, margin_left: 0, margin_right: 0 }} = new_style.value;
        const data = {
            color_list: data_color_list,
            direction: data_direction,
        }
        return gradient_computer(data) + radius_computer(data_radius) + margin_computer(data_chunk_margin);
    } else {
        return '';
    }
});
const style_img_container = computed(() => {
    if (!isEmpty(new_style.value)) {
        const { data_background_img = [], data_background_img_style = '2', data_chunk_padding = { padding: 0, padding_top: 0, padding_bottom: 0, padding_left: 0, padding_right: 0 }} = new_style.value;
        const data = {
            background_img: data_background_img,
            background_img_style: data_background_img_style,
        }
        return padding_computer(data_chunk_padding) + background_computer(data);
    } else {
        return '';
    }
});
const custom_height = computed(() => form.value.height * scale.value + 'px');
watchEffect(() => {
    // 重新赋值
    form.value = props.value.data_content;
    new_style.value = props.value.data_style;

    const { padding_left, padding_right } = new_style.value.data_chunk_padding;
    const { margin_left, margin_right } = new_style.value.data_chunk_margin;
    // 当前容器的宽度 减去 左右两边的padding值 再减去 数据间距的一半 再除以 容器的宽度 得到比例 再乘以数据魔方的比例
    const width = form.value.width - padding_left - padding_right - margin_left - margin_right - (props.dataSpacing / 2);
    scale.value = (width / form.value.width) * props.magicScale;
})
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
