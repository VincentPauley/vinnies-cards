<template>
  <div>
    Card Type Attributes
    <p style="border:1px solid black;">{{attributeMap}}</p>
    <p style="border:1px solid blue;">{{ attributeOptions }}</p>
  </div>
</template>

<script>
export default {
  props: {
    attributeMap: {
      type: Array,
      required: true
    },
    attributeOptions: {
      type: Array,
      required: true
    }
  }
};
</script>