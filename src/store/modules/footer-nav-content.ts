import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const footerNavCounterStore = defineStore('footerNavCounter', () => {
    const padding_footer = ref(70);
    function padding_footer_computer(num: number) {
        padding_footer.value = num;
    }
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    // 	count.value++
    // }

    return {
        padding_footer,
        padding_footer_computer,
        // increment,
        // reset
    };
});
