<template>
    <div :style="style">
        <div :style="style_img_container">
            <div class="flex-col gap-10">
                <div v-if="form.head_state == '1'" class="oh" :style="seckill_head_style">
                    <div class="seckill-head flex-row align-c jc-sb oh" :style="seckill_head_img_style">
                        <div :class="['flex-row align-c', { 'gap-10': form.theme != '1', 'jc-sb w': form.theme == '2' }]">
                            <div class="seckill-title">
                                <image-empty v-if="form.title_type == 'image'" v-model="form.title_src[0]" error-img-style="width:2.1rem; height: 1rem;"></image-empty>
                                <span v-else :style="`color: ${new_style.title_color};font-size: ${new_style.title_size}px;line-height:21px;font-weight:600;`">{{ form.title_text }}</span>
                            </div>
                            <div v-if="form.theme == '1'" class="pl-6 pr-6 cr-f">|</div>
                            <div v-if="intervalId != undefined" class="flex-row align-c gap-4">
                                <span class="size-10" :style="`color: ${new_style.end_text_color}`">{{ seckill_time.time_first_text }}</span>
                                <div class="flex-row gap-3 jc-c align-c" :style="[form.theme == '4' ? `${time_bg};padding: 0.3rem 0.4rem;border-radius: 1.1rem;` : '']">
                                    <img v-if="form.theme == '4'" class="seckill-head-icon radius-xs" :src="form.theme_4_static_img[0].url" />
                                    <template v-for="(item, index) in time_config" :key="item.key">
                                        <template v-if="form.theme == '4'">
                                            <div class="size-12" :style="`color: ${new_style.countdown_color}`">{{ item.value }}</div>
                                            <span v-if="[0, 1].includes(index)" class="colon" :style="`color: ${new_style.countdown_color}`">:</span>
                                        </template>
                                        <template v-else>
                                            <div class="time-config size-12" :style="`${time_bg};color: ${new_style.countdown_color}`">{{ item.value }}</div>
                                            <span v-if="[0, 1].includes(index)" class="colon" :style="icon_time_check()">:</span>
                                        </template>
                                    </template>
                                </div>
                            </div>
                            <div v-else class="flex-row align-c gap-4">
                                <span class="size-10" :style="`color: ${new_style.end_text_color}`">已结束</span>
                            </div>
                        </div>
                        <div v-if="form.button_status == '1'" class="flex-row align-c" :style="`color: ${new_style.head_button_color}`">
                            <span :style="`font-size: ${new_style.head_button_size}px;`">{{ form.button_text }}</span>
                            <el-icon class="iconfont icon-arrow-right" :color="new_style.head_button_color"></el-icon>
                        </div>
                    </div>
                </div>
                <template v-if="form.shop_style_type != '3'">
                    <div class="flex flex-wrap" :style="`gap: ${content_outer_spacing}px;`">
                        <div v-for="(item, index) in list" :key="index" :class="layout_type" :style="layout_style">
                            <div :class="['oh w h', ['1'].includes(shop_style_type) ? 'flex-row' : 'flex-col' ]" :style="layout_img_style">
                                <template v-if="!isEmpty(item)">
                                    <div class="oh re" :class="`flex-img${shop_style_type}`">
                                        <template v-if="!isEmpty(item.new_cover)">
                                            <image-empty v-model="item.new_cover[0]" :class="`flex-img${shop_style_type}`" :style="content_img_radius"></image-empty>
                                        </template>
                                        <template v-else>
                                            <image-empty v-model="item.images" :class="`flex-img${shop_style_type}`" :style="content_img_radius"></image-empty>
                                        </template>
                                        <div v-if="form.seckill_subscript_show == '1'" class="size-12 nowrap corner-marker" :style="corner_marker">
                                            <span class="text-line-1">{{ form.subscript_text }}</span>
                                        </div>
                                    </div>
                                </template>
                                <div v-if="is_show('title') || is_show('simple_desc') || is_show('price') || is_show('original_price') || form.is_shop_show == '1'" class="flex-col gap-10 w flex-1 jc-sb oh" :style="content_style">
                                    <div class="flex-col gap-10 w">
                                        <!-- 标题 -->
                                        <div v-if="is_show('title') || is_show('simple_desc')" class="flex-col" :style="`gap: ${ new_style.title_simple_desc_spacing }px;`">
                                            <div v-if="is_show('title')" :style="trends_config('title', 'title')" class="text-line-2">{{ item.title }}</div>
                                            <div v-if="is_show('simple_desc')" class="text-line-1" :style="trends_config('simple_desc', 'desc')">{{ item.simple_desc }}</div>
                                        </div>
                                        <!-- 进度条 -->
                                        <!-- <div v-if="form.shop_style_type == '1'" class="flex-row align-c gap-6">
                                            <div class="re flex-1">
                                                <div class="slide-bottom" :style="`background: ${new_style.progress_bg_color}`"></div>
                                                <div class="slide-top" :style="` width: 51%; ${slide_active_color}`">
                                                    <div class="slide-top-icon round" :style="`background: ${new_style.progress_button_color}`"><icon name="a-miaosha" :color="new_style.progress_button_icon_color" size="9"></icon></div>
                                                </div>
                                            </div>
                                            <span class="size-10" :style="`color: ${new_style.progress_text_color}`">已抢51%</span>
                                        </div> -->
                                    </div>
                                    <div class="flex-row align-e gap-10 jc-sb">
                                        <div class="flex-col gap-5">
                                            <div v-if="is_show('price') && (!isEmpty(item.min_price) || typeof item.min_price == 'number')" class="num" :style="`color: ${new_style.shop_price_color}`">
                                                <span v-if="form.shop_style_type == '1'" class="size-10 pr-4">秒杀价</span>
                                                <span class="identifying">{{ item.show_price_symbol }}</span
                                                ><span :style="trends_config('price')">{{ item.min_price }}</span>
                                                <span v-if="is_show('price_unit')" class="identifying">{{ item.show_price_unit }}</span>
                                            </div>
                                            <div v-if="is_show('original_price') && (!isEmpty(item.min_original_price) || typeof item.min_original_price == 'number')" class="size-11 flex" :style="`color: ${new_style.original_price_color}`">
                                                <span class="original-price text-line-1 flex-1"
                                                    >{{ item.show_original_price_symbol }}{{ item.min_original_price }}
                                                    <template v-if="is_show('original_price_unit')">
                                                        {{ item.show_original_price_unit }}
                                                    </template>
                                                </span>
                                            </div>
                                        </div>
                                        <div v-if="form.is_shop_show == '1'">
                                            <template v-if="form.shop_type == 'text'">
                                                <div class="plr-11 ptb-3 round cr-f" :style="trends_config('button', 'gradient') + `color: ${new_style.shop_button_text_color};`">{{ form.shop_button_text }}</div>
                                            </template>
                                            <template v-else>
                                                <icon class="round plr-6 ptb-5" :name="!isEmpty(form.shop_button_icon_class) ? form.shop_button_icon_class : 'cart'" :color="new_style.shop_icon_color" :size="new_style.shop_icon_size + ''" :styles="button_gradient()"></icon>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <swiper :key="carouselKey" class="w flex" direction="horizontal" :loop="true" :autoplay="autoplay" :slides-per-view="form.carousel_col" :slides-per-group="slides_per_group" :allow-touch-move="false" :space-between="content_outer_spacing" :pause-on-mouse-enter="true" :modules="modules">
                        <swiper-slide v-for="(item, index) in list" :key="index" :class="layout_type" :style="layout_style">
                            <div :class="['oh w h', ['1'].includes(shop_style_type) ? 'flex-row' : 'flex-col' ]" :style="layout_img_style">
                                <template v-if="!isEmpty(item)">
                                    <div class="oh re w h">
                                        <template v-if="!isEmpty(item.new_cover)">
                                            <image-empty v-model="item.new_cover[0]" :class="`flex-img${shop_style_type}`" :style="content_img_radius"></image-empty>
                                        </template>
                                        <template v-else>
                                            <image-empty v-model="item.images" :class="`flex-img${shop_style_type}`" :style="content_img_radius"></image-empty>
                                        </template>
                                        <div v-if="form.seckill_subscript_show == '1'" class="size-12 nowrap corner-marker" :style="corner_marker">
                                            <span class="text-line-1">{{ form.subscript_text }}</span>
                                        </div>
                                    </div>
                                </template>
                                <div v-if="is_show('title') || is_show('simple_desc') || is_show('price') || is_show('original_price') || form.is_shop_show == '1'" class="flex-col gap-10 w flex-1 jc-sb" :style="content_style">
                                    <div class="flex-col gap-10 w">
                                        <!-- 标题 -->
                                        <div v-if="is_show('title') || is_show('simple_desc')" class="flex-col" :style="`gap: ${ new_style.title_simple_desc_spacing }px;`">
                                            <div v-if="is_show('title')" :style="trends_config('title', 'title')" class="text-line-2">{{ item.title }}</div>
                                            <div v-if="is_show('simple_desc')" class="text-line-1" :style="trends_config('simple_desc', 'desc')">{{ item.simple_desc }}</div>
                                        </div>
                                        <!-- 进度条 -->
                                        <div v-if="form.shop_style_type == '1'" class="flex-row align-c gap-6">
                                            <div class="re flex-1">
                                                <div class="slide-bottom" :style="`background: ${new_style.progress_bg_color}`"></div>
                                                <div class="slide-top" :style="` width: 51%; ${slide_active_color}`">
                                                    <div class="slide-top-icon round" :style="`background: ${new_style.progress_button_color}`"><icon name="a-miaosha" :color="new_style.progress_button_icon_color" size="9"></icon></div>
                                                </div>
                                            </div>
                                            <span class="size-10" :style="`color: ${new_style.progress_text_color}`">已抢51%</span>
                                        </div>
                                    </div>
                                    <div class="flex-row align-e gap-10 jc-sb">
                                        <div class="flex-col gap-5">
                                            <div v-if="is_show('price') && (!isEmpty(item.min_price) || typeof item.min_price == 'number')" class="num" :style="`color: ${new_style.shop_price_color}`">
                                                <span v-if="form.shop_style_type == '1'" class="size-10 pr-4">秒杀价</span>
                                                <span class="identifying">{{ item.show_price_symbol }}</span
                                                ><span :style="trends_config('price')">{{ item.min_price }}</span>
                                                <span v-if="is_show('price_unit')" class="identifying">{{ item.show_price_unit }}</span>
                                            </div>
                                            <div v-if="is_show('original_price') && (!isEmpty(item.min_original_price) || typeof item.min_original_price == 'number')" class="size-11 flex" :style="`color: ${new_style.original_price_color}`">
                                                <span class="original-price text-line-1 flex-1"
                                                    >{{ item.show_original_price_symbol }}{{ item.min_original_price }}
                                                    <template v-if="is_show('original_price_unit')">
                                                        {{ item.show_original_price_unit }}
                                                    </template>
                                                </span>
                                            </div>
                                        </div>
                                        <div v-if="form.is_shop_show == '1'">
                                            <template v-if="form.shop_type == 'text'">
                                                <div class="plr-11 ptb-3 round cr-f" :style="trends_config('button', 'gradient') + `color: ${new_style.shop_button_text_color};`">{{ form.shop_button_text }}</div>
                                            </template>
                                            <template v-else>
                                                <icon class="round plr-6 ptb-5" :name="!isEmpty(form.shop_button_icon_class) ? form.shop_button_icon_class : 'cart'" :color="new_style.shop_icon_color" :size="new_style.shop_icon_size + ''" :styles="button_gradient()"></icon>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, common_styles_computer, get_math, gradient_computer, gradient_handle, padding_computer, radius_computer, common_img_computer } from '@/utils';
