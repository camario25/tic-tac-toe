import Route from "@ember/routing/route";

export default class PlaygameRoute extends Route {
  model() {
    return {
      grid: [],
      players: [
        {
          number: 1,
          name: "",
          marker: "x",
          wins: 0,
        },
        {
          number: 2,
          name: "",
          marker: "o",
          wins: 0,
        },
      ],
    };
  }
}
