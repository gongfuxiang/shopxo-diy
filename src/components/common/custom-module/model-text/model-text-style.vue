<template>
    <div class="w h bg-f">
        <el-form :model="form" label-width="80">
            <custom-location v-model="diy_data.location" v-model:follow="form.data_follow" :is-follow="!followName.includes(diy_data.id)" :component-options="componentOptions" @operation_end="operation_end"></custom-location>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">文本设置</div>
                <el-form-item label="文本标题">
                    <el-input v-model="form.text_captions" placeholder="请输入文本内容" type="input" clearable @blur="operation_end"></el-input>
                </el-form-item>
                <el-form-item label="文本内容">
                    <div class="flex-row gap-5 align-s w">
                        <el-input v-model="form.text_title" placeholder="请输入文本内容" type="textarea" clearable :rows="4" @blur="operation_end" @input="text_change('1')"></el-input>
                        <el-button class="h" @click="copy_field"><div class="flex-col gap-5"><span>复</span><span>制</span><span>变</span><span>量</span></div></el-button>
                    </div>
                </el-form-item>
                <el-form-item label="数据字段">
                    <el-select v-model="form.data_source_field.id" value-key="id" multiple collapse-tags clearable filterable placeholder="请选择数据字段" size="default" class="flex-1" @change="text_change('2')" @blur="operation_end">
                        <el-option v-for="item in options.filter((item) => item.type == 'text')" :key="item.field" :label="item.name" :value="item.field" />
                    </el-select>
                </el-form-item>
                <el-form-item label="拼接值">
                    <div class="flex-row gap-10">
                        <el-input v-model="form.data_split.left" placeholder="数据左侧" type="input" clearable @blur="operation_end" @input="text_change('2')"></el-input>
                        <el-input v-model="form.data_split.middle" placeholder="数据中间" type="input" clearable @blur="operation_end" @input="text_change('2')"></el-input>
                        <el-input v-model="form.data_split.right" placeholder="数据右侧" type="input" clearable @blur="operation_end" @input="text_change('2')"></el-input>
                    </div>
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
                    <el-switch v-model="form.is_rich_text" active-value="1" inactive-value="0" @change="operation_end" />
                </el-form-item>
                <el-form-item v-if="form.is_rich_text == '1'" label="上下滚动">
                    <el-switch v-model="form.is_up_down" active-value="1" inactive-value="0" @change="operation_end" />
                </el-form-item>
                <el-form-item label="文字颜色">
                    <color-picker v-model="form.text_color" default-color="#FF3F3F" @operation_end="operation_end"></color-picker>
                </el-form-item>
                <el-form-item label="文字大小">
                    <el-radio-group v-model="form.text_weight" @change="operation_end">
                        <el-radio value="bold">加粗</el-radio>
                        <el-radio value="normal">正常</el-radio>
                        <el-radio value="italic">倾斜</el-radio>
                    </el-radio-group>
                    <el-form-item label="字号" label-width="50" class="mb-0 w">
                        <slider v-model="form.text_size" :max="100" @update:model-value="text_size_change" @operation_end="operation_end"></slider>
                    </el-form-item>
                    <el-form-item label="行间距" label-width="50" class="mb-0 w">
                        <slider v-model="form.line_text_size" :max="200" @operation_end="operation_end"></slider>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="字符选项">
                    <el-radio-group v-model="form.text_option" @change="operation_end">
                        <el-radio value="none"><span style="text-decoration: none">Aa</span></el-radio>
                        <el-radio value="underline"><span style="text-decoration: underline">Aa</span></el-radio>
                        <el-radio value="line-through"><span style="text-decoration: line-through">Aa</span></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="文字位置">
                    <el-radio-group v-model="form.text_location" is-button @change="operation_end">
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
                    <padding :value="form.text_padding" @operation_end="operation_end"></padding>
                </el-form-item>
                <el-form-item label="旋转角度">
                    <slider v-model="form.text_rotate" :max="1000" @operation_end="operation_end"></slider>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">容器设置</div>
                <el-form-item v-if="form.is_rich_text !== '1'" label="行宽省略">
                    <el-radio-group v-model="form.width_omit_num" @change="operation_end">
                        <el-radio value="0">不限制</el-radio>
                        <el-radio value="1">一行</el-radio>
                        <el-radio value="2">两行</el-radio>
                        <el-radio value="3">三行</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="宽度自适应">
                    <el-switch v-model="form.is_width_auto" active-value="1" inactive-value="0" @change="is_width_auto_change"/>
                </el-form-item>
                <el-form-item v-if="form.is_width_auto == '1'" label="最大宽度">
                    <slider v-model="form.max_width" :max="1000" @operation_end="container_size_change"></slider>
                </el-form-item>
                <el-form-item v-else label="容器宽度">
                    <slider v-model="form.com_width" :max="1000" @operation_end="container_size_change"></slider>
                </el-form-item>
                <el-form-item label="高度自适应">
                    <el-switch v-model="form.is_height_auto" active-value="1" inactive-value="0" @change="is_height_auto_change"/>
                </el-form-item>
                <el-form-item v-if="form.is_height_auto == '1'" label="最大高度">
                    <slider v-model="form.max_height" :max="1000" @operation_end="container_size_change"></slider>
                </el-form-item>
                <el-form-item v-else label="容器高度">
                    <slider v-model="form.com_height" :max="1000" @operation_end="container_size_change"></slider>
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
            <animation-config v-model:type="form.animation_style.type" v-model:number="form.animation_style.number" @operation_end="operation_end"></animation-config>
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
                        <slider v-model="form.border_size" :max="100" @operation_end="container_size_change"></slider>
                    </el-form-item>
                </template>
            </card-container>
        </el-form>
        <field_dialog v-model:dialog-visible="copy_field_visiable" :option="options"></field_dialog>
    </div>
