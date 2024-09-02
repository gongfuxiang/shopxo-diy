<template>
    <div class="app-wrapper no-copy">
        <template v-if="!is_empty">
            <navbar v-model="form.model" @preview="preview" @save="save" @save-close="save_close" />
            <div class="app-wrapper-content flex-row">
                <app-main :diy-data="form.diy_data" :header="form.header" :footer="form.footer" @right-update="right_update"></app-main>
                <settings :key="key" :value="diy_data_item"></settings>
            </div>
        </template>
        <template v-else>
            <no-data height="100vh" img-width="300" size="40px" text="编辑数据有误"></no-data>
        </template>
    </div>
</template>

<script setup lang="ts">
import { Navbar, Settings, AppMain } from './components/index';
import defaultSettings from './components/main/index';
import { cloneDeep } from 'lodash';
import DiyAPI, { diyData } from '@/api/diy';
interface headerAndFooter {
    name: string;
    show_tabs: boolean;
    key: string;
    com_data: any;
}
interface diy_data_item {
    id: string;
    model: {
        logo: string;
        name: string;
        is_enable: string;
        describe: string;
    };
    header: headerAndFooter;
    footer: headerAndFooter;
    diy_data: Array<any>;
}
const form = ref<diy_data_item>({
    id: '',
    model: {
        logo: '',
        name: '',
        is_enable: '1',
        describe: '',
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
const is_empty = ref(false);
const init = () => {
    // 获取localStorage数据
    // const diy_data = localStorage.getItem('diy_data');
    // if (diy_data) {
    //     form.value = JSON.parse(diy_data);
    // }
    // 截取document.location.search字符串内id/后面的所有字段
    let new_data = { id: '' };
    if (document.location.search.indexOf('id/') !== -1) {
        new_data.id = document.location.search.substring(document.location.search.indexOf('id/') + 3);
        // 去除字符串的.html
        let html_index = new_data.id.indexOf('.html');
        if (html_index !== -1) {
            new_data.id = new_data.id.substring(0, html_index);
        }
    }
    if (new_data.id) {
        DiyAPI.getInit(new_data).then((res: any) => {
            if (res.data) {
                form.value = form_data_transfor_diy_data(res.data);
            } else {
                is_empty.value = true;
            }
        });
    }
};
//#endregion 页面初始化数据 ---------------------end

//#region 顶部导航回调方法 ---------------------start
const preview = () => {
    console.log('预览');
};
const save = () => {
    formmat_form_data(form.value);
};
const save_close = () => {
    formmat_form_data(form.value);
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
    // localStorage.setItem('diy_data', JSON.stringify(clone_form));
    // 数据改造
    const new_data = diy_data_transfor_form_data(clone_form);
    DiyAPI.save(new_data).then((res) => {
        ElMessage.success('保存成功');
    });
};
//#endregion 顶部导航回调方法 ---------------------end
// 数据改造
const diy_data_transfor_form_data = (clone_form: diy_data_item) => {
    return {
        id: clone_form.id,
        logo: clone_form.model.logo,
        name: clone_form.model.name,
        is_enable: clone_form.model.is_enable,
        describe: clone_form.model.describe,
        config: JSON.stringify({
            header: clone_form.header,
            footer: clone_form.footer,
            diy_data: clone_form.diy_data,
        }),
    };
};
const form_data_transfor_diy_data = (clone_form: diyData) => {
    try {
        return {
            id: clone_form.id,
            model: {
                logo: clone_form.logo,
                name: clone_form.name,
                is_enable: clone_form.is_enable,
                describe: clone_form.describe,
            },
            header: JSON.parse(clone_form.config).header,
            footer: JSON.parse(clone_form.config).footer,
            diy_data: JSON.parse(clone_form.config).diy_data,
        };
    } catch (error) {
        return {
            id: clone_form.id,
            model: {
                logo: clone_form.logo,
                name: clone_form.name,
                is_enable: clone_form.is_enable,
                describe: clone_form.describe,
            },
            header: form.value.header,
            footer: form.value.footer,
            diy_data: form.value.diy_data,
        };
    }
};
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
