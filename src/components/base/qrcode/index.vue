<!-- 二维码解析 -->
<template>
    <div class="qrcode flex-col gap-5">
        <div class="re flex-row qrcode-img">
            <div v-if="isMask" class="mask">
                {{ mask }}
            </div>
            <el-image :src="qrCodeUrl" fit="contain" class="w">
                <template #error>
                    <div class="bg-f5 img flex-row jc-c align-c radius h w">
                        <icon name="error-img" size="42"></icon>
                    </div>
                </template>
            </el-image>
        </div>
        <div class="flex-row align-c gap-10 size-12">
            {{ src }}
            <div class="copy" @click="clipboard_event">复制</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import QRCode from 'qrcode';

const props = defineProps({
    src: {
        type: String,
        default: '',
    },
    isMask: {
        type: Boolean,
        default: false,
    },
    mask: {
        type: String,
        default: () => '请先选择分组',
    },
});

const qrCodeUrl = ref('');

const generateQRCode = async (text: string, margin: number) => {
    try {
        const dataUrl = await QRCode.toDataURL(text, { margin });
        qrCodeUrl.value = dataUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
};
const clipboard_event = async () => {
    try {
        await navigator.clipboard.writeText(props.src);
    } catch (error) {
        console.error('复制失败', error);
    }
};

// 在组件挂载后自动调用生成二维码方法
onMounted(() => {
    generateQRCode(props.src.trim(), 2);
});
</script>
<style lang="scss" scoped>
.qrcode {
    .mask {
        position: absolute;
        inset: 0;
        z-index: 1;
        color: #fff;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(0.2rem);
    }
    &-img {
        width: 12rem;
        height: 12rem;
        border: 0.1rem solid #eeeeee;
    }
    .copy {
        width: 3.2rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 0.2rem;
        border: 0.1rem solid #eeeeee;
        font-size: 1.1rem;
        color: #666666;
        text-align: center;
        cursor: pointer;
        &:hover {
            color: $cr-primary;
            border-color: $cr-primary-light;
        }
    }
}
</style>
