<template>
    <div class="py-8">
        <div class="flex flex-wrap" v-if="isFullwidth">
            <FullWidthBanner :image="allBlocks.image" v-if="allBlocks.template === 'full_width_banner'" />
            <DynamicBlocksCTA 
                    :cta="allBlocks"
                    v-if="allBlocks.template === 'cta'"
                />
        </div>
        <div v-else class="grid grid-cols-2 gap-5">
            <div v-for="block in allBlocks" class="grow">
                <DynamicBlocksImageText
                    :image="block.image"
                    v-if="block.template === 'image_text_block'"
                >{{block.overlay_text}}</DynamicBlocksImageText>

                <DynamicBlocksContactCard
                    :contact="block"
                    v-if="block.template === 'contact_card'"
                />

                <DynamicBlocksChart 
                    :graph_data="block.graph_data"
                    :graph_template="block.chart_type"
                    v-if="block.template === 'chart'"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import FullWidthBanner from './FullWidthBanner.vue';
import DynamicBlocksImageText from './DynamicBlocksImageText.vue';
import DynamicBlocksContactCard from './DynamicBlocksContactCard.vue';
import DynamicBlocksCTA from './DynamicBlocksCTA.vue';
import DynamicBlocksChart from './DynamicBlocksChart.vue';

const props = defineProps({
    blocks: {
        type: Array
    }
})

const allBlocks = computed(() => {
    if (isFullwidth.value) {
        return props.blocks[0].dynamic_blocks_id
    } else {
        return props.blocks.map(el => {
            return {
                ...el.dynamic_blocks_id
            }
        })
    }
})

const isFullwidth = computed(() => {
    try {
        return ( 
            props.blocks[0].dynamic_blocks_id.template === 'full_width_banner' ||
            props.blocks[0].dynamic_blocks_id.template === 'cta'
        )
    } catch (error) {
        return false
    }
})

</script>