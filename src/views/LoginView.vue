<template>
    <div class="login">
      <LoginComponet />
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import LoginComponet from "@/components/Login/Login.vue";
  
  @Options({
    components: {
        LoginComponet,
    },
  })
  export default class HomeView extends Vue {}
  </script>
  