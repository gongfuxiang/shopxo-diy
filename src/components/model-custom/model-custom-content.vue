<template>
    <div class="auxiliary-line">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-20">数据源</div>
                <el-form-item label="动态数据">
                    <el-select v-model="form.data_source" value-key="id" placeholder="请选择数据源" filterable clearable @change="changeDataSource">
                        <el-option v-for="item in options" :key="item.type" :label="item.name" :value="item.type" />
                    </el-select>
                    <div v-if="!isEmpty(form.data_source_content) && is_show_more" class="flex-row mt-20 gap-20">
                        <div class="re flex align-c">
                            <image-empty v-model="form.data_source_content[form.img_key]" fit="contain" style="width: 10rem;height: 10rem" error-img-style="width: 3rem; height: 3rem;"></image-empty>
                            <div class="plr-10 bg-f abs replace-data size-10" @click="replace_data">替换数据</div>
                        </div>
                        <div class="flex-1 size-14 text-line-3">{{ form.data_source_content.title || form.data_source_content.name }}</div>
                    </div>
                </el-form-item>
                <div class="mb-20">内容设置</div>
                <el-button class="w" size="large" @click="custom_edit"><icon name="edit" size="12"></icon>自定义编辑</el-button>
            </card-container>
        </el-form>
        <Dialog ref="dialog" @accomplish="accomplish">
            <div class="flex-row h w">
                <DragIndex ref="draglist" :key="dragkey" v-model:height="center_height" :source-list="form.data_source_content" :list="custom_list" @right-update="right_update"></DragIndex>
                <div class="settings">
                    <template v-if="diy_data.key === 'img'">
                        <model-image-style :key="key" v-model:height="center_height" :options="model_data_source" :value="diy_data"></model-image-style>
                    </template>
                    <template v-else-if="diy_data.key == 'text'">
                        <model-text-style :key="key" v-model:height="center_height" :options="model_data_source" :value="diy_data"></model-text-style>
                    </template>
                    <template v-else-if="diy_data.key == 'auxiliary-line'">
                        <model-lines-style :key="key" v-model:height="center_height" :value="diy_data"></model-lines-style>
                    </template>
                    <template v-else-if="diy_data.key == 'icon'">
                        <model-icon-style :key="key" v-model:height="center_height" :value="diy_data"></model-icon-style>
                    </template>
                    <template v-else-if="diy_data.key == 'panel'">
                        <model-panel-style :key="key" v-model:height="center_height" :value="diy_data"></model-panel-style>
                    </template>
                    <template v-else>
                        <div class="w h flex align-c bg-f">
                            <no-data></no-data>
                        </div>
                    </template>
                </div>
            </div>
        </Dialog>
        <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="[form.data_source]" @update:model-value="url_value_dialog_call_back" @close="url_value_close"></url-value-dialog>
    </div>
</template>
<script setup lang="ts">
import Dialog from './components/dialog.vue';
import DragIndex from './components/index.vue';
import { isEmpty, cloneDeep } from 'lodash';
import CustomAPI from '@/api/custom';
import { DataSourceStore } from '@/store';
const data_source_store = DataSourceStore();

const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});

const dialog = ref<expose | null>(null);
const draglist = ref<diy_data | null>(null);
const form = reactive(props.value);
// 弹出框里的内容
let custom_list = reactive([]);
const center_height = ref(0);
const options = ref<data_source_content[]>([]);
//#region 初始化数据处理
interface data_list {
    name: string;
    field: string;
    type: string;
}
interface data_source_content {
    appoint_data?: object;
    name: string;
    data: data_list[];
    type: string;
}
const getCustominit = () => {
    CustomAPI.getCustominit().then((res) => {
        const { data_source } = res.data;
        options.value = data_source;
        data_source_store.set_data_source(data_source);
        // 数据处理
        processing_data(form.data_source);
    });
};

