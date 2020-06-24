import Route from "@ember/routing/route";

export default class PlaygameRoute extends Route {
  model() {
    return {
      grid: [],
      players: [
        {
          number: 1,
          name: "name1",
          marker: "x",
          wins: 0,
        },
        {
          number: 2,
          name: "name2",
          marker: "o",
          wins: 0,
        },
      ],
    };
  }
}
