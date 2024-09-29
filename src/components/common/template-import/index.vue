<template>
    <!-- 模版导入 -->
    <el-dialog v-model="dialogVisible" class="radius-lg" width="1168" draggable append-to-body :close-on-click-modal="false" @close="close_event">
        <template #header>
            <div class="title center re">
                <div class="tc size-16 fw">模版导入</div>
            </div>
        </template>
        <div class="url-value-content ptb-16 flex-row">
            <el-tabs v-model="temp_active" class="wh flex-1">
                <el-tab-pane label="本地导入" name="1" class="h flex-row jc-c align-c">
                    <div class="import-content">
                        <el-upload action="#" :accept="exts_text" :show-file-list="false" :auto-upload="false" :on-change="upload_change">
                            <template #trigger>
                                <div class="import-btn">
                                    <icon name="upload" color="error"></icon>
                                </div>
                            </template>
                        </el-upload>
                        <div class="cr-c size-12 flex-col gap-10 mt-20">
                            <p>1. 选择已下载的diy设计zip包</p>
                            <p>2. 导入将自动新增一条数据</p>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="模版市场" name="2"> </el-tab-pane>
            </el-tabs>
        </div>
        <template v-if="temp_active == '1'" #footer>
            <span class="dialog-footer">
                <el-button class="plr-28 ptb-10" @click="close_event">取消</el-button>
                <el-button class="plr-28 ptb-10" type="primary" @click="confirm_event">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import type { UploadFile, UploadFiles } from 'element-plus';
const app = getCurrentInstance();
/**
 * @description: 模版导入
 * @param dialogVisible {Boolean} 弹窗显示
 * @param type{String} 链接类型为空数组则表示无限制，全部可用，传过来则表示传的值可用
 * @param multiple{Boolean} 是否多选 默认单选 只生效 商品页面 goods/ 文章页面 article/ DIY页面 diy/ 设计页面 design/ 自定义页面 custom-view/ 品牌页面 brand
 * @return {*} update:dialogVisible
 */
const props = defineProps({
    type: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
});
const dialogVisible = defineModel({ type: Boolean, default: false });
const temp_active = ref('1');

//导入
const exts_text = ref('.zip');
// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
const upload_change = async (uploadFile: UploadFile) => {
    console.log('文件状态改变时的钩子', uploadFile);
};
// 取消回调
const emit = defineEmits(['close']);
const close_event = () => {
    dialogVisible.value = false;
};
// 确认回调
const confirm_event = () => {};
</script>
<style lang="scss" scoped>
.url-value-content {
    height: 57.3rem;
}
.import-content {
    text-align: center;
    .import-btn {
        width: 14rem;
        height: 14rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 7rem;
        color: $cr-primary;
        background: #e1f0ff;
        border-radius: 0.2rem;
        border: 0.1rem dashed $cr-primary;
    }
}
</style>
