<template>
  <li class="card">
    <h3>
      {{ cardData.name }}
      <span v-if="cardData.single_player">{{ cardData.position }}</span>
    </h3>
    <p>
      Team:
      <b>{{ cardData.team }}</b>
    </p>
    <CardIssue
      :brand="cardData.brand"
      :year="cardData.year"
      :series-is="cardData.series.is"
      :series-issued="cardData.series.of"
      :series-number="cardData.series_number"
    />
  </li>
</template>

<style lang="css">
.card {
  border: 1px solid gray;
  list-style-type: none;
  margin: 1rem 0;
}
h3 span {
  color: gray;
  font-size: 14px;
}
</style>

<script>
import CardIssue from "./CardIssue.vue";

export default {
  components: {
    CardIssue
  },
  props: {
    cardData: {
      type: Object,
      required: true
    }
  }
};
</script>