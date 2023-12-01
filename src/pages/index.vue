<script setup lang="ts">
import AdvertiseBox from "@/components/AdvertiseBox.vue";
</script>

<template>
  <div class="surface-0 text-center">
    <h2 class="text-2xl pb-6">Vue Technical Test</h2>
    <div class="grid grid-cols-1 gap-4">
      <AdvertiseBox header="Componentes" icon="pi-check-circle">
        Creacion de Componentes
      </AdvertiseBox>
      <AdvertiseBox header="Consumo de API" icon="pi-check-circle">
        Conexion via axios client.
      </AdvertiseBox>
      <AdvertiseBox header="Listados" icon="pi-check-circle">
        Productos y Categorias
      </AdvertiseBox>
      <AdvertiseBox header="Vuex" icon="pi-check-circle">
        Fluido de datos via Vuex Store
      </AdvertiseBox>
    </div>
  </div>
</template>

<style scoped></style>
