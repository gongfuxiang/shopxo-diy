<template>
    <div class="w h">
        <el-form :model="form" label-width="60">
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">展示风格</div>
                <el-form-item label="选择风格">
                    <div class="flex align-c flex-wrap gap-10">
                        <div v-for="(item, index) in style_list" :key="index" :class="['flex-item', {'flex-item-actived': form.style_actived === index }]" @click="style_click(index)">
                            <icon :name="item" :color="`${ form.style_actived === index ? '#E1EEF9' : '#EDEDED'}`" size="30"></icon>
                        </div>
                    </div>
                </el-form-item>
                <template v-if="form.style_actived !== 10">
                    <el-form-item label="容器高度">
                        <slider v-model="form.container_height" :min="30" :max="1000" @update:model-value="handleResize"></slider>
                    </el-form-item>
                    <el-form-item label="图片设置">
                        <el-radio-group v-model="form.img_fit">
                            <el-radio value="contain">等比缩放</el-radio>
                            <el-radio value="fill">铺满</el-radio>
                            <el-radio value="cover">等比剪切</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="限制尺寸">
                        <el-switch v-model="form.limit_size" active-value="1" inactive-value="0" @change="handleResize"/>
                    </el-form-item>
                    <template v-if="form.limit_size == '1'">
                        <el-form-item label="图片高度">
                            <slider v-model="form.image_height" :max="500" @update:model-value="handleResize"></slider>
                        </el-form-item>
                        <el-form-item label="图片设置">
                            <el-radio-group v-model="form.img_fit">
                                <el-radio value="contain">等比缩放</el-radio>
                                <el-radio value="fill">铺满</el-radio>
                                <el-radio value="cover">等比剪切</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </template>
                </template>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12 flex-row jc-sb align-c">
                    展示设置 
                    <template v-if="form.style_actived === 11">
                        <el-radio-group v-model="form.magic_cube_density" @change="density_change">
                            <el-radio-button label="4X4" :value="4" />
                            <el-radio-button label="6X6" :value="6" />
                            <el-radio-button label="8X8" :value="8" />
                        </el-radio-group>
                    </template>
                </div>
                <el-form-item label-width="0" class="show-config">
                    <!-- 风格3 -->
                    <template v-if="form.style_actived == 2">
                        <div class="flex-row align-c jc-c gap-2 style-size">
                            <div v-for="(item, index) in form.img_magic_list" :key="index" :class="['three bg-f5', {'cube-selected-active': selected_active == index}]" @click="selected_click(index)">
                                <template v-if="!isEmpty(item.img[0])">
                                    <image-empty v-model="item.img[0]" :fit="form.img_fit" ></image-empty>
                                </template>
                                <template v-else>
                                    <div class="cube-selected-text">建议130 x {{ form.container_height }}px</div>
                                </template>
                            </div>
                        </div>
                    </template>
                    <!-- 风格9 -->
                    <template v-else-if="form.style_actived == 8">
                        <div class="flex-row align-c jc-c gap-2 style-size flex-wrap">
                            <div v-for="(item, index) in form.img_magic_list" :key="index" :class="['bg-f5', {'cube-selected-active': selected_active == index, 'style9-top': [0, 1].includes(index), 'style9-bottom': ![0, 1].includes(index)}]" @click="selected_click(index)">
                                <template v-if="!isEmpty(item.img[0])">
                                    <image-empty v-model="item.img[0]" :fit="form.img_fit"></image-empty>
                                </template>
                                <template v-else>
                                    <div class="cube-selected-text">
                                        <template v-if="[0, 1].includes(index)">建议195 x {{ Math.round(form.container_height / 2) }}px</template>
                                        <template v-else>建议130 x {{ Math.round(form.container_height / 2) }}px</template> 
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <magic-cube :key="form.style_actived" :list="form.img_magic_list" :style-actived="form.style_actived" :flag="form.style_actived == 11" :magic-cube-density="form.magic_cube_density" :cube-width="cubeWidth" :cube-height="cubeHeight" :img-fit="form.img_fit" @selected_click="selected_click"></magic-cube>
                    </template>
                </el-form-item>
            </card-container>
            <div class="bg-f5 divider-line" />
            <card-container>
                <div class="mb-12">内容设置</div>
                <template v-if="!isEmpty(form.img_magic_list[selected_active])">
                    <el-form-item label="上传图片">
                        <upload v-model="form.img_magic_list[selected_active].img" :limit="1" size="50"></upload>
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
const style_list = ['heng2', 'shu2', 'shu3', 'shang2xia1', 'shang1xia2', 'zuo1you2', 'zuo2you1', 'tianzige', 'shang2xia3', 'zuo1youshang1youxia2', 'a-1ge', 'a-4x4'];
// 风格
const style_show_list = [
    [{ start: {x: 1, y: 1}, end: {x: 4, y: 2}, img: [], img_link: {} }, { start: {x: 1, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}], // 风格1
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 4},img: [], img_link: {}}], // 风格2
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 4},img: [], img_link: {}}, { start: {x: 3, y: 1},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格3
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 2},img: [], img_link: {}}, { start: {x: 1, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格4
    [{ start: {x: 1, y: 1}, end: {x: 4, y: 2}, img: [], img_link: {} }, { start: {x: 1, y: 3},end: {x: 2, y: 4},img: [], img_link: {}}, { start: {x: 3, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格5
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 2},img: [], img_link: {}}, { start: {x: 3, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格6
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, img: [], img_link: {} }, { start: {x: 1, y: 3},end: {x: 2, y: 4},img: [], img_link: {}}, { start: {x: 3, y: 1},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格7
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 2}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 2},img: [], img_link: {}}, { start: {x: 1, y: 3},end: {x: 2, y: 4},img: [], img_link: {}}, { start: {x: 3, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格8
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 2},img: [], img_link: {}}, { start: {x: 3, y: 3},end: {x: 3, y: 4},img: [], img_link: {}}, { start: {x: 4, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}, { start: {x: 4, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格9
    [{ start: {x: 1, y: 1}, end: {x: 2, y: 4}, img: [], img_link: {} }, { start: {x: 3, y: 1},end: {x: 4, y: 2},img: [], img_link: {}}, { start: {x: 3, y: 3},end: {x: 3, y: 4},img: [], img_link: {}}, { start: {x: 4, y: 3},end: {x: 4, y: 4},img: [], img_link: {}}],// 风格10
    [{ start: {x: 1, y: 1}, end: {x: 4, y: 4}, img: [], img_link: {} }],// 风格11
    []// 风格12
]
//#region 容器大小变更
const cubeWidth = ref(400);
const cubeHeight = ref(400);
const style_width = computed(() => cubeWidth.value + 'px');
const style_height = computed(() => cubeHeight.value + 'px');
onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
});
 
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
    const height = form.value.style_actived !== 10 ? form.value.container_height : form.value.limit_size == '1' ? form.value.image_height : 390;
    if (window.innerWidth <= 1560) {
        const sales = 330 / 390;
        cubeWidth.value = 330;
        cubeHeight.value = height * sales;
    } else {
        cubeWidth.value = 390;
        cubeHeight.value = height;
    }
}
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
    if (index != 11) {
        form.value.magic_cube_density = 4;
    }
    if (index === 10) {
        if (window.innerWidth <= 1560) {
            cubeWidth.value = 330;
            cubeHeight.value = 330;
        } else {
            cubeWidth.value = 390;
            cubeHeight.value = 390;
        }
    } else {
        handleResize();
    }
}
const density_change = () => {
    form.value.img_magic_list = [];
}
// 选中的点击事件
const selected_click = (index: number) => {
    selected_active.value = index;
}
</script>
<style lang="scss" scoped>
.flex-item {
    width: 4.7rem;
    height: 4.7rem;
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
