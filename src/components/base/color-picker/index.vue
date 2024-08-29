<template>
    <div class="flex-row align-c gap-12">
        <el-color-picker v-model="color" :predefine="predefine_colors" @change="color_picker_change"  />
        <icon name="reset" color="primary" size="16" :class="['c-pointer', { disable: color == defaultColor }]" @click="reset_event"></icon>
    </div>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
import { predefine_colors } from '@/utils';

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
