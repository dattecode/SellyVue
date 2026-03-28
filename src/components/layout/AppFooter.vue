<script setup>
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">

      <!-- Marca -->
      <div class="footer__brand">
        <span class="footer__brand-dot" />
        <span class="footer__brand-name">SellyVue</span>
      </div>

      <!-- Copy -->
      <p class="footer__copy">© 2026 Derechos Reservados</p>

    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--md-primary);
  color: var(--md-on-primary);
  padding: 16px 24px;
}

.footer__inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

/* Marca */
.footer__brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer__brand-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--md-on-primary);
  opacity: 0.7;
}

.footer__brand-name {
  font-family: "Google Sans Display", "Google Sans", sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

/* Copy */
.footer__copy {
  font-size: 12px;
  opacity: 0.75;
  margin: 0;
}
</style>