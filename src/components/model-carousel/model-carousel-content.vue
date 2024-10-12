<template>
    <div class="auxiliary-line common-content-height">
        <el-form :model="form" label-width="60">
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="样式设置">
                    <el-radio-group v-model="form.carousel_type">
                        <el-radio value="inherit">样式一</el-radio>
                        <el-radio value="card">样式二</el-radio>
                        <el-radio value="oneDragOne">样式三</el-radio>
                        <el-radio value="twoDragOne">样式四</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="图片设置">
                    <el-radio-group v-model="form.img_fit">
                        <el-radio value="contain">等比缩放</el-radio>
                        <el-radio value="none">铺满</el-radio>
                        <el-radio value="cover">等比剪切</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="自动轮播">
                    <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
                </el-form-item>
                <el-form-item v-if="form.is_roll == '1'" label="间隔时间">
                    <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">内容设置</div>
                <div class="tips mt-10 mb-20 size-12">最多添加{{ form.carousel_list.length }}张图片，建议尺寸750*300px</div>
                <div class="flex-col gap-20">
                    <div v-for="(item, index) in form.carousel_list" :key="index" class="card-background box-shadow-sm re">
                        <div class="flex-col align-c jc-c gap-20 w">
                            <div class="upload_style">
                                <upload v-model="item.carousel_img" :limit="1" size="100%">
                                    <span class="upload-text">上传图片</span>
                                </upload>
                            </div>
                            <el-form-item label="图片链接" class="w">
                                <url-value v-model="item.carousel_link"></url-value>
                            </el-form-item>
                            <div class="upload_style">
                                <upload v-model="item.carousel_video" :limit="1" type="video" size="100%">
                                    <span class="upload-text">上传视频</span>
                                </upload>
                            </div>
                            <el-form-item v-if="item.carousel_video.length > 0" label="按钮名称" class="w">
                                <el-input v-model="item.video_title" placeholder="请输入视频按钮名称" clearable></el-input>
                            </el-form-item>
                        </div>
                        <el-icon class="iconfont icon-close-o1 size-16 abs cr-c top-de-5 right-de-5" @click="remove(index)" />
                    </div>
                </div>
                <el-button class="mt-20 mb-20 w" @click="add">+添加</el-button>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});

const state = reactive({
    form: props.value,
});
const { form } = toRefs(state);
const add = () => {
    form.value.carousel_list.push({
        carousel_img: [],
        carousel_video: [],
        carousel_link: {},
        video_title: "视频名称"
    });
};
const remove = (index: number) => {
    form.value.carousel_list.splice(index, 1);
};
</script>
<style lang="scss" scoped>
.card-background {
    background: #fff;
    padding-left: 1.6rem;
    padding-right: 2rem;
    padding-top: 4.6rem;
    padding-bottom: 1.6rem;
    :deep(.el-form-item) {
        margin-bottom: 0;
    }
}
.upload_style {
    width: 100%;
    height: 12.4rem;
}
.tips {
    color: $cr-info-dark;
}
.upload-text {
    font-size: 1.4rem;
    color: #999999;
    text-align: left;
    font-style: normal;
}
</style>
