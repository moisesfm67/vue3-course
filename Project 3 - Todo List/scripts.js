const toDoListApp = {
  data() {
    return { toDoListValues: [], newToDoListValue: null };
  },

  methods: {
    addNewToDoList: function () {
      if (this.newToDoListValue) {
        const newToDoListValue = {
          value: this.newToDoListValue,
          done: false,
        };

        this.toDoListValues.push(newToDoListValue);

        localStorage.setItem(
          "toDoListValues",
          JSON.stringify(this.toDoListValues)
        );

        this.newToDoListValue = null;
      } else {
        alert("The field must be filled in to be added to the list");
      }
    },

    clearToDoList: function () {
      this.toDoListValues = [];
    },

    updatedLocalStorage: function () {
      localStorage.setItem(
        "toDoListValues",
        JSON.stringify(this.toDoListValues)
      );
    },
  },

  created() {
    const toDoListValues =
      localStorage.getItem("toDoListValues")?.length > 0
        ? JSON.parse(localStorage.getItem("toDoListValues"))
        : [];

    this.toDoListValues = toDoListValues;
  },
};

Vue.createApp(toDoListApp).mount("#app");
