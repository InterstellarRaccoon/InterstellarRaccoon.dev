<script setup lang="ts">
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import LanguageToggle from '@/components/LanguageToggle.vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import NavbarMenuToggle from './NavbarMenuToggle.vue';
import MobileNavbarMenu from './MobileNavbarMenu.vue';
const { t } = useI18n();

const mobileNavbarShown = ref(false);
</script>
<template>
    <nav>
        <div class="desktop">
            <div class="left">
                <img class="logo" src="@/assets/logo.png" alt="Logo">
                <RouterLink to="/">
                    <div class="nav-btn">{{ t('navbar.home') }}</div>
                </RouterLink>
                <RouterLink to="/projects">
                    <div class="nav-btn">{{ t('navbar.projects') }}</div>
                </RouterLink>
                <RouterLink to="/experience">
                    <div class="nav-btn">{{ t('navbar.experience') }}</div>
                </RouterLink>
            </div>
            <div class="right">
                <LanguageToggle />
                <DarkModeToggle />
            </div>
        </div>
        <div class="mobile">
            <div class="left">
                <img class="logo" src="@/assets/logo.png" alt="Logo">
                <NavbarMenuToggle @toggle="mobileNavbarShown = !mobileNavbarShown" />
            </div>
            <div class="right">
                <LanguageToggle />
                <DarkModeToggle />
            </div>
        </div>
        <MobileNavbarMenu v-if="mobileNavbarShown" />
    </nav>
</template>
<style scoped>
nav {
    background: linear-gradient(5deg, var(--color-primary), var(--color-secondary));
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px 5px var(--color-secondary-accent);
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
    margin-right: 1rem;
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
    color: var(--color-text);
    text-decoration: none;
}

.nav-btn:hover {
    color: var(--color-text-muted);
}

.nav-btn a {
    text-decoration: none;
}
</style>