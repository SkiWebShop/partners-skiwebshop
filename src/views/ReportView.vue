<template>
    <div class="h-full">
        <div v-if="countPages" class="flex gap-3 mb-10 md:mb-0 py-1">
            <button v-for="page in report.pages" class>
                <input
                    class="hidden peer"
                    type="radio"
                    :value="page.link"
                    v-model="currentsection"
                    :id="page.link"
                />
                <label
                    :for="page.link"
                    class="peer-checked:underline rounded px-2 py-1 hover:cursor-pointer"
                >{{ page.name }}</label>
            </button>
            <div class="relative">
                <button @click="faqshow = !faqshow">
                    <fa-icon icon="question" />
                </button>
                <div
                    class="absolute w-[400px] bg-lightblue bg-opacity-90 rounded-md shadow-md px-2 py-2"
                    v-if="faqshow"
                >
                    <div v-for="faq in report.faq" class="mt-2 first:mt-0">
                        <button class="font-semibold peer">{{ faq.question }}</button>
                        <p v-html="faq.answer" class="hidden peer-focus:block"></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-full grow">
            <iframe
                v-for="page in report.pages"
                v-show="page.link === section"
                :src="getSrc(page.link)"
                frameborder="0"
                class="w-full h-full"
            ></iframe>
        </div>
    </div>
</template>
<script>
import api from '../plugins/api'

export default {
    data() {
        return {
            report: {},
            currentsection: null,
            loadedpages: {},
            faqshow: false
        }
    },
    mounted() {
        console.log(this.$route)
        api.get('/items/Reports', {
            params: {
                filters: {
                    slug: {
                        _eq: this.$route?.params?.slug
                    }
                }
            }
        })
            .then(res => {
                this.report = res?.data?.data[0]
                this.setCurrentsection()
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