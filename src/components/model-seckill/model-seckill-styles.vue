<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <template v-if="data.head_state == '1'">
                <card-container>
                    <div class="mb-12">头部样式</div>
                    <el-form-item v-if="data.title_type == 'text'" label="标题设置">
                        <color-text-size-group v-model:color="form.title_color" v-model:size="form.title_size" :default-color="clone_form.title_color" :type-list="['color', 'size']"></color-text-size-group>
                    </el-form-item>
                    <el-form-item label="秒杀提示">
                        <color-picker v-model="form.end_text_color" :default-color="clone_form.end_text_color"></color-picker>
                    </el-form-item>
                    <el-form-item label="时间背景">
                        <mult-color-picker :value="form.countdown_bg_color_list" :type="form.countdown_direction" @update:value="countdown_color_picker_event"></mult-color-picker>
                    </el-form-item>
                    <el-form-item label="时间颜色">
                        <color-picker v-model="form.countdown_color" :default-color="clone_form.countdown_color"></color-picker>
                    </el-form-item>
                    <el-form-item v-if="data.button_status == '1'" label="按钮设置">
                        <color-text-size-group v-model:color="form.head_button_color" v-model:size="form.head_button_size" :default-color="clone_form.head_button_color" :type-list="['color', 'size']"></color-text-size-group>
                    </el-form-item>
                    <el-form-item label="头部背景">
                        <background-common v-model:color_list="form.header_background_color_list" v-model:direction="form.header_background_direction" v-model:img_style="form.header_background_img_style" v-model:img="form.header_background_img" @mult_color_picker_event="mult_color_picker_event" />
                    </el-form-item>
                    <el-form-item label="圆角">
                        <radius :value="form.seckill_head_radius"></radius>
                    </el-form-item>
                    <el-form-item label="外间距">
                        <margin :value="form.seckill_head_margin"></margin>
                    </el-form-item>
                    <el-form-item label="内间距">
                        <padding :value="form.seckill_head_padding"></padding>
                    </el-form-item>
                    <!-- 边框处理 -->
                    <border-config v-model:show="form.seckill_head_style.border_is_show" v-model:color="form.seckill_head_style.border_color" v-model:style="form.seckill_head_style.border_style" v-model:size="form.seckill_head_style.border_size"></border-config>
                    <!-- 阴影配置 -->
                    <shadow-config v-model="form.seckill_head_style"></shadow-config>
                </card-container>
                <div class="divider-line"></div>
            </template>
            <card-container>
                <div class="mb-12">内容样式</div>
                <el-form-item label="内容背景">
                    <background-common v-model:color_list="form.shop_content_color_list" v-model:direction="form.shop_content_direction" v-model:img_style="form.shop_content_background_img_style" v-model:img="form.shop_content_background_img" @mult_color_picker_event="shop_content_mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.shop_content_radius"></radius>
                </el-form-item>
                <el-form-item label="外间距">
                    <margin :value="form.shop_content_margin"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.shop_content_padding"></padding>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.shop_content.border_is_show" v-model:color="form.shop_content.border_color" v-model:style="form.shop_content.border_style" v-model:size="form.shop_content.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.shop_content"></shadow-config>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">商品样式</div>
                <el-form-item label="商品背景">
                    <background-common v-model:color_list="form.shop_color_list" v-model:direction="form.shop_direction" v-model:img_style="form.shop_background_img_style" v-model:img="form.shop_background_img" @mult_color_picker_event="shop_mult_color_picker_event" />
                </el-form-item>
                <template v-if="data.is_show.includes('title')">
                    <el-form-item label="商品名称">
                        <color-text-size-group v-model:color="form.shop_title_color" v-model:typeface="form.shop_title_typeface" v-model:size="form.shop_title_size" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                </template>
                <template v-if="data.is_show.includes('simple_desc')">
                    <el-form-item label="商品简述">
                        <color-text-size-group v-model:color="form.shop_simple_desc_color" v-model:size="form.shop_simple_desc_size" default-color="#999" :type-list="['color', 'size']">
                            <el-form-item label="间距" label-width="40" class="mb-0 w form-item-child-label">
                                <slider v-model="form.title_simple_desc_spacing" :max="100"></slider>
                            </el-form-item>
                        </color-text-size-group>
                    </el-form-item>
                </template>
                <template v-if="data.is_show.includes('price')">
                    <el-form-item label="商品价格">
                        <color-text-size-group v-model:color="form.shop_price_color" v-model:typeface="form.shop_price_typeface" v-model:size="form.shop_price_size" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                    <el-form-item label="售价符号">
                        <color-text-size-group v-model:color="form.shop_price_symbol_color" v-model:size="form.shop_price_symbol_size" default-color="#EA3323" :type-list="['color', 'size']"></color-text-size-group>
                    </el-form-item>
                    <template v-if="data.is_show.includes('price_unit')">
                        <el-form-item label="售价单位">
                            <color-text-size-group v-model:color="form.shop_price_unit_color" v-model:size="form.shop_price_unit_size" default-color="#EA3323" :type-list="['color', 'size']"></color-text-size-group>
                        </el-form-item>
                    </template>
                </template> 
                <template v-if="data.is_show.includes('original_price')">
                    <el-form-item label="原价价格">
                        <color-text-size-group v-model:color="form.shop_original_price_color" v-model:size="form.shop_original_price_size" default-color="#999" :type-list="['color', 'size']"></color-text-size-group>
                    </el-form-item>
                </template>
                <el-form-item label="内容圆角">
                    <radius :value="form.shop_radius"></radius>
                </el-form-item>
                <template v-if="data.shop_style_type == '3'">
                    <el-form-item label="内容高度">
                        <slider v-model="form.content_outer_height" :max="1000"></slider>
                    </el-form-item>
                </template>
                <el-form-item label="外间距">
                    <margin :value="form.shop_margin"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.shop_padding"></padding>
                </el-form-item>
                <el-form-item v-if="data.shop_style_type == '1'" label="内容间距">
                    <slider v-model="form.content_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="商品间距">
                    <slider v-model="form.content_outer_spacing" :max="100"></slider>
                </el-form-item>
                <el-form-item label="图片圆角">
                    <radius :value="form.shop_img_radius"></radius>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.shop_style.border_is_show" v-model:color="form.shop_style.border_color" v-model:style="form.shop_style.border_style" v-model:size="form.shop_style.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.shop_style"></shadow-config>
                <template v-if="data.shop_style_type !== '3'">
                    <el-form-item v-if="data.shop_style_type == '1'" label="图片宽度">
                        <slider v-model="form.content_img_width" :max="1000"></slider>
                    </el-form-item>
                    <el-form-item label="图片高度">
                        <slider v-model="form.content_img_height" :max="1000"></slider>
                    </el-form-item>
                </template>
            </card-container>
            <!-- 秒杀角标 -->
            <template v-if="data.seckill_subscript_show == '1'">
                <div class="divider-line"></div>
                <subscript-styles :value="form.subscript_style" :data="data"></subscript-styles>
            </template>
            <!-- 秒杀按钮 -->
            <template v-if="data.is_shop_show == '1'">
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">秒杀按钮</div>
                    <el-form-item label="按钮颜色" class="topic">
                        <flex-gradients-create :color-list="form.shop_button_color" default-color="#FF3D53"></flex-gradients-create>
                    </el-form-item>
                    <template v-if="data.shop_type == 'text'">
                        <el-form-item label="文字设置">
                            <color-text-size-group v-model:color="form.shop_button_text_color" v-model:typeface="form.shop_button_typeface" v-model:size="form.shop_button_size" default-color="#fff"></color-text-size-group>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="图标设置">
                            <color-text-size-group v-model:color="form.shop_icon_color" v-model:size="form.shop_icon_size" slider-name="大小" default-color="#fff" :type-list="['color', 'size']"></color-text-size-group>
                        </el-form-item>
                    </template>
                </card-container>
            </template>
            <!-- 进度条设置 -->
            <!-- <template v-if="data.shop_style_type == '1'">
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">进度条设置</div>
                    <el-form-item label="背景色">
                        <color-picker v-model="form.progress_bg_color"></color-picker>
                    </el-form-item>
                    <el-form-item label="选中色">
                        <mult-color-picker :value="form.progress_actived_color_list" :type="form.progress_actived_direction" @update:value="progress_color_picker_event"></mult-color-picker>
                    </el-form-item>
                    <el-form-item label="按钮背景">
                        <color-picker v-model="form.progress_button_color"></color-picker>
                    </el-form-item>
                    <el-form-item label="图标颜色">
                        <color-picker v-model="form.progress_button_icon_color"></color-picker>
                    </el-form-item>
                    <el-form-item label="文字颜色">
                        <color-picker v-model="form.progress_text_color"></color-picker>
                    </el-form-item>
                </card-container>
            </template> -->
            <!-- 轮播设置 -->
            <template v-if="data.shop_style_type == '3'">
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">轮播设置</div>
                    <el-form-item label="自动轮播">
                        <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
                    </el-form-item>
                    <el-form-item label="间隔时间">
                        <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                    </el-form-item>
                    <el-form-item label="滚动方式">
                        <el-radio-group v-model="form.rolling_fashion">
                            <el-radio v-for="item in base_list.rolling_fashion_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </card-container>
            </template>
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" @update:value="common_style_update" />
    </div>
