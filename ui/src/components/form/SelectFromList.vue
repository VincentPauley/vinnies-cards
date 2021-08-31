<template>
  <div v-if="show" class="select-from-list">
    <h4>{{ label }}</h4>
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

<style lang="css">
.select-from-list {
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  text-align: left;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
</style>
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
  computed: {
    show() {
      return !!this.options.length;
    }
  },
  data: () => ({
    selectedValue: null
  }),
  methods: {
    updateSelection(choice) {
      this.selectedValue = choice;
      this.$emit("selection", choice);
    }
  }
};
</script>