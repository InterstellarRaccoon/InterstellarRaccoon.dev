<script setup lang="ts">
import type { WebGLRenderer } from 'three';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n();

const subtitle = ref<HTMLElement | null>(null);

const phrases = computed(() => tm('hero.subtitle') as string[]);

//writing effect
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1500;

function typeEffect() {
    const el = subtitle.value;
    if (!el || !phrases.value.length) return;

    if (phraseIndex >= phrases.value.length) {
        phraseIndex = 0;
        charIndex = 0;
        deleting = false;
    }

    const currentPhrase = phrases.value[phraseIndex] ?? phrases.value[0];

    if (!deleting) {
        el.textContent = currentPhrase!.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase!.length) {
            deleting = true;
            setTimeout(typeEffect, pauseTime); // pausa antes de borrar
            return;
        }
    } else {
        el.textContent = currentPhrase!.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.value.length;
        }
    }

    const delay = deleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, delay);
}
watch(phrases, () => {
    phraseIndex = 0;
    charIndex = 0;
    deleting = false;
});

//animated bg detection
const scrolledPast100vh = ref(false);
function handleScroll(rendererModule: any) {
    const scrollY = window.scrollY;
    const limit = window.innerHeight;

    const passed = scrollY > limit;

    if (passed !== scrolledPast100vh.value) {
        scrolledPast100vh.value = passed;

        if (passed) {
            rendererModule.renderer.setAnimationLoop(null);
        } else {
            rendererModule.renderer.setAnimationLoop(rendererModule.renderLoop);
        }
    }
}

onMounted(async () => {
    const heroBgModule = await import('./heroBg.ts');
    typeEffect();
    window.addEventListener('scroll', () => handleScroll(heroBgModule), { passive: true });
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})


</script>
<template>
    <div class="hero">
        <canvas id="hero-bg"></canvas>
    </div>
    <div class="hero-text-container">
        <h1 class="hero-title">{{ t('hero.title') }} <span class="hero-name">{{ t('hero.name') }}</span></h1>
        <h2 ref="subtitle" class="hero-subtitle"></h2>
    </div>
</template>
<style scoped>
.hero {
    width: 100%;
    height: calc(100vh - 4rem);
    background-color: var(--color-bg);
}

.hero-text-container {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.hero-title {
    font-weight: bold;
    margin-bottom: 1rem;
}

.hero-name {
    font-weight: bolder;
}

.hero-subtitle {
    font-weight: normal;
    min-height: 2rem;
}
</style>