import Route from "@ember/routing/route";

export default class PlaygameRoute extends Route {
  model() {
    return {
      grid: [],
      players: [
        {
          id: 1,
          name: "",
          marker: "x",
          wins: 0,
        },
        {
          id: 2,
          name: "",
          marker: "o",
          wins: 0,
        },
      ],
    };
  }
}
