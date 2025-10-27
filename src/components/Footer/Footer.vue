<template>
  <footer class="footer">
    <p>&copy; {{ currentYear }} {{ t('footer.holder') }} {{ t('footer.license') }}</p>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 1rem;
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-bg-accent);
  color: var(--color-text);
}

.footer p {
  font-size: 0.75rem;
  margin: 0;
}
</style>