<template>
    <div class="bg-white md:flex px-12 py-11 gap-10 items-center">
        <div class="w-full h-auto md:w-[250px] md:h-[250px]">
            <img :src="imageLink" class="h-full w-full aspect-square object-cover object-top rounded-full" />
        </div>
        <div class="grow text-lg text-left mt-11 md:mt-0">
            <h3 class="font-bold text-main text-xl" >{{contact.name}}</h3>
            <h4>{{contact.title}}</h4>
            <p class="mt-2">
                {{contact.email}}
            </p>
            <p class="mb-2">
                {{contact.phone}}
            </p>
            <button @click="mailto(contact.email)" class="underline">Contact</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';


const props = defineProps({
    contact: {
        type: Object,
        default: {
            name: null,
            title: null,
            email: null,
            phone: null,
            image: null,
        }
    }
})

const mailto = (email) => window.location.href = `mailto:${email}`

const imageLink = computed(() => `https://admin.swsreports.app/assets/${props.contact.image}` )

</script>