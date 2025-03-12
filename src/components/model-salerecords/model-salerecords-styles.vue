<template>
    <div class="h">
        <el-form :model="form" label-width="75">
            <card-container>
                <div class="mb-12">内容样式</div>
                <template v-if="data.rotation_direction == 'vertical'">
                    <el-form-item v-if="data.is_show.includes('head')" label="头像">
                        <div class="flex-col gap-10 w h">
                            <el-form-item label="宽度" label-width="60" class="form-item-child-label">
                                <slider v-model="form.heading_img_width" :max="500"></slider>
                            </el-form-item>
                            <el-form-item label="高度" label-width="60" class="form-item-child-label">
                                <slider v-model="form.heading_img_height" :max="500"></slider>
                            </el-form-item>
                            <el-form-item label="边线颜色" label-width="60" class="form-item-child-label">
                                <color-picker v-model="form.heading_img_border_color" :default-color="clone_form.end_text_color"></color-picker>
                            </el-form-item>
                            <el-form-item label="边线大小" label-width="60" class="form-item-child-label">
                                <slider v-model="form.heading_img_border_size" :max="50"></slider>
                            </el-form-item>
                            <el-form-item label="圆角" label-width="60" class="form-item-child-label">
                                <radius :value="form.heading_img_radius"></radius>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="data.is_show.includes('nick_name')" label="昵称">
                        <color-text-size-group v-model:color="form.nick_name_color" v-model:typeface="form.nick_name_typeface" v-model:size="form.nick_name_size" default-color="#000000"></color-text-size-group>
                    </el-form-item>
                </template>
                <el-form-item v-if="data.is_show.includes('goods_image')" label="商品图片">
                    <div class="flex-col gap-10 w h">
                        <el-form-item label="宽度" label-width="60" class="form-item-child-label">
                            <slider v-model="form.goods_img_width" :max="500"></slider>
                        </el-form-item>
                        <el-form-item label="高度" label-width="60" class="form-item-child-label">
                            <slider v-model="form.goods_img_height" :max="500"></slider>
                        </el-form-item>
                        <el-form-item label="边线颜色" label-width="60" class="form-item-child-label">
                            <color-picker v-model="form.goods_img_border_color" :default-color="clone_form.end_text_color"></color-picker>
                        </el-form-item>
                        <el-form-item label="边线大小" label-width="60" class="form-item-child-label">
                            <slider v-model="form.goods_img_border_size" :max="50"></slider>
                        </el-form-item>
                        <el-form-item label="圆角" label-width="60" class="form-item-child-label">
                            <radius :value="form.goods_img_radius"></radius>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item v-if="data.is_show.includes('goods_title')" label="商品标题">
                    <color-text-size-group v-model:color="form.goods_title_color" v-model:typeface="form.goods_title_typeface" v-model:size="form.goods_title_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item v-if="data.is_show.includes('time')" label="日期时间">
                    <color-text-size-group v-model:color="form.time_color" v-model:typeface="form.time_typeface" v-model:size="form.time_size" default-color="#000000"></color-text-size-group>
                </el-form-item>
                <el-form-item label="数据间距">
                    <slider v-model="form.data_spacing" :max="100"></slider>
                </el-form-item>
                <template v-if="data.rotation_direction !== 'vertical'">
                    <el-form-item label="内容背景">
                        <background-common v-model:color_list="form.content_color_list" v-model:direction="form.content_direction" v-model:img_style="form.content_background_img_style" v-model:img="form.content_background_img" @mult_color_picker_event="mult_color_picker_event" />
                    </el-form-item>
                    <el-form-item label="内间距">
                        <padding :value="form.content_padding"></padding>
                    </el-form-item>
                    <el-form-item label="圆角">
                        <radius :value="form.content_radius"></radius>
                    </el-form-item>
                </template>
            </card-container>
            <div class="divider-line"></div>
            <common-styles :value="form.common_style" @update:value="common_style_update" />
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { isEmpty, cloneDeep } from "lodash";
/**
 * @description: 组合搭配列表（样式）
 * @param value{Object} 样式数据
 * @param content{Object} 内容数据
 * @param defaultConfig{Object} 默认配置
 */
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
// 内容背景处理
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.content_color_list = arry;
    form.value.content_direction = type;
};
const common_style_update = (value: any) => {
    form.value.common_style = value;
};
</script>
<style lang="scss" scoped>
</style>
