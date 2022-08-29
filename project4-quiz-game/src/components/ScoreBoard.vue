<template>
  <section class="score">
    Player <span>{{ quantityCorrectAnswer }}</span> x
    <span>{{ quantityIncorrectAnswer }}</span> Computer
  </section>
</template>

<script>
export default {
  name: "ScoreBoard",
  props: {
    quantityCorrectAnswer: Number,
    quantityIncorrectAnswer: Number,
  },
};
</script>

<style lang="scss">
section.score {
  border-bottom: 1px solid black;
  padding: 24px;
  font-size: 18px;

  span {
    padding: 8px;
    font-weight: bold;
    border: 1px solid black;
  }
}
</style>
