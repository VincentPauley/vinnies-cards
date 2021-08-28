<template>
  <li class="card">
    <ProductSet
      :brand="cardData.product_set.brand"
      :product="cardData.product_set.product"
      :print-year="printYear"
      :series="cardData.product_set.series"
    />
    <h3>
      {{ cardData.name }}
      <span v-if="cardData.single_player">{{ cardData.position }}</span>
    </h3>
    <p>
      Team:
      <b>{{ cardData.team }}</b>
    </p>
    <div style="text-align:left;padding:1rem;">
      <!-- <button @click="inspectCard">Inspect</button> -->
      <router-link :to="inspectLink">Inspect</router-link>
    </div>
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
import ProductSet from "./ProductSet.vue";

export default {
  components: {
    ProductSet
  },
  props: {
    cardData: {
      type: Object,
      required: true
    }
  },
  computed: {
    // TODO: this whole prop should be removed after model correction
    series() {
      if (this.cardData.series.is) {
        return this.cardData.series.is;
      }
      return this.cardData.series;
    },
    printYear() {
      return this.cardData.product_set.print_year;
    },
    inspectLink() {
      return `/inspect-card/${this.cardData.id}`;
    }
  },
  methods: {
    inspectCard() {
      console.log(this.cardData.id);
    }
  }
};
</script>