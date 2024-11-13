<template>
    <template v-if="data_source_content_list.length > 0">
        <div v-for="(item1, index1) in data_source_content_list" :key="index1">
            <div :style="style_container">
                <div class="w h" :style="style_img_container">
                    <div class="w h re custom-other">
                        <div v-for="(item, index) in form.custom_list" :key="item.id" class="main-content" :style="{'left': percentage_count(item.location.x, div_width) , 'top': percentage_count(item.location.y, form.height), 'width': percentage_count(item.com_data.com_width, div_width), 'height': percentage_count(item.com_data.com_height, form.height), 'z-index': (form.custom_list.length - 1) - index}">
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
        </div>
    </template>
    <template v-else>
        <div :style="style_container">
            <div class="w h" :style="style_img_container">
                <div class="w h re custom-other">
                    <div v-for="(item, index) in form.custom_list" :key="item.id" class="main-content" :style="{'left': percentage_count(item.location.x, div_width) , 'top': percentage_count(item.location.y, form.height), 'width': percentage_count(item.com_data.com_width, div_width), 'height': percentage_count(item.com_data.com_height, form.height), 'z-index': (form.custom_list.length - 1) - index}">
                        <template v-if="item.key == 'text'">
                            <model-text :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="form.data_source_content?.data_list[0] || {}" :source-type="form?.data_source || ''" :is-percentage="true"></model-text>
                        </template>
                        <template v-else-if="item.key == 'img'">
                            <model-image :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="form.data_source_content?.data_list[0] || {}" :source-type="form?.data_source || ''" :is-percentage="true"></model-image>
                        </template>
                        <template v-else-if="item.key == 'auxiliary-line'">
                            <model-lines :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="form.data_source_content?.data_list[0] || {}" :source-type="form?.data_source || ''" :is-percentage="true"></model-lines>
                        </template>
                        <template v-else-if="item.key == 'icon'">
                            <model-icon :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="form.data_source_content?.data_list[0] || {}" :source-type="form?.data_source || ''" :is-percentage="true"></model-icon>
                        </template>
                        <template v-else-if="item.key == 'panel'">
                            <model-panel :key="item.com_data" :value="item.com_data" :scale="scale" :source-list="form.data_source_content?.data_list[0] || {}" :source-type="form?.data_source || ''" :is-percentage="true"></model-panel>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>
<script setup lang="ts">
import { isEmpty } from 'lodash';
import { common_img_computer, common_styles_computer } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
    outerContainerPadding: {
        type: Number,
        default: 0,
    }
});
// 用于页面判断显示
const state = reactive({
    form: props.value.content,
    new_style: props.value.style,
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);

const custom_height = computed(() => form.value.height * scale.value + 'px');
const div_width = ref(0);
const scale = ref(1);
const percentage_count = (val: number, container_size: number) => {
    return val * scale.value + 'px';
};
// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));

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
watchEffect(() => {
    const { margin_left, margin_right, padding_left, padding_right } = new_style.value.common_style;
    // 根据容器宽度来计算内部大小
    div_width.value = 390 - margin_left - margin_right - padding_left - padding_right - props.outerContainerPadding;
    // 获得对应宽度的比例
    scale.value = div_width.value / 390;
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
