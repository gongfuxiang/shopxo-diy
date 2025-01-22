<template>
    <card-container>
        <el-form-item label="数据类型">
            <el-radio-group v-model="form.data_type">
                <el-radio value="goods">商品</el-radio>
                <el-radio value="images">图片</el-radio>
                <el-radio value="custom">自定义</el-radio>
                <el-radio value="video">视频</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="form.data_type === 'goods'">
            <el-form-item label="主标题">
                <div class="flex-col gap-10 w">
                    <el-radio-group v-model="form.heading_title_type">
                        <el-radio value="text">文字</el-radio>
                        <el-radio value="image">图片</el-radio>
                    </el-radio-group>
                    <template v-if="form.heading_title_type == 'text'">
                        <el-input v-model="form.heading_title" placeholder="请输入主标题" clearable></el-input>
                    </template>
                    <template v-else>
                        <upload v-model="form.heading_title_img" :limit="1" size="50"></upload>
                    </template>
                </div>
            </el-form-item>
            <el-form-item label="副标题">
                <div class="flex-col gap-10 w">
                    <el-radio-group v-model="form.subtitle_title_type">
                        <el-radio value="text">文字</el-radio>
                        <el-radio value="image">图片</el-radio>
                    </el-radio-group>
                    <template v-if="form.subtitle_title_type == 'text'">
                        <el-input v-model="form.subtitle" placeholder="请输入副标题" clearable></el-input>
                    </template>
                    <template v-else>
                        <upload v-model="form.subtitle_title_img" :limit="1" size="50"></upload>
                    </template>
                </div>
            </el-form-item>
            <el-form-item label="商品排列">
                <el-radio-group v-model="form.goods_outerflex">
                    <el-radio value="row">横排</el-radio>
                    <el-radio value="col">竖排</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="内容排列">
                <el-radio-group v-model="form.goods_flex">
                    <el-radio value="row">左图右文</el-radio>
                    <el-radio value="col">上图下文</el-radio>
                    <el-radio value="col_price_float">上图下文<span class="col-price-style size-8">(价格浮动)</span></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="每屏数量">
                <slider v-model="form.goods_num" :min="1" :max="6"></slider>
            </el-form-item>
            <template v-if="is_show_image_scale && form.goods_flex == 'row'">
                <el-form-item label="图片比例">
                    <slider v-model="form.image_scale" :min="0" :max="100"></slider>
                </el-form-item>
            </template>
            <el-form-item label="展示信息" label-width="60">
                <el-checkbox-group v-model="form.is_show">
                    <el-checkbox v-for="item in list_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </template>
        <template v-else-if="form.data_type === 'images'">
            <el-form-item label="图片设置">
                <el-radio-group v-model="form.img_fit">
                    <el-radio value="contain">等比缩放</el-radio>
                    <el-radio value="fill">铺满</el-radio>
                    <el-radio value="cover">等比剪切</el-radio>
                </el-radio-group>
            </el-form-item>
        </template>
    </card-container>
    <template v-if="form.data_type == 'images'">
        <div class="bg-f5 divider-line" />
        <card-container>
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
                    <el-icon class="iconfont icon-close-fillup size-16 abs cr-c top-de-5 right-de-5" @click="img_remove(index)" />
                </div>
            </div>
            <el-button class="mt-20 mb-20 w" @click="img_add">+添加</el-button>
        </card-container>
    </template>
    <template v-else-if="form.data_type == 'goods'">
        <div class="bg-f5 divider-line" />
        <card-container>
            <div class="mb-12">商品设置</div>
            <drag-group :list="form.goods_list" img-params="images" @onsort="goods_list_sort" @remove="goods_list_remove" @replace="goods_list_replace"></drag-group>
            <el-button class="mtb-20 w" @click="goods_list_add">+添加</el-button>
            <url-value-dialog v-model:dialog-visible="url_value_dialog_visible" :type="['goods']" :multiple="url_value_multiple_bool" @update:model-value="url_value_dialog_call_back"></url-value-dialog>
        </card-container>
    </template>
    <template v-else-if="form.data_type == 'custom'">
        <div class="bg-f5 divider-line" />
        <model-custom-content :key="key" :value="form" :magic-width="form.width" :is-data-magic="true" @data_source_change="data_source_change"></model-custom-content>
    </template>
    <template v-else>
        <div class="bg-f5 divider-line" />
        <card-container>
            <div class="mb-12">视频设置</div>
            <el-form-item label="上传视频">
                <upload v-model="form.video" :limit="1" type="video"></upload>
            </el-form-item>
            <el-form-item label="视频封面">
                <upload v-model="form.video_img" :limit="1"></upload>
            </el-form-item>
        </card-container>
    </template>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import { cloneDeep } from 'lodash';

const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    }
});

const list_show_list = [
    { name: '商品名称', value: 'title' },
    { name: '商品售价', value: 'price' },
    { name: '售价单位', value: 'price_unit' },
];
const is_show_image_scale = computed(() => {
    const data = ['title', 'price', 'price_unit'];
    const list = form.value.is_show.filter((item: string) => data.includes(item));
    if (list.length > 0) {
        return true;
    } else {
        return false;
    }
});
const form = ref(props.value);

const img_add = () => {
    form.value.images_list.push({
        carousel_img: [],
        carousel_link: {},
    });
};
const img_remove = (index: number) => {
    form.value.images_list.splice(index, 1);
};
const goods_list_remove = (index: number) => {
    form.value.goods_list.splice(index, 1);
};
// 拖拽更新之后，更新数据
const goods_list_sort = (new_list: any) => {
    form.value.goods_list = cloneDeep(new_list);
};
const url_value_multiple_bool = ref(true);
const data_list_replace_index = ref(0);
const goods_list_replace = (index: number) => {
    data_list_replace_index.value = index;
    url_value_multiple_bool.value = false;
    url_value_dialog_visible.value = true;
};
const key = ref('0');
watchEffect(() => {
    form.value = props.value;
    key.value = get_math();
});

const goods_list_add = () => {
    url_value_multiple_bool.value = true;
    url_value_dialog_visible.value = true;
};
// 打开弹出框
const url_value_dialog_visible = ref(false);
// 弹出框选择的内容
const url_value_dialog_call_back = (item: any[]) => {
    if (url_value_multiple_bool.value) {
        item.forEach((item: any) => {
            form.value.goods_list.push({
                id: get_math(),
                new_cover: [],
                new_title: '',
                data: item,
            });
        });
    } else {
        form.value.goods_list[data_list_replace_index.value] = {
            id: get_math(),
            new_cover: [],
            new_title: '',
            data: item[0],
        };
    }
};

const data_source_change = (name: string) => {
    form.value.custom_mark_name = name;
};
</script>
<style lang="scss" scoped>
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
.col-price-style {
    color: red;
}
:deep(.el-checkbox-group .el-checkbox) {
    margin-right: 2rem;
}

:deep(.el-radio-group .el-radio) {
    margin-right: 2rem;
}
</style>
