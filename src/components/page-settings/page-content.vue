<template>
    <div class="w h bg-f">
        <el-form :model="form" label-width="70">
            <card-container>
                <el-form-item label="选择风格">
                    <theme-select v-model="form.theme" :data="base_list.themeList" @update:model-value="themeChange"></theme-select>
                </el-form-item>
                <template v-if="form.theme == '1' || form.theme == '2'">
                    <el-form-item label="页面标题">
                        <el-input v-model="form.title" placeholder="请输入标题名称"></el-input>
                    </el-form-item>
                </template>
            </card-container>
            <div class="bg-f5 partition-line" />
            <card-container>
                <el-form-item label="底部导航">
                    <el-radio-group v-model="form.bottom_navigation_show" class="ml-4">
                        <el-radio v-for="item in base_list.bottom_navigation" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    }
});
const form = reactive(props.value);
const base_list = reactive({
    themeList: [
        { id: '1', name: '风格1', url: new URL(`../../assets/images/components/page-settings/theme-1.png`, import.meta.url).href },
        { id: '2', name: '风格2', url: new URL(`../../assets/images/components/page-settings/theme-2.png`, import.meta.url).href },
        { id: '3', name: '风格3', url: new URL(`../../assets/images/components/page-settings/theme-3.png`, import.meta.url).href },
        { id: '4', name: '风格4', url: new URL(`../../assets/images/components/page-settings/theme-4.png`, import.meta.url).href },
        { id: '5', name: '风格5', url: new URL(`../../assets/images/components/page-settings/theme-5.png`, import.meta.url).href },
        { id: '6', name: '风格6', url: new URL(`../../assets/images/components/page-settings/theme-6.png`, import.meta.url).href },
    ],
    bottom_navigation: [
        { name: '显示', value: '1' },
        { name: '隐藏', value: '0' },
    ],
});
const themeChange = (value: string) => {
    console.log(value);
}    
</script>
<style lang="scss" scoped>
.partition-line {
    height: 0.8rem;
}
</style>
