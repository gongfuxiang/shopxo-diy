<template>
    <div class="auxiliary-line common-content-height">
        <el-form :model="form" label-width="70">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="导航样式">
                    <el-radio-group v-model="form.nav_style">
                        <el-radio value="image_with_text">图片加文字</el-radio>
                        <el-radio value="image">图片</el-radio>
                        <el-radio value="text">文字</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="显示设置">
                    <el-radio-group v-model="form.single_line">
                        <el-radio :value="3">三列展示</el-radio>
                        <el-radio :value="4">四列展示</el-radio>
                        <el-radio :value="5">五列展示</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="展示样式">
                    <el-radio-group v-model="form.display_style">
                        <el-radio value="fixed">固定显示</el-radio>
                        <el-radio value="slide">分页滑动</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.display_style === 'slide'" label="显示行数">
                    <el-radio-group v-model="form.row">
                        <el-radio :value="1">1行</el-radio>
                        <el-radio :value="2">2行</el-radio>
                        <el-radio :value="3">3行</el-radio>
                        <el-radio :value="4">4行</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12 flex-row align-c jc-sb">内容设置<div class="flex-row gap-10"><span class="classify-style" @click="classify_remove_all">清空</span><span class="classify-style" @click="classify_add">从分类添加</span></div></div>
                <div class="tips mt-10 mb-20 size-12">最多添加{{ form.nav_content_list.length }}张图片，建议尺寸90*90px</div>
                <drag :data="form.nav_content_list" type="card" :space-col="27" model-type="nav-group" :model-index="tabs_active_index" @remove="remove" @on-sort="on_sort" @click="tabs_list_click">
                    <template #default="scoped">
                        <div class="flex-col gap-10">
                            <div class="flex-row align-c jc-c w h">
                                <upload v-model="scoped.row.img" :limit="1" size="72"></upload>
                                <div class="flex-col flex-1 jc-c gap-20">
                                    <el-form-item label="标题" class="mb-0" label-width="50">
                                        <el-input v-model="scoped.row.title" placeholder="请输入标题" maxlength="10" show-word-limit clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="链接" class="w mb-0" label-width="50">
                                        <url-value v-model="scoped.row.link"></url-value>
                                    </el-form-item>
                                </div>
                            </div>
                            <div v-if="!isEmpty(scoped.row.subscript) && !isEmpty(scoped.row.tabs_name)" class="not-label-width flex-col gap-10 w h">
                                <!-- // 角标开关 -->
                                <el-form-item label="角标" label-width="40" class="mb-0">
                                    <el-switch v-model="scoped.row.subscript.content.seckill_subscript_show" active-value="1" inactive-value="0"></el-switch>
                                </el-form-item>
                                <!-- 内容设置 -->
                                <template v-if="tabs_active_index == scoped.index">
                                    <el-form v-if="scoped.row.subscript.content.seckill_subscript_show == '1'" :model="scoped.row.subscript.style" label-width="60">
                                        <el-tabs v-model="scoped.row.tabs_name" class="content-tabs">
                                            <el-tab-pane label="内容设置" name="content">
                                                <el-form-item label-width="0">
                                                    <div class="flex-col gap-10 w h">
                                                        <el-form-item label="类型" label-width="40">
                                                            <el-radio-group v-model="scoped.row.subscript.content.subscript_type">
                                                                <el-radio value="text">文本</el-radio>
                                                                <el-radio value="img-icon">图片或图标</el-radio>
                                                            </el-radio-group>
                                                        </el-form-item>
                                                        <el-form-item v-if="scoped.row.subscript.content.subscript_type != 'text'" label-width="40">
                                                            <upload v-model="scoped.row.subscript.content.subscript_img_src" v-model:icon-value="scoped.row.subscript.content.subscript_icon_class" is-icon :limit="1" size="50"></upload>
                                                        </el-form-item>
                                                        <el-form-item v-if="scoped.row.subscript.content.subscript_type == 'text'" label-width="40">
                                                            <el-input v-model="scoped.row.subscript.content.subscript_text" placeholder="请输入秒杀文字" clearable></el-input>
                                                        </el-form-item>
                                                    </div>
                                                </el-form-item>
                                            </el-tab-pane>
                                            <el-tab-pane label="样式设置" name="styles">
                                                <subscript-styles :value="scoped.row.subscript.style" :data="scoped.row.subscript.content" type="nav-group"></subscript-styles>
                                            </el-tab-pane>
                                        </el-tabs>
                                    </el-form>
                                </template>
                            </div>
                        </div>
                    </template>
                </drag>
                <el-button class="mt-20 mb-20 w" @click="add">+添加</el-button>
            </card-container>
        </el-form>
        <category-dialog v-model:dialog-visible="dialogVisible" @confirm_event="confirm_event"></category-dialog>
    </div>
</template>
<script setup lang="ts">
import { get_math } from "@/utils";
import { cloneDeep, isEmpty } from "lodash";
import subscriptStyle from '@/config/const/subscript-style';

