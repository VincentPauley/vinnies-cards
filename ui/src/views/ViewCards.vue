<template>
  <div v-if="cardsLoaded">
    <h1>View Cards</h1>
    <p>
      <b>Total:</b>
      {{ cards.length }}
    </p>
    <ul>
      <Card v-for="card in cards" :key="card.id" :card-data="card"/>
    </ul>
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
  computed: {
    cardsLoaded() {
      return Array.isArray(this.cards) && this.cards.length;
    }
  },
  created() {
    axios.get("http://localhost:3000/").then(r => {
      this.cards = r.data;
    });
  }
};
</script>