<!-- 上传组件 -->
<template>
    <el-dialog v-model="dialogVisible" class="radius-lg" width="1168" draggable append-to-body :close-on-click-modal="false" @close="close_dialog">
        <template #header>
            <div class="title center re">
                <div class="tc size-16 fw-b">{{ upload_type_name }}上传</div>
            </div>
        </template>
        <div class="upload-content pa-20" @paste="handle_paste">
            <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="85" status-icon>
                <el-form-item label="上传方式">
                    <el-radio-group v-model="form.type" @change="upload_type_change">
                        <el-radio value="loc">本地上传</el-radio>
                        <el-radio value="scan">扫码上传</el-radio>
                        <el-radio value="web">网络上传</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上传至分组" prop="category_id">
                    <div class="form-item-width">
                        <el-cascader v-model="form.category_id" class="w" :options="cascader_data" placeholder="请选择" :show-all-levels="false" filterable clearable @change="category_id_change"></el-cascader>
                    </div>
                </el-form-item>
                <template v-if="form.type == 'loc'">
                    <div class="flex-row jc-sb align-c mt-30">
                        <div class="flex-row">
                            <el-upload ref="fileUpload1" v-model:file-list="file_list" multiple action="#" :accept="exts_text" :auto-upload="false" :show-file-list="false" :on-change="upload_change" :before-upload="before_upload" :limit="limit" :on-exceed="handle_exceed">
                                <template #trigger>
                                    <el-button @click="folder_mode(false)"> 上传{{ upload_type_name }} </el-button>
                                    <el-button @click="folder_mode(true)"> 上传文件夹 </el-button>
                                </template>
                            </el-upload>
                        </div>
                        <div class="flex-row align-c gap-10 size-12">
                            <div class="cr-success">上传成功:{{ form.file.filter((obj) => obj.status == 'success').length }}</div>
                            <div class="cr-error">上传失败:{{ form.file.filter((obj) => obj.status == 'error').length }}</div>
                            <div>等待上传:{{ form.file.filter((obj) => obj.status == 'ready').length }}</div>
                            <el-button @click="clear_list_event">清空列表</el-button>
                        </div>
                    </div>
                    <div class="table mt-10">
                        <div class="table-header">
                            <div class="table-row">
                                <div class="table-cell">文件名</div>
                                <div class="table-cell">文件大小</div>
                                <div class="table-cell">上传状态</div>
                                <div class="table-cell-operate">操作</div>
                            </div>
                        </div>
                        <div id="dropzone" @dragover.prevent="handle_drag_in" @dragenter="handle_drag_in" @dragleave="handle_drag_leave" @drop.prevent="handle_drop">
                            <el-scrollbar v-if="!is_dragging && form.file.length > 0" height="341px">
                                <div class="table-body">
                                    <div v-for="(item, index) in form.file" :key="item.file.name + item.file.size" class="re">
                                        <div class="progress" :style="'width:' + item.progress + '%'"></div>
                                        <div class="table-row" :class="item.status == '上传失败' ? 'bg-table-rwo-error' : ''">
                                            <div class="table-cell">
                                                <template v-if="type == 'video'">
                                                    <div class="preview-img radius-sm">
                                                        <icon name="video" size="12" color="9"></icon>
                                                    </div>
                                                </template>
                                                <template v-else-if="type == 'file'">
                                                    <div class="preview-img radius-sm">
                                                        <div class="bg-f5 img flex-row jc-c align-c radius h w">
                                                            <icon :name="ext_file_name_list_map.filter((ext) => ext.type == get_after_string(item.file.name)).length > 0 && ext_file_name_list_map.filter((ext) => ext.type == get_after_string(item.file.name))[0].type == get_after_string(item.file.name) ? ext_file_name_list_map.filter((ext) => ext.type == get_after_string(item.file.name))[0].icon : 'file'" size="12" color="9"></icon>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <el-image :src="file_to_base64(item.file)" class="preview-img radius-sm" fit="contain">
                                                        <template #error>
                                                            <div class="bg-f5 img flex-row jc-c align-c radius h w">
                                                                <icon name="error-img" size="12"></icon>
                                                            </div>
                                                        </template>
                                                    </el-image>
                                                </template>
                                                <div class="desc">{{ item.file.name }}</div>
                                            </div>
                                            <div class="table-cell">{{ annex_size_to_unit(item.file.size) }}</div>
                                            <div class="table-cell" :class="item.status">{{ item.status == 'loading' ? '上传中' : item.status == 'success' ? '上传成功' : item.status == 'error' ? '上传失败' : '等待上传' }}{{ item.status == 'loading' ? '(' + item.progress + '%)' : '' }}</div>
                                            <div class="table-cell-operate" @click="del_upload(index)">移除</div>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                            <div v-show="is_dragging || form.file.length < 1" class="folder-upload mt-20" :class="is_dragging ? 'active' : ''">
                                <el-upload ref="fileUpload2" v-model:file-list="file_list" class="upload-2" :accept="exts_text" multiple action="#" :auto-upload="false" :show-file-list="false" :on-change="upload_change" :before-upload="before_upload" :limit="limit" :on-exceed="handle_exceed">
                                    <div class="flex-col jc-c align-c">
                                        <icon name="add" size="60" color="#dbeef6"></icon>
                                        <p class="size-18 cr-c fw-b">请将需要上传的文件/文件夹拖到此处或粘贴</p>
                                    </div>
                                </el-upload>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else-if="form.type == 'scan'">
                    <el-form-item label="二维码" class="mb-10">
                        <qrcode :src="form.qrcode" :is-mask="is_mask"></qrcode>
                    </el-form-item>
                    <div class="table">
                        <div class="table-header">
                            <div class="table-row">
                                <div class="table-cell">文件名</div>
                                <div class="table-cell">文件大小</div>
                                <div class="table-cell-operate">操作</div>
                            </div>
                        </div>
                        <el-scrollbar height="224px">
                            <div v-if="scan_file_list.length > 0">
                                <div class="table-body">
                                    <div v-for="(item, index) in scan_file_list" :key="index" class="table-row">
                                        <div class="table-cell">
                                            <template v-if="type == 'video'">
                                                <div class="preview-img radius-sm">
                                                    <icon name="video" size="12" color="9"></icon>
                                                </div>
                                            </template>
                                            <template v-else-if="type == 'file'">
                                                <div class="preview-img radius-sm">
                                                    <div class="bg-f5 img flex-row jc-c align-c radius h w">
                                                        <icon :name="ext_file_name_list_map.filter((ext) => ext.type == item.ext).length > 0 && ext_file_name_list_map.filter((ext) => ext.type == item.ext)[0].type == item.ext ? ext_file_name_list_map.filter((ext) => ext.type == item.ext)[0].icon : 'file'" size="12" color="9"></icon>
                                                    </div>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <el-image :src="item.url" class="preview-img radius-sm" fit="contain">
                                                    <template #error>
                                                        <div class="bg-f5 img flex-row jc-c align-c radius h w">
                                                            <icon name="error-img" size="12"></icon>
                                                        </div>
                                                    </template>
                                                </el-image>
                                            </template>
                                            <div class="desc">{{ item.title }}</div>
                                        </div>
                                        <div class="table-cell">{{ annex_size_to_unit(item.size) }}</div>
                                        <div class="table-cell-operate" @click="del_already_upload(item.id, index)">删除</div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <no-data height="280px"></no-data>
                            </div>
                        </el-scrollbar>
                    </div>
                </template>
                <template v-else-if="form.type == 'web'">
                    <el-form-item label="网络图片">
                        <div class="flex-row align-c gap-10">
                            <el-input v-model="form.web_image" class="form-item-width" placeholder="请输入网络图片地址" clearable />
                            <div class="c-pointer cr-primary size-12" @click="extract_images(ruleFormRef)">提取图片</div>
                        </div>
                    </el-form-item>
                </template>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="plr-28 ptb-10" @click="close_dialog">取消</el-button>
                <el-button v-if="form.type == 'loc'" class="plr-28 ptb-10" type="primary" @click="submit_event(ruleFormRef)">上传</el-button>
                <el-button v-else-if="form.type == 'scan'" class="plr-28 ptb-10" type="primary" @click="close_dialog">返回图库</el-button>
                <el-button v-else-if="form.type == 'web'" class="plr-28 ptb-10" type="primary" @click="close_all_dialog">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import UploadAPI, { Tree } from '@/api/upload';
