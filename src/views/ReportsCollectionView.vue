<template>
    <div class="h-full md:px-36 px-3 md:py-10 py-4">
        <h2 class="font-bold text-2xl mb-2">Beschikbare rapportages</h2>
        <div class="grid grid-cols-4 gap-6">
            <router-link
                v-for="report in reports"
                :to="{ name: 'Report', params: { slug: report.slug } }"
            >
                <div
                    class="bg-slate-100 shadow-md gap-4 p-3 h-36 flex items-center justify-center group"
                >
                    <span>{{ report.name }}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import api from '../plugins/api'

export default {
    data() {
        return {
            reports: {},
        }
    },
    mounted() {
        console.log(this.$route)
        api.get('/items/Reports')
            .then(res => {
                this.reports = res.data?.data
            })
            .catch(err => { })
    },
    methods: {
        getSrc(key = '') {
            if (key === this.currentsection || key in this.loadedpages) {
                this.loadedpages[key] = true
                return this.report.url + this.getParam(key)
            } else {
                return null
            }
        },
        getParam(key) {
            if (this.currentsection === null) {
                return ''
            } else {
                return '&pageName=' + key
            }
        },
        setCurrentsection() {
            if (this.report.pages === null) {
                this.report.pages = [{
                    title: 'Main',
                    link: null,
                }]
            }

            if (this.report.pages.length > 0) {
                this.currentsection = this.report.pages[0].link
            }

        }
    },
    computed: {
        section() {
            if (this.currentsection === null) {
                return this.report.pages[0].link
            } else {
                return this.currentsection
            }
        },
        countPages() {
            if ('pages' in this.report) {
                return this.report.pages.length > 1
            } else {
                return false
            }
        }
    },
    watch: {
        currentsection(neww, oldw) {
            console.log(neww, oldw)
        }
    }
}
</script>
<style>
html,
body,
#app,
.md\:flex {
    height: 100%;
}
</style>