<script setup lang="ts">

</script>
<template>
    <nav>
        <div class="left">
            <img class="logo" src="@/assets/logo.png" alt="Logo">
            <RouterLink to="/">
                <div class="nav-btn">Home</div>
            </RouterLink>
            <RouterLink to="/projects">
                <div class="nav-btn">Projects</div>
            </RouterLink>
            <RouterLink to="/experience">
                <div class="nav-btn">Experience</div>
            </RouterLink>
        </div>
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

.left {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
}

.logo {
    width: 4rem;
    height: 4rem;
    margin-left: 1rem;
    cursor: pointer;
}

.nav-btn {
    padding: 0.5rem;
    cursor: pointer;
    color: var(--color-text);
    text-decoration: none;
}

.nav-btn:hover {
    box-shadow: 0px 0px 4px 5px var(--color-primary-hover);
    border-radius: 5rem;
}

.nav-btn a {
    text-decoration: none;
}
</style>