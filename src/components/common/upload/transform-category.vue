<template>
    <el-popover v-model:visible="visible_dialog" placement="bottom" width="400" trigger="hover">
        <template #reference>
            <el-input v-model="label" :placeholder="placeholder" class="pr-40" @input="handle_input">
                <template #suffix>
                    <div class="value-input-icon">
                        <icon name="arrow-top" class="re icon" :class="!visible_dialog ? 'active' : ''" size="12" color="9"></icon>
                    </div>
                </template>
            </el-input>
        </template>
        <div class="flex-col gap-10">
            <div>
                <el-cascader-panel v-model="cascader_val" :options="new_cascader" @change="cascader_change"></el-cascader-panel>
            </div>
            <div class="flex-row jc-e">
                <el-button @click="visible_dialog = false">取消</el-button>
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
interface cascaderData {
    value: string;
    label: string;
    children?: cascaderData[];
}
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
const new_cascader = ref<cascaderData[]>(cascader_data.value);
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
    get_label(cascader_data.value, category_id.value);
};
// 遍历cascader_data数据value获取label,如果没有则递归到每一项的items下
const get_label = (item: any, val: any) => {
    if (!item) return;
    item.forEach((item: any) => {
        console.log(item.value + '-' + val);
        if (item.value == val) {
            temp_label.value = item.label;
        } else {
            if (item.children && item.children.length > 0) {
                get_label(item.children, val);
            }
        }
    });
};
const handle_input = (val: any) => {
    // 过滤符合条件的数据
    if (val) {
        new_cascader.value = filterData(val, cascader_data.value);
    } else {
        new_cascader.value = cascader_data.value;
    }
};

const filterData = (input: string, data: cascaderData[]) => {
    let result = [];
    // 遍历数组
    for (let item of data) {
        // 检查当前项的name是否匹配
        if (item.label && item.label.includes(input)) {
            result.push(item);
        } else {
            if (item.children) {
                // 否则，‌检查当前项的data属性中的子项
                let subResult = item.children.filter((subItem) => subItem.label && subItem.label.includes(input));
                // 如果找到匹配的子项，‌将当前项（‌父级）‌添加到结果中
                if (subResult.length > 0) {
                    result.push({ ...item, children: subResult });
                }
            }
        }
    }

    return result;
};

const emit = defineEmits(['call-back']);
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
                emit('call-back');
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
}
.value-input-icon {
    position: absolute;
    right: 0;
    width: 3.4rem;
    z-index: 1;
    text-align: center;
    .icon {
        transition: transform 0.3s;
    }
    .active {
        transform: rotate(-180deg);
    }
}
:deep(.el-cascader-menu) {
    flex: 1;
}
</style>
