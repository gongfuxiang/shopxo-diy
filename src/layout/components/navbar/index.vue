<template>
    <!-- 顶部导航栏 -->
    <div class="navbar">
        <div class="nav-left">
            <icon name="arrow-left" color="f">返回</icon>
            <div class="flex-row align-c">
                <div class="name">
                    <div class="flex-row align-c gap-10">
                        <div @click="open_dialog">
                            <image-empty :src="modelValue.img" class="round img" error-img-style="width: 2.2rem;height: 2.2rem;" />
                        </div>
                        <div>{{ modelValue.name }}</div>
                        <div class="hide">
                            <upload v-model="file_img" :visible-dialog="is_dialog_visible" :limit="1" :size="44" :styles="1" @update:visible-dialog="is_dialog_visible = $event" @update:model-value="file_img_update"></upload>
                        </div>
                    </div>
                </div>
                <el-popover v-model:visible="visible" trigger="click" :width="300">
                    <div class="flex-row align-c gap-10">
                        <el-input v-model="name" placeholder="请输入模版名称" />
                        <div class="flex-row">
                            <el-button size="small" text @click="visible = false">取消</el-button>
                            <el-button size="small" type="primary" @click="modules_name">确定</el-button>
                        </div>
                    </div>
                    <template #reference>
                        <icon name="edit" color="primary"></icon>
                    </template>
                </el-popover>
            </div>
        </div>
        <div class="nav-right">
            <el-button class="btn-plain" @click="upload_manage">上传管理</el-button>
            <el-button class="btn-plain" @click="preview_event">预览</el-button>
            <el-button class="btn-plain" @click="save_event">仅保存</el-button>
            <el-button class="btn-white" @click="save_close_event">保存关闭</el-button>
        </div>
    </div>
    <upload v-model:visible-dialog="is_custom_dialog" is-custom-dialog :is-check-confirm="false"></upload>
</template>
<script setup lang="ts">
const modelValue = defineModel({ type: Object, default: {} });
// #region 变量 --------------------start
const visible = ref(false);
const name = ref('');
const file_img = ref([]);
const is_dialog_visible = ref(false);
const is_custom_dialog = ref(false);
// #endregion 变量 --------------------end

/**
 * 修改模版名称
 */
const modules_name = () => {
    if (name.value) {
        modelValue.value.name = name.value;
        visible.value = false;
    }
};
const emit = defineEmits(['preview', 'save', 'saveClose']);

// #region 上传头像 --------------------start
const open_dialog = () => {
    is_dialog_visible.value = true;
};
const file_img_update = (file: any) => {
    modelValue.value.img = file[0].url;
};
// #endregion 上传头像 --------------------end

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
