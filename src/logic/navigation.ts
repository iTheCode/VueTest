export const navigationMenu = [
  {
    label: "Inicio",
    items: [
      {
        label: "Resumen",
        icon: "pi pi-fw pi-book",
        to: "/",
      },
    ],
  },
  {
    label: "Listas",
    icon: "pi pi-fw pi-clone",
    items: [
      {
        label: "Productos",
        icon: "pi pi-fw pi-shopping-bag",
        to: "/Product/ProductList",
      },
      {
        label: "Categorias",
        icon: "pi pi-fw pi-tags",
        to: "/Category/CategoryList",
      },
    ],
  },
  {
    label: "Compras",
    icon: "pi pi-fw pi-clone",
    items: [
      {
        label: "Carrito",
        icon: "pi pi-fw pi-shopping-cart",
        to: "/ShopCart/ShopList",
      },
    ],
  },
];