import { uploadStore } from '@/store';
const upload_store = uploadStore();
import type { UploadFile, UploadFiles, UploadUserFile, FormRules, FormInstance } from 'element-plus';
import { annex_size_to_unit, ext_name, get_math } from '@/utils';
import { ext_img_name_list, ext_video_name_list, ext_file_name_list, ext_file_name_list_map } from './index';
const app = getCurrentInstance();
/**
 * @description: 图片执行上传弹窗
 * @param close{String} 默认值
 * @return {*} close
 */
const props = defineProps({
    type: {
        type: String,
        default: 'img', // img/video/file
    },
    limit: {
        type: Number,
        default: 10000,
    },
    exts: {
        type: Array,
        default: () => ['.png', '.jpg', '.jpeg', '.bmp', '.webp', '.gif'],
    },
    fileSize: {
        type: Number,
        default: 1024 * 1024 * 1024,
    },
});
const dialogVisible = defineModel({ type: Boolean, default: false });
// 上传类型转换成name
const upload_type_name = computed(() => {
    return props.type === 'img' ? '图片' : props.type === 'video' ? '视频' : '文件';
});
// 格式限制
const exts_text = ref(props.exts.join(','));
const file_list = ref<UploadUserFile[]>([]);
interface fileData {
    file: File;
    status: string;
    progress: number;
}
interface formData {
    type: string;
    category_id: string[];
    file: fileData[];
    qrcode: string;
    web_image: string;
}
const ruleFormRef = ref<FormInstance>();
const form = ref<formData>({
    type: 'loc',
    category_id: [],
    file: [],
    qrcode: '',
    web_image: '',
});
const rules = reactive<FormRules>({
    category_id: [{ required: true, trigger: 'change', message: '请选择分组' }],
});
// 是否给二维码加模糊效果
const is_mask = ref(true);
const timer = ref<any>(null);
const scan_uuid = ref('');
// 上传方式
const upload_type_change = (type: any) => {
    // 清除之前的定时器（如果存在）
    if (timer.value && type != 'scan') {
        // 直接检查 timer.value 是否存在（不是 null 或 undefined）
        clearTimeout(timer.value);
        timer.value = null; // 清除引用，防止内存泄漏
    }
    if (type == 'scan') {
        timer.value = setInterval(async () => {
            if (scan_uuid.value.length > 0) {
                const { data } = await UploadAPI.uploadQrcode({ key: scan_uuid.value });
                scan_file_list.value = data || [];
            }
        }, 3000);
        // 如果已经选择了分组，则重新设置二维码
        if (form.value.category_id.length > 0) {
            category_id_change(form.value.category_id);
        }
    }
};
// 选择分组
const category_id_change = (val: any) => {
    if (val && val.length > 0) {
        scan_file_list.value = [];
        is_mask.value = false;
        scan_uuid.value = get_math() + '';
        let new_url = '';
        if (import.meta.env.VITE_APP_BASE_API == '/dev-api') {
            new_url = get_before_string(import.meta.env.VITE_APP_BASE_API_URL);
        } else {
            new_url = window.location.origin + '/';
        }
        form.value.qrcode = new_url + '?s=ueditor/scanupload/key/' + scan_uuid.value + '/cid/' + val[val.length - 1] + '/type/upload' + (props.type == 'file' ? 'file' : props.type == 'video' ? 'video' : 'image');
    }
};

