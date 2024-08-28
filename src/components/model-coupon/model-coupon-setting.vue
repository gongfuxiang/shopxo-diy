<template>
    <div class="setting-content">
        <template v-if="type == '1'">
            <model-coupon-content :value="value.content" :styles="value.style" :default-config="default_config"></model-coupon-content>
        </template>
        <template v-else-if="type == '2'">
            <model-coupon-styles :value="value.style" :content="value.content" :default-config="default_config"></model-coupon-styles>
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
const default_config = {
    style: {
        theme_1: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            // 主题1时不显示
            desc_color: '#FF3830',
            // 主题1时不显示
            limit_send_count: '#999',
            btn_background: [{ color: '#FF3830', color_percentage: '' }],
            btn_color: '#FF3830',
            background: [{ color: '#FFF1E1', color_percentage: '' }],
            spacing: 20,
        },
        theme_2: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            desc_color: '#999',
            // 主题2时不显示
            limit_send_count: '#999',
            btn_background: [{ color: '#FFF1E1', color_percentage: '' }],
            btn_color: '#fff',
            // 当为主题2时，不显示
            background: [{ color: '#fff', color_percentage: '' }],
            spacing: 15,
            common_style: {
                background_img_url: [{ url: 'http://shopxo.com/static/upload/images/common/2024/08/28/1724815957918121.png' }],
            },
        },
        theme_3: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            desc_color: '#FF3830',
            limit_send_count: '#999',
            btn_background: [{ color: '#FF3830', color_percentage: '' }],
            btn_color: '#FF3830',
            background: [{ color: '#FFF1E1', color_percentage: '' }],
            // 当为主题34时，间距不给予修改，优惠券沾满整行
            spacing: 0,
        },
        theme_4: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            desc_color: '#333',
            // 主题4时不显示
            limit_send_count: '#999',
            btn_background: [{ color: '#fff', color_percentage: '' }],
            btn_color: '#FF3830',
            background: [{ color: '#FFF1E1', color_percentage: '' }],
            // 当为主题34时，间距不给予修改，优惠券沾满整行
            spacing: 0,
        },
        theme5: {
            price_color: '#FF3830',
            name_color: '#FF3830',
            // 主题5时不显示
            desc_color: '#333',
            // 主题5时不显示
            limit_send_count: '#999',
            // 主题5时不显示
            btn_background: [{ color: '#fff', color_percentage: '' }],
            btn_color: '#fff',
            background: [{ color: '#FFF1E1', color_percentage: '' }],
            spacing: 10,
        },
        theme6: {
            price_color: '#FF3830',
            name_color: '#666',
            // 主题6时不显示
            desc_color: '#333',
            // 主题6时不显示
            limit_send_count: '#999',
            // 主题6时不显示
            btn_background: [{ color: '#fff', color_percentage: '' }],
            btn_color: '#fff',
            background: [{ color: '#FF3830', color_percentage: '' }],
            spacing: 10,
        },
        theme7: {
            price_color: '#fff',
            name_color: '#fff',
            // 主题7时不显示
            desc_color: '#fff',
            // 主题7时不显示
            limit_send_count: '#999',
            // 主题7时不显示
            btn_background: [{ color: '#E1B47A', color_percentage: '' }],
            btn_color: '#fff',
            background: [
                { color: '#FF3830', color_percentage: '' },
                { color: '#E1B47A', color_percentage: '' },
            ],
            spacing: 10,
        },
    },
};
</script>