</template>
<script setup lang="ts">
import { location_compute, get_data_fields, get_history_name, get_container_location } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    options: {
        type: Array<any>,
        default: () => [],
    },
    componentOptions: {
        type: Array<any>,
        default: () => [],
    },
    followName: {
        type: Array<string>,
        default: [],
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
            form.value.data_source_field.option = props.options.filter((item) => item.type == 'text' && form.value.data_source_field.id.includes(item.field));
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
        form.value.data_split = '';
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
    operation_end();
};
// 文字大小变化时，同步更新行间距
const text_size_change = (size: number) => {
    form.value.line_text_size = size;
};
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type.toString();
    operation_end();
};
// 复制字段
const copy_field_visiable = ref(false);
const copy_field = () => {
    copy_field_visiable.value = true;
};
// 操作结束触发事件
const emit = defineEmits(['operation_end']);
const operation_end = () => {
    emit('operation_end', get_history_name(diy_data.value));
};
const is_width_auto_change = (val: string | number | boolean) => {
    if (val == '1') {
        form.value.max_width = form.value.com_width;
    }
};
const is_height_auto_change = (val: string | number | boolean) => {
    if (val == '1') {
        form.value.max_height = form.value.com_height;
    }
};
// #region 位置计算
// 监听数据变化
const size_location_change = (location: { x: number, y: number, record_x: number, record_y: number, staging_y: number }) => {
    diy_data.value.location.x = location_compute(form.value.com_width, location.x, 390);
    diy_data.value.location.y = location_compute(form.value.com_height, location.y, center_height.value);
    diy_data.value.location.record_x = location_compute(form.value.com_width, location.record_x, 390);
    diy_data.value.location.record_y = location_compute(form.value.com_height, location.record_y, center_height.value);
    diy_data.value.location.staging_y = location_compute(form.value.com_height, location.staging_y, center_height.value);
    form.value.staging_height = form.value.com_height;
}
// 组件大小变化触发事件
const container_size_change = () => {
    const { spacing = 0, type = 'left', id = '' } = form.value.data_follow;
    if (id != '') {
        // 获取新的位置
        const { x: new_x, y: new_y } = get_container_location(props.componentOptions, id, type, spacing, diy_data.value.location.x, diy_data.value.location.y);
        // 重新更新位置信息
        diy_data.value.location = { x: new_x, y: new_y, record_x: new_x, record_y: new_y, staging_y: new_y };
        size_location_change(diy_data.value.location);
    }
    operation_end();
}
// 监听数据变化
watch(() => diy_data.value, (val) => {
    size_location_change(val.location);
},{ immediate: true, deep: true });
// #endregion
</script>
<style lang="scss" scoped>
.border-style-item {
    width: 3rem;
    height: 2rem;
}
</style>
