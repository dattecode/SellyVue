<script setup>
import { computed } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProductos } from '@/stores/productos'

const productos = useProductos()
const productosActivos = computed(() => productos.productosActivos)
</script>

<template>
  <!-- ── Page wrapper ───────────────────────────────────── -->
  <section class="product-list-page">

    <!-- Header -->
    <header class="product-list__header">
      <div class="product-list__header-text">
        <h1 class="product-list__title">Catálogo</h1>
        <p class="product-list__subtitle">
          {{ productosActivos.length }}
          {{ productosActivos.length === 1 ? 'producto disponible' : 'productos disponibles' }}
        </p>
      </div>
    </header>

    <!-- Divider -->
    <div class="product-list__divider" />

    <!-- Grid -->
    <div v-if="productosActivos.length" class="product-list__grid">
      <ProductCard
        v-for="producto in productosActivos"
        :key="producto.id"
        :producto="producto"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="product-list__empty">
      <span class="material-symbols-outlined product-list__empty-icon">inventory_2</span>
      <p class="product-list__empty-title">Sin productos</p>
      <p class="product-list__empty-subtitle">No hay productos activos en este momento.</p>
    </div>

  </section>
</template>


<style scoped>
/* ── Page ───────────────────────────────────────────────── */
.product-list-page {
  padding: 32px 24px 64px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ── Header ─────────────────────────────────────────────── */
.product-list__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 12px;
}

.product-list__title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--md-on-surface);
  line-height: 1;
}

.product-list__subtitle {
  margin-top: 4px;
  font-size: 14px;
  color: var(--md-on-surface-variant);
}

/* ── Divider ────────────────────────────────────────────── */
.product-list__divider {
  height: 1px;
  background-color: var(--md-outline-variant);
  margin-bottom: 32px;
}

/* ── Grid ───────────────────────────────────────────────── */
.product-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

/* ── Empty state ────────────────────────────────────────── */
.product-list__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  gap: 8px;
  text-align: center;
}

.product-list__empty-icon {
  font-size: 64px;
  font-variation-settings: 'FILL' 0, 'wght' 200;
  color: var(--md-outline-variant);
  margin-bottom: 8px;
}

.product-list__empty-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--md-on-surface);
}

.product-list__empty-subtitle {
  font-size: 14px;
  color: var(--md-on-surface-variant);
}

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 600px) {
  .product-list-page {
    padding: 20px 16px 40px;
  }

  .product-list__title {
    font-size: 24px;
  }

  .product-list__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .product-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  justify-items: center;
}
}

</style>