import api from "./api";

export const productosServices = {
  async getProducts() {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      console.error("Error en getProducts:", error);
      throw error;
    }
  },

  async getCategorias() {
    try {
      const { data } = await api.get("/products/categories");
      return data;
    } catch (error) {
      console.error("Error en getCategorias:", error);
      throw error;
    }
  },
};