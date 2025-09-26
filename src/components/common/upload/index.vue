<!-- 上传组件 -->
<template>
    <el-dialog v-model="dialog_visible" class="radius-lg" width="1168" draggable :close-on-click-modal="false" :top="dialogPositionTop ? dialogPositionTop + 'px' : ''" append-to-body>
        <template #header>
            <div class="title re">
                <el-radio-group v-model="upload_type" is-button @change="upload_type_change">
                    <el-radio-button value="img" :disabled="!(const_upload_type == 'img') && isCheckConfirm">图片</el-radio-button>
                    <el-radio-button v-if="isIcon" value="icon" :disabled="!isIcon && isCheckConfirm">图标</el-radio-button>
                    <el-radio-button value="video" :disabled="!(const_upload_type == 'video') && isCheckConfirm">视频</el-radio-button>
                    <el-radio-button value="file" :disabled="!(const_upload_type == 'file') && isCheckConfirm">文件</el-radio-button>
                </el-radio-group>
                <div class="middle size-16 fw-b">附件管理</div>
            </div>
        </template>
        <div class="upload-content pa-20">
            <div v-if="upload_type != 'icon'" class="flex-row gap-40">
                <div class="left-content">
                    <div class="flex-row align-c gap-10 mb-10">
                        <el-input v-model="search_filter" placeholder="请输入分类名称" clearable>
                            <template #prefix>
                                <icon name="search" size="18"></icon>
                            </template>
                        </el-input>
                        <icon v-if="attachment_category_operate.is_add == '1'" name="add" size="18" class="c-pointer" @click="add_type"></icon>
                    </div>
                    <el-scrollbar height="490px">
                        <el-tree ref="treeRef" v-loading="tree_loading" :current-node-key="type_data[0].id" class="filter-tree" :data="type_data" node-key="id" highlight-current :props="defaultProps" empty-text="无数据" default-expand-all :filter-node-method="filter_node" @node-click="tree_node_event">
                            <template #default="{ node, data }">
                                <div class="custom-tree-node flex-row jc-sb gap-10 align-c w pr-10" :class="data.is_enable == 0 || node.parent.data.is_enable == 0 ? 'disabled bg-red' : ''">
                                    <div class="flex-1 flex-width text-line-1 block">{{ data.name }}</div>
                                    <div v-if="data.id && (attachment_category_operate.is_add == '1' || attachment_category_operate.is_edit == '1' || attachment_category_operate.is_del == '1')" class="flex-row gap-10 cr-9 category-operate c-pointer">
                                        <el-popover placement="bottom" width="70" trigger="hover">
                                            <template #reference>
                                                <div class="tree-operate-btn">
                                                    <icon name="ellipsis" size="14"></icon>
                                                </div>
                                            </template>
                                            <div class="flex-col gap-12 tree-operate">
                                                <div v-if="data.pid == 0 && attachment_category_operate.is_add == '1'" class="flex-row gap-5 c-pointer w item" @click.stop="append_type_event(data)"><icon class="icon" name="add" size="12"></icon>新增</div>
                                                <div v-if="attachment_category_operate.is_edit == '1'" class="flex-row gap-5 c-pointer w item" @click.stop="edit_type_event(data)"><icon class="icon" name="edit" size="12"></icon>编辑</div>
                                                <div v-if="attachment_category_operate.is_del == '1'" class="flex-row gap-5 c-pointer w item" @click.stop="remove_type_event(node, data)"><icon class="icon" name="del" size="12"></icon>删除</div>
                                            </div>
                                        </el-popover>
                                    </div>
                                </div>
                            </template>
                        </el-tree>
                    </el-scrollbar>
                </div>
                <div class="right-content flex-1 flex-width">
                    <div class="flex-row jc-sb align-c mb-15">
                        <div class="right-operate flex-row">
                            <el-button v-if="attachment_operate.is_upload == '1'" type="primary" plain @click="upload_model_open">上传{{ upload_type_name }}</el-button>
                            <el-button v-if="attachment_operate.is_del == '1'" @click="mult_del_event">删除{{ upload_type_name }}</el-button>
                            <!-- <el-cascader :show-all-levels="false" clearable></el-cascader> -->
                            <div v-if="attachment_operate.is_move == '1'" class="right-classify ml-12">
                                <transform-category :data="type_data_list" :check-img-ids="check_img_ids" :type="upload_type_name" :placeholder="upload_type_name + '移动至'" @call-back="transform_category_event"></transform-category>
                            </div>
                        </div>
                        <div class="right-search">
                            <el-input v-model="search_name" :placeholder="'请输入' + upload_type_name + '名称'" @change="get_attachment_list('1')">
                                <template #suffix>
                                    <icon name="search" size="18" class="c-pointer" @click="get_attachment_list('1')"></icon>
                                </template>
                            </el-input>
                        </div>
                    </div>
                    <div class="img-content pr">
                        <!-- 574px -->
                        <el-scrollbar v-loading="img_loading" height="440px">
                            <div v-if="upload_list.length > 0" class="flex-row flex-wrap align-c gap-y-15 gap-x-10 pa-10">
                                <div v-for="(item, index) in upload_list" :key="index" class="item" @click.prevent="check_img_event(item)">
                                    <el-badge :value="view_list_value.findIndex((i) => i.id === item.id) == -1 ? '' : view_list_value.findIndex((i) => i.id === item.id) + 1" class="badge flex-col gap-5 w" :hidden="view_list_value.findIndex((i) => i.id === item.id) == -1 || limit == 1">
                                        <div class="item-content re br-f5 radius">
                                            <template v-if="upload_type == 'video'">
                                                <video :src="item.url" class="w h" @error="handle_error(index)"></video>
                                                <div v-if="item.error == true" class="bg-f5 img flex-row jc-c align-c radius h w abs top-0">
                                                    <icon name="video" size="42" color="9"></icon>
                                                </div>
                                            </template>
                                            <template v-else-if="upload_type == 'file'">
                                                <div class="bg-f5 img flex-row jc-c align-c radius h w">
                                                    <icon :name="ext_file_name_list_map.filter((ext) => ext.type == item.ext).length > 0 && ext_file_name_list_map.filter((ext) => ext.type == item.ext)[0].type == item.ext ? ext_file_name_list_map.filter((ext) => ext.type == item.ext)[0].icon : 'file'" size="42" color="9"></icon>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <el-image :src="item.url" fit="contain" class="w h">
                                                    <template #error>
                                                        <div class="bg-f5 img flex-row jc-c align-c radius h w">
                                                            <icon name="error-img" size="42" color="9"></icon>
                                                        </div>
                                                    </template>
                                                </el-image>
                                            </template>
                                            <div class="check-icon fill flex-row jc-c align-c" :class="view_list_value.findIndex((i) => i.id === item.id) != -1 ? 'active' : ''">
                                                <icon name="true-o" color="f" size="26"></icon>
                                            </div>
                                            <div v-if="(upload_type == 'file' && (attachment_operate.is_edit == '1' || attachment_operate.is_del == '1')) || upload_type != 'file'" class="operate">
                                                <div class="operate-content flex-row jc-sa align-c">
                                                    <div v-if="attachment_operate.is_edit == '1'" class="flex-1 tc c-pointer" @click.stop="edit_event(item, index)">
                                                        <icon name="edit" class="flex-1" size="14" color="f"></icon>
                                                    </div>
                                                    <div v-if="upload_type != 'file'" class="operate-icon flex-1 tc c-pointer" @click.stop="preview_event(item, index)">
                                                        <icon name="eye" size="14" color="f"></icon>
                                                    </div>
                                                    <div v-if="attachment_operate.is_del == '1'" class="flex-1 tc c-pointer" @click.stop="del_event(item)">
                                                        <icon name="del" size="14" color="f"></icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-line-1 name" @click.stop>
                                            <template v-if="edit_index != -1 && edit_index === index">
                                                <el-input v-model="item.original" v-focus type="text" placeholder="请输入内容" size="small" clearable @blur="edit_index = -1" @keydown="edit_input_keydown" @change="edit_input_change" />
                                            </template>
                                            <template v-else>
                                                <div class="ptb-1 plr-7 c-pointer no-select" @dblclick.prevent="edit_index = index">
                                                    {{ item.original }}
                                                </div>
                                            </template>
                                        </div>
                                    </el-badge>
                                </div>
                            </div>
                            <div v-else>
                                <no-data height="440px"></no-data>
                            </div>
                        </el-scrollbar>
                        <div v-if="preview_switch_video && upload_type == 'video'">
                            <div class="middle clickable-area" :class="preview_url ? '' : 'hide'">
                                <!-- 视频预览 -->
                                <!-- 自动播放 -->
                                <video ref="videoPlayer" width="320" height="240" controls autoplay :src="preview_url"></video>
                            </div>
                        </div>
                        <div class="mt-10 flex-row jc-e">
                            <el-pagination :current-page="page" background :page-size="page_size" :pager-count="5" layout="prev, pager, next" :total="data_total" @current-change="current_page_change" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="icon-container">
                <div class="flex jc-e mb-10">
                    <el-input v-model="search_icon" placeholder="请输入图标名称" class="search-text" clearable></el-input>
                </div>
                <div class="icon-content">
                    <el-scrollbar height="492px">
                        <el-row v-if="icon_list.length > 0">
                            <el-col v-for="(item, index) in icon_list" :key="item.unicode" :span="4">
                                <div class="pa-10">
                                    <div class="item plr-10 ptb-20 br-c radius-md tc flex-col gap-10" :class="{ active: index === icon_index }" @click="handle_select_icon(item, index)">
                                        <i :class="`iconfont icon-${item.font_class}`"></i>
                                        <div class="text-line-1 size-14">{{ item.name }}</div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <div v-else>
                            <no-data height="500px"></no-data>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <template v-if="isCheckConfirm" #footer>
            <span class="dialog-footer">
                <el-button class="plr-28 ptb-10" @click="dialog_visible = false">取消</el-button>
                <el-button class="plr-28 ptb-10" type="primary" @click="confirm_event">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <template v-if="!isCustomDialog">
        <div class="flex-col h">
            <div v-if="model_value_upload.length > 0" class="flex-row flex-wrap gap-10 h">
                <div v-for="(item, index) in model_value_upload" :key="item.id" :class="'upload-btn upload-btn-style-' + styles + ' ' + (styles == 2 ? 'br-none' : '')" :style="'height:' + upload_size + ';width:' + upload_size + ';'" @click="replace_file_event(index)">
                    <div class="upload-del-icon" @click.stop="del_upload_event(index)">
                        <icon name="close-fillup" color="c" size="14"></icon>
                    </div>
                    <template v-if="type == 'video'">
                        <video :src="item.url" class="w h"></video>
                        <div v-if="item.error == true" class="bg-f5 img flex-row jc-c align-c radius-xs h w abs top-0">
                            <icon name="video" :size="Number(size) / 2 + ''" color="9"></icon>
                        </div>
                    </template>
                    <template v-else-if="type == 'file'">
                        <div class="bg-f5 img flex-row jc-c align-c radius-xs h w">
                            <icon :name="ext_file_name_list_map.filter((ext) => ext.type == item.type).length > 0 && ext_file_name_list_map.filter((ext) => ext.type == item.type)[0].type == item.type ? ext_file_name_list_map.filter((ext) => ext.type == item.type)[0].icon : 'file'" :size="Number(size) / 2 + ''" color="9"></icon>
                        </div>
                    </template>
                    <template v-else>
                        <el-image :src="item.url" fit="contain" class="w h radius-xs">
                            <template #error>
                                <div class="bg-f5 img flex-row jc-c align-c radius-xs h w">
                                    <icon name="error-img" :size="Number(size) / 2 + ''" color="9"></icon>
                                </div>
                            </template>
                        </el-image>
                    </template>
                    <template v-if="styles == 1">
                        <div class="upload-btn-bottom-text">替换</div>
                    </template>
                </div>
                <div v-if="limit != model_value_upload.length" :class="'upload-btn upload-btn-style-' + styles" :style="'height:' + upload_size + ';width:' + upload_size + ';'" @click="dialog_visible = true">
                    <icon name="add" :size="Number(size) / 2 + ''" color="c"></icon>
                </div>
            </div>
            <template v-else>
                <div :class="'upload-btn upload-btn-style-' + styles" :style="'height:' + upload_size + ';width:' + upload_size + ';'" @click="dialog_visible = true">
                    <div v-if="isDelete && !isEmpty(icon_value)" class="upload-del-icon" @click.stop="del_icon_event">
                        <icon name="close-fillup" color="c" size="14"></icon>
                    </div>
                    <div class="flex-col gap-10 align-c">
                        <icon :name="!isEmpty(icon_value) ? icon_value : 'add'" :size="upload_size == '100%' ? '36' : Number(size) / 2 + ''" color="c"></icon>
                        <slot></slot>
                    </div>
                </div>
            </template>
            <div v-if="isTips" class="size-12 cr-9">{{ tipsText }}</div>
        </div>
    </template>
    <!-- 图片预览 -->
    <el-image-viewer v-if="preview_switch_img && upload_type == 'img'" class="123123" :z-index="999999" :url-list="[preview_url]" teleported :hide-on-click-modal="true" @close="preview_close"></el-image-viewer>
    <upload-model v-model="upload_model_visible" :type="upload_type" :exts="upload_type == 'img' ? ext_img_name_list : upload_type == 'video' ? ext_video_name_list : ext_file_name_list" @close-all="close_all_upload_model" @close="close_upload_model"></upload-model>
    <form-upload-category v-model="upload_category_model_visible" :value="upload_category_model" :type="upload_category_type" :category-id="upload_category_id" :category-pid="upload_category_pid" @confirm="upload_category_confirm"></form-upload-category>
