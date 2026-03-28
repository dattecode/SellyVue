<script setup>
import ProductCart from "../cart/ProductCart.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faShoppingCart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useCarrito } from "@/stores/carrito";
import { ref, computed } from "vue";
import { useProductos } from "@/stores/productos";

const carrito = useCarrito();
const itemsCarrito = computed(() => carrito.carrito);

const productos = useProductos();
const categorias = computed(() => productos.categorias);

const categoriaActiva = ref("all");
const cambiarCategoriaActiva = (categoria) => {
  categoriaActiva.value = categoria;
  filtroCategorias(categoria);
  modalMenu.value = false;
}

const filtroCategorias = (categoria) => {
  productos.getProductByCategory(categoria);
};

const modalCarrito = ref(false);
const modalMenu = ref(false);

const showModalCarrito = () => {
  modalCarrito.value = !modalCarrito.value;
  if (modalMenu.value) modalMenu.value = false;
};

const showModalMenu = () => {
  modalMenu.value = !modalMenu.value;
  if (modalCarrito.value) modalCarrito.value = false;
};
</script>

<template>
  <header class="header">
    <!-- IZQUIERDA -->
    <div class="header__left">
      <button class="header__icon-btn" @click="showModalMenu" aria-label="Menú">
        <FontAwesomeIcon :icon="modalMenu ? faXmark : faBars" />
      </button>
    </div>

    <!-- CENTRO -->
    <div class="header__center">
      <span class="header__logo-dot" />
      <h2 class="header__title">SellyVue</h2>
    </div>

    <!-- DERECHA -->
    <div class="header__right">
      <button
        class="header__icon-btn"
        @click="showModalCarrito"
        aria-label="Carrito"
      >
        <FontAwesomeIcon :icon="modalCarrito ? faXmark : faShoppingCart" />
        <span v-if="itemsCarrito.length" class="header__badge">
          {{ itemsCarrito.length }}
        </span>
      </button>
    </div>
  </header>

  <!-- ── Overlay ─────────────────────────────────────────── -->
  <transition name="fade">
    <div
      v-if="modalCarrito || modalMenu"
      class="overlay"
      @click="
        modalCarrito = false;
        modalMenu = false;
      "
    ></div>
  </transition>

  <!-- ── Drawer: Menú ────────────────────────────────────── -->
 <transition name="slide-left">
  <nav v-if="modalMenu" class="drawer drawer--left">
    <div class="drawer__header">
      <span class="drawer__header-dot" />
      <span class="drawer__header-title">Categorías</span>
    </div>

    <ul class="drawer__nav">
      
      <!-- 🔥 TODAS -->
      <li
        class="drawer__nav-item"
        :class="{ 'drawer__nav-item--active': categoriaActiva === 'all' }"
        @click="cambiarCategoriaActiva('all')"
      >
        <span class="drawer__nav-icon">
          <FontAwesomeIcon :icon="['fas', 'border-all']" />
        </span>
        Todas
      </li>

      <!-- 🔥 CATEGORÍAS -->
      <li
        v-for="categoria in categorias"
        :key="categoria"
        class="drawer__nav-item"
        :class="{ 'drawer__nav-item--active': categoriaActiva === categoria }"
        @click="cambiarCategoriaActiva(categoria)"
      >
        <span class="drawer__nav-icon">
          <FontAwesomeIcon :icon="['fas', 'tag']" />
        </span>
        {{ categoria }}
      </li>

    </ul>
  </nav>
</transition>

  <!-- ── Drawer: Carrito ─────────────────────────────────── -->
  <transition name="slide-right">
    <aside v-if="modalCarrito" class="drawer drawer--right">
      <div class="drawer__header">
        <span class="drawer__header-title">Carrito</span>
        <span class="drawer__header-count" v-if="itemsCarrito.length">
          {{ itemsCarrito.length }} ítems
        </span>
      </div>

      <div class="drawer__body">
        <div v-if="itemsCarrito.length" class="drawer__items">
          <ProductCart
            v-for="productoCarrito in itemsCarrito"
            :key="productoCarrito.producto.id"
            :productoCarrito="productoCarrito"
          />
        </div>
        <div v-else class="drawer__empty">
          <FontAwesomeIcon
            :icon="['fas', 'cart-shopping']"
            class="drawer__empty-icon"
          />
          <p>Tu carrito está vacío</p>
        </div>
      </div>

      <div v-if="itemsCarrito.length" class="drawer__footer">
        <button class="drawer__checkout-btn">
          Ir a pagar
          <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
        </button>
      </div>
    </aside>
  </transition>
