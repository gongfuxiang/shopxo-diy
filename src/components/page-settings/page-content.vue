<template>
    <div class="w h bg-f">
        <el-form :model="form" label-width="70">
            <card-container>
                <el-form-item label="选择风格">
                    <theme-select v-model="form.theme" :data="base_list.themeList" :not-cleard-button="true" @update:model-value="themeChange"></theme-select>
                </el-form-item>
                <template v-if="['1', '2', '3'].includes(form.theme)">
                    <el-form-item v-if="['2', '3'].includes(form.theme)" label="logo">
                        <upload v-model="form.logo" :limit="1"></upload>
                    </el-form-item>
                    <el-form-item v-if="['3'].includes(form.theme)" label="链接地址">
                        <url-value v-model="form.link"></url-value>
                    </el-form-item>
                    <template v-if="['1', '2'].includes(form.theme)">
                        <el-form-item label="页面标题">
                            <el-input v-model="form.title" placeholder="请输入标题名称"></el-input>
                        </el-form-item>
                        <el-form-item label="链接地址">
                            <url-value v-model="form.link"></url-value>
                        </el-form-item>
                        <el-form-item label="展示位置">
                            <el-radio-group v-model="form.indicator_location" is-button>
                                <el-tooltip content="左对齐" placement="top" effect="light">
                                    <el-radio-button value="flex-start">
                                        <icon name="iconfont icon-left"></icon>
                                    </el-radio-button>
                                </el-tooltip>
                                <el-tooltip content="居中" placement="top" effect="light">
                                    <el-radio-button value="center">
                                        <icon name="iconfont icon-center"></icon>
                                    </el-radio-button>
                                </el-tooltip>
                                <el-tooltip content="右对齐" placement="top" effect="light">
                                    <el-radio-button value="flex-end">
                                        <icon name="iconfont icon-right"></icon>
                                    </el-radio-button>
                                </el-tooltip>
                            </el-radio-group>
                        </el-form-item>
                    </template>
                </template>
                <template v-if="['4', '5'].includes(form.theme)">
                    <el-form-item label="定位名称">
                        <el-input v-model="form.positioning_name" placeholder="请输入默认定位名称"></el-input>
                    </el-form-item>
                    <el-form-item label="箭头按钮">
                        <el-radio-group v-model="form.is_arrows_show">
                            <el-radio :value="true">显示</el-radio>
                            <el-radio :value="false">隐藏</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </template>
            </card-container>
            <div class="bg-f5 divider-line" />
            <template v-if="['3', '5'].includes(form.theme)">
                <model-search-content :value="form"></model-search-content>
                <div class="bg-f5 divider-line" />
            </template>
            <card-container>
                <el-form-item label="底部导航">
                    <el-radio-group v-model="form.bottom_navigation_show" class="ml-4">
                        <el-radio v-for="item in base_list.bottom_navigation" :key="item.value" :value="item.value">{{item.name }}</el-radio>
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
    },
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

const emit = defineEmits(['update:change-theme']);
const themeChange = (val: string) => {
    emit('update:change-theme', val);
};
</script>
<style lang="scss" scoped></style>
