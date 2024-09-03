<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-seckill-content :value="form.content" :styles="form.style" @update:change-theme="change_theme"></model-seckill-content>
        </template>
        <template v-if="type == '2'">
            <model-seckill-styles :value="form.style" :content="form.content"></model-seckill-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { online_url } from '@/utils';

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


const new_url = ref('');
let default_data:any = {};
let default_config:any = {};
onBeforeMount(async () => {
    new_url.value = await online_url('/static/plugins/seckill/images/diy/').then(res => res);
    default_data = {
        content: {
            topic_type: 'image',
            topic_src: [{ id: 1, url: new_url.value + 'header-title.png', original: '标题', title: '标题', ext: '.png', type: 'img' }],
            topic_text: '限时秒杀',
        },
        style: {
            topic_color: '#fff',
            topic_size: 18,
            head_button_color: '#fff',
            head_button_size: 12,
            end_text_color: '#fff',
            countdown_bg_color_list: [{ color: '#fff', color_percentage: undefined }],
            countdown_direction: '180deg',
            countdown_color: '#FF1818',
            header_background_color_list: [{ color: '', color_percentage: undefined }],
            header_background_direction: '180deg',
            header_background_img_style: '2',
            header_background_img_url: [{ id: 1, url: new_url.value + 'header-bg.png', original: '背景', title: '背景1', ext: '.png', type: 'img' }],
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
            shop_padding: {
                padding: 10, 
                padding_top: 10, 
                padding_bottom: 10, 
                padding_left: 10, 
                padding_right: 10,
            },
            content_outer_spacing: 10, // 商品间距
            content_spacing: 10,
            content_outer_height: 232,
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
    }
    default_config = {
        style: {
            theme_1: {},
            theme_2: {
                content: {
                    topic_type: 'image',
                    topic_src: [{ id: 1, url: new_url.value + 'header-title-2.png', original: '标题2', title: '标题2', ext: '.png', type: 'img' }],
                    button_status: '0',
                },
                style: {
                    topic_color: '#000',
                    end_text_color: '#666',
                    header_background_color_list: [{ color: '#FFE0E0', color_percentage: undefined },{ color: '#FFEFEF', color_percentage: 50 }, { color: '#FFFFFF', color_percentage: undefined }],
                    header_background_img_url: [],
                    countdown_bg_color_list: [{ color: '#FF4909', color_percentage: undefined }, { color: '#FF8E4D', color_percentage: undefined }],
                    countdown_direction: '180deg',
                    countdown_color: '#fff',
                }
            },
            theme_3: {
                content: {
                    topic_type: 'text',
                    topic_src: [],
                    button_status: '1',
                },
                style: {
                    topic_color: '#000',
                    head_button_color: '#000',
                    end_text_color: '#666',
                    header_background_color_list: [{ color: '#fff', color_percentage: undefined }],
                    header_background_img_url: [],
                    countdown_bg_color_list: [{ color: '#000', color_percentage: undefined }],
                    countdown_direction: '180deg',
                    countdown_color: '#fff',
                }
            },
            theme_4: {
                content: {
                    topic_type: 'text',
                    topic_src: [],
                    button_status: '1',
                },
                style: {
                    topic_color: '#000',
                    head_button_color: '#000',
                    end_text_color: '#666',
                    header_background_color_list: [{ color: '#fff', color_percentage: undefined }],
                    header_background_img_url: [],
                    countdown_bg_color_list: [{ color: '#FF5000', color_percentage: undefined }],
                    countdown_direction: '180deg',
                    countdown_color: '#fff',
                }
            },
        },
    };
})
const form = ref(props.value);
const change_theme = (val: string) => {
    if (val) {
        form.value.style = Object.assign({}, form.value.style, cloneDeep(default_data.style), cloneDeep((<arrayIndex>default_config.style)[`theme_${Number(val)}`].style));
        form.value.content = Object.assign({}, form.value.content, cloneDeep(default_data.content), cloneDeep((<arrayIndex>default_config.style)[`theme_${Number(val)}`].content));
        console.log(form.value.content);     
    }
};
</script>
<style lang="scss" scoped>
</style>
