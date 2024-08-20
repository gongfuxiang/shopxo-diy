<template>
    <div class="auxiliary-line">
        <el-form :model="form" label-width="60">
            <card-container class="common-content-height">
                <div class="mb-20">数据源</div>
                <el-form-item label="动态数据">
                    <el-select v-model="form.data_source" value-key="id" placeholder="请选择数据源" @change="changeDataSource">
                        <el-option v-for="item in options" :key="item.type" :label="item.name" :value="item.type" />
                    </el-select>
                </el-form-item>
                <div class="mb-20">内容设置</div>
                <el-button class="w" size="large" @click="custom_edit"><icon name="edit" size="12"></icon>自定义编辑</el-button>
            </card-container>
        </el-form>
        <Dialog ref="dialog" @accomplish="accomplish">
            <div class="flex-row h w">
                <DragIndex ref="draglist" :key="dragkey" v-model:height="center_height" :list="custom_list" @right-update="right_update"></DragIndex>
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
                    <template v-else>
                        <div class="w h flex align-c bg-f">
                            <no-data></no-data>
                        </div>
                    </template>
                </div>
            </div>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import Dialog from './components/dialog.vue';
import DragIndex from './components/index.vue';
import { cloneDeep } from 'lodash';
import CustomAPI from '@/api/custom';
import { DataSourceStore } from '@/store';
const data_source = DataSourceStore();

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

const options = ref<source_list[]>([]);
interface data_list {
    name: string;
    field: string;
    type: string;
};
interface source_list {
    name: string;
    data: data_list[];
    type: string;
};
const init = () => {
    CustomAPI.getCustominit().then((res) => {
        const { data_source } = res.data;
        options.value = data_source;
        data_source.set_data_source(data_source);
    });
}

onBeforeMount(() => {
    if (!data_source.is_data_source_api) {
        data_source.set_is_data_source_api(true);
        init();
    } else {
        options.value = data_source.data_source_list;
    }
});

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

const custom_edit = () => {
    if (!dialog.value) return;
    dialog.value.dialogVisible = true;
    dragkey.value = Math.random().toString(36).substring(2);
    custom_list = cloneDeep(form.custom_list);
    center_height.value = cloneDeep(form.height);
};

const accomplish = () => {
    if (!draglist.value) {
        return;
    } else {
        form.custom_list = draglist.value.diy_data;
    }
    form.height = center_height.value;
};
const model_data_source = ref<data_list[]>([])
const changeDataSource = (key: any) => {
    const list = options.value.filter(item => item.type == key);
    if (list.length > 0) {
        model_data_source.value = list[0].data; 
    } else {
        model_data_source.value = [];
    }
}
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
@media screen and (max-width: 1540px) {
    .settings {
        width: 40rem;
    }
}
:deep(.el-dialog) {
    margin-top: 0;
    padding: 0;
    overflow: hidden;
    .el-dialog__header {
        padding: 3rem;
        .el-dialog__title {
            font-size: 16px;
        }
        .el-dialog__headerbtn {
            font-size: 2.4rem;
            padding: 3rem;
            height: auto;
            width: auto;
        }
    }
    .el-dialog__body {
        background: #f5f5f5;
        height: calc(100% - 16.4rem);
    }
    .el-dialog__footer {
        padding: 2.4rem 3rem;
    }
}
</style>
