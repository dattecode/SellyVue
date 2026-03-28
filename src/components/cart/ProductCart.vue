<script setup>

const props = defineProps({
  productoCarrito: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <div class="cart-item">
    <!-- Imagen -->
    <div class="cart-item__image">
      <img
        :src="props.productoCarrito.producto.image"
        :alt="props.productoCarrito.producto.title"
      />
    </div>

    <!-- Info -->
    <div class="cart-item__info">
      <p class="cart-item__title">{{ props.productoCarrito.producto.title }}</p>
      <p class="cart-item__price">
        ${{ props.productoCarrito.producto.price * props.productoCarrito.cantidad }}
      </p>
    </div>

    <!-- Cantidad -->
    <div class="cart-item__qty">
      {{ props.productoCarrito.cantidad }}
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  background-color: var(--md-surface-variant);
  transition: background-color 150ms;
}

.cart-item:hover {
  background-color: var(--md-primary-container);
}

/* Imagen */
.cart-item__image {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: white;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.cart-item__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Info */
.cart-item__info {
  flex: 1;
  min-width: 0;
}

.cart-item__title {
  font-size: 12px;
  font-weight: 500;
  color: var(--md-on-surface);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.cart-item__price {
  font-size: 13px;
  font-weight: 700;
  color: var(--md-primary);
  margin: 4px 0 0;
}

/* Cantidad */
.cart-item__qty {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--md-primary);
  color: var(--md-on-primary);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>