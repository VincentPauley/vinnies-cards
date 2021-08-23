<template>
  <div>
    <label :for="id">{{ label }}:</label>
    <input type="text" :id="id" v-model="value" @blur="handleBlur">
    <p v-if="showMissingRequirement">Missing Required Entry</p>
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
    value: "",
    isDirty: false
  }),
  computed: {
    showMissingRequirement() {
      return this.required && this.value === "" && this.isDirty;
    }
  },
  methods: {
    handleBlur() {
      this.isDirty = true;
    }
  }
};
</script>