const members = [
  {
    firstName: "John",
    lastName: "Lennon",
    instrument: "Acoustic Guitar",
  },
  {
    firstName: "George",
    lastName: "Harrison",
    instrument: "Electric Guitar",
  },
];

const handlingForms = {
  data() {
    return {
      members,
      newMember: {},
    };
  },

  methods: {
    addMember: function () {
      const { firstName, lastName, instrument } = this.newMember;

      if (firstName && lastName && instrument) {
        this.members.push(this.newMember);

        this.newMember = {};
      } else {
        alert("All fields must be filled");
      }
    },
  },
};

Vue.createApp(handlingForms).mount("#app");
