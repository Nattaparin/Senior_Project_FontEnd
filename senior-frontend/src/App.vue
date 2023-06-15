<template>
  <div id="app">
    <NavbarComponent />
    <router-view />
  </div>
</template>
<script>
import NavbarComponent from "@/components/Navbar.vue";

export default {
  name: "app-page",
  components: {
    NavbarComponent,
  },
  inject: ["GStore"],
};
</script>
