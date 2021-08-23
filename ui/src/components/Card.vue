<template>
  <li class="card">
    <h3>
      {{ cardData.name }}
      <span>{{ cardData.position }}</span>
    </h3>
    <p>
      Team:
      <b>{{ cardData.team }}</b>
    </p>
    <p>
      Brand:
      <b>{{ cardData.brand }}</b>
    </p>
    <p>
      YR/Series:
      <b>{{ cardData.year }} {{ cardData.series.is }}/{{ cardData.series.of }}</b>
    </p>
    <p>
      Type:
      <b>{{ cardData.single_player ? 'Player' : 'Other' }}</b>
    </p>
  </li>
</template>

<style lang="css">
.card {
  border: 1px solid gray;
  list-style-type: none;
}
h3 span {
  color: gray;
  font-size: 14px;
}
</style>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      required: true
    }
  }
};
</script>