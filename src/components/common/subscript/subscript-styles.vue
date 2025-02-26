<template>
    <card-container class="card-container">
        <div v-if="props.type != 'nav-group'" class="mb-12">角标设置</div>
        <el-form-item label="角标位置">
            <div class="flex-col gap-10">
                <el-radio-group v-model="form.seckill_subscript_location">
                    <el-radio v-for="item in base_list.location_list.filter(item => item.type.includes(props.type))" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                </el-radio-group>
            </div>
        </el-form-item>
        <template v-if="props.type == 'nav-group'">
            <el-form-item :label="['top-left', 'top-right'].includes(form.seckill_subscript_location) ? '上间距' : '下间距'">
                <slider v-model="form.top_or_bottom_spacing" :min="-100" :max="100"></slider>
            </el-form-item>
            <el-form-item :label="['top-left', 'bottom-left'].includes(form.seckill_subscript_location) ? '左间距' : '右间距'">
                <slider v-model="form.left_or_right_spacing" :min="-100" :max="100"></slider>
            </el-form-item>
        </template>
        <template v-if="data.subscript_type == 'img-icon' && !isEmpty(data.subscript_img_src)">
            <el-form-item label="图片宽度">
                <slider v-model="form.img_width" :max="200"></slider>
            </el-form-item>
            <el-form-item label="图片高度">
                <slider v-model="form.img_height" :max="200"></slider>
            </el-form-item>
        </template>
        <template v-else>
            <el-form-item label="内容设置">
                <color-text-size-group v-model:color="form.text_or_icon_color" v-model:size="form.text_or_icon_size" :default-color="clone_form.text_or_icon_color" :slider-name="data.subscript_type == 'text' ? '字号' : '大小'" :type-list="['color', 'size']"></color-text-size-group>
            </el-form-item>
        </template>
        <el-form-item label="背景">
            <background-common v-model:color_list="form.color_list" v-model:direction="form.direction" v-model:img_style="form.background_img_style" v-model:img="form.background_img" @mult_color_picker_event="mult_color_picker_event" />
        </el-form-item>
        <el-form-item label="外间距">
            <margin :value="form"></margin>
        </el-form-item>
        <el-form-item label="内间距">
            <padding :value="form"></padding>
        </el-form-item>
        <el-form-item label="圆角">
            <radius :value="form"></radius>
        </el-form-item>
        <el-form-item label="阴影设置">
            <div class="flex-col gap-10 w">
                <el-form-item label="颜色" label-width="45">
                    <color-picker v-model="form.box_shadow_color"></color-picker>
                </el-form-item>
                <el-form-item label="X轴" label-width="45">
                    <slider v-model="form.box_shadow_x" :min="-20" :max="20"></slider>
                </el-form-item>
                <el-form-item label="Y轴" label-width="45">
                    <slider v-model="form.box_shadow_y" :min="-20" :max="20"></slider>
                </el-form-item>
                <el-form-item label="模糊" label-width="45">
                    <slider v-model="form.box_shadow_blur"></slider>
                </el-form-item>
                <el-form-item label="扩展" label-width="45">
                    <slider v-model="form.box_shadow_spread"></slider>
                </el-form-item>
            </div>
        </el-form-item>
    </card-container>
</template>

<script lang="ts" setup>
import { isEmpty, cloneDeep } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({
            text_or_icon_color: '#fff',
            text_or_icon_size: 12,
            img_width: 20,
            img_height: 20,
            direction: '90deg',
            color_list: [{ color: '#FF7607', color_percentage: undefined }],
            background_img_style: '2',
            background_img: [] as uploadList[],
            margin: 0,
            margin_top: 0,
            margin_bottom: 0,
            margin_left: 0,
            margin_right: 0,
            radius: 4,
            radius_top_left: 4,
            radius_top_right: 4,
            radius_bottom_left: 4,
            radius_bottom_right: 4,
            padding: 0,
            padding_top: 0,
            padding_bottom: 0,
            padding_left: 10,
            padding_right: 10,
            box_shadow_color: '',
            box_shadow_x: 0,
            box_shadow_y: 0,
            box_shadow_blur: 0,
            box_shadow_spread: 0,
        }),
    },
    data: {
        type: Object,
        default: () => ({}),
    },
    type: {
        type: String,
        default: 'other',
    },
});

const form = ref(props.value);
watch(() => props.value, (val) => {
    form.value = val;
}, {immediate: true, deep: true});
let clone_form = cloneDeep(props.value);

const base_list = {
    location_list: [
        { name: '上左', value: 'top-left', type: ['nav-group', 'other']  },
        { name: '上中', value: 'top-center', type: ['other'] },
        { name: '上右', value: 'top-right', type: ['nav-group', 'other'] },
        { name: '下左', value: 'bottom-left', type: ['nav-group', 'other'] },
        { name: '下中', value: 'bottom-center', type: ['other'] },
        { name: '下右', value: 'bottom-right', type: ['nav-group', 'other'] },
    ],
};
// 背景设置
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type.toString();
};
</script>