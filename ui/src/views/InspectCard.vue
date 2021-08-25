<template>
  <div>
    <h1>Inspect Card</h1>
    <p>Searching for: {{ cardID }}</p>
    <div>{{ cardData }}</div>
    <button @click="deleteCardRecord">Delete</button>
    <div v-if="deleteFailure">Failed to delete record...</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    cardData: null,
    deleteFailure: false
  }),
  computed: {
    cardID() {
      return this.$route.params.id;
    }
  },
  methods: {
    async deleteCardRecord() {
      try {
        console.log("deleting...");

        const deleteAttempt = await axios.delete(
          `http://localhost:3000/card/${this.cardID}`
        );

        if (deleteAttempt.status !== 200) {
          throw new Error("Improper Status" + JSON.stringify(deleteAttempt));
        }

        console.log(deleteAttempt.data);

        this.deleteFailure = false;
      } catch (e) {
        this.deleteFailure = true;
        console.log("failed to delete", e);
      }
    }
  },
  mounted() {
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
