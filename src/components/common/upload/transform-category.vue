<template>
    <el-popover v-model:visible="visible_dialog" placement="bottom" width="400" trigger="click">
        <template #reference>
            <div class="flex-row align-c gap-10 br-d radius-sm plr-11 value-input">
                <div class="flex-1 flex-width size-12 text-line-1">
                    <text v-if="label">{{ label }}</text>
                    <text v-else class="cr-9">{{ placeholder }}</text>
                </div>
                <div class="value-input-icon">
                    <template v-if="!label">
                        <icon name="arrow-right" size="12" color="9"></icon>
                    </template>
                    <template v-else>
                        <div @click.stop="clear_model_value">
                            <icon name="close-o" size="12" color="c"></icon>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <div class="flex-col gap-10">
            <div>
                <el-cascader-panel v-model="cascader_val" :options="cascader_data" @change="cascader_change"></el-cascader-panel>
            </div>
            <div class="flex-row jc-e">
                <el-button type="primary" @click="visible_dialog = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </div>
    </el-popover>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash';
import UploadAPI, { Tree } from '@/api/upload';
const app = getCurrentInstance();
const props = defineProps({
    data: {
        type: Array as PropType<Tree[]>,
        default: () => [],
    },
    placeholder: {
        type: String,
        default: '请选择',
    },
    checkImgIds: {
        type: String,
        default: () => '',
    },
});
// 使用计算属性获取级联数据
const cascader_data = computed(() => {
    return props.data.map((tree) => ({
        value: tree.id,
        label: tree.name,
        children: tree.items?.map((item) => ({
            value: item.id,
            label: item.name,
        })),
    }));
});
const visible_dialog = ref(false);
watch(
    () => visible_dialog.value,
    (val) => {
        if (val && label.value == '') {
            temp_label.value = '';
            cascader_val.value = '';
        }
    }
);
const emit = defineEmits(['update:modelValue']);
const clear_model_value = () => {
    label.value = '';
    temp_label.value = '';
    cascader_val.value = '';
    console.log('清空', label.value);
};
const temp_label = ref('');
const cascader_val = ref('');
const label = ref('');
const category_id = ref('');
// 级联change事件
const cascader_change = (val: any) => {
    // 根据获取的val从data中获取label
    category_id.value = val[val.length - 1];
    temp_label.value = cascader_data.value.find((item: any) => item.value == category_id.value)?.label || '';
};
// 确定提交事件
const confirm = () => {
    console.log(props.checkImgIds);
    if (props.checkImgIds && category_id.value) {
        app?.appContext.config.globalProperties.$common.message_box('确定转移吗?', 'warning').then(() => {
            // 调用删除接口，然后，更新数据
            const new_data = {
                ids: props.checkImgIds,
                category_id: category_id.value,
            };
            UploadAPI.moveTree(new_data).then((res) => {
                visible_dialog.value = false;
                label.value = cloneDeep(temp_label.value);
                ElMessage.success('转移成功!');
            });
        });
    } else {
        if (!props.checkImgIds) {
            ElMessage.warning('请先选择图片!');
        }
        if (!category_id.value) {
            ElMessage.warning('请先选择分组!');
        }
    }
};
</script>
<style lang="scss" scoped>
.value-input {
    width: 100%;
    height: 3.2rem;
    line-height: 3.2rem;
    cursor: pointer;
    position: relative;
    .value-input-icon {
        position: absolute;
        right: 0;
        width: 3.4rem;
        z-index: 1;
        text-align: center;
    }
}
:deep(.el-cascader-menu) {
    flex: 1;
}
</style>
