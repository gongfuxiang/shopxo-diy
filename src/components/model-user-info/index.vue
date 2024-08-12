<template>
    <div :style="style_container">
        <div class="re pa-20" :style="style">
            <div class="flex-row jc-sb align-c mb-20">
                <div class="flex-1 flex-row align-c gap-12">
                    <img class="round" src="@/assets/images/components/model-user-info/avatar.png" :width="base_data.user_avatar_size" :height="base_data.user_avatar_size" />
                    <div class="flex-col gap-8">
                        <div class="size-16 fw" :style="user_name_style">拓拔</div>
                        <div v-if="id_bool" class="plr-6 ptb-1 radius-sm" :style="user_id_style">ID:32156743</div>
                    </div>
                </div>
                <div class="flex-row align-c" :class="'gap-' + base_data.img_space">
                    <img v-for="(item, index) in icon_setting" :key="index" class="round" :src="item.src[0]?.url" :width="base_data.img_size" :height="base_data.img_size" />
                </div>
            </div>
            <div class="flex-row jc-sa align-c">
                <template v-for="(item, index) in stats_list" :key="index">
                    <div v-if="user_info.includes(item.id)" class="tc">
                        <div class="size-16 fw mb-6" :style="stats_number_style">{{ item.value }}</div>
                        <div class="size-12" :style="stats_name_style">{{ item.name }}</div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, gradient_computer } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const style = ref('');
const style_container = ref('');
const id_bool = ref(true);
const stats_list = reactive([
    { id: '1', name: '订单总数', value: '15' },
    { id: '2', name: '商品收藏', value: '3' },
    { id: '3', name: '我的足迹', value: '8' },
    { id: '4', name: '我的积分', value: '310' },
]);
interface icon_params {
    id: string;
    src: uploadList[];
    href: string;
}
const user_info = ref<string[]>(['1', '2', '3', '4']);
const icon_setting = ref<icon_params[]>([
    { id: '1', src: [], href: 'a' },
    { id: '2', src: [], href: 'a' },
]);
const base_data = reactive({
    // 头像大小
    user_avatar_size: '60',
    // 用户名颜色
    user_name_color: 'rgba(0, 0, 0, 1)',
    // 用户名样式
    user_name_weight: '500',
    // 用户名字号
    user_name_size: 16,
    // 用户ID颜色
    user_id_color_list: ['rgba(254, 184, 143, 1)', 'rgba(255, 227, 220, 1)'],
    // 用户ID颜色
    user_id_color: 'rgba(0, 0, 0, 1)',
    // 用户ID方向
    user_id_direction: '90deg',
    // 用户ID样式
    user_id_weight: '400',
    // 用户ID字号
    user_id_size: 10,
    // 图片大小
    img_size: '23',
    // 图片间距
    img_space: '25',
    // 统计名称颜色
    stats_name_color: 'rgba(0, 0, 0, 1)',
    // 统计名称样式
    stats_name_weight: '400',
    // 统计名称字号
    stats_name_size: 12,
    // 统计数字颜色
    stats_number_color: 'rgba(0, 0, 0, 1)',
    // 统计数字样式
    stats_number_weight: '500',
    // 统计数字字号
    stats_number_size: 16,
});
// 样式
const user_name_style = ref('');
const user_id_style = ref('');
const stats_name_style = ref('');
const stats_number_style = ref('');
watch(
    props.value,
    (newVal, oldValue) => {
        const content = newVal?.content;
        const new_style = newVal?.style;
        if (content) {
            user_info.value = content?.user_info;
            icon_setting.value = content?.icon_setting;
            id_bool.value = user_info.value ? user_info.value.includes('5') : true;
        }
        if (new_style) {
            // 头像
            base_data.user_avatar_size = new_style.user_avatar_size;
            // 人物
            base_data.user_name_color = new_style.user_name_color;
            base_data.user_name_weight = new_style.user_name_weight;
            base_data.user_name_size = new_style.user_name_size;
            // id
            base_data.user_id_color_list = new_style.user_id_color_list;
            base_data.user_id_color = new_style.user_id_color;
            base_data.user_id_direction = new_style.user_id_direction;
            base_data.user_id_weight = new_style.user_id_weight;
            base_data.user_id_size = new_style.user_id_size;
            // 图标设置
            base_data.img_size = new_style.img_size;
            base_data.img_space = new_style.img_space;
            base_data.stats_name_color = new_style.stats_name_color;
            base_data.stats_name_weight = new_style.stats_name_weight;
            base_data.stats_name_size = new_style.stats_name_size;
            base_data.stats_number_color = new_style.stats_number_color;
            base_data.stats_number_weight = new_style.stats_number_weight;
            base_data.stats_number_size = new_style.stats_number_size;

            style_container.value += common_styles_computer(new_style.common_style);
        }
        // 人物名称样式
        user_name_style.value = 'color:' + base_data.user_name_color + ';' + 'font-size:' + base_data.user_name_size + 'px;' + 'font-weight:' + base_data.user_name_weight + ';';

        // id样式
        const new_gradient_obj = {
            color_list: base_data.user_id_color_list,
            direction: base_data.user_id_direction,
        };
        user_id_style.value = gradient_computer(new_gradient_obj) + 'color:' + base_data.user_id_color + ';' + 'font-size:' + base_data.user_id_size + 'px;' + 'font-weight:' + base_data.user_id_weight + ';';

        // 统计名称样式
        stats_name_style.value = 'color:' + base_data.stats_name_color + ';' + 'font-size:' + base_data.stats_name_size + 'px;' + 'font-weight:' + base_data.stats_name_weight + ';';
        stats_number_style.value = 'color:' + base_data.stats_number_color + ';' + 'font-size:' + base_data.stats_number_size + 'px;' + 'font-weight:' + base_data.stats_number_weight + ';';
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped>
.video {
    height: 22rem;
}
</style>
