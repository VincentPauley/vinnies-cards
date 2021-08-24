<template>
  <div>
    <h1>Add Card</h1>
    <p>This Vuelidate form will help you add a card record with all required fields.</p>
    <form>
      <div>
        <label for="name">Name</label>
        <input id="name" type="text" v-model="cardModel.name" @keyup="validateName">
        <b v-if="!valid.name">INVALID</b>
      </div>
      <div>
        <label for="team">Team</label>
        <input id="team" type="text" v-model="cardModel.team" @keyup="validateTeam">
        <b v-if="!valid.team">INVALID</b>
      </div>
      <div>
        <label for="brand">Brand</label>
        <select id="brand" v-model="cardModel.brand" @change="validateBrand">
          <option value="SELECT">SELECT</option>
          <option value="topps">Topps</option>
          <option value="topps">Donrussa</option>
        </select>
        <b v-if="!valid.brand">INVALID</b>
      </div>
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
        <label for="year">Year</label>
        <input id="year" type="number" v-model="cardModel.year" @keyup="validateYear">
        <b v-if="!valid.year">INVALID</b>
      </div>

      <div>
        <label for="series">Series</label>
        <input id="series" type="number" v-model="cardModel.series" @keyup="validateSeries">
        <b v-if="!valid.series">INVALID</b>
      </div>

      <div>
        <label for="single-player">Single Player Card</label>
        <input type="checkbox" id="single-player" value="test" v-model="cardModel.singlePlayer">
      </div>

      <button type="submit" :disabled="!allValid" @click.prevent="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    cardModel: {
      name: "",
      team: "",
      position: "SELECT",
      brand: "SELECT",
      year: null,
      series: null,
      singlePlayer: true
    },
    valid: {
      name: false,
      team: false,
      brand: false,
      position: false,
      year: false,
      series: false
    }
  }),
  computed: {
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
  methods: {
    validateName() {
      this.valid.name = /\w{5,}/i.test(this.cardModel.name);
    },
    validateTeam() {
      this.valid.team = /\w{5,}/i.test(this.cardModel.team);
    },
    validateBrand() {
      this.valid.brand = this.cardModel.brand !== "SELECT";
    },
    validatePosition() {
      this.valid.position = this.cardModel.position !== "SELECT";
    },
    validateYear() {
      this.valid.year = /\d{4}/.test(this.cardModel.year);
    },
    validateSeries() {
      this.valid.series = /^\d{1,2}$/.test(this.cardModel.series);
    },
    submit() {
      axios
        .post("http://localhost:3000/new-card", this.cardModel)
        .then(r => {
          console.log("r: ", r);
        })
        .catch(e => {
          console.log("e: ", e);
        });
    }
  }
};
</script>