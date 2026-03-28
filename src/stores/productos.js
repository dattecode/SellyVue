import { defineStore } from "pinia";
import { productosServices } from "@/services/productosServices";

export const useProductos = defineStore("productos", {
  state: () => ({
    productos: [],
    categorias: [],
    productosActivos: [],
    favoritos: [],
  }),
  getters: {},
  actions: {
    async getApiData() {
      try {
        const apiProductos = await productosServices.getProducts();
        const apiCategorias = await productosServices.getCategorias();

        this.productos = apiProductos;
        this.categorias = apiCategorias;
        this.productosActivos = apiProductos;
      } catch (error) {
        console.log(error);
      }
    },
    getProductByCategory(category) {
      if (category === "all") {
        this.productosActivos = this.productos;
        return;
      }
      this.productosActivos = this.productos.filter(
        (p) => p.category === category,
      );
    },
  },
});
