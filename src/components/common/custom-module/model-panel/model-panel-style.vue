<template>
    <div class="w h bg-f">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">定位设置</div>
                <el-form-item label="X轴">
                    <slider v-model="diy_data.location.x" :max="390" @update:model-value="location_x_change"></slider>
                </el-form-item>
                <el-form-item label="Y轴">
                    <slider v-model="diy_data.location.y" :max="1000" @update:model-value="location_y_change"></slider>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">容器设置</div>
                <el-form-item label="链接">
                    <url-value v-model="form.link"></url-value>
                </el-form-item>
                <el-form-item label="数据链接">
                    <el-select v-model="form.data_source_link_field.id" value-key="id" clearable filterable placeholder="请选择数据链接字段" size="default" class="flex-1" @change="img_link_change('2')">
                        <el-option v-for="item in options.filter((item) => item.type == 'link')" :key="item.field" :label="item.name" :value="item.field" />
                    </el-select>
                </el-form-item>
                <el-form-item label="背景颜色">
                    <background-common v-model:color_list="form.color_list" v-model:direction="form.direction" v-model:img_style="form.background_img_style" v-model:img="form.background_img" @mult_color_picker_event="mult_color_picker_event" />
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.bg_radius" @update:value="bg_radius_change"></radius>
                </el-form-item>
                <el-form-item label="旋转角度">
                    <slider v-model="form.panel_rotate" :max="1000"></slider>
                </el-form-item>
                <!-- <el-form-item label="是否置底">
                    <el-switch v-model="form.bottom_up" active-value="1" inactive-value="0" />
                </el-form-item> -->
                <el-form-item label="容器宽度">
                    <slider v-model="form.com_width" :max="1000"></slider>
                </el-form-item>
                <el-form-item label="容器高度">
                    <slider v-model="form.com_height" :max="1000"></slider>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">边框设置</div>
                <el-form-item label="边框显示">
                    <el-switch v-model="form.border_show" active-value="1" inactive-value="0" />
                </el-form-item>
                <template v-if="form.border_show == '1'">
                    <el-form-item label="边框颜色">
                        <color-picker v-model="form.border_color" default-color="#FF3F3F"></color-picker>
                    </el-form-item>
                    <el-form-item label="边框样式">
                        <el-radio-group v-model="form.border_style">
                            <el-radio value="dashed">
                                <div class="border-style-item" style="border: 1px dashed #979797"></div>
                            </el-radio>
                            <el-radio value="solid">
                                <div class="border-style-item" style="border: 1px solid #979797"></div>
                            </el-radio>
                            <el-radio value="dotted">
                                <div class="border-style-item" style="border: 1px dotted #979797"></div>
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="边框粗细">
                        <slider v-model="form.border_size" :max="100"></slider>
                    </el-form-item>
                </template>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_data_fields, location_compute } from '@/utils';
import { pick, cloneDeep } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    options: {
        type: Array<any>,
        default: () => [],
    },
});
// 默认值
const state = reactive({
    diy_data: props.value,
});
// 如果需要解构，确保使用toRefs
const { diy_data } = toRefs(state);
const form = ref(diy_data.value.com_data);

const center_height = defineModel('height', { type: Number, default: 0 });
const bg_radius_change = (radius: any) => {
    form.value.bg_radius = Object.assign(form.value.bg_radius, pick(radius, ['radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right']));
};

const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type.toString();
};

// x轴变化时，更新记录的位置
const location_x_change = (val: number) => {
    diy_data.value.location.record_x = val;
}
// y轴变化时，更新记录的位置
const location_y_change = (val: number) => {
    diy_data.value.location.record_y = val;
    diy_data.value.location.staging_y = val;
}

// 数据链接字段切换时，更新另外一个数据
const img_link_change = (key: string) => {
    if (key == '2') {
        form.value.link = {};
        form.value.data_source_link_field = get_data_fields(props.options, 'link', form.value.data_source_link_field.id);
    } else {
        form.value.data_source_link_field = get_data_fields([], 'link', '');
    }
}

watch(
    diy_data,
    (val) => {
        diy_data.value.location.x = location_compute(form.value.com_width, val.location.x, 390);
        diy_data.value.location.y = location_compute(form.value.com_height, val.location.y, center_height.value);
        diy_data.value.location.record_x = location_compute(form.value.com_width, val.location.record_x, 390);
        diy_data.value.location.record_y = location_compute(form.value.com_height, val.location.record_y, center_height.value);
        diy_data.value.location.staging_y = location_compute(form.value.com_height, val.location.staging_y, center_height.value);

        form.value.staging_height = form.value.com_height;
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped>
.border-style-item {
    width: 3rem;
    height: 2rem;
}
</style>
