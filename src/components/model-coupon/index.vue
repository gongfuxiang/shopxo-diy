<template>
    <div class="coupon-theme-container">
        <div class="re" :style="style_container">
            <div :style="style_img_container">
                <el-scrollbar class="hide-scrollbar">
                    <template v-if="theme == '1'">
                        <div class="coupon-theme-1">
                            <div v-for="(item, index) in data_list" :key="index" class="item">
                                <div class="coupon-theme-1-content tc" :style="'background-image: url(' + theme_bg_img.url_1 + ');background-size: 100% 100%;'">
                                    <div class="name text-line-1">{{ item.name }}</div>
                                    <div class="price">
                                        <span v-if="item.type == '0'" class="symbol">{{ currency_symbol }}</span>
                                        <span class="number">{{ item.discount_value }}</span>
                                        <span v-if="item.type == '1'" class="symbol">折</span>
                                    </div>
                                </div>
                                <div class="coupon-btn">立即领取</div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="theme == '2'">
                        <div class="coupon-theme-2">
                            <div v-for="(item, index) in data_list" :key="index" class="item" :style="'background-image: url(' + theme_bg_img.url_2 + ');background-size: 100% 100%;'">
                                <div class="tc">
                                    <div class="price">
                                        <span v-if="item.type == '0'" class="symbol">{{ currency_symbol }}</span>
                                        <span class="number">{{ item.discount_value }}</span>
                                        <span v-if="item.type == '1'" class="symbol">折</span>
                                    </div>
                                    <div class="name text-line-1">{{ item.name }}</div>
                                    <div class="desc text-line-1">{{ item.desc }}</div>
                                </div>
                                <div class="coupon-btn">立即领取</div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="theme == '3'">
                        <div class="coupon-theme-3">
                            <div v-for="(item, index) in data_list" :key="index" class="item">
                                <div class="left">
                                    <div class="price">
                                        <span v-if="item.type == '0'" class="symbol">{{ currency_symbol }}</span>
                                        <span class="number">{{ item.discount_value }}</span>
                                        <span v-if="item.type == '1'" class="symbol self-e">折</span>
                                    </div>
                                    <div class="text pl-3 pr-8">
                                        <div class="name text-line-1">{{ item.name }}</div>
                                        <div class="desc text-line-1">{{ item.use_limit_type_name }}</div>
                                        <div v-if="item.limit_send_count && item.limit_send_count > 0" class="limit text-line-1">(限领{{ item.limit_send_count }}张)</div>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="coupon-btn">
                                        <text>立即领取</text>
                                        <icon name="arrow-right-o" class="icon"></icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="theme == '4'">
                        <div class="coupon-theme-4">
                            <el-scrollbar class="hide-scrollbar">
                                <div class="left">
                                    <div v-for="(item, index) in data_list" :key="index" class="item">
                                        <div class="type">{{ item.type_name }}</div>
                                        <div class="price">
                                            <span v-if="item.type == '0'" class="symbol">{{ currency_symbol }}</span>
                                            <span class="number">{{ item.discount_value }}</span>
                                            <span v-if="item.type == '1'" class="symbol">折</span>
                                        </div>
                                        <div class="name text-line-1">{{ item.name }}</div>
                                    </div>
                                </div>
                            </el-scrollbar>
                            <div class="right">
                                <div class="re z-i flex-col jc-c align-c">
                                    <div class="title text-line-1">{{ content_title }}</div>
                                    <div class="desc text-line-1">{{ content_desc }}</div>
                                    <div class="coupon-btn">领取全部</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="theme == '5'">
                        <div class="coupon-theme-5">
                            <div v-for="(item, index) in data_list" :key="index" class="item">
                                <div class="left" :style="'background-image: url(' + theme_bg_img.url_3 + ');background-size: 100% 100%;'">
                                    <div class="price">
                                        <span v-if="item.type == '0'" class="symbol">{{ currency_symbol }}</span>
                                        <span class="number">{{ item.discount_value }}</span>
                                        <span v-if="item.type == '1'" class="symbol">折</span>
                                    </div>
                                    <div class="name text-line-1">{{ item.name }}</div>
                                </div>
                                <div class="right">
                                    <div class="coupon-btn">领取</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="theme == '6'">
                        <div class="coupon-theme-6">
                            <div v-for="(item, index) in data_list" :key="index" class="item">
                                <div class="top">
                                    <div class="price">
                                        <span v-if="item.type == '0'" class="symbol">{{ currency_symbol }}</span>
                                        <span class="number">{{ item.discount_value }}</span>
                                        <span v-if="item.type == '1'" class="symbol">折</span>
                                    </div>
                                    <div class="name text-line-1">{{ item.name }}</div>
                                </div>
                                <div class="bottom">
                                    <div class="coupon-btn">立即领取</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="theme == '7'">
                        <div class="coupon-theme-7">
                            <div v-for="(item, index) in data_list" :key="index" class="item">
                                <div class="left">
                                    <div class="price">
                                        <span v-if="item.type == '0'" class="symbol">{{ currency_symbol }}</span>
                                        <span class="number">{{ item.discount_value }}</span>
                                        <span v-if="item.type == '1'" class="symbol">折</span>
                                    </div>
                                    <div class="name text-line-1">{{ item.name }}</div>
                                </div>
                                <div class="right">
                                    <div class="coupon-btn">立即领取</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_img_computer, common_styles_computer, gradient_computer } from '@/utils';
