import Controller from "@ember/controller";
import { action } from "@ember/object";

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
//Dertirmine Winner * only for three in a row for now

//Check if board still has spaces

//Placing marker on the grid

//Taking Turns

//Check if input is valid

//add changes to grid in model

//End Game
export default class PlaygameController extends Controller {
  constructor() {
    super(...arguments);
    console.log("hi");
  }
  // grid = startingGrid;
  currentMarker = "x"; //player 1 starts as 'x', we can offer ability to change to 'o' in  future
}
