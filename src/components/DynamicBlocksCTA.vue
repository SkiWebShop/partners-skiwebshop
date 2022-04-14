<template>
<div class="bg-white w-full flex justify-center py-10">
    <div class="md:w-1/4 text-center">
        <p class="text-blue font-bold text-3xl mb-4" v-html="cta.text"></p>
        <a :href="cta.button_link" class="bg-orange block text-white text-3xl px-4 py-2 font-semibold">
            {{cta.button_text}}
        </a>
    </div>
</div>
</template>

<script setup>

const props = defineProps({
    cta: {
        type: Object,
        default: {
            text: null,
            button_text: null,
            button_link: null
        }
    }
})

</script>