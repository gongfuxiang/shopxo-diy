<template>
    <div class="container">
        <template v-if="type == '1'">
            <footer-nav-content :value="form.content" @update:value="content_update"></footer-nav-content>
        </template>
        <template v-else-if="type == '2'">
            <footer-nav-styles :value="form.style" @update:value="style_update"></footer-nav-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    type: {
        type: String,
        default: '1',
    },
    value: {
        type: Object,
        default: () => ({}),
    },
});
const form = reactive(props.value);
const emit = defineEmits(['update:value']);
const content_update = (value: any) => {
    form.content = value;
    let new_data = form.style.common_style;
    const new_arry = ['margin', 'margin_left', 'margin_right', 'margin_top', 'margin_bottom', 'padding', 'padding_left', 'padding_right', 'padding_top', 'padding_bottom', 'radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right'];
    if (value.nav_type == '1') {
        new_arry.forEach((item) => {
            if (item.indexOf('radius') !== -1) {
                new_data[item] = 100;
            } else {
                new_data[item] = 10;
            }
        });
    } else {
        new_arry.forEach((item) => {
            new_data[item] = 0;
        });
    }
};
const style_update = (value: any) => {
    form.style = value;
};
</script>
