<template>
  <div class="product-set">
    <p>
      <b>{{ brand }} {{ printYear }}</b>
      Series: {{ series }}
    </p>
  </div>
</template>

<style lang="css">
.product-set {
  background-color: #ff7d40;
  border-bottom: 2px solid red;
}
</style>

<script>
export default {
  props: {
    brand: {
      type: String,
      required: true
    },
    printYear: {
      type: Number,
      required: true
    },
    series: {
      type: Number,
      default: 0 // < indicates no series in product set
    }
  }
};
</script>