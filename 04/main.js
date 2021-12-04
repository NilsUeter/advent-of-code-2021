import { testInput, realInput } from "./input.js";

const [orderRaw, ...boardsRaw] = realInput.split("\n\n");
const order = orderRaw.split(",").map((e) => parseInt(e, 10));
let boards = boardsRaw.map((board) =>
  board.split("\n").map((e) =>
    e.split(/\s+/g).map((e) => {
      return { marked: false, number: parseInt(e, 10) };
    })
  )
);

const markBoards = (currentNumber) => {
  for (const board of boards) {
    for (const row of board) {
      for (const item of row) {
        if (currentNumber === item.number) {
          item.marked = true;
        }
      }
    }
  }
};

const checkForWinner = () => {
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i];
    let areAllInColumnMarked = { 0: true, 1: true, 2: true, 3: true, 4: true };
    for (const row of board) {
      for (let i = 0; i < row.length; i++) {
        if (!row[i].marked) {
          areAllInColumnMarked[i] = false;
        }
      }
      // check rows for all marked
      if (row.every((item) => item.marked)) {
        return [board, i];
      }
    }
    // check columns for all marked
    if (Object.values(areAllInColumnMarked).some((e) => e)) {
      return [board, i];
    }
  }
  return [undefined, undefined];
};

const getSumOfUnmarkedNumbers = (board) => {
  return board.reduce((accumulator, currentRow) => {
    const currentRowSum = currentRow.reduce(
      (accumulator, currentItem) =>
        accumulator + (currentItem.marked ? 0 : currentItem.number),
      0
    );
    return accumulator + currentRowSum;
  }, 0);
};

const part1 = () => {
  for (const number of order) {
    markBoards(number);
    const [winnerBoard, index] = checkForWinner();
    if (winnerBoard) {
      const sum = getSumOfUnmarkedNumbers(winnerBoard);
      return sum * number;
    }
  }
};
console.log("Part 1: " + part1());

boards = boardsRaw.map((board) =>
  board.split("\n").map((e) =>
    e.split(/\s+/g).map((e) => {
      return { marked: false, number: parseInt(e, 10) };
    })
  )
);
const part2 = () => {
  for (const number of order) {
    markBoards(number);
    let winnerBoard, index;
    while (([winnerBoard, index] = checkForWinner())) {
      if (winnerBoard && boards.length === 1) {
        const sum = getSumOfUnmarkedNumbers(winnerBoard);
        return sum * number;
      } else if (winnerBoard) {
        boards.splice(index, 1);
      } else {
        break;
      }
    }
  }
};
console.log("Part 2: " + part2());
