<template>
    <template v-if="['goods', 'images', 'video'].includes(tabs_content.data_type) || (tabs_content.data_type == 'custom' && ['vertical-scroll', 'horizontal'].includes(tabs_content.data_source_direction))">
        <card-container>
            <div class="mb-12">基础样式</div>
            <template v-if="tabs_content.data_type != 'video'">
                <el-form-item label="自动轮播">
                    <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
                </el-form-item>
                <template v-if="form.is_roll == '1'">
                    <el-form-item v-if="tabs_content.data_type != 'custom'" label="轮播方向">
                        <el-radio-group v-model="form.rotation_direction">
                            <el-radio value="horizontal">横向</el-radio>
                            <el-radio value="vertical">纵向</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="间隔时间">
                        <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                    </el-form-item>
                </template>
                <el-form-item v-if="['goods', 'custom'].includes(tabs_content.data_type)" label="滚动方式">
                    <el-radio-group v-model="form.rolling_fashion">
                        <el-radio value="translation">平移</el-radio>
                        <el-radio value="cut-screen">切屏</el-radio>
                    </el-radio-group>
                </el-form-item>
            </template>
            <el-form-item v-if="tabs_content.data_type != 'custom'" :label="tabs_content.data_type != 'video' ? '图片圆角' : '视频圆角'">
                <radius :key="form.carouselKey" :value="form.img_radius"></radius>
            </el-form-item>
        </card-container>
        <div class="bg-f5 divider-line" />
    </template>
    <template v-if="['goods', 'images'].includes(tabs_content.data_type) || (tabs_content.data_type == 'custom' && ['vertical-scroll', 'horizontal'].includes(tabs_content.data_source_direction))">
        <card-container>
            <carousel-indicator :key="form.carouselKey" :value="form"></carousel-indicator>
        </card-container>
        <div class="bg-f5 divider-line" />
    </template>
    <template v-if="tabs_content.data_type === 'goods'">
        <card-container>
            <div class="mb-12">标题样式</div>
            <el-form-item label="主标题">
                <template v-if="tabs_content.heading_title_type == 'text'">
                    <color-text-size-group v-model:color="form.heading_color" v-model:typeface="form.heading_typeface" v-model:size="form.heading_size" default-color="#000000"></color-text-size-group>
                </template>
                <template v-else>
                    <el-form-item label="图片高度" label-width="60" class="w form-item-child-label">
                        <slider v-model="form.heading_img_height" :min="1" :max="200"></slider>
                    </el-form-item>
                </template>
            </el-form-item>
            <el-form-item label="副标题">
                <template v-if="tabs_content.subtitle_title_type == 'text'">
                    <color-text-size-group v-model:color="form.subtitle_color" v-model:typeface="form.subtitle_typeface" v-model:size="form.subtitle_size" default-color="#000000"></color-text-size-group>
                </template>
                <template v-else>
                    <el-form-item label="图片高度" label-width="60" class="w form-item-child-label">
                        <slider v-model="form.subtitle_img_height" :min="1" :max="200"></slider>
                    </el-form-item>
                </template>
            </el-form-item>
            <el-form-item label="标题内间距">
                <slider v-model="form.title_gap" :min="0" :max="100"></slider>
            </el-form-item>
            <el-form-item label="标题外间距">
                <slider v-model="form.title_data_gap" :min="0" :max="100"></slider>
            </el-form-item>
            <el-form-item label="标题同行">
                <el-switch v-model="form.title_line" active-value="1" inactive-value="0" />
            </el-form-item>
        </card-container>
        <div class="bg-f5 divider-line" />
    </template>
    <template v-if="['goods', 'custom'].includes(tabs_content.data_type)">
        <card-container>
            <div class="mb-12">数据样式</div>
            <el-form-item label="背景">
                <background-common :key="form.carouselKey" v-model:color_list="form.data_color_list" v-model:direction="form.data_direction" v-model:img_style="form.data_background_img_style" v-model:img="form.data_background_img" @mult_color_picker_event="data_mult_color_picker_event" />
            </el-form-item>
            <el-form-item label="外间距">
                <margin :key="form.carouselKey" :value="form.data_chunk_margin"></margin>
            </el-form-item>
            <el-form-item label="内间距">
                <padding :key="form.carouselKey" :value="form.data_chunk_padding"></padding>
            </el-form-item>
            <el-form-item label="圆角">
                <radius :key="form.carouselKey" :value="form.data_radius"></radius>
            </el-form-item>
            <el-form-item v-if="tabs_content.data_type == 'custom'" label="数据间距">
                <div class="flex-col w h gap-10">
                    <el-form-item v-if="['vertical', 'horizontal'].includes(tabs_content.data_source_direction)" label="横向" label-width="40" class="mb-0 w form-item-child-label">
                        <slider v-model="form.column_gap" :max="100"></slider>
                    </el-form-item>
                    <el-form-item v-if="['vertical', 'vertical-scroll'].includes(tabs_content.data_source_direction)" label="纵向" label-width="40" class="mb-0 w form-item-child-label">
                        <slider v-model="form.row_gap" :max="100"></slider>
                    </el-form-item>
                </div>
            </el-form-item>
            <el-form-item v-if="tabs_content.data_type == 'goods'" label="数据间距">
                <slider v-model="form.data_goods_gap" :min="0" :max="50"></slider>
            </el-form-item>
            <!-- 边框处理 -->
            <border-config v-model:show="form.data_pattern.border_is_show" v-model:color="form.data_pattern.border_color" v-model:style="form.data_pattern.border_style" v-model:size="form.data_pattern.border_size"></border-config>
            <!-- 阴影配置 -->
            <shadow-config v-model="form.data_pattern"></shadow-config>
        </card-container>
        <div class="bg-f5 divider-line" />
        <template v-if="tabs_content.data_type == 'custom'">
            <card-container>
                <div class="mb-12">内容样式</div>
                <el-form-item label="背景">
                    <background-common :key="form.carouselKey" v-model:color_list="form.data_content_style.color_list" v-model:direction="form.data_content_style.direction" v-model:img_style="form.data_content_style.background_img_style" v-model:img="form.data_content_style.background_img" @mult_color_picker_event="data_content_mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="外间距">
                    <margin :key="form.carouselKey" :value="form.data_content_style"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :key="form.carouselKey" :value="form.data_content_style"></padding>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :key="form.carouselKey" :value="form.data_content_style"></radius>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.data_content_style.border_is_show" v-model:color="form.data_content_style.border_color" v-model:style="form.data_content_style.border_style" v-model:size="form.data_content_style.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.data_content_style"></shadow-config>
            </card-container>
            <div class="bg-f5 divider-line" />
        </template>
    </template>
    <template v-if="tabs_content.data_type === 'goods'">
        <card-container>
            <div class="mb-12">商品样式</div>
            <template v-if="tabs_content.is_show.includes('title')">
                <el-form-item label="名称">
                    <color-text-size-group v-model:color="form.goods_title_color" v-model:typeface="form.goods_title_typeface" v-model:size="form.goods_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
            </template>
            <template v-if="tabs_content.is_show.includes('price')">
                <el-form-item label="价格">
                    <color-text-size-group v-model:color="form.goods_price_color" v-model:typeface="form.goods_price_typeface"  v-model:size="form.goods_price_size" :label-width="tabs_content.goods_flex == 'col_price_float' ? 60 : 40" default-color="#000000">
                        <template v-if="tabs_content.goods_flex == 'col_price_float'">
                            <el-form-item label="对齐方式" label-width="60" class="mb-0 w form-item-child-label">
                                <el-radio-group v-model="form.goods_price_location" is-button>
                                    <el-tooltip content="左对齐" placement="top" effect="dark">
                                        <el-radio-button value="left"><icon name="iconfont icon-left"></icon></el-radio-button>
                                    </el-tooltip>
                                    <el-tooltip content="居中" placement="top" effect="dark">
                                        <el-radio-button value="center"><icon name="iconfont icon-center"></icon></el-radio-button>
                                    </el-tooltip>
                                    <el-tooltip content="右对齐" placement="top" effect="dark">
                                        <el-radio-button value="right"><icon name="iconfont icon-right"></icon></el-radio-button>
                                    </el-tooltip>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="背景" label-width="60" class="mb-0 w form-item-child-label">
                                <mult-color-picker :key="form.carouselKey" :value="form.goods_price_color_list" :type="form.goods_price_direction" @update:value="goods_price_mult_color_picker_event"></mult-color-picker>
                            </el-form-item>
                            <el-form-item label="外边距" label-width="60" class="mb-0 w form-item-child-label">
                                <margin :key="form.carouselKey" :value="form.goods_price_margin"></margin>
                            </el-form-item>
                            <el-form-item label="内间距" label-width="60" class="mb-0 w form-item-child-label">
                                <padding :key="form.carouselKey" :value="form.goods_price_padding"></padding>
                            </el-form-item>
                            <el-form-item label="圆角" label-width="60" class="mb-0 w form-item-child-label">
                                <radius :key="form.carouselKey" :value="form.goods_price_radius"></radius>
                            </el-form-item>
                        </template>
                    </color-text-size-group>
                </el-form-item>
                <el-form-item label="价格符号">
                    <color-text-size-group v-model:color="form.goods_price_symbol_color" v-model:size="form.goods_price_symbol_size" default-color="#EA3323" :type-list="['color', 'size']"></color-text-size-group>
                </el-form-item>
                <template v-if="tabs_content.is_show.includes('price_unit')">
                    <el-form-item label="价格单位">
                        <color-text-size-group v-model:color="form.goods_price_unit_color" v-model:size="form.goods_price_unit_size" default-color="#EA3323" :type-list="['color', 'size']"></color-text-size-group>
                    </el-form-item>
                </template>
            </template>
            <el-form-item label="背景">
                <background-common :key="form.carouselKey" v-model:color_list="form.goods_color_list" v-model:direction="form.goods_direction" v-model:img_style="form.goods_background_img_style" v-model:img="form.goods_background_img" @mult_color_picker_event="goods_mult_color_picker_event" />
            </el-form-item>
            <el-form-item label="外间距">
                <margin :key="form.carouselKey" :value="form.goods_chunk_margin"></margin>
            </el-form-item>
            <el-form-item label="内间距">
                <padding :key="form.carouselKey" :value="form.goods_chunk_padding"></padding>
            </el-form-item>
            <el-form-item label="圆角">
                <radius :key="form.carouselKey" :value="form.goods_radius"></radius>
            </el-form-item>
            <!-- 边框处理 -->
            <border-config v-model:show="form.border_is_show" v-model:color="form.border_color" v-model:style="form.border_style" v-model:size="form.border_size"></border-config>
            <!-- 阴影配置 -->
            <shadow-config v-model="form"></shadow-config>
        </card-container>
        <div class="bg-f5 divider-line" />
    </template>
    <card-container class="mb-8">
        <div class="mb-12">通用样式</div>
        <el-form-item label="底部背景">
            <background-common :key="form.carouselKey" v-model:color_list="form.color_list" v-model:direction="form.direction" v-model:img_style="form.background_img_style" v-model:img="form.background_img" @mult_color_picker_event="mult_color_picker_event" />
        </el-form-item>
        <el-form-item label="外间距">
            <margin :key="form.carouselKey" :value="form.chunk_margin"></margin>
        </el-form-item>
        <el-form-item label="内间距">
            <padding :key="form.carouselKey" :value="form.chunk_padding"></padding>
        </el-form-item>
        <!-- 边框处理 -->
        <border-config v-model:show="form.data_common_style.border_is_show" v-model:color="form.data_common_style.border_color" v-model:style="form.data_common_style.border_style" v-model:size="form.data_common_style.border_size"></border-config>
        <!-- 阴影配置 -->
        <shadow-config v-model="form.data_common_style"></shadow-config>
    </card-container>
</template>
<script setup lang="ts">
import { pick, isEmpty, cloneDeep } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: Object,
        default: () => ({}),
    }
});

const form = ref(props.value);
const tabs_content = ref(props.content);

const mult_color_picker_event = (arry: string[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type.toString();
};
// 内容底板颜色
const data_content_mult_color_picker_event = (arry: string[], type: number) => {
    form.value.data_content_style.color_list = arry;
    form.value.data_content_style.direction = type.toString();
}
// 数据底板颜色
const data_mult_color_picker_event = (arry: string[], type: number) => {
    form.value.data_color_list = arry;
    form.value.data_direction = type.toString();
}
// 商品底部颜色
const goods_mult_color_picker_event = (arry: string[], type: number) => {
    form.value.goods_color_list = arry;
    form.value.goods_direction = type.toString();
}
// 商品价格底部颜色
const goods_price_mult_color_picker_event = (arry: string[], type: number) => {
    form.value.goods_price_color_list = arry;
    form.value.goods_price_direction = type.toString();
}

watchEffect(() => {
    form.value = props.value;
    tabs_content.value = props.content;
});
</script>
<style lang="scss" scoped></style>