import { isEmpty, throttle } from 'lodash';
import SeckillAPI from '@/api/seckill';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
const modules = [Autoplay];

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
const time_bg = computed(() => {
    const { countdown_bg_color_list, countdown_direction } = new_style.value;
    // 渐变
    const gradient = { color_list: countdown_bg_color_list, direction: countdown_direction };
    return gradient_computer(gradient);
});
// icon的渐变色处理
const icon_time_check = () => {
    return `${time_bg.value};line-height: 1;background-clip: text;-webkit-background-clip: text;-webkit-text-fill-color: transparent;`;
};

const slide_active_color = computed(() => {
    const { progress_actived_color_list, progress_actived_direction } = new_style.value;
    // 渐变
    const gradient = { color_list: progress_actived_color_list, direction: progress_actived_direction };
    return gradient_computer(gradient);
});

const seckill_head_style = computed(() => {
    let style = ``;
    const { header_background_color_list, header_background_direction } = new_style.value;
    // 渐变
    const gradient = { color_list: header_background_color_list, direction: header_background_direction };
    style += gradient_computer(gradient);
    return style;
});

const seckill_head_img_style = computed(() => {
    let style = ``;
    const { header_background_img, header_background_img_style, seckill_head_padding } = new_style.value;
    // 背景图
    const back = { background_img: header_background_img, background_img_style: header_background_img_style };
    // 秒杀头部内间距设置， 没有的时候默认15px
    const padding = !isEmpty(seckill_head_padding) ? seckill_head_padding : { padding: 0, padding_top: 15, padding_bottom: 15, padding_left: 13, padding_right: 13};
    style += background_computer(back) + padding_computer(padding);
    return style;
});

