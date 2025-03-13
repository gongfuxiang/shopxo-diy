<template>
    <div class="content">
        <el-form :model="form" label-width="75" class="m-h">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.theme" @change="theme_change">
                        <el-radio v-for="item in base_list.theme_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.theme == '3'" label="轮播列数">
                    <el-radio-group v-model="form.carousel_col">
                        <el-radio :value="1">单列展示</el-radio>
                        <el-radio :value="2">两列展示</el-radio>
                        <el-radio :value="3">三列展示</el-radio>
                        <el-radio :value="4">四列展示</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container class="card-container-br">
                <div class="mb-12">门店设置</div>
                <!-- 数据筛选组件, 根据数据源类型显示不同的筛选组件 -->
                <data-filter type="realstore" :value="form" :list="form.data_list" :base-list="base_list" @add="add" @data_list_replace="data_list_replace" @data_list_remove="data_list_remove" @data_list_sort="data_list_sort"></data-filter>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">按钮设置</div>
                <el-form-item label="导航按钮" class="align-s">
                    <img-or-icon-or-text-content :value="form" type="navigation"></img-or-icon-or-text-content>
                </el-form-item>
                <el-form-item v-if="['0', '2'].includes(form.theme)" label="电话按钮" class="align-s">
                    <img-or-icon-or-text-content :value="form" type="phone"></img-or-icon-or-text-content>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">图标设置</div>
                <el-form-item label="时间图标" class="align-s">
                    <img-or-icon-or-text-content :value="form" type="time"></img-or-icon-or-text-content>
                </el-form-item>
                <el-form-item v-if="form.theme != '3'" label="地址图标" class="align-s">
                    <img-or-icon-or-text-content :value="form" type="location"></img-or-icon-or-text-content>
                </el-form-item>
            </card-container>
        </el-form>
        <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['realstore']" :multiple="url_value_multiple_bool" @update:model-value="url_value_dialog_call_back"></url-value-dialog>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import { commonStore } from '@/store';
const common_store = commonStore();
/**
 * @description 博客列表（内容）
 * @param value{Object} 传过来的数据，用于数据渲染
 * @param styles{Object} 样式
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    styles: {
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
    data: props.styles,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
const base_list = reactive({
    theme_list: [
        { name: '单列展示', value: '0', width: 50, height: 50 },
        { name: '两列展示（纵向）', value: '1', width:180, height: 180 },
        { name: '大图展示', value: '2', width:0, height: 180 },
        { name: '左右滑动展示', value: '3', width:0, height: 0 },
    ],
    data_type_list: [
        { name: '指定门店', value: '0' },
        { name: '筛选门店', value: '1' },
    ],
    field_show_list: [
        { name: '博客标题', value: '3' },
        { name: '日期时间', value: '0' },
        { name: '浏览量', value: '1' },
        { name: '描述', value: '2' },
    ],
    field_desc_row: [
        { name: '一行', value: '1' },
        { name: '两行', value: '2' }
    ]
});

const emits = defineEmits(['theme_change']);
onMounted(() => {
    // 如果历史数据没有操作，则修改默认值
    const { content_img_width = '', content_img_height = '' } = data.value;
    // 宽度和高度为空的时候，并且不是无图模式和左右滑动模式的时候，修改默认值
    if ((typeof content_img_width != 'number' || typeof content_img_height != 'number') && !['3', '4'].includes(form.value.theme)) {
        const list = base_list.theme_list.filter(item => item.value == form.value.theme);
        if (list.length > 0) {
            emits('theme_change', list[0].width, list[0].height);
        }
    }
});
// 主题改变
const theme_change = (val: any) => {
    if (val == '3' || val == '4') {
        form.value.field_show = ['1', '3'];
    } else {
        form.value.field_show = ['0', '1', '3'];
    }
    if (val == '0') {
        if (data.value.realstore_img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.realstore_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.realstore_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.realstore_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.realstore_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.realstore_img_radius.radius = props.defaultConfig.img_radius_0;
            data.value.realstore_img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
            data.value.realstore_img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
            data.value.realstore_img_radius.radius_top_left = props.defaultConfig.img_radius_0;
            data.value.realstore_img_radius.radius_top_right = props.defaultConfig.img_radius_0;
        }
    } else {
        if (data.value.realstore_img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.realstore_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.realstore_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.realstore_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.realstore_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.realstore_img_radius.radius = props.defaultConfig.img_radius_1;
            data.value.realstore_img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
            data.value.realstore_img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
            data.value.realstore_img_radius.radius_top_left = props.defaultConfig.img_radius_1;
            data.value.realstore_img_radius.radius_top_right = props.defaultConfig.img_radius_1;
        }
    }
    // 切换风格时，将对应图片的默认值宽度和高度赋值
    const list = base_list.theme_list.filter(item => item.value == form.value.theme);
    if (list.length > 0) {
        // emits('theme_change', list[0].width, list[0].height);
        data.value.content_img_width = list[0].width;
        data.value.content_img_height = list[0].height;
    }
};
// 移除
const data_list_remove = (index: number) => {
    form.value.data_list.splice(index, 1);
};
const url_value_multiple_bool = ref(true);
const data_list_replace_index = ref(0);
// 替换
const data_list_replace = (index: number) => {
    data_list_replace_index.value = index;
    url_value_multiple_bool.value = false;
    url_value_dialog_visible.value = true;
};
// 拖动排序
const data_list_sort = (item: any) => {
    form.value.data_list = item;
};
//  新增
const add = () => {
    url_value_multiple_bool.value = true;
    url_value_dialog_visible.value = true;
};
// 开启关闭链接
const url_value_dialog_visible = ref(false);
const url_value_dialog_call_back = (item: any[]) => {
    if (url_value_multiple_bool.value) {
        item.forEach((child: any) => {
            form.value.data_list.push({
                id: get_math(),
                new_title: '',
                new_cover: [],
                data: child,
            });
        });
    } else {
        form.value.data_list[data_list_replace_index.value] = {
            id: get_math(),
            new_title: '',
            new_cover: form.value.data_list[data_list_replace_index.value]?.new_cover || [],
            data: item[0],
        };
    }
};
// 标题浮起之后博客标题的颜色和字体更新
const switch_chage = (val: string | number | boolean) => {
    if (val == '1') {
        data.value.name_color = '#fff';
        data.value.name_weight = '400';
    } else {
        data.value.name_color = '#333';
        data.value.name_weight = 'bold';
    }
};
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
}
.img {
    width: 4rem;
    height: 4rem;
}
.number-show {
    :deep(.el-input__wrapper .el-input__inner) {
        text-align: left;
    }
}
</style>