</template>
<script lang="ts" setup>
import { ext_img_name_list, ext_video_name_list, ext_file_name_list, ext_file_name_list_map } from './index';
import UploadAPI, { Tree } from '@/api/upload';
import { uploadStore, commonStore } from '@/store';
import { isEmpty } from 'lodash';
import search_icons from '@/assets/icons/iconfont.json';
const upload_store = uploadStore();
const common_store = commonStore();
const app = getCurrentInstance();
/**
 * @description: 图片上传
 * @param model_value_upload{uploadList[]} 默认值
 * @param visibleDialog{Boolean} 弹窗开启关闭
 * @param type{String} 上传类型 默认图片 1.图片(img) 2.视频(video) 3.文件(file)
 * @param isCustomDialog{Boolean} 是否自定义弹窗, 配置true后将不会显示上传按钮改为传v-model:visible-dialog=""来开启关闭弹窗，通过@update:v-model=""来获取最新数据
 * @param isCheckConfirm{Boolean} 弹窗是否需要操作提交取消按钮
 * @param limit{Number} 上传数量限制
 * @param isTips{Boolean} 是否显示提示文字
 * @param tipsText{String} 提示文字
 * @param size{Number|String} 上传图片大小
 * @param style{Number} 样式 0.默认样式 1.自定义样式1 2.自定义样式2
 * @param isDelete{Boolean} 是否可以删除
 * @return {*} update:model_value_upload
 */
