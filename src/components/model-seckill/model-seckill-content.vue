<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container>
                <div class="mb-12">头部设置</div>
                <el-form-item label="头部状态">
                    <el-radio-group v-model="form.head_state">
                        <el-radio v-for="item in base_list.state_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="form.head_state == '1'">
                    <el-form-item label="选择风格">
                        <theme-select v-model="form.theme" :data="base_list.themeList" @update:model-value="themeChange"></theme-select>
                    </el-form-item>
                    <el-form-item label="主题类型">
                        <el-radio-group v-model="form.topic_type">
                            <el-radio value="text">文字</el-radio>
                            <el-radio value="image">图片</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="form.topic_type == 'image'">
                        <el-form-item label="标题图片">
                            <upload v-model="form.topic_src" :limit="1" size="50"></upload>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="标题文字">
                            <el-input v-model="form.topic_text" placeholder="请输入标题文字"></el-input>
                        </el-form-item>
                    </template>
                    <el-form-item label="按钮状态">
                        <el-radio-group v-model="form.button_status">
                            <el-radio v-for="item in base_list.state_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="form.button_status == '1'" label="按钮文字">
                        <el-input v-model="form.button_text" placeholder="请输入按钮文字"></el-input>
                    </el-form-item>
                </template>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">商品风格</div>
                <el-form-item label="风格类型">
                    <el-radio-group v-model="form.shop_style_type">
                        <el-radio v-for="item in base_list.shop_style_type_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.shop_style_type == '3'" label="单行显示">
                    <el-radio-group v-model="form.single_line_number" class="ml-4">
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
                <el-form-item label="商品数量">
                    <slider v-model="form.shop_number" :max="50"></slider>
                </el-form-item>
                <el-form-item label="展示信息">
                    <el-checkbox-group v-model="form.is_show">
                        <el-checkbox v-for="item in base_list.list_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="秒杀按钮">
                    <el-radio-group v-model="form.seckill_button_show">
                        <el-radio v-for="item in base_list.state_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="秒杀角标">
                    <div class="flex-col gap-10 w">
                        <el-radio-group v-model="form.seckill_subscript_show">
                            <el-radio v-for="item in base_list.state_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                        </el-radio-group>
                        <template v-if="form.seckill_subscript_show == '1'">
                            <el-input v-model="form.subscript_text" placeholder="请输入秒杀文字"></el-input>
                        </template>
                    </div>
                </el-form-item>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';

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
const state = reactive({
    form: props.value,
    data: props.styles,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);

const base_list = {
    state_list: [
        { name: '显示', value: '1' },
        { name: '隐藏', value: '0' },
    ],
    themeList: [
        { id: '1', name: '风格1', url: new URL(`../../assets/images/components/model-seckill/theme-1.png`, import.meta.url).href },
        { id: '2', name: '风格2', url: new URL(`../../assets/images/components/model-seckill/theme-2.png`, import.meta.url).href },
        { id: '3', name: '风格3', url: new URL(`../../assets/images/components/model-seckill/theme-3.png`, import.meta.url).href },
        { id: '4', name: '风格4', url: new URL(`../../assets/images/components/model-seckill/theme-4.png`, import.meta.url).href },
    ],
    shop_style_type_list: [
        { name: '单列', value: '1' },
        { name: '双列', value: '2' },
        { name: '横向滑动', value: '3' },
    ],
    list_show_list: [
        { name: '商品名称', value: 'title'},
        { name: '商品售价', value: 'price'},
        { name: '商品原价', value: 'original_price' },
        { name: '售价单位', value: 'price_unit' },
        { name: '原价单位', value: 'original_price_unit' },
    ],
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
