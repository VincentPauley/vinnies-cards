<template>
  <div>
    Card Type Attributes
    <ul>
      <li v-for="level in configuredData" :key="level.datapoint">
        <SelectFromList
          :provide-name="true"
          :label="level.datapoint"
          :name="level.datapoint"
          :options="level.options"
          @selection="handleSelection"
        />
      </li>
      <!-- @selection="brandSelected" -->
    </ul>
  </div>
</template>

<script>
import SelectFromList from "./form/SelectFromList.vue";

export default {
  components: {
    SelectFromList
  },
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
    reMapOptions(options) {
      return options.map(o => ({ name: o.type, value: o.id }));
    },
    getOptionsForDataPoint(options) {
      const match = this.attributeOptions.filter(x => {
        if (x[options]) return x[options];
      })[0];

      if (match) {
        return this.reMapOptions(match[options]);
      }
    },
    handleSelection(selection) {
      console.log("handleSelection: ", selection);
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