<template>
<div>
    <form 
        @submit.prevent="login"
        class="flex flex-col mt-16"
    >
        <ul
            v-if="errors.length !== 0"
            class="errors 
                    border rounded border-red-400 
                    bg-red-100 px-2 py-2 mb-4"
        >
                <li 
                    v-for="e in errors" 
                    v-text="e"
                    class="list-disc list-inside"
                ></li>
        </ul>

        <div class="field mt-2">
            <label for="username" class="font-bold block text-lg">Username</label>
            <input 
                class="mt-1 px-2 py-1 w-full
                    border rounded outline-none 
                    focus:ring"
                type="text" 
                name="username"
                v-model="username"
            >
        </div>

        <div class="field mt-2">
            <label for="password" class="font-bold block text-lg">Password</label>
            <input 
                class="mt-1 px-2 py-1 w-full
                    border rounded outline-none 
                    focus:ring"
                type="password" 
                name="password"
                v-model="password"
            >
        </div>

        <div class="submit mt-6">
            <button 
                class="px-2 py-2 w-full transition-all
                        font-bold text-yellow-400
                        border rounded border-yellow-400
                        hover:text-white hover:bg-yellow-400"
            >Login</button>
        </div>
    </form>
</div>
</template>

<script>
import { URL_BASE } from '@/config'

export default {
    data() {
        return {
            errors: [],
            username: '',
            password: ''
        }
    },
    methods: {
        validate() {
            this.errors.length = 0

            if (this.username === '') {
                this.errors.push('Username cannot be empty')
            }
            if (this.password === '') {
                this.errors.push('Password cannot be empty')
            }

            return this.errors.length === 0
        },

        login() {
            const credentials = {
                username: this.username,
                password: this.password
            }

            if (!this.validate()) { return }

            axios.post(`${URL_BASE}/auth/login`, credentials)
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data.token)
                        this.$store.commit('setToken', response.data.token)
                    } else {
                        this.errors.length = 0
                        this.errors.push(`Internal error with status ${response.status}`)
                    }
                }).catch(e => {
                    if (e.response.status === 400) {
                        this.errors.length = 0
                        this.errors.push('Invalid username or password')
                    } else {
                        this.errors.push('Unknown error')
                        console.log(e)
                    }
                }).then(() => {
                    this.$router.push({
                        name: 'home'
                    })
                })
        }
    }
}
</script>