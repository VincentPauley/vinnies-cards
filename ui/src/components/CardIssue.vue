<template>
  <table class="card-issue">
    <tr>
      <th>brand</th>
      <th>year</th>
      <th>series</th>
      <th>number</th>
    </tr>
    <tr>
      <td>{{ brand }}</td>
      <td>{{ year }}</td>
      <td>{{ seriesIs }}/{{ seriesIssued }}</td>
      <td>{{ seriesNumber }}</td>
    </tr>
  </table>
</template>

<style lang="css">
.card-issue {
  border-top: 1px solid #d4d4d4;
  width: 100%;
  padding: 0.5rem;
  border-collapse: collapse;
}
.card-issue td {
  border: 1px solid #d4d4d4;
  border-bottom: none;
}
.card-issue td:first-child {
  border-left: none;
}
.card-issue td:last-child {
  border-right: none;
}
</style>

<script>
export default {
  name: "CardIssue",
  props: {
    brand: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    seriesIs: {
      type: Number,
      required: true
    },
    seriesIssued: {
      type: Number,
      required: true
    },
    seriesNumber: {
      type: Number,
      required: true
    }
  }
};
</script>