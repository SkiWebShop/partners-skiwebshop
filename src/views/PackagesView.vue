<template>
    <div v-if="sections && !store.loading" class="text-main py-10">
        <BaseSection v-for="section in sections">
            <template #title>{{ section.title }}</template>
            <div v-html="section.description" class="text-xl content-section"></div>

            <DataColumns
                v-if="checkComponent(section, 'DataColumns')"
                :data="section.data_columns"
            />

            <BaseQuote v-if="checkComponent(section, 'BaseQuote')">{{ section.quote }}</BaseQuote>

            <DynamicBlocks :blocks="section.dynamic_blocks" />
        </BaseSection>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../plugins/api';
import { useStore } from '../store/main';
import BaseSection from '../components/BaseSection.vue';
import DynamicBlocks from '../components/DynamicBlocks.vue';
import BaseQuote from '../components/BaseQuote.vue';
import DataColumns from '../components/DataColumns.vue';


const store = useStore()

const sections = ref([])
const fetchSections = _ => {
    api.get("/items/partner_page", {
        params: {
            sort: "position",
            fields: "title, data_columns, position, description, quote, dynamic_blocks.dynamic_blocks_id.*",
            filter: {
                is_package_page: {
                    _eq: true
                }
            }
        }
    }).then(res => {
        sections.value = res.data.data;
    });
}
const checkComponent = (section, which) => {
    if (which === 'DataColumns') {
        return 'data_columns' in section &&
            section.data_columns &&
            section.data_columns.length > 0

    }
    if (which === 'BaseQuote') {
        return 'quote' in section &&
            section.quote &&
            section.quote.length > 0

    }
}
onMounted(() => fetchSections())
</script>