<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(() => {
    const el = document.querySelector(".spacer")
    const observer = new IntersectionObserver( 
      ([e]) => e!.target.classList.toggle("is-pinned", e!.intersectionRatio < 1 && window.scrollY > 100),
      { threshold: [1] }
    );
    observer.observe(el!);
})

</script>
<template>
    <div class="spacer">
    </div>
</template>
<style scoped>
.spacer {
    position: sticky;
    top: -1px;
    width: 100%;
    height: calc(4rem + 1px);
    border-bottom: 0 solid var(--color-bg-accent);
    box-sizing: border-box;
    z-index: 500;
    transition: border-bottom 0.4s ease-in-out;
}
.spacer.is-pinned {
    background-color: var(--color-bg);
    border-bottom: 3px outset var(--color-bg-accent);
}
</style>