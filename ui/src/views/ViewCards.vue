<template>
  <div>
    <h1>View Cards</h1>
    <ul>
      <Card v-for="card in cards" :key="card.id" :card-data="card"/>
    </ul>
    <div>{{ cards }}</div>
  </div>
</template>

<script>
import axios from "axios";

import Card from "../components/Card.vue";

export default {
  components: {
    Card
  },
  data: () => ({
    cards: null
  }),
  created() {
    axios.get("http://localhost:3000/").then(r => {
      this.cards = r.data;
    });
  }
};
</script>