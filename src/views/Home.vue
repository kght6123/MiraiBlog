<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <HelloCounter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import HelloCounter from '@/components/HelloCounter.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
    HelloCounter,
  },
})
export default class Home extends Vue {}
</script>
