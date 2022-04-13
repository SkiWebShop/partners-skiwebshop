<template>
    <div class="flex justify-center items-start md:pt-40 bg-blue bg-opacity-25 min-h-screen">
        <img
            src="https://admin.swsreports.app/assets/1f8f07fb-afc3-4b5f-97af-3c04799e8112.jpg"
            class="absolute inset-0 -z-40 pointer-events-none h-screen w-screen object-cover"
            alt
        />
        <div class="bg-white px-3 md:px-10 py-10 md:w-[400px] rounded-md shadow-xl">
            <img class="w-72 m-auto" src="https://www.skiwebshop.nl/media/logo/stores/1/logo.png" />

            <div class="mt-10 text-center" v-if="!store.isAuthenticated">
                <h1 class="text-3xl font-bold text-main">Log In</h1>
                <div>
                    <BaseForm @submit.prevent="loginUser($event.target.elements)" class="my-4">
                        <template v-slot:input="input">
                            <BaseInput placeholder="Your email" :required="true" autocomplete="username" />
                            <BaseInput
                                placeholder="Your password"
                                autocomplete="current-password"
                                :required="true"
                                type="password"
                            />
                        </template>
                        <template #submit>
                            <div>
                                <button
                                    type="submit"
                                    class="bg-blue text-white font-semibold py-3 px-5 w-2/3 rounded-full mt-5"
                                >Log in</button>
                                <a :href="loginLink" class="block text-main opacity-70 hover:opacity-100 text-sm mt-1 w-2/3 m-auto border-b border-white hover:border-blue hover:text-blue duration-300">Login met microsoft</a>
                            </div>
                        </template>
                    </BaseForm>
                </div>
            </div>
            <div class="mt-20" v-if="store.isAuthenticated">
                <h1 class="text-3xl font-bold text-blue">Logged In!</h1>
                <h3 class="text-xl mt-2">
                    Hi {{ user.first_name }}. You're succesfully logged in
                </h3>
                <router-link
                    to="/"
                    class="h-10 inline-flex bg-slate-200 w-30 px-3 py-2 rounded-md mt-3 mr-2"
                >
                    <p class="text-md font-semibold">Continue to home</p>
                </router-link>
                <button
                    @click="logout"
                    class="rounded-md mt-3 mr-2 text-sm underline"
                >Logout</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "../store/main"
import axios from 'axios'
import LoginViewButton from "../components/LoginViewButton.vue"
import BaseForm from "../components/BaseForm.vue"
import BaseInput from "../components/BaseInput.vue"

export default {
    setup() {
        const store = useStore();
        return {
            store,
        };
    },
    data() {
        return {
            showform: false,
        }
    },
    mounted() {
        if ('logout' in this.$route.query) {
            this.logout()
        } else {
            this.login()
        }

    },
    methods: {
        showForm() {
            this.showform = !this.showform
        },
        logout() {
            this.store.logout();
        },
        login() {
            if ("state" in this.$route.query) {
                this.refreshDirectus();
                this.$router.replace({ name: "Login" });
            }
        },
        loginUser(e) {
            console.log(e)
            axios({
                method: "POST",
                url: "https://admin.swsreports.app/auth/login",
                withCredentials: true,
                data: {
                    email: e['your_email'].value,
                    password: e['your_password'].value,
                    mode: 'cookie'
                }
            }).then(res => {
                this.refreshDirectus()
            })
        },
        refreshDirectus() {
            axios({
                method: "POST",
                url: "https://admin.swsreports.app/auth/refresh",
                withCredentials: true
            })
                .then(res => {
                    console.log(res)
                    this.store.setUser(res.data.data.access_token)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    computed: {
        loginLink() {
            const redirect_uri = new URL(window.location.href)
            redirect_uri.search = ''
            redirect_uri.searchParams.append('state', 'loggedin')
            return `https://admin.swsreports.app/auth/login/microsoft?redirect=${encodeURIComponent(redirect_uri)}`;
        },
        user() {
            return this.store.getUser;
        }
    },
    components: { LoginViewButton, BaseForm, BaseInput }
}
</script>
