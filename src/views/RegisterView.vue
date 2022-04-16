<template>
<div>
    <form 
        @submit.prevent="register"
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

        <div class="field">
            <label for="email" class="font-bold block text-lg">Email</label>
            <input 
                class="mt-1 px-2 py-1 w-full
                    border rounded outline-none 
                    focus:ring"
                type="text" 
                name="email"
                v-model="email"
            >
        </div>

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

        <div class="field mt-2">
            <label for="password" class="font-bold block text-lg">
                Confirm Password
            </label>
            <input 
                class="mt-1 px-2 py-1 w-full
                    border rounded outline-none 
                    focus:ring"
                type="password" 
                name="password"
                v-model="passwordConfirm"
            >
        </div>

        <div class="submit mt-6">
            <button 
                class="px-2 py-2 w-full transition-all
                        font-bold text-yellow-400
                        border rounded border-yellow-400
                        hover:text-white hover:bg-yellow-400"
            >Register</button>
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios'

import { URL_BASE } from '@/config'

export default {
    data() {
        return {
            email: '',
            username: '',
            password: '',
            passwordConfirm: '',
            errors: []
        }
    },
    methods: {
        validate() {
            this.errors = []

            if (this.email === '') {
                this.errors.push('Email cannot be empty')
            } else if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                this.errors.push('Email is not valid')    
            }

            if (this.username === '') {
                this.errors.push('Username cannot be empty')
            }

            if (this.password === '') {
                this.errors.push('Password cannot be empty')
            }

            if (this.passwordConfirm !== this.password) {
                this.errors.push('Password does not match')
            }

            return this.errors.length === 0
        },
        register() {
            const info = {
                email: this.email,
                username: this.username,
                password: this.password,
            }

            if (!this.validate()) {
                return
            }

            axios.post(`${URL_BASE}/auth/register`, info)
                .then(response => {
                    if (response.status === 201) {
                        console.log('Created')
                    }
                }).catch(e => {
                    this.errors.push('Unknown error')
                    console.log(e)
                })
        }
    }
}
</script>

<style lang="scss">
</style>
