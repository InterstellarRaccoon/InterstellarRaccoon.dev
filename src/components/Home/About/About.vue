<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>
<template>
    <section id="about-me">
        <h1>{{ t('about.title') }}</h1>
        <h2>{{ t('about.subtitle') }}</h2>
        <p v-html="t('about.description')"></p>
    </section>
</template>
<style scoped>
#about-me {
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>