</template>

<style scoped>
/* ── Header ─────────────────────────────────────────────── */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 56px;
  background-color: var(--md-primary);
  color: var(--md-on-primary);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(233, 30, 99, 0.35);
}

.header__left,
.header__right {
  width: 48px;
  display: flex;
  align-items: center;
}

.header__right {
  justify-content: flex-end;
  position: relative;
}

.header__center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.header__logo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--md-on-primary);
  opacity: 0.7;
}

.header__title {
  font-family: "Google Sans Display", "Google Sans", sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.3px;
  margin: 0;
}

/* Icon button */
.header__icon-btn {
  background: none;
  border: none;
  color: var(--md-on-primary);
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background-color 150ms;
  position: relative;
}

.header__icon-btn:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

/* Badge */
.header__badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: var(--md-on-primary);
  color: var(--md-primary);
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  line-height: 1;
}

/* ── Overlay ────────────────────────────────────────────── */
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 200;
  top: 56px;
}

/* ── Drawers ────────────────────────────────────────────── */
.drawer {
  position: fixed;
  top: 56px;
  bottom: 0;
  width: 280px;
  background-color: var(--md-surface);
  z-index: 300;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.drawer--left {
  left: 0;
}
.drawer--right {
  right: 0;
}

/* Drawer header */
.drawer__header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 20px 16px;
  border-bottom: 1px solid var(--md-outline-variant);
}

.drawer__header-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--md-primary);
  flex-shrink: 0;
}

.drawer__header-title {
  font-family: "Google Sans Display", "Google Sans", sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: var(--md-on-surface);
  flex: 1;
}

.drawer__header-count {
  font-size: 12px;
  font-weight: 500;
  color: var(--md-on-surface-variant);
  background-color: var(--md-primary-container);
  color: var(--md-on-primary-container);
  padding: 2px 8px;
  border-radius: 100px;
}

/* Nav items */
.drawer__nav {
  list-style: none;
  padding: 8px 12px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.drawer__nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  color: var(--md-on-surface-variant);
  cursor: pointer;
  transition:
    background-color 150ms,
    color 150ms;
}

.drawer__nav-item:hover {
  background-color: var(--md-surface-variant);
  color: var(--md-on-surface);
}

.drawer__nav-item--active {
  background-color: var(--md-primary-container);
  color: var(--md-on-primary-container);
  font-weight: 600;
}

.drawer__nav-icon {
  width: 20px;
  display: flex;
  justify-content: center;
  font-size: 15px;
}

/* Divider */
.drawer__divider {
  height: 1px;
  background-color: var(--md-outline-variant);
  margin: 4px 20px;
}

/* Carrito body */
.drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.drawer__items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Empty state */
.drawer__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  color: var(--md-on-surface-variant);
  padding: 40px 0;
}

.drawer__empty-icon {
  font-size: 48px;
  opacity: 0.3;
}

.drawer__empty p {
  font-size: 14px;
  font-weight: 500;
}

/* Footer checkout */
.drawer__footer {
  padding: 16px;
  border-top: 1px solid var(--md-outline-variant);
}

.drawer__checkout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--md-primary);
  color: var(--md-on-primary);
  border: none;
  border-radius: 100px;
  padding: 14px;
  font-family: "Google Sans", sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 150ms,
    box-shadow 150ms;
  box-shadow: var(--md-elevation-1);
}

.drawer__checkout-btn:hover {
  background-color: var(--md-primary-hover);
  box-shadow: var(--md-elevation-2);
}

/* ── Transiciones ───────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 250ms cubic-bezier(0.2, 0, 0, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
