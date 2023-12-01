<script setup lang="ts">
import consola from "consola";

import { FilterMatchMode } from "primevue/api";
import { useDataStore } from "@/store/data";
import useDataTable from "@/composables/primevue/useDataTable";
import { ActionTypes as ActionProductTypes } from "@/store/product/types";
import { formatCurrency } from "@/utils/formatters";
import SearchBar from "../Product/components/searchBar.vue";

const store = useDataStore();
const categories = computed(() => store.getters[`product/categoryList`]);
const loading = computed(() => store.getters[`product/loading`]);
const { tableData, filters, dataTableRef, exportCSV } = useDataTable();

filters.value = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

// mounted
onMounted(async () => {
  await store.dispatch(`product/${ActionProductTypes.GET_CATEGORIES}`);
});
</script>

<template>
  <div class="card">
    <h5>Lista de Categorias</h5>

    <DataTable
      ref="dataTableRef"
      v-model:filters="filters"
      :value="categories"
      striped-rows
      :paginator="true"
      :rows="10"
      :loading="loading"
      paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      current-page-report-template="Mostrando {first} al {last}  "
    >
      <template #header>
        <div class="datatable-header h-10">
          <SearchBar :filters="filters" />
        </div>
      </template>
      <template #empty> No se encontraron resultados. </template>
      <Column field="name" header="Nombre" :sortable="true" />
      <template #footer>
        <div class="h-12">
          <span>Total : {{ categories ? categories.length : 0 }} </span>
        </div>
      </template>
      <template #paginatorRight />
    </DataTable>
  </div>
</template>

<style scoped></style>
