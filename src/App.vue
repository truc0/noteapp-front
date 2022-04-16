<template>
  <div id="app" class="flex flex-col">
    <header class="mb-4">
      <div class="wrapper w-10/12 mx-auto mt-4">
        <router-link to="/">
          <h1 class="text-3xl hover:underline">
            <span class="font-bold">Note</span>
            <span class="italic">App</span>
          </h1>
        </router-link>
      </div>
    </header>

    <main class="w-10/12 mx-auto mt-4">
      <router-view />
    </main> 

    <footer>

    </footer>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('fetchToken')
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}
</style>