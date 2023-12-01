<script setup lang='ts'>

useHead({
  title: 'Vue Technical Test',
  meta: [
    {
      name: 'description',
      content: 'Vue Technical Test',
    },
  ],
})
</script>

<template>
  <div id="bar" />
  <router-view />
</template>

<style lang='scss'>
@import 'App.scss';
</style>