// 使用计算属性获取级联数据 // 图片/视频/文件移动至
const cascader_data = computed(() => {
    return upload_store.category.map((tree: Tree) => ({
        value: tree.id,
        label: tree.name,
        children: tree.items?.map((item: Tree) => ({
            value: item.id,
            label: item.name,
        })),
    }));
});

// 获取字符串中‘，’后所有字符
const get_after_string = (str: string) => {
    let index = str.lastIndexOf('.');
    str = str.substring(index, str.length);
    return str;
};
// 获取字符串中‘/’迁民所有字符
const get_before_string = (str: string) => {
    let index = str.lastIndexOf('admin.php');
    str = str.substring(0, index);
    return str;
};

//#region 本地上传 -----------------------------------------------start

// 选择文件夹
const state = reactive({
    uploadEle: null as HTMLInputElement | null,
    uploadList: [],
});
const folder_mode = (type: boolean) => {
    if (!state.uploadEle) {
        state.uploadEle = document.querySelector('.el-upload__input') as HTMLInputElement;
    }
    nextTick(() => {
        (state.uploadEle as HTMLInputElement).webkitdirectory = type;
    });
};
// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
const upload_change = async (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    // // 过滤已上传的文件和重复的文件
    const results = uploadFiles.flat(Infinity).filter((f: any) => validExt(f.name) && validSize(f.size));
    const new_upload_files = results.filter((item: UploadFile) => {
        return !form.value.file.find((item2: fileData) => {
            return item2.file.name === item.name && item2.file.size === item.size;
        });
    });
    // 将过滤后的数组和form.file数组合并
    new_upload_files.forEach((item: UploadFile) => {
        // item.status = 'ready';
        const new_file_obj = {
            status: 'ready',
            progress: 0,
            file: item.raw as File,
        };
        form.value.file.push(new_file_obj);
    });
};
// 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
const validExt = (name: string) => props.exts.includes(ext_name(name));
const validSize = (size: number) => size <= props.fileSize;
// 上传前的钩子
const before_upload = (file: any) => {
    // 检查文件是否为图片
    if (validExt(file.name) && validSize(file.size)) {
        return true; // 允许上传
    } else {
        return false; // 不允许上传
    }
};
// 超出限制时的钩子
const handle_exceed = (files: any, fileList: any) => {
    ElMessageBox.alert(`最多上传 ${props.limit} 个文件!`);
};
// 清空列表
const clear_list_event = () => {
    form.value.file = [];
    file_list.value = [];
};
const is_dragging = ref(false);
// 引用dropzone DOM元素以便在dragLeave中检查
const dropzone = ref<HTMLElement | null>(null);
onMounted(() => {
    dropzone.value = document.getElementById('dropzone') as HTMLElement;
});

