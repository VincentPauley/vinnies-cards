<template>
  <div>
    <div class="radio-wrapper" v-for="option in options" :key="option.value">
      <input
        type="radio"
        :id="`opt-${option.value}`"
        :name="name"
        :value="option.value"
        @click="updateSelection(option.value)"
      >
      <label class="radio-label" :for="`opt-${option.value}`">{{ option.name }}</label>
    </div>
  </div>
</template>

<style lang="css">
.radio-wrapper {
  /* border: 1px solid blue; */
  margin: 0.5rem;
}
.radio-wrapper input {
  display: none;
}
.radio-label {
  box-sizing: border-box;
  background-color: dodgerblue;
  color: #ffffff;
  font-weight: bold;
  display: block;
  width: 100%;
  padding: 0.25rem;
  border-radius: 0.25rem;
}
</style>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Select from options"
    },
    name: {
      type: String,
      required: true
    },
    options: {
      required: true,
      type: Array
    }
  },
  methods: {
    updateSelection(choice) {
      console.log(">> Choice: ", choice);
    }
  }
};
</script>