interface Props {
    value: nav_group_content;
}
const props = withDefaults(defineProps<Props>(),{
    value: () => ({
        content_top: {},
        display_style: 'fixed',
        nav_style: 'image_with_text',
        single_line: 4,
        row: 1,
        nav_content_list: [
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '',
                link: {},
                tabs_name: 'content',
                // 角标配置
                subscript: {
                    content: {
                        seckill_subscript_show: '0',
                        subscript_type: 'text',
                        subscript_img_src: [],
                        subscript_icon_class: '',
                        subscript_text: '',
                    },
                    style: {
                        ...subscriptStyle,
                        padding_top: 0,
                        padding_bottom: 0,
                        padding_left: 0,
                        padding_right: 0,
                    }
                }
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '',
                link: {},
                tabs_name: 'content',
                // 角标配置
                subscript: {
                    content: {
                        seckill_subscript_show: '0',
                        subscript_type: 'text',
                        subscript_img_src: [],
                        subscript_icon_class: '',
                        subscript_text: '',
                    },
                    style: {
                        ...subscriptStyle,
                        padding_top: 0,
                        padding_bottom: 0,
                        padding_left: 0,
                        padding_right: 0,
                    }
                }
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '',
                link: {},
                tabs_name: 'content',
                // 角标配置
                subscript: {
                    content: {
                        seckill_subscript_show: '0',
                        subscript_type: 'text',
                        subscript_img_src: [],
                        subscript_icon_class: '',
                        subscript_text: '',
                    },
                    style: {
                        ...subscriptStyle,
                        padding_top: 0,
                        padding_bottom: 0,
                        padding_left: 0,
                        padding_right: 0,
                    }
                }
            },
            {
                id: get_math(), // 唯一标识使用，避免使用index作为唯一标识导致渲染节点出现问题
                img: [],
                title: '',
                link: {},
                tabs_name: 'content',
                // 角标配置
                subscript: {
                    content: {
                        seckill_subscript_show: '0',
                        subscript_type: 'text',
                        subscript_img_src: [],
                        subscript_icon_class: '',
                        subscript_text: '',
                    },
                    style: {
                        ...subscriptStyle,
                        padding_top: 0,
                        padding_bottom: 0,
                        padding_left: 0,
                        padding_right: 0,
                    }
                }
            }
        ],
    })
});

const state = reactive({
    form: props.value
});
const { form } = toRefs(state);
const tabs_active_index = ref(0);
onBeforeMount(() => {
    tabs_active_index.value = 0;
    // 历史数据处理一下，避免有新增字段导致报错
    form.value.nav_content_list.forEach((item: any) => {
        item.tabs_name = !isEmpty(item.tabs_name) ? item.tabs_name : 'content',
        // 角标配置
        item.subscript = !isEmpty(item.subscript) ? item.subscript : 
            { 
                content: {
                    seckill_subscript_show: '0',
                    subscript_type: 'text',
                    subscript_img_src: [],
                    subscript_icon_class: '',
                    subscript_text: '',
                },
                style: {
                    ...subscriptStyle,
                    padding_top: 0,
                    padding_bottom: 0,
                    padding_left: 0,
                    padding_right: 0,
                }
            }
    });
});
const add = () => {
    form.value.nav_content_list.push({
        id: get_math(),
        img: [],
        title: '',
        link: {},
        tabs_name: 'content',
        // 角标配置
        subscript: {
            content: {
                seckill_subscript_show: '0',
                subscript_type: 'text',
                subscript_img_src: [],
                subscript_icon_class: '',
                subscript_text: '',
            },
            style: {
                ...subscriptStyle,
                padding_top: 0,
                padding_bottom: 0,
                padding_left: 0,
                padding_right: 0,
            }
        }
    });
    tabs_active_index.value = form.value.nav_content_list.length - 1;
}
const remove = (index: number) => {
    if (form.value.nav_content_list.length > 0) {
        form.value.nav_content_list.splice(index, 1);
        if (form.value.nav_content_list.length > index) {
            tabs_active_index.value = index;
        } else {
            tabs_active_index.value = index - 1;
        }
    } else {
        tabs_active_index.value = 0;
    }
}
// 拖拽更新之后，更新数据
const on_sort = (new_list: nav_group[]) => {
    form.value.nav_content_list = new_list;
}
//#region 弹窗相关
const dialogVisible = ref(false);
const classify_add = () => {
    dialogVisible.value = true;
}
// 清空全部
const classify_remove_all = () => {
    form.value.nav_content_list = [];
    tabs_active_index.value = 0;
}

interface categoryList extends pageLinkList {
    image: string;
}
const confirm_event = (list: categoryList[]) => {
    list.forEach(item => {
        // 如果图片为空，则为空数组
        const img = !isEmpty(item.image) ? [{ id: Number(item.id), url: item.image, original: item.name, title: item.name, ext: '.png', type: 'img' }] : [];
        form.value.nav_content_list.push({
            id: get_math(),
            img: img,
            title: item?.name || '',
            link: {
                id: Number(item.id),
                name: item.name,
                page: `/pages/goods-search/goods-search?category_id=${ item.id }`
            },
            tabs_name: 'content',
            // 角标配置
            subscript: {
                content: {
                    seckill_subscript_show: '0',
                    subscript_type: 'text',
                    subscript_img_src: [],
                    subscript_icon_class: '',
                    subscript_text: '',
                },
                style: {
                    ...subscriptStyle,
                    padding_top: 0,
                    padding_bottom: 0,
                    padding_left: 0,
                    padding_right: 0,
                }
            }
        });
    });
}
//#endregion
//#region 选项卡展开收起
const tabs_list_click = (item: any, index: number) => {
    tabs_active_index.value = index;
}
//#endregion
</script>
<style lang="scss" scoped>
:deep(.size-12.cr-9.mt-10) {
    display: none;
}
.tips {
    color: $cr-info-dark;
}
.classify-style {
    cursor: pointer;
    color: $cr-main;
}
.not-label-width {
    :deep(.el-form-item__label) {
       width: 60px;
    }
    .card {
       padding: 0 !important;
    }
}
:deep(.content-tabs) {
    .flex-row.is-newline {
        flex-direction: column !important;
        align-items: flex-start;
    }
}
</style>
