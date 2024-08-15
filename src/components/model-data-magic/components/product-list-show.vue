<template>
    <template v-if="props.outerflex == 'row'">
        <div class="flex-row gap-10 align-c">
            <template v-if="props.flex == 'row'">
                <div v-for="(item2, index2) in split_list" :key="index2" class="flex-row gap-10 align-c">
                    <image-empty v-model="item2.new_src[0]" :style="contentImgRadius"></image-empty>
                    <div class="flex-col gap-10">
                        <div>标题</div>
                        <div>价格</div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-for="(item2, index2) in split_list" :key="index2" class="flex-col gap-10 align-c">
                    <image-empty v-model="item2.new_src[0]" :style="contentImgRadius"></image-empty>
                    <div class="flex-col gap-10">
                        <div>标题</div>
                        <div>价格</div>
                    </div>
                </div>
            </template>
        </div>
    </template>
    <template v-else>
        <div class="flex-col gap-10 align-c">
            <template v-if="props.flex === 'row'">
                <div v-for="(item2, index2) in split_list" :key="index2" class="flex-row gap-10 align-c">
                    <image-empty v-model="item2.new_src[0]" :style="contentImgRadius"></image-empty>
                    <div class="flex-col gap-10">
                        <div>标题</div>
                        <div>价格</div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-for="(item2, index2) in split_list" :key="index2" class="flex-col gap-10 align-c">
                    <image-empty v-model="item2.new_src[0]" :style="contentImgRadius"></image-empty>
                    <div class="flex-col gap-10">
                        <div>标题</div>
                        <div>价格</div>
                    </div>
                </div>
            </template>
        </div>
    </template>
</template>

<script setup lang="ts">
interface Props {
    value: Array<any>;
    outerflex: string;
    flex: string;
    contentImgRadius: string;
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

</style>