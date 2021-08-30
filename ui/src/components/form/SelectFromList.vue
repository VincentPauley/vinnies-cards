<template>
  <div>
    <p>selection: {{ selectedValue }}</p>
    <SelectOption
      v-for="option in options"
      :key="option.value"
      :group-name="name"
      :value="option.value"
      :name="option.name"
      :selected="selectedValue === option.value"
      @selection="updateSelection"
    />
  </div>
</template>

<script>
import SelectOption from "./SelectOption.vue";

export default {
  components: {
    SelectOption
  },
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
  data: () => ({
    selectedValue: null
  }),
  methods: {
    updateSelection(choice) {
      console.log(">> Choice: ", choice);
      this.selectedValue = choice;
    }
  }
};
</script>