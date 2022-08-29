<template>
  <div>
    <ScoreBoard
      :quantityCorrectAnswer="this.quantityCorrectAnswers"
      :quantityIncorrectAnswer="this.quantityIncorrectAnswers"
    />

    <template v-if="this.question">
      <h1 v-html="this.question"></h1>

      <template v-for="answer in this.getAnswersInRandomOrder" :key="answer">
        <input
          type="radio"
          name="options"
          :disabled="this.answerSubmitted"
          :value="answer"
          v-model="this.answer"
        />
        <label v-html="answer"></label>
        <br />
      </template>

      <button
        class="send"
        type="button"
        @click="this.submitAnswer()"
        v-if="!this.answerSubmitted"
      >
        Send
      </button>

      <section class="result" v-if="this.answerSubmitted">
        <h4
          v-if="this.answer === this.correctAnswer"
          v-html="
            '&#9989; Congratulations, the answer ' +
            this.correctAnswer +
            ' is correct.'
          "
        ></h4>

        <h4
          v-else
          v-html="
            '&#10060; I am sorry, you picked the wrong answer. The correct is ' +
            this.correctAnswer +
            '.'
          "
        ></h4>

        <button class="send" type="button" @click="this.getNewQuestion()">
          Next question
        </button>
      </section>
    </template>
  </div>
</template>

<script>
import ScoreBoard from "./components/ScoreBoard.vue";

export default {
  name: "App",
  components: {
    ScoreBoard,
  },

  data() {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswer: undefined,
      answer: undefined,
      answerSubmitted: false,
      quantityCorrectAnswers: 0,
      quantityIncorrectAnswers: 0,
    };
  },

  methods: {
    submitAnswer() {
      if (this.answer) {
        this.answerSubmitted = true;

        if (this.answer === this.correctAnswer) {
          this.quantityCorrectAnswers += 1;
        } else {
          this.quantityIncorrectAnswers += 1;
        }
      } else {
        alert("Pick one of the options");
      }
    },

    async getNewQuestion() {
      this.answerSubmitted = false;
      this.answer = undefined;
      this.question = undefined;

      await this.axios
        .get("https://opentdb.com/api.php?amount=1")
        .then((response) => {
          if (response.data?.results.length > 0 && response.status === 200) {
            this.question = response.data.results[0].question;
            this.incorrectAnswers = response.data.results[0].incorrect_answers;
            this.correctAnswer = response.data.results[0].correct_answer;
          }
        });
    },
  },

  computed: {
    getAnswersInRandomOrder() {
      const answers =
        this.incorrectAnswers?.length > 0 ? [...this.incorrectAnswers] : [];

      answers.splice(
        Math.round(Math.random() * answers.length),
        0,
        this.correctAnswer
      );

      return answers;
    },
  },

  async created() {
    await this.getNewQuestion();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type="radio"] {
    margin: 12px 4px;
  }

  button.send {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: 1px solid #1867c0;
    cursor: pointer;
  }
}
</style>
