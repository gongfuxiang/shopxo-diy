<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-coupon-content :value="form.content" @update:change-theme="change_theme"></model-coupon-content>
        </template>
        <template v-else-if="type == '2'">
            <model-coupon-styles :value="form.style" :theme="form.content.theme"></model-coupon-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
import { online_url } from '@/utils';
/**
 * @description: 优惠券（设置）
 * @param type{String} 类型（1：内容，2：样式）
 * @param value{Object} 传过来的数据，用于数据渲染
 */
const props = defineProps({
    type: {
        type: String,
        default: '1',
    },
    value: {
        type: Object,
        default: () => {},
    },
});
const form = ref(props.value);
const new_url = ref('');
// 默认配置
const default_config = ref({
    style: {
        theme_1: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            // 主题1时不显示
            desc_color: '#FF3830',
            // 主题1时不显示
            limit_send_count: '#999',
            btn_background: [{ color: '#FFF1E1', color_percentage: undefined }],
            btn_direction: '90deg',
            btn_color: '#FF3830',
            background: [{ color: '#FF3830', color_percentage: undefined }],
            direction: '90deg',
            // 主题1时不显示
            background_inside: [{ color: '#FFF1E1', color_percentage: undefined }],
            // 主题1时不显示
            direction_inside: '90deg',
            spacing: 20,
            // 风格4字段
            type_color: '#FF3830',
            type_background: '#FFF1E1',
            content_title_color: '#fff',
            content_desc_color: '#fff',
        },
        theme_2: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            desc_color: '#999',
            // 主题2时不显示
            limit_send_count: '#999',
            btn_background: [{ color: '#FF3830', color_percentage: undefined }],
            btn_direction: '90deg',
            btn_color: '#fff',
            // 当为主题2时，不显示
            background: [{ color: '#fff', color_percentage: undefined }],
            // 当为主题2时，不显示
            direction: '90deg',
            // 主题2时不显示
            background_inside: [{ color: '#FFF1E1', color_percentage: undefined }],
            // 主题2时不显示
            direction_inside: '90deg',
            spacing: 15,
            // 风格4字段
            type_color: '#FF3830',
            type_background: '#FFF1E1',
            content_title_color: '#fff',
            content_desc_color: '#fff',
        },
        theme_3: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            desc_color: '#FF3830',
            limit_send_count: '#999',
            // 主题3时不显示
            btn_background: [{ color: '#FF3830', color_percentage: undefined }],
            // 主题3时不显示
            btn_direction: '90deg',
            btn_color: '#fff',
            background: [{ color: '#FF3830', color_percentage: undefined }],
            direction: '90deg',
            background_inside: [{ color: '#FFF1E1', color_percentage: undefined }],
            direction_inside: '90deg',
            spacing: 8,
            // 风格4字段
            type_color: '#FF3830',
            type_background: '#FFF1E1',
            content_title_color: '#fff',
            content_desc_color: '#fff',
        },
        theme_4: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            desc_color: '#333',
            // 主题4时不显示
            limit_send_count: '#999',
            btn_background: [{ color: '#fff', color_percentage: undefined }],
            btn_direction: '90deg',
            btn_color: '#FF3830',
            background: [{ color: '#ff3830', color_percentage: undefined }],
            direction: '90deg',
            background_inside: [{ color: '#fff', color_percentage: undefined }],
            direction_inside: '90deg',
            spacing: 8,
            // 风格4字段
            type_color: '#FF3830',
            type_background: '#FFF1E1',
            content_title_color: '#fff',
            content_desc_color: '#fff',
        },
        theme_5: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            // 主题5时不显示
            desc_color: '#333',
            // 主题5时不显示
            limit_send_count: '#999',
            // 主题5时不显示
            btn_background: [{ color: '#fff', color_percentage: undefined }],
            // 主题5时不显示
            btn_direction: '90deg',
            btn_color: '#fff',
            background: [
                { color: '#FFA273', color_percentage: undefined },
                { color: '#FF3030', color_percentage: undefined },
            ],
            direction: '90deg',
            // 主题5时不显示
            background_inside: [{ color: '#FFF1E1', color_percentage: undefined }],
            // 主题5时不显示
            direction_inside: '90deg',
            spacing: 10,
            // 风格4字段
            type_color: '#FF3830',
            type_background: '#FFF1E1',
            content_title_color: '#fff',
            content_desc_color: '#fff',
        },
        theme_6: {
            price_color: '#FF3830',
            name_color: '#666',
            // 主题6时不显示
            desc_color: '#333',
            // 主题6时不显示
            limit_send_count: '#999',
            // 主题6时不显示
            btn_background: [{ color: '#fff', color_percentage: undefined }],
            // 主题6时不显示
            btn_direction: '90deg',
            btn_color: '#fff',
            background: [{ color: '#FF3830', color_percentage: undefined }],
            direction: '90deg',
            background_inside: [{ color: '#fff', color_percentage: undefined }],
            direction_inside: '90deg',
            spacing: 10,
            // 风格4字段
            type_color: '#FF3830',
            type_background: '#FFF1E1',
            content_title_color: '#fff',
            content_desc_color: '#fff',
        },
        theme_7: {
            price_color: '#fff',
            name_color: '#fff',
            // 主题7时不显示
            desc_color: '#fff',
            // 主题7时不显示
            limit_send_count: '#999',
            // 主题7时不显示
            btn_background: [{ color: '#E1B47A', color_percentage: undefined }],
            btn_direction: '90deg',
            btn_color: '#fff',
            background: [
                { color: '#F4DBA5', color_percentage: undefined },
                { color: '#E1B47A', color_percentage: undefined },
            ],
            direction: '90deg',
            // 主题7时不显示
            background_inside: [{ color: '#FFF1E1', color_percentage: undefined }],
            // 主题7时不显示
            direction_inside: '90deg',
            spacing: 10,
            // 风格4字段
            type_color: '#FF3830',
            type_background: '#FFF1E1',
            content_title_color: '#fff',
            content_desc_color: '#fff',
        },
    },
    common_style: {
        theme_default: {
            background_img: [],
        },
        theme_2: {
            background_img: [{ url: 'theme-2-bg.png' }],
        },
    },
});
// 获取图片路径
onMounted(async () => {
    new_url.value = await online_url('/static/plugins/coupon/images/diy/').then((res) => res);
    default_config.value.common_style.theme_2.background_img = [{ url: new_url.value + 'theme-2-bg.png' }];
});
// 切换主题
const change_theme = (val: string) => {
    if (val) {
        if (val == '2') {
            form.value.style.common_style = Object.assign({}, form.value.style.common_style, (<arrayIndex>default_config.value.common_style)[`theme_${Number(val)}`]);
        } else {
            form.value.style.common_style = Object.assign({}, form.value.style.common_style, default_config.value.common_style.theme_default);
        }
        form.value.style = Object.assign({}, form.value.style, (<arrayIndex>default_config.value.style)[`theme_${Number(val)}`]);
    }
};
</script>
