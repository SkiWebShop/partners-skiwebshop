<template>
    <div class="relative" >
        <canvas ref="chartCanvas" :key="graph_data"></canvas>
    </div>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import { chart } from '../plugins/chart';


const props = defineProps({
    graph_data: {
        type: Object
    },
    graph_template: {
        type: String
    },
    graph_title: {
        type: String
    }
})

const chartCanvas = ref(null)
const createChart = () => {
    bigChart = chart(chartCanvas.value, props.graph_template, props.graph_data, props.graph_title)
}


onMounted(() => {
    setTimeout(() => {
        createChart()
    }, 1000);
})



</script>