import { isEmpty, cloneDeep } from 'lodash';
import CouponAPI from '@/api/coupon';
import { commonStore } from '@/store';
const common_store = commonStore();
const currency_symbol = common_store.common.config.currency_symbol;
/**
 * @description: 优惠券（渲染）
 * @param value{Object} 传过来的数据，用于数据渲染
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const form = computed(() => props.value?.content || {});
const new_style = computed(() => props.value?.style || {});
const data_list = ref<any[]>([]);

const default_list = {
    name: '满100减50',
    type: '0',
    discount_value: '30',
    desc: '指定商品可用',
    use_limit_type_name: '限领一张',
};
// 公共样式
const style_container = computed(() => {
    return common_styles_computer(new_style.value.common_style);
});
const style_img_container = computed(() => {
    return common_img_computer(new_style.value.common_style);
});
// 内容标题
const content_title = computed(() => {
    return form.value.title;
});
// 内容描述
const content_desc = computed(() => {
    return form.value.desc;
});

interface themeBgImg {
    url_1: string;
    url_2: string;
    url_3: string;
}
const theme_bg_img = ref<themeBgImg>({
    url_1: ``,
    url_2: ``,
    url_3: ``,
});
// 初始化数据
onMounted(() => {
    if (!isEmpty(form.value.data_list) && form.value.data_type == '0') {
        data_list.value = form.value.data_list.map((item: any) => ({
            ...item.data,
            name: !isEmpty(item.new_title) ? item.new_title : item.data.name,
            new_cover: item.new_cover,
        }));
    } else if (form.value.data_type == '1') {
        if (!isEmpty(form.value.data_auto_list)) {
            data_list.value = form.value.data_auto_list;
        } else {
            get_coupon();
        }
    } else {
        data_list.value = Array(4).fill(default_list);
    }
    theme_bg_img.value = {
        url_1: form.value.theme_1_static_img[0].url,
        url_2: form.value.theme_2_static_img[0].url,
        url_3: form.value.theme_5_static_img[0].url,
    };
});
// 获取优惠券列表
const get_coupon = () => {
    const { number, type, keywords, expire_type_ids, use_limit_type_ids, order_by_type, order_by_rule, is_repeat_receive } = form.value;
    const params = {
        coupon_number: number,
        coupon_type_ids: type.length > 0 ? type.join(',') : '',
        coupon_keywords: keywords,
        coupon_expire_type_ids: expire_type_ids.length > 0 ? expire_type_ids.join(',') : '',
        coupon_use_limit_type_ids: use_limit_type_ids.length > 0 ? use_limit_type_ids.join(',') : '',
        coupon_order_by_type: order_by_type,
        coupon_order_by_rule: order_by_rule,
        coupon_is_repeat_receive: is_repeat_receive,
    };
    // 获取商品列表
    CouponAPI.getCoupon(params).then((res: any) => {
        form.value.data_auto_list = res.data;
        if (!isEmpty(res.data)) {
            data_list.value = res.data;
        } else {
            data_list.value = Array(4).fill(default_list);
        }
    });
};
// 监听数据类型
const data_list_computer = computed(() => {
    const { data_type, type, number, data_list, keywords, expire_type_ids, use_limit_type_ids, order_by_type, order_by_rule, is_repeat_receive } = form.value;
    return { data_type, type, number, data_list, keywords, expire_type_ids, use_limit_type_ids, order_by_type, order_by_rule, is_repeat_receive };
});
// 监听数据类型变化
watch(
    () => data_list_computer.value,
    (new_value) => {
        if (new_value.data_type == '1') {
            get_coupon();
        } else {
            if (!isEmpty(form.value.data_list)) {
                data_list.value = form.value.data_list.map((item: any) => ({
                    ...item.data,
                    name: !isEmpty(item.new_title) ? item.new_title : item.data.name,
                    new_cover: item.new_cover,
                }));
            } else {
                data_list.value = Array(4).fill(default_list);
            }
        }
    },
    { deep: true }
);
// 主题
const theme = computed(() => props.value?.content?.theme);
// 主题样式
const theme_style = computed(() => {
    const new_background = gradient_computer({ color_list: props.value?.style?.background, direction: props.value?.style?.direction }, false);
    const new_background_inside = gradient_computer({ color_list: props.value?.style?.background_inside, direction: props.value?.style?.direction_inside }, false);
    const new_btn_background = gradient_computer({ color_list: props.value?.style?.btn_background, direction: props.value?.style?.btn_direction }, false);
    return {
        price_color: props.value?.style?.price_color,
        name_color: props.value?.style?.name_color,
        // 判断是否向对象添加desc_color属性
        ...(!['1', '5', '6', '7'].includes(theme.value) && { desc_color: props.value?.style?.desc_color }),
        ...(!['1', '2', '4', '5', '6', '7'].includes(theme.value) && { limit_send_count: props.value?.style?.limit_send_count }),
        ...(!['5', '6', '7'].includes(theme.value) && { btn_background: new_btn_background }),
        btn_color: props.value?.style?.btn_color,
        ...(!['2'].includes(theme.value) && { background: new_background }),
        ...(!['1', '2', '5', '7'].includes(theme.value) && { background_inside: new_background_inside }),
        spacing: props.value?.style?.spacing + 'px',
        ...(!['1', '2', '3', '5', '6', '7'].includes(theme.value) && { type_background: props.value?.style?.type_background }),
        ...(!['1', '2', '3', '5', '6', '7'].includes(theme.value) && { type_color: props.value?.style?.type_color }),
        ...(!['1', '2', '3', '5', '6', '7'].includes(theme.value) && { content_title_color: props.value?.style?.content_title_color }),
        ...(!['1', '2', '3', '5', '6', '7'].includes(theme.value) && { content_desc_color: props.value?.style?.content_desc_color }),
    };
});
// 主题3边框样式
const theme_3_border_style = computed(() => {
    return props.value?.style?.background[0].color;
});
// 主题7背景样式
const theme_7_background_style = computed(() => {
    if (props.value?.style?.common_style.color_list.length > 0) {
        return props.value?.style?.common_style.color_list[0].color;
    } else {
        return '#fff';
    }
});
</script>
<style lang="scss" scoped>
.coupon-theme-1 {
    display: flex;
    flex-direction: row;
    gap: v-bind('theme_style.spacing');
    .item {
        flex-basis: auto;
        flex-shrink: 0;
        background: v-bind('theme_style.background');
        width: 8.4rem;
        height: 8.4rem;
        border-radius: 1rem;
        margin-top: 1rem;
        .name {
            padding: 0.5rem 0.5rem 0 0.5rem;
            margin-bottom: 0.5rem;
            font-size: 1rem;
            color: v-bind('theme_style.name_color');
        }
        .price {
            color: v-bind('theme_style.price_color');
            padding: 0.5rem 0 0.8rem 0;
            .symbol {
                font-size: 1.2rem;
                position: relative;
                bottom: 0.3rem;
            }
            .number {
                font-size: 3rem;
                line-height: 2.4rem;
                font-weight: bold;
                padding: 0 0.4rem;
            }
        }
        .coupon-theme-1-content {
            width: calc(100% - 1rem);
            margin: 0 0.5rem;
            background-size: 100% 100%;
            position: relative;
            top: -1rem;
        }

        .coupon-btn {
            margin: 0 auto;
            width: 7.1rem;
            height: 1.756rem;
            line-height: 1.756rem;
            text-align: center;
            font-size: 0.9rem;
            color: v-bind('theme_style.btn_color');
            background: v-bind('theme_style.btn_background');
            border-radius: 2.3rem;
            position: relative;
            top: -0.5rem;
        }
    }
}
.coupon-theme-2 {
    display: flex;
    flex-direction: row;
    gap: v-bind('theme_style.spacing');
    .item {
        flex-basis: auto;
        flex-shrink: 0;
        background-size: 100% 100%;
        width: 8.5rem;
        height: 10rem;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price {
            color: v-bind('theme_style.price_color');
            padding: 0.3rem 0;
            .symbol {
                font-size: 0.8rem;
            }
            .number {
                font-size: 2.6rem;
                font-weight: bold;
                padding: 0 0.4rem;
            }
        }
        .name {
            font-size: 0.8rem;
            color: v-bind('theme_style.name_color');
            font-weight: bold;
            margin-bottom: 0.4rem;
        }
        .desc {
            font-size: 0.8rem;
            color: v-bind('theme_style.desc_color');
        }

        .coupon-btn {
            margin: 0 auto;
            width: 5.5rem;
            height: 1.6rem;
            line-height: 1.6rem;
            text-align: center;
            font-size: 0.9rem;
            color: v-bind('theme_style.btn_color');
            background: v-bind('theme_style.btn_background');
            border-radius: 2.3rem;
            margin-top: 0.5rem;
            margin-bottom: 0.2rem;
        }
    }
}
.coupon-theme-3 {
    display: flex;
    gap: v-bind('theme_style.spacing');
    .item {
        overflow: hidden;
        border-radius: 1.6rem;
        flex-basis: auto;
        flex-shrink: 0;
        background: v-bind('theme_style.background');
        width: 100%;
        padding: 0.8rem;
        display: flex;
        .left {
            flex: 1;
            width: 0;
            background: v-bind('theme_style.background_inside');
            border-radius: 0.8rem;
            padding: 0.6rem 1.2rem 0.3rem 1.2rem;
            display: flex;
            align-items: center;
            .price {
                text-align: center;
                width: 10rem;
                position: relative;
                display: flex;
                align-items: flex-start;
                color: v-bind('theme_style.price_color');
                &::before {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: -3rem;
                    bottom: -3rem;
                    width: 0.1rem;
                    height: calc(100% + 6rem);
                    border-left: 0.1rem dashed v-bind('theme_3_border_style');
                }
                .symbol {
                    font-size: 1.8rem;
                    font-weight: 600;
                }
                .number {
                    font-size: 3.2rem;
                    font-weight: 600;
                    padding: 0 0.4rem;
                    line-height: 3rem;
                }
            }
            .text {
                flex: 1;
                width: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                .name {
                    font-size: 1.8rem;
                    color: v-bind('theme_style.name_color');
                    font-weight: bold;
                    line-height: 2.5rem;
                }
                .desc {
                    font-size: 1.4rem;
                    font-weight: bold;
                    color: v-bind('theme_style.desc_color');
                    line-height: 2rem;
                }
                .limit {
                    color: v-bind('theme_style.limit_send_count');
                    font-size: 1.2rem;
                }
            }
        }
        .right {
            width: 8.6rem;
            position: relative;
            padding: 0 1.8rem;
            text-align: center;
            display: flex;
            align-items: center;
            &::before {
                content: '';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 200%;
                height: 200%;
                background: v-bind('theme_style.background');
                left: -1.6rem;
                border-radius: 100%;
            }
            .coupon-btn {
                color: v-bind('theme_style.btn_color');
                position: relative;
                font-size: 1.8rem;
                font-weight: bold;
                text-align: center;
                .icon {
                    font-size: 2rem;
                }
            }
        }
    }
}
.coupon-theme-4 {
    overflow: hidden;
    border-radius: 1.6rem;
    padding: 0.8rem;
    display: flex;
    background: v-bind('theme_style.background');
    .left {
        width: 21.4rem;
        display: flex;
        flex-direction: row;
        gap: v-bind('theme_style.spacing');
        .item {
            overflow: hidden;
            flex-basis: auto;
            flex-shrink: 0;
            width: 7.2rem;
            height: 7.2rem;
            background: v-bind('theme_style.background_inside');
            border-radius: 1rem;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            padding: 0.4rem;
            .type {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                background: v-bind('theme_style.type_background');
                color: v-bind('theme_style.type_color');
                font-size: 1rem;
                line-height: 1.4rem;
                &::before {
                    content: '';
                    position: absolute;
                    width: 1.5rem;
                    height: 3rem;
                    background: v-bind('theme_style.type_background');
                    left: -0.8rem;
                    border-radius: 100%;
                    top: -1.6rem;
                    z-index: -1;
                }
                &::after {
                    content: '';
                    position: absolute;
                    width: 1.5rem;
                    height: 3rem;
                    background: v-bind('theme_style.type_background');
                    right: -0.8rem;
                    border-radius: 100%;
                    top: -1.6rem;
                    z-index: -1;
                }
            }
            .price {
                text-align: center;
                position: relative;
                display: flex;
                align-items: flex-end;
                color: v-bind('theme_style.price_color');
                .symbol {
                    font-size: 1.2rem;
                }
                .number {
                    font-size: 2.4rem;
                    line-height: 2.4rem;
                    font-weight: 600;
                    padding-left: 0.4rem;
                }
            }
            .name {
                font-size: 1.1rem;
                color: v-bind('theme_style.name_color');
                line-height: 1.6rem;
            }
        }
    }
    .right {
        flex: 1;
        width: 0;
        position: relative;
        &::before {
            content: '';
            width: 18rem;
            height: 18rem;
            position: absolute;
            left: -0.7rem;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 100%;
            background: v-bind('theme_style.background');
        }
        .title {
            font-size: 1.6rem;
            font-weight: bold;
            color: v-bind('theme_style.content_title_color');
            line-height: 2.2rem;
        }
        .desc {
            margin-top: 0.3rem;
            font-size: 1.2rem;
            line-height: 1.7rem;
            color: v-bind('theme_style.content_desc_color');
        }
        .coupon-btn {
            width: 7.2rem;
            height: 2.2rem;
            font-size: 1.2rem;
            line-height: 2.2rem;
            background: v-bind('theme_style.btn_background');
            color: v-bind('theme_style.btn_color');
            text-align: center;
            border-radius: 1.2rem;
            margin-top: 0.6rem;
        }
    }
}
.coupon-theme-5 {
    display: flex;
    flex-direction: row;
    gap: v-bind('theme_style.spacing');
    .item {
        flex-basis: auto;
        flex-shrink: 0;
        border-radius: 0.6rem;
        width: 12.6rem;
        height: 6.4rem;
        position: relative;
        .left {
            position: absolute;
            left: 0;
            width: 10rem;
            height: 100%;
            padding: 0.6rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1;
            .price {
                text-align: center;
                position: relative;
                display: flex;
                align-items: end;
                color: v-bind('theme_style.price_color');
                margin-bottom: 0.5rem;
                .symbol {
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                .number {
                    font-size: 2.4rem;
                    font-weight: bold;
                    line-height: 20px;
                    padding-left: 0.4rem;
                }
            }
            .name {
                font-size: 1.2rem;
                color: v-bind('theme_style.name_color');
            }
        }
        .right {
            width: 4.6rem;
            padding-left: 2rem;
            border-radius: 0.6rem;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            height: 100%;
            background: v-bind('theme_style.background');
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            .coupon-btn {
                color: v-bind('theme_style.btn_color');
                position: relative;
                font-size: 1.2rem;
                font-weight: bold;
                text-align: center;
                letter-spacing: 0.2rem;
            }
        }
    }
}
.coupon-theme-6 {
    display: flex;
    gap: v-bind('theme_style.spacing');
    .item {
        flex-basis: auto;
        flex-shrink: 0;
        border-radius: 1.2rem;
        padding: 0.6rem;
        width: 13.4rem;
        height: 9.4rem;
        position: relative;
        background: v-bind('theme_style.background');
        .top {
            width: 100%;
            padding: 0.4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1;
            background: v-bind('theme_style.background_inside');
            border-radius: 0.6rem;
            position: relative;
            overflow: hidden;
            &::before {
                content: '';
                position: absolute;
                left: -0.7rem;
                top: 50%;
                transform: translateY(-50%);
                width: 1.4rem;
                height: 1.4rem;
                background: v-bind('theme_style.background');
                border-radius: 50%;
            }
            &::after {
                content: '';
                position: absolute;
                right: -0.7rem;
                top: 50%;
                transform: translateY(-50%);
                width: 1.4rem;
                height: 1.4rem;
                background: v-bind('theme_style.background');
                border-radius: 50%;
            }
            .price {
                text-align: center;
                position: relative;
                display: flex;
                align-items: end;
                color: v-bind('theme_style.price_color');
                margin-bottom: 0.1rem;
                .symbol {
                    font-size: 2rem;
                    font-weight: bold;
                }
                .number {
                    font-size: 3.2rem;
                    font-weight: bold;
                    line-height: 3.2rem;
                    padding-left: 0.4rem;
                }
            }
            .name {
                font-size: 1.2rem;
                color: v-bind('theme_style.name_color');
            }
        }
        .bottom {
            margin-top: 0.4rem;
            text-align: center;
            .coupon-btn {
                color: v-bind('theme_style.btn_color');
                position: relative;
                font-size: 1.4rem;
                line-height: 2.2rem;
                font-weight: bold;
                text-align: center;
            }
        }
    }
}
.coupon-theme-7 {
    display: flex;
    gap: v-bind('theme_style.spacing');
    .item {
        flex-basis: auto;
        flex-shrink: 0;
        border-radius: 0.4rem;
        width: 11.8rem;
        height: 6.4rem;
        position: relative;
        background: v-bind('theme_style.background');
        overflow: hidden;
        display: flex;
        &::before {
            content: '';
            position: absolute;
            left: 8rem;
            top: -0.6rem;
            width: 1.2rem;
            height: 1.2rem;
            background-color: v-bind(theme_7_background_style);
            border-radius: 50%;
        }
        &::after {
            content: '';
            position: absolute;
            left: 8rem;
            bottom: -0.6rem;
            width: 1.2rem;
            height: 1.2rem;
            background-color: v-bind(theme_7_background_style);
            border-radius: 50%;
        }
        .left {
            width: 8.6rem;
            padding: 0.4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            .price {
                text-align: center;
                position: relative;
                display: flex;
                align-items: end;
                color: v-bind('theme_style.price_color');
                margin-bottom: 0.5rem;
                .symbol {
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                .number {
                    font-size: 2.4rem;
                    font-weight: bold;
                    line-height: 2rem;
                    padding-left: 0.4rem;
                }
            }
            .name {
                font-size: 1.2rem;
                color: v-bind('theme_style.name_color');
            }
        }
        .right {
            flex: 1;
            width: 0;
            padding-left: 0.7rem;
            position: relative;
            &::before {
                content: '';
                position: absolute;
                left: -0.05rem;
                top: 0;
                bottom: 0;
                width: 0;
                height: 100%;
                border: 0.1rem dashed v-bind(theme_7_background_style);
                opacity: 0.61;
            }
            .coupon-btn {
                padding: 0.4rem;
                width: 100%;
                color: v-bind('theme_style.btn_color');
                font-size: 1rem;
                font-weight: bold;
                text-align: center;
                letter-spacing: 0.2rem;
                height: 100%;
                display: flex;
                align-items: center;
            }
        }
    }
}
.hide-scrollbar {
    :deep(.el-scrollbar__bar) {
        display: none !important;
    }
}
</style>
