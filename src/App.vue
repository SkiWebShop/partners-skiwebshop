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