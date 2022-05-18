<template>
<TheHeader v-if="showHeader" />
<router-view />
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
const route = useRoute()


const showHeader = computed(() => {
    if(route.name === 'Login') {
        return false
    } else {
        return true
    }
})

</script>

<style lang="postcss">
.content-section ul li {
    @apply my-1 before:content-['✓'] before:font-bold before:mr-2 text-2xl;
}
.content-section ul {
    @apply my-10;
}
.content-section p {
    @apply my-3;
}
body {
    @apply bg-[#EFEFEF];
}
</style>