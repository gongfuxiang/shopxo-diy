<template>
    <div class="auxiliary-line-setting">
        <template v-if="type == '1'">
            <model-seckill-content :value="form.content" :styles="form.style" :default-config="data_config" @update:change-theme="change_theme"></model-seckill-content>
        </template>
        <template v-if="type == '2'">
            <model-seckill-styles :value="form.style" :content="form.content" :default-config="data_config"></model-seckill-styles>
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
//#region 默认数据
const data_config = reactive({
    // 图片不同风格下的圆角
    img_radius_0: 4,
    img_radius_1: 0,
});
const new_url = ref('');
// 全部的默认数据
let default_data:any = {};
// 每个样式下独立的默认数据
let default_config:any = {};
onBeforeMount(async () => {
    // 获取图片的链接地址
    new_url.value = await online_url('/static/plugins/seckill/images/diy/').then(res => res);
    // 全部的默认数据
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
            header_background_img: [{ id: 1, url: new_url.value + 'header-bg.png', original: '背景', title: '背景1', ext: '.png', type: 'img' }],
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
            shop_title_typeface: '500',
            shop_title_size: 14,    
            shop_title_color: "#333333",
            shop_price_typeface: '500',
            shop_price_size: 18,
            shop_price_color: "#EA3323;",
            shop_button_typeface:'400',
            shop_button_size: 12,
            shop_button_color: [
                {
                    color: '#FF3D53',
                    color_percentage: undefined
                },
                {
                    color: '#D73A3A',
                    color_percentage: undefined
                }
            ],
            shop_button_text_color: '#fff',
            shop_icon_size: 10,
            shop_icon_color: "#fff",
            original_price_color: '#999',
            seckill_subscript_location: 'top-left',
            seckill_subscript_text_color: '#fff',
            seckill_subscript_bg_color: '#FF7607',
            progress_bg_color: '#FFEDED',
            progress_actived_color_list: [{ color: '#FF3131', color_percentage: undefined }, { color: '#FF973D', color_percentage: undefined }],
            progress_actived_direction: '180deg',
            progress_button_color: '#FFDE81',
            progress_button_icon_color: '#FF2525',
            progress_text_color: '#FF3434',
            is_roll: true,
            interval_time: 2,
            rolling_fashion: 'translation',
        }
    }
    // 每个样式下独立的默认数据
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
                    header_background_img: [],
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
                    header_background_img: [],
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
                    header_background_img: [],
                    countdown_bg_color_list: [{ color: '#FF5000', color_percentage: undefined }],
                    countdown_direction: '180deg',
                    countdown_color: '#fff',
                }
            },
        },
    };
})
//#endregion
const form = ref(props.value);
// 切换风格的时候会将对应风格的默认数据合并到form中
const change_theme = (val: string) => {
    if (val) {
        form.value.style = Object.assign({}, form.value.style, cloneDeep(default_data.style), cloneDeep((<arrayIndex>default_config.style)[`theme_${Number(val)}`].style));
        form.value.content = Object.assign({}, form.value.content, cloneDeep(default_data.content), cloneDeep((<arrayIndex>default_config.style)[`theme_${Number(val)}`].content));
    }
};
</script>
<style lang="scss" scoped>
</style>