const props = defineProps({
    type: {
        type: String,
        default: 'img', // img/video/file
    },
    isCustomDialog: {
        type: Boolean,
        default: false,
    },
    isCheckConfirm: {
        type: Boolean,
        default: true,
    },
    limit: {
        type: Number,
        default: 10,
    },
    isTips: {
        type: Boolean,
        default: false,
    },
    tipsText: {
        type: String,
        default: '建议尺寸：690*240px',
    },
    size: {
        type: [Number, String],
        default: 72,
    },
    styles: {
        type: [Number, String],
        default: 0,
    },
    isIcon: {
        type: Boolean,
        default: false,
    },
    dialogPositionTop: {
        type: Number,
        default: 0,
    },
    isDelete: {
        type: Boolean,
        default: true,
    },
});

const model_value_upload = defineModel({ type: Array as PropType<uploadList[]>, default: [] });
// 分类权限控制
const attachment_category_operate = computed(() => common_store.common.config.attachment_category_operate);
// 附件管理权限
const attachment_operate = computed(() => common_store.common.config.attachment_operate);

const view_list_value = ref<uploadList[]>([]);
// 弹窗显示
// const dialog_visible = ref(props.visibleDialog);
const dialog_visible = defineModel('visibleDialog', { type: Boolean, default: false });
watch(
    () => dialog_visible.value,
    (val) => {
        if (val) {
            if (val === true) {
                if (icon_value.value) {
                    upload_type.value = 'icon';
                } else {
                    upload_type.value = props.type;
                }

                // 获取附件列表
                get_attachment_list('1');

                icon_index.value = -1;
            }
        }
    }
);
// 弹窗上传显示
const upload_model_visible = ref(false);
// 上传类型
const upload_type = ref(props.type);
const const_upload_type = props.type;
const upload_size = computed(() => {
    const size = props.size.toString();
    return size.includes('%') ? size : size + 'px';
});
// 上传类型转换成name
const upload_type_name = computed(() => {
    switch (upload_type.value) {
        case 'video':
            return '视频';
        case 'file':
            return '文件';
        default:
            return '图片';
    }
});
// 切换图片/视频/文件
const upload_type_change = (type: any) => {
    if (type == 'icon') return false;
    view_list_value.value = [];
    get_attachment_list('1');
};

