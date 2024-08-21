<template>
    <template v-if="props.outerflex == 'row'">
        <div class="flex-row gap-10 align-c w h">
            <template v-if="props.flex === 'row'">
                <div v-for="(item2, index2) in split_list" :key="index2" class="flex-row gap-10 half-width h">
                    <image-empty v-model="item2.new_src[0]" :style="contentImgRadius"></image-empty>
                    <div v-if="!isEmpty(isShow)" class="flex-col w h tl gap-10">
                        <div v-if="isShow.includes('0')" class="text-line-2 size-14">华为荣耀畅享平大幅度发过板华为荣耀畅享平大幅度发过板</div>
                        <div v-if="isShow.includes('1')" class="identifying"><span class="num">¥</span><span>{{'51' }}</span></div>
                    </div>
                </div>
            </template>
            <template v-else-if="actived != 7 || props.num !== 1">
                <div v-for="(item2, index2) in split_list" :key="index2" :class="['flex-col gap-10 h', { 'half-width': props.num !== 1, 'w': props.num == 1 }]">
                    <div class="w h re">
                        <image-empty v-model="item2.new_src[0]" :style="contentImgRadius"></image-empty>
                        <div v-if="isShow.includes('1')" class="price-suspension">¥{{ '51' }}</div>
                    </div>
                    <div v-if="isShow.includes('0')" class="text-line-1 size-14 tl w" style="overflow: inherit;">华为荣耀畅享平大幅度发过板华为荣耀畅享平大幅度发过板</div>
                </div>
            </template>
            <template v-else>
                <div v-for="(item2, index2) in split_list" :key="index2" class="flex-col w h">
                    <image-empty v-model="item2.new_src[0]" :style="contentImgRadius"></image-empty>
                    <div v-if="!isEmpty(isShow)" class="flex-col w tl gap-10" :style="`${ padding_computer(props.chunkPadding) }`">
                        <div v-if="isShow.includes('0')" class="text-line-2 size-14">华为荣耀畅享平大幅度发过板华为荣耀畅享平大幅度发过板</div>
                        <div v-if="isShow.includes('1')" class="identifying"><span class="num">¥</span><span>{{'51' }}</span></div>
                    </div>
                </div>
            </template>
        </div>
    </template>
    <template v-else>
        <div class="flex-col gap-20 align-c w h">
            <template v-if="props.flex === 'row'">
                <div v-for="(item2, index2) in split_list" :key="index2" class="flex-row gap-10 align-c w h">
                    <image-empty v-model="item2.new_src[0]" :style="contentImgRadius"></image-empty>
                    <div v-if="!isEmpty(isShow)" class="flex-col w h tl gap-10">
                        <div v-if="isShow.includes('0')" class="text-line-2 size-14">华为荣耀畅享平大幅度发过板华为荣耀畅享平大幅度发过板</div>
                        <div v-if="isShow.includes('1')" class="identifying"><span class="num">￥</span><span>{{'51' }}</span></div>
                    </div>
                </div>
            </template>
        </div>
    </template>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
import { padding_computer } from '@/utils';

interface Props {
    value: Array<any>;
    outerflex: string;
    flex: string;
    contentImgRadius: string;
    num: number;
    actived: number;
    isShow: Array<string>;
    chunkPadding: paddingStyle;
}

const props = withDefaults(defineProps<Props>(), {
    value: () => [],
    outerflex: 'row',
    flex: 'row',
});
const split_list = ref(props.value);

watchEffect(() => {
    split_list.value = props.value;
})
</script>

<style lang="scss" scoped>
:deep(.el-image) {
    height: 100%;
    width: 100%;
    .el-image__inner {
        object-fit: cover;
    }
    .image-slot img {
        width: 4rem !important;
    }
}
.identifying {
    font-size: 2rem;
    color: #EA3323;
    .num {
        font-size: 0.9rem;
    }
}
.price-suspension {
    width: calc(100% - 0.8rem);
    margin: 0 0.4rem;
    background: #fff;
    font-size: 1.2rem;
    line-height: 1.7rem;
    color: #EA3323;
    text-align: center;
    position: absolute;
    bottom: 0.4rem;
    border-radius: 0.8rem;
}
.half-width {
    width: 50%;
}
</style>