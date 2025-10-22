<template>
  <div class="relative inline-block">
    <transition name="flip" mode="out-in">
      <button
        :key="locale"
        @click="toggleLanguage"
        class="btn-language"
        aria-label="Cambiar idioma"
      >
        {{ currentFlag }}
      </button>
    </transition>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const flags = {
  es: '🇪🇸',
  en: '🇬🇧'
}

const currentFlag = computed(() => flags[locale.value] || '🌐')

function toggleLanguage() {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}

watch(locale, (newLang) => {
  localStorage.setItem('lang', newLang)
})

if (localStorage.getItem('lang')) {
  locale.value = localStorage.getItem('lang')
}
</script>

<style scoped>
.flip-enter-active, .flip-leave-active {
  transition: transform 0.4s ease, opacity 0.3s ease;
  transform-style: preserve-3d;
}
.flip-enter-from {
  transform: rotateY(90deg);
  opacity: 0;
}
.flip-enter-to {
  transform: rotateY(0);
  opacity: 1;
}
.flip-leave-from {
  transform: rotateY(0);
  opacity: 1;
}
.flip-leave-to {
  transform: rotateY(-90deg);
  opacity: 0;
}
.btn-language {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: var(--color-text);
}
</style>