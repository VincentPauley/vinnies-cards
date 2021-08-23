<template>
  <div>
    <label :for="id">{{ label }}:</label>
    <input type="text" :id="id" v-model="value">
    <p v-if="missingRequirement">Missing Required Entry</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    value: ""
  }),
  computed: {
    missingRequirement() {
      return this.required && this.value === "";
    }
  }
  // methods: {
  //   validate() {

  //   }
  // }
};
</script>