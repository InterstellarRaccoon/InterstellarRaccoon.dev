<template>
  <label class="theme-toggle">
    <input type="checkbox" v-model="isDark" @change="toggleTheme" />
    <span class="slider">
      <span class="icon">
        <span class="icon-content">
            {{ isDark ? '🌜' : '🌞' }}
        </span>
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(true)

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
    document.documentElement.setAttribute('data-theme', saved)
  } else {
    const prefersDark = true
    isDark.value = prefersDark
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
  }
})

const toggleTheme = () => {
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}
</script>

<style scoped>
.theme-toggle {
  position: relative;
  display: inline-block;
  width: 3.2rem;
  height: 1.8rem;
  cursor: pointer;
}

.theme-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background-color: var(--color-bg-accent);
  border: 2px solid var(--color-text-muted);
  border-radius: 9999px;
  transition: background-color 0.4s, border-color 0.4s;
}

.slider::before {
  content: "";
  position: absolute;
  height: 1.2rem;
  width: 1.2rem;
  left: 0.13rem;
  bottom: 0.17rem;
  background-color: var(--color-text);
  border-radius: 50%;
  transition: transform 0.4s ease;
}

input:checked + .slider::before {
  transform: translateX(1.4rem);
}

.icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  transition: color 0.4s ease;
}

.icon-content {
  display: block;
  font-size: 0.8rem;
  align-content: center;
  transition: transform 0.4s ease;
  transform: translate(-0.75rem, -0.05rem);
}

input:checked + .slider .icon-content {
  transform: translate(0.55rem, -0.05rem);
}

</style>
