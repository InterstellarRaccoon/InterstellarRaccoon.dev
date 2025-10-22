<template>
  <button class="hamburger" @click="toggle" aria-label="Toggle menu">
    <span :class="{ 'open': isOpen }"></span>
    <span :class="{ 'open': isOpen }"></span>
    <span :class="{ 'open': isOpen }"></span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

// Emitimos un evento cada vez que se presiona
const emit = defineEmits<{
  (e: 'toggle', state: boolean): void
}>()

function toggle() {
  isOpen.value = !isOpen.value
  emit('toggle', isOpen.value)
}
</script>

<style scoped>
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
  z-index: 20;
}

.hamburger span {
  display: block;
  width: 2rem;
  height: 0.25rem;
  background: var(--color-text, black);
  border-radius: 2px;
  transition: all 0.5s ease;
  transform-origin: 1px;
}

/* Animación a X */
.hamburger span:nth-child(1).open {
  transform: rotate(45deg) translate(5px, -5px);
}

.hamburger span:nth-child(2).open {
  opacity: 0;
  transform: translateX(10px);
}

.hamburger span:nth-child(3).open {
  transform: rotate(-45deg) translate(5px, 5px);
}
</style>