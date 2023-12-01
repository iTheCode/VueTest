<script setup lang="ts">
import { useDataStore } from "@/store/data";
import { formatCurrency } from "@/utils/formatters";
const emit = defineEmits(["menuToggle", "topbarMenuToggle"]);

const op = ref<any>(null);

const store = useDataStore();
const shopCart = computed(() => store.getters[`shopcart/cartList`]);
function toggle(event: any) {
  op.value.toggle(event);
}

function onMenuToggle(event: any) {
  emit("menuToggle", event);
}
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <span>Vue Technical Test</span>
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars" />
    </button>

    <button
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        toggleClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
      class="p-link layout-topbar-menu-button layout-topbar-button"
    >
      <i class="pi pi-ellipsis-v" />
    </button>

    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        Total ({{ shopCart ? shopCart.length : 0 }}) :
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
      </li>
    </ul>
  </div>
</template>

<style scoped>
.hidden {
  display: none !important;
}

@media (min-width: 1024px) {
  .lg\:flex {
    display: flex !important;
  }
}
</style>
