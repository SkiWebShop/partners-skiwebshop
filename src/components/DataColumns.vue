<template>
    <div class="flex grow py-10">
        <div class="text-center grow" v-for="datacol in data">
            <div v-if="iconTag(datacol.icon)">
                <fa-icon :icon="iconTag(datacol.icon)" size="5x" class="text-blue" />
            </div>
            <p class="text-main font-bold text-xl mt-2">{{ datacol.data }}</p>
            <p class="text-main text-xl mt-2">{{ datacol.name }}</p>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    data: {
        type: Object,
        default: {
            icon: null,
            name: null,
            data: null
        }
    }
})

const iconTag = (icon) => {
    try {
        const splitted = icon.split(' ')

        return [
            splitted[0].replace('-', '').substring(0, 3), // Extract Prefix
            splitted[1].replace('fa-', '') // Extract suffix
        ]
    } catch (error) {
        return false
    }
}

</script>