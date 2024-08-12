<template>
    <div ref="container" class="custom-other" :style="style_container">
        <div class="w h re">
            <div v-for="item in form.custom_list" :key="item.id" class="main-content" :style="{'left': percentage_count(item.location.x, div_width) , 'top': percentage_count(item.location.y, form.height), 'width': percentage_count(item.com_data.com_width, form.height), 'height': percentage_count(item.com_data.com_height, form.height)}">
                <template v-if="item.key == 'text'">
                    <model-text :key="item.com_data" :value="item.com_data" :is-percentage="true"></model-text>
                </template>
                <template v-else-if="item.key == 'img'">
                    <model-image :key="item.com_data" :value="item.com_data" :is-percentage="true"></model-image>
                </template>
                <template v-else-if="item.key == 'auxiliary-line'">
                    <model-lines :key="item.com_data" :value="item.com_data" :is-percentage="true"></model-lines>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, percentage_count } from '@/utils';

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
onMounted(() => {
    if (container.value) {
        div_width.value = container.value.offsetWidth;
    }
});

// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
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