// 打开上传弹窗
const upload_model_open = () => {
    upload_model_visible.value = true;
};
//#region 分类 ----------------------------------------------------------start
const treeRef = ref();
const defaultProps = {
    children: 'items',
    label: 'name',
};
// 分类查询
const search_filter = ref('');
watch(search_filter, (val) => {
    treeRef.value!.filter(val);
});
const filter_node = (value: string, data: any): boolean => {
    if (!value) return true;
    return data.name.indexOf(value) != -1;
};
const type_data = ref<Tree[]>([]);
const all_tree = {
    id: 'all',
    pid: '',
    name: '全部',
    items: [],
    path: '',
    is_enable: 1,
    sort: '',
};
const type_data_list = ref<Tree[]>([]);
const tree_loading = ref(false);
// 查询分类列表
const get_tree = (bool: boolean = false) => {
    if ((!upload_store.is_upload_api && upload_store.category.length === 0) || bool) {
        upload_store.set_is_upload_api(true);
        tree_loading.value = true;
        UploadAPI.getTree()
            .then((res) => {
                // 将all_tree和res.data.attachment_category全部插入到type_data.value,all_tree放在数组最前面
                type_data.value = [all_tree, ...res.data.attachment_category];
                type_data_list.value = res.data.attachment_category;
                upload_store.set_category(type_data_list.value);
                tree_loading.value = false;
            })
            .catch(() => {
                upload_store.set_is_upload_api(false);
            });
    } else {
        type_data_list.value = upload_store.category;
        type_data.value = [all_tree, ...upload_store.category];
    }
};

