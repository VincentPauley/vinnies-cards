<template>
  <div>
    <h1>Add Card</h1>
    <p>This Vuelidate form will help you add a card record with all required fields.</p>
    <form action>
      <TextInput id="card-name" label="Name" :required="true"/>
      <TextInput id="card-team" label="Team" :required="true"/>
      <button type="submit" @click.prevent="submit">Submit</button>
    </form>
    <div>{{ cardModel }}</div>
  </div>
</template>

<script>
import TextInput from "@/components/form/TextInput";

export default {
  components: {
    TextInput
  },
  data: () => ({
    cardModel: {
      name: "",
      team: ""
    }
  }),
  methods: {
    submit() {
      console.log("...calling submit");
    }
  }
};
</script>