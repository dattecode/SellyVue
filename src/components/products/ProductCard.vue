<script setup>
import { useCarrito } from '@/stores/carrito';
import { ref } from 'vue';

const props = defineProps({
  producto: {
    type: Object,
    required: true,
  },
});

const carrito = useCarrito();

const addToCart = () => {
  console.log(props.producto);
  carrito.agregarAlCarrito(props.producto);
};

const showModal = ref(false)

const viewDetail = () => {
  showModal.value = true
};

const addToFav = () => {
  console.log(props.producto);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(price);
};
</script>

<template>
  <div class="md-card">
    <!-- Image container -->
    <div class="md-card__media">
      <img
        :src="props.producto.image"
        :alt="props.producto.title"
        class="md-card__image"
      />
      <span v-if="props.producto.discount" class="md-card__badge">
        -{{ props.producto.discount }}%
      </span>
      <button
        class="md-icon-button md-card__favorite"
        aria-label="Agregar a favoritos"
        @click="addToFav"
      >
        <span class="material-symbols-outlined">favorite</span>
      </button>
    </div>

    <!-- Content -->
    <div class="md-card__content">
      <span class="md-card__category">{{ props.producto.category }}</span>
      <h2 class="md-card__title">{{ props.producto.title }}</h2>
      <div class="md-card__rating" v-if="props.producto.rating">
        <span class="material-symbols-outlined md-card__star">star</span>
        <span class="md-card__rating-value">{{ props.producto.rating.rate }}</span>
        <span class="md-card__rating-count">({{ props.producto.rating.count }})</span>
      </div>
      <div class="md-card__pricing">
        <span class="md-card__price">{{ formatPrice(props.producto.price) }}</span>
        <span v-if="props.producto.originalPrice" class="md-card__original-price">
          {{ formatPrice(props.producto.originalPrice) }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="md-card__actions">
      <button class="md-button md-button--text" @click="viewDetail">
        Ver detalle
      </button>
      <button class="md-button md-button--filled" @click="addToCart">
        <span class="material-symbols-outlined">add_shopping_cart</span>
        Agregar
      </button>
    </div>
  </div>

  <!-- ── Modal detalle ──────────────────────────────────── -->
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <transition name="modal-slide">
          <div class="modal">

            <!-- Cerrar -->
            <button class="modal__close" aria-label="Cerrar" @click="showModal = false">
              <span class="material-symbols-outlined">close</span>
            </button>

            <!-- Imagen -->
            <div class="modal__media">
              <img
                :src="props.producto.image"
                :alt="props.producto.title"
                class="modal__image"
              />
              <span v-if="props.producto.discount" class="md-card__badge">
                -{{ props.producto.discount }}%
              </span>
            </div>

            <!-- Contenido -->
            <div class="modal__content">
              <span class="md-card__category">{{ props.producto.category }}</span>
              <h2 class="modal__title">{{ props.producto.title }}</h2>

              <!-- Precio -->
              <div class="md-card__pricing modal__pricing">
                <span class="modal__price">{{ formatPrice(props.producto.price) }}</span>
                <span v-if="props.producto.originalPrice" class="md-card__original-price">
                  {{ formatPrice(props.producto.originalPrice) }}
                </span>
              </div>

              <!-- Descripción -->
              <p v-if="props.producto.description" class="modal__description">
                {{ props.producto.description }}
              </p>

              <!-- Acciones -->
              <div class="modal__actions">
                <button class="md-button md-button--filled modal__cart-btn" @click="addToCart">
                  <span class="material-symbols-outlined">add_shopping_cart</span>
                  Agregar al carrito
                </button>
              </div>
            </div>

          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@400;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");

/* ── Card ───────────────────────────────────────────────── */
.md-card {
  background-color: var(--md-surface);
  border-radius: var(--md-shape-large);
  box-shadow: var(--md-elevation-1);
  overflow: hidden;
  width: 280px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1);
  position: relative;
}

.md-card:hover {
  box-shadow: var(--md-elevation-2);
}

/* ── Media ──────────────────────────────────────────────── */
.md-card__media {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: var(--md-surface-variant);
  overflow: hidden;
}

.md-card__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 16px;
  transition: transform 300ms cubic-bezier(0.2, 0, 0, 1);
}

.md-card:hover .md-card__image {
  transform: scale(1.04);
}

/* Badge */
.md-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: var(--md-error);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 3px 8px;
  border-radius: 6px;
}

