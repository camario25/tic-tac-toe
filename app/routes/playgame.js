import Route from "@ember/routing/route";

// initialize the grid function
// function createGrid(size) {
//   const grid = [];
//   const tempArr = [];
//   for (let i = 0; i < size; i++) {
//     tempArr[i] = { marker: "x" };
//     for (let j = 0; j < size; j++) {
//       grid[i] = tempArr;
//     }
//   }
//   return grid;
// }
// const startingGrid = createGrid(3);

export default class PlaygameRoute extends Route {
  model() {
    return {
      // grid: startingGrid,
      grid: [],
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
