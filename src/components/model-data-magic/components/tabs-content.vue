<template>
    <card-container class="mb-8">
        <el-form-item label="数据类型">
            <el-radio-group v-model="form.data_type">
                <el-radio value="goods">商品</el-radio>
                <el-radio value="images">图片</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="form.data_type === 'goods' && isShowTitle">
            <el-form-item label="主标题">
                <el-input v-model="form.heading_title" placeholder="请输入主标题"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input v-model="form.subtitle" placeholder="请输入副标题"></el-input>
            </el-form-item>
        </template>
    </card-container>
    <card-container v-if="form.data_type == 'images'" class="mb-8">
        <div class="mb-12">图片设置</div>
        <div class="flex-col gap-20">
            <div v-for="(item, index) in form.images_list" :key="index" class="card-background box-shadow-sm re">
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
        <drag-group :list="form.goods_list" img-params="images" @onsort="goods_list_sort" @remove="goods_list_remove"></drag-group>
        <el-button class="mtb-20 w" @click="goods_list_add">+添加</el-button>
        <el-form-item label="展示信息" label-width="60">
            <el-checkbox-group v-model="form.is_show">
                <el-checkbox v-for="item in list_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['goods']" multiple @update:model-value="url_value_dialog_call_back"></url-value-dialog>
    </card-container>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import { cloneDeep } from 'lodash';

const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    isShowTitle: {
        type: Boolean,
        default: true,
    }
});

const list_show_list = [{ name: '商品名称', value: 'title' }, { name: '商品售价', value: 'price' }, { name: '售价单位', value: 'price_unit' }];

const form = ref(props.value);

const img_add = () => {
    form.value.images_list.push({
        carousel_img: [],
        carousel_link: {},
    });
}
const img_remove = (index: number) => {
    form.value.images_list.splice(index, 1);
}
const goods_list_remove = (index: number) => {
    form.value.goods_list.splice(index, 1);
};
// 拖拽更新之后，更新数据
const goods_list_sort = (new_list: any) => {
    form.value.goods_list = cloneDeep(new_list);
}

watchEffect(() => {
    form.value = props.value;
});

const goods_list_add = () => {
    url_value_dialog_visible.value = true;
};
// 打开弹出框
const url_value_dialog_visible = ref(false);
// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
    item.forEach((item: any) => {
        form.value.goods_list.push({
            id: get_math(),
            new_cover: [],
            new_title: '',
            data: item,
        });
    });
};
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
:deep(.el-checkbox-group .el-checkbox){
    margin-right: 2rem;
}
</style>
