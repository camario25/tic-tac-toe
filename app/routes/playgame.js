import Route from "@ember/routing/route";

export default class PlaygameRoute extends Route {
  model() {
    return {
      grid: [
        ["x", "x", "x"],
        ["", "", ""],
        ["", "", ""],
      ],
      players: [
        {
          playerNumber: 1,
          name: "player1",
          maker: "x",
          wins: 0,
        },
        {
          playerNumber: 2,
          name: "player2",
          maker: "o",
          wins: 0,
        },
      ],
    };
  }
}
