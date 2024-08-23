<template>
    <!-- 顶部导航栏 -->
    <div class="navbar">
        <div class="nav-left">
            <icon name="arrow-left" color="f">返回</icon>
            <div class="flex-row align-c">
                <div class="name">
                    <div class="flex-row align-c gap-10 c-pointer" @click="dialog_visible = true">
                        <image-empty :src="modelValue.logo" class="round img" error-img-style="width: 2.2rem;height: 2.2rem;" />
                        <div>{{ modelValue.name }}</div>
                        <icon name="edit" color="primary"></icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-right">
            <el-button class="btn-plain" @click="upload_manage">上传管理</el-button>
            <el-button class="btn-plain" @click="preview_event">预览</el-button>
            <el-button class="btn-plain" @click="save_event">仅保存</el-button>
            <el-button class="btn-white" @click="save_close_event">保存关闭</el-button>
        </div>
    </div>
    <el-dialog v-model="dialog_visible" class="radius-lg" width="650" draggable append-to-body>
        <template #header>
            <div class="title re">
                <div class="middle size-16 fw">附件管理</div>
            </div>
        </template>
        <div class="content pa-20">
            <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="70" status-icon>
                <el-form-item label="上传头像">
                    <upload v-model="form.logo" :limit="1"></upload>
                </el-form-item>
                <el-form-item label="模版名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入模版名称" />
                </el-form-item>
                <el-form-item label="模版描述">
                    <el-input v-model="form.describe" placeholder="请输入模版描述" :rows="4" type="textarea" />
                </el-form-item>
                <el-form-item label="模版开关">
                    <el-switch v-model="form.is_enable" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="plr-28 ptb-10" @click="dialog_visible = false">取消</el-button>
                <el-button class="plr-28 ptb-10" type="primary" @click="confirm_event(ruleFormRef)">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
const modelValue = defineModel({ type: Object, default: {} });
// #region 变量 --------------------start
const is_custom_dialog = ref(false);
const dialog_visible = ref(false);
const form = ref({
    logo: modelValue.value.logo.length > 0 ? [{ url: modelValue.value.logo }] : [],
    name: modelValue.value.name,
    describe: modelValue.value.describe,
    is_enable: modelValue.value.is_enable,
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, trigger: 'blur', message: '请输入模版名称' },
        { min: 1, max: 60, message: '名称长度1~60个字符', trigger: 'blur' },
    ],
});
// #endregion 变量 --------------------end

const emit = defineEmits(['preview', 'save', 'saveClose']);
// 点击上传管理时的事件处理函数。
const upload_manage = () => {
    is_custom_dialog.value = true;
};
//  * 点击预览时的事件处理函数。
const preview_event = () => {
    emit('preview');
};

// 点击仅保存时的事件处理函数。
const save_event = () => {
    emit('save');
};

// 点击保存并关闭时的事件处理函数。
const save_close_event = () => {
    emit('saveClose');
};

const confirm_event = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            dialog_visible.value = false;
            modelValue.value = {
                ...form.value,
                logo: form.value.logo.length > 0 ? form.value.logo[0].url : '',
            };
        } else {
            console.log('error submit!', fields);
        }
    });
};
</script>
<style lang="scss" scoped>
.navbar {
    height: 8rem;
    padding: 0 3.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    .nav-left {
        display: flex;
        align-items: center;
        .name {
            padding-left: 2rem;
            margin: 0 2rem;
            color: #fff;
            position: relative;
            &::before {
                content: '';
                display: inline-block;
                width: 0.1rem;
                height: 65%;
                background-color: #fff;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
            .img {
                width: 2.2rem;
                height: 2.2rem;
            }
        }
    }
    .nav-right {
        display: flex;
        gap: 1.2rem;
        .btn-plain {
            background-color: transparent;
            border-color: #fff;
            color: #fff;
            &:hover {
                background-color: #666;
            }
        }
        .btn-white {
            background-color: #fff;
            border-color: #fff;
            // color: #{$cr-primary};
            color: $cr-primary;
            &:hover {
                background-color: $cr-primary;
                border-color: $cr-primary;
                color: #fff;
            }
        }
    }
}
</style>
