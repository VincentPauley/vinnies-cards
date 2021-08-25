<template>
  <div>
    <h1>Inspect Card</h1>
    <p>Searching for: {{ cardID }}</p>
    <div>{{ cardData }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    cardData: null
  }),
  computed: {
    cardID() {
      return this.$route.params.id;
    }
  },
  mounted() {
    console.log("running");
    axios
      .get(`http://localhost:3000/find-by-id/${this.cardID}`)
      .then(r => {
        console.log(r);
        if (r.data.success) {
          this.cardData = r.data.record;
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
