<template>
<div>
    <form
        @submit.prevent="save"
        class="flex flex-col"
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

        <div class="save mt-6">
            <button 
                class="px-2 py-2 w-full transition-all
                        font-bold text-yellow-400
                        border rounded border-yellow-400
                        hover:text-white hover:bg-yellow-400"
            >Save</button>
        </div>

        <div class="back mt-3">
            <button 
                class="px-2 py-2 w-full transition-all
                        font-bold text-red-400
                        border rounded border-red-400
                        hover:text-white hover:bg-red-400"
                @click.prevent="() => $router.back()"
            >Cancel</button>
        </div>
    </form>
</div>
</template>

<script>
import { mapState } from 'vuex'

import { URL_BASE } from '@/config'

export default {
    created() {
        this.fetchNote()
    },
    data() {
        return {
            errors: [],
            title: '',
            content: ''
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
        fetchNote() {
            axios.get(`${URL_BASE}/notes/${this.id}`, {
                headers: {
                    Authorization: `Token ${this.token}`
                }
            }).then(response => {
                this.title = response.data.title
                this.content = response.data.content
            })
        },
        save() {
            const note = {
                title: this.title,
                content: this.content,
            }

            if (!this.validate()) { return }

            axios.put(`${URL_BASE}/notes/${this.id}/`, note, {
                headers: {
                    Authorization: `Token ${this.token}`
                }
            }).then(response => {
                if (response.status === 200) {
                    this.$router.push({ 
                        name: 'notes-detail', 
                        params: { id: this.id }
                    })
                }
            })
        }
    },
    computed: {
        ...mapState(['token']),
        id() { return this.$route.params.id }
    }
}
</script>