// 分类弹窗表单数据
const upload_category_model = ref<Tree>({
    id: '',
    pid: '',
    name: '',
    path: '',
    sort: 0,
    is_enable: 1,
    items: [],
});
// 分类弹窗操作类型
const upload_category_type = ref('add');
// 分类弹窗开关
const upload_category_model_visible = ref(false);
// 添加一级分类
const add_type = () => {
    upload_category_type.value = 'add';
    upload_category_model_visible.value = true;
    upload_category_id.value = '';
    upload_category_pid.value = '';
};
// 分类操作确认回调
const upload_category_confirm = () => {
    get_tree(true);
};
const category_id = ref('');
// 左侧分类树结构节点点击事件
const tree_node_event = (data: any, a: any, b: any) => {
    // 判断是否开启状态，如果关闭则不可操作
    // if (data.is_enable == 0) return;
    // 判断是否是子节点，如果不是子节点则不可操作
    if (data.items && data.items.length > 0) return;
    category_id.value = data.id;
    get_attachment_list('1');
};
const upload_category_id = ref<number | string>('');
const upload_category_pid = ref<number | string>('');
// 添加子分类
const append_type_event = (data: Tree) => {
    upload_category_type.value = 'add';
    upload_category_id.value = '';
    upload_category_pid.value = data.id;
    upload_category_model_visible.value = true;
};
// 编辑子分类
const edit_type_event = (data: Tree) => {
    upload_category_type.value = 'edit';
    upload_category_id.value = data.id;
    upload_category_pid.value = data.pid;
    upload_category_model_visible.value = true;
    upload_category_model.value = data;
};
// 删除分类（Node报错，node使用any）
const remove_type_event = (node: any, data: Tree) => {
    app?.appContext.config.globalProperties.$common.message_box('删除后不可恢复，确定继续吗?', 'warning').then(() => {
        UploadAPI.delTree({ id: data.id }).then((res) => {
            get_tree(true);
            ElMessage({
                type: 'success',
                message: '删除成功!',
            });
        });
    });
};
//#endregion 分类 ----------------------------------------------------------end

