<template>
    <div class="content">
        <el-form :model="form" label-width="75" class="m-h">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="动画风格">
                    <el-radio-group v-model="form.rotation_direction">
                        <el-radio value="vertical">上下</el-radio>
                        <el-radio value="horizontal">左右</el-radio>
                        <el-radio value="translation">平移</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.rotation_direction != 'horizontal'" label="自动轮播">
                    <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
                </el-form-item>
                <el-form-item label="间隔时间">
                    <slider v-model="form.interval_time" :min="1" :max="50"></slider>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container class="card-container-br">
                <div class="mb-12">自动读取</div>
                <el-form-item label="关键字">
                    <el-input v-model="keywords" placeholder="请输入记录关键字" clearable @blur="keyword_blur"></el-input>
                </el-form-item>
                <el-form-item label="读取数量">
                    <el-input-number v-model="form.number" :min="1" :max="50" type="number" placeholder="请输入读取数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">显示内容</div>
                <el-form-item label="显示数量">
                    <el-input-number v-model="form.show_number" :min="1" :max="50" type="number" placeholder="请输入显示数量" value-on-clear="min" class="w number-show" controls-position="right"></el-input-number>
                </el-form-item>
                <el-form-item label="商品显示">
                    <el-checkbox-group v-model="form.is_show">
                        <el-checkbox v-for="item in base_list.filter(item => item.type.includes(form.rotation_direction))" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { commonStore } from '@/store';
/**
 * @description 博客列表（内容）
 * @param value{Object} 传过来的数据，用于数据渲染
 * @param styles{Object} 样式
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    styles: {
        type: Object,
        default: () => ({}),
    }
});
// 默认值
const state = reactive({
    form: props.value,
    data: props.styles,
});
// 如果需要解构，确保使用toRefs
const { form, data } = toRefs(state);
// 关键字处理
const keywords = ref(form.value.keywords);
const keyword_blur = () => {
    form.value.keywords = keywords.value;
}
const base_list = reactive([
    { name: '头像', value: 'head', type: ['vertical'] },
    { name: '昵称', value: 'nick_name', type: ['vertical'] },
    { name: '商品图', value: 'goods_image', type: ['vertical', 'horizontal'] },
    { name: '商品标题', value: 'goods_title', type: ['vertical', 'horizontal'] },
    { name: '日期时间', value: 'time', type: ['vertical', 'horizontal']},
]);
</script>
<style lang="scss" scoped>
</style>
