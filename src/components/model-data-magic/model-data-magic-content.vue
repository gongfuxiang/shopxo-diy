<template>
    <div class="auxiliary-line common-content-height">
        <el-form :model="form" label-width="60">
            <card-container class="mb-8">
                <div class="mb-12">展示风格</div>
                <el-form-item label="选择风格">
                    <div class="flex align-c flex-wrap gap-10">
                        <div v-for="(item, index) in style_list" :key="index" :class="['flex-item', {'flex-item-actived': form.style_actived === index }]" @click="style_click(index)">
                            <icon :name="item" :color="`${ form.style_actived === index ? '#E1EEF9' : '#EDEDED'}`" size="48"></icon>
                        </div>
                    </div>
                </el-form-item>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">展示设置</div>
                <el-form-item label-width="0" class="show-config">
                    <!-- 风格3 -->
                    <template v-if="form.style_actived == 2">
                        <div class="flex-row align-c jc-c gap-2 style-size">
                            <div v-for="(item, index) in form.img_magic_list" :key="index" :class="['three bg-f5', {'cube-selected-active': selected_active == index}]" @click="selected_click(index)">
                                <template v-if="!isEmpty(item.img[0])">
                                    <image-empty v-model="item.img[0]"></image-empty>
                                </template>
                                <template v-else>
                                    <div class="cube-selected-text">250 x 750 像素</div>
                                </template>
                            </div>
                        </div>
                    </template>
                    <!-- 风格9 -->
                    <template v-else-if="form.style_actived == 8">
                        <div class="flex-row align-c jc-c gap-2 style-size flex-wrap">
                            <div v-for="(item, index) in form.img_magic_list" :key="index" :class="['bg-f5', {'cube-selected-active': selected_active == index, 'style9-top': [0, 1].includes(index), 'style9-bottom': ![0, 1].includes(index)}]" @click="selected_click(index)">
                                <template v-if="!isEmpty(item.img[0])">
                                    <image-empty v-model="item.img[0]"></image-empty>
                                </template>
                                <template v-else>
                                    <div class="cube-selected-text">
                                        <template v-if="[0, 1].includes(index)">375 x 375 像素</template> 
                                        <template v-else>250 x 375 像素</template> 
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <magic-cube :key="form.style_actived" :list="form.img_magic_list" :flag="form.style_actived == 11" :cube-width="cubeWidth" :cube-height="cubeHeight" @selected_click="selected_click"></magic-cube>
                    </template>
                </el-form-item>
            </card-container>
            <card-container class="mb-8">
                <div class="mb-12">内容设置</div>
                <template v-if="!isEmpty(form.img_magic_list[selected_active])">
                    <el-form-item label="上传图片">
                        <upload v-model="form.img_magic_list[selected_active].img" :limit="1" size="40"></upload>
                    </el-form-item>
                    <el-form-item label="链接">
                        <url-value v-model="form.img_magic_list[selected_active].img_link"></url-value>
                    </el-form-item>
                </template>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { isEmpty, cloneDeep } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});
const style_list = ['heng2', 'shu2', 'shang2xia1', 'shang1xia2', 'zuo1you2', 'zuo2you1', 'tianzige', 'shang2xia3', 'zuo1youshang1youxia2'];

// 风格
const style_show_list = [
    [{ start: {x: 1, y: 1}, end: {x: 4, y: 2}, img: [], img_link: {} }, { start: {x: 1, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}], // 风格1
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 4},img: [], img_link: {}}], // 风格2
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 2},img: [], img_link: {}}, { start: {x: 1, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格3
    [{ start: {x: 1, y: 1}, end: {x: 4, y: 2}, img: [], img_link: {} }, { start: {x: 1, y: 3},end: {x: 2, y: 4},img: [], img_link: {}}, { start: {x: 3, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格4
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 2},img: [], img_link: {}}, { start: {x: 3, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格5
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, img: [], img_link: {} }, { start: {x: 1, y: 3},end: {x: 2, y: 4},img: [], img_link: {}}, { start: {x: 3, y: 1},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格6
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 2},img: [], img_link: {}}, { start: {x: 1, y: 3},end: {x: 2, y: 4},img: [], img_link: {}}, { start: {x: 3, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格7
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 2},img: [], img_link: {}}, { start: {x: 3, y: 3},end: {x: 3, y: 4},img: [], img_link: {}}, { start: {x: 4, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}, { start: {x: 4, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格8
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 2},img: [], img_link: {}}, { start: {x: 3, y: 3},end: {x: 3, y: 4},img: [], img_link: {}}, { start: {x: 4, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格9
]
//#region 容器大小变更
const cubeWidth = ref(400);
const cubeHeight = ref(400);
const style_width = computed(() => cubeWidth.value + 'px');
const style_height = computed(() => cubeHeight.value + 'px');

function handleResize() {
    if (window.innerWidth <= 1540) {
        cubeWidth.value = 330;
        cubeHeight.value = 330;
    } else {
        cubeWidth.value = 390;
        cubeHeight.value = 390;
    }
}

onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
});
 
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
//#endregion
const selected_active = ref(0);
const state = reactive({
    form: props.value
});
const { form } = toRefs(state);
const style_click = (index: number) => {
    form.value.img_magic_list = cloneDeep(style_show_list[index]);
    form.value.style_actived = index;
    selected_active.value = 0;
}
// 选中的点击事件
const selected_click = (index: number) => {
    selected_active.value = index;
}
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.flex-item {
    width: 7.6rem;
    height: 7.6rem;
    background: #F7F7F7;
    border-radius: 0.4rem;
    border: 1px solid #E4E4E4;
    padding: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.flex-item-actived {
    background: #F5F9FF;
    border-radius: 4px;
    border: 1px solid #2A94FF;
}
.show-config {
    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
.style-size {
    width: v-bind(style_width);
    height: v-bind(style_height);
    .three {
        width: 33%;
        height: 100%;
        position: relative;
    }
    .style9-top {
        width: calc(50% - 0.2rem);
        height: 50%;
        position: relative;
    }
    .style9-bottom {
        width: calc(33% - 0.1rem);
        height: 50%;
        position: relative;
    }
}
.cube-selected-active {
    border: 1px solid $cr-primary;
}
.cube-selected-text {
    font-size: 12px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    color: $cr-primary;
}
:deep(.el-image) {
    height: 100%;
    width: 100%;
    background-color: #fff;
    .el-image__inner {
        object-fit: cover;
    }
    .image-slot img {
        width: 6rem;
    }
}
</style>