//#region 附件 ----------------------------------------------------------start
// 总页数
// const page_total = ref(0);
// 当前页
const page = ref(1);
const page_size = ref(21);
// 总数量
const data_total = ref(0);
// 名称查询
const search_name = ref('');
// 已上传数据的列表
const upload_list = ref<uploadList[]>([]);
const img_loading = ref(false);
// 附件列表
const get_attachment_list = (type?: string) => {
    if (type) {
        page.value = 1;
    }
    img_loading.value = true;
    const new_data = {
        page: page.value,
        page_size: page_size.value,
        type: upload_type.value == 'img' ? 'image' : upload_type.value == 'video' ? 'video' : upload_type.value == 'file' ? 'file' : '',
        keywords: search_name.value,
        category_id: category_id.value == 'all' ? '' : category_id.value,
    };
    UploadAPI.getAttachmentList(new_data).then((res) => {
        const data = res.data;
        data_total.value = data.data_total;
        upload_list.value = data.data_list;
        img_loading.value = false;
        // 清除选中
        check_img_ids.value = '';
        view_list_value.value = [];
    });
};
// 分页查询
const current_page_change = (val: number) => {
    page.value = val;
    get_attachment_list();
};

const check_img_ids = ref('');
// 选择图片
const check_img_event = (item: any) => {
    const item_id = item.id;
    const index = view_list_value.value.findIndex((item: any) => item.id === item_id);
    if (index != -1) {
        view_list_value.value.splice(index, 1);
    } else {
        if (is_replace.value) {
            view_list_value.value = [item];
        } else {
            if (props.limit == 1) {
                view_list_value.value = [item];
            } else {
                view_list_value.value.push(item);
            }
        }
    }
    check_img_ids.value = view_list_value.value.map((item: any) => item.id).join(',');
};
// 预览开关
const preview_switch_img = ref(false);
const preview_switch_video = ref(false);
// 视频预览的路径
const preview_url = ref('');
// 预览视频
const video_show = (event: any) => {
    if (!preview_switch_video.value) return;

    if (!event.target.closest('.clickable-area')) {
        preview_switch_video.value = false;
        preview_url.value = '';
    }
};
// 预览图片/视频
const preview_event = (item: any, index: number) => {
    preview_url.value = item.url;
    if (upload_type.value == 'img') {
        preview_switch_img.value = true;
    } else if (upload_type.value == 'video') {
        preview_switch_video.value = true;
    }
};
// 预览关闭
const preview_close = () => {
    preview_switch_img.value = false;
};

const edit_index = ref(-1);
const edit_id = ref('');
// 编辑图片/视频/文件名称
const edit_event = (item: any, index: number) => {
    edit_index.value = index;
    edit_id.value = item.id;
};
// 输入框 输入完成
const edit_input_change = (val: string) => {
    edit_index.value = -1;
    UploadAPI.saveAttachmentName({ id: edit_id.value, original: val || '' }).then((res) => {
        ElMessage.success('修改成功!');
    });
};
const edit_input_keydown = (event: any) => {
    // 阻止回车键默认事件
    if (event.keyCode === 13) {
        edit_index.value = -1;
    }
};

// 删除图片/视频/文件
const del_event = (item: uploadList) => {
    app?.appContext.config.globalProperties.$common.message_box('删除后不可恢复，确定继续吗?', 'warning').then(() => {
        // 调用删除接口，然后，更新数据
        UploadAPI.delAttachment({ ids: item.id }).then((res) => {
            ElMessage.success('删除成功!');
            // 调用查询接口
            get_attachment_list();

            // 过滤已删除的文件
            view_list_value.value = view_list_value.value.filter((items: any) => {
                return items.id != item.id;
            });
        });
    });
};

// 附件批量删除
const mult_del_event = () => {
    if (check_img_ids.value) {
        app?.appContext.config.globalProperties.$common.message_box('删除后不可恢复，确定继续吗?', 'warning').then(() => {
            // 调用删除接口，然后，更新数据
            UploadAPI.delAttachment({ ids: check_img_ids.value }).then((res) => {
                ElMessage.success('删除成功!');
                // 调用查询接口
                get_attachment_list();
                check_img_ids.value = '';
                view_list_value.value = [];
            });
        });
    } else {
        ElMessage.warning('请先选择图片!');
    }
};
const transform_category_event = () => {
    check_img_ids.value = '';
    get_attachment_list('1');
};