</template>
<script setup lang="ts">
import { cloneDeep, isEmpty } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: Object,
        default: () => ({}),
    },
});

// 默认值
const state = reactive({
    form: props.value,
    data: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
let clone_form = cloneDeep(props.value);

const base_list = {
    location_list: [
        { name: '左上', value: 'top-left' },
        { name: '右上', value: 'top-right' },
        { name: '左下', value: 'bottom-left' },
        { name: '右下', value: 'bottom-right' },
    ],
    rolling_fashion_list: [
        { name: '平移', value: 'translation' },
        { name: '切屏', value: 'cut-screen' },
    ],
};

const common_style_update = (value: any) => {
    form.value.common_style = value;
};
// 顶部背景设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.header_background_color_list = arry;
    form.value.header_background_direction = type.toString();
};
// 倒计时背景设置
const countdown_color_picker_event = (arry: color_list[], type: number) => {
    form.value.countdown_bg_color_list = arry;
    form.value.countdown_direction = type.toString();
};
const shop_content_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.shop_content_color_list = arry;
    form.value.shop_content_direction = type.toString();
};
// 商品背景渐变设置
const shop_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.shop_color_list = arry;
    form.value.shop_direction = type.toString();
};
// 进度条选中的设置
// const progress_color_picker_event = (arry: color_list[], type: number) => {
//     form.value.progress_actived_color_list = arry;
//     form.value.progress_actived_direction = type.toString();
// };
</script>
<style lang="scss" scoped>
.topic {
    :deep(.el-form-item__content) {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
