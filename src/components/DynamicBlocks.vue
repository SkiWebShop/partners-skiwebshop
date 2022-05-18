<template>
    <div class="py-8">
        <div class="flex flex-wrap" v-if="isFullwidth">
            <FullWidthBanner
                :image="allBlocks.image"
                v-if="allBlocks.template === 'full_width_banner'"
            />
            <DynamicBlocksCTA :cta="allBlocks" v-if="allBlocks.template === 'cta'" />
            <DynamicBlocksPackageBanner v-if="allBlocks.template === 'package_banner'" :blocks="blocks"  />
        </div>
        <div v-else class="grid md:grid-cols-2 gap-5">
            <div v-for="block in allBlocks" class="grow" :class="extraClass(block)">
                <DynamicBlocksImageText
                    :image="block.image"
                    v-if="block.template === 'image_text_block'"
                >{{ block.overlay_text }}</DynamicBlocksImageText>

                <DynamicBlocksContactCard
                    :contact="block"
                    v-if="block.template === 'contact_card'"
                />

                <DynamicBlocksChart
                    :graph_data="block.graph_data"
                    :graph_template="block.chart_type"
                    :graph_options="{
                        chart_title: block.chart_title,
                        chart_label: block.chart_label,
                        chart_datatype: block.chart_datatype
                    }"
                    :style="getStyle(block)"
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
import DynamicBlocksPackageBanner from './DynamicBlocksPackageBanner.vue';

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

const extraClass = (block) => {
    const classes = []
    if (block.chart_type) {
        if (block.chart_style === "chart_fullwidth") {
            classes.push('col-span-full')
        }
    }

    return classes

}

const getStyle = (block) => {
    if(block.chart_type === 'world_map') {
        return {
            height: '500px'
        }
    }

    if(block.chart_style === 'chart_fullwidth') {
        return {
            heigth: '300px'
        }    
    } else {
        return {
            height: '400px'
        }
    }
}

const isFullwidth = computed(() => {
    try {
        return (
            props.blocks[0].dynamic_blocks_id.template === 'full_width_banner' ||
            props.blocks[0].dynamic_blocks_id.template === 'cta' ||
            props.blocks[0].dynamic_blocks_id.template === 'package_banner'
        )
    } catch (error) {
        return false
    }
})

</script>