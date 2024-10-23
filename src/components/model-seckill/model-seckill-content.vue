<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container>
                <div class="mb-12">头部设置</div>
                <el-form-item label="头部状态">
                    <el-switch v-model="form.head_state" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <template v-if="form.head_state == '1'">
                    <el-form-item label="选择风格">
                        <theme-select v-model="form.theme" :data="base_list.themeList" @update:model-value="themeChange"></theme-select>
                    </el-form-item>
                    <el-form-item label="主题类型">
                        <el-radio-group v-model="form.title_type">
                            <el-radio value="text">文字</el-radio>
                            <el-radio value="image">图片</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="form.title_type == 'image'">
                        <el-form-item label="标题图片">
                            <upload v-model="form.title_src" :limit="1" size="50"></upload>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="标题文字">
                            <el-input v-model="form.title_text" placeholder="请输入标题文字" clearable></el-input>
                        </el-form-item>
                    </template>
                    <template v-if="form.theme != '2'">
                        <el-form-item label="按钮状态">
                            <el-switch v-model="form.button_status" active-value="1" inactive-value="0"></el-switch>
                        </el-form-item>
                        <el-form-item v-if="form.button_status == '1'" label="按钮文字">
                            <el-input v-model="form.button_text" placeholder="请输入按钮文字" clearable></el-input>
                        </el-form-item>
                    </template>
                </template>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">商品风格</div>
                <el-form-item label="风格类型">
                    <el-radio-group v-model="form.shop_style_type" @change="change_style">
                        <el-radio v-for="item in base_list.shop_style_type_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.shop_style_type == '3'" label="单行显示">
                    <el-radio-group v-model="form.carousel_col">
                        <el-radio :value="1">1个</el-radio>
                        <el-radio :value="2">2个</el-radio>
                        <el-radio :value="3">3个</el-radio>
                        <el-radio :value="4">4个</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">商品设置</div>
                <!-- <el-form-item label="商品数量">
                    <slider v-model="form.shop_number" :max="50"></slider>
                </el-form-item> -->
                <el-form-item label="展示信息">
                    <el-checkbox-group v-model="form.is_show">
                        <el-checkbox v-for="item in base_list.list_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="秒杀按钮">
                    <el-row class="w">
                        <el-col :span="24"><el-switch v-model="form.is_shop_show" active-value="1" inactive-value="0"></el-switch></el-col>
                    </el-row>
                    <el-row v-if="form.is_shop_show == '1'" class="mt-10 w">
                        <el-col :span="24">
                            <el-radio-group v-model="form.shop_type" class="mb-10" @change="change_shop_type">
                                <el-radio v-for="item in base_list.shopping_button_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                            </el-radio-group>
                            <template v-if="form.shop_type == 'text'">
                                <el-input v-model="form.shop_button_text" placeholder="请输入按钮文字"></el-input>
                            </template>
                            <template v-else>
                                <upload v-model:icon-value="form.shop_button_icon_class" is-icon type="icon" :limit="1" size="50"></upload>
                            </template>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="秒杀角标">
                    <el-row class="w">
                        <el-col :span="24"><el-switch v-model="form.seckill_subscript_show" active-value="1" inactive-value="0"></el-switch></el-col>
                    </el-row>
                    <el-row v-if="form.seckill_subscript_show == '1'" class="mt-10 w">
                        <el-col :span="24"><el-input v-model="form.subscript_text" placeholder="请输入秒杀文字" clearable></el-input></el-col>
                    </el-row>
                </el-form-item>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { commonStore } from '@/store';
const common_store = commonStore();
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    styles: {
        type: Object,
        default: () => ({}),
    },
    defaultConfig: {
        type: Object,
        default: () => ({
            // 图片不同风格下的圆角
            img_radius_0: 4,
            img_radius_1: 0,
        }),
    },
});

const form = ref(props.value);
const data = ref(props.styles);

watchEffect(() => {
    form.value = props.value;
});

const base_list = {
    themeList: [
        { id: '1', name: '风格1', url: common_store.common.config.attachment_host + `/static/diy/images/components/model-seckill/theme-1.png` },
        { id: '2', name: '风格2', url: common_store.common.config.attachment_host + `/static/diy/images/components/model-seckill/theme-2.png` },
        { id: '3', name: '风格3', url: common_store.common.config.attachment_host + `/static/diy/images/components/model-seckill/theme-3.png` },
        { id: '4', name: '风格4', url: common_store.common.config.attachment_host + `/static/diy/images/components/model-seckill/theme-4.png` },
    ],
    shop_style_type_list: [
        { name: '单列', value: '1' },
        { name: '双列', value: '2' },
        { name: '横向滑动', value: '3' },
    ],
    list_show_list: [
        { name: '商品名称', value: 'title' },
        { name: '商品简述', value: 'simple_desc' },
        { name: '商品售价', value: 'price' },
        { name: '商品原价', value: 'original_price' },
        { name: '售价单位', value: 'price_unit' },
        { name: '原价单位', value: 'original_price_unit' },
    ],
    shopping_button_list: [
        { name: '文字', value: 'text' },
        { name: '图标', value: 'icon' },
    ],
};
const is_revise = ref(false);
const change_shop_type = () => {
    is_revise.value = true;
};
// 选择某些风格时， 切换到对应的按钮
const change_style = (val: any): void => {
    form.value.shop_style_type = val;
    if (!is_revise.value) {
        if (['3'].includes(val) && form.value.shop_type == 'text') {
            form.value.shop_type = 'icon';
        } else if (['1', '2'].includes(val) && form.value.shop_type == 'icon') {
            form.value.shop_type = 'text';
        }
    }
    if (['1'].includes(val)) {
        if (data.value.shop_img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.shop_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.shop_img_radius.radius = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_bottom_left = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_bottom_right = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_top_left = props.defaultConfig.img_radius_0;
            data.value.shop_img_radius.radius_top_right = props.defaultConfig.img_radius_0;
        }
    } else {
        if (data.value.shop_img_radius.radius == props.defaultConfig.img_radius_0 || (data.value.shop_img_radius.radius_bottom_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_bottom_right == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_left == props.defaultConfig.img_radius_1 && data.value.shop_img_radius.radius_top_right == props.defaultConfig.img_radius_1)) {
            data.value.shop_img_radius.radius = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_bottom_left = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_bottom_right = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_top_left = props.defaultConfig.img_radius_1;
            data.value.shop_img_radius.radius_top_right = props.defaultConfig.img_radius_1;
        }
    }
};

const emit = defineEmits(['update:change-theme']);
const themeChange = (val: string) => {
    emit('update:change-theme', val);
};
</script>
<style lang="scss" scoped>
.card,
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>
