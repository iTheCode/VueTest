<script setup lang="ts">
import consola from "consola";
import { useToast } from "primevue/usetoast";
import { FilterMatchMode } from "primevue/api";
import { useDataStore } from "@/store/data";
import useDataTable from "@/composables/primevue/useDataTable";
import { ActionTypes as ActionProductTypes } from "@/store/product/types";
import { ActionTypes as ActionShopCartTypes } from "@/store/shopcart/types";
import { formatCurrency } from "@/utils/formatters";
import CategorySelect from "./components/categorySelect.vue";
import SearchBar from "./components/searchBar.vue";

const toast = useToast();
const store = useDataStore();
const products = computed(() => store.getters[`product/productList`]);
const loading = computed(() => store.getters[`product/loading`]);
const { tableData, filters, dataTableRef, exportCSV } = useDataTable();

filters.value = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  category: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  price: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
};

async function addShopCart(product, index) {
  await store.dispatch(`shopcart/${ActionShopCartTypes.ADD_PRODUCT}`, product);

  toast.add({
    severity: "success",
    summary: "Producto Añadido",
    detail: "Se agrego correctamente",
    life: 3000,
  });
}

// mounted
onMounted(async () => {
  await store.dispatch(`product/${ActionProductTypes.GET_PRODUCTS}`);
});
</script>

<template>
  <div class="card">
    <h5>Lista de Productos</h5>

    <DataTable
      ref="dataTableRef"
      v-model:filters="filters"
      :value="products"
      data-key="name"
      :global-filter-fields="['title', 'category', 'description', 'price']"
      striped-rows
      :paginator="true"
      :rows="10"
      :loading="loading"
      paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rows-per-page-options="[10, 20, 50]"
      current-page-report-template="Mostrando {first} al {last}  "
    >
      <template #header>
        <div class="datatable-header h-10">
          <SearchBar :filters="filters" />
          <CategorySelect :filters="filters" />
        </div>
      </template>
      <template #empty> No se encontraron resultados. </template>
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="`${slotProps.data.image}`"
            :alt="slotProps.data.image"
            class="w-6rem shadow-2 border-round"
          />
        </template>
      </Column>
      <Column field="title" header="Nombre" :sortable="true" />
      <Column field="price" header="Price" :sortable="true">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="category" header="Categoria" :sortable="true" />
      <Column field="description" header="Descripcion" :sortable="true">
        <template #body="slotProps">
          <span
            v-tooltip.top="{
              value: slotProps.data.description,
              pt: {
                arrow: {
                  style: {
                    borderBottomColor: 'var(--primary-secondary)',
                  },
                },
                text: 'bg-primary font-medium',
              },
              showDelay: 300,
              hideDelay: 300,
            }"
          >
            {{ slotProps.data.description.substring(0, 45) }}...
          </span>
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data, index }">
          <Button
            type="button"
            icon="pi pi-cart-plus"
            text
            size="large"
            v-tooltip.top="{
              value: 'Agregar al carrito de compras',
              pt: {
                arrow: {
                  style: {
                    borderBottomColor: 'var(--primary-color)',
                  },
                },
                text: 'bg-primary font-medium',
              },
            }"
            @click="addShopCart(data, index)"
          />
        </template>
      </Column>
      <template #footer>
        <div class="h-12">
          <span>Total : {{ products ? products.length : 0 }} </span>
          <Button
            class="float-right"
            icon="pi pi-external-link"
            label="Export"
            @click="exportCSV($event)"
          />
        </div>
      </template>
      <template #paginatorRight />
    </DataTable>
  </div>
</template>

<style scoped></style>