// 拖拽事件 和 列表拖动文件进入触发事件
const handle_drag_in = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    is_dragging.value = true;
};
// 列表拖动文件离开触发事件
const handle_drag_leave = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // 使用一个变量来跟踪鼠标是否离开了dropzone
    const leaveTimer = setTimeout(() => {
        // 确保鼠标不在dropzone或其子元素中
        if (!document.getElementById('dropzone')?.contains(event.relatedTarget as Node)) {
            is_dragging.value = false;
        }
    }, 50); // 延迟50毫秒

    // 当鼠标重新进入dropzone时，清除定时器
    event.currentTarget?.addEventListener(
        'dragenter',
        () => {
            clearTimeout(leaveTimer);
        },
        { once: true }
    );
};
// 松开拖拽的文件 获取文件信息
const handle_drop = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    is_dragging.value = false;
    let results = await Promise.all([...event.dataTransfer.items].map((item) => handle_entry(item.webkitGetAsEntry())));
    // 过滤符合条件的数据   文件后缀名，文件大小过滤
    results = results.flat(Infinity).filter((f: any) => validExt(f.name) && validSize(f.size));
    // 遍历过滤后的数据，过滤重复数据后并添加到上传列表中
    if (results.length + form.value.file.length <= props.limit) {
        results.forEach((file: any) => {
            if (!form.value.file.some((item: any) => item.file.name === file.name && item.file.size === file.size)) {
                const new_file_obj = {
                    status: 'ready',
                    progress: 0,
                    file: file,
                };
                const new_file_obj_upload = {
                    name: file.name,
                    url: 'xxx',
                    file: file,
                };
                form.value.file.push(new_file_obj);
                file_list.value.push(new_file_obj_upload);
            }
        });
    } else {
        ElMessageBox.alert(`最多上传 ${props.limit} 个文件!`);
    }
};
/**
 * 处理文件/目录并返回一个Promise。
 * 此函数旨在处理文件/目录，无论是文件还是目录。如果是文件，则直接以文件形式解析并解决Promise。如果是目录，则递归处理目录中的所有文件。
 * @param {any} entry 文件/目录，可以是文件或目录。
 * @returns {Promise<any[]>} 返回一个Promise，解析为一个数组，包含所有条目的文件对象。
 */
