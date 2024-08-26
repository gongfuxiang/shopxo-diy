<template>
    <div class="w h bg-f">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">文本设置</div>
                <el-form-item label="文本内容">
                    <el-input v-model="form.text_title" placeholder="请输入文本内容" type="textarea" :rows="3" @input="text_change('1')"></el-input>
                </el-form-item>
                <el-form-item label="数据字段">
                    <el-select v-model="form.data_source_id" value-key="id" clearable filterable placeholder="请选择图片数据字段" size="default" class="flex-1" @change="text_change('2')">
                        <el-option v-for="item in options.filter(item => item.type == 'text')" :key="item.field" :label="item.name" :value="item.field" />
                    </el-select>
                </el-form-item>
                <el-form-item label="链接">
                    <url-value v-model="form.text_link"></url-value>
                </el-form-item>
                <el-form-item label="富文本">
                    <el-switch v-model="form.is_rich_text" />
                </el-form-item>
                <el-form-item v-if="form.is_rich_text" label="上下滚动">
                    <el-switch v-model="form.is_up_down" />
                </el-form-item>
                <el-form-item label="文字颜色">
                    <color-picker v-model="form.text_color" default-color="#FF3F3F"></color-picker>
                </el-form-item>
                <el-form-item label="文字大小">
                    <el-radio-group v-model="form.text_weight" class="ml-4">
                        <el-radio value="500">加粗</el-radio>
                        <el-radio value="normal">正常</el-radio>
                        <el-radio value="italic">倾斜</el-radio>
                    </el-radio-group>
                    <el-form-item label="字号" label-width="40" class="mb-0 w">
                        <slider v-model="form.text_size" :max="100"></slider>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="字符选项">
                    <el-radio-group v-model="form.text_option" class="ml-4">
                        <el-radio value="none"><span style="text-decoration: none">Aa</span></el-radio>
                        <el-radio value="underline"><span style="text-decoration: underline">Aa</span></el-radio>
                        <el-radio value="line-through"><span style="text-decoration: line-through">Aa</span></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="文字位置">
                    <el-radio-group v-model="form.text_location" is-button>
                        <el-tooltip content="左对齐" placement="top" effect="light">
                            <el-radio-button value="left"><icon name="iconfont icon-left"></icon></el-radio-button>
                        </el-tooltip>
                        <el-tooltip content="居中" placement="top" effect="light">
                            <el-radio-button value="center"><icon name="iconfont icon-center"></icon></el-radio-button>
                        </el-tooltip>
                        <el-tooltip content="右对齐" placement="top" effect="light">
                            <el-radio-button value="right"><icon name="iconfont icon-right"></icon></el-radio-button>
                        </el-tooltip>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="内边距">
                    <padding :value="form.text_padding" @update:value="padding_change"></padding>
                </el-form-item>
                <el-form-item label="旋转角度">
                    <slider v-model="form.text_rotate" :max="1000"></slider>
                </el-form-item>
                <el-form-item label="是否置底">
                    <el-switch v-model="form.bottom_up" />
                </el-form-item>
            </card-container>
            <div class="bg-f5 partition-line" />
            <card-container>
                <div class="mb-12">容器设置</div>
                <el-form-item label="容器宽度">
                    <slider v-model="form.com_width" :max="1000"></slider>
                </el-form-item>
                <el-form-item label="容器高度">
                    <slider v-model="form.com_height" :max="1000"></slider>
                </el-form-item>
                <el-form-item label="背景颜色">
                    <color-picker v-model="form.com_bg" default-color="#FF3F3F"></color-picker>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.bg_radius" @update:value="bg_radius_change"></radius>
                </el-form-item>
            </card-container>
            <div class="bg-f5 partition-line" />
            <card-container>
                <div class="mb-12">边框设置</div>
                <el-form-item label="边框显示">
                    <el-radio-group v-model="form.border_show" class="ml-4">
                        <el-radio :value="true">显示</el-radio>
                        <el-radio :value="false">隐藏</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="form.border_show">
                    <el-form-item label="边框颜色">
                        <color-picker v-model="form.border_color" default-color="#FF3F3F"></color-picker>
                    </el-form-item>
                    <el-form-item label="边框样式">
                        <el-radio-group v-model="form.border_style" class="ml-4">
                            <el-radio value="dashed"><div class="border-style-item" style="border: 1px dashed #979797"></div></el-radio>
                            <el-radio value="solid"><div class="border-style-item" style="border: 1px solid #979797"></div></el-radio>
                            <el-radio value="dotted"><div class="border-style-item" style="border: 1px dotted #979797"></div></el-radio>
                        </el-radio-group>
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

const padding_change = (padding: any) => {
    form.value.text_padding = Object.assign(form.value.text_padding, pick(padding, ['padding', 'padding_top', 'padding_bottom', 'padding_left', 'padding_right']));
};
const bg_radius_change = (radius: any) => {
    form.value.bg_radius = Object.assign(form.value.bg_radius, pick(radius, ['radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right']));
};

const text_change = (key: string) => {
    if (key == '2') {
        form.value.text_title = '';
    } else {
        form.value.data_source_id = '';
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
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.border-style-item {
    width: 3rem;
    height: 2rem;
}
.partition-line {
    height: 0.8rem;
}
</style>
