<template>
    <el-dialog v-model="dialog_visible_category_operate" class="radius-lg" width="500" draggable append-to-body>
        <template #header>
            <div class="title center re">
                <div class="tc size-16 fw">{{ type == 'add' ? '添加' : '编辑' }}附件分类</div>
            </div>
        </template>
        <div class="mt-16 pa-20">
            <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="60" status-icon>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="路径" prop="path">
                    <el-input v-model="form.path" placeholder="请输入路径"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.sort" placeholder="请输入排序"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch v-model="form.is_enable" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="plr-28 ptb-10" @click="cancel_event(ruleFormRef)">取消</el-button>
                <el-button class="plr-28 ptb-10" type="primary" @click="confirm_event(ruleFormRef)">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { cloneDeep } from 'lodash';
import UploadAPI, { Tree } from '@/api/upload';
/**
 * @description: 分类操作
 * @param modelValue{uploadList[]} 默认值
 * @param visibleDialog{Boolean} 弹窗开启关闭
 * @param type{String} 新增add编辑edit
 * @param categoryId{String} 分类id
 * @param categoryPid{String} 分类父id
 * @return {*} update:modelValue confirm
 */
const props = defineProps({
    value: {
        type: Object as PropType<Tree>,
        default: () => {},
    },
    type: {
        type: String,
        default: 'add',
    },
    categoryId: {
        type: [String, Number],
        default: '',
    },
    categoryPid: {
        type: [String, Number],
        default: '',
    },
});
const dialog_visible_category_operate = defineModel({ type: Boolean, default: false });
const form = ref<Tree>({
    id: '',
    pid: '',
    name: '',
    path: '',
    sort: 0,
    is_enable: '1',
    items: [],
});
watch(
    () => dialog_visible_category_operate.value,
    (newValue) => {
        if (newValue && props.type !== 'add') {
            form.value = cloneDeep(props.value);
        } else {
            form.value = {
                id: '',
                pid: '',
                name: '',
                path: '',
                sort: 0,
                is_enable: '1',
                items: [],
            };
        }
    }
);

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, trigger: 'blur', message: '请输入名称' },
        { min: 1, max: 60, message: '名称长度1~60个字符', trigger: 'blur' },
    ],
    path: [
        { required: true, message: '请输入地址', trigger: 'blur' },
        { min: 1, max: 230, message: '路径长度1~230个字符', trigger: 'blur' },
    ],
});
onMounted(() => {
    if (props.type == 'add') {
        ruleFormRef.value?.resetFields();
    }
});

const cancel_event = (formEl: FormInstance | undefined) => {
    dialog_visible_category_operate.value = false;
    formEl?.resetFields();
};
const emit = defineEmits(['update:modelValue', 'confirm']);
const confirm_event = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            const new_data = {
                ...form.value,
                pid: props.categoryPid,
            };
            UploadAPI.saveTree(new_data).then((res) => {
                if (props.type == 'add') {
                    ElMessage.success('添加成功');
                } else if (props.type == 'edit') {
                    ElMessage.success('编辑成功');
                } else {
                    ElMessage.success('操作成功');
                }
                emit('confirm');
            });
            cancel_event(formEl);
        } else {
            console.log('error submit!', fields);
        }
    });
};
</script>
<style lang="scss" scoped>
.el-dialog__header {
    .title {
        height: 2.8rem;
    }
}
</style>
