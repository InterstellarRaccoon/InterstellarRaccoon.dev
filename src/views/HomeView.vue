<script setup lang="ts">
import Footer from '@/components/Footer/Footer.vue';
import About from '@/components/Home/About/About.vue';
import Experience from '@/components/Home/Experience/Experience.vue';
import Hero from '@/components/Home/Hero/Hero.vue';
import Projects from '@/components/Home/Projects/Projects.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import NavbarSpacer from '@/components/Navbar/NavbarSpacer.vue';

</script>

<template>
  <main>
    <Hero />
    <Navbar />
    <NavbarSpacer />
    <div class="container">
      <Projects />
      <hr>
      <Experience />
      <hr>
      <About />
    </div>
  </main>
  <Footer />
</template>

<style scoped>
hr {
  margin: 3rem 0;
  border: none;
  border-top: 1px solid var(--color-bg-accent);
}
</style>