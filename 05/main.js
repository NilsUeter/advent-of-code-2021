import { testInput, realInput } from "./input.js";

const input = realInput.split("\n").map((e) =>
  e.split(" -> ").map((e) => {
    const [x, y] = e.split(",");
    return { x: parseInt(x, 10), y: parseInt(y, 10) };
  })
);
const hydroMap = {};
const buildMap = () => {
  input.forEach(([left, right]) => {
    if (left.x === right.x) {
      let modifier = 0;
      while (true) {
        let entry = hydroMap[`${left.x}:${left.y + modifier}`];
        hydroMap[`${left.x}:${left.y + modifier}`] = entry ? ++entry : 1;
        if (left.y + modifier < right.y) {
          modifier++;
        } else if (left.y + modifier > right.y) {
          modifier--;
        } else if (left.y + modifier === right.y) {
          break;
        }
      }
    } else if (left.y === right.y) {
      let modifier = 0;
      while (true) {
        let entry = hydroMap[`${left.x + modifier}:${left.y}`];
        hydroMap[`${left.x + modifier}:${left.y}`] = entry ? ++entry : 1;
        if (left.x + modifier < right.x) {
          modifier++;
        } else if (left.x + modifier > right.x) {
          modifier--;
        } else if (left.x + modifier === right.x) {
          break;
        }
      }
    }
  });
};

const part1 = () => {
  buildMap();
  return Object.values(hydroMap).filter((element) => element > 1).length;
};
console.log("Part 1: " + part1());

const hydroMap2 = {};
const buildMap2 = () => {
  input.forEach(([left, right]) => {
    let modifierX = 0;
    let modifierY = 0;
    while (true) {
      let entry = hydroMap2[`${left.x + modifierX}:${left.y + modifierY}`];
      hydroMap2[`${left.x + modifierX}:${left.y + modifierY}`] = entry
        ? ++entry
        : 1;

      if (left.y + modifierY === right.y && left.x + modifierX === right.x) {
        break;
      }

      if (left.y + modifierY < right.y) {
        modifierY++;
      } else if (left.y + modifierY > right.y) {
        modifierY--;
      }
      if (left.x + modifierX < right.x) {
        modifierX++;
      } else if (left.x + modifierX > right.x) {
        modifierX--;
      }
    }
  });
};

const part2 = () => {
  buildMap2();
  return Object.values(hydroMap2).filter((element) => element > 1).length;
};
console.log("Part 2: " + part2());
