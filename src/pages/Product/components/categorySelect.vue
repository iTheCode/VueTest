<script setup lang="ts">
import { ref } from "vue";
import { useDataStore } from "@/store/data";
import { ActionTypes as ActionProductTypes } from "@/store/product/types";

const selectedCategory = ref();
const dropdownData: Ref<any[]> = ref([]);

const store = useDataStore();
const categories = computed(() => store.getters[`product/categoryList`]);

async function searchByCategory(category) {
  if (!!category)
    await store.dispatch(
      `product/${ActionProductTypes.GET_PRODUCTS_BY_CATEGORY}`,
      category.code
    );
  else await store.dispatch(`product/${ActionProductTypes.GET_PRODUCTS}`);
}

// mounted
onMounted(async () => {
  await store.dispatch(`product/${ActionProductTypes.GET_CATEGORIES}`);
});
</script>
<template>
  <span class="p-input-icon-left" float-left>
    <Dropdown
      v-model="selectedCategory"
      :options="categories"
      optionLabel="name"
      placeholder="Filtrar por categoria"
      class="w-full md:w-18rem"
      @update:modelValue="searchByCategory"
      :showClear="true"
    />
  </span>
</template>
