<template>
    <el-dialog v-model="dialog_visible" class="radius-lg dialog-center oh" width="1168" :close-on-click-modal="false" append-to-body>
        <template #header>
            <div class="title re">
                <div class="middle size-16 fw">预览</div>
            </div>
        </template>
        <div class="flex-row iframe-content oh">
            <iframe :src="new_link" width="100%" height="100%" frameborder="0"></iframe>
        </div>
    </el-dialog>
</template>
<script setup lang="ts">
import { get_cookie } from '@/utils';
const props = defineProps({
    dataId: {
        type: String,
        default: '',
    },
});
const dialog_visible = defineModel({ type: Boolean, default: false });
const new_link = ref('');
const index = window.location.href.lastIndexOf('?s=');
const pro_url = window.location.href.substring(0, index);
// 如果是本地则使用静态tonken如果是线上则使用cookie的token
const cookie = get_cookie('admin_info');
const token = ref('');
onMounted(async () => {
    if (import.meta.env.VITE_APP_BASE_API == '/dev-api') {
        let temp_data = await import(import.meta.env.VITE_APP_BASE_API == '/dev-api' ? '../../../../temp.d.ts' : '../../../../temp_pro.d');
        token.value = '&token=' + temp_data.default.temp_token;
    } else {
        if (cookie) {
            token.value = '&token=' + JSON.parse(cookie).token;
        }
    }
});
// 监听dialog_visible
watch(
    () => dialog_visible.value,
    (newVal) => {
        if (newVal) {
            new_link.value = (import.meta.env.VITE_APP_BASE_API == '/dev-api' ? import.meta.env.VITE_APP_BASE_API_URL : pro_url) + '?s=diy/preview/id/' + props.dataId + '&system_type=default' + token.value;
        }
    }
);
</script>
<style lang="scss" scoped>
.iframe-content {
    height: 80rem;
    width: calc(100% + 3.2rem);
    margin: 0 -1.6rem -1.6rem -1.6rem;
}
</style>