const style = computed(() => common_styles_computer(props.value.style.common_style));
const style_img_container = computed(() => common_img_computer(props.value.style.common_style));
interface plugins_icon_data {
    name: string;
    bg_color: string;
    br_color: string;
    color: string;
    url: string;
}
interface data_list {
    title: string;
    images: string;
    new_cover: string[];
    min_original_price: string;
    show_original_price_symbol: string;
    show_original_price_unit: string;
    simple_desc: string;
    min_price: string;
    show_price_symbol: string;
    show_price_unit: string;
    sales_count: string;
    plugins_view_icon_data: plugins_icon_data[];
}
const default_list = {
    title: '测试商品标题',
    min_original_price: '41.2',
    show_original_price_symbol: '￥',
    show_original_price_unit: '/ 台',
    min_price: '51',
    show_price_symbol: '￥',
    show_price_unit: '/ 台',
    sales_count: '1000',
    images: '',
    new_cover: [],
    plugins_view_icon_data: [
        {
            name: '满减活动',
            bg_color: '#EA3323',
            br_color: '',
            color: '#fff',
            url: '',
        },
        {
            name: '包邮',
            bg_color: '',
            br_color: '#EA3323',
            color: '#EA3323',
            url: '',
        },
        {
            name: '领劵',
            bg_color: '',
            br_color: '#EA9223',
            color: '#EA9223',
            url: '',
        },
    ],
};
const list = ref<data_list[]>([]);
// 显示时间
const time_config = reactive([
    { key: 'hour', value: '00' },
    { key: 'minute', value: '00' },
    { key: 'second', value: '00' },
]);
// 定时任务器
const intervalId = ref<any>(undefined);
// 数据存放，用于倒计时
const seckill_time = ref({
    endTime: '2024-09-04 18:51:00',
    startTime: '2024-09-04 18:51:00',
    status: 0,
    time_first_text: '距结束',
});
// 倒计时执行的方法
const updateCountdown = () => {
    const now = new Date();
    let endTime = seckill_time.value.endTime;
    if (seckill_time.value.status === 0) {
        endTime = seckill_time.value.startTime;
    }
    const distance = new Date(endTime).getTime() - now.getTime();
    // 如果倒计时结束，显示结束信息
    if (distance <= 1000) {
        clearInterval(intervalId.value);
        // 如果是待开始状态，则显示开始倒计时，并且在结束的时候根据结束时候再执行一个定时器
        if (seckill_time.value.status === 0) {
            seckill_time.value.status = 1;
            seckill_time.value.time_first_text = '距结束';
            // 先执行一次倒计时，后续的等待倒计时执行
            setTimeout(() => {
                updateCountdown();
            }, 0);
            intervalId.value = setInterval(updateCountdown, 1000);
        }
        return;
    }
    // 计算时间
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    time_config.forEach((item) => {
        if (item.key == 'hour') {
            item.value = hours < 10 ? '0' + hours : hours.toString();
        } else if (item.key == 'minute') {
            item.value = minutes < 10 ? '0' + minutes : minutes.toString();
        } else if (item.key == 'second') {
            item.value = seconds < 10 ? '0' + seconds : seconds.toString();
        }
    });
};
// 更新倒计时函数
onBeforeMount(() => {
    SeckillAPI.getSeckillList({}).then((res: any) => {
        const data = res.data;
        if (!isEmpty(data.current)) {
            if (!isEmpty(data.current.goods)) {
                list.value = data.current.goods;
            } else {
                list.value = Array(4).fill(default_list);
            }
            const { status, time_first_text } = data.current.time;
            seckill_time.value = {
                endTime: data.current.time_end,
                startTime: data.current.time_start,
                status: status,
                time_first_text: time_first_text,
            };
            // 先执行一次倒计时，后续的等待倒计时执行
            setTimeout(() => {
                updateCountdown();
            }, 0);
            intervalId.value = setInterval(updateCountdown, 1000);
        } else {
            list.value = Array(4).fill(default_list);
        }
    });
});
// 组件销毁时，清除定时器
onUnmounted(() => {
    clearInterval(intervalId.value);
})
// 商品间距
const content_outer_spacing = computed(() => new_style.value.content_outer_spacing);
// 圆角设置
const content_radius = computed(() => radius_computer(new_style.value.shop_radius));
// 选择的风格
const shop_style_type = computed(() => form.value.shop_style_type);
// 内边距设置
const content_padding = computed(() => padding_computer(new_style.value.shop_padding));
// 内容区域的样式
const content_style = computed(() => {
    const spacing_value = new_style.value.content_spacing;
    let spacing = '';
    if (shop_style_type.value == '1') {
        spacing = `margin-left: ${spacing_value}px;`;
    } else {
        spacing = content_padding.value;
    }
    return `${spacing}`;
});
// 不同风格下的样式
const layout_type = computed(() => {
    let class_type = '';
    switch (shop_style_type.value) {
        case '1':
            class_type = `oh multicolumn-columns`;
            break;
        case '2':
            class_type = `multicolumn-columns`;
            break;
        case '3':
            class_type = `roll-columns`;
            break;
        default:
            break;
    }
    return class_type;
});
// 容器样式
const layout_style = computed(() => {
    const radius = content_radius.value;
    const gradient = gradient_handle(new_style.value.shop_color_list, new_style.value.shop_direction);
    return `${radius} ${ gradient }`;
});
// 容器图片样式
const layout_img_style = computed(() => {
    const padding = ['1'].includes(shop_style_type.value) ? content_padding.value : '';
    const data = {
        background_img_style: new_style.value.shop_background_img_style,
        background_img: new_style.value.shop_background_img,
    }
    return padding + background_computer(data);
});
const shop_style_type_list= [
    { name: '单列', value: '1', width: 110, height: 120 },
    { name: '双列', value: '2', width: 180, height: 180 },
    { name: '横向滑动', value: '3', width: 0, height: 0 },
];
// 宽度和高度为空的时候，修改默认值
const goods_img_width = computed(() => {
    if (typeof new_style.value.content_img_width == 'number') {
        return new_style.value.content_img_width + 'px';
    } else {
        const list = shop_style_type_list.filter(item => item.value == form.value.theme);
        if (list.length > 0) {
            return list[0].width + 'px';
        } else {
            return 'auto';
        }
    }
});
// 宽度和高度为空的时候，修改默认值
const goods_img_height = computed(() => {
    if (typeof new_style.value.content_img_height == 'number') {
        return new_style.value.content_img_height + 'px';
    } else {
        const list = shop_style_type_list.filter(item => item.value == form.value.theme);
        if (list.length > 0) {
            return list[0].height + 'px';
        } else {
            return 'auto';
        }
    }
});
// 根据传递的参数，从对象中取值
const trends_config = (key: string, type?: string) => {
    return style_config(new_style.value[`shop_${key}_typeface`], new_style.value[`shop_${key}_size`], new_style.value[`shop_${key}_color`], type);
};
// 根据传递的值，显示不同的内容
const style_config = (typeface: string, size: number, color: string | object, type?: string) => {
    let style = `font-weight:${typeface}; font-size: ${size}px;`;
    if (type == 'gradient') {
        style += button_gradient();
    } else if (type == 'title') {
        style += `line-height: ${size > 0 ? size + 3 : 0}px;height: ${size > 0 ? (size + 3) * 2 : 0}px;color: ${color};`;
    } else if (type == 'desc') {
        style += `line-height: ${size}px;height: ${size}px;color: ${color};`;
    } else {
        style += `color: ${color};`;
    }
    return style;
};
// 按钮渐变色处理
const button_gradient = () => {
    return gradient_handle(new_style.value.shop_button_color, '180deg');
};
// 不换行显示
const multicolumn_columns_width = computed(() => {
    const { carousel_col } = toRefs(form.value);
    let model_number = carousel_col.value;
    if (shop_style_type.value == '1') {
        model_number = 1;
    } else if (shop_style_type.value == '2') {
        model_number = 2;
    }
    // 计算间隔的空间。(gap * gap数量) / 模块数量
    let gap = (new_style.value.content_outer_spacing * (model_number - 1)) / model_number;
    return `calc(${100 / model_number}% - ${gap}px)`;
});
// 判断是否显示对应的内容
const is_show = (index: string) => {
    return form.value.is_show.includes(index);
};
// 轮播图key值
const carouselKey = ref('0');
const autoplay = ref<boolean | object>(false);
const slides_per_group = ref(1);
// 内容参数的集合
watchEffect(() => {
    // 是否滚动
    if (new_style.value.is_roll == '1') {
        autoplay.value = {
            delay: (new_style.value.interval_time || 2) * 1000,
            pauseOnMouseEnter: true,
        };
    } else {
        autoplay.value = false;
    }
    // 判断是平移还是整屏滚动
    slides_per_group.value = new_style.value.rolling_fashion == 'translation' ? 1 : form.value.carousel_col;
    // 更新轮播图的key，确保更换时能重新更新轮播图
    carouselKey.value = get_math();
});

