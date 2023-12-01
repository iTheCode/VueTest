<script setup lang="ts">
defineProps<{
  filters?: any;
}>();
</script>
<template>
  <span class="p-input-icon-left" float-right>
    <i class="pi pi-search" />
    <InputText
      v-model="filters.global.value"
      placeholder="Filtrar busqueda"
      class="w-full md:w-14rem"
    />
  </span>
</template>
