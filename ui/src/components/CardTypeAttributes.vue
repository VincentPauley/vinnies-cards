<template>
  <div>
    Card Type Attributes
    <ul>
      <li v-for="level in configuredData" :key="level.datapoint">
        <h5>{{ level.datapoint }}</h5>
        <p>{{ level.options }}</p>
      </li>
    </ul>
    <!-- <SelectFromList
          label="Brand"
          name="brand"
          :options="brandOptionsList"
          @selection="brandSelected"
    />-->
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
  },
  methods: {
    getOptionsForDataPoint(options) {
      const match = this.attributeOptions.filter(x => {
        if (x[options]) return x[options];
      })[0];

      if (match) {
        return match[options];
      }
    }
  },
  computed: {
    configuredData() {
      return this.attributeMap.map(a => {
        const datapoint = a.attribute;
        return {
          datapoint,
          options: this.getOptionsForDataPoint(a.options)
        };
      });
    }
  }
};
</script>