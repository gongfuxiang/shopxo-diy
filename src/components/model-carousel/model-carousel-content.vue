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
                        <el-radio value="fill">铺满</el-radio>
                        <el-radio value="cover">等比剪切</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="自动轮播">
                    <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
                </el-form-item>
                <el-form-item v-if="form.is_roll == '1'" label="间隔时间">
                    <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                </el-form-item>
                <el-form-item label="高度设置">
                    <slider v-model="form.height" :max="1000"></slider>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">内容设置</div>
                <div class="tips mt-10 mb-20 size-12">最多添加{{ carousel_list.length }}张图片，建议尺寸750*300px</div>
                <div class="flex-col gap-20">
                    <div v-for="(item, index) in carousel_list" :key="index" class="card-background box-shadow-sm re">
                        <el-tabs v-model="item.tabs_name" class="content-tabs">
                            <el-tab-pane label="内容设置" name="content">
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
                            </el-tab-pane>
                            <el-tab-pane label="样式设置" name="styles">
                                <el-form-item label-width="0">
                                    <background-common v-model:color_list="item.style.color_list" v-model:direction="item.style.direction" v-model:img_style="item.style.background_img_style" v-model:img="item.style.background_img" :tooltip-content="'1.背景图的优先级比背景色的优先级高<br/>2.覆盖通用背景样式'" @mult_color_picker_event="(...value: [color_list[],  number]) => carousel_tabs_mult_color_picker_event(...value, index)" />
                                    <div class="flex-row w gap-10 mt-10">
                                        <div class="size-12">背景图模糊</div>
                                        <el-switch v-model="form.is_background_img_blur" active-value="1" inactive-value="0" />
                                    </div>
                                </el-form-item>
                            </el-tab-pane>
                        </el-tabs>
                        <el-icon class="iconfont icon-close-fillup size-16 abs cr-c top-de-5 right-de-5" @click="remove(index)" />
                    </div>
                </div>
                <el-button class="mt-20 mb-20 w" @click="add">+添加</el-button>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from "lodash";
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

const carousel_list = computed(() => {
    form.value.carousel_list.forEach((item: any) => {
        item.tabs_name = "content";
        if (isEmpty(item.style)) {
            item.style = {
                direction: '90deg',
                color_list: [{ color: '', color_percentage: undefined }],
                background_img_style: '2',
                background_img: [],
                background_img_blur: '0',
            }
        }
    });
    return form.value.carousel_list;
});

const add = () => {
    form.value.carousel_list.push({
        carousel_img: [],
        carousel_video: [],
        carousel_link: {},
        video_title: "视频名称",
        style: {
            direction: '90deg',
            color_list: [{ color: '', color_percentage: undefined }],
            background_img_style: '2',
            background_img: [],
            background_img_blur: '0',
        }
    });
};
const remove = (index: number) => {
    form.value.carousel_list.splice(index, 1);
};

// 内容区域背景渐变设置
const carousel_tabs_mult_color_picker_event = (arry: color_list[], type: number, index: number) => {
    form.value.carousel_list[index].style.color_list = arry;
    form.value.carousel_list[index].style.direction = type.toString();
};
</script>
<style lang="scss" scoped>
.card-background {
    background: #fff;
    padding-left: 1.6rem;
    padding-right: 2rem;
    // padding-top: 4.6rem;
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

:deep(.el-tabs.content-tabs) {
    .el-tabs__header.is-top {
        background: #fff;
        margin: 0;
        padding-top: 2rem;
        padding-bottom: 1rem;
    }
    .el-tabs__item.is-top {
        padding: 0;
        align-items: center;
        width: 10rem;
        font-size: 1.4rem;
    }
    .el-tabs__content {
        overflow: visible;
    }
    .el-tabs__active-bar{
        width: 100%;
    }
}
</style>