onBeforeMount(() => {
    if (!data_source_store.is_data_source_api) {
        data_source_store.set_is_data_source_api(true);
        getCustominit();
    } else {
        options.value = data_source_store.data_source_list;
        // 如果历史的值出现，根据历史选中的值处理一下传递的数据结构
        processing_data(form.data_source);
    }
});
// 处理显示的图片和传递到下去的数据结构
const model_data_source = ref<data_list[]>([]);
const is_show_more = ref(false);
const processing_data = (key: string) => {
    const list = options.value.filter((item) => item.type == key);
    if (list.length > 0) {
        model_data_source.value = list[0].data;
        if (!isEmpty(list[0].appoint_data)) {
            is_show_more.value = false;
        } else {
            is_show_more.value = true;
            // 从中取出包含图片的内容
            const field_list = list[0].data.filter((item) => item.type == 'images');
            // 取出图片的key
            if (field_list.length > 0) {
                form.img_key = field_list[0].field;
            }
        }
    } else {
        model_data_source.value = [];
    }
};
//#endregion
//#region 自定义编辑的内部处理逻辑
const diy_data = ref<diy>({
    key: '',
    location: {
        x: 0,
        y: 0,
        record_x: 0,
        record_y: 0,
        staging_y: 0,
    },
    com_data: {},
});
const key = ref('');
const dragkey = ref('');

const right_update = (item: any) => {
    diy_data.value = item;
    // 生成随机id
    key.value = Math.random().toString(36).substring(2);
};
// 自定义编辑的逻辑
const custom_edit = () => {
    if (!dialog.value) return;
    dialog.value.dialogVisible = true;
    dragkey.value = Math.random().toString(36).substring(2);
    custom_list = cloneDeep(form.custom_list);
    center_height.value = cloneDeep(form.height);
};
// 点击完成的处理逻辑
const accomplish = () => {
    if (!draglist.value) {
        return;
    } else {
        // 规整数据逻辑
        const list = draglist.value.diy_data.sort((a, b) => a.com_data.z_index - b.com_data.z_index);
        // 将z-index重置为初始效果
        let z_index = 0;
        if (list.length > 0) {
            list.forEach((item) => {
                if (item.com_data.z_index < 0) {
                    const new_z_index = z_index - 1;
                    item.com_data.z_index = new_z_index;
                    z_index = new_z_index;
                }
            });
        }
        form.custom_list = draglist.value.diy_data;
    }
    form.height = center_height.value;
};
//#endregion
//#region 数据源更新逻辑处理
// 打开弹出框
const url_value_dialog_visible = ref(false);
const changeDataSource = (key: string) => {
    const type_data = options.value.filter((item) => item.type == key);
    processing_data(key);
    if (type_data.length > 0 && !isEmpty(type_data[0].appoint_data)) {
        form.data_source_content = type_data[0].appoint_data;
    } else {
        form.data_source_content = {};
        if (!isEmpty(key)) {
            url_value_dialog_visible.value = true;
        }
    }
};

// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
    if (item.length > 0) {
        form.data_source_content = item[0];
    } else {
        form.data_source_content = {};
    }
};
// 弹出框关闭
const url_value_close = () => {
    if (isEmpty(form.data_source_content)) {
        form.data_source = '';
    }
};
// 替换数据
const replace_data = () => {
    if (!isEmpty(form.data_source)) {
        url_value_dialog_visible.value = true;
    }
};
//#endregion
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.settings {
    width: 46rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
}
@media screen and (max-width: 1560px) {
    .settings {
        width: 40rem;
    }
}
:deep(.el-dialog) {
    margin-top: 0;
    padding: 0;
    overflow: hidden;
    .el-dialog__header {
        padding: 2.3rem 2rem;
        .el-dialog__title {
            font-size: 16px;
        }
        .el-dialog__headerbtn {
            font-size: 2.4rem;
            padding: 2rem;
            height: auto;
            width: auto;
        }
    }
    .el-dialog__body {
        background: #f5f5f5;
        height: calc(100% - 15rem);
    }
    .el-dialog__footer {
        padding: 2.4rem 3rem;
    }
}
.replace-data {
    height: 2.4rem;
    bottom: 0.5rem;
    left: 2.1rem;
    line-height: 2.2rem;
    border-radius: 2rem;
    border: 1px solid #ddd;
    cursor: pointer;
}
</style>