//容器高度
const multicolumn_columns_height = computed(() => new_style.value.content_outer_height + 'px');
// 图片圆角设置
const content_img_radius = computed(() => radius_computer(new_style.value.shop_img_radius));

// 左上角，右上角，右下角，左下角
const corner_marker = computed(() => {
    const { seckill_subscript_location, shop_img_radius, seckill_subscript_bg_color, seckill_subscript_text_color } = new_style.value;
    let location = `background: ${seckill_subscript_bg_color};color: ${seckill_subscript_text_color};`;
    // 圆角根据图片的圆角来计算 对角线是同样的圆角
    if (seckill_subscript_location == 'top-left') {
        location += `top: 0;left: 0;border-radius: ${shop_img_radius.radius_top_left}px 0 ${shop_img_radius.radius_top_left}px 0;`;
    } else if (seckill_subscript_location == 'top-right') {
        location += `top: 0;right: 0;border-radius: 0 ${shop_img_radius.radius_top_right}px 0 ${shop_img_radius.radius_top_right}px;`;
    } else if (seckill_subscript_location == 'bottom-left') {
        location += `bottom: 0;left: 0;border-radius: 0 ${shop_img_radius.radius_bottom_left}px 0 ${shop_img_radius.radius_bottom_left}px;`;
    } else if (seckill_subscript_location == 'bottom-right') {
        location += `bottom: 0;right: 0;border-radius: ${shop_img_radius.radius_bottom_right}px 0 ${shop_img_radius.radius_bottom_right}px 0;`;
    }
    return location;
});
</script>
<style lang="scss" scoped>
:deep(.el-image) {
    .image-slot img {
        width: 5rem;
        height: 5rem;
    }
}
.identifying {
    font-size: 0.9rem;
}
.seckill-head {
    // padding: 1.5rem 1.3rem;
    width: 100%;
    height: 5.1rem;
    border-radius: 0.8rem 0.8rem 0 0;
    .seckill-title {
        height: 2.1rem;
    }
    .time-config {
        padding: 0.1rem 0.5rem;
        line-height: 1.7rem;
        border-radius: 0.4rem;
    }
}
.seckill-head-icon {
    width: 1.6rem;
    height: 1.6rem;
}
.colon {
    position: relative;
    top: -0.1rem;
}
.multicolumn-columns {
    height: 100%;
    width: v-bind(multicolumn_columns_width) !important;
    min-width: v-bind(multicolumn_columns_width) !important;
}
.flex-img1 {
    width: v-bind(goods_img_width);
    height: v-bind(goods_img_height);
}
.flex-img2 {
    width: 100%;
    height: v-bind(goods_img_height);
}
.flex-img3 {
    height: 100%;
    width: 100%;
}
.slide-bottom {
    height: 1rem;
    border-radius: 0.5rem;
    background: red;
}
.slide-top {
    position: absolute;
    height: 1rem;
    top: 0;
    left: 0;
    border-radius: 0.5rem;
    .slide-top-icon {
        position: absolute;
        top: -0.3rem;
        right: 0;
        width: 1.6rem;
        height: 1.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.original-price {
    text-decoration-line: line-through;
}
.roll-columns {
    height: v-bind(multicolumn_columns_height);
}
.corner-marker {
    position: absolute;
    padding: 0.1rem 1rem;
    max-width: 100%;
}
</style>