const handle_entry = (entry: any) => {
    return new Promise((resolve) => {
        // 如果entry是一个文件
        if (entry.isFile) {
            // 直接以文件形式解析Promise
            entry.file(resolve);
            return;
        }
        // 如果entry是一个目录
        const dirReader = entry.createReader();
        dirReader.readEntries(async (entries: any) => {
            // 递归处理目录中的所有条目，并通过Promise.all等待所有处理完成
            resolve(await Promise.all(entries.map(handle_entry)));
        });
    });
};
// 移除文件
const del_upload = (index: number) => {
    // 根据下标删除文件
    form.value.file.splice(index, 1);
    file_list.value.splice(index, 1);
};
// 粘贴上传
const handle_paste = (event: any) => {
    // 获取粘贴板中的文件列表
    const files = event.clipboardData.files;
    // 过滤符合条件的数据   文件后缀名，文件大小过滤
    const results = [...files].filter((f: any) => validExt(f.name) && validSize(f.size));
    // 遍历过滤后的数据，过滤重复数据后并添加到上传列表中
    if (results.length + form.value.file.length <= props.limit) {
        results.forEach((file: any) => {
            // 判断是否重复
            // 如果上传列表中没有与当前文件相同的文件，则添加到上传列表中
            if (!form.value.file.some((item: any) => item.file.name === file.name && item.file.size === file.size)) {
                const new_file_obj = {
                    status: 'ready',
                    progress: 0,
                    file: file,
                };
                const new_file_obj_upload = {
                    name: file.name,
                    url: 'xxx',
                    file: file,
                };
                form.value.file.push(new_file_obj);
                file_list.value.push(new_file_obj_upload);
            } else {
                ElMessageBox.alert(`文件 ${file.name} 已存在!`);
            }
        });
    } else {
        ElMessageBox.alert(`最多上传 ${props.limit} 个文件!`);
    }
};

// 执行上传
const submit_event = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            form.value.file.forEach((item: any) => {
                const formData = new FormData();
                formData.append('type', props.type == 'img' ? 'image' : props.type == 'video' ? 'video' : props.type == 'file' ? 'file' : '');
                formData.append('category_id', form.value.category_id[form.value.category_id.length - 1]);
                formData.append('upfile', item.file);
                if (item.status == 'ready') {
                    item.status = 'loading';
                    const on_upload_progress = (progressEvent: any) => {
                        item.progress = Number(((progressEvent.loaded / progressEvent.total) * 100).toFixed(2));
                    };
                    UploadAPI.uploadAttachment(formData, on_upload_progress)
                        .then((res) => {
                            ElMessage.success('上传成功');
                            item.status = 'success';
                        })
                        .catch((err) => {
                            item.status = 'error';
                            item.progress = 0;
                        });
                }
            });
        }
        // else {
        //     console.log('error submit!', fields);
        // }
    });
};

//#endregion 本地上传 -----------------------------------------------end

//#region 扫码上传 -----------------------------------------------start
const scan_file_list = ref<uploadList[]>([]);
// 删除已上传的文件
const del_already_upload = (id: number | undefined, index: number) => {
    // 根据下标删除文件
    // scan_file_list.value.splice(index, 1);
    // 调接口真实删除
    if (id != undefined) {
        app?.appContext.config.globalProperties.$common.message_box('删除后不可恢复，确定继续吗?', 'warning').then(() => {
            // 调用删除接口，然后，更新数据
            UploadAPI.delAttachment({ ids: id }).then((res) => {
                ElMessage.success('删除成功!');
                scan_file_list.value.splice(index, 1);
            });
        });
    } else {
        ElMessage.warning('请先选择图片!');
    }
};
//#endregion 扫码上传 -----------------------------------------------end

