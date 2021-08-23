<template>
  <div>
    <h1>Add Card</h1>
    <p>This Vuelidate form will help you add a card record with all required fields.</p>
    <form action>
      <div>
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="cardModel.name">
      </div>
      <div>
        <label for="team">Team:</label>
        <input id="team" type="text" v-model="cardModel.team">
      </div>
    </form>
    <div>{{ cardModel }}</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    cardModel: {
      name: "",
      team: ""
    }
  })
};
</script>