<template>
  <div id="app" class="flex flex-col">
    <header>

    </header>

    <main class="w-10/12 mx-auto">
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