<template>
    <div :style="style">
        <div class="flex-col gap-10">
            <div v-if="form.head_state == '1'" class="seckill-head flex-row align-c jc-sb oh" :style="seckill_head_style">
                <div class="flex-row align-c">
                    <div class="seckill-title">
                        <image-empty v-if="form.topic_type == 'image'" v-model="form.topic_src[0]" error-img-style="width:2.1rem; height: 1rem;"></image-empty>
                        <span v-else :style="`color: ${ new_style.topic_color };font-size: ${ new_style.topic_size }px;`">{{ form.topic_text }}</span>
                    </div>
                    <div class="pl-6 pr-6 cr-f">|</div>
                    <span class="size-10 pr-4" :style="`color: ${ new_style.end_text_color }`">距离结束</span>
                    <div class="flex-row gap-3 jc-c align-c">
                        <template v-for="(item, index) in time_config" :key="item.key">
                            <div class="time-config size-12" :style="`${ time_bg };color: ${ new_style.countdown_color }`">{{ item.value }}</div>
                            <div v-if="[0, 1].includes(index)" :style="icon_time_check()">:</div>
                        </template>
                    </div>
                </div>
                <div v-if="form.button_status == '1'" class="flex-row align-c" :style="`color: ${ new_style.head_button_color }`">
                    <span :style="`font-size: ${ new_style.head_button_size }px;`">{{ form.button_text }}</span>
                    <el-icon class="iconfont icon-arrow-right" :color="new_style.head_button_color"></el-icon>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, common_styles_computer, gradient_computer } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});
const form = computed(() => props.value?.content || {});
const new_style = computed(() => props.value?.style || {});
const time_config = [
    { key: 'hour', value: 12 },
    { key: 'minute', value: 30 },
    { key: 'second', value: 52 },
]
const time_bg = computed(() => {
    const { countdown_bg_color_list, countdown_direction } = new_style.value;
    // 渐变
    const gradient = { color_list: countdown_bg_color_list, direction: countdown_direction };
    return gradient_computer(gradient);
});
// icon的渐变色处理
const icon_time_check = () => {
    return `${ time_bg.value };line-height: 1;background-clip: text;-webkit-background-clip: text;-webkit-text-fill-color: transparent;`;
}

const seckill_head_style = computed(() => {
    let style = ``;
    const { header_background_img_url, header_background_img_style, header_background_color_list, header_background_direction } = new_style.value;
    // 渐变
    const gradient = { color_list: header_background_color_list, direction: header_background_direction };
    // 背景图
    const back = { background_img_url: header_background_img_url, background_img_style: header_background_img_style };
    style += gradient_computer(gradient) + background_computer(back);
    return style;
});

const style = computed(() => common_styles_computer(props.value.style.common_style));
</script>
<style lang="scss" scoped>
.seckill-head {
    padding: 1.5rem 1.3rem;
    width: 100%;
    height: 5.1rem;
    .seckill-title {
        height: 2.1rem;
    }
    .time-config {
        padding: 0.1rem 0.5rem;
        line-height: 1.7rem;
    }
}
</style>
