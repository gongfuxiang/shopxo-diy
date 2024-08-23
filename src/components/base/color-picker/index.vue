<template>
    <div class="flex-row align-c gap-12">
        <el-color-picker v-model="color" show-alpha :predefine="predefine_colors" @change="color_picker_change"  />
        <icon name="reset" color="primary" size="16" :class="['c-pointer', { disable: color == defaultColor }]" @click="reset_event"></icon>
    </div>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';

const predefine_colors = ref(['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgba(255, 69, 0, 0.68)', 'rgb(255, 120, 0)', 'hsv(51, 100, 98)', 'hsva(120, 40, 94, 0.5)', 'hsl(181, 100%, 37%)', 'hsla(209, 100%, 56%, 0.73)', '#c7158577']);
interface Props {
    defaultColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
    defaultColor: '',
});

const color = defineModel({ type: String });
const emit = defineEmits(['update:value']);
const color_picker_change = (val: string | null) => {
    emit('update:value', val);
};
const reset_event = () => {
    if (color.value == props.defaultColor) {
        return;
    } else {
        if (!isEmpty(props.defaultColor)) {
            color.value = props.defaultColor;
        } else {
            color.value = '';
        }
        emit('update:value', color.value);
    }
};
</script>
<style lang="scss" scoped>
.flex-row .disable {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
