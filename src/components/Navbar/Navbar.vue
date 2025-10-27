<script setup lang="ts">
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import LanguageToggle from '@/components/LanguageToggle.vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import NavbarMenuToggle from './NavbarMenuToggle.vue';
import MobileNavbarMenu from './MobileNavbarMenu.vue';
const { t } = useI18n();

const mobileNavbarShown = ref(false);
const mobileHamburgerShown = ref(false);
const scrolled = ref(false);

const closeMobileMenus = () => {
    mobileNavbarShown.value = false;
    mobileHamburgerShown.value = false;
};

const updateMobileMenus = () => {
    if (window.innerWidth > 768) {
        closeMobileMenus();
    } else {
        mobileHamburgerShown.value = true;
    }
};

const handleScroll = () => {
    if (window.innerWidth > 768) {
        scrolled.value = window.scrollY > window.innerHeight - 120;
    } else {
        scrolled.value = window.scrollY > window.innerHeight - 60;
    }

};

const toggleMobileMenu = async () => {
    closeMobileMenus();
    await nextTick();
    updateMobileMenus();

};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
    updateMobileMenus();
    window.addEventListener('resize', updateMobileMenus);
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateMobileMenus);
    window.removeEventListener('scroll', handleScroll);
});


</script>
<template>
    <nav :class="{ scrolled }">
        <div class="desktop">
            <div class="left">
                <img class="logo" src="@/assets/logo.png" alt="Logo">
                <a @click="scrollToTop" href="#home">
                    <div class="nav-btn">{{ t('navbar.home') }}</div>
                </a>
                <a href="#projects">
                    <div class="nav-btn">{{ t('navbar.projects') }}</div>
                </a>
                <a href="#experience">
                    <div class="nav-btn">{{ t('navbar.experience') }}</div>
                </a>
                <a href="#about-me">
                    <div class="nav-btn">{{ t('navbar.about') }}</div>
                </a>
            </div>
            <div class="right">
                <LanguageToggle />
                <DarkModeToggle />
            </div>
        </div>
        <div class="mobile">
            <div class="left">
                <img class="logo" src="@/assets/logo.png" alt="Logo">
                <NavbarMenuToggle v-if="mobileHamburgerShown" @toggle="mobileNavbarShown = !mobileNavbarShown" />
            </div>
            <div class="right">
                <LanguageToggle />
                <DarkModeToggle />
            </div>
        </div>
        <MobileNavbarMenu @toggled="toggleMobileMenu()" v-if="mobileNavbarShown" />
    </nav>
</template>
<style scoped>
nav {
    background: linear-gradient(10deg, var(--color-primary), var(--color-secondary));
    position: absolute;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px 5px var(--color-secondary-accent);
    border-radius: 9999px;
    transform: translateY(calc(100vh - 150%));
}

nav.scrolled {
    position: fixed;
    transform: translateY(50%);
}

.desktop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mobile {
    width: 100%;
    display: none;
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 767px) {
    .desktop {
        display: none;
    }

    .mobile {
        display: flex;
    }

    nav {
        border-radius: 0;
        width: 100vw;
        align-self: stretch;
        transform: translateY(calc(100vh - 100%));
    }

    nav.scrolled {
        position: fixed;
        transform: translateY(0);
    }
}

.left {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-left: 1rem;
    gap: 1rem;
}

.right {
    display: flex;
    align-items: center;
    justify-content: end;
    margin: 0 1rem;
    gap: 1rem;
}

.logo {
    width: 4rem;
    height: 4rem;
    cursor: pointer;
}

.nav-btn {
    padding: 0.5rem;
    cursor: pointer;
    color: var(--color-text-light);
    text-decoration: none;
}

.nav-btn:hover {
    color: var(--color-text-light-accent);
    text-shadow: 4px 4px 5px var(--color-dark);
}

.nav-btn a {
    text-decoration: none;
}
</style>