//#region 网络上传 -----------------------------------------------start
// 提取图片
const extract_images = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 此处调用接口获取提取后的图片更新输入框的地址，改为在线地址
            if (form.value.web_image) {
                const new_data = {
                    type: props.type == 'img' ? 'image' : props.type == 'video' ? 'video' : props.type == 'file' ? 'file' : '',
                    category_id: form.value.category_id[form.value.category_id.length - 1],
                    source: form.value.web_image,
                };
                UploadAPI.getAttachmentCatch(new_data).then((res) => {
                    form.value.web_image = res.data[0].url;
                    ElMessage.success('提取成功!');
                });
            } else {
                ElMessage.warning('请输入地址后再提取!');
            }
        }
        //  else {
        //     console.log('error submit!', fields);
        // }
    });
};
const emit = defineEmits(['closeAll', 'close']);
// 关闭所有弹窗
const close_all_dialog = () => {
    const new_form = JSON.parse(JSON.stringify(form.value));
    reset_data();
    emit('closeAll', new_form);
};
//#endregion 网络上传 -----------------------------------------------end

// file转换成base64
const file_to_base64 = (file: any) => {
    return URL.createObjectURL(file);
};
// 关闭弹窗
const close_dialog = () => {
    reset_data();
    emit('close');
};
const reset_data = () => {
    dialogVisible.value = false;
    form.value = {
        type: 'loc',
        category_id: form.value.category_id,
        file: [],
        qrcode: '',
        web_image: '',
    };
    file_list.value = [];
    scan_file_list.value = [];
    scan_uuid.value = '';
    // 直接检查 timer.value 是否存在（不是 null 或 undefined）
    if (timer.value != null) {
        clearTimeout(timer.value);
    }
    is_mask.value = true;
    timer.value = null; // 清除引用，防止内存泄漏
};
</script>
<style lang="scss" scoped>
.upload-content {
    height: 57.4rem;
    gap: 4.5rem;
    .table {
        width: 100%;
        height: 30rem;
        .table-header,
        .table-body {
            .progress {
                position: absolute;
                inset: 0;
                width: 0;
                height: 100%;
                background: #f3f9ff;
                transition: width 0.5s linear;
            }
            .table-row {
                position: relative;
                z-index: 1;
                display: flex;
                width: 100%;
                border-bottom: 0.1rem solid #eee;
                color: #999;
                font-size: 1.4rem;
                &.bg-table-rwo-error {
                    background: #f3f9ff;
                }
                .table-cell {
                    flex: 1;
                    padding: 1rem;
                    color: #666;
                    display: flex;
                    align-items: center;
                    word-break: break-all;
                    gap: 1rem;
                    &.loading {
                        color: $cr-primary;
                    }
                    &.success {
                        color: $cr-success;
                    }
                    &.error {
                        color: $cr-error;
                    }
                    .preview-img {
                        width: 2.8rem;
                        height: 2.8rem;
                    }
                    .desc {
                        flex: 1;
                        width: 0;
                    }
                }
                .table-cell-operate {
                    padding: 1rem;
                    width: 5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    word-break: break-all;
                }
            }
        }
        .table-body {
            .table-cell,
            .table-cell-operate {
                padding: 1.5rem 1rem !important;
            }
            .table-cell-operate {
                color: $cr-primary;
            }
        }
        .folder-upload {
            background: #fafcff;
            border-radius: 0.2rem;
            border: 0.1rem dashed #afdafa;
            height: 32rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .active {
                background-color: #eef5ff;
                border-color: #35a9ff;
            }
        }
    }
    .form-item-width {
        width: 33.5rem !important;
    }
}
.upload-2 {
    width: 100%;
    height: 100%;
    :deep(.el-upload) {
        width: inherit;
        height: inherit;
    }
}
</style>