/* Favorite button */
.md-icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 200ms;
}

.md-card__favorite {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  color: var(--md-on-surface-variant);
}

.md-card__favorite:hover {
  background-color: rgba(255, 255, 255, 1);
  color: var(--md-accent-strong);
}

.md-card__favorite .material-symbols-outlined {
  font-size: 20px;
  font-variation-settings: "FILL" 0;
  transition: font-variation-settings 200ms, color 200ms;
}

.md-card__favorite:hover .material-symbols-outlined {
  font-variation-settings: "FILL" 1;
}

/* ── Content ────────────────────────────────────────────── */
.md-card__content {
  padding: 16px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.md-card__category {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--md-primary);
}

.md-card__title {
  margin: 0;
  font-family: "Google Sans Display", "Google Sans", sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--md-on-surface);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Rating */
.md-card__rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}

.md-card__star {
  font-size: 16px;
  font-variation-settings: "FILL" 1;
  color: #f59e0b;
}

.md-card__rating-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--md-on-surface);
}

.md-card__rating-count {
  font-size: 12px;
  color: var(--md-on-surface-variant);
}

/* Pricing */
.md-card__pricing {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 6px;
}

.md-card__price {
  font-size: 20px;
  font-weight: 700;
  color: var(--md-on-surface);
  letter-spacing: -0.3px;
}

.md-card__original-price {
  font-size: 13px;
  color: var(--md-on-surface-variant);
  text-decoration: line-through;
}

/* ── Actions ────────────────────────────────────────────── */
.md-card__actions {
  padding: 8px 12px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

/* MD3 Buttons */
.md-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  cursor: pointer;
  font-family: "Google Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  border-radius: 100px;
  padding: 10px 20px;
  transition: box-shadow 200ms, background-color 200ms;
  white-space: nowrap;
}

.md-button--text {
  background: none;
  color: var(--md-primary);
  padding: 10px 12px;
}

.md-button--text:hover {
  background-color: rgba(233, 30, 99, 0.08);
}

.md-button--filled {
  background-color: var(--md-primary);
  color: var(--md-on-primary);
  box-shadow: var(--md-elevation-1);
}

.md-button--filled:hover {
  box-shadow: var(--md-elevation-2);
  background-color: var(--md-primary-hover);
}

.md-button .material-symbols-outlined {
  font-size: 18px;
}

/* ── Modal ──────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
}

@media (min-width: 600px) {
  .modal-overlay {
    align-items: center;
    padding: 24px;
  }
}

.modal {
  background-color: var(--md-surface);
  width: 100%;
  max-width: 520px;
  border-radius: 28px 28px 0 0;
  overflow: hidden;
  position: relative;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
}

@media (min-width: 600px) {
  .modal {
    border-radius: 28px;
    max-height: 85vh;
  }
}

/* Cerrar */
.modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--md-on-surface-variant);
  transition: background-color 150ms;
}

.modal__close:hover {
  background-color: white;
  color: var(--md-primary);
}

.modal__close .material-symbols-outlined {
  font-size: 20px;
}

/* Imagen modal */
.modal__media {
  position: relative;
  width: 100%;
  height: 260px;
  background-color: var(--md-surface-variant);
  flex-shrink: 0;
}

.modal__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 24px;
}

/* Contenido modal */
.modal__content {
  padding: 20px 24px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal__title {
  margin: 4px 0 0;
  font-family: "Google Sans Display", "Google Sans", sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--md-on-surface);
}

.modal__pricing {
  margin-top: 4px;
}

.modal__price {
  font-size: 26px;
  font-weight: 700;
  color: var(--md-primary);
  letter-spacing: -0.5px;
}

/* Descripción */
.modal__description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--md-on-surface-variant);
  margin: 4px 0 0;
}

/* Acciones modal */
.modal__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.modal__cart-btn {
  flex: 1;
  justify-content: center;
  padding: 14px 20px;
  font-size: 15px;
}

/* ── Transiciones modal ─────────────────────────────────── */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 200ms ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: transform 300ms cubic-bezier(0.2, 0, 0, 1);
}
.modal-slide-enter-from,
.modal-slide-leave-to {
  transform: translateY(100%);
}

@media (min-width: 600px) {
  .modal-slide-enter-from,
  .modal-slide-leave-to {
    transform: scale(0.95) translateY(8px);
  }
}
</style>