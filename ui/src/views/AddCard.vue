<template>
  <div v-if="teamOptionsAvailable">
    <h1>Add Card</h1>
    <p>Add cards to collection using this dynamicd form.</p>
    <form>
      <SelectFromList
        label="Brand"
        name="brand"
        :options="brandOptionsList"
        @selection="brandSelected"
      />

      <SelectFromList
        label="Product"
        name="product"
        :options="productOptionsList"
        @selection="productSelected"
      />

      <SelectFromList
        label="Print Year"
        name="print-year"
        :options="printYearOptionsList"
        @selection="printYearSelected"
      />

      <SelectFromList
        label="Series"
        name="series"
        :options="seriesOptionList"
        @selection="seriesSelected"
      />

      <div v-if="valid.brand && valid.printYear">
        <div>
          <label for="series">Series</label>
          <input id="series" type="number" v-model="cardModel.series" @keyup="validateSeries">
          <b v-if="!valid.series">INVALID</b>
        </div>
        <div>
          <label for="name">Name</label>
          <input id="name" type="text" v-model="cardModel.name" @keyup="validateName">
          <b v-if="!valid.name">INVALID</b>
        </div>

        <!-- <div>
          <label for="team">Team</label>
          <input id="team" type="text" v-model="cardModel.team" @keyup="validateTeam">
          <b v-if="!valid.team">INVALID</b>
        </div>-->

        <label for="team">Team</label>
        <!-- TODO: this validation would be better as a computed property -->
        <select name="team" id="team" v-model="cardModel.team" @change="validateTeam">
          <option value="SELECT">SELECT</option>
          <option
            v-for="teamOption in teamOptions"
            :key="teamOption.id"
            :value="teamOption.id"
          >{{ teamOption.location }} {{ teamOption.name }}</option>
        </select>
        <b v-if="!valid.team">INVALID</b>

        <div>
          <label for="position">Position</label>
          <select id="position" v-model="cardModel.position" @change="validatePosition">
            <option value="SELECT">SELECT</option>
            <option value="P">Pitcher</option>
            <option value="C">Catcher</option>
            <option value="1B">First Base</option>
            <option value="2B">Second Base</option>
            <option value="SS">Short Stop</option>
            <option value="3B">Third Base</option>
            <option value="OF">Outfield</option>
            <option value="LF">Left Field</option>
            <option value="CF">Center Field</option>
            <option value="RF">Right Field</option>
          </select>
          <b v-if="!valid.position">INVALID</b>
        </div>

        <div>
          <label for="series">Series Number</label>
          <input
            id="series"
            type="number"
            v-model="cardModel.seriesNumber"
            @keyup="validateSeriesNumber"
          >
          <b v-if="!valid.series">INVALID</b>
        </div>

        <label for="card-type">Card Type</label>
        <select name="type" id="card-type" v-model="cardModel.cardType">
          <option
            v-for="cardType in cardTypeOptions"
            :key="cardType.id"
            :value="cardType.id"
          >{{ cardType.type }}</option>
        </select>
        {{seriesTypeOptions}}
        {{variationOptions}}
      </div>
      <button type="submit" :disabled="!allValid" @click.prevent="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

// APIS
import api from "@/api/index.js";
import brands from "@/api/calls/brands";
import products from "@/api/calls/products";
import supportedYears from "@/api/calls/supported-years";
import series from "@/api/calls/series";

// COMPONENTS
import SelectFromList from "../components/form/SelectFromList.vue";

