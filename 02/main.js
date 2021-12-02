import { testInput, realInput } from "./input.js";

const input = realInput.split("\n").map((e) => {
  const [command, valueAsString] = e.split(" ");
  return { command, value: parseInt(valueAsString, 10) };
});
console.log(input);

const part1 = () => {
  let horizontalPosition = 0;
  let depth = 0;
  for (const { command, value } of input) {
    switch (command) {
      case "forward":
        horizontalPosition += value;
        break;
      case "down":
        depth += value;
        break;
      case "up":
        depth -= value;
        break;
    }
  }
  return horizontalPosition * depth;
};
console.log("Part 1: " + part1());

const part2 = () => {
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;
  for (const { command, value } of input) {
    switch (command) {
      case "forward":
        horizontalPosition += value;
        depth += aim * value;
        break;
      case "down":
        aim += value;
        break;
      case "up":
        aim -= value;
        break;
    }
  }
  return horizontalPosition * depth;
};
console.log("Part 2: " + part2());
