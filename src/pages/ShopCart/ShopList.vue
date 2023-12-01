<script setup lang="ts">
import consola from "consola";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { FilterMatchMode } from "primevue/api";
import { useDataStore } from "@/store/data";
import useDataTable from "@/composables/primevue/useDataTable";
import { ActionTypes as ActionProductTypes } from "@/store/product/types";
import { ActionTypes as ActionShopCartTypes } from "@/store/shopcart/types";
import { formatCurrency } from "@/utils/formatters";

const toast = useToast();
const store = useDataStore();
const confirm = useConfirm();
const shopCart = computed(() => store.getters[`shopcart/cartList`]);
const loading = computed(() => store.getters[`shopcart/loading`]);
const { tableData, filters, dataTableRef, exportCSV } = useDataTable();
async function delShopCart(product, index) {
  confirm.require({
    message: `Esta seguro que deseas eliminar el item ${product.title}? `,
    header: "Eliminar de carrito",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Eliminar",
    rejectLabel: "Cancelar",
    accept: async () => {
      await store.dispatch(
        `shopcart/${ActionShopCartTypes.DEL_PRODUCT}`,
        product.id
      );
      toast.add({
        severity: "warn",
        summary: "Producto Eliminado",
        detail: "Se elimino correctamente",
        life: 3000,
      });
    },
    reject: () => {
      return true;
    },
  });
}
</script>

<template>
  <div class="card">
    <h5>Carrito de Compras</h5>

    <DataTable
      ref="dataTableRef"
      :value="shopCart"
      data-key="name"
      :global-filter-fields="['title', 'category', 'description', 'price']"
      striped-rows
      :loading="loading"
      paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      current-page-report-template="Mostrando {first} al {last}  "
    >
      <template #empty> No se encontraron resultados.</template>
      <Column header="Cantidad" class="text-center">
        <template #body="{ data, index }">
          <Button
            type="button"
            icon="pi pi-plus"
            text
            size="small"
            @click="data.quantity++"
          />
          <InputNumber
            v-model="data.quantity"
            class="flex flex-wrap align-items-center justify-content-center w-4rem"
            inputClass="w-4rem text-center "
            style="margin: 0 auto"
          />
          <Button
            type="button"
            icon="pi pi-minus"
            severity="danger"
            text
            size="small"
            @click="data.quantity--"
            :disabled="data.quantity <= 1"
          />
        </template>
      </Column>
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
      <Column header="Acciones">
        <template #body="{ data, index }">
          <Button
            type="button"
            icon="pi pi-minus-circle"
            severity="danger"
            text
            size="large"
            v-tooltip.top="{
              value: 'Quitar del carrito de compras',
              pt: {
                arrow: {
                  style: {
                    borderBottomColor: 'var(--primary-secondary)',
                  },
                },
                text: 'bg-primary font-medium',
              },
            }"
            @click="delShopCart(data, index)"
          />
        </template>
      </Column>
      <template #footer>
        <div class="h-12">
          <span class="float-right"
            >Total :
            {{
              formatCurrency(
                shopCart
                  ? shopCart.reduce(
                      (total, item) => item.quantity * item.price + total,
                      0
                    )
                  : 0
              )
            }}
          </span>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<style scoped></style>
