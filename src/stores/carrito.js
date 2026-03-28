import { defineStore } from "pinia";

defineStore;

export const useCarrito = defineStore("carrito", {
  state: () => ({
    carrito: [],
  }),
  actions: {
    agregarAlCarrito(producto) {
      const productoEnCarrito = this.carrito.find(
        (item) => item.producto.id === producto.id,
      );

      if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
      } else {
        this.carrito.push({
          producto: producto,
          cantidad: 1,
        });
      }
    },
  },
  getters: {
    total() {
      return this.carrito.reduce((total, item) => {
        return total + item.producto.precio * item.cantidad;
      }, 0);
    },
  },
});

// modelo

const modeloCarroProducto = {
  producto: {},
  cantidad: Number,
};
