<template>
  <section class="home">
    <div>
      <h1>Homepage!</h1>
      <nav>
        <!-- <button type="button" @click="$router.push('/about')">About</button> -->
        <!-- <button type="button" @click="$router.push('/todos')">Todo App</button> -->
        <router-link to="about" tag="button">About</router-link>
        <router-link to="todos" tag="button">Todo App</router-link>
      </nav>
    </div>
  </section>
</template>