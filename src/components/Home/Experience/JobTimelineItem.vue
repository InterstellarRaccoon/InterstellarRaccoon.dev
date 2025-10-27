<template>
  <div class="timeline-item">
    <div class="timeline-line-container">
      <div class="timeline-marker"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-content">
      <div class="content-grid">
        <div class="info-left">
          <h3>{{ job.title }}</h3>
          <div class="timeline-detail">
            <span><CalendarDays /> {{ job.timespan }}</span>
          </div>
          <div class="timeline-detail">
            <span><MapPin /> {{ job.location }}</span>
          </div>
        </div>
        <div class="description-right">
          <p>{{ job.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type IJob from '@/interfaces/IJob';
import { CalendarDays, MapPin } from 'lucide-vue-next';



defineProps<{
  job: IJob;
}>();
</script>

<style scoped>
h3 {
    color: var(--color-primary);
    text-wrap: balance;
}

.timeline-item {
  display: flex;
  gap: 1rem;
  position: relative;
  padding-bottom: 2rem;
}

.timeline-item.last-item {
  padding-bottom: 0;
}

.timeline-line-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-shrink: 0;
}

.timeline-marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 4px solid var(--color-secondary);
  z-index: 10;
}

.timeline-line {
  width: 2px;
  background: var(--color-text);
  position: absolute;
  top: 16px;
  bottom: -2rem;
}

.timeline-content {
  flex: 1;
  background: var(--color-bg);
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 5px var(--color-secondary);
}

.content-grid {
  display: flex;
  gap: 1.5rem;
}

.info-left {
  min-width: 200px;
  flex-shrink: 0;
}

.info-left h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.timeline-detail {
  margin: 0.5rem 0;
  color: var(--color-secondary);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timeline-detail span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.description-right {
  flex: 1;
  border-left: 1px solid var(--color-secondary);
  padding-left: 1.5rem;
}

.description-right p {
  color: var(--color-text);
  font-size: 0.875rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .content-grid {
    flex-direction: column;
    gap: 1rem;
  }
  
  .info-left {
    min-width: auto;
  }
  
  .description-right {
    border-left: none;
    border-top: 1px solid var(--color-secondary);
    padding-left: 0;
    padding-top: 1rem;
  }
}
</style>
