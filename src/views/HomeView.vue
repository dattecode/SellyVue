<script setup>
import { useProductos } from '@/stores/productos';
import { onMounted } from 'vue';
import ProductList from '@/components/products/ProductList.vue';

const productos = useProductos();

onMounted(() => {
  productos.getApiData();
})

</script>

<template>
  <main class="main">
    <ProductList />
  </main>
</template>

<style scoped>
.main {
  flex-grow: 1;
}
</style>
