<template>
<div class="mt-16">
    <div class="toolbar flex justify-between">
        <div class="left">
            <h1 class="text-2xl font-bold"
                v-text="title"></h1>
        </div>

        <div class="right">
            <button
                class="rounded px-2 py-1 transition-all
                        text-red-400 hover:text-red-600"
                title="Delete"
                @click="deleteNote"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    </div>

    <hr class="my-3">

    <div class="content" v-text="content"></div>
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
            title: 'Title',
            content: 'Content goes here!',
        }
    },
    methods: {
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
        deleteNote() {
            if (!confirm('Are you sure you want to delete this?')) { return }

            axios.delete(`${URL_BASE}/notes/${this.id}`, {
                headers: {
                    Authorization: `Token ${this.token}`
                }
            }).then(response => {
                if (response.status === 204) {
                    this.$router.push({ name: 'home' })
                } else {
                    console.log(response)
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
