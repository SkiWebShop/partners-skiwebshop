<template>
    <div class="w-full h-96">
        <img :src="imageLink" class="w-full h-full object-cover" alt="">
    </div>
</template>

<script setup>import { computed } from '@vue/reactivity';


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