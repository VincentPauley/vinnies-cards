<template>
  <div class="radio-wrapper">
    <input
      type="radio"
      :id="optionID"
      :name="groupName"
      :value="value"
      @click="updateSelection(value)"
    >
    <label :class="['radio-label', { 'selected': this.isSelected }]" :for="optionID">{{ name }}</label>
  </div>
</template>

<style lang="css">
.radio-wrapper {
  /* border: 1px solid blue; */
  margin: 0.5rem 0;
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
.radio-label.selected {
  background-color: blue;
}
</style>

<script>
import uniqid from "uniqid";

export default {
  props: {
    value: {
      required: true
    },
    name: {
      required: true,
      type: String
    },
    groupName: {
      required: true,
      type: String
    },
    selectedValue: {
      default: null
    }
  },
  computed: {
    isSelected() {
      return this.value === this.selectedValue;
    },
    optionID() {
      return `opt-${uniqid()}-${this.value}`;
    }
  },
  methods: {
    updateSelection(choice) {
      this.$emit("selection", choice);
    }
  }
};
</script>