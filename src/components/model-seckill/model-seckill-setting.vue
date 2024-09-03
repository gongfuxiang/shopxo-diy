<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-seckill-content :value="value.content" :styles="value.style"></model-seckill-content>
        </template>
        <template v-if="type == '2'">
            <model-seckill-styles :value="value.style" :content="value.content"></model-seckill-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash';
const props = defineProps({
    type: {
        type: String,
        default: '1',
    },
    value: {
        type: Object,
        default: () => ({}),
    },
});
const default_data = {
    topic_color: '',
    topic_size: 12,
    head_button_color: '',
    head_button_size: 12,
    end_text_color: '',
    countdown_bg_color_list: [{ color: '', color_percentage: undefined }],
    countdown_direction: '180deg',
    countdown_color: '',
    header_background_color_list: [{ color: '', color_percentage: undefined }],
    header_background_direction: '180deg',
    header_background_img_style: '2',
    header_background_img_url: [],
    shop_radius: {
        radius: 8,
        radius_top_left: 8,
        radius_top_right: 8,
        radius_bottom_left: 8,
        radius_bottom_right: 8,
    } ,
    shop_img_radius: {
        radius: 4,
        radius_top_left: 4,
        radius_top_right: 4,
        radius_bottom_left: 4,
        radius_bottom_right: 4,
    },
    shop_title_color: '',
    shop_title_typeface: '',
    shop_title_size: 12,
    price_color: '',
    original_price_color: '',
    seckill_subscript_location: '',
    seckill_subscript_text_color: '',
    seckill_subscript_bg_color: '',
    progress_bg_color: '',
    progress_actived_color_list: [{ color: '', color_percentage: undefined }],
    progress_actived_direction: '180deg',
    progress_button_color: '',
    progress_button_icon_color: '',
    progress_text_color: '',
    is_roll: true,
    interval_time: 2,
    rolling_fashion: 'translation',
}
const default_config = {
    style: {
        theme_1: {},
        theme_2: {},
        theme_3: {},
        theme_4: {},
        theme_5: {},
    },
};
const form = ref(props.value);
const change_theme = (val: string) => {
    if (val) {
        form.value.style = Object.assign({}, form.value.style, cloneDeep(default_data), (<arrayIndex>default_config.style)[`theme_${Number(val)}`]);
    }
};
</script>
<style lang="scss" scoped>
</style>
