<script setup lang="ts">

import { useI18n } from 'vue-i18n';
import ProjectCard from './ProjectCard.vue';
import type IProject from '@/interfaces/IProject';
import { computed } from 'vue';

const { t ,tm } = useI18n();
const projects = computed(() => tm('projects.projects') as IProject[]);
    
</script>
<template>
    <section id="projects">
        <h1>{{ t('projects.title') }}</h1>
        <h2>{{ t('projects.subtitle') }}</h2>
        <div class="grid">
            <ProjectCard v-for="project in projects" :key="project.name" :project="project" />
        </div>
    </section>
</template>
<style scoped>
    #projects {
        min-height: 100vh;
        max-width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .grid {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 1fr;
        align-items: stretch;
        gap: 1rem;
    }
    @media screen and (max-width: 768px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>