<template>
    <div class="mult-color-picker">
        <el-radio-group v-model="direction_type" @change="direction_type_change">
            <el-radio value="180deg">横向</el-radio>
            <el-radio value="90deg">纵向</el-radio>
            <el-radio value="45deg">左斜</el-radio>
            <el-radio value="315deg">右斜</el-radio>
        </el-radio-group>
        <div class="flex-col">
            <div v-for="(item, index) in color_list" :key="index" class="flex-row align-s gap-12">
                <div class="flex-col">
                    <div class="flex-row align-s gap-12">
                        <el-color-picker v-model="item.color" show-alpha :predefine="predefine_colors" @change="change_color(index, $event)" />
                        <div class="re mo-input-number">
                            <el-input-number v-model="item.color_percentage" :max="999" label="请输入百分比" type="number" controls-position="right" class="number-show" @change="change_color_percentage(index, $event)"></el-input-number>
                            <div class="define-append">%</div>
                        </div>
                    </div>
                    <div v-if="index + 1 !== color_list.length" class="connect-line"></div>
                </div>
                <template v-if="index == 0">
                    <icon name="reset" color="primary" size="16" class="c-pointer" @click="reset_event"></icon>
                </template>
                <template v-else>
                    <icon name="close" color="c" size="12" class="c-pointer" @click="del_event(index)" />
                </template>
            </div>
            <div class="add-color mt-15" @click="add_event">
                <icon name="add"></icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    type: {
        type: String,
        default: '0deg',
    },
    // 颜色数组 ['','']
    value: {
        type: Array,
        default: () => {
            [''];
        },
    },
});
const predefine_colors = ref(['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgba(255, 69, 0, 0.68)', 'rgb(255, 120, 0)', 'hsv(51, 100, 98)', 'hsva(120, 40, 94, 0.5)', 'hsl(181, 100%, 37%)', 'hsla(209, 100%, 56%, 0.73)', '#c7158577']);
const direction_type = ref(props.type);
let state = reactive({
    color_list: props.value.map((item: any) => {
        return {
            color: item.color,
            color_percentage: item.color_percentage,
        };
    })
});
const { color_list } = toRefs(state);
const emit = defineEmits(['update:value']);
const direction_type_change = (type: any) => {
    direction_type.value = type.toString();
    update_value();
};
const reset_event = () => {
    color_list.value = [{ color: '', color_percentage: '' }];
    update_value();
};
const del_event = (index: number) => {
    color_list.value.splice(index, 1);
    update_value();
};
const add_event = () => {
    color_list.value.push({ color: '', color_percentage: '' });
    update_value();
};
const change_color = (index: number, color: string | null) => {
    color_list.value[index].color = color;
    update_value();
};
const change_color_percentage = (index: number, percentage: number | undefined) => {
    color_list.value[index].color_percentage = percentage?.toString();
    update_value();
};
const update_value = () => {
    emit('update:value', color_list.value, direction_type.value);
};
</script>
<style lang="scss" scoped>
.mult-color-picker {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .connect-line {
        width: 0.1rem;
        height: 1.6rem;
        background: #d8d8d8;
        position: relative;
        left: 1rem;
        // 合并before和after重复代码
        &::before,
        &::after {
            position: absolute;
            left: -0.2rem;
            content: '';
            position: absolute;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: #ddd;
        }
        &::before {
            top: -0.25rem;
        }
        &::after {
            bottom: -0.25rem;
        }
    }
    .add-color {
        width: 3.2rem;
        height: 3.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #dcdfe6;
        border-radius: 0.4rem;
        color: #dcdfe6;
        cursor: pointer;
        &:hover {
            color: #d4d7de;
            border-color: #d4d7de;
        }
    }
    .icon-close:hover {
        color: $cr-error;
    }
    .icon-reset:hover {
        color: $cr-primary-dark;
    }
}
.mo-input-number {
    :deep(.el-input-number) {
        .el-input-number__decrease, .el-input-number__increase {
            right: 3.4rem;
        }
    }
    .number-show {
        :deep(.el-input__wrapper .el-input__inner) {
            text-align: left;
        }
    }
    .define-append {
        right: 0.1rem;
        top: 0.2rem;
        background: #f5f7fa;
        color: #999;
        height: 3rem;
        padding: 0 1rem;
        position: absolute;
        font-size: 1.2rem;
        border-top-right-radius: 0.4rem;
        border-bottom-right-radius: 0.4rem;
    }
}

</style>
