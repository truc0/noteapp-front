<template>
<div>
    <form 
        @submit.prevent="create"
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
            <label for="title" class="font-bold block text-lg">Title</label>
            <input 
                class="mt-1 px-2 py-1 w-full
                    border rounded outline-none 
                    focus:ring"
                type="text" 
                name="title"
                v-model="title"
            >
        </div>

        <div class="field mt-2">
            <label for="content" class="font-bold block text-lg">Content</label>
            <textarea
                class="mt-1 px-2 py-1 w-full
                    border rounded outline-none 
                    focus:ring"
                name="content"
                v-model="content"
            ></textarea>
        </div>

        <div class="submit mt-6">
            <button 
                class="px-2 py-2 w-full transition-all
                        font-bold text-yellow-400
                        border rounded border-yellow-400
                        hover:text-white hover:bg-yellow-400"
            >Create</button>
        </div>
    </form>
</div>
</template>

<script>
import { mapState } from "vuex"

import { URL_BASE } from '@/config'

export default {
    data() {
        return {
            errors: [],
            title: '',
            content: '',
        }
    },
    methods: {
        validate() {
            this.errors.length = 0

            if (this.title === '') {
                this.errors.push('Title cannot be empty')
            }
            if (this.content === '') {
                this.errors.push('Content cannot be empty')
            }

            return this.errors.length === 0
        },
        create() {
            const note = {
                title: this.title,
                content: this.content,
            }

            if (!this.validate()) { return }

            axios.post(`${URL_BASE}/notes/`, note, {
                headers: {
                    Authorization: `Token ${this.token}`
                }
            }).then(response => {
                console.log(response.data)
            }).catch(e => {
                if (e.status === 400) {
                    this.errors.length = 0
                    this.errors.push('Unknown error')
                }
            })
        }
    },
    computed: {
        ...mapState(['token']),
    }
}
</script>
