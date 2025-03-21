<template>
    <div class="w">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">活动配置</div>
                <el-form-item label="背景">
                    <background-common v-model:color_list="form.activity_main.color_list" v-model:direction="form.activity_main.direction" v-model:img_style="form.activity_main.background_img_style" v-model:img="form.activity_main.background_img" @mult_color_picker_event="mult_color_picker_event" />
                </el-form-item>
                <template v-if="data.is_main_show.includes('img')">
                    <el-form-item label="图片">
                        <div class="flex-col w h gap-10">
                            <el-form-item v-if="['0'].includes(data.main_theme)" label="宽度" label-width="40" class="mb-0 w form-item-child-label">
                                <slider v-model="form.activity_main.img_width" :max="1000"></slider>
                            </el-form-item>
                            <el-form-item label="高度" label-width="40" class="mb-0 w form-item-child-label">
                                <slider v-model="form.activity_main.img_height" :max="1000"></slider>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item label="图片圆角">
                        <radius :value="form.activity_main.img_radius"></radius>
                    </el-form-item>
                </template>
                <template v-if="data.is_main_show.includes('title')">
                    <el-form-item label="标题">
                        <color-text-size-group v-model:color="form.activity_main.title_color" v-model:typeface="form.activity_main.title_typeface" v-model:size="form.activity_main.title_size" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                </template>
                <template v-if="data.is_main_show.includes('desc')">
                    <el-form-item label="描述">
                        <color-text-size-group v-model:color="form.activity_main.desc_color" v-model:size="form.activity_main.desc_size" default-color="#999" :type-list="['color', 'size']">
                            <el-form-item label="间距" label-width="40" class="mb-0 w form-item-child-label">
                                <slider v-model="form.activity_main.desc_spacing" :max="100"></slider>
                            </el-form-item>
                        </color-text-size-group>
                    </el-form-item>
                </template>
                <el-form-item label="外间距">
                    <margin :value="form.activity_main"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.activity_main"></padding>
                </el-form-item>
                <el-form-item label="内容圆角">
                    <radius :value="form.activity_main"></radius>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.activity_main.border_is_show" v-model:color="form.activity_main.border_color" v-model:style="form.activity_main.border_style" v-model:size="form.activity_main.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.activity_main"></shadow-config>
                <el-form-item label="右侧内容">
                    <!-- <slider v-model="form.activity_main_content_spacing" :max="100"></slider> -->
                    <el-form-item label="内间距" label-width="50" class="mb-0 w form-item-child-label">
                        <padding :value="form.activity_main.activity_main_right_content"></padding>
                    </el-form-item>
                </el-form-item>
            </card-container>
            <template v-if="data.is_main_show.includes('keywords')">
                <div class="divider-line"></div>
                <card-container>
                    <div class="mb-12">关键字设置</div>
                    <common-button-style :value="form.activity_main.keywords_style"></common-button-style>
                </card-container>
            </template>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">活动内容设置</div>
                <el-form-item label="内容背景">
                    <background-common v-model:color_list="form.activity_content.color_list" v-model:direction="form.activity_content.direction" v-model:img_style="form.activity_content.background_img_style" v-model:img="form.activity_content.background_img" @mult_color_picker_event="activity_content_mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="外间距">
                    <margin :value="form.activity_content"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.activity_content"></padding>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.activity_content"></radius>
                </el-form-item>
                <el-form-item label="数据间距">
                    <slider v-model="form.activity_outer_spacing" :max="100"></slider>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.activity_content.border_is_show" v-model:color="form.activity_content.border_color" v-model:style="form.activity_content.border_style" v-model:size="form.activity_content.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.activity_content"></shadow-config>
            </card-container>
            <div class="divider-line"></div>
            <model-goods-list-styles :value="form" :content="data" :default-config="defaultConfig" :is-common-style="false"></model-goods-list-styles>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">商品内容设置</div>
                <el-form-item label="内容背景">
                    <background-common v-model:color_list="form.shop_content.color_list" v-model:direction="form.shop_content.direction" v-model:img_style="form.shop_content.background_img_style" v-model:img="form.shop_content.background_img" @mult_color_picker_event="shop_content_mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.shop_content"></radius>
                </el-form-item>
                <el-form-item label="外间距">
                    <margin :value="form.shop_content"></margin>
                </el-form-item>
                <el-form-item label="内间距">
                    <padding :value="form.shop_content"></padding>
                </el-form-item>
                <el-form-item label="数据间距">
                    <slider v-model="form.shop_content_spacing" :max="100"></slider>
                </el-form-item>
                <!-- 边框处理 -->
                <border-config v-model:show="form.shop_content.border_is_show" v-model:color="form.shop_content.border_color" v-model:style="form.shop_content.border_style" v-model:size="form.shop_content.border_size"></border-config>
                <!-- 阴影配置 -->
                <shadow-config v-model="form.shop_content"></shadow-config>
            </card-container>
        </el-form>
        <div class="divider-line data-tabs-line"></div>
        <common-styles :value="form.common_style" @update:value="common_style_update" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: Object,
        default: () => ({}),
    },
    defaultConfig: {
        type: Object,
        default: () => ({
            // 图片不同风格下的圆角
            img_radius_0: 4,
            img_radius_1: 0,
        }),
    },
});

// 默认值
const state = reactive({
    form: props.value,
    data: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);

const theme = computed(() => data.value.theme);
if (['0', '4'].includes(theme.value)) {
    if (form.value.shop_img_radius.radius == props.defaultConfig.img_radius_0 || (form.value.shop_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
        form.value.shop_img_radius.radius = props.defaultConfig.img_radius_0;
        form.value.shop_img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
        form.value.shop_img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
        form.value.shop_img_radius.radius_top_left = props.defaultConfig.img_radius_0;
        form.value.shop_img_radius.radius_top_right = props.defaultConfig.img_radius_0;
    }
} else {
    if (form.value.shop_img_radius.radius == props.defaultConfig.img_radius_0 || (form.value.shop_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && form.value.shop_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
        form.value.shop_img_radius.radius = props.defaultConfig.img_radius_1;
        form.value.shop_img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
        form.value.shop_img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
        form.value.shop_img_radius.radius_top_left = props.defaultConfig.img_radius_1;
        form.value.shop_img_radius.radius_top_right = props.defaultConfig.img_radius_1;
    }
}
const common_style_update = (value: any) => {
    form.value.common_style = value;
};
// 活动区域背景渐变设置
const activity_content_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.activity_content.color_list = arry;
    form.value.activity_content.direction = type.toString();
};
// 商品内容区域背景渐变设置
const shop_content_mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.shop_content.color_list = arry;
    form.value.shop_content.direction = type.toString();
};
// 商品背景渐变设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.activity_main.color_list = arry;
    form.value.activity_main.direction = type.toString();
};
</script>
<style lang="scss" scoped>
</style>
