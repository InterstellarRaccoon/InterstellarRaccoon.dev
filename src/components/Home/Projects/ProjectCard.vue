<script setup lang="ts">
import type IProject from '@/interfaces/IProject';

const { project } = defineProps<{
    project: IProject
}>()


</script>
<template>
    <div class="card" ref="cardRef">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <a :href="project.link">{{ project.linkDesc }}</a>
        <a v-if="project.demo" :href="project.demo">{{ project.demoDesc }}</a>
    </div>
</template>
<style scoped>
.card {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    border-radius: 1rem;
    box-sizing: border-box;
    border: 2px solid transparent;
    background-color: var(--color-bg);
    z-index: 2;
    transition: all 0.3s ease-in-out;
}

.card::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
    pointer-events: none;
    filter: blur(10px);
    z-index: 0;
}

.card::after {
    content: '';
    position: absolute;
    inset: 2px;
    background-color: var(--color-bg);
    border-radius: inherit;
    z-index: 1;
}

.card:hover {
    transform: scale(1.02);
}

.card>* {
    position: relative;
    z-index: 2;
}

.card>p {
    text-align: center;
}

.card>a {
    border-radius: 9999px;
    padding: 1rem;
    margin: 0.5rem;
    background: linear-gradient(20deg, var(--color-primary), var(--color-secondary));
    color: var(--color-text-light);
    text-decoration: none;
    box-shadow: 0px 0px 5px 5px var(--color-secondary-accent);
    transition: all 0.3s ease-in-out;
}
.card>a:hover {
    background: linear-gradient(20deg, var(--color-primary-hover), var(--color-secondary-hover));
    transform: scale(1.05);
}
</style>