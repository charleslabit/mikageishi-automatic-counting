<template>
  <v-app>
    <v-app-bar app flat>
      <v-toolbar-title>
        <span style="color:#1565C0">Mikageishi</span>
        Automatic Counting
      </v-toolbar-title>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({}),
};
</script>