export default {
  components: {
    SelectFromList
  },
  data: () => ({
    brandOptions: null,
    productOptions: null,
    printYearOptions: null,
    seriesOptions: null,
    cardTypeOptions: null,
    teamOptions: null,
    seriesTypeOptions: null,
    variationOptions: null,
    cardModel: {
      brand: "SELECT",
      product: "SELECT",
      printYear: null,
      name: "",
      cardType: null,
      team: "SELECT",
      position: "SELECT",
      series: null,
      seriesNumber: null
    },
    valid: {
      brand: false,
      product: false,
      name: false,
      team: false,
      position: false,
      printYear: false,
      series: false,
      seriesNumber: false
    }
  }),
  computed: {
    brandValid() {
      return this.valid.brand;
    },
    productValid() {
      return this.valid.product;
    },
    printYearValid() {
      return this.valid.printYear;
    },
    /**
     * @computed baseInfoSet
     *
     * Once brand and year are set, more information about the
     * cards attributes can be looked up to generate form inputs.
     *
     * TODO: need to edit contents here
     */
    baseInfoSet() {
      return this.valid.brand && this.valid.printYear;
    },
    cardTypeOptionsAvailable() {
      return Array.isArray(this.cardTypeOptions);
    },
    teamOptionsAvailable() {
      return Array.isArray(this.teamOptions);
    },
    // need to extend the format here in order to have valid content
    seriesOptionList() {
      if (!Array.isArray(this.seriesOptions)) {
        return [];
      }

      return this.seriesOptions.slice().map(seriesOption => ({
        name: seriesOption.toString(),
        value: seriesOption
      }));
    },
    printYearOptionsList() {
      if (!Array.isArray(this.printYearOptions)) {
        return [];
      }

      return this.printYearOptions.slice().map(printYear => ({
        name: printYear.toString(),
        value: printYear
      }));
    },
    productOptionsList() {
      if (!Array.isArray(this.productOptions)) {
        return [];
      }

      return this.productOptions.slice().map(product => ({
        name: product,
        value: product
      }));
    },
    brandOptionsList() {
      if (!Array.isArray(this.brandOptions)) {
        return [];
      }

      return this.brandOptions.slice().map(brand => ({
        name: brand.name,
        value: brand.id
      }));
    },
    allValid() {
      let allValid = true;

      const keys = Object.keys(this.valid);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (!this.valid[key]) {
          allValid = false;
          break;
        }
      }

      return allValid;
    }
  },
  watch: {
    brandValid(valid) {
      if (valid) {
        this.retrieveProducts();
      }
    },
    productValid(valid) {
      if (valid) {
        this.retrieveSupportedYears();
      }
    },
    printYearValid(valid) {
      if (valid) {
        this.retrieveProductSeries();
      }
    }
  },
  async created() {
    this.retrieveBrands();
    this.retrieveMlbTeams();
  },
  methods: {
    async retrieveBrands() {
      try {
        const brandResponse = await brands.getBrands();

        if (brandResponse.status !== 200 || !brandResponse.data.success) {
          throw new Error(
            `improper resonse code for GET /brands: ${brandResponse.status}`
          );
        }

        this.brandOptions = brandResponse.data.brands;
      } catch (e) {
        console.log("--catching error--");
        console.error(e);
      }
    },
    async retrieveProducts() {
      const productResponse = await products.getProductsForBrand(
        this.cardModel.brand
      );

      this.productOptions = productResponse.data.products;
    },
    async retrieveSupportedYears() {
      try {
        const availableYears = await supportedYears.getProductYearsSupported(
          this.cardModel.brand,
          this.cardModel.product
        );

        this.printYearOptions = availableYears.data.years;
      } catch (e) {
        console.log("e", e);
      }
    },
    async retrieveProductSeries() {
      try {
        console.log("get the series!");
        const availableSeries = await series.getSeriesForProduct(
          this.cardModel.brand,
          this.cardModel.product,
          this.cardModel.printYear
        );

        this.seriesOptions = availableSeries.data.series;
      } catch (e) {
        console.log("e", e);
      }
    },
    brandSelected(brand) {
      this.cardModel.brand = brand;
      this.validateBrand();
    },
    productSelected(product) {
      this.cardModel.product = product;
      this.validateProduct();
    },
    printYearSelected(year) {
      this.cardModel.printYear = year;
      this.validatePrintYear();
    },
    seriesSelected(series) {
      this.cardModel.series = series;
      this.validateSeries();
    },
    async retrieveCardTypes() {
      try {
        const { brand, printYear } = this.cardModel;
        const endpoint = `/card-types/brand/${brand}/print-year/${printYear}`;
        const cardTypeResponse = await api.get(endpoint);

        if (cardTypeResponse.status !== 200) {
          throw new Error(
            `improper resonse code for GET /card-types: ${
              cardTypeResponse.status
            }`
          );
        }

        // TODO: this group used should be looked up based on the brand/year dynamically
        // this.cardTypeOptions = cardTypeResponse.data[0].types;
        // first option should be assumed the default option
        // this.cardModel.type = cardTypeResponse.data[0].types[0].id;

        const { types, seriesTypes, variations } = cardTypeResponse.data;

        this.cardTypeOptions = types;
        this.seriesTypeOptions = seriesTypes;
        this.variationOptions = variations;

        console.log("Check Full: ", cardTypeResponse.data);
      } catch (e) {
        console.error(e);
      }
    },
    async retrieveMlbTeams() {
      try {
        const mlbTeamsResponse = await api.get("/mlb-teams");

        if (mlbTeamsResponse.status !== 200) {
          throw new Error(
            `improper resonse code for GET /mlb-teams: ${
              mlbTeamsResponse.status
            }`
          );
        }

        this.teamOptions = mlbTeamsResponse.data;
      } catch (e) {
        console.error(e);
      }
    },
    // validators
    validateBrand() {
      this.valid.brand = this.cardModel.brand !== "SELECT";
    },
    validateProduct() {
      this.valid.product = this.cardModel.brand !== "SELECT";
    },
    validateName() {
      this.valid.name = /\w{5,}/i.test(this.cardModel.name);
    },
    validateTeam() {
      this.valid.team = this.cardModel.team !== "SELECT";
    },
    validatePosition() {
      this.valid.position = this.cardModel.position !== "SELECT";
    },
    validatePrintYear() {
      // this.cardModel.printYear = parseInt(this.cardModel.printYear);
      this.valid.printYear = /\d{4}/.test(this.cardModel.printYear);
    },
    validateSeries() {
      this.valid.series = /^\d{1,2}$/.test(this.cardModel.series);
    },
    validateSeriesNumber() {
      this.valid.seriesNumber = /^\d{1,3}$/.test(this.cardModel.seriesNumber);
    },
    async submit() {
      try {
        const newCardResult = await axios.post(
          "http://localhost:3000/new-card",
          this.cardModel
        );

        if (newCardResult.status !== 200) {
          throw new Error("something bad happened");
        }

        console.log(newCardResult);
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>