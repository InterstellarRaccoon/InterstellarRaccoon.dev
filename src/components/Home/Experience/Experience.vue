<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import JobTimelineItem from './JobTimelineItem.vue';
import { computed } from 'vue';
import type IJob from '@/interfaces/IJob';

const { t, tm } = useI18n();
const jobs = computed(() => tm('experience.jobs') as IJob[]);

</script>
<template>
    <section id="experience">
        <h1>{{ t('experience.title') }}</h1>
        <h2>{{ t('experience.subtitle') }}</h2>
        <div>
            <JobTimelineItem v-for="job in jobs" :key="job.id" :job="job" />
        </div>
    </section>
</template>
<style scoped>
#experience {
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>