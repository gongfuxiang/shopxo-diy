<template>
    <div class="app-wrapper no-copy">
        <navbar v-model="form.model" @preview="preview" @save="save" @save-close="save_close" />
        <div class="app-wrapper-content flex-row">
            <app-main :diy-data="form.diy_data" :header="form.header" :footer="form.footer" @right-update="right_update"></app-main>
            <settings :key="key" :value="diy_data_item"></settings>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Navbar, Settings, AppMain } from './components/index';
import defaultSettings from './components/main/index';
import { cloneDeep } from 'lodash';
interface headerAndFooter {
    name: string;
    show_tabs: boolean;
    key: string;
    com_data: any;
}
interface diy_data_item {
    model: {
        img: string;
        name: string;
    };
    header: headerAndFooter;
    footer: headerAndFooter;
    diy_data: Array<any>;
}
const form = ref<diy_data_item>({
    model: {
        img: '',
        name: '',
    },
    header: {
        name: '页面设置',
        show_tabs: true,
        key: 'page-settings',
        com_data: defaultSettings.header_nav,
    },
    footer: {
        name: '底部导航',
        show_tabs: false,
        key: 'footer-nav',
        com_data: defaultSettings.footer_nav,
    },
    diy_data: [],
});
const diy_data_item = ref({});

const key = ref('');

const right_update = (item: any, diy: [Array<any>], header: headerAndFooter, footer: headerAndFooter) => {
    diy_data_item.value = item;
    form.value.diy_data = diy;
    form.value.header = header;
    form.value.footer = footer;
    // 生成随机id
    key.value = Math.random().toString(36).substring(2);
};
//#region 页面初始化数据 ---------------------start
// 页面加载
onMounted(() => {
    init();
});

const init = () => {
    // 获取localStorage数据
    const diy_data = localStorage.getItem('diy_data');
    if (diy_data) {
        form.value = JSON.parse(diy_data);
    }
};
//#endregion 页面初始化数据 ---------------------end

//#region 顶部导航回调方法 ---------------------start
const preview = () => {
    console.log('预览');
};
const save = () => {
    formmat_form_data(form.value);
    ElMessage.success('保存成功');
};
const save_close = () => {
    formmat_form_data(form.value);
    ElMessage.success('保存成功');
};
const formmat_form_data = (data: diy_data_item) => {
    const clone_form = cloneDeep(data);
    clone_form.header.show_tabs = true;
    clone_form.footer.show_tabs = false;
    clone_form.diy_data = clone_form.diy_data.map((item: any) => {
        return {
            ...item,
            show_tabs: false,
        };
    });
    // 将数据暂存到localStorage
    localStorage.setItem('diy_data', JSON.stringify(clone_form));
};
//#endregion 顶部导航回调方法 ---------------------end
</script>

<style scoped lang="scss">
.app-wrapper {
    background-color: #f0f2f5;
    .app-wrapper-content {
        height: calc(100vh - 8rem);
    }
}
.no-copy {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
</style>
