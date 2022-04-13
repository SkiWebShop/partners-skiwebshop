<template>
    <header class="px-40 flex gap-6 pt-5">
        <router-link v-for="link in links" :to="link.routerLink">{{ link.name }}</router-link>
    </header>
</template>

<script setup>
import { ref } from "vue"

const links = ref([
    {
        name: 'Home',
        routerLink: {
            name: 'Home'
        }
    },
    {
        name: 'About SkiWebShop',
        routerLink: {
            path: '/login'
        }
    },
    {
        name: 'Logout',
        routerLink: {
            name: 'Login',
            query: {
                logout: true
            }
        }
    }
])

</script>

<style lang="postcss">
.router-link-active {
    @apply underline;
}
</style>