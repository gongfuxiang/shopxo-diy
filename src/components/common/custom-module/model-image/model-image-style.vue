<template>
    <div class="w h bg-f">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">图片设置</div>
                <el-form-item label="上传图片">
                    <upload v-model="form.img" :limit="1" size="50" @update:model-value="img_src_change('1')"></upload>
                </el-form-item>
                <el-form-item label="数据字段">
                    <el-select v-model="form.data_source_id" value-key="id" clearable filterable placeholder="请选择图片数据字段" size="default" class="flex-1" @change="img_src_change('2')">
                        <el-option v-for="item in options.filter(item => item.type == 'images')" :key="item.field" :label="item.name" :value="item.field" />
                    </el-select>
                </el-form-item>
                <el-form-item label="链接">
                    <url-value v-model="form.link"></url-value>
                </el-form-item>
                <el-form-item label="图片圆角">
                    <radius :value="form.img_radius" @update:value="img_radius_change"></radius>
                </el-form-item>
                <el-form-item label="图片宽度">
                    <slider v-model="form.img_width" :max="1000"></slider>
                </el-form-item>
                <el-form-item label="图片高度">
                    <slider v-model="form.img_height" :max="1000"></slider>
                </el-form-item>
                <el-form-item label="旋转角度">
                    <slider v-model="form.img_rotate" :max="1000"></slider>
                </el-form-item>
                <el-form-item label="是否置底">
                    <el-switch v-model="form.bottom_up" active-value="1" inactive-value="0" />
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container class="h">
                <div class="mb-12">边框设置</div>
                <el-form-item label="边框显示">
                    <el-radio-group v-model="form.border_show">
                        <el-radio value="1">显示</el-radio>
                        <el-radio value="0">隐藏</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="form.border_show == '1'">
                    <el-form-item label="边框颜色">
                        <color-picker v-model="form.border_color" default-color="#FF3F3F"></color-picker>
                    </el-form-item>
                    <el-form-item label="边框样式">
                        <el-radio-group v-model="form.border_style">
                            <el-radio value="dashed"><div class="border-style-item" style="border: 1px dashed #979797"></div></el-radio>
                            <el-radio value="solid"><div class="border-style-item" style="border: 1px solid #979797"></div></el-radio>
                            <el-radio value="dotted"><div class="border-style-item" style="border: 1px dotted #979797"></div></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="边框圆角">
                        <radius :value="form.border_radius" @update:value="border_radius_change"></radius>
                    </el-form-item>
                    <el-form-item label="边框粗细">
                        <slider v-model="form.border_size" :max="1000"></slider>
                    </el-form-item>
                </template>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { location_compute } from '@/utils';
import { pick } from 'lodash';
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

const img_radius_change = (radius: any) => {
    form.value.img_radius = Object.assign(form.value.img_radius, pick(radius, ['radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right']));
};
const border_radius_change = (radius: any) => {
    form.value.border_radius = Object.assign(form.value.border_radius, pick(radius, ['radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right']));
};

const img_src_change = (key: string) => {
    if (key == '2') {
        form.value.img = [];
    } else {
        form.value.data_source_id = '';
    }
}

watch(
    diy_data,
    (val) => {
        let width = form.value.img_width;
        let height = form.value.img_height;
        if (form.value.border_show == '1') {
            width += form.value.border_size * 2;
            height += form.value.border_size * 2;
        }

        diy_data.value.location.x = location_compute(width, val.location.x, 390);
        diy_data.value.location.y = location_compute(height, val.location.y, center_height.value);
        diy_data.value.location.record_x = location_compute(width, val.location.record_x, 390);
        diy_data.value.location.record_y = location_compute(height, val.location.record_y, center_height.value);
        diy_data.value.location.staging_y = location_compute(height, val.location.staging_y, center_height.value);

        form.value.com_width = width;
        form.value.com_height = height;
        form.value.staging_height = height;
    },
    { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.border-style-item {
    width: 3rem;
    height: 2rem;
}
</style>
