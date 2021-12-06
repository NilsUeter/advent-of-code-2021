import { testInput, realInput } from "./input.js";

let input = realInput.split(",").map((e) => parseInt(e, 10));

const simulateLanternFish = (i) => {
  if (input[i] === 0) {
    input.push(8);
    input[i] = 6;
  } else {
    input[i]--;
  }
};

const part1 = () => {
  for (let day = 0; day < 80; day++) {
    const length = input.length;
    for (let i = 0; i < length; i++) {
      simulateLanternFish(i);
    }
  }
  return input.length;
};
console.log("Part 1: " + part1());

input = realInput.split(",").map((e) => parseInt(e, 10));
const generations = Array.from(
  { length: 9 }, // generations from 0 to 8
  (value, index) => input.filter((fish) => fish === index).length
);
const part2 = () => {
  for (let day = 0; day < 256; day++) {
    const zeroGeneration = generations.shift();
    generations[6] += zeroGeneration;
    generations.push(zeroGeneration);
  }
  return generations.reduce((acc, current) => acc + current, 0);
};
console.log("Part 2: " + part2());
