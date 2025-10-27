<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { onMounted, onUnmounted } from 'vue';

const { t } = useI18n();

const updateScroll = () => {
    window.scrollY > 0 ? document.getElementById('navbar-menu-container')!.classList.add('scrolling') : document.getElementById('navbar-menu-container')!.classList.remove('scrolling');
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
    updateScroll();
    document.addEventListener('scroll', updateScroll)
})

onUnmounted(() => {
    document.removeEventListener('scroll', updateScroll)
})
</script>
<template>
    <div id="navbar-menu-container">
        <a @click="scrollToTop(); $emit('toggled')" href="#home">
            <div class="nav-btn">{{ t('navbar.home') }}</div>
        </a>
        <a @click="$emit('toggled')" href="#projects">
            <div class="nav-btn">{{ t('navbar.projects') }}</div>
        </a>
        <a @click="$emit('toggled')" href="#experience">
            <div class="nav-btn">{{ t('navbar.experience') }}</div>
        </a>
        <a @click="$emit('toggled')" href="#about-me">
            <div class="nav-btn">{{ t('navbar.about') }}</div>
        </a>
    </div>
</template>
<style scoped>
#navbar-menu-container {
    width: 100vw;
    position: absolute;
    top: -9.8rem;
    left: 0;
    z-index: 500;
    background-color: var(--color-primary);
    display: flex;
    flex-direction: column;
}

#navbar-menu-container.scrolling {
    top: 4.1rem;
}

.nav-btn {
    padding: 1rem;
    padding-left: 2rem;
    cursor: pointer;
    color: var(--color-text);
    text-decoration: none;
}

.nav-btn:hover {
    color: var(--color-text-muted);
    background-color: var(--color-primary-hover);
}

.nav-btn a {
    text-decoration: none;
}
</style>