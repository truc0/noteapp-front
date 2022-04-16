<template>
<div class="mt-16">
    <div class="toolbar flex justify-between">
        <div class="left">
            <h1 class="text-2xl font-bold">Note List</h1>
        </div>
        <div class="right flex items-center">
            <button 
                class="flex justify-center items-center
                        rounded px-2 py-1 transition-all
                        text-gray-500 hover:text-gray-900"
                title="Create"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    </div>

    <hr class="my-3">

    <ul class="notes">
        <li v-for="note in notes">
            #{{ note.id }} | {{ note.title }}
        </li>
    </ul>
</div>
</template>

<script>
import { mapState } from 'vuex'

import { URL_BASE } from '@/config'

export default {
    mounted() {
        this.fetchNotes()
    },
    data() {
        return {
            notes: [
                {
                    id: 1,
                    title: 'HelloWorld',
                    content: 'The content goes here'
                }
            ]
        }
    },
    methods: {
        fetchNotes() {
            axios.get(`${URL_BASE}/notes/`, {
                headers: {
                    Authorization: `Token ${this.token}`
                }
            }).then(response => {
                this.notes = response.data
            })
        }
    },
    computed: {
        ...mapState(['token'])
    }
}
</script>