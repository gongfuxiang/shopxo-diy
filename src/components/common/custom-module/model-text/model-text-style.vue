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
                <div class="mb-12">文本设置</div>
                <el-form-item label="文本内容">
                    <el-input v-model="form.text_title" placeholder="请输入文本内容" type="textarea" clearable :rows="3" @input="text_change('1')"></el-input>
                </el-form-item>
                <el-form-item label="数据字段">
                    <el-select v-model="form.data_source_field.id" value-key="id" multiple collapse-tags clearable filterable placeholder="请选择数据字段" size="default" class="flex-1" @change="text_change('2')">
                        <el-option v-for="item in options.filter((item) => item.type == 'text')" :key="item.field" :label="item.name" :value="item.field" />
                    </el-select>
                </el-form-item>
                <el-form-item label="链接">
                    <url-value v-model="form.text_link" @update:model-value="text_link_change('1')"></url-value>
                </el-form-item>
                <el-form-item label="数据链接">
                    <el-select v-model="form.data_source_link_field.id" value-key="id" clearable filterable placeholder="请选择数据链接字段" size="default" class="flex-1" @change="text_link_change('2')">
                        <el-option v-for="item in options.filter((item) => item.type == 'link')" :key="item.field" :label="item.name" :value="item.field" />
                    </el-select>
                </el-form-item>
                <el-form-item label="富文本">
                    <el-switch v-model="form.is_rich_text" active-value="1" inactive-value="0" />
                </el-form-item>
                <el-form-item v-if="form.is_rich_text == '1'" label="上下滚动">
                    <el-switch v-model="form.is_up_down" active-value="1" inactive-value="0" />
                </el-form-item>
                <el-form-item label="文字颜色">
                    <color-picker v-model="form.text_color" default-color="#FF3F3F"></color-picker>
                </el-form-item>
                <el-form-item label="文字大小">
                    <el-radio-group v-model="form.text_weight">
                        <el-radio value="500">加粗</el-radio>
                        <el-radio value="normal">正常</el-radio>
                        <el-radio value="italic">倾斜</el-radio>
                    </el-radio-group>
                    <el-form-item label="字号" label-width="50" class="mb-0 w">
                        <slider v-model="form.text_size" :max="100" @update:model-value="text_size_change"></slider>
                    </el-form-item>
                    <el-form-item label="行间距" label-width="50" class="mb-0 w">
                        <slider v-model="form.line_text_size" :max="200"></slider>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="字符选项">
                    <el-radio-group v-model="form.text_option">
                        <el-radio value="none"><span style="text-decoration: none">Aa</span></el-radio>
                        <el-radio value="underline"><span style="text-decoration: underline">Aa</span></el-radio>
                        <el-radio value="line-through"><span style="text-decoration: line-through">Aa</span></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="文字位置">
                    <el-radio-group v-model="form.text_location" is-button>
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
                <el-form-item label="内边距">
                    <padding :value="form.text_padding" @update:value="padding_change"></padding>
                </el-form-item>
                <el-form-item label="旋转角度">
                    <slider v-model="form.text_rotate" :max="1000"></slider>
                </el-form-item>
                <!-- <el-form-item label="是否置底">
                    <el-switch v-model="form.bottom_up" active-value="1" inactive-value="0" />
                </el-form-item> -->
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">容器设置</div>
                <el-form-item label="容器宽度">
                    <slider v-model="form.com_width" :max="1000"></slider>
                </el-form-item>
                <el-form-item label="容器高度">
                    <slider v-model="form.com_height" :max="1000"></slider>
                </el-form-item>
                <el-form-item label="背景颜色">
                    <mult-color-picker :value="form.color_list" :type="form.direction" @update:value="mult_color_picker_event"></mult-color-picker>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.bg_radius" @update:value="bg_radius_change"></radius>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">边框设置</div>
                <el-form-item label="边框显示">
                    <el-switch v-model="form.border_show" active-value="1" inactive-value="0"/>
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
                    <el-form-item label="边框粗细">
                        <slider v-model="form.border_size" :max="100"></slider>
                    </el-form-item>
                </template>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { location_compute, get_data_fields } from '@/utils';
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
// 如果历史的字体高度为空，就赋值为文字内容的大小
onBeforeMount(() => {
    if (typeof form.value.line_text_size != 'number') {
        form.value.line_text_size = form.value.text_size;
    }
});
// 数据字段切换时，更新另外一个数据
const text_change = (key: string) => {
    if (key == '2') {
        form.value.text_title = '';
        if (form.value.data_source_field.id.length > 0) {
            form.value.data_source_field.option = props.options.filter((item) => item.type == 'text' && form.value.data_source_field.id.includes(item.field))
        } else {
            form.value.data_source_field = {
                id: [],
                option: [],
            };
        }
    } else {
        // 如果没有数据，就赋值为空
        form.value.data_source_field = {
            id: [],
            option: [],
        };
    }
};
// 数据字段切换时，更新另外一个数据
const text_link_change = (key: string) => {
    if (key == '2') {
        form.value.text_link = {};
        form.value.data_source_link_field = get_data_fields(props.options, 'link', form.value.data_source_link_field.id);
    } else {
        form.value.data_source_link_field = get_data_fields([], 'link', '');
    }
};
// 文字大小变化时，同步更新行间距
const text_size_change = (size: number) => {
    form.value.line_text_size = size;
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
