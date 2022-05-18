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
    <div v-if="store.loading" class="w-screen">
        <div class="m-auto w-1/3 text-center pt-36">
            <fa-icon :icon="['fas', 'spinner']" size="2x" class="animate-spin" />
            <p>{{ randText }}</p>
        </div>
    </div>
</template>

<script>
import api from "../plugins/api"
import BaseSection from "../components/BaseSection.vue"
import FullWidthBanner from "../components/FullWidthBanner.vue";
import DataColumns from "../components/DataColumns.vue";
import BaseQuote from "../components/BaseQuote.vue";
import DynamicBlocks from "../components/DynamicBlocks.vue";
import { useStore } from "../store/main";

export default {
    setup() {
        const store = useStore()
        return { store }
    },
    data() {
        return {
            sections: null,
            interval: null,
            textIndex: 0,
            textOptions: [
                'Fetching our live story',
                'Did you know we were founded in 2005?',
                'Did you know we go on a skitrip with the company every year?'
            ]
        };
    },
    mounted() {
        this.fetchSections();
        this.setint()
    },
    beforeUnmount() {
        clearInterval(this.interval)
    }
    ,
    methods: {
        fetchSections() {
            api.get("/items/partner_page", {
                params: {
                    sort: "position",
                    fields: "title, data_columns, position, description, quote, dynamic_blocks.dynamic_blocks_id.*",
                    filter: {
                        is_package_page: {
                            _eq: false
                        }
                    }
                }
            }).then(res => {
                this.sections = res.data.data;
                clearInterval(this.interval)
            });
        },
        checkComponent(section, which) {
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
        },
        setint() {
            this.textOptions = this.textOptions.sort((a, b) => 0.5 - Math.random());
            this.interval = setInterval(() => {
                if (this.textIndex === this.textOptions.length - 1) {
                    return this.textIndex = 0
                }
                this.textIndex++
            }, 2000);
        }
    },
    computed: {
        randText() {
            return this.textOptions[this.textIndex]
        }
    },
    components: { BaseSection, FullWidthBanner, DataColumns, BaseQuote, DynamicBlocks }
}
</script>
