<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ul>
      <Card v-for="card in cards" :key="card.id" :card-data="card"/>
    </ul>
  </div>
</template>

<script>
import Card from "./components/Card.vue";
import axios from "axios";

export default {
  name: "App",
  data: () => ({
    cards: null
  }),
  components: {
    Card
  },
  created() {
    axios
      .get("http://localhost:3000/")
      .then(r => {
        this.cards = r.data;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
