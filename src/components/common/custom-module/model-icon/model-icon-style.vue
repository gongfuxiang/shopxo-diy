<template>
    <div class="w h bg-f">
        <el-form :model="form" label-width="70">
            <custom-location v-model="diy_data.location" @operation_end="operation_end"></custom-location>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">文本设置</div>
                <el-form-item label="选择图标">
                    <upload v-model:icon-value="form.icon_class" :limit="1" size="50" is-icon type="icon" @update:model-value="icon_change('1')"></upload>
                </el-form-item>
                <el-form-item label="数据字段">
                    <el-select v-model="form.data_source_field.id" value-key="id" clearable filterable placeholder="请选择数据字段" size="default" class="flex-1" @change="icon_change('2')">
                        <el-option v-for="item in options.filter((item) => item.type == 'icon')" :key="item.field" :label="item.name" :value="item.field" />
                    </el-select>
                </el-form-item>
                <el-form-item label="链接">
                    <url-value v-model="form.icon_link" @update:model-value="link_change('1')"></url-value>
                </el-form-item>
                <el-form-item label="数据链接">
                    <el-select v-model="form.data_source_link_field.id" value-key="id" clearable filterable placeholder="请选择数据链接字段" size="default" class="flex-1" @change="link_change('2')">
                        <el-option v-for="item in options.filter((item) => item.type == 'link')" :key="item.field" :label="item.name" :value="item.field" />
                    </el-select>
                </el-form-item>
                <el-form-item label="图标颜色">
                    <color-picker v-model="form.icon_color" default-color="#FF3F3F" @operation_end="operation_end"></color-picker>
                </el-form-item>
                <el-form-item label="图标大小">
                    <slider v-model="form.icon_size" :max="100" @operation_end="operation_end"></slider>
                </el-form-item>
                <el-form-item label="图标位置">
                    <el-radio-group v-model="form.icon_location" is-button @change="operation_end">
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
                    <padding :value="form.icon_padding" @update:value="padding_change" @operation_end="operation_end"></padding>
                </el-form-item>
                <el-form-item label="旋转角度">
                    <slider v-model="form.icon_rotate" :max="1000" @operation_end="operation_end"></slider>
                </el-form-item>
                <!-- <el-form-item label="是否置底">
                    <el-switch v-model="form.bottom_up" active-value="1" inactive-value="0" />
                </el-form-item> -->
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">容器设置</div>
                <el-form-item label="容器宽度">
                    <slider v-model="form.com_width" :max="1000" @operation_end="operation_end"></slider>
                </el-form-item>
                <el-form-item label="容器高度">
                    <slider v-model="form.com_height" :max="1000" @operation_end="operation_end"></slider>
                </el-form-item>
                <el-form-item label="背景颜色">
                    <mult-color-picker :value="form.color_list" :type="form.direction" @update:value="mult_color_picker_event"></mult-color-picker>
                </el-form-item>
                <el-form-item label="圆角">
                    <radius :value="form.bg_radius" @operation_end="operation_end"></radius>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <condition-config :value="form" :options="options" @operation_end="operation_end"></condition-config>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">边框设置</div>
                <el-form-item label="边框显示">
                    <el-switch v-model="form.border_show" active-value="1" inactive-value="0" @change="operation_end"/>
                </el-form-item>
                <template v-if="form.border_show == '1'">
                    <el-form-item label="边框颜色">
                        <color-picker v-model="form.border_color" default-color="#FF3F3F" @operation_end="operation_end"></color-picker>
                    </el-form-item>
                    <el-form-item label="边框样式">
                        <el-radio-group v-model="form.border_style" @change="operation_end">
                            <el-radio value="dashed"><div class="border-style-item" style="border: 1px dashed #979797"></div></el-radio>
                            <el-radio value="solid"><div class="border-style-item" style="border: 1px solid #979797"></div></el-radio>
                            <el-radio value="dotted"><div class="border-style-item" style="border: 1px dotted #979797"></div></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="边框粗细">
                        <slider v-model="form.border_size" :max="100" @operation_end="operation_end"></slider>
                    </el-form-item>
                </template>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_data_fields, get_history_name, location_compute } from '@/utils';
import { pick, isEmpty } from 'lodash';
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
    form.value.icon_padding = Object.assign(form.value.icon_padding, pick(padding, ['padding', 'padding_top', 'padding_bottom', 'padding_left', 'padding_right']));
}

const icon_change = (key: string) => {
    if (key == '2') {
        form.value.icon_title = '';
        form.value.data_source_field = get_data_fields(props.options, 'icon', form.value.data_source_field.id);
    } else {
        form.value.data_source_field = get_data_fields([], 'icon', '');
    }
    operation_end();
};
const link_change = (key: string) => {
    if (key == '2') {
        form.value.icon_link = {};
        form.value.data_source_link_field = get_data_fields(props.options, 'link', form.value.data_source_link_field.id);
    } else {
        form.value.data_source_link_field = get_data_fields([], 'link', '');
    }
    operation_end();
};
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type.toString();
    operation_end();
};
// 操作结束触发的事件
const emit = defineEmits(['operation_end']);
const operation_end = () => {
    emit('operation_end', get_history_name(diy_data.value));
};
//#region 位置计算
// 监听数据变化
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
// #endregion
</script>
<style lang="scss" scoped>
.border-style-item {
    width: 3rem;
    height: 2rem;
}
</style>
