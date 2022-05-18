<template>
    <div class="flex gap-10">
        <div v-for="block in allBlocks" class="bg-white rounded-2xl shadow-xl w-96 p-9 min-h-[850px]">
            <h3 class="text-main text-4xl font-bold text-center">{{ block.package_banner_title }}</h3>
            <hr
                class="w-1/3 m-auto my-5 h-1 rounded-full border-none"
                :style="{ backgroundColor: block.package_color }"
            />
            <div class="text-center font-bold text-xl h-20 flex items-center justify-center">
                <span>{{ block.package_subtitle }}</span>
            </div>
            <hr
                class="w-1/3 m-auto my-5 h-1 rounded-full border-none"
                :style="{ backgroundColor: block.package_color }"
            />
            <ul>
                <li v-for="item in block.package_options" class="text-lg">
                    <span v-if="item.active" class="text-orange font-bold">✓</span>
                    <span v-if="!item.active" class="text-orange font-bold invisible">✓</span>

                    <span class="ml-2" :class="!item.active ? 'text-[#AAAAAA]' : ''">{{ item.name }}</span>
                </li>
            </ul>

            <div v-html="block.package_subtext" class="text-center"></div>
        </div>
    </div>
    <div>
        <div v-for="block in allBlocks" class=" grid md:grid-cols-2 my-10 gap-32 items-center w-5/6 m-auto min-h-[500px]">
                <div v-if="block.image">
                    <img :src="block.image_link" alt="">
                </div>
                <div class="border-l-8 py-8 px-14 bg-[#F8F7F7] min-h-[350px]" :style="{borderColor: block.package_color}">
                    <h2 class="font-bold text-2xl ">
                        {{block.description_title}}
                    </h2>
                    <div v-html="block.description_text"></div>
                </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';


const props = defineProps({
    blocks: {
        type: Object,
        required: true
    }
})


const allBlocks = computed(() => {
    return props.blocks.map(el => {
        return {
            ...el.dynamic_blocks_id,
            image_link: `https://admin.swsreports.app/assets/${el.dynamic_blocks_id.image}`
        }
    })
})

</script>

<style lang="postcss">
p {
    @apply my-3;
}
</style>