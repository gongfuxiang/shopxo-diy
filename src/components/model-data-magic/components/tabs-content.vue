<template>
    <card-container class="mb-8">
        <el-form-item label="数据类型">
            <el-radio-group v-model="form.data_type" class="ml-4">
                <el-radio value="commodity">商品</el-radio>
                <el-radio value="img">图片</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="form.data_type === 'commodity'">
            <el-form-item label="主标题">
                <el-input v-model="form.heading_title" placeholder="请输入主标题"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input v-model="form.subtitle" placeholder="请输入副标题"></el-input>
            </el-form-item>
        </template>
    </card-container>
    <card-container v-if="form.data_type == 'img'" class="mb-8">
        <div class="mb-12">图片设置</div>
        <div class="flex-col gap-20">
            <div v-for="(item, index) in form.img_list" :key="index" class="card-background box-shadow-sm re">
                <div class="flex-col align-c jc-c gap-20 w">
                    <div class="upload_style">
                        <upload v-model="item.carousel_img" :limit="1" size="100%"></upload>
                    </div>
                    <el-form-item label="图片链接" class="w mb-16" label-width="60">
                        <url-value v-model="item.carousel_link"></url-value>
                    </el-form-item>
                </div>
                <el-icon class="iconfont icon-close-o size-16 abs cr-c top-de-5 right-de-5" @click="img_remove(index)" />
            </div>
        </div>
        <el-button class="mt-20 mb-20 w" @click="img_add">+添加</el-button>
    </card-container>
    <card-container v-else class="mb-8">
        <div class="mb-12">商品设置</div>
        <drag :key="form.product_list" :data="form.product_list" :space-col="20" @remove="product_list_remove" @on-sort="product_list_sort">
            <template #default="{ row }">
                <upload v-model="row.new_src" :limit="1" size="40" styles="2"></upload>
                <el-image :src="row.url" fit="contain" class="img">
                    <template #error>
                        <div class="bg-f5 flex-row jc-c align-c radius h w">
                            <icon name="error-img" size="16" color="9"></icon>
                        </div>
                    </template>
                </el-image>
                <div class="flex-1 flex-width">
                    <url-value v-model="row.href"></url-value>
                </div>
            </template>
        </drag>
        <el-button class="mtb-20 w" @click="product_list_add">+添加</el-button>
    </card-container>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});

const form = ref(props.value);

const img_add = () => {
    form.value.img_list.push({
        carousel_img: [],
        carousel_link: {},
    });
}
const img_remove = (index: number) => {
    form.value.img_list.splice(index, 1);
}
const product_list_remove = (index: number) => {
    form.value.product_list.splice(index, 1);
};
const product_list_add = () => {
    form.value.product_list.push({
        id: get_math(),
        src: 'carousel',
        new_src: [],
        href: {},
    });
};
// 拖拽更新之后，更新数据
const product_list_sort = (new_list: any) => {
    form.value.product_list = new_list;
}

watchEffect(() => {
    form.value = props.value;
})
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.card-background {
    background: #fff;
    padding-left: 1.6rem;
    padding-right: 2rem;
    padding-top: 4.6rem;
    padding-bottom: 1.6rem;
}
.upload_style {
    width: 100%;
    height: 12.4rem;
}
</style>