//#endregion 附件 ----------------------------------------------------------end

//#region 图标 -------------------------------------------------------------start
const icon_value = defineModel('iconValue', { type: String, default: '' });
const temp_icon_value = ref('');
const search_icon = ref('');
const icon_list = computed(() => search_icons.glyphs.filter((item) => item.name.includes(search_icon.value) || item.font_class.includes(search_icon.value)));
const icon_index = ref(-1);
const handle_select_icon = (item: any, index: number) => {
    icon_index.value = index;
    temp_icon_value.value = item.font_class;
};
const del_icon_event = () => {
    icon_value.value = '';
};
//#endregion 图标 ----------------------------------------------------------end
const emit = defineEmits(['update:icon', 'operation_end']);
// 确认
const confirm_event = () => {
    dialog_visible.value = false;
    if (props.limit == 1) {
        model_value_upload.value = view_list_value.value;
    } else {
        if (is_replace.value) {
            // 替换modelValue的replace下标下的文件
            model_value_upload.value.splice(replace_index.value, 1, view_list_value.value[0]);
        } else {
            if (props.limit >= view_list_value.value.length + model_value_upload.value.length) {
                // 数组合并
                model_value_upload.value = model_value_upload.value.concat(view_list_value.value);
            } else {
                app?.appContext.config.globalProperties.$common.alert(`最多上传 ${props.limit} 个文件!`, 'warning');
            }
        }
    }
    if (view_list_value.value.length > 0) {
        icon_value.value = '';
        temp_icon_value.value = '';
        icon_index.value = -1;
    } else {
        icon_value.value = JSON.parse(JSON.stringify(temp_icon_value.value));
    }
    view_list_value.value = [];
    search_filter.value = '';
    is_replace.value = false;
    replace_index.value = -1;
    operation_end();
};
// 操作结束触发事件
const operation_end = () => {
    emit('operation_end');
};
// 替换标识
const is_replace = ref(false);
// 替换的文件的下标
const replace_index = ref(-1);
// 上传回显替换文件事件
const replace_file_event = (index: number) => {
    dialog_visible.value = true;
    is_replace.value = true;
    replace_index.value = index;
};
// 上传回显删除事件
const del_upload_event = (index: number) => {
    const new_model_val = JSON.parse(JSON.stringify(model_value_upload.value));
    new_model_val.splice(index, 1);
    model_value_upload.value = new_model_val;
};
const handle_error = (index: number) => {
    // 当视频加载失败时触发
    upload_list.value[index].error = true;
};

//#region 上传组件回调 -----------------------------------------------start
// 关闭所有上传弹窗回调
const close_all_upload_model = (data: any) => {
    if (props.isCheckConfirm) {
        dialog_visible.value = false;
        if (data.web_image.length > 0) {
            const new_web_file = {
                url: data.web_image,
            };
            if (props.limit == 1) {
                model_value_upload.value = [new_web_file];
            } else {
                if (is_replace.value) {
                    // 替换modelValue的replace下标下的文件
                    model_value_upload.value.splice(replace_index.value, 1, new_web_file);
                } else {
                    if (props.limit >= view_list_value.value.length + model_value_upload.value.length) {
                        // 数组合并
                        model_value_upload.value.push(new_web_file);
                    } else {
                        app?.appContext.config.globalProperties.$common.alert(`最多上传 ${props.limit} 个文件!`, 'warning');
                    }
                }
            }
        }
    } else {
        get_attachment_list('1');
    }
};
// 关闭上传弹窗回调
const close_upload_model = () => {
    get_attachment_list('1');
};
//#endregion 上传组件回调 -----------------------------------------------end
onMounted(() => {
    // 监听点击事件
    document.addEventListener('click', video_show);
    nextTick(() => {
        // 获取分类
        if (common_store.common.attachment_category.length > 0) {
            type_data_list.value = common_store.common.attachment_category;
            type_data.value = [all_tree, ...common_store.common.attachment_category];
            upload_store.set_category(common_store.common.attachment_category);
            upload_store.set_is_upload_api(true);
        } else {
            get_tree();
        }
    });
});

onUnmounted(() => {
    // 移除监听事件
    document.removeEventListener('click', video_show);
});
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
