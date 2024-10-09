<template>
    <el-dialog v-model="dialog_visible" class="radius-lg" width="1168" draggable append-to-body :close-on-click-modal="false" @close="close_event">
        <template #header>
            <div class="title center re">
                <div class="tc size-16 fw">主题选择</div>
            </div>
        </template>
        <div class="content pa-20 flex-row">
            <div class="img-content">
                <el-scrollbar height="480px" class="w">
                    <el-row v-if="data.length > 0">
                        <el-col v-for="(item, index) in data" :key="index" :span="8">
                            <div class="pa-10">
                                <div class="item plr-10 ptb-20 br-c radius-md tc flex-col jc-c gap-10" :class="{ active: item.id === temp_data?.id }" @click="handle_select_theme(item)">
                                    <image-empty v-model="item.url" class="img-height-auto"></image-empty>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <div v-else>
                        <no-data height="480px"></no-data>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="plr-28 ptb-10" @click="close_event">取消</el-button>
                <el-button class="plr-28 ptb-10" type="primary" @click="confirm_event">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <div class="flex-row align-c gap-10 br-d radius-sm plr-11 theme-input" @click="dialog_visible = true">
        <div class="flex-1 flex-width size-12 text-line-1">
            <text v-if="temp_data_obj != null">{{ temp_data_obj.name }}</text>
            <text v-else class="cr-9">{{ placeholder }}</text>
        </div>
        <div class="theme-icon">
            <template v-if="temp_data_obj === null || !clearButton">
                <icon name="arrow-right" size="12" color="9"></icon>
            </template>
            <template v-else>
                <div @click.stop="clear_model_value">
                    <icon name="close-o1" size="12" color="c"></icon>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash';
interface data {
    id: string;
    name: string;
    url: string;
}
const props = defineProps({
    placeholder: {
        type: String,
        default: '请选择主题',
    },
    data: {
        type: Array as PropType<data[]>,
        default: () => [],
    },
    clearButton: {
        type: Boolean,
        default: false,
    },
});
const model_value = defineModel({ type: String, default: '' });
const { data } = toRefs(props);
const dialog_visible = ref(false);
watch(
    () => dialog_visible.value,
    (val) => {
        if (val) {
            if (model_value.value) {
                temp_data.value = cloneDeep(data.value.filter((item) => item.id === model_value.value)[0]);
                temp_data_obj.value = cloneDeep(data.value.filter((item) => item.id === model_value.value)[0]);
            } else {
                temp_data.value = null;
                temp_data_obj.value = null;
            }
        }
    }
);
onMounted(() => {
    temp_data.value = cloneDeep(data.value.filter((item) => item.id === model_value.value)[0]);
    temp_data_obj.value = cloneDeep(data.value.filter((item) => item.id === model_value.value)[0]);
});
//#region 主题数据 ---------------------------------------------------start
const temp_data = ref<data | null>(null);
const temp_data_obj = ref<data | null>(null);
const handle_select_theme = (data: data) => {
    temp_data.value = data;
};
//#endregion 主题数据 ---------------------------------------------------end

// 关闭
const close_event = () => {
    dialog_visible.value = false;
};
// 确定
const confirm_event = () => {
    if (temp_data.value != null) {
        model_value.value = temp_data.value.id;
        temp_data_obj.value = temp_data.value;
        close_event();
    } else {
        ElMessage.error('请先选择主题');
    }
};
// 清空
const clear_model_value = () => {
    temp_data.value = null;
    temp_data_obj.value = null;
    model_value.value = '';
};
</script>
<style lang="scss" scoped>
.content {
    .img-content {
        margin: 0 -1rem;
        width: calc(100% + 2rem);
        .item {
            height: 22rem;
            transition: all 0.3s ease-in-out;
            background-color: #f4f4f4;
            &:hover {
                color: $cr-primary;
                border-color: $cr-primary;
                position: relative;
                scale: 1.02;
            }
            &.active {
                color: $cr-primary;
                border-color: $cr-primary;
                position: relative;
                scale: 1.02;
            }
            .img-height-auto {
                height: auto;
            }
        }
    }
}
.theme-input {
    width: 100%;
    height: 3.2rem;
    line-height: 3.2rem;
    cursor: pointer;
    position: relative;
    .theme-icon {
        position: absolute;
        right: 0;
        width: 3.4rem;
        z-index: 1;
        text-align: center;
    }
}
</style>
