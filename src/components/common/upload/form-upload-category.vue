<template>
    <el-dialog v-model="dialog_visible_category_oprate" class="radius-lg" width="500" append-to-body>
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
                    <el-switch v-model="form.is_enable"></el-switch>
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
/**
 * @description: 分类操作
 * @param modelValue{uploadList[]} 默认值
 * @param visibleDialog{Boolean} 弹窗开启关闭
 * @param type{String} 新增add编辑edit
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
});
const dialog_visible_category_oprate = defineModel({ type: Boolean, default: false });
const form = ref<Tree>({
    id: '',
    name: '',
    path: '',
    sort: 0,
    is_enable: true,
    children: [],
});
watch(
    () => dialog_visible_category_oprate.value,
    (newValue) => {
        if (newValue && props.type !== 'add') {
            form.value = cloneDeep(props.value);
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
    dialog_visible_category_oprate.value = false;
    formEl?.resetFields();
};
const emit = defineEmits(['update:modelValue', 'confirm']);
const confirm_event = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            emit('confirm', form.value, props.categoryId);
            cancel_event(formEl);
        } else {
            console.log('error submit!', fields);
        }
    });
};
</script>
<style lang="scss" scoped></style>
