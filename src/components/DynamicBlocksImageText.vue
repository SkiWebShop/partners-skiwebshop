<template>
    <div class="relative h-96 flex items-center justify-center bg-blue bg-opacity-20">
        <img :src="imageLink" class="absolute h-full w-full object-cover -z-10 pointer-events-none " />
        <p class="text-white text-3xl font-bold text-center drop-shadow-lg px-3 ">
            <slot></slot>
        </p>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';


const props = defineProps({
    image: {
        type: String,
        required: true
    }
})

const imageLink = computed(() => {
    return `https://admin.swsreports.app/assets/${props.image}`
})


</script>