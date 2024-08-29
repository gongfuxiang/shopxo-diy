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
const default_config = {
    style: {
        theme_1: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            // 主题1时不显示
            desc_color: '#FF3830',
            // 主题1时不显示
            limit_send_count: '#999',
            btn_background: [{ color: '#FF3830', color_percentage: undefined }],
            btn_color: '#FF3830',
            background: [{ color: '#FFF1E1', color_percentage: undefined }],
            spacing: 20,
        },
        theme_2: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            desc_color: '#999',
            // 主题2时不显示
            limit_send_count: '#999',
            btn_background: [{ color: '#FFF1E1', color_percentage: undefined }],
            btn_color: '#fff',
            // 当为主题2时，不显示
            background: [{ color: '#fff', color_percentage: undefined }],
            spacing: 15,
        },
        theme_3: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            desc_color: '#FF3830',
            limit_send_count: '#999',
            btn_background: [{ color: '#FF3830', color_percentage: undefined }],
            btn_color: '#FF3830',
            background: [{ color: '#FFF1E1', color_percentage: undefined }],
            // 当为主题34时，间距不给予修改，优惠券沾满整行
            spacing: 0,
        },
        theme_4: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            desc_color: '#333',
            // 主题4时不显示
            limit_send_count: '#999',
            btn_background: [{ color: '#fff', color_percentage: undefined }],
            btn_color: '#FF3830',
            background: [{ color: '#FFF1E1', color_percentage: undefined }],
            // 当为主题34时，间距不给予修改，优惠券沾满整行
            spacing: 0,
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
            btn_color: '#fff',
            background: [{ color: '#FFF1E1', color_percentage: undefined }],
            spacing: 10,
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
            btn_color: '#fff',
            background: [{ color: '#FF3830', color_percentage: undefined }],
            spacing: 10,
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
            btn_color: '#fff',
            background: [
                { color: '#FF3830', color_percentage: undefined },
                { color: '#E1B47A', color_percentage: undefined },
            ],
            direction: '90deg',
            spacing: 10,
        },
    },
    common_style: {
        theme_default: {
            background_img_url: [],
        },
        theme_2: {
            background_img_url: [{ url: 'http://shopxo.com/static/upload/images/common/2024/08/28/1724815957918121.png' }],
        },
    },
};
const change_theme = (val: string) => {
    if (val) {
        if (val == '2') {
            form.value.style.common_style = Object.assign({}, form.value.style.common_style, (<arrayIndex>default_config.common_style)[`theme_${Number(val)}`]);
        } else {
            form.value.style.common_style = Object.assign({}, form.value.style.common_style, default_config.common_style.theme_default);
        }
        form.value.style = Object.assign({}, form.value.style, (<arrayIndex>default_config.style)[`theme_${Number(val)}`]);
    }
};
</script>
