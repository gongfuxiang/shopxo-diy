<template>
    <div ref="container" class="custom-other" :style="style_container">
        <div class="w h" :style="style_img_container">
            <div class="w h re">
                <div v-for="item in form.custom_list" :key="item.id" class="main-content" :style="{'left': percentage_count(item.location.x * scale, div_width) , 'top': percentage_count(item.location.y * scale, form.height), 'width': percentage_count(item.com_data.com_width * scale, div_width), 'height': percentage_count(item.com_data.com_height * scale, form.height)}">
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
    </div>
</template>
<script setup lang="ts">
import { common_img_computer, common_styles_computer, percentage_count } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    }
});
// 用于页面判断显示
const state = reactive({
    form: props.value.content,
    new_style: props.value.style,
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);

const custom_height = computed(() => form.value.height + 'px');
const container = ref<HTMLElement | null>(null);
const div_width = ref(0);
const scale = ref(1);
onMounted(() => {
    if (container.value) {
        div_width.value = container.value.offsetWidth;
        scale.value = div_width.value / 390;
    }
});

// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
watch(() => new_style.value.common_style, (val) => {
    if (container.value) {
        div_width.value = container.value.offsetWidth;
        scale.value = div_width.value / 390;
    }
}, { deep: true });
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
