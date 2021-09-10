<template>
  <div class="header">
    <div class="title-wrapper">
      <h1>{{ title }}</h1>
    </div>

    <div class="mode-indicator">
      <p>{{ mode }}</p>
    </div>
  </div>
</template>

<style lang="css">
h1,
p {
  padding: 0;
  margin: 0;
}
.header {
  height: 10rem;
  background-image: linear-gradient(rgb(100, 84, 243), rgb(29, 16, 102));
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title-wrapper {
  background-color: white;
  padding: 0.25rem;
  border-radius: 1rem;
}
.mode-indicator {
  display: flex;
  flex-direction: row-reverse;
}
.mode-indicator p {
  padding: 0.25rem;
  background-color: yellow;
  display: inline-block;
}
</style>


<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      mode: "mode"
    })
  },
  data: () => ({
    title: `Vinnie's Cards`
  })
};